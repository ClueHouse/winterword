/* BASE-STATION V2 MODULE */
/* Stable V2: no inline conditional-template hazards */

export function renderBaseStation(app, data = {}, navigate) {
  const {
    orgName = "WinterWord",
    seasonLabel = "WINTERWORD • 2026",
    introLine1 = "A letter per week from a wintry scroll,",
    introLine2 = "Piece them together — reveal the whole.",
    howParagraphs = [],
    updatesText = "",
    currentClue = 0,
    totalClues = 12,
    lifelineAvailable = false,
    lifelineUnlockClue = 6,
    popClueLive = false
  } = data;

  const safeText = (value, fallback = "") =>
    String(value ?? fallback)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const mailSafeOrgName =
    orgName && String(orgName).trim()
      ? String(orgName).trim()
      : "WinterWord";

  const encodedOrgName = encodeURIComponent(mailSafeOrgName);

  const paragraphs =
    Array.isArray(howParagraphs) && howParagraphs.length
      ? howParagraphs
      : [
          "Each week, a new clue will quietly unlock — each one revealing a single letter.",
          "Guard your answers, for as the season unfolds, they will begin to shift and settle… forming the anagram of the Winterword.",
          "If you feel the answer stirring early, step forward and claim your place on the leaderboard.",
          "But remember — one guess is all you get."
        ];

  const currentClueNumber = Number(currentClue) || 0;
  const totalCluesNumber = Number(totalClues) || 12;

  const popButtonHtml = popClueLive
    ? `
      <button class="ww-left-item ww-left-item--pop" type="button" data-nav="pop-clue">
        <img class="ww-left-icon" src="/assets/winterword/shared/flash.png" alt="Pop Clue">
        <div class="ww-left-label">POP</div>
      </button>
    `
    : "";

  const howRowsHtml = paragraphs
    .map((paragraph) => {
      return `
        <div class="ww-how-row">
          <div class="ww-star">✣</div>
          <div>${safeText(paragraph)}</div>
        </div>
      `;
    })
    .join("");

  const updatesHtml = updatesText
    ? safeText(updatesText)
    : "No new updates yet.";

  const railLiveClass = popClueLive ? "ww-rail--pop-live" : "";

  app.innerHTML = `
    <style>
      :root{
        --ww-night-0:#05080b;
        --ww-night-1:#09111a;
        --ww-night-2:#111d28;
        --ww-panel:rgba(5,10,14,0.72);
        --ww-orange:#f08a24;
        --ww-orange-2:#ffb14a;
        --ww-gold:#f6c56a;
        --ww-cream:#ead7b7;
        --ww-muted:rgba(235,225,208,0.72);
        --ww-left-wide:14.7rem;
        --ww-rail-bg:radial-gradient(circle at 50% 8%, rgba(240,138,36,0.18), transparent 28%), linear-gradient(90deg, #080b0d 0%, #0b1116 42%, #0e151b 100%);
      }

      *{box-sizing:border-box;}

      #wwPortal{
        display:flex;
        min-height:100vh;
        height:100vh;
        font-family:system-ui,-apple-system,"Segoe UI",sans-serif;
        overflow:hidden;
        background:#05080b;
        color:var(--ww-cream);
      }

      #wwLeft{
        width:var(--ww-left-wide);
        height:100vh;
        position:sticky;
        top:0;
        flex:0 0 var(--ww-left-wide);
        overflow:visible;
        z-index:5;
      }

      .ww-rail{
        position:absolute;
        inset:0;
        background:var(--ww-rail-bg);
        border-right:1px solid rgba(240,138,36,0.85);
        border-radius:0 1.65rem 1.65rem 0;
        box-shadow:inset -1px 0 0 rgba(255,177,74,0.42), 0 0 18px rgba(240,138,36,0.24), 0 0 46px rgba(240,138,36,0.16);
        overflow:hidden;
      }

      .ww-rail:before{
        content:"";
        position:absolute;
        inset:0.2rem 0.25rem 0.2rem 0.2rem;
        border:1px solid rgba(240,138,36,0.34);
        border-left:none;
        border-radius:0 1.35rem 1.35rem 0;
        pointer-events:none;
      }

      .ww-rail:after{
        content:"";
        position:absolute;
        inset:auto 0 0 0;
        height:35%;
        background:radial-gradient(circle at 24% 84%, rgba(240,138,36,0.15), transparent 38%), radial-gradient(circle at 76% 78%, rgba(240,138,36,0.12), transparent 42%);
        pointer-events:none;
      }

      .ww-rail--pop-live{
        animation:wwRailOrangePulse 2.8s ease-in-out infinite;
      }

      @keyframes wwRailOrangePulse{
        0%,100%{
          box-shadow:inset -1px 0 0 rgba(255,177,74,0.42), 0 0 18px rgba(240,138,36,0.24), 0 0 46px rgba(240,138,36,0.16);
        }
        50%{
          box-shadow:inset -2px 0 0 rgba(255,177,74,0.82), 0 0 28px rgba(240,138,36,0.44), 0 0 68px rgba(240,138,36,0.26);
        }
      }

      .ww-left-shell{
        position:relative;
        z-index:2;
        height:100%;
        padding:1.45rem 1.15rem 2rem;
        display:flex;
        flex-direction:column;
        align-items:center;
      }

      .ww-left-logo{
        text-align:center;
        margin-bottom:1.75rem;
      }

      .ww-left-logo img{
        width:8.35rem;
        height:auto;
        display:block;
        margin:0 auto;
        filter:drop-shadow(0 0 12px rgba(240,138,36,0.28));
      }

      .ww-left-nav{
        flex:1;
        width:100%;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:space-around;
        gap:0.7rem;
      }

      .ww-left-item{
        width:100%;
        background:none;
        border:none;
        cursor:pointer;
        position:relative;
        display:flex;
        flex-direction:column;
        align-items:center;
        text-decoration:none;
        padding:0.15rem 0;
        color:inherit;
      }

      .ww-left-item:after{
        content:"";
        width:4.9rem;
        height:1px;
        margin-top:0.62rem;
        background:linear-gradient(90deg, transparent, rgba(240,138,36,0.72), transparent);
      }

      .ww-left-icon{
        width:4.95rem;
        height:auto;
        display:block;
        filter:sepia(1) saturate(3.5) hue-rotate(345deg) brightness(1.12) drop-shadow(0 0 10px rgba(240,138,36,0.38));
      }

      .ww-left-label{
        margin-top:0.35rem;
        font-size:0.78rem;
        letter-spacing:0.24em;
        text-transform:uppercase;
        color:rgba(255,239,216,0.88);
        font-weight:800;
      }

      .ww-left-item--pop .ww-left-icon{
        animation:wwPopPulse 1.9s ease-in-out infinite;
      }

      .ww-left-item--pop .ww-left-label{
        color:rgba(255,177,74,1);
        text-shadow:0 0 14px rgba(240,138,36,0.55);
      }

      @keyframes wwPopPulse{
        0%,100%{
          transform:scale(1);
          filter:sepia(1) saturate(4.4) hue-rotate(345deg) brightness(1.1) drop-shadow(0 0 9px rgba(240,138,36,0.38));
        }
        50%{
          transform:scale(1.045);
          filter:sepia(1) saturate(5.2) hue-rotate(345deg) brightness(1.25) drop-shadow(0 0 20px rgba(240,138,36,0.68));
        }
      }

      #wwRight{
        flex:1;
        min-width:0;
        height:100vh;
        background:linear-gradient(90deg, rgba(5,8,11,0.42), rgba(5,8,11,0.1) 38%, rgba(5,8,11,0.82)), radial-gradient(circle at 62% 42%, rgba(240,138,36,0.16), transparent 32%), #09111a;
        background-size:cover;
        background-position:center;
        overflow:auto;
      }

      .ww-page{
        min-height:100vh;
        display:flex;
        flex-direction:column;
      }

      .ww-main{
        flex:1;
        padding:2rem 2.3rem 1.3rem;
      }

      .ww-grid{
        display:grid;
        grid-template-columns:minmax(22rem, 1fr) minmax(20rem, 25rem) minmax(16rem, 18.5rem);
        gap:1.35rem;
        max-width:86rem;
        margin:0 auto;
      }

      .ww-titleblock{
        grid-column:1 / 3;
        padding-top:0.15rem;
      }

      .ww-season{
        color:var(--ww-orange);
        font-weight:900;
        letter-spacing:0.22em;
        font-size:0.88rem;
        text-transform:uppercase;
        margin-bottom:0.5rem;
      }

      .ww-title{
        margin:0;
        color:#ead7b7;
        font-size:clamp(3.4rem, 6vw, 5.25rem);
        line-height:0.9;
        letter-spacing:0.08em;
        text-transform:uppercase;
        font-weight:950;
        text-shadow:0 2px 0 rgba(0,0,0,0.4), 0 0 18px rgba(240,138,36,0.12);
      }

      .ww-subtitle{
        color:var(--ww-orange);
        letter-spacing:0.42em;
        text-transform:uppercase;
        font-weight:900;
        margin-top:0.7rem;
        font-size:1rem;
      }

      .ww-intro{
        margin-top:1rem;
        font-family:Georgia,serif;
        font-style:italic;
        color:#f1e4cf;
        font-size:1.14rem;
        line-height:1.48;
      }

      .ww-card{
        background:linear-gradient(180deg, rgba(7,13,17,0.86), rgba(5,9,12,0.74));
        border:1px solid rgba(240,138,36,0.5);
        border-radius:0.55rem;
        box-shadow:inset 0 0 0 1px rgba(255,255,255,0.025), 0 0 22px rgba(0,0,0,0.35);
        backdrop-filter:blur(3px);
      }

      .ww-info{
        padding:1.15rem 1.2rem;
      }

      .ww-card-title{
        margin:0 0 1rem;
        color:var(--ww-orange);
        text-transform:uppercase;
        letter-spacing:0.13em;
        font-size:1rem;
        font-weight:950;
      }

      .ww-card-title:after{
        content:"";
        display:block;
        width:8rem;
        height:1px;
        margin-top:0.55rem;
        background:linear-gradient(90deg, var(--ww-orange), transparent);
      }

      .ww-how-list{
        display:flex;
        flex-direction:column;
        gap:0.8rem;
      }

      .ww-how-row{
        display:grid;
        grid-template-columns:1.4rem 1fr;
        gap:0.7rem;
        color:rgba(245,235,220,0.84);
        line-height:1.42;
        font-size:0.9rem;
      }

      .ww-star{
        color:var(--ww-orange);
        font-size:1.05rem;
        line-height:1.2;
      }

      .ww-updates{
        padding:1.05rem 1.2rem;
        margin-top:1rem;
      }

      .ww-updates-text{
        color:rgba(245,235,220,0.78);
        font-size:0.9rem;
        line-height:1.45;
        min-height:2.4rem;
      }

      .ww-progress{
        margin-top:1rem;
        padding-top:0.85rem;
        border-top:1px solid rgba(240,138,36,0.28);
        color:rgba(245,235,220,0.82);
        text-transform:uppercase;
        letter-spacing:0.16em;
        font-weight:900;
        font-size:0.84rem;
      }

      .ww-progress strong{
        color:var(--ww-orange);
      }

      .ww-lastword{
        align-self:start;
        min-height:26.5rem;
        padding:1rem;
        background:linear-gradient(rgba(92,52,16,0.1), rgba(92,52,16,0.1)), #c99b5b;
        border:1px solid rgba(255,177,74,0.92);
        border-radius:0.45rem;
        box-shadow:0 0 0 3px rgba(39,20,6,0.78), 0 0 0 4px rgba(240,138,36,0.52), 0 18px 34px rgba(0,0,0,0.44);
        color:#211407;
        position:relative;
        overflow:hidden;
      }

      .ww-lastword:before{
        content:"";
        position:absolute;
        inset:0.48rem;
        border:1px solid rgba(73,39,10,0.58);
        pointer-events:none;
      }

      .ww-lastword:after{
        content:"";
        position:absolute;
        inset:0;
        background:radial-gradient(circle at 50% 18%, rgba(255,244,210,0.5), transparent 38%), linear-gradient(180deg, transparent 60%, rgba(58,34,12,0.26));
        opacity:0.55;
        pointer-events:none;
      }

      .ww-lastword-inner{
        position:relative;
        z-index:2;
        min-height:24.3rem;
        display:flex;
        flex-direction:column;
        align-items:center;
        text-align:center;
        padding:1.85rem 1.2rem 1.45rem;
      }

      .ww-last-title{
        margin:0;
        font-size:1.65rem;
        line-height:1;
        letter-spacing:0.22em;
        text-transform:uppercase;
        font-weight:950;
      }

      .ww-rule{
        width:78%;
        margin:1rem auto 1.55rem;
        height:1px;
        background:linear-gradient(90deg, transparent, rgba(33,20,7,0.82), transparent);
      }

      .ww-last-poem{
        font-family:Georgia,serif;
        font-style:italic;
        font-size:1.17rem;
        line-height:1.38;
        margin-bottom:1.6rem;
      }

      .ww-solve-wrap{
        position:relative;
        width:100%;
        margin-top:0.15rem;
      }

      .ww-ready{
        position:absolute;
        right:0.15rem;
        top:-1.95rem;
        background:#111820;
        border:1px solid var(--ww-orange);
        color:var(--ww-orange-2);
        padding:0.42rem 0.62rem;
        border-radius:0.38rem;
        font-size:0.72rem;
        font-weight:900;
      }

      .ww-solve{
        width:100%;
        min-height:4.2rem;
        background:linear-gradient(180deg, #172029, #091018);
        border:2px solid var(--ww-orange);
        border-radius:0.55rem;
        color:var(--ww-orange-2);
        text-transform:uppercase;
        letter-spacing:0.13em;
        font-size:1.08rem;
        font-weight:950;
        cursor:pointer;
        box-shadow:inset 0 0 0 1px rgba(255,255,255,0.06), 0 0 14px rgba(240,138,36,0.24), 0 8px 18px rgba(0,0,0,0.42);
      }

      .ww-last-foot{
        margin:auto 0 0;
        font-family:Georgia,serif;
        font-style:italic;
        font-size:1rem;
        line-height:1.45;
      }

      .ww-side{
        grid-column:3;
        grid-row:1 / span 3;
        display:flex;
        flex-direction:column;
        gap:0.85rem;
      }

      .ww-signal{
        padding:0.9rem;
      }

      .ww-signal-title{
        color:var(--ww-orange);
        text-transform:uppercase;
        letter-spacing:0.16em;
        font-size:0.78rem;
        font-weight:950;
      }

      .ww-bars{
        margin-top:0.8rem;
        height:3.1rem;
        display:flex;
        align-items:flex-end;
        gap:0.42rem;
      }

      .ww-bars span{
        width:0.72rem;
        background:linear-gradient(180deg, #ffbd53, #d96b0d);
        box-shadow:0 0 12px rgba(240,138,36,0.55);
      }

      .ww-bars span:nth-child(1){height:26%;}
      .ww-bars span:nth-child(2){height:42%;}
      .ww-bars span:nth-child(3){height:58%;}
      .ww-bars span:nth-child(4){height:76%;}
      .ww-bars span:nth-child(5){height:95%;}

      .ww-util-row{
        display:grid;
        grid-template-columns:1fr;
        gap:0.75rem;
      }

      .ww-utility{
        min-height:3.35rem;
        display:flex;
        align-items:center;
        gap:0.7rem;
        padding:0.7rem 0.9rem;
        background:rgba(6,11,15,0.8);
        border:1px solid rgba(240,138,36,0.48);
        border-radius:0.42rem;
        color:rgba(245,235,220,0.9);
        text-transform:uppercase;
        letter-spacing:0.08em;
        font-size:0.78rem;
        font-weight:900;
        cursor:pointer;
      }

      .ww-utility-icon{
        color:var(--ww-orange);
        font-size:1.1rem;
      }

      .ww-alerts{
        padding:1.3rem 1.15rem;
      }

      .ww-alerts p{
        margin:0 0 1.1rem;
        color:rgba(245,235,220,0.82);
        line-height:1.52;
        font-size:0.95rem;
      }

      .ww-alert-button{
        width:100%;
        min-height:3.25rem;
        border:none;
        border-radius:0.45rem;
        background:linear-gradient(180deg, #ff8a1d, #c94d07);
        color:#fff4e2;
        text-transform:uppercase;
        letter-spacing:0.08em;
        font-weight:950;
        cursor:pointer;
        box-shadow:inset 0 0 0 1px rgba(255,255,255,0.18), 0 0 18px rgba(240,138,36,0.28);
      }

      .ww-unsub{
        margin-top:1rem;
        width:100%;
        min-height:2.75rem;
        border:1px solid rgba(240,138,36,0.66);
        border-radius:0.35rem;
        background:rgba(0,0,0,0.18);
        color:#ffd18a;
        text-transform:uppercase;
        letter-spacing:0.09em;
        font-weight:900;
        cursor:pointer;
      }

      .ww-escape{
        margin:0.85rem 0 0;
        text-align:center;
        color:rgba(245,235,220,0.72);
        font-size:0.82rem;
      }

      .ww-footer{
        min-height:3.6rem;
        border-top:1px solid rgba(240,138,36,0.38);
        background:rgba(3,6,8,0.68);
        display:flex;
        align-items:center;
        justify-content:center;
        gap:1.1rem;
        color:rgba(245,235,220,0.78);
        font-size:0.82rem;
      }

      .ww-footer strong{
        color:var(--ww-orange);
        letter-spacing:0.1em;
        text-transform:uppercase;
      }

      .ww-footer em{
        font-family:Georgia,serif;
        color:rgba(245,235,220,0.68);
      }

      .ww-footer a{
        color:rgba(245,235,220,0.82);
        text-decoration:none;
      }

      @media (max-width:1100px){
        #wwPortal{
          height:auto;
          min-height:100vh;
          overflow:auto;
        }

        #wwLeft{
          display:none;
        }

        #wwRight{
          height:auto;
          min-height:100vh;
        }

        .ww-grid{
          grid-template-columns:1fr;
        }

        .ww-titleblock,
        .ww-side{
          grid-column:auto;
          grid-row:auto;
        }

        .ww-title{
          font-size:3.4rem;
        }
      }
    </style>

    <div id="wwPortal">
      <aside id="wwLeft">
        <div class="ww-rail ${railLiveClass}">
          <div class="ww-left-shell">
            <div class="ww-left-logo">
              <img src="/assets/winterword/shared/logo.png" alt="WinterWord">
            </div>

            <nav class="ww-left-nav">
              ${popButtonHtml}

              <button class="ww-left-item" type="button" data-nav="clues">
                <img class="ww-left-icon" src="/assets/winterword/shared/clue.png" alt="Clues">
                <div class="ww-left-label">CLUES</div>
              </button>

              <button class="ww-left-item" type="button" data-nav="lifeline">
                <img class="ww-left-icon" src="/assets/winterword/shared/lifeline.png" alt="Lifeline">
                <div class="ww-left-label">LIFELINE</div>
              </button>

              <button class="ww-left-item" type="button" data-nav="leaderboard">
                <img class="ww-left-icon" src="/assets/winterword/shared/leaderboard.png" alt="Leaderboard">
                <div class="ww-left-label">LEADER</div>
              </button>
            </nav>
          </div>
        </div>
      </aside>

      <main id="wwRight">
        <div class="ww-page">
          <section class="ww-main">
            <div class="ww-grid">
              <header class="ww-titleblock">
                <div class="ww-season">${safeText(seasonLabel)}</div>
                <h1 class="ww-title">Base Station</h1>
                <div class="ww-subtitle">WinterWord</div>
                <div class="ww-intro">
                  ${safeText(introLine1)}<br>
                  ${safeText(introLine2)}
                </div>
              </header>

              <aside class="ww-side">
                <section class="ww-card ww-signal">
                  <div class="ww-signal-title">Signal</div>
                  <div class="ww-bars" aria-hidden="true">
                    <span></span><span></span><span></span><span></span><span></span>
                  </div>
                </section>

                <div class="ww-util-row">
                  <button class="ww-utility" type="button" data-action="problem">
                    <span class="ww-utility-icon">⚠</span>
                    <span>Report a problem</span>
                  </button>

                  <button class="ww-utility" type="button" data-action="subscribe">
                    <span class="ww-utility-icon">♢</span>
                    <span>Subscribe</span>
                  </button>
                </div>

                <section class="ww-card ww-alerts">
                  <h2 class="ww-card-title">Clue Alerts</h2>
                  <p>
                    Curious minds tend to wander.<br>
                    When each clue falls,<br>
                    subscribers will hear the click.
                  </p>

                  <button class="ww-alert-button" type="button" data-action="subscribe">
                    Subscribe to Clue Alerts
                  </button>

                  <button class="ww-unsub" type="button" data-action="unsubscribe">
                    Unsubscribe
                  </button>

                  <div class="ww-escape">Execute ESCAPE ROOM protocol.</div>
                </section>
              </aside>

              <section class="ww-card ww-info">
                <h2 class="ww-card-title">How This Works</h2>
                <div class="ww-how-list">
                  ${howRowsHtml}
                </div>
              </section>

              <section class="ww-lastword">
                <div class="ww-lastword-inner">
                  <h2 class="ww-last-title">The Last Word</h2>
                  <div class="ww-rule"></div>

                  <div class="ww-last-poem">
                    When the wind quietens,<br>
                    certainty stirs
                  </div>

                  <div class="ww-solve-wrap">
                    <div class="ww-ready">Ready?</div>
                    <button class="ww-solve" type="button" data-action="solve">
                      Solve WinterWord
                    </button>
                  </div>

                  <div class="ww-last-foot">
                    One word.<br>
                    One chance.<br>
                    Guess wrong, and the silence wins.
                  </div>
                </div>
              </section>

              <section class="ww-card ww-updates">
                <h2 class="ww-card-title">Updates</h2>
                <div class="ww-updates-text">${updatesHtml}</div>

                <div class="ww-progress">
                  <strong>${currentClueNumber}</strong> of <strong>${totalCluesNumber}</strong> clues released
                </div>
              </section>
            </div>
          </section>

          <footer class="ww-footer">
            <strong>WinterWord</strong>
            <em>Another Clue House Experience</em>
            <span>•</span>
            <a href="/legal/privacy-policy">Legal</a>
            <span>•</span>
            <a href="mailto:cluehousehq@gmail.com">Contact</a>
          </footer>
        </div>
      </main>
    </div>
  `;

  const navButtons = app.querySelectorAll("[data-nav]");

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-nav");
      if (typeof navigate === "function") navigate(target);
    });
  });

  const actionButtons = app.querySelectorAll("[data-action]");

  actionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.getAttribute("data-action");

      if (action === "problem") {
        window.location.href = `mailto:fix@cluehouse.co.nz?subject=${encodedOrgName}%20WinterWord%20Issue`;
        return;
      }

      if (action === "subscribe") {
        window.location.href = `mailto:opt@cluehouse.co.nz?subject=Subscribe%20to%20${encodedOrgName}%20WinterWord%20clue%20alerts`;
        return;
      }

      if (action === "unsubscribe") {
        window.location.href = `mailto:opt@cluehouse.co.nz?subject=Unsubscribe%20from%20${encodedOrgName}%20WinterWord%20clue%20alerts`;
        return;
      }

      if (action === "solve") {
        window.location.href = "mailto:key@cluehouse.co.nz?subject=FINAL%20Winterword%20Submission%20-%20Endgame%20-%202026";
      }
    });
  });
}
