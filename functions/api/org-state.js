export async function onRequestGet(context) {
  try {
    const { request, env } = context;

    const url = new URL(request.url);
    const slug = url.searchParams.get("slug");

    if (!slug) {
      return Response.json({ ok: false, error: "Missing slug" }, { status: 400 });
    }

    const AIRTABLE_TOKEN = env.AIRTABLE_TOKEN;
    const AIRTABLE_BASE_ID = env.AIRTABLE_BASE_ID;
    const AIRTABLE_TABLE_NAME = env.AIRTABLE_TABLE_NAME;

    if (!AIRTABLE_TOKEN || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_NAME) {
      return Response.json({
        ok: false,
        error: "Missing Airtable environment variables"
      });
    }

    const endpoint = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}?filterByFormula=${encodeURIComponent(`{slug}='${slug}'`)}`;

    const res = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`
      }
    });

    if (!res.ok) {
      const text = await res.text();
      return Response.json({
        ok: false,
        error: "Airtable request failed",
        detail: text
      });
    }

    const data = await res.json();

    if (!data.records || data.records.length === 0) {
      return Response.json({
        ok: false,
        error: "Organisation not found"
      });
    }

    const record = data.records[0].fields;

    // ---------- CALCULATION ----------

    const totalClues = Number(record.total_clues || 12);

    function parseFrequency(freq) {
      if (freq === "weekly") return { type: "fixed", ms: 7 * 24 * 60 * 60 * 1000 };
      if (freq === "hourly") return { type: "fixed", ms: 60 * 60 * 1000 };
      if (freq === "quarter_hourly") return { type: "fixed", ms: 15 * 60 * 1000 };
      if (freq === "daily_weekdays") return { type: "weekdays" };
      return { type: "fixed", ms: 7 * 24 * 60 * 60 * 1000 };
    }

    function calculateCurrentClue() {
      if (record.current_clue_override !== null && record.current_clue_override !== undefined && record.current_clue_override !== "") {
        const override = Number(record.current_clue_override);
        if (!Number.isNaN(override)) {
          return Math.max(0, Math.min(override, totalClues));
        }
      }

      if (!record.season_start) return 0;

      const startMs = new Date(record.season_start).getTime();
      const nowMs = Date.now();

      if (Number.isNaN(startMs)) return 0;
      if (nowMs < startMs) return 0;

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
      if (!record.is_visible) return "hidden";
      if (record.status === "paused") return "paused";
      if (record.status === "tech_diff") return "tech_diff";
      if (record.status === "complete") return "complete";

      if (record.season_end) {
        const endMs = new Date(record.season_end).getTime();
        if (!Number.isNaN(endMs) && Date.now() > endMs) {
          return "complete";
        }
      }

      if (current_clue <= 0) return "pre";

      return "live";
    }

    const season_state = getSeasonState();
    const is_complete = season_state === "complete";

    // ---------- RESOLVED LOGIC ----------

    function calculateIsResolved() {
      const override = record.base_station_resolved_override;

      if (override === true || override === "true") return true;
      if (override === false || override === "false") return false;

      if (!is_complete) return false;
      if (!record.season_start) return false;

      const startMs = new Date(record.season_start).getTime();
      if (Number.isNaN(startMs)) return false;

      const parsed = parseFrequency(record.drop_frequency);

      let durationMs = 0;

      if (parsed.type === "fixed") {
        durationMs = (totalClues - 1) * parsed.ms;
      } else if (parsed.type === "weekdays") {
        durationMs = (totalClues + Math.floor(totalClues / 5) * 2) * 24 * 60 * 60 * 1000;
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

    // ---------- RESPONSE ----------

    return Response.json({
      ok: true,
      slug: record.slug || slug,
      org_name: record.org_name || "",
      status: record.status || "",
      timezone: record.timezone || "",
      season_start: record.season_start || "",
      drop_frequency: record.drop_frequency || "weekly",
      updates_content: record.updates_content || "",
      total_clues: totalClues,
      current_clue_override: record.current_clue_override ?? null,
      current_clue: current_clue,
      season_end: record.season_end || "",
      is_visible: record.is_visible ?? true,
      notes: record.notes || "",
      season_state: season_state,
      is_complete: is_complete,
      is_resolved: is_resolved,

      // ✅ NEW: Lifeline manual control
      lifeline_unlocked: record.lifeline_unlocked === true,

      now_iso: new Date().toISOString()
    });

  } catch (err) {
    return Response.json({
      ok: false,
      error: "Server error",
      detail: err.message
    });
  }
}
