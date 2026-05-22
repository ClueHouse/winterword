    const is_resolved = calculateIsResolved();

    const lifelineRaw = getAirtableField(record, [
      "life",
      "lifeline_live",
      "lifelineLive",
      "Lifeline Live",
      "Lifeline live",
      "lifeline live",
      "lifeline"
    ], false);

    const lifelineLive = truthyAirtableValue(lifelineRaw);

    const pop1Raw = getAirtableField(record, ["pop1", "POP1", "Pop 1", "pop_1"], false);
    const pop2Raw = getAirtableField(record, ["pop2", "POP2", "Pop 2", "pop_2"], false);

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

      current_clue: current_clue,
      currentClue: current_clue,

      season_end: record.season_end || "",
      seasonEnd: record.season_end || "",

      notes: record.notes || "",

      season_state: season_state,
      seasonState: season_state,

      is_complete: is_complete,
      isComplete: is_complete,

      is_resolved: is_resolved,
      isResolved: is_resolved,

      lifeline_live: lifelineLive,
      lifelineLive: lifelineLive,
      lifelineAvailable: lifelineLive,

      pop1: truthyAirtableValue(pop1Raw),
      pop2: truthyAirtableValue(pop2Raw),

      has_leaderboard_entries: has_leaderboard_entries,
      leaderboard_count: leaderboard_count,

      hasLeaderboardEntries: has_leaderboard_entries,
      leaderboardCount: leaderboard_count,

      now_iso: new Date().toISOString(),
      nowIso: new Date().toISOString()
    });
