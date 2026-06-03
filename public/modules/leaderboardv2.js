export function renderLeaderboardV2Page(app, data = {}, navigate) {
  const orgName = data.orgName || "";
  const slug = data.slug || "";
  const leaderboardEndpoint = data.leaderboardEndpoint || "/api/leaderboard";

  const BACKGROUND_URL = "/assets/winterword/leaderboard/background.png";
  const FOREGROUND_URL = "/assets/winterword/leaderboard/foreground.png";

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
      .ww-leaderboard-v2,
      .ww-leaderboard-v2 * {
        box-sizing: border-box;
      }

      .ww-leaderboard-v2 {
        --ww-ink: rgba(233, 244, 255, 0.96);
        --ww-muted: rgba(226, 238, 249, 0.74);
        --ww-faint: rgba(226, 238, 249, 0.42);
        --ww-gold: #f1d28a;
        --ww-gold-soft: #fff0c4;
        --ww-blue: #66d8ff;
        --ww-panel: rgba(3, 10, 18, 0.58);
        --ww-panel-deep: rgba(0, 4, 10, 0.70);

        position: relative;
        width: 100%;
        min-height: 100vh;
        overflow: hidden;

        font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
        color: var(--ww-ink);

        background:
          radial-gradient(circle at 50% 50%, rgba(68, 178, 255, 0.08), transparent 40%),
          #030812;
      }

      .ww-lb-bg {
        position: absolute;
        inset: 0;
        background-image: url("${BACKGROUND_URL}");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        transform: scale(1.01);
        filter: saturate(1.08) contrast(1.03);
        z-index: 0;
      }

      .ww-lb-vignette {
        position: absolute;
        inset: 0;
        z-index: 1;
        pointer-events: none;
        background:
          radial-gradient(ellipse at 50% 45%, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.08) 48%, rgba(0, 0, 0, 0.62) 100%),
          linear-gradient(180deg, rgba(0, 0, 0, 0.10), rgba(0, 0, 0, 0.28));
      }

      .ww-crack-glow {
        position: absolute;
        left: 23.6%;
        top: 11%;
        width: 4.8%;
        height: 75%;
        z-index: 2;
        pointer-events: none;
        background:
          radial-gradient(ellipse at center, rgba(121, 224, 255, 0.54), rgba(57, 172, 255, 0.25) 22%, rgba(57, 172, 255, 0.00) 62%);
        filter: blur(18px);
        opacity: 0.72;
        mix-blend-mode: screen;
        animation: wwCrackBreathe 5.8s ease-in-out infinite;
      }

      @keyframes wwCrackBreathe {
        0%, 100% {
          opacity: 0.46;
          transform: scaleX(0.88);
        }
        44% {
          opacity: 0.88;
          transform: scaleX(1.12);
        }
        58% {
          opacity: 0.64;
          transform: scaleX(0.96);
        }
      }

      .ww-lb-stage {
        position: relative;
        z-index: 5;
        width: min(76rem, 77vw);
        min-height: 100vh;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: clamp(7.8rem, 13vh, 10.8rem) clamp(1rem, 2vw, 2rem) clamp(5.2rem, 8vh, 7.2rem);
      }

      .ww-lb-panel {
        position: relative;
        width: min(46rem, 58vw);
        margin-left: clamp(5rem, 8.5vw, 8.4rem);
        padding: clamp(1.15rem, 1.9vw, 1.8rem);
        border-radius: 1.05rem;
        background:
          linear-gradient(180deg, rgba(4, 13, 22, 0.52), rgba(1, 6, 12, 0.72)),
          radial-gradient(circle at 50% 0%, rgba(120, 210, 255, 0.08), transparent 48%);
        border: 1px solid rgba(158, 227, 255, 0.22);
        box-shadow:
          0 0 30px rgba(80, 190, 255, 0.12),
          0 26px 90px rgba(0, 0, 0, 0.52),
          inset 0 0 0 1px rgba(255, 255, 255, 0.035);
        backdrop-filter: blur(3px);
      }

      .ww-lb-panel::before {
        content: "";
        position: absolute;
        inset: -1px;
        border-radius: inherit;
        pointer-events: none;
        background:
          linear-gradient(90deg, transparent, rgba(130, 226, 255, 0.16), transparent),
          linear-gradient(180deg, rgba(255,255,255,0.08), transparent 18%, transparent 82%, rgba(120,220,255,0.12));
        opacity: 0.78;
        mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
        -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
        padding: 1px;
        -webkit-mask-composite: xor;
        mask-composite: exclude;
      }

      .ww-record {
        position: relative;
        border-radius: 1rem;
        padding: clamp(1rem, 1.5vw, 1.35rem) clamp(1rem, 1.7vw, 1.5rem);
        margin-bottom: 0.9rem;
        overflow: hidden;
        background:
          radial-gradient(circle at 16% 0%, rgba(255, 225, 150, 0.20), transparent 34%),
          linear-gradient(135deg, rgba(129, 104, 62, 0.62), rgba(37, 39, 44, 0.58), rgba(3, 12, 20, 0.52));
        border: 1px solid rgba(255, 227, 166, 0.18);
        box-shadow:
          inset 0 1px 0 rgba(255, 255, 255, 0.12),
          0 18px 42px rgba(0, 0, 0, 0.24);
      }

      .ww-record::after {
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        background:
          linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.08) 42%, transparent 58%);
        transform: translateX(-110%);
        animation: wwHeroSheen 8.5s ease-in-out infinite;
      }

      @keyframes wwHeroSheen {
        0%, 58%, 100% {
          transform: translateX(-120%);
          opacity: 0;
        }
        70% {
          opacity: 0.8;
        }
        86% {
          transform: translateX(120%);
          opacity: 0;
        }
      }

      .ww-record-title {
        margin: 0 0 0.52rem;
        font-size: clamp(1rem, 1.5vw, 1.35rem);
        line-height: 1.05;
        letter-spacing: 0.13em;
        text-transform: uppercase;
        font-weight: 800;
        color: rgba(255,255,255,0.94);
        text-shadow: 0 2px 12px rgba(0,0,0,0.75);
      }

      .ww-record-meta {
        position: relative;
        z-index: 1;
        font-size: clamp(0.78rem, 0.88vw, 0.94rem);
        letter-spacing: 0.105em;
        text-transform: uppercase;
        color: rgba(248, 240, 219, 0.92);
        line-height: 1.72;
        text-shadow: 0 2px 10px rgba(0,0,0,0.70);
      }

      .ww-winner {
        font-weight: 1000;
        color: var(--ww-gold);
        letter-spacing: 0.16em;
        text-shadow:
          0 0 12px rgba(255, 206, 93, 0.28),
          0 2px 10px rgba(0,0,0,0.75);
      }

      .ww-divider-centre {
        position: relative;
        height: 1.2rem;
        margin: 0.48rem 0 0.48rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgba(232, 247, 255, 0.72);
        font-size: 0.9rem;
        text-shadow: 0 0 12px rgba(128, 220, 255, 0.5);
      }

      .ww-divider-centre::before,
      .ww-divider-centre::after {
        content: "";
        width: 38%;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(154, 225, 255, 0.28), transparent);
      }

      .ww-divider-centre span {
        padding: 0 1rem;
        transform: translateY(-1px);
      }

      .ww-ranks {
        position: relative;
        border-radius: 0.9rem;
        overflow: hidden;
        background:
          linear-gradient(180deg, rgba(9, 19, 31, 0.56), rgba(4, 10, 18, 0.66));
        border: 1px solid rgba(154, 225, 255, 0.16);
        box-shadow:
          inset 0 1px 0 rgba(255, 255, 255, 0.06),
          inset 0 -40px 90px rgba(0, 0, 0, 0.12);
      }

      .ww-ranks.scrollable {
        max-height: clamp(21rem, 45vh, 29rem);
        overflow-y: auto;
        overscroll-behavior: contain;
        scrollbar-width: thin;
        scrollbar-color: rgba(158, 227, 255, 0.38) rgba(255,255,255,0.06);
      }

      .ww-rankrow {
        min-height: clamp(2.35rem, 4.2vh, 3.05rem);
        display: grid;
        grid-template-columns: 3.6rem minmax(0, 1fr) minmax(9rem, 1fr);
        gap: 1rem;
        align-items: center;
        padding: 0.58rem 1rem;
        border-top: 1px solid rgba(216, 238, 255, 0.10);
        color: var(--ww-ink);
        text-shadow: 0 2px 10px rgba(0,0,0,0.78);
      }

      .ww-rankrow:first-child {
        border-top: none;
      }

      .ww-rankrow[data-rank="2"],
      .ww-rankrow.is-second {
        background:
          linear-gradient(90deg, rgba(255, 223, 148, 0.16), rgba(255, 223, 148, 0.04), transparent 70%);
      }

      .ww-rank {
        font-weight: 1000;
        color: rgba(238, 248, 255, 0.96);
        font-size: clamp(0.88rem, 1vw, 1rem);
      }

      .ww-name {
        min-width: 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: rgba(255,255,255,0.96);
        font-weight: 650;
      }

      .ww-solved {
        text-align: right;
        color: rgba(226, 241, 255, 0.86);
        white-space: nowrap;
        font-size: clamp(0.76rem, 0.88vw, 0.94rem);
      }

      .ww-rankrow.is-loaded[data-rank="2"] .ww-rank,
      .ww-rankrow.is-second .ww-rank,
      .ww-rankrow.is-second .ww-name {
        color: var(--ww-gold-soft);
      }

      .ww-status {
        position: absolute;
        left: -9999px;
        width: 1px;
        height: 1px;
        overflow: hidden;
      }

      .ww-base-link {
        position: fixed;
        left: clamp(1rem, 2.2vw, 2rem);
        bottom: clamp(1rem, 2.2vw, 2rem);
        z-index: 30;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 9.5rem;
        min-height: 2.65rem;
        padding: 0.72rem 1.25rem;
        border-radius: 999px;
        border: 1px solid rgba(190, 231, 255, 0.25);
        background: rgba(1, 8, 16, 0.58);
        color: rgba(255,255,255,0.92);
        text-decoration: none;
        text-transform: uppercase;
        letter-spacing: 0.18em;
        font-weight: 900;
        font-size: 0.68rem;
        box-shadow:
          0 18px 45px rgba(0,0,0,0.42),
          inset 0 1px 0 rgba(255,255,255,0.08);
        backdrop-filter: blur(7px);
      }

      .ww-base-link:hover {
        color: #fff;
        border-color: rgba(190, 231, 255, 0.45);
        box-shadow:
          0 18px 45px rgba(0,0,0,0.42),
          0 0 28px rgba(80, 190, 255, 0.16),
          inset 0 1px 0 rgba(255,255,255,0.08);
      }

      .ww-lb-foreground {
        position: absolute;
        left: 50%;
        bottom: 0;
        width: 100%;
        height: 100%;
        z-index: 18;
        transform: translateX(-50%);
        background-image: url("${FOREGROUND_URL}");
        background-size: cover;
        background-position: center bottom;
        background-repeat: no-repeat;
        pointer-events: none;
        opacity: 0.92;
        filter: saturate(1.04) contrast(1.02);
      }

      .ww-snow-near,
      .ww-snow-far,
      .ww-debris {
        position: absolute;
        inset: -12%;
        z-index: 20;
        pointer-events: none;
        overflow: hidden;
      }

      .ww-snow-far {
        opacity: 0.52;
        background-image:
          radial-gradient(circle, rgba(255,255,255,0.64) 0 1px, transparent 1.6px),
          radial-gradient(circle, rgba(210,235,255,0.46) 0 1px, transparent 1.8px),
          radial-gradient(circle, rgba(255,255,255,0.38) 0 1.3px, transparent 2px);
        background-size: 92px 92px, 138px 138px, 210px 210px;
        background-position: 0 0, 42px 70px, 110px 24px;
        animation: wwSnowFar 28s linear infinite;
      }

      .ww-snow-near {
        z-index: 22;
        opacity: 0.72;
        filter: blur(0.4px);
        background-image:
          radial-gradient(ellipse, rgba(255,255,255,0.78) 0 1.8px, transparent 2.7px),
          radial-gradient(ellipse, rgba(225,244,255,0.62) 0 2.3px, transparent 3.2px),
          radial-gradient(ellipse, rgba(255,255,255,0.56) 0 1.6px, transparent 2.6px);
        background-size: 180px 180px, 260px 260px, 330px 330px;
        background-position: 20px 0, 140px 60px, 40px 150px;
        animation: wwSnowNear 18s linear infinite;
      }

      .ww-debris {
        z-index: 23;
        opacity: 0.46;
        filter: blur(0.15px);
        background-image:
          linear-gradient(115deg, transparent 0 46%, rgba(235,248,255,0.55) 47% 49%, transparent 50%),
          linear-gradient(125deg, transparent 0 47%, rgba(120,205,255,0.42) 48% 50%, transparent 51%),
          linear-gradient(110deg, transparent 0 48%, rgba(255,224,155,0.38) 49% 50%, transparent 51%);
        background-size: 220px 180px, 310px 240px, 390px 320px;
        background-position: 30px 50px, 160px 20px, 80px 170px;
        animation: wwDebrisDrift 22s linear infinite;
        mix-blend-mode: screen;
      }

      @keyframes wwSnowFar {
        from {
          transform: translate3d(0, -6%, 0);
        }
        to {
          transform: translate3d(-5%, 10%, 0);
        }
      }

      @keyframes wwSnowNear {
        from {
          transform: translate3d(2%, -8%, 0);
        }
        to {
          transform: translate3d(-10%, 14%, 0);
        }
      }

      @keyframes wwDebrisDrift {
        from {
          transform: translate3d(4%, -7%, 0) rotate(0.001deg);
        }
        to {
          transform: translate3d(-8%, 12%, 0) rotate(0.001deg);
        }
      }

      @media (max-width: 1050px) {
        .ww-lb-stage {
          width: 100%;
          padding-top: 7rem;
          padding-bottom: 5.5rem;
        }

        .ww-lb-panel {
          width: min(42rem, 76vw);
          margin-left: clamp(2rem, 7vw, 5rem);
        }

        .ww-rankrow {
          grid-template-columns: 3rem minmax(0,1fr) minmax(7rem, 0.9fr);
        }
      }

      @media (max-width: 760px) {
        .ww-leaderboard-v2 {
          min-height: 100svh;
        }

        .ww-lb-bg {
          background-position: center;
        }

        .ww-lb-stage {
          min-height: 100svh;
          align-items: flex-end;
          padding: 7.2rem 0.95rem 4.8rem;
        }

        .ww-lb-panel {
          width: 100%;
          margin-left: 0;
          padding: 0.82rem;
          border-radius: 0.9rem;
        }

        .ww-record {
          padding: 0.92rem 1rem;
        }

        .ww-record-title {
          font-size: 0.96rem;
          letter-spacing: 0.07em;
        }

        .ww-record-meta {
          font-size: 0.72rem;
          letter-spacing: 0.07em;
        }

        .ww-rankrow {
          grid-template-columns: 2.35rem minmax(0,1fr) minmax(5.6rem, 0.74fr);
          gap: 0.55rem;
          padding: 0.54rem 0.68rem;
          min-height: 2.35rem;
        }

        .ww-solved {
          font-size: 0.68rem;
        }

        .ww-lb-foreground {
          background-size: 160% auto;
          background-position: center bottom;
          opacity: 0.86;
        }

        .ww-base-link {
          left: 50%;
          transform: translateX(-50%);
          bottom: 0.8rem;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .ww-crack-glow,
        .ww-record::after,
        .ww-snow-far,
        .ww-snow-near,
        .ww-debris {
          animation: none !important;
        }
      }
    </style>

    <div class="ww-leaderboard-v2">
      <div class="ww-lb-bg" aria-hidden="true"></div>
      <div class="ww-lb-vignette" aria-hidden="true"></div>
      <div class="ww-crack-glow" aria-hidden="true"></div>

      <main class="ww-lb-stage" aria-label="WinterWord Leaderboard">
        <section class="ww-lb-panel">
          <div class="ww-record">
            <h1 class="ww-record-title">The WinterWord is known.</h1>
            <div class="ww-record-meta">
              The ice was cracked by <span class="ww-winner" data-winner-name>—</span><br>
              <span data-winner-time>—</span><br>
              The board is open.
            </div>
          </div>

          <div class="ww-divider-centre" aria-hidden="true"><span>❄</span></div>

          <div class="ww-ranks" data-ranks-container>
            ${fixedRows}
          </div>

          <div class="ww-status" data-status aria-live="polite"></div>
        </section>
      </main>

      <a href="#" class="ww-base-link" data-nav-base>Base Station</a>

      <div class="ww-lb-foreground" aria-hidden="true"></div>
      <div class="ww-snow-far" aria-hidden="true"></div>
      <div class="ww-snow-near" aria-hidden="true"></div>
      <div class="ww-debris" aria-hidden="true"></div>
    </div>
  `;

  const baseLink = app.querySelector("[data-nav-base]");
  if (baseLink) {
    baseLink.addEventListener("click", function(event) {
      event.preventDefault();
      if (typeof navigate === "function") {
        navigate("base-station");
      }
    });
  }

  function setStatus(message) {
    const statusEl = app.querySelector("[data-status]");
    if (statusEl) statusEl.textContent = message;
  }

  function normaliseRows(payload) {
    if (Array.isArray(payload && payload.rows)) return payload.rows;

    if (Array.isArray(payload && payload.records)) {
      return payload.records.map(function(record) {
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
        .filter(function(row) {
          return row && row.rank != null;
        })
        .sort(function(a, b) {
          return Number(a.rank) - Number(b.rank);
        });

      if (!rows.length) {
        setStatus("No leaderboard records found.");
        return;
      }

      const winner = rows.find(function(row) {
        return Number(row.rank) === 1;
      });

      if (winner) {
        const winnerNameEl = app.querySelector("[data-winner-name]");
        const winnerTimeEl = app.querySelector("[data-winner-time]");

        if (winnerNameEl) winnerNameEl.textContent = winner.player_name || "—";
        if (winnerTimeEl) winnerTimeEl.textContent = formatTimestamp(winner.timestamp);
      }

      const ranksContainer = app.querySelector("[data-ranks-container]");
      const hasOverflow = rows.some(function(row) {
        return Number(row.rank) > 10;
      });

      if (hasOverflow && ranksContainer) {
        ranksContainer.classList.add("scrollable");

        ranksContainer.innerHTML = rows
          .filter(function(row) {
            return Number(row.rank) >= 2;
          })
          .map(function(row) {
            const rank = Number(row.rank);
            const secondClass = rank === 2 ? " is-second is-loaded" : " is-loaded";

            return (
              '<div class="ww-rankrow' + secondClass + '" data-rank="' + esc(rank) + '">' +
                '<div class="ww-rank">' + esc(row.rank) + '</div>' +
                '<div class="ww-name">' + esc(row.player_name || "—") + '</div>' +
                '<div class="ww-solved">' + esc(formatTimestamp(row.timestamp)) + '</div>' +
              '</div>'
            );
          })
          .join("");
      } else {
        rows.forEach(function(row) {
          const rank = Number(row.rank);

          if (!rank || rank < 2 || rank > 10) return;

          const rowEl = app.querySelector('[data-rank="' + rank + '"]');
          if (!rowEl) return;

          const nameEl = rowEl.querySelector(".ww-name");
          const solvedEl = rowEl.querySelector(".ww-solved");

          rowEl.classList.add("is-loaded");
          if (rank === 2) rowEl.classList.add("is-second");

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

export const renderLeaderboardPage = renderLeaderboardV2Page;
