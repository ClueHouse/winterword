export async function onRequestGet(context) {
  try {
    const { request, env } = context;

    const url = new URL(request.url);
    const slug = url.searchParams.get("slug");

    if (!slug) {
      return Response.json({ ok: false, error: "Missing slug" }, { status: 400 });
    }

    const SUPABASE_URL = env.SUPABASE_URL;
    const SUPABASE_ANON_KEY = env.SUPABASE_ANON_KEY;

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      return Response.json({
        ok: false,
        error: "Missing Supabase environment variables"
      });
    }

    function truthyValue(value) {
      return value === true || value === "true" || value === "TRUE" || value === 1 || value === "1";
    }

    async function supabaseGet(path) {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || `Supabase request failed: ${response.status}`);
      }

      return response.json();
    }

    const rows = await supabaseGet(
      `organisations?slug=eq.${encodeURIComponent(slug)}&select=*&limit=1`
    );

    if (!Array.isArray(rows) || rows.length === 0) {
      return Response.json({
        ok: false,
        error: "Organisation not found"
      });
    }

    const record = rows[0];

    async function getLeaderboardCount() {
      try {
        const leaderboardRows = await supabaseGet(
          `leaderboard?org=eq.${encodeURIComponent(slug)}&select=rank&limit=100`
        );

        return Array.isArray(leaderboardRows)
          ? leaderboardRows.length
          : 0;
      } catch (error) {
        console.error("Leaderboard check error:", error);
        return 0;
      }
    }

    const leaderboard_count = await getLeaderboardCount();
    const has_leaderboard_entries = leaderboard_count > 0;

    const totalClues = Number(record.total_clues || 12);

    function parseFrequency(freq) {
      if (freq === "weekly") {
        return { type: "fixed", ms: 7 * 24 * 60 * 60 * 1000 };
      }

      if (freq === "hourly") {
        return { type: "fixed", ms: 60 * 60 * 1000 };
      }

      if (freq === "quarter_hourly") {
        return { type: "fixed", ms: 15 * 60 * 1000 };
      }

      if (freq === "daily_weekdays") {
        return { type: "weekdays" };
      }

      return { type: "fixed", ms: 7 * 24 * 60 * 60 * 1000 };
    }

    function calculateCurrentClue() {
      if (
        record.current_clue_override !== null &&
        record.current_clue_override !== undefined &&
        record.current_clue_override !== ""
      ) {
        const override = Number(record.current_clue_override);

        if (!Number.isNaN(override)) {
          return Math.max(0, Math.min(override, totalClues));
        }
      }

      if (!record.season_start) {
        return 0;
      }

      const startMs = new Date(record.season_start).getTime();
      const nowMs = Date.now();

      if (Number.isNaN(startMs)) {
        return 0;
      }

      if (nowMs < startMs) {
        return 0;
      }

      const parsed = parseFrequency(record.drop_frequency);

      if (parsed.type === "weekdays") {
        let count = 0;
        const cursor = new Date(startMs);

        while (cursor.getTime() <= nowMs && count < totalClues) {
          const day = cursor.getDay();

          if (day !== 0 && day !== 6) {
            count++;
          }

          cursor.setDate(cursor.getDate() + 1);
        }

        return Math.max(0, Math.min(count, totalClues));
      }

      const diff = nowMs - startMs;
      const clue = Math.floor(diff / parsed.ms) + 1;

      return Math.max(0, Math.min(clue, totalClues));
    }

    const current_clue = calculateCurrentClue();

    function getSeasonState() {
      if (record.status === "paused") return "paused";
      if (record.status === "tech_diff") return "tech_diff";
      if (record.status === "complete") return "complete";

      if (record.season_end) {
        const endMs = new Date(record.season_end).getTime();

        if (!Number.isNaN(endMs) && Date.now() > endMs) {
          return "complete";
        }
      }

      if (current_clue <= 0) {
        return "pre";
      }

      return "live";
    }

    const season_state = getSeasonState();
    const is_complete = season_state === "complete";

    function calculateIsResolved() {
      const override = record.base_station_resolved_override;

      if (truthyValue(override)) {
        return true;
      }

      if (
        override === false ||
        override === "false" ||
        override === "FALSE" ||
        override === 0 ||
        override === "0"
      ) {
        return false;
      }

      if (!is_complete || !record.season_start) {
        return false;
      }

      const startMs = new Date(record.season_start).getTime();

      if (Number.isNaN(startMs)) {
        return false;
      }

      const parsed = parseFrequency(record.drop_frequency);

      let durationMs = 0;

      if (parsed.type === "fixed") {
        durationMs = (totalClues - 1) * parsed.ms;
      } else if (parsed.type === "weekdays") {
        durationMs =
          (totalClues + Math.floor(totalClues / 5) * 2) *
          24 *
          60 *
          60 *
          1000;
      }

      const lastClueTime = startMs + durationMs;

      let resolvedDelayMs = 0;

      if (parsed.type === "fixed") {
        resolvedDelayMs = parsed.ms;
      } else if (parsed.type === "weekdays") {
        resolvedDelayMs = 24 * 60 * 60 * 1000;
      }

      const resolvedTime = lastClueTime + resolvedDelayMs;

      return Date.now() >= resolvedTime;
    }

    const is_resolved = calculateIsResolved();

    const lifelineLive = truthyValue(
      record.life ?? record.lifeline_live ?? record.lifelineLive ?? false
    );

    const pop1 = truthyValue(record.pop1);
    const pop2 = truthyValue(record.pop2);

    const nowIso = new Date().toISOString();

    return Response.json({
      ok: true,

      slug: record.slug || slug,

      org_name: record.org_name || "",
      orgName: record.org_name || "",

      status: record.status || "",
      timezone: record.timezone || "",

      season_start: record.season_start || "",
      seasonStart: record.season_start || "",

      drop_frequency: record.drop_frequency || "weekly",
      dropFrequency: record.drop_frequency || "weekly",

      updates_content: record.updates_content || "",
      updatesText: record.updates_content || "",

      guidepost: record.guidepost || "",
      guidepostText: record.guidepost || "",

      total_clues: totalClues,
      totalClues: totalClues,

      current_clue_override: record.current_clue_override ?? null,
      currentClueOverride: record.current_clue_override ?? null,

      current_clue,
      currentClue: current_clue,

      season_end: record.season_end || "",
      seasonEnd: record.season_end || "",

      notes: record.notes || "",

      season_state,
      seasonState: season_state,

      is_complete,
      isComplete: is_complete,

      is_resolved,
      isResolved: is_resolved,

      lifeline_live: lifelineLive,
      lifelineLive,
      lifelineAvailable: lifelineLive,

      pop1,
      pop2,

      has_leaderboard_entries,
      leaderboard_count,

      hasLeaderboardEntries: has_leaderboard_entries,
      leaderboardCount: leaderboard_count,

      now_iso: nowIso,
      nowIso
    });

  } catch (err) {
    return Response.json({
      ok: false,
      error: "Server error",
      detail: err.message
    });
  }
}
