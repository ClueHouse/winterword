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
      .replaceAll("'", "&#39;");

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

  const released = Number(currentClue) || 0;
  const clueTotal = Number(totalClues) || 12;
  const progressText = `${released} of ${clueTotal} clues released`;

  const reportProblemHref =
    `mailto:fix@cluehouse.co.nz?subject=WinterWord%20Issue%20-%20${encodedOrgName}`;

  const subscribeHref =
    `mailto:opt@cluehouse.co.nz?subject=WinterWord%20Subscribe%20-%20${encodedOrgName}`;

  const unsubscribeHref =
    `mailto:opt@cluehouse.co.nz?subject=WinterWord%20Unsubscribe%20-%20${encodedOrgName}`;

  const solveHref =
    `mailto:key@cluehouse.co.nz?subject=FINAL%20Winterword%20Submission%20-%20${encodedOrgName}%20-%202026`;

  const contactHref = `mailto:hq@cluehouse.co.nz?subject=Clue%20House%20Enquiry`;

  app.innerHTML = `
<style>
:root{
  --ww-black:#050607;
  --ww-night:#071019;
  --ww-panel:rgba(5,8,10,.72);
  --ww-panel-2:rgba(10,13,14,.82);
  --ww-orange:#f08a24;
  --ww-orange-hot:#ff9f2f;
  --ww-orange-soft:rgba(240,138,36,.32);
  --ww-orange-line:rgba(240,138,36,.72);
  --ww-cream:#e8d0ac;
  --ww-muted:#a98d68;
  --ww-text:#f2e7d5;
  --ww-left-wide:13.5rem;
  --ww-rail-bg:
    radial-gradient(circle at 50% 92%, rgba(240,138,36,.24), transparent 42%),
    linear-gradient(180deg, rgba(35,14,2,.92), rgba(5,6,7,.98) 55%, rgba(35,14,2,.9));
}

*{box-sizing:border-box;}

#wwPortal{
  display:flex;
  height:100vh;
  overflow:hidden;
  font-family:system-ui,-apple-system,"Segoe UI",sans-serif;
  color:var(--ww-text);
  background:#050607;
}

#wwLeft{
  width:var(--ww-left-wide);
  flex:0 0 var(--ww-left-wide);
  height:100vh;
  position:sticky;
  top:0;
  overflow:visible;
  z-index:5;
}

.ww-rail{
  position:absolute;
  inset:0;
  background:var(--ww-rail-bg);
  border:1px solid rgba(240,138,36,.9);
  border-radius:0 0 1.6rem 0;
  box-shadow:
    inset -1px 0 0 rgba(255,166,60,.8),
    0 0 34px rgba(240,138,36,.52),
    0 0 70px rgba(240,138,36,.18);
  overflow:visible;
}

.ww-rail--pop-live{
  animation:wwRailOrangePulse 2.2s ease-in-out infinite;
}

@keyframes wwRailOrangePulse{
  0%,100%{box-shadow:inset -1px 0 0 rgba(255,166,60,.8),0 0 34px rgba(240,138,36,.52);}
  50%{box-shadow:inset -2px 0 0 rgba(255,190,92,1),0 0 54px rgba(240,138,36,.85);}
}

.ww-left-shell{
  height:100%;
  padding:1.1rem 0 1.6rem;
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:1.05rem;
}

.ww-left-logo img{
  width:8.75rem;
  display:block;
  filter:drop-shadow(0 0 12px rgba(240,138,36,.46));
}

.ww-left-nav{
  flex:1;
  width:100%;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:space-evenly;
}

.ww-left-item{
  width:100%;
  background:none;
  border:0;
  padding:0;
  cursor:pointer;
  position:relative;
  display:flex;
  flex-direction:column;
  align-items:center;
  text-decoration:none;
  color:var(--ww-text);
}

.ww-left-icon{
  width:4.75rem;
  filter:
    drop-shadow(0 0 8px rgba(240,138,36,.72))
    drop-shadow(0 10px 14px rgba(0,0,0,.48));
}

.ww-left-label{
  margin-top:.32rem;
  font-size:.78rem;
  letter-spacing:.15em;
  font-weight:900;
  color:var(--ww-cream);
  text-transform:uppercase;
  text-shadow:0 0 8px rgba(240,138,36,.44);
}

.ww-left-item[data-disabled="true"]{
  cursor:default;
}

.ww-left-item[data-disabled="true"] .ww-left-icon{
  opacity:.82;
}

.ww-left-tooltip{
  position:absolute;
  top:50%;
  left:calc(100% - .25rem);
  transform:translateY(-50%);
  width:8.9rem;
  padding:.7rem .72rem;
  border-radius:.35rem;
  background:rgba(7,8,8,.84);
  border:1px solid rgba(240,138,36,.46);
  box-shadow:0 0 14px rgba(240,138,36,.2);
  color:#d8c5a8;
  font-size:.62rem;
  line-height:1.42;
  text-align:left;
  pointer-events:none;
  opacity:1;
}

.ww-left-tooltip-title{
  color:var(--ww-orange);
  font-weight:900;
  margin-bottom:.2rem;
}

.ww-left-item--pop .ww-left-icon{
  animation:wwPopPulse 1.35s ease-in-out infinite;
}

@keyframes wwPopPulse{
  0%,100%{transform:scale(1); filter:drop-shadow(0 0 10px rgba(240,138,36,.65));}
  50%{transform:scale(1.06); filter:drop-shadow(0 0 22px rgba(255,166,60,1));}
}

#wwRight{
  flex:1;
  min-width:0;
  height:100vh;
  overflow:hidden;
}

#wwScroll{
  height:100%;
  overflow:auto;
  background:
    radial-gradient(700px 360px at 58% 18%, rgba(240,138,36,.18), transparent 64%),
    radial-gradient(850px 480px at 84% 76%, rgba(240,92,18,.22), transparent 68%),
    linear-gradient(90deg, rgba(3,6,8,.95), rgba(7,15,19,.92)),
    url("/cgi/image/BaseStationMountain.png?width=1920&quality=80&format=auto");
  background-size:cover;
  background-position:center;
  border-left:1px solid rgba(240,138,36,.72);
}

#wwView{
  max-width:86rem;
  margin:0 auto;
  padding:2.25rem 2.25rem 0;
}

.ww-head{
  position:relative;
  min-height:7.4rem;
  padding-right:26rem;
}

.ww-slug{
  margin:0 0 .25rem;
  color:var(--ww-orange);
  font-size:.8rem;
  letter-spacing:.24em;
  font-weight:950;
  text-transform:uppercase;
}

.ww-title{
  margin:0;
  color:var(--ww-cream);
  font-size:4.1rem;
  line-height:.95;
  letter-spacing:.16em;
  font-weight:950;
  text-transform:uppercase;
  text-shadow:
    0 0 16px rgba(240,138,36,.2),
    0 6px 14px rgba(0,0,0,.6);
}

.ww-org-name{
  margin-top:.45rem;
  color:var(--ww-orange);
  font-size:.95rem;
  letter-spacing:.32em;
  font-weight:900;
  text-transform:uppercase;
}

.ww-signal-wrap{
  position:absolute;
  top:0;
  right:0;
  display:grid;
  grid-template-columns:9rem 10.6rem;
  gap:.7rem;
  align-items:start;
}

.ww-signal{
  grid-row:span 2;
  min-height:6.2rem;
  border:1px solid var(--ww-orange-line);
  background:rgba(3,6,8,.62);
  border-radius:.35rem;
  padding:.75rem;
  box-shadow:0 0 18px rgba(240,138,36,.16);
}

.ww-st-label{
  color:var(--ww-orange);
  font-size:.62rem;
  letter-spacing:.14em;
  font-weight:950;
  text-transform:uppercase;
}

.ww-signal-bar{
  height:4.1rem;
  display:flex;
  align-items:flex-end;
  gap:.45rem;
  margin-top:.45rem;
}

.ww-signal-bar span{
  width:.72rem;
  border-radius:.08rem;
  background:linear-gradient(180deg,#ffc36d,#f08a24 55%,#9f4d08);
  box-shadow:0 0 12px rgba(240,138,36,.7);
  animation:wwSignal 5.8s infinite;
}

.ww-signal-bar span:nth-child(1){height:24%;}
.ww-signal-bar span:nth-child(2){height:38%;}
.ww-signal-bar span:nth-child(3){height:56%;}
.ww-signal-bar span:nth-child(4){height:76%;}
.ww-signal-bar span:nth-child(5){height:100%;}

@keyframes wwSignal{
  0%,100%{opacity:.7;}
  50%{opacity:1; filter:brightness(1.25);}
}

.ww-action-btn{
  appearance:none;
  border:1px solid var(--ww-orange-line);
  background:rgba(3,6,8,.6);
  color:var(--ww-cream);
  border-radius:.35rem;
  padding:.76rem .85rem;
  font-size:.64rem;
  letter-spacing:.12em;
  font-weight:950;
  text-transform:uppercase;
  text-decoration:none;
  cursor:pointer;
  box-shadow:0 0 14px rgba(240,138,36,.12);
}

.ww-action-btn:hover,
.ww-action-btn[aria-expanded="true"]{
  background:rgba(240,138,36,.16);
}

.wwSubPanelWrap{
  position:absolute;
  top:6.7rem;
  right:0;
  width:19.9rem;
  z-index:40;
  pointer-events:none;
}

.wwSubPanel{
  width:19.9rem;
  opacity:0;
  transform:translateY(8px);
  pointer-events:none;
  transition:opacity 160ms ease, transform 160ms ease;
}

.wwSubPanel.is-previewing,
.wwSubPanel.is-open{
  opacity:1;
  transform:translateY(0);
  pointer-events:auto;
}

.wwSubTop,
.wwSubBottom{
  background:rgba(7,8,8,.74);
  border:1px solid rgba(240,138,36,.48);
  padding:.95rem;
  box-shadow:0 0 16px rgba(240,138,36,.14);
}

.wwSubBottom{
  border-top:0;
  max-height:0;
  opacity:0;
  overflow:hidden;
  padding-top:0;
  padding-bottom:0;
  transition:max-height 180ms ease, opacity 140ms ease, padding 180ms ease;
}

.wwSubPanel.is-open .wwSubBottom{
  max-height:10rem;
  opacity:1;
  padding:.95rem;
}

.wwSubTitle{
  color:var(--ww-orange);
  font-size:.72rem;
  letter-spacing:.15em;
  font-weight:950;
  text-transform:uppercase;
  margin-bottom:.55rem;
}

.wwSubText{
  font-size:.77rem;
  line-height:1.5;
  color:#d8c5a8;
  margin-bottom:.8rem;
}

.wwSubAction{
  display:block;
  text-align:center;
  text-decoration:none;
  border-radius:.28rem;
  padding:.74rem .8rem;
  font-size:.64rem;
  letter-spacing:.1em;
  font-weight:950;
  text-transform:uppercase;
}

.wwSubActionPrimary{
  background:linear-gradient(180deg,#ff9f2f,#cf6814);
  color:#1b0d03;
}

.wwSubActionSecondary{
  color:var(--ww-cream);
  border:1px solid rgba(240,138,36,.65);
}

.wwSubSub{
  margin:.55rem 0 0;
  text-align:center;
  color:#bfa27a;
  font-size:.65rem;
}

.ww-tagline{
  margin:1.15rem 0 1.65rem;
  max-width:41rem;
  color:#f1ddbd;
  font-family:Georgia,serif;
  font-style:italic;
  font-size:1.1rem;
  line-height:1.55;
  text-shadow:0 2px 8px rgba(0,0,0,.68);
}

.ww-base{
  display:grid;
  grid-template-columns:1.05fr .72fr;
  gap:1.35rem;
  align-items:start;
  max-width:50rem;
}

.ww-card{
  background:rgba(5,8,10,.62);
  border:1px solid rgba(240,138,36,.54);
  border-radius:.35rem;
  padding:1.35rem 1.45rem;
  box-shadow:0 0 18px rgba(240,138,36,.12);
  backdrop-filter:blur(2px);
}

.ww-card + .ww-card{
  margin-top:1rem;
}

.ww-card h3{
  margin:0 0 1rem;
  color:var(--ww-orange);
  font-size:.95rem;
  letter-spacing:.16em;
  font-weight:950;
  text-transform:uppercase;
  border-bottom:1px solid rgba(240,138,36,.42);
  padding-bottom:.55rem;
}

.ww-card p{
  margin:.55rem 0;
  color:#d8c5a8;
  font-size:.8rem;
  line-height:1.55;
}

.ww-card--rules p::before{
  content:"✣";
  color:var(--ww-orange);
  margin-right:.55rem;
}

.ww-progress{
  margin-top:.9rem;
  color:var(--ww-orange);
  font-size:.78rem;
  letter-spacing:.16em;
  font-weight:950;
  text-transform:uppercase;
}

.ww-lastword{
  position:relative;
  min-height:25.2rem;
  padding:2rem 1.45rem;
  text-align:center;
  color:#2a1605;
  background:
    radial-gradient(circle at 50% 35%, rgba(255,244,210,.72), transparent 58%),
    linear-gradient(180deg,#ecd19b,#c38438 62%,#5d3210);
  border:2px solid rgba(240,138,36,.92);
  border-radius:.36rem;
  box-shadow:
    0 0 24px rgba(240,138,36,.35),
    inset 0 0 0 4px rgba(73,34,8,.45);
  overflow:hidden;
}

.ww-lastword::after{
  content:"";
  position:absolute;
  inset:.45rem;
  border:1px solid rgba(84,42,8,.55);
  pointer-events:none;
}

.ww-lastword h3{
  position:relative;
  z-index:1;
  margin:0 0 1rem;
  font-size:1.1rem;
  letter-spacing:.16em;
  font-weight:950;
  text-transform:uppercase;
}

.ww-lastword-kicker{
  position:relative;
  z-index:1;
  margin:0 0 2rem;
  font-family:Georgia,serif;
  font-style:italic;
  font-size:1rem;
  line-height:1.5;
}

.ww-primary-wrap{
  position:relative;
  z-index:1;
  display:inline-block;
  margin:0 auto 3.2rem;
}

.ww-primary{
  display:inline-block;
  padding:1.05rem 1.2rem;
  background:linear-gradient(180deg,#10191d,#050607);
  border:1px solid rgba(240,138,36,.92);
  border-radius:.25rem;
  box-shadow:
    0 0 16px rgba(240,138,36,.42),
    inset 0 0 0 1px rgba(255,255,255,.06);
  color:var(--ww-orange);
  text-decoration:none;
  font-size:1rem;
  letter-spacing:.1em;
  font-weight:950;
  text-transform:uppercase;
}

.ww-primary-tooltip{
  position:absolute;
  right:-.65rem;
  top:-1.05rem;
  padding:.28rem .45rem;
  background:rgba(8,9,9,.9);
  border:1px solid rgba(240,138,36,.75);
  color:var(--ww-orange);
  font-size:.58rem;
  border-radius:.22rem;
}

.ww-stakes{
  position:relative;
  z-index:1;
  font-family:Georgia,serif;
  font-style:italic;
  color:#40260e;
  line-height:1.55;
}

.ww-footer{
  margin-top:1.2rem;
  margin-left:calc(var(--ww-left-wide) * -1);
  padding:.9rem 2rem;
  border-top:1px solid rgba(240,138,36,.36);
  background:rgba(5,6,7,.82);
  color:#bfa27a;
  font-size:.72rem;
  display:flex;
  justify-content:center;
  gap:1rem;
}

.ww-footer a{
  color:#d6b180;
  text-decoration:none;
}

.ww-footer strong{
  color:var(--ww-orange);
  letter-spacing:.12em;
  text-transform:uppercase;
}

@media(max-width:1180px){
  .ww-head{padding-right:0;}
  .ww-signal-wrap{position:relative; margin-top:1rem;}
  .wwSubPanelWrap{position:relative; top:auto; right:auto; margin-top:.7rem;}
}

@media(max-width:1000px){
  .ww-base{grid-template-columns:1fr; max-width:none;}
  .ww-lastword{max-width:30rem;}
}

@media(max-width:760px){
  :root{--ww-left-wide:10.5rem;}
  #wwView{padding:1.5rem;}
  .ww-title{font-size:2.65rem;}
  .ww-left-icon{width:3.8rem;}
  .ww-left-tooltip{display:none;}
}
</style>

<div id="wwPortal">
  <aside id="wwLeft">
    <div class="ww-rail ${popClueLive ? "ww-rail--pop-live" : ""}">
      <div class="ww-left-shell">
        <div class="ww-left-logo">
          <img src="/cgi/image/WWLogo_-IrZfgR1CvN9DRDc2uq8H.png?width=828&quality=80&format=auto" alt="WinterWord">
        </div>

        <nav class="ww-left-nav">
          ${
            popClueLive
              ? `
          <button class="ww-left-item ww-left-item--pop" type="button" data-nav="pop-clue">
            <img class="ww-left-icon" src="/cgi/image/Clue_ivx53yyYY6YAR7ZkHgMQJ.png?width=256&quality=80&format=auto" alt="Pop Clue">
            <div class="ww-left-label">POP</div>
            <div class="ww-left-tooltip">
              <div class="ww-left-tooltip-title">Pop Clue</div>
              A brief signal has opened. Solve it first, and the next clue may arrive early.
            </div>
          </button>`
              : ""
          }

          <button class="ww-left-item" type="button" data-nav="clues">
            <img class="ww-left-icon" src="/cgi/image/Clue_ivx53yyYY6YAR7ZkHgMQJ.png?width=256&quality=80&format=auto" alt="Clues">
            <div class="ww-left-label">CLUES</div>
            <div class="ww-left-tooltip">
              <div class="ww-left-tooltip-title">Clues</div>
              Each of your upcoming clues is designed to reveal just enough to move you forward.
            </div>
          </button>

          <button class="ww-left-item" type="button" data-nav="lifeline" data-disabled="${lifelineAvailable ? "false" : "true"}">
            <img class="ww-left-icon" src="/cgi/image/Lifeline_oT0vP3H4BL6I-Z--NFPHA.png?width=256&quality=80&format=auto" alt="Lifeline">
            <div class="ww-left-label">LIFELINE</div>
            <div class="ww-left-tooltip">
              <div class="ww-left-tooltip-title">Lifeline</div>
              ${
                lifelineAvailable
                  ? "This passage is open."
                  : `This passage waits its moment. It opens after clue ${safeText(lifelineUnlockClue)}.`
              }
            </div>
          </button>

          <button class="ww-left-item" type="button" data-nav="leaderboard">
            <img class="ww-left-icon" src="/cgi/image/Leaderboard_94LRTiQiFRVwCQT0zH-2y.png?width=256&quality=80&format=auto" alt="Leaderboard">
            <div class="ww-left-label">LEADER</div>
            <div class="ww-left-tooltip">
              <div class="ww-left-tooltip-title">Leaderboard</div>
              The Leaderboard remembers all who enter the game.
            </div>
          </button>
        </nav>
      </div>
    </div>
  </aside>

  <main id="wwRight">
    <div id="wwScroll">
      <div id="wwView">
        <div class="ww-head">
          <div>
            <p class="ww-slug">${safeText(seasonLabel)}</p>
            <h1 class="ww-title">Base Station</h1>
            <div class="ww-org-name">${safeText(orgName)}</div>
          </div>

          <div class="ww-signal-wrap">
            <div class="ww-signal" aria-label="Signal">
              <div class="ww-st-label">Signal</div>
              <div class="ww-signal-bar" aria-hidden="true">
                <span></span><span></span><span></span><span></span><span></span>
              </div>
            </div>

            <a class="ww-action-btn" href="${reportProblemHref}">⚠ Report a problem</a>

            <button class="ww-action-btn" id="wwSubToggle" type="button" aria-expanded="false" aria-controls="wwSubPanel">
              🔔 Subscribe⌄
            </button>
          </div>

          <div class="wwSubPanelWrap">
            <div class="wwSubPanel" id="wwSubPanel">
              <div class="wwSubTop">
                <div class="wwSubTitle">Clue Alerts</div>
                <div class="wwSubText">
                  Curious minds tend to wander.<br>
                  When each clue falls,<br>
                  subscribers will hear the click.
                </div>
                <a class="wwSubAction wwSubActionPrimary" href="${subscribeHref}">
                  Subscribe to Clue Alerts
                </a>
              </div>

              <div class="wwSubBottom">
                <a class="wwSubAction wwSubActionSecondary" href="${unsubscribeHref}">
                  Unsubscribe
                </a>
                <div class="wwSubSub">Execute ESCAPE ROOM protocol.</div>
              </div>
            </div>
          </div>
        </div>

        <p class="ww-tagline">
          ${safeText(introLine1)}<br>
          ${safeText(introLine2)}
        </p>

        <div class="ww-base">
          <div>
            <div class="ww-card ww-card--rules">
              <h3>How this works</h3>
              ${paragraphs.map((p) => `<p>${safeText(p)}</p>`).join("")}
            </div>

            <div class="ww-card ww-card--updates">
              <h3>Updates</h3>
              ${
                updatesText && String(updatesText).trim()
                  ? `<p>${safeText(updatesText)}</p>`
                  : `<p>No new updates yet.</p>`
              }
              <div class="ww-progress">${safeText(progressText)}</div>
            </div>
          </div>

          <div class="ww-lastword">
            <h3>The Last Word</h3>

            <p class="ww-lastword-kicker">
              When the wind quietens,<br>
              certainty stirs
            </p>

            <div class="ww-primary-wrap">
              <a class="ww-primary" href="${solveHref}">Solve WinterWord</a>
              <div class="ww-primary-tooltip">Ready?</div>
            </div>

            <div class="ww-stakes">
              One word.<br>
              One chance.<br>
              Guess wrong, and the silence wins.
            </div>
          </div>
        </div>

        <footer class="ww-footer">
          <strong>WinterWord</strong>
          <span>Another Clue House Experience</span>
          <span>•</span>
          <a href="/legal/privacy-policy">Legal</a>
          <span>•</span>
          <a href="${contactHref}">Contact</a>
        </footer>
      </div>
    </div>
  </main>
</div>
`;

  const navButtons = app.querySelectorAll("[data-nav]");

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-nav");
      const disabled = button.getAttribute("data-disabled") === "true";

      if (disabled) return;

      if (typeof navigate === "function") {
        navigate(target);
      }
    });
  });

  const toggle = app.querySelector("#wwSubToggle");
  const panel = app.querySelector("#wwSubPanel");

  if (toggle && panel) {
    const setPreview = (on) => {
      if (panel.classList.contains("is-open")) return;
      panel.classList.toggle("is-previewing", on);
    };

    const setOpen = (on) => {
      panel.classList.toggle("is-open", on);
      toggle.setAttribute("aria-expanded", on ? "true" : "false");

      if (on) {
        panel.classList.remove("is-previewing");
      }
    };

    const closePanel = () => {
      setOpen(false);
      panel.classList.remove("is-previewing");
    };

    toggle.addEventListener("mouseenter", () => setPreview(true));
    toggle.addEventListener("mouseleave", () => setPreview(false));

    panel.addEventListener("mouseenter", () => {
      if (!panel.classList.contains("is-open")) {
        panel.classList.add("is-previewing");
      }
    });

    panel.addEventListener("mouseleave", () => {
      if (!panel.classList.contains("is-open")) {
        panel.classList.remove("is-previewing");
      }
    });

    toggle.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      setOpen(!panel.classList.contains("is-open"));
    });

    panel.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    document.addEventListener("click", closePanel);

    app.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closePanel();
      }
    });
  }
}
