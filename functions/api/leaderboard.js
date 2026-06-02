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

    const SUPABASE_URL = env.SUPABASE_URL;
    const SUPABASE_ANON_KEY = env.SUPABASE_ANON_KEY;

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      return Response.json(
        { ok: false, error: "Missing Supabase environment variables" },
        { status: 500 }
      );
    }

    const endpoint =
      `${SUPABASE_URL}/rest/v1/leaderboard` +
      `?org=eq.${encodeURIComponent(slug)}` +
      `&select=*` +
      `&order=rank.asc`;

    const res = await fetch(endpoint, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Accept: "application/json"
      }
    });

    if (!res.ok) {
      const detail = await res.text();

      return Response.json(
        {
          ok: false,
          error: "Supabase request failed",
          detail
        },
        { status: 502 }
      );
    }

    const data = await res.json();

    const rows = Array.isArray(data)
      ? data
          .map((record) => ({
            id: record.id || "",
            org: record.org || "",
            rank: Number(record.rank || 0),
            player_name: record.player_name || "",
            timestamp: record.timestamp || "",
            solved_at: record.solved_at || record.timestamp || ""
          }))
          .filter((row) => row.rank > 0)
          .sort((a, b) => a.rank - b.rank)
      : [];

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
