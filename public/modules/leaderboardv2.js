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
        --ww-gold: #f1d28a;
        --ww-gold-soft: #fff0c4;
        --ww-blue: #67dcff;

        position: relative;
        width: 100%;
        min-height: 100vh;
        overflow: hidden;

        font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
        color: var(--ww-ink);

        background:
          radial-gradient(circle at 50% 46%, rgba(68, 178, 255, 0.10), transparent 42%),
          #030812;
      }

      .ww-lb-bg {
        position: absolute;
        inset: 0;
        background-image: url("${BACKGROUND_URL}");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        transform: scale(1.006);
        filter: saturate(1.10) contrast(1.04) brightness(1.03);
        z-index: 0;
      }

      .ww-lb-vignette {
        position: absolute;
        inset: 0;
        z-index: 1;
        pointer-events: none;
        background:
          radial-gradient(ellipse at 50% 44%, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.05) 46%, rgba(0,0,0,0.60) 100%),
          linear-gradient(180deg, rgba(0,0,0,0.03), rgba(0,0,0,0.30));
      }

      .ww-crack-glow {
        position: absolute;
        left: 22.4%;
        top: 10%;
        width: 7.5%;
        height: 77%;
        z-index: 2;
        pointer-events: none;
        background:
          radial-gradient(ellipse at center, rgba(173, 240, 255, 0.66), rgba(74, 193, 255, 0.36) 20%, rgba(50, 156, 255, 0.12) 44%, rgba(50, 156, 255, 0.00) 72%);
        filter: blur(20px);
        opacity: 0.86;
        mix-blend-mode: screen;
        animation: wwCrackBreathe 5.8s ease-in-out infinite;
      }

      .ww-frame-glow {
        position: absolute;
        left: 16%;
        right: 14%;
        top: 10%;
        bottom: 12%;
        z-index: 2;
        pointer-events: none;
        border-radius: 1.4rem;
        box-shadow:
          0 0 22px rgba(101, 214, 255, 0.17),
          0 0 56px rgba(65, 166, 255, 0.11),
          inset 0 0 18px rgba(135, 228, 255, 0.09);
        opacity: 0.78;
        mix-blend-mode: screen;
      }

      @keyframes wwCrackBreathe {
        0%, 100% {
          opacity: 0.58;
          transform: scaleX(0.92);
        }
        44% {
          opacity: 0.98;
          transform: scaleX(1.16);
        }
        58% {
          opacity: 0.74;
          transform: scaleX(0.98);
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

        padding: clamp(6.3rem, 10.5vh, 8.5rem) clamp(1rem, 2vw, 2rem) clamp(7.2rem, 12vh, 10rem);
      }

      .ww-lb-panel {
        position: relative;
        width: min(45rem, 55vw);
        margin-left: clamp(4rem, 7.2vw, 7.5rem);
        transform: translateY(-2.4vh);

        padding: clamp(1.05rem, 1.75vw, 1.55rem);
        border-radius: 1rem;

        background:
          linear-gradient(180deg, rgba(4, 13, 22, 0.48), rgba(1, 6, 12, 0.70)),
          radial-gradient(circle at 50% 0%, rgba(120, 210, 255, 0.09), transparent 48%);

        border: 1px solid rgba(158, 227, 255, 0.23);

        box-shadow:
          0 0 26px rgba(80, 190, 255, 0.15),
          0 26px 90px rgba(0, 0, 0, 0.50),
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
          linear-gradient(90deg, transparent, rgba(130, 226, 255, 0.17), transparent),
          linear-gradient(180deg, rgba(255,255,255,0.09), transparent 18%, transparent 82%, rgba(120,220,255,0.13));
        opacity: 0.85;
        padding: 1px;
        -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
        -webkit-mask-composite: xor;
        mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
        mask-composite: exclude;
      }

      .ww-record {
        position: relative;
        border-radius: 0.95rem;
        padding: clamp(0.92rem, 1.35vw, 1.2rem) clamp(1rem, 1.55vw, 1.35rem);
        margin-bottom: 0.82rem;
        overflow: hidden;

        background:
          radial-gradient(circle at 12% 0%, rgba(255, 225, 150, 0.19), transparent 34%),
          linear-gradient(135deg, rgba(129, 104, 62, 0.58), rgba(37, 39, 44, 0.55), rgba(3, 12, 20, 0.50));

        border: 1px solid rgba(255, 227, 166, 0.18);

        box-shadow:
          inset 0 1px 0 rgba(255, 255, 255, 0.12),
          0 16px 40px rgba(0, 0, 0, 0.25);
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
        margin: 0 0 0.5rem;
        font-size: clamp(0.98rem, 1.35vw, 1.22rem);
        line-height: 1.05;
        letter-spacing: 0.13em;
        text-transform: uppercase;
        font-weight: 900;
        color: rgba(255,255,255,0.95);
        text-shadow: 0 2px 12px rgba(0,0,0,0.76);
      }

      .ww-record-meta {
        position: relative;
        z-index: 1;
        font-size: clamp(0.74rem, 0.82vw, 0.9rem);
        letter-spacing: 0.105em;
        text-transform: uppercase;
        color: rgba(248, 240, 219, 0.92);
        line-height: 1.66;
        text-shadow: 0 2px 10px rgba(0,0,0,0.72);
      }

      .ww-winner {
        font-weight: 1000;
        color: var(--ww-gold);
        letter-spacing: 0.16em;
        text-shadow:
          0 0 12px rgba(255, 206, 93, 0.34),
          0 2px 10px rgba(0,0,0,0.78);
      }

      .ww-divider-centre {
        position: relative;
        height: 1.1rem;
        margin: 0.42rem 0 0.45rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgba(232, 247, 255, 0.70);
        font-size: 0.82rem;
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
        border-radius: 0.86rem;
        overflow: hidden;

        background:
          linear-gradient(180deg, rgba(9, 19, 31, 0.52), rgba(4, 10, 18, 0.64));

        border: 1px solid rgba(154, 225, 255, 0.16);

        box-shadow:
          inset 0 1px 0 rgba(255, 255, 255, 0.055),
          inset 0 -40px 90px rgba(0, 0, 0, 0.12);
      }

      .ww-ranks.scrollable {
        max-height: clamp(20rem, 43vh, 27.8rem);
        overflow-y: auto;
        overscroll-behavior: contain;
        scrollbar-width: thin;
        scrollbar-color: rgba(158, 227, 255, 0.38) rgba(255,255,255,0.06);
      }

      .ww-rankrow {
        min-height: clamp(2.18rem, 3.9vh, 2.85rem);
        display: grid;
        grid-template-columns: 3.35rem minmax(0, 1fr) minmax(9rem, 1fr);
        gap: 1rem;
        align-items: center;
        padding: 0.5rem 0.95rem;

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
        font-size: clamp(0.86rem, 0.96vw, 0.98rem);
      }

      .ww-name {
        min-width: 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: rgba(255,255,255,0.96);
        font-weight: 700;
      }

      .ww-solved {
        text-align: right;
        color: rgba(226, 241, 255, 0.86);
        white-space: nowrap;
        font-size: clamp(0.74rem, 0.84vw, 0.9rem);
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
        z-index: 40;

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
        bottom: -1.6%;
        width: 84%;
        height: 62%;
        z-index: 18;
        transform: translateX(-50%);

        background-image: url("${FOREGROUND_URL}");
        background-size: contain;
        background-position: center bottom;
        background-repeat: no-repeat;

        pointer-events: none;
        opacity: 0.84;
        filter: saturate(0.98) contrast(1.02);
      }

      .ww-snow-field,
      .ww-ice-flecks {
        position: absolute;
        inset: -12%;
        pointer-events: none;
        overflow: hidden;
      }

      .ww-snow-field {
        z-index: 22;
        opacity: 0.52;
        background-image:
          radial-gradient(circle, rgba(255,255,255,0.66) 0 1.1px, transparent 1.8px),
          radial-gradient(circle, rgba(220,241,255,0.48) 0 1px, transparent 1.7px),
          radial-gradient(circle, rgba(255,255,255,0.34) 0 1.4px, transparent 2.2px);
        background-size: 128px 128px, 188px 188px, 286px 286px;
        background-position: 0 0, 70px 50px, 130px 110px;
        animation: wwSnowDrift 34s linear infinite;
      }

      .ww-snow-field::before {
        content: "";
        position: absolute;
        inset: -8%;
        background-image:
          radial-gradient(circle, rgba(255,255,255,0.56) 0 1.9px, transparent 3px),
          radial-gradient(circle, rgba(225,245,255,0.48) 0 2.4px, transparent 3.6px);
        background-size: 260px 260px, 380px 380px;
        background-position: 30px 30px, 180px 120px;
        filter: blur(0.6px);
        animation: wwSnowDriftNear 26s linear infinite;
      }

      .ww-ice-flecks {
        z-index: 23;
        opacity: 0.26;
        background-image:
          radial-gradient(ellipse at center, rgba(130, 219, 255, 0.54) 0 1.8px, transparent 3.5px),
          radial-gradient(ellipse at center, rgba(255, 230, 160, 0.28) 0 1.2px, transparent 2.8px),
          radial-gradient(ellipse at center, rgba(235, 248, 255, 0.42) 0 1.6px, transparent 3.2px);
        background-size: 240px 190px, 330px 260px, 420px 340px;
        background-position: 40px 60px, 160px 20px, 90px 180px;
        animation: wwFlecksDrift 31s linear infinite;
        mix-blend-mode: screen;
      }

      @keyframes wwSnowDrift {
        from {
          transform: translate3d(1%, -8%, 0);
        }
        to {
          transform: translate3d(-5%, 12%, 0);
        }
      }

      @keyframes wwSnowDriftNear {
        from {
          transform: translate3d(3%, -9%, 0);
        }
        to {
          transform: translate3d(-7%, 15%, 0);
        }
      }

      @keyframes wwFlecksDrift {
        from {
          transform: translate3d(3%, -6%, 0) rotate(0.001deg);
        }
        to {
          transform: translate3d(-6%, 10%, 0) rotate(0.001deg);
        }
      }

      @media (max-width: 1050px) {
        .ww-lb-stage {
          width: 100%;
          padding-top: 6.5rem;
          padding-bottom: 7.6rem;
        }

        .ww-lb-panel {
          width: min(42rem, 75vw);
          margin-left: clamp(2rem, 6vw, 5rem);
          transform: translateY(-1.6vh);
        }

        .ww-rankrow {
          grid-template-columns: 3rem minmax(0,1fr) minmax(7rem, 0.9fr);
        }

        .ww-lb-foreground {
          width: 94%;
          height: 58%;
        }
      }

      @media (max-width: 760px) {
        .ww-leaderboard-v2 {
          min-height: 100svh;
        }

        .ww-lb-bg {
          background-position: center;
        }

        .ww-frame-glow {
          left: 6%;
          right: 6%;
          top: 10%;
          bottom: 14%;
        }

        .ww-crack-glow {
          left: 10%;
          width: 16%;
        }

        .ww-lb-stage {
          min-height: 100svh;
          align-items: flex-end;
          padding: 7.2rem 0.95rem 5.1rem;
        }

        .ww-lb-panel {
          width: 100%;
          margin-left: 0;
          transform: translateY(-1vh);
          padding: 0.78rem;
          border-radius: 0.9rem;
        }

        .ww-record {
          padding: 0.88rem 0.95rem;
        }

        .ww-record-title {
          font-size: 0.94rem;
          letter-spacing: 0.07em;
        }

        .ww-record-meta {
          font-size: 0.70rem;
          letter-spacing: 0.07em;
        }

        .ww-rankrow {
          grid-template-columns: 2.35rem minmax(0,1fr) minmax(5.6rem, 0.74fr);
          gap: 0.55rem;
          padding: 0.52rem 0.64rem;
          min-height: 2.28rem;
        }

        .ww-solved {
          font-size: 0.66rem;
        }

        .ww-lb-foreground {
          width: 150%;
          height: 48%;
          bottom: -0.8%;
          opacity: 0.74;
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
        .ww-snow-field,
        .ww-snow-field::before,
        .ww-ice-flecks {
          animation: none !important;
        }
      }
    </style>

    <div class="ww-leaderboard-v2">
      <div class="ww-lb-bg" aria-hidden="true"></div>
      <div class="ww-lb-vignette" aria-hidden="true"></div>
      <div class="ww-crack-glow" aria-hidden="true"></div>
      <div class="ww-frame-glow" aria-hidden="true"></div>

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
      <div class="ww-snow-field" aria-hidden="true"></div>
      <div class="ww-ice-flecks" aria-hidden="true"></div>
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
