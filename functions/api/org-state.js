export async function onRequestGet(context) {
  try {
    const url = new URL(context.request.url);
    const slug = (url.searchParams.get("slug") || "").trim();

    if (!slug) {
      return Response.json(
        { ok: false, error: "Missing slug" },
        { status: 400 }
      );
    }

    const AIRTABLE_TOKEN = context.env.AIRTABLE_TOKEN;
    const AIRTABLE_BASE_ID = context.env.AIRTABLE_BASE_ID;
    const AIRTABLE_TABLE_NAME = context.env.AIRTABLE_TABLE_NAME;

    if (!AIRTABLE_TOKEN || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_NAME) {
      return Response.json(
        { ok: false, error: "Missing Airtable environment variables" },
        { status: 500 }
      );
    }

    const airtableUrl =
      `https://api.airtable.com/v0/${encodeURIComponent(AIRTABLE_BASE_ID)}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}` +
      `?maxRecords=1&filterByFormula=${encodeURIComponent(`{slug}="${slug}"`)}`;

    const airtableRes = await fetch(airtableUrl, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`
      }
    });

    if (!airtableRes.ok) {
      const text = await airtableRes.text();
      return Response.json(
        { ok: false, error: "Airtable request failed", detail: text },
        { status: 502 }
      );
    }

    const airtableData = await airtableRes.json();
    const record = airtableData.records && airtableData.records[0];

    if (!record) {
      return Response.json(
        { ok: false, error: "Org not found" },
        { status: 404 }
      );
    }

    const f = record.fields || {};

    const payload = {
      ok: true,
      slug: f.slug || slug,
      org_name: f.org_name || "",
      status: f.status || "live",
      timezone: f.timezone || "Pacific/Auckland",
      season_start: f.season_start || "",
      drop_frequency: f.drop_frequency || "weekly",
      updates_content: f.updates_content || "",
      total_clues: Number(f.total_clues || 12),
      current_clue_override:
        f.current_clue_override === undefined || f.current_clue_override === null || f.current_clue_override === ""
          ? null
          : Number(f.current_clue_override),
      season_end: f.season_end || "",
      is_visible: Boolean(f.is_visible),
      notes: f.notes || ""
    };

    return Response.json(payload, {
      headers: {
        "Cache-Control": "no-store"
      }
    });
  } catch (error) {
    return Response.json(
      {
        ok: false,
        error: "Unhandled server error",
        detail: String(error && error.message ? error.message : error)
      },
      { status: 500 }
    );
  }
}
