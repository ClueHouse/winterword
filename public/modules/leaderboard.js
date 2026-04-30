export function renderLeaderboardPage(app, data = {}, navigate) {
  const orgName = data.orgName || "";
  const slug = data.slug || "";
  const leaderboardEndpoint = data.leaderboardEndpoint || "/api/leaderboard";

  function esc(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function getSlugFallback() {
    if (String(slug).trim()) return String(slug).trim();

    return String(
      window.location.pathname.split("/").filter(Boolean)[0] || ""
    ).trim();
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

  const safeOrgName = esc(orgName || "WinterWord");
  const safeSlug = getSlugFallback();

  const fixedRows = Array.from({ length: 9 }, function (_, index) {
    const rank = index + 2;

    return (
      '<div class="ww-rankrow" data-rank="' + rank + '">' +
        '<div class="ww-rank">' + rank + '</div>' +
        '<div class="ww-name">—</div>' +
        '<div class="ww-solved">—</div>' +
      '</div>'
    );
  }).join("");

  app.innerHTML = `
    <style>
      .ww-leaderboard-page,
      .ww-leaderboard-page * {
        box-sizing: border-box;
      }

      .ww-leaderboard-page {
        --ww-ink: #dce5ec;
        --ww-gold-soft: #f5ebd2;
        height: 100vh;
        padding: 2rem;
        font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
        color: var(--ww-ink);
        background-image: url("/assets/winterword/shared/leaderboardbg.png");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-attachment: fixed;
        position: relative;
        overflow: hidden;
      }

      .ww-leaderboard-page::before {
        content: "";
        position: absolute;
        inset: 0;
        background:
          radial-gradient(ellipse at center, rgba(0,0,0,0.14), rgba(0,0,0,0.76)),
          linear-gradient(90deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.00) 38%);
        pointer-events: none;
      }

      .ww-shell {
        position: relative;
        z-index: 1;
        max-width: 82rem;
        margin: 0 auto;
        height: calc(100vh - 4rem);
        border-radius: 1.75rem;
        overflow: hidden;
        background: rgba(0,0,0,0.48);
        backdrop-filter: blur(6px);
        box-shadow:
          0 30px 80px rgba(0,0,0,0.58),
          inset 0 0 0 1px rgba(255,255,255,0.05);
      }

      .ww-content {
        height: calc(100vh - 4rem);
        padding: 2.35rem 2.4rem;
        display: grid;
        grid-template-columns: 6.4rem minmax(0,1fr);
        gap: 2rem;
      }

      .ww-side {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .ww-side-logo {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: .8rem;
        text-decoration: none;
        cursor: default;
        user-select: none;
      }

      .ww-side-logo img {
        width: 9.6rem;
        display: block;
      }

      .ww-divider {
        width: 36px;
        height: 1px;
        background: rgba(255,255,255,0.18);
      }

      .ww-side-label {
        font-size: .72rem;
        letter-spacing: .22em;
        text-transform: uppercase;
        font-weight: 900;
        color: #ffffff;
      }

      .ww-main {
        display: flex;
        min-width: 0;
        min-height: 0;
      }

      .ww-board {
        position: relative;
        width: 100%;
        border-radius: 1.4rem;
        overflow: hidden;
      }

      .ww-board-media {
        position: absolute;
        inset: 0;
        background-image: url("/assets/winterword/shared/leaderboardbg.png");
        background-size: cover;
        background-position: center;
        filter: brightness(.74);
      }

      .ww-board-overlay {
        position: absolute;
        inset: 0;
        background:
          radial-gradient(1200px 820px at 78% 18%, rgba(0,0,0,0.34) 0%, rgba(0,0,0,0.18) 42%, rgba(0,0,0,0.00) 72%),
          linear-gradient(90deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.00) 35%);
      }

      .ww-board-inner {
        position: relative;
        z-index: 1;
        height: calc(100vh - 8.7rem);
        display: grid;
        grid-template-columns: minmax(15rem, 29%) minmax(0,1fr);
        min-height: 0;
      }

      .ww-board-right {
        display: flex;
        align-items: flex-start;
        justify-content: flex-end;
        padding: 3rem;
        min-height: 0;
      }

      .ww-leader-anchor {
        width: min(56rem, 100%);
      }

      .ww-leader-wrap {
        border-radius: 1.4rem;
        overflow: hidden;
        background: rgba(0,0,0,0.55);
        backdrop-filter: blur(8px);
        box-shadow: 0 40px 110px rgba(0,0,0,0.65);
      }

      .ww-leader-inner {
        padding: 1.5rem;
      }

      .ww-record {
        border-radius: 1.25rem;
        padding: 1.35rem 1.45rem;
        background: linear-gradient(135deg, rgba(186,152,86,0.32), rgba(128,104,62,0.22), rgba(255,255,255,0.08));
        margin-bottom: 0.95rem;
      }

      .ww-record h3 {
        margin: 0 0 0.45rem;
        font-size: 2rem;
        line-height: 1.1;
        color: #fff;
      }

      .ww-record-meta {
        font-size: 0.88rem;
        letter-spacing: 0.10em;
        text-transform: uppercase;
        color: var(--ww-gold-soft);
        line-height: 1.8;
      }

      .ww-winner {
        font-weight: 1000;
        font-size: 1.35em;
        letter-spacing: 0.16em;
      }

      .ww-divider-centre {
        text-align: center;
        margin: 0.65rem 0 0.75rem;
        color: #fff;
        opacity: 0.55;
      }

      .ww-status {
        margin: 0 0 0.9rem;
        font-size: 0.9rem;
        color: var(--ww-gold-soft);
        min-height: 1.2em;
      }

      .ww-ranks {
        border-radius: 1.05rem;
        overflow: hidden;
        background: rgba(255,255,255,0.06);
      }

      .ww-ranks.scrollable {
        height: 27.9rem;
        overflow-y: auto;
        overscroll-behavior: contain;
        scrollbar-width: thin;
      }

      .ww-rankrow {
        display: grid;
        grid-template-columns: 3.6rem 1fr 1fr;
        gap: 1rem;
        padding: 0.95rem 1.1rem;
        border-top: 1px solid rgba(255,255,255,0.06);
      }

      .ww-rankrow:first-child {
        border-top: none;
      }

      .ww-rank {
        font-weight: 900;
        color: #e6f5ff;
      }

      .ww-name {
        color: #fff;
      }

      .ww-solved {
        text-align: right;
        color: #e6f5ff;
      }
    </style>

    <div class="ww-leaderboard-page">
      <div class="ww-shell">
        <div class="ww-content">
          <div class="ww-side">
            <div class="ww-side-logo">
              <img src="/assets/winterword/shared/logo.png" alt="WinterWord">
              <div class="ww-divider"></div>
              <div class="ww-side-label">BASE STATION</div>
            </div>
          </div>

          <div class="ww-main">
            <div class="ww-board">
              <div class="ww-board-media"></div>
              <div class="ww-board-overlay"></div>

              <div class="ww-board-inner">
                <div></div>

                <div class="ww-board-right">
                  <div class="ww-leader-anchor">
                    <div class="ww-leader-wrap">
                      <div class="ww-leader-inner">
                        <div class="ww-record">
                          <h3>The WinterWord is known.</h3>
                          <div class="ww-record-meta">
                            The ice was cracked by <span class="ww-winner" data-winner-name>—</span><br>
                            <span data-winner-time>—</span><br>
                            The board is open.
                          </div>
                        </div>

                        <div class="ww-divider-centre">❄</div>
                        <div class="ww-status" data-status>Loading leaderboard…</div>

                        <div class="ww-ranks" data-ranks-container>
                          ${fixedRows}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  `;

  function setStatus(message) {
    const statusEl = app.querySelector("[data-status]");
    if (statusEl) statusEl.textContent = message;
  }

  function normaliseRows(payload) {
    if (Array.isArray(payload && payload.rows)) return payload.rows;

    if (Array.isArray(payload && payload.records)) {
      return payload.records.map(function (record) {
        const fields = record.fields || {};

        return {
          rank: fields.rank,
          player_name: fields.player_name,
          timestamp: fields.timestamp
        };
      });
    }

    return [];
  }

  async function loadLeaderboard() {
    if (!safeSlug) {
      setStatus("No organisation specified.");
      return;
    }

    try {
      const url = leaderboardEndpoint + "?slug=" + encodeURIComponent(safeSlug);

      const res = await fetch(url, {
        cache: "no-store"
      });

      if (!res.ok) {
        console.error("Leaderboard request failed:", res.status, await res.text());
        setStatus("Leaderboard failed to load.");
        return;
      }

      const payload = await res.json();

      const rows = normaliseRows(payload)
        .filter(function (row) {
          return row && row.rank != null;
        })
        .sort(function (a, b) {
          return Number(a.rank) - Number(b.rank);
        });

      if (!rows.length) {
        setStatus("No leaderboard records found.");
        return;
      }

      const winner = rows.find(function (row) {
        return Number(row.rank) === 1;
      });

      if (winner) {
        const winnerNameEl = app.querySelector("[data-winner-name]");
        const winnerTimeEl = app.querySelector("[data-winner-time]");

        if (winnerNameEl) winnerNameEl.textContent = winner.player_name || "—";
        if (winnerTimeEl) winnerTimeEl.textContent = formatTimestamp(winner.timestamp);
      }

      const ranksContainer = app.querySelector("[data-ranks-container]");
      const hasOverflow = rows.some(function (row) {
        return Number(row.rank) > 10;
      });

      if (hasOverflow && ranksContainer) {
        ranksContainer.classList.add("scrollable");

        ranksContainer.innerHTML = rows
          .filter(function (row) {
            return Number(row.rank) >= 2;
          })
          .map(function (row) {
            return (
              '<div class="ww-rankrow">' +
                '<div class="ww-rank">' + esc(row.rank) + '</div>' +
                '<div class="ww-name">' + esc(row.player_name || "—") + '</div>' +
                '<div class="ww-solved">' + esc(formatTimestamp(row.timestamp)) + '</div>' +
              '</div>'
            );
          })
          .join("");
      } else {
        rows.forEach(function (row) {
          const rank = Number(row.rank);

          if (!rank || rank < 2 || rank > 10) return;

          const rowEl = app.querySelector('[data-rank="' + rank + '"]');
          if (!rowEl) return;

          const nameEl = rowEl.querySelector(".ww-name");
          const solvedEl = rowEl.querySelector(".ww-solved");

          if (nameEl) nameEl.textContent = row.player_name || "—";
          if (solvedEl) solvedEl.textContent = formatTimestamp(row.timestamp);
        });
      }

      setStatus(safeOrgName + " leaderboard loaded.");
    } catch (error) {
      console.error("Leaderboard load error:", error);
      setStatus("Leaderboard load error.");
    }
  }

  loadLeaderboard();
}
