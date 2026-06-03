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
        /*
          QUICK TUNING CONTROLS
          These lock the live leaderboard content to the baked artwork.
          Change these first before touching individual rows.
        */
        --ww-board-left: 30.0%;
        --ww-board-top: 25%;
        --ww-board-width: 40.8%;
        --ww-board-height: 57.2%;

        --ww-board-nudge-x: 0%;
        --ww-board-nudge-y: 0%;

        --ww-ink: rgba(244, 249, 255, 0.97);
        --ww-muted: rgba(226, 238, 249, 0.74);
        --ww-gold: #f1d18a;
        --ww-gold-hot: #fff0bd;
        --ww-blue: #67dcff;

        position: relative;
        width: 100%;
        min-height: 100vh;
        overflow: hidden;

        font-family:
          "Georgia",
          "Times New Roman",
          system-ui,
          -apple-system,
          "Segoe UI",
          sans-serif;

        color: var(--ww-ink);

        background:
          radial-gradient(circle at 50% 46%, rgba(68, 178, 255, 0.12), transparent 42%),
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
        filter: saturate(1.12) contrast(1.05) brightness(1.04);
        z-index: 0;
      }

      .ww-lb-vignette {
        position: absolute;
        inset: 0;
        z-index: 1;
        pointer-events: none;
        background:
          radial-gradient(ellipse at 50% 43%, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.035) 45%, rgba(0,0,0,0.56) 100%),
          linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.26));
      }

      .ww-crack-glow {
        position: absolute;
        left: 22.2%;
        top: 9%;
        width: 8%;
        height: 78%;
        z-index: 2;
        pointer-events: none;
        background:
          radial-gradient(ellipse at center, rgba(185, 244, 255, 0.72), rgba(82, 202, 255, 0.40) 20%, rgba(50, 156, 255, 0.14) 44%, rgba(50, 156, 255, 0.00) 72%);
        filter: blur(22px);
        opacity: 0.9;
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
          0 0 26px rgba(101, 214, 255, 0.19),
          0 0 68px rgba(65, 166, 255, 0.13),
          inset 0 0 22px rgba(135, 228, 255, 0.11);
        opacity: 0.82;
        mix-blend-mode: screen;
      }

      @keyframes wwCrackBreathe {
        0%, 100% {
          opacity: 0.62;
          transform: scaleX(0.92);
        }
        44% {
          opacity: 1;
          transform: scaleX(1.18);
        }
        58% {
          opacity: 0.76;
          transform: scaleX(0.98);
        }
      }

      .ww-board-artboard {
        position: absolute;
        z-index: 5;

        left: calc(var(--ww-board-left) + var(--ww-board-nudge-x));
        top: calc(var(--ww-board-top) + var(--ww-board-nudge-y));
        width: var(--ww-board-width);
        height: var(--ww-board-height);

        display: flex;
        align-items: stretch;
        justify-content: stretch;

        pointer-events: auto;
      }

      .ww-lb-panel {
        position: relative;
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        min-height: 0;

        padding: clamp(0.75rem, 1.25vw, 1.25rem);
        border-radius: 1rem;

        background:
          linear-gradient(180deg, rgba(4, 13, 22, 0.16), rgba(1, 6, 12, 0.34)),
          radial-gradient(circle at 50% 0%, rgba(120, 210, 255, 0.05), transparent 52%);

        border: 1px solid rgba(158, 227, 255, 0.14);

        box-shadow:
          0 0 20px rgba(80, 190, 255, 0.08),
          0 24px 80px rgba(0, 0, 0, 0.30),
          inset 0 0 0 1px rgba(255, 255, 255, 0.022);

        backdrop-filter: blur(1.8px);
      }

      .ww-lb-panel::before {
        content: "";
        position: absolute;
        inset: -1px;
        border-radius: inherit;
        pointer-events: none;
        background:
          linear-gradient(90deg, transparent, rgba(130, 226, 255, 0.11), transparent),
          linear-gradient(180deg, rgba(255,255,255,0.055), transparent 18%, transparent 82%, rgba(120,220,255,0.08));
        opacity: 0.62;
        padding: 1px;
        -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
        -webkit-mask-composite: xor;
        mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
        mask-composite: exclude;
      }

      .ww-first-place {
        position: relative;
        flex: 0 0 auto;

        display: grid;
        grid-template-columns: auto auto minmax(0, 1fr);
        grid-template-areas:
          "crown rank name"
          "crown rank time";
        align-items: center;
        column-gap: clamp(0.55rem, 1vw, 1rem);
        row-gap: 0.2rem;

        margin-bottom: clamp(0.78rem, 1.2vh, 1rem);
        padding: clamp(0.62rem, 1vw, 0.95rem) clamp(0.75rem, 1.35vw, 1.25rem);

        border-radius: 0.85rem;
        overflow: hidden;

        background:
          radial-gradient(circle at 16% 0%, rgba(255, 224, 150, 0.13), transparent 36%),
          linear-gradient(135deg, rgba(113, 88, 43, 0.27), rgba(7, 18, 28, 0.30), rgba(3, 10, 18, 0.22));

        border: 1px solid rgba(255, 224, 154, 0.16);

        box-shadow:
          inset 0 1px 0 rgba(255,255,255,0.09),
          0 0 20px rgba(255, 207, 101, 0.08),
          0 14px 34px rgba(0,0,0,0.22);
      }

      .ww-first-place::after {
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        background:
          linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.055) 42%, transparent 58%);
        transform: translateX(-110%);
        animation: wwHeroSheen 8.5s ease-in-out infinite;
      }

      @keyframes wwHeroSheen {
        0%, 58%, 100% {
          transform: translateX(-120%);
          opacity: 0;
        }
        70% {
          opacity: 0.7;
        }
        86% {
          transform: translateX(120%);
          opacity: 0;
        }
      }

      .ww-first-crown {
        grid-area: crown;
        position: relative;
        z-index: 1;

        font-family: Georgia, "Times New Roman", serif;
        font-size: clamp(2.25rem, 3.7vw, 4.2rem);
        line-height: 0.8;
        color: var(--ww-gold);

        text-shadow:
          0 0 16px rgba(255, 213, 105, 0.28),
          0 4px 12px rgba(0,0,0,0.78);
      }

      .ww-first-rank {
        grid-area: rank;
        position: relative;
        z-index: 1;

        font-family: Georgia, "Times New Roman", serif;
        font-size: clamp(2.25rem, 4.1vw, 4.7rem);
        line-height: 0.86;
        font-weight: 900;
        color: var(--ww-gold);

        text-shadow:
          0 0 16px rgba(255, 213, 105, 0.25),
          0 4px 12px rgba(0,0,0,0.78);
      }

      .ww-first-name {
        grid-area: name;
        position: relative;
        z-index: 1;

        min-width: 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(1.2rem, 2vw, 2rem);
        line-height: 0.95;
        font-weight: 900;
        letter-spacing: 0.035em;
        color: var(--ww-gold-hot);
        text-transform: uppercase;

        text-shadow:
          0 0 18px rgba(255, 213, 105, 0.26),
          0 4px 12px rgba(0,0,0,0.82);
      }

      .ww-first-time {
        grid-area: time;
        position: relative;
        z-index: 1;

        padding-top: 0.15rem;

        font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
        color: rgba(255, 240, 196, 0.82);
        font-size: clamp(0.68rem, 0.78vw, 0.86rem);
        font-weight: 650;
        letter-spacing: 0.075em;
        white-space: nowrap;
        text-shadow: 0 2px 10px rgba(0,0,0,0.76);
      }

      .ww-ranks {
        position: relative;
        flex: 1 1 auto;
        min-height: 0;

        border-radius: 0.82rem;
        overflow: hidden;

        background:
          linear-gradient(180deg, rgba(7, 18, 30, 0.18), rgba(2, 8, 16, 0.30));

        border: 1px solid rgba(154, 225, 255, 0.10);

        box-shadow:
          inset 0 1px 0 rgba(255, 255, 255, 0.035),
          inset 0 -40px 90px rgba(0, 0, 0, 0.07);
      }

      .ww-ranks.scrollable {
        overflow-y: auto;
        overscroll-behavior: contain;
        scrollbar-width: thin;
        scrollbar-color: rgba(158, 227, 255, 0.34) rgba(255,255,255,0.04);
      }

      .ww-rankrow {
        min-height: 10.85%;
        display: grid;
        grid-template-columns: 3.7rem minmax(0, 1fr) minmax(8.5rem, 1fr);
        gap: 1rem;
        align-items: center;
        padding: 0.38rem 0.95rem;

        border-top: 1px solid rgba(216, 238, 255, 0.075);

        color: var(--ww-ink);
        text-shadow:
          0 2px 10px rgba(0,0,0,0.84),
          0 0 10px rgba(0,0,0,0.32);
      }

      .ww-rankrow:first-child {
        border-top: none;
      }

      .ww-rankrow[data-rank="2"],
      .ww-rankrow.is-second {
        background:
          linear-gradient(90deg, rgba(255, 223, 148, 0.06), rgba(255, 223, 148, 0.015), transparent 70%);
      }

      .ww-rank {
        font-family: Georgia, "Times New Roman", serif;
        font-weight: 900;
        color: rgba(250, 253, 255, 0.98);
        font-size: clamp(1rem, 1.2vw, 1.28rem);
      }

      .ww-name {
        min-width: 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        font-family: Georgia, "Times New Roman", serif;
        color: rgba(255,255,255,0.98);
        font-weight: 800;
        font-size: clamp(1.02rem, 1.2vw, 1.3rem);
        letter-spacing: 0.02em;
      }

      .ww-solved {
        text-align: right;
        color: rgba(226, 241, 255, 0.87);
        white-space: nowrap;

        font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
        font-size: clamp(0.72rem, 0.86vw, 0.94rem);
        font-weight: 520;
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
        font-family: system-ui, -apple-system, "Segoe UI", sans-serif;

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
        display: none;
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
        opacity: 0;
      }

      .ww-snow-back,
      .ww-snow-mid,
      .ww-snow-near,
      .ww-ice-flecks {
        position: absolute;
        inset: -14%;
        pointer-events: none;
        overflow: hidden;
      }

      .ww-snow-back {
        z-index: 21;
        opacity: 0.42;
        background-image:
          radial-gradient(circle, rgba(255,255,255,0.50) 0 1.4px, transparent 2.8px),
          radial-gradient(circle, rgba(220,241,255,0.34) 0 1.2px, transparent 2.5px);
        background-size: 170px 170px, 250px 250px;
        background-position: 0 0, 80px 50px;
        filter: blur(0.4px);
        animation: wwSnowBack 42s linear infinite;
      }

      .ww-snow-mid {
        z-index: 22;
        opacity: 0.50;
        background-image:
          radial-gradient(circle, rgba(255,255,255,0.58) 0 2.8px, transparent 5px),
          radial-gradient(circle, rgba(225,245,255,0.44) 0 3.5px, transparent 6.2px);
        background-size: 330px 330px, 460px 460px;
        background-position: 40px 20px, 210px 120px;
        filter: blur(1.35px);
        animation: wwSnowMid 31s linear infinite;
      }

      .ww-snow-near {
        z-index: 24;
        opacity: 0.43;
        background-image:
          radial-gradient(circle, rgba(255,255,255,0.54) 0 7px, transparent 13px),
          radial-gradient(circle, rgba(224,242,255,0.38) 0 10px, transparent 18px);
        background-size: 620px 620px, 880px 880px;
        background-position: 80px 140px, 500px 60px;
        filter: blur(4.4px);
        animation: wwSnowNear 24s linear infinite;
      }

      .ww-ice-flecks {
        z-index: 23;
        opacity: 0.14;
        background-image:
          radial-gradient(ellipse at center, rgba(130, 219, 255, 0.36) 0 2px, transparent 4px),
          radial-gradient(ellipse at center, rgba(255, 230, 160, 0.18) 0 1.4px, transparent 3px),
          radial-gradient(ellipse at center, rgba(235, 248, 255, 0.30) 0 1.8px, transparent 3.8px);
        background-size: 280px 230px, 390px 300px, 520px 420px;
        background-position: 40px 60px, 180px 20px, 90px 190px;
        animation: wwFlecksDrift 36s linear infinite;
        mix-blend-mode: screen;
      }

      @keyframes wwSnowBack {
        from {
          transform: translate3d(1%, -7%, 0);
        }
        to {
          transform: translate3d(-4%, 12%, 0);
        }
      }

      @keyframes wwSnowMid {
        from {
          transform: translate3d(3%, -9%, 0);
        }
        to {
          transform: translate3d(-8%, 15%, 0);
        }
      }

      @keyframes wwSnowNear {
        from {
          transform: translate3d(4%, -10%, 0) scale(1.02);
        }
        to {
          transform: translate3d(-10%, 17%, 0) scale(1.06);
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
        .ww-leaderboard-v2 {
          --ww-board-left: 26%;
          --ww-board-top: 20%;
          --ww-board-width: 58%;
          --ww-board-height: 58%;
        }

        .ww-rankrow {
          grid-template-columns: 3rem minmax(0,1fr) minmax(7rem, 0.9fr);
        }
      }

      @media (max-width: 760px) {
        .ww-leaderboard-v2 {
          min-height: 100svh;

          --ww-board-left: 5%;
          --ww-board-top: 28%;
          --ww-board-width: 90%;
          --ww-board-height: 54%;
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

        .ww-lb-panel {
          padding: 0.72rem;
          border-radius: 0.9rem;
        }

        .ww-first-place {
          grid-template-columns: auto auto minmax(0, 1fr);
          column-gap: 0.55rem;
          padding: 0.7rem 0.78rem;
        }

        .ww-first-crown {
          font-size: 1.65rem;
        }

        .ww-first-rank {
          font-size: 2rem;
        }

        .ww-first-name {
          font-size: 1.55rem;
        }

        .ww-first-time {
          font-size: 0.62rem;
        }

        .ww-rankrow {
          grid-template-columns: 2.35rem minmax(0,1fr) minmax(5.6rem, 0.74fr);
          gap: 0.55rem;
          padding: 0.52rem 0.62rem;
          min-height: 2.35rem;
        }

        .ww-rank,
        .ww-name {
          font-size: 0.9rem;
        }

        .ww-solved {
          font-size: 0.64rem;
        }

        .ww-base-link {
          left: 50%;
          transform: translateX(-50%);
          bottom: 0.8rem;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .ww-crack-glow,
        .ww-first-place::after,
        .ww-snow-back,
        .ww-snow-mid,
        .ww-snow-near,
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

      <main class="ww-board-artboard" aria-label="WinterWord Leaderboard">
        <section class="ww-lb-panel">
          <div class="ww-first-place">
            <div class="ww-first-crown" aria-hidden="true">♛</div>
            <div class="ww-first-rank">1</div>
<div class="ww-first-name" data-winner-name>—</div>
<div class="ww-first-time">
  cracked the ice at
  <span data-winner-time>—</span>
</div>
          </div>

          <div class="ww-ranks" data-ranks-container>
            ${fixedRows}
          </div>

          <div class="ww-status" data-status aria-live="polite"></div>
        </section>
      </main>

      <a href="#" class="ww-base-link" data-nav-base>Base Station</a>

      <div class="ww-lb-foreground" aria-hidden="true"></div>
      <div class="ww-snow-back" aria-hidden="true"></div>
      <div class="ww-snow-mid" aria-hidden="true"></div>
      <div class="ww-ice-flecks" aria-hidden="true"></div>
      <div class="ww-snow-near" aria-hidden="true"></div>
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
