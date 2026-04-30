export async function onRequestGet(context) {
  try {
    const { request, env } = context;

    const url = new URL(request.url);
    const slug = (url.searchParams.get("slug") || "").trim();

    if (!slug) {
      return Response.json(
        { ok: false, error: "Missing slug" },
        { status: 400 }
      );
    }

    const AIRTABLE_TOKEN = env.AIRTABLE_TOKEN;
    const AIRTABLE_BASE_ID = env.AIRTABLE_BASE_ID;

    const AIRTABLE_LEADERBOARD_TABLE_NAME =
      env.AIRTABLE_LEADERBOARD_TABLE_NAME ||
      env.AIRTABLE_LEADERBOARD_TABLE ||
      "Leaderboard";

    if (
      !AIRTABLE_TOKEN ||
      !AIRTABLE_BASE_ID ||
      !AIRTABLE_LEADERBOARD_TABLE_NAME
    ) {
      return Response.json(
        {
          ok: false,
          error: "Missing Airtable environment variables"
        },
        { status: 500 }
      );
    }

    function escapeAirtableFormulaString(value) {
      return String(value)
        .replace(/\\/g, "\\\\")
        .replace(/"/g, '\\"');
    }

    const safeSlug = escapeAirtableFormulaString(slug);

    const params = new URLSearchParams();
    params.set("filterByFormula", `{org}="${safeSlug}"`);
    params.set("sort[0][field]", "rank");
    params.set("sort[0][direction]", "asc");
    params.set("pageSize", "100");

    const endpoint =
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(
        AIRTABLE_LEADERBOARD_TABLE_NAME
      )}?${params.toString()}`;

    const airtableRes = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
        Accept: "application/json"
      }
    });

    if (!airtableRes.ok) {
      const detail = await airtableRes.text();

      return Response.json(
        {
          ok: false,
          error: "Airtable request failed",
          detail
        },
        { status: 502 }
      );
    }

    const airtableData = await airtableRes.json();

    const records = Array.isArray(airtableData.records)
      ? airtableData.records
      : [];

    const rows = records
      .map((record) => {
        const fields = record.fields || {};

        return {
          id: record.id || "",
          org: fields.org || "",
          rank: Number(fields.rank || 0),
          player_name: fields.player_name || "",
          timestamp: fields.timestamp || "",
          solved_at: fields.solved_at || fields.timestamp || ""
        };
      })
      .filter((row) => row.rank > 0)
      .sort((a, b) => a.rank - b.rank);

    return Response.json({
      ok: true,
      slug,
      count: rows.length,
      rows
    });

  } catch (err) {
    return Response.json(
      {
        ok: false,
        error: "Server error",
        detail: err.message
      },
      { status: 500 }
    );
  }
}
