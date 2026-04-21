export function renderLeaderboardPage(app, data, navigate) {
  const {
    orgName = "",
    seasonLabel = "WINTERWORD • 2026",
    slug = "",
    leaderboardEndpoint = "/api/leaderboard"
  } = data || {};

  function esc(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatTimestamp(value) {
    if (!value) return "—";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return String(value);
    return d.toLocaleString("en-NZ", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit"
    });
  }

  const safeOrgName = esc(orgName);
  const safeSeasonLabel = esc(seasonLabel);
  const safeSlug = String(slug || "").trim();

  app.innerHTML = `
    <div style="padding:40px;color:#fff;">
      <h1>Leaderboard</h1>
      <p data-status>Loading leaderboard…</p>
      <div id="rows"></div>
    </div>
  `;

  function setStatus(message) {
    const statusEl = app.querySelector("[data-status]");
    if (statusEl) statusEl.textContent = message;
  }

  async function loadLeaderboard() {
    if (!safeSlug) {
      setStatus("No organisation specified.");
      return;
    }

    try {
      const res = await fetch(`${leaderboardEndpoint}?slug=${encodeURIComponent(safeSlug)}`, {
        cache: "no-store"
      });

      if (!res.ok) {
        setStatus("Leaderboard failed to load.");
        return;
      }

      const payload = await res.json();
      const rows = Array.isArray(payload?.rows) ? payload.rows : [];

      if (!rows.length) {
        setStatus("No leaderboard records found.");
        return;
      }

      const container = app.querySelector("#rows");

      container.innerHTML = rows.map(r => `
        <div>
          <strong>#${r.rank}</strong> ${r.player_name} — ${formatTimestamp(r.timestamp)}
        </div>
      `).join("");

      setStatus("Leaderboard loaded.");
    } catch (error) {
      console.error(error);
      setStatus("Leaderboard load error.");
    }
  }

  loadLeaderboard();
}
