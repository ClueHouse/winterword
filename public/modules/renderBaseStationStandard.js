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
  padding:0;
}

.ww-title-meta{
  position:absolute;
  z-index:30;
  width:100%;
  top:1.8%;
  text-align:center;
  font-size:clamp(12px,1vw,18px);
  line-height:1.2;
  letter-spacing:0.32em;
  text-transform:uppercase;
  color:rgba(255,244,224,0.92);
  font-weight:900;
  text-shadow:
    0 2px 8px rgba(0,0,0,0.82),
    0 0 12px rgba(218,162,50,0.16);
  white-space:nowrap;
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

.ww-word-nav{
  position:absolute;
  z-index:24;
  left:8.4%;
  top:21.5%;
  width:24%;
  display:flex;
  flex-direction:column;
  gap:3.25vh;
}

.ww-word-link{
  appearance:none;
  position:relative;
  display:block;
  width:max-content;
  max-width:100%;
  padding:0.2rem 0.15rem;
  margin:0;
  border:0;
  background:transparent;
  color:rgba(255,239,205,0.86);
  font-family:Georgia,"Times New Roman",serif;
  font-size:clamp(24px,3vw,62px);
  font-weight:700;
  line-height:0.9;
  letter-spacing:0.13em;
  text-transform:uppercase;
  text-decoration:none;
  cursor:pointer;
  text-shadow:
    0 3px 10px rgba(0,0,0,0.86),
    0 0 18px rgba(218,162,50,0.20);
  transition:
    color 170ms ease,
    text-shadow 170ms ease,
    transform 170ms ease,
    filter 170ms ease;
}

.ww-word-link::before{
  content:"";
  position:absolute;
  top:-38%;
  left:-70%;
  width:34%;
  height:180%;
  background:linear-gradient(
    90deg,
    transparent 0%,
    rgba(255,255,255,0.06) 28%,
    rgba(255,231,170,0.44) 50%,
    rgba(255,255,255,0.06) 72%,
    transparent 100%
  );
  transform:rotate(22deg);
  opacity:0;
  pointer-events:none;
}

.ww-word-link:hover,
.ww-word-link:focus-visible{
  color:rgba(255,228,166,0.98);
  transform:translateX(5px);
  filter:brightness(1.08);
  text-shadow:
    0 3px 12px rgba(0,0,0,0.92),
    0 0 16px rgba(242,178,76,0.42),
    0 0 34px rgba(242,178,76,0.26);
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
  color:rgba(255,210,195,0.96);
  text-shadow:
    0 3px 12px rgba(0,0,0,0.92),
    0 0 16px rgba(190,42,42,0.36),
    0 0 34px rgba(120,12,12,0.24);
}

.ww-word-link[data-disabled="true"]::before{
  display:none;
}

.ww-word-solve{
  margin-top:1.1vh;
  font-size:clamp(30px,3.9vw,78px);
  letter-spacing:0.11em;
  color:rgba(255,235,188,0.95);
}

.ww-word-solve:hover,
.ww-word-solve:focus-visible{
  color:rgba(255,239,204,1);
  text-shadow:
    0 4px 14px rgba(0,0,0,0.94),
    0 0 22px rgba(242,178,76,0.52),
    0 0 48px rgba(242,178,76,0.32);
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
  background:rgba(255,222,150,0.98);
  box-shadow:0 0 8px rgba(242,178,76,0.42);
  animation:wwMorseBlink 1.8s infinite;
}

.ww-morse-pulse i{ width:5px; }
.ww-morse-pulse b{ width:16px; }

@keyframes wwMorseBlink{
  0%,20%,100%{ opacity:0.2; }
  10%{ opacity:1; }
}

.ww-tooltip{
  position:absolute;
  z-index:60;
  left:26%;
  width:18%;
  min-width:190px;
  padding:0.82rem 0.92rem;
  border:1px solid rgba(230,230,230,0.92);
  border-radius:0.75rem;
  background:rgba(255,255,255,0.96);
  color:rgba(0,0,0,0.88);
  font-size:clamp(9px,0.72vw,13px);
  line-height:1.42;
  box-shadow:0 16px 44px rgba(0,0,0,0.38);
  opacity:0;
  pointer-events:none;
  transform:translateY(-50%) translateX(-6px);
  transition:opacity 150ms ease, transform 150ms ease;
}

.ww-tooltip--locked{
  background:linear-gradient(180deg, rgba(158,38,45,0.96), rgba(104,18,25,0.98));
  color:#fff;
}

.ww-tooltip-title{
  display:block;
  margin-bottom:0.32rem;
  font-size:1.08em;
  letter-spacing:0.16em;
  text-transform:uppercase;
  font-weight:900;
}

.ww-clue-tooltip{ top:24%; }
.ww-life-tooltip{ top:34%; }
.ww-leader-tooltip{ top:44%; }
.ww-solve-tooltip{ top:57%; }

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
  border-radius:0.72rem;
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
  background:rgba(255,255,255,0.04);
  box-shadow:
    0 0 16px rgba(242,178,76,0.24),
    0 0 30px rgba(242,178,76,0.12);
  filter:brightness(1.12);
}

.ww-menu-hotspot:active,
.ww-menu-hotspot.is-clicked{
  transform:scale(0.94);
  background:rgba(255,255,255,0.10);
}

.ww-menu-dropdown,
.ww-legal-submenu{
  position:absolute;
  min-width:220px;
  padding:0.55rem;
  border:1px solid rgba(224,155,32,0.46);
  border-radius:0.85rem;
  background:rgba(3,8,13,0.94);
  box-shadow:0 22px 54px rgba(0,0,0,0.62);
  opacity:0;
  pointer-events:none;
  transition:opacity 150ms ease, transform 150ms ease;
}

.ww-menu-dropdown{
  top:calc(100% + 0.7rem);
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
  right:calc(100% + 0.55rem);
}

.ww-legal-wrap:hover .ww-legal-submenu{
  opacity:1;
  pointer-events:auto;
}

.ww-menu-dropdown a,
.ww-legal-submenu a{
  display:block;
  padding:0.72rem 0.86rem;
  border-radius:0.55rem;
  color:rgba(255,244,224,0.92);
  text-decoration:none;
  font-size:0.78rem;
  font-weight:850;
  letter-spacing:0.12em;
  text-transform:uppercase;
}

.ww-menu-dropdown a:hover,
.ww-legal-submenu a:hover{
  background:rgba(224,155,32,0.15);
  color:#f2b24c;
}

.ww-screen-reader-only{
  position:absolute;
  width:1px;
  height:1px;
  padding:0;
  margin:-1px;
  overflow:hidden;
  clip:rect(0 0 0 0);
  white-space:nowrap;
  border:0;
}
</style>

<div id="wwPortal">

  <div class="ww-title-meta">
    ${safeText(seasonLabel)} &nbsp;✦&nbsp; ${safeText(orgName)}
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

    <nav class="ww-word-nav" aria-label="WinterWord Base Station navigation">
      <button class="ww-word-link ww-clue-trigger" type="button" data-nav="clues">
        Clues
      </button>

      <button
        class="ww-word-link ww-life-trigger"
        type="button"
        data-nav="lifeline"
        data-disabled="${lifelineAvailable ? "false" : "true"}"
      >
        Life
      </button>

      <button
        class="ww-word-link ww-leader-trigger"
        type="button"
        data-nav="leaderboard"
        data-disabled="${leaderboardAvailable ? "false" : "true"}"
      >
        Lead
      </button>

      <a class="ww-word-link ww-word-solve ww-solve-trigger" href="${solveHref}">
        Solve
      </a>
    </nav>

    <div class="ww-tooltip ww-clue-tooltip">
      <span class="ww-tooltip-title">Clues</span>
      Each clue reveals another piece.
    </div>

    <div class="ww-tooltip ww-life-tooltip ${lifelineAvailable ? "" : "ww-tooltip--locked"}">
      <span class="ww-tooltip-title">Lifeline</span>
      ${lifelineAvailable ? `This passage is open.` : `This passage waits its moment.`}
    </div>

    <div class="ww-tooltip ww-leader-tooltip ${leaderboardAvailable ? "" : "ww-tooltip--locked"}">
      <span class="ww-tooltip-title">Leaderboard</span>
      ${leaderboardAvailable ? `The board remembers all.` : `No answers received yet.`}
    </div>

    <div class="ww-tooltip ww-solve-tooltip">
      <span class="ww-tooltip-title">Solve</span>
      Submit the WinterWord when the answer is clear.
    </div>

    <div class="ww-menu">
      <button class="ww-menu-hotspot" type="button" aria-label="Open menu"></button>

      <div class="ww-menu-dropdown">
        <a href="#" data-nav="welcome">Welcome</a>
        <a href="${subscribeHref}">Subscribe</a>
        <a href="${reportProblemHref}">Report a Problem</a>
        <a href="${contactHref}">Contact</a>

        <div class="ww-legal-wrap">
          <a href="#">Legal ▸</a>

          <div class="ww-legal-submenu">
            <a href="/legal/privacy-policy.html">Privacy Policy</a>
            <a href="/legal/terms-of-use.html">Terms of Use</a>
            <a href="/legal/disclaimer.html">Disclaimer</a>
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
      const disabled = button.getAttribute("data-disabled") === "true";

      if (disabled) return;

      event.preventDefault();

      if (typeof navigate === "function") {
        navigate(target);
      }
    });
  });

  const menu = app.querySelector(".ww-menu");
  const menuHotspot = app.querySelector(".ww-menu-hotspot");

  if (menu && menuHotspot) {
    menuHotspot.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      menu.classList.toggle("is-open");
      menuHotspot.classList.add("is-clicked");

      window.setTimeout(() => {
        menuHotspot.classList.remove("is-clicked");
      }, 160);
    });

    document.addEventListener("click", (event) => {
      if (!menu.contains(event.target)) {
        menu.classList.remove("is-open");
      }
    });
  }
}
