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

  function getSlugFallback() {
    const fromData = String(slug || "").trim();
    if (fromData) return fromData;

    const pathSlug = window.location.pathname
      .split("/")
      .filter(Boolean)[0];

    return String(pathSlug || "").trim();
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
