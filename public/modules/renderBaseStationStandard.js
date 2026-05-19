export function renderBaseStationStandard(app, data = {}, navigate) {

  const {
    orgName = "WinterWord",
    seasonLabel = "WINTERWORD • 2026",
    lifelineAvailable = false,
    hasLeaderboardEntries = false
  } = data;

  const leaderboardAvailable = hasLeaderboardEntries === true;

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

  const reportProblemHref =
    `mailto:fix@cluehouse.co.nz?subject=WinterWord%20Issue%20-%20${encodedOrgName}`;

  const subscribeHref =
    `mailto:opt@cluehouse.co.nz?subject=WinterWord%20Subscribe%20-%20${encodedOrgName}`;

  const solveHref =
    `mailto:key@cluehouse.co.nz?subject=FINAL%20WinterWord%20Submission%20-%20${encodedOrgName}%20-%202026`;

  const contactHref =
    `mailto:hq@cluehouse.co.nz?subject=Clue%20House%20Enquiry`;

  app.innerHTML = `
<style>

*{
  box-sizing:border-box;
}

html,body{
  margin:0;
  padding:0;
  width:100%;
  height:100%;
}

#wwPortal{
  width:100vw;
  height:100vh;
  overflow:hidden;
  background:#020609;
  font-family:system-ui,-apple-system,"Segoe UI",sans-serif;
  color:#f5efe3;
  position:relative;
}

#wwStage{
  position:relative;
  width:100vw;
  height:100vh;
  overflow:hidden;
  background:#020609;
}

.ww-shell{
  position:absolute;
  inset:0;
  width:100%;
  height:100%;
  object-fit:contain;
  user-select:none;
  pointer-events:none;
}

/* ========================= */
/* TOP META */
/* ========================= */

.ww-title-meta{
  position:absolute;
  z-index:30;

  left:7.9%;
  top:2.7%;

  width:24%;

  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;

  gap:.34rem;

  text-align:center;

  pointer-events:none;
}

.ww-title-line{

  font-size:clamp(11px,.74vw,15px);
  line-height:1;

  letter-spacing:.34em;
  text-transform:uppercase;

  color:rgba(255,244,224,.90);

  font-weight:900;

  white-space:nowrap;

  text-shadow:
    0 2px 8px rgba(0,0,0,.82),
    0 0 12px rgba(218,162,50,.16);
}

.ww-title-sub{

  margin-top:.5rem;

  max-width:92%;

  font-family:Georgia,serif;

  font-size:clamp(12px,.82vw,16px);
  line-height:1.45;

  font-style:italic;

  letter-spacing:.03em;

  color:rgba(255,238,214,.78);

  text-shadow:
    0 2px 10px rgba(0,0,0,.88);
}

/* ========================= */
/* WORD NAVIGATION */
/* ========================= */

.ww-word-nav{
  position:absolute;
  z-index:24;

  left:8.2%;
  top:24.2%;

  width:18%;

  display:flex;
  flex-direction:column;
  align-items:flex-start;

  gap:2.6vh;
}

.ww-word-link{
  appearance:none;
  position:relative;

  display:block;

  width:max-content;

  padding:0;
  margin:0;

  border:0;
  background:transparent;

  cursor:pointer;
  text-decoration:none;

  font-family:"Courier New",monospace;

  font-size:clamp(28px,2vw,38px);
  font-weight:700;
  line-height:1;

  letter-spacing:.46em;
  text-transform:uppercase;

  color:#f5f3ee;

  text-shadow:
    0 2px 10px rgba(0,0,0,.88),
    0 0 10px rgba(255,255,255,.04);

  transition:
    transform 170ms ease,
    color 170ms ease,
    text-shadow 170ms ease,
    filter 170ms ease;
}

.ww-word-link::before{
  content:"";

  position:absolute;

  top:-40%;
  left:-70%;

  width:34%;
  height:180%;

  background:linear-gradient(
    90deg,
    transparent 0%,
    rgba(255,255,255,.06) 28%,
    rgba(255,231,170,.44) 50%,
    rgba(255,255,255,.06) 72%,
    transparent 100%
  );

  transform:rotate(22deg);

  opacity:0;
  pointer-events:none;
}

.ww-word-link:hover,
.ww-word-link:focus-visible{

  transform:translateY(-2px);

  color:#ffffff;

  text-shadow:
    0 3px 12px rgba(0,0,0,.92),
    0 0 14px rgba(255,255,255,.10),
    0 0 28px rgba(255,255,255,.08);

  filter:brightness(1.04);

  outline:none;
}

.ww-word-link:hover::before,
.ww-word-link:focus-visible::before{
  animation:wwWordSweep 940ms ease-out forwards;
}

.ww-word-link[data-disabled="true"]{
  cursor:pointer;
}

.ww-word-link[data-disabled="true"]:hover,
.ww-word-link[data-disabled="true"]:focus-visible{

  color:rgba(255,210,195,.95);

  text-shadow:
    0 3px 12px rgba(0,0,0,.92),
    0 0 16px rgba(190,42,42,.22),
    0 0 30px rgba(120,12,12,.18);
}

.ww-word-link[data-disabled="true"]::before{
  display:none;
}

.ww-word-solve{

  margin-top:4.4vh;

  font-size:clamp(44px,3vw,64px);

  letter-spacing:.34em;

  color:#ffc56f;

  text-shadow:
    0 4px 14px rgba(0,0,0,.94),
    0 0 18px rgba(255,185,80,.18);
}

.ww-word-solve:hover,
.ww-word-solve:focus-visible{

  color:#ffd08b;

  text-shadow:
    0 4px 16px rgba(0,0,0,.96),
    0 0 22px rgba(255,185,80,.28),
    0 0 42px rgba(255,185,80,.18);
}

.ww-guidepost{

  margin-top:4.4vh;

  width:100%;

  display:flex;
  flex-direction:column;
  align-items:center;

  text-align:center;
}

.ww-guidepost-title{

  font-size:clamp(14px,.9vw,18px);
  line-height:1;

  letter-spacing:.28em;
  text-transform:uppercase;

  font-weight:900;

  color:rgba(255,232,188,.88);

  text-shadow:
    0 2px 10px rgba(0,0,0,.88),
    0 0 18px rgba(242,178,76,.08);
}

@keyframes wwWordSweep{

  0%{
    left:-70%;
    opacity:0;
  }

  18%{
    opacity:1;
  }

  100%{
    left:128%;
    opacity:0;
  }
}

/* ========================= */
/* MORSE */
/* ========================= */

.ww-morse-pulse{
  position:absolute;
  z-index:24;

  top:5.2%;
  left:84.7%;

  display:flex;
  align-items:center;
  gap:6px;

  pointer-events:none;
}

.ww-morse-pulse i,
.ww-morse-pulse b{
  display:block;
  height:9px;
  border-radius:999px;

  background:rgba(255,222,150,.98);

  box-shadow:
    0 0 8px rgba(242,178,76,.42);

  animation:wwMorseBlink 1.8s infinite;
}

.ww-morse-pulse i{
  width:5px;
}

.ww-morse-pulse b{
  width:16px;
}

@keyframes wwMorseBlink{

  0%,20%,100%{
    opacity:.2;
  }

  10%{
    opacity:1;
  }
}

/* ========================= */
/* TOOLTIPS */
/* ========================= */

.ww-tooltip{
  position:absolute;
  z-index:60;

  left:26%;

  width:18%;
  min-width:190px;

  padding:.82rem .92rem;

  border:1px solid rgba(230,230,230,.92);
  border-radius:.75rem;

  background:rgba(255,255,255,.96);

  color:rgba(0,0,0,.88);

  font-size:clamp(9px,.72vw,13px);
  line-height:1.42;

  box-shadow:
    0 16px 44px rgba(0,0,0,.38);

  opacity:0;
  pointer-events:none;

  transform:translateY(-50%) translateX(-6px);

  transition:
    opacity 150ms ease,
    transform 150ms ease;
}

.ww-tooltip--locked{
  background:linear-gradient(
    180deg,
    rgba(158,38,45,.96),
    rgba(104,18,25,.98)
  );

  color:#fff;
}

.ww-tooltip-title{
  display:block;

  margin-bottom:.32rem;

  font-size:1.08em;
  letter-spacing:.16em;
  text-transform:uppercase;

  font-weight:900;
}

.ww-clue-tooltip{
  top:24%;
}

.ww-life-tooltip{
  top:34%;
}

.ww-leader-tooltip{
  top:44%;
}

.ww-solve-tooltip{
  top:58%;
}

.ww-clue-trigger:hover ~ .ww-clue-tooltip,
.ww-clue-trigger:focus-visible ~ .ww-clue-tooltip,
.ww-life-trigger:hover ~ .ww-life-tooltip,
.ww-life-trigger:focus-visible ~ .ww-life-tooltip,
.ww-leader-trigger:hover ~ .ww-leader-tooltip,
.ww-leader-trigger:focus-visible ~ .ww-leader-tooltip,
.ww-solve-trigger:hover ~ .ww-solve-tooltip,
.ww-solve-trigger:focus-visible ~ .ww-solve-tooltip{
  opacity:1;
  transform:translateY(-50%) translateX(0);
}

/* ========================= */
/* MENU */
/* ========================= */

.ww-menu{
  position:absolute;
  z-index:80;

  top:3.3%;
  right:2.4%;

  width:5%;
  height:5%;
}

.ww-menu-hotspot{
  width:100%;
  height:100%;

  min-width:44px;
  min-height:44px;

  position:absolute;

  top:0;
  right:0;

  border:0;
  border-radius:.72rem;

  background:transparent;

  cursor:pointer;

  z-index:82;

  transition:
    transform 160ms ease,
    box-shadow 160ms ease,
    background 160ms ease,
    filter 160ms ease;
}

.ww-menu-hotspot:hover,
.ww-menu-hotspot:focus-visible{

  transform:scale(1.08);

  background:rgba(255,255,255,.04);

  box-shadow:
    0 0 16px rgba(242,178,76,.24),
    0 0 30px rgba(242,178,76,.12);

  filter:brightness(1.12);
}

.ww-menu-dropdown,
.ww-legal-submenu{
  position:absolute;

  min-width:220px;

  padding:.55rem;

  border:1px solid rgba(224,155,32,.46);
  border-radius:.85rem;

  background:rgba(3,8,13,.94);

  box-shadow:
    0 22px 54px rgba(0,0,0,.62);

  opacity:0;
  pointer-events:none;

  transition:
    opacity 150ms ease,
    transform 150ms ease;
}

.ww-menu-dropdown{
  top:calc(100% + .7rem);
  right:0;

  transform:translateY(-4px);
}

.ww-menu.is-open .ww-menu-dropdown{
  opacity:1;
  pointer-events:auto;
  transform:translateY(0);
}

.ww-legal-wrap{
  position:relative;
}

.ww-legal-submenu{
  top:0;
  right:calc(100% + .55rem);
}

.ww-legal-wrap:hover .ww-legal-submenu{
  opacity:1;
  pointer-events:auto;
}

.ww-menu-dropdown a,
.ww-legal-submenu a{
  display:block;

  padding:.72rem .86rem;

  border-radius:.55rem;

  color:rgba(255,244,224,.92);

  text-decoration:none;

  font-size:.78rem;
  font-weight:850;

  letter-spacing:.12em;
  text-transform:uppercase;
}

.ww-menu-dropdown a:hover,
.ww-legal-submenu a:hover{
  background:rgba(224,155,32,.15);
  color:#f2b24c;
}

</style>

<div id="wwPortal">

  <div class="ww-title-meta">

    <div class="ww-title-line">
      ${safeText(seasonLabel)}
    </div>

    <div class="ww-title-line">
      ${safeText(orgName)}
    </div>

    <div class="ww-title-sub">
      A letter per week from a wintry scroll.<br>
      Piece them together — reveal the whole.
    </div>

  </div>

  <div id="wwStage">

    <img
      class="ww-shell"
      src="/assets/winterword/shared/BS1.png"
      alt="WinterWord Base Station"
      draggable="false"
    >

    <div class="ww-morse-pulse">
      <i></i><i></i><b></b><i></i><b></b>
    </div>

    <nav class="ww-word-nav">

      <button
        class="ww-word-link ww-clue-trigger"
        type="button"
        data-nav="clues"
      >
        CLUE
      </button>

      <button
        class="ww-word-link ww-life-trigger"
        type="button"
        data-nav="lifeline"
        data-disabled="${lifelineAvailable ? "false" : "true"}"
      >
        LIFE
      </button>

      <button
        class="ww-word-link ww-leader-trigger"
        type="button"
        data-nav="leaderboard"
        data-disabled="${leaderboardAvailable ? "false" : "true"}"
      >
        LEAD
      </button>

      <a
        class="ww-word-link ww-word-solve ww-solve-trigger"
        href="${solveHref}"
      >
        SOLVE
      </a>

      <div class="ww-guidepost">

        <div class="ww-guidepost-title">
          The Guidepost
        </div>

      </div>

    </nav>

    <div class="ww-tooltip ww-clue-tooltip">
      <span class="ww-tooltip-title">Clues</span>
      Each clue reveals another piece.
    </div>

    <div class="ww-tooltip ww-life-tooltip ${lifelineAvailable ? "" : "ww-tooltip--locked"}">
      <span class="ww-tooltip-title">Lifeline</span>
      ${lifelineAvailable ? "This passage is open." : "This passage waits its moment."}
    </div>

    <div class="ww-tooltip ww-leader-tooltip ${leaderboardAvailable ? "" : "ww-tooltip--locked"}">
      <span class="ww-tooltip-title">Leaderboard</span>
      ${leaderboardAvailable ? "The board remembers all." : "No answers received yet."}
    </div>

    <div class="ww-tooltip ww-solve-tooltip">
      <span class="ww-tooltip-title">Solve</span>
      Submit the WinterWord when the answer is clear.
    </div>

    <div class="ww-menu">

      <button
        class="ww-menu-hotspot"
        type="button"
      ></button>

      <div class="ww-menu-dropdown">

        <a href="#" data-nav="welcome">Welcome</a>

        <a href="${subscribeHref}">
          Subscribe
        </a>

        <a href="${reportProblemHref}">
          Report a Problem
        </a>

        <a href="${contactHref}">
          Contact
        </a>

        <div class="ww-legal-wrap">

          <a href="#">
            Legal ▸
          </a>

          <div class="ww-legal-submenu">

            <a href="/legal/privacy-policy.html">
              Privacy Policy
            </a>

            <a href="/legal/terms-of-use.html">
              Terms of Use
            </a>

            <a href="/legal/disclaimer.html">
              Disclaimer
            </a>

          </div>

        </div>

      </div>

    </div>

  </div>

</div>
`;

  const navButtons = app.querySelectorAll("[data-nav]");

  navButtons.forEach((button) => {

    button.addEventListener("click", (event) => {

      const target = button.getAttribute("data-nav");

      const disabled =
        button.getAttribute("data-disabled") === "true";

      if (disabled) return;

      event.preventDefault();

      if (typeof navigate === "function") {
        navigate(target);
      }

    });

  });

  const menu =
    app.querySelector(".ww-menu");

  const menuHotspot =
    app.querySelector(".ww-menu-hotspot");

  if (menu && menuHotspot) {

    menuHotspot.addEventListener("click", (event) => {

      event.preventDefault();
      event.stopPropagation();

      menu.classList.toggle("is-open");

    });

    document.addEventListener("click", (event) => {

      if (!menu.contains(event.target)) {
        menu.classList.remove("is-open");
      }

    });

  }

}
