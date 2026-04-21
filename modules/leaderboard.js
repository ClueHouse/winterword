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
    <style>
      :root{
        --ww-ink:#dce5ec;
        --ww-muted:rgba(220,229,236,0.72);
        --ww-gold-soft:#f5ebd2;
      }

      *{box-sizing:border-box;}
      html,body{margin:0;padding:0;}

      body{
        margin:0;
        font-family:system-ui,-apple-system,"Segoe UI",sans-serif;
        color:var(--ww-ink);
        background-image:url("/cgi/image/LBOARD_GwUXASF-YOYOKGbezzuKq.png?width=1920&quality=80&format=auto");
        background-size:cover;
        background-position:center;
        background-repeat:no-repeat;
        background-attachment:fixed;
      }

      body::before{
        content:"";
        position:fixed;
        inset:0;
        background:
          radial-gradient(ellipse at center, rgba(0,0,0,0.14), rgba(0,0,0,0.76)),
          linear-gradient(90deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.00) 38%);
        pointer-events:none;
      }

      #app{
        position:relative;
        z-index:1;
      }

      #wwPage{
        min-height:100vh;
        padding:2rem;
      }

      #wwShell{
        max-width:82rem;
        margin:0 auto;
        min-height:calc(100vh - 4rem);
        border-radius:1.75rem;
        overflow:hidden;
        background:rgba(0,0,0,0.48);
        backdrop-filter:blur(6px);
        box-shadow:
          0 30px 80px rgba(0,0,0,0.58),
          inset 0 0 0 1px rgba(255,255,255,0.05);
      }

      #wwContent{
        min-height:calc(100vh - 4rem);
        padding:2.35rem 2.4rem;
        display:grid;
        grid-template-columns:6.4rem minmax(0,1fr);
        gap:2rem;
      }

      .ww-side{
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        gap:1.35rem;
      }

      .ww-side-logo{
        display:flex;
        flex-direction:column;
        align-items:center;
        gap:.8rem;
        text-decoration:none;
        cursor:pointer;
      }

      .ww-side-logo img{
        width:9.6rem;
        display:block;
      }

      .ww-divider{
        width:36px;
        height:1px;
        background:rgba(255,255,255,0.18);
      }

      .ww-side-label{
        font-size:.72rem;
        letter-spacing:.22em;
        text-transform:uppercase;
        font-weight:900;
        color:#ffffff;
        text-shadow:
          0 1px 2px rgba(0,0,0,0.75),
          0 0 4px rgba(255,255,255,0.04);
      }

      .ww-main{
        display:flex;
        min-width:0;
      }

      .ww-board{
        position:relative;
        width:100%;
        border-radius:1.4rem;
        overflow:hidden;
      }

      .ww-board-media{
        position:absolute;
        inset:0;
        background-image:url("/cgi/image/LBOARD_GwUXASF-YOYOKGbezzuKq.png?width=1920&quality=80&format=auto");
        background-size:cover;
        background-position:center;
        filter:brightness(.74);
      }

      .ww-board-overlay{
        position:absolute;
        inset:0;
        background:
          radial-gradient(1200px 820px at 78% 18%, rgba(0,0,0,0.34) 0%, rgba(0,0,0,0.18) 42%, rgba(0,0,0,0.00) 72%),
          linear-gradient(90deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.00) 35%);
      }

      .ww-board-inner{
        position:relative;
        z-index:1;
        min-height:calc(100vh - 8.7rem);
        display:grid;
        grid-template-columns:minmax(15rem, 29%) minmax(0,1fr);
      }

      .ww-board-right{
        display:flex;
        align-items:flex-start;
        justify-content:flex-end;
        padding:3rem;
      }

      .ww-leader-anchor{
        width:min(56rem, 100%);
      }

      .ww-leader-wrap{
        border-radius:1.4rem;
        overflow:hidden;
        background:rgba(0,0,0,0.55);
        backdrop-filter:blur(8px);
        box-shadow:0 40px 110px rgba(0,0,0,0.65);
      }

      .ww-leader-inner{
        padding:1.5rem;
      }

      .ww-record{
        border-radius:1.25rem;
        padding:1.35rem 1.45rem;
        background:linear-gradient(135deg, rgba(186,152,86,0.32) 0%, rgba(128,104,62,0.22) 55%, rgba(255,255,255,0.08) 100%);
        margin-bottom:0.95rem;
      }

      .ww-record h3{
        margin:0 0 0.45rem;
        font-size:2rem;
        line-height:1.1;
        color:#fff;
        text-shadow:0 4px 16px rgba(0,0,0,0.35);
      }

      .ww-record-meta{
        font-size:0.88rem;
        letter-spacing:0.10em;
        text-transform:uppercase;
        color:var(--ww-gold-soft);
        line-height:1.8;
      }

      .ww-winner{
        font-weight:1000;
        font-size:1.35em;
        letter-spacing:0.16em;
      }

      .ww-divider-centre{
        text-align:center;
        margin:0.65rem 0 0.75rem;
        color:#fff;
        opacity:0.55;
      }

      .ww-status{
        margin:0 0 0.9rem;
        font-size:0.9rem;
        color:var(--ww-gold-soft);
        min-height:1.2em;
      }

      .ww-ranks{
        border-radius:1.05rem;
        overflow:hidden;
        background:rgba(255,255,255,0.06);
        backdrop-filter:blur(4px);
      }

      .ww-rankrow{
        display:grid;
        grid-template-columns:3.6rem 1fr 1fr;
        gap:1rem;
        padding:0.95rem 1.1rem;
        border-top:1px solid rgba(255,255,255,0.06);
      }

      .ww-rankrow:first-child{
        border-top:none;
      }

      .ww-rank{
        font-weight:900;
        color:#e6f5ff;
      }

      .ww-name{
        color:#fff;
      }

      .ww-solved{
        text-align:right;
        color:#e6f5ff;
      }

      @media (max-width:980px){
        #wwPage{padding:1rem;}

        #wwShell{
          min-height:calc(100vh - 2rem);
        }

        #wwContent{
          min-height:calc(100vh - 2rem);
          grid-template-columns:1fr;
          gap:1.25rem;
          padding:1.25rem;
        }

        .ww-side{
          justify-content:flex-start;
        }

        .ww-side-logo img{
          width:7.6rem;
        }

        .ww-board-inner{
          grid-template-columns:1fr;
        }

        .ww-board-right{
          justify-content:center;
          padding:1.5rem;
        }

        body{
          background-attachment:scroll;
        }
      }
    </style>

    <div id="wwPage">
      <div id="wwShell">
        <div id="wwContent">

          <div class="ww-side">
            <div class="ww-side-logo" id="wwBaseStationLink" role="button" tabindex="0" aria-label="Go to Base Station">
              <img src="/cgi/image/WWLogo_-IrZfgR1CvN9DRDc2uq8H.png?width=828&quality=80&format=auto" alt="WinterWord">
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
                            ${safeOrgName ? `Organisation: <span class="ww-winner">${safeOrgName}</span><br>` : ""}
                            ${safeSeasonLabel}<br>
                            The ice was cracked by <span class="ww-winner" data-winner-name>—</span><br>
                            <span data-winner-time>—</span><br>
                            The board is open.
                          </div>
                        </div>

                        <div class="ww-divider-centre">❄</div>
                        <div class="ww-status" data-status>Loading leaderboard…</div>

                        <div class="ww-ranks">
                          <div class="ww-rankrow" data-rank="2">
                            <div class="ww-rank">2</div>
                            <div class="ww-name">—</div>
                            <div class="ww-solved">—</div>
                          </div>
                          <div class="ww-rankrow" data-rank="3">
                            <div class="ww-rank">3</div>
                            <div class="ww-name">—</div>
                            <div class="ww-solved">—</div>
                          </div>
                          <div class="ww-rankrow" data-rank="4">
                            <div class="ww-rank">4</div>
                            <div class="ww-name">—</div>
                            <div class="ww-solved">—</div>
                          </div>
                          <div class="ww-rankrow" data-rank="5">
                            <div class="ww-rank">5</div>
                            <div class="ww-name">—</div>
                            <div class="ww-solved">—</div>
                          </div>
                          <div class="ww-rankrow" data-rank="6">
                            <div class="ww-rank">6</div>
                            <div class="ww-name">—</div>
                            <div class="ww-solved">—</div>
                          </div>
                          <div class="ww-rankrow" data-rank="7">
                            <div class="ww-rank">7</div>
                            <div class="ww-name">—</div>
                            <div class="ww-solved">—</div>
                          </div>
                          <div class="ww-rankrow" data-rank="8">
                            <div class="ww-rank">8</div>
                            <div class="ww-name">—</div>
                            <div class="ww-solved">—</div>
                          </div>
                          <div class="ww-rankrow" data-rank="9">
                            <div class="ww-rank">9</div>
                            <div class="ww-name">—</div>
                            <div class="ww-solved">—</div>
                          </div>
                          <div class="ww-rankrow" data-rank="10">
                            <div class="ww-rank">10</div>
                            <div class="ww-name">—</div>
                            <div class="ww-solved">—</div>
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
    </div>
  `;

  const baseStationLink = document.getElementById("wwBaseStationLink");
  if (baseStationLink) {
    baseStationLink.onclick = function () {
      navigate("base-station");
    };
    baseStationLink.onkeydown = function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        navigate("base-station");
      }
    };
  }

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

      const winner = rows.find((row) => Number(row.rank) === 1);
      if (winner) {
        const winnerNameEl = app.querySelector("[data-winner-name]");
        const winnerTimeEl = app.querySelector("[data-winner-time]");

        if (winnerNameEl) winnerNameEl.textContent = winner.player_name || "—";
        if (winnerTimeEl) winnerTimeEl.textContent = formatTimestamp(winner.timestamp);
      }

      for (const row of rows) {
        const rank = Number(row.rank);
        if (!rank || rank < 2 || rank > 10) continue;

        const rowEl = app.querySelector(`[data-rank="${rank}"]`);
        if (!rowEl) continue;

        const nameEl = rowEl.querySelector(".ww-name");
        const solvedEl = rowEl.querySelector(".ww-solved");

        if (nameEl) nameEl.textContent = row.player_name || "—";
        if (solvedEl) solvedEl.textContent = formatTimestamp(row.timestamp);
      }

      setStatus("Leaderboard loaded.");
    } catch (error) {
      console.error("Leaderboard load error:", error);
      setStatus("Leaderboard load error.");
    }
  }

  loadLeaderboard();
}
