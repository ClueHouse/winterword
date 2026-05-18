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
  background:
    radial-gradient(circle at top right, rgba(218,162,50,0.10), transparent 34%),
    radial-gradient(circle at bottom left, rgba(70,110,165,0.22), transparent 42%),
    linear-gradient(180deg,#0b1826 0%, #13283d 100%);
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
    0 0 12px rgba(218,162,50,0.12);
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
  object-fit:cover;
  user-select:none;
  pointer-events:none;
}

.ww-hotspot{
  position:absolute;
  z-index:20;
  display:block;
  border:0;
  padding:0;
  margin:0;
  background:transparent;
  cursor:pointer;
  text-decoration:none;
}

.ww-hotspot[data-disabled="true"]{
  cursor:default;
}

.ww-icon{
  position:absolute;
  z-index:22;
  display:block;
  transform:translate(-50%,-50%);
  user-select:none;
  pointer-events:none;
  filter:
    brightness(1)
    saturate(1.04)
    drop-shadow(0 10px 14px rgba(0,0,0,0.48))
    drop-shadow(0 0 10px rgba(218,162,50,0.18));
  transition:
    transform 170ms ease,
    filter 170ms ease,
    opacity 170ms ease;
}

.ww-hotspot:hover + .ww-icon,
.ww-hotspot:focus-visible + .ww-icon{
  transform:translate(calc(-50% - 4px), calc(-50% - 4px));
  filter:
    brightness(1.34)
    saturate(1.24)
    contrast(1.08)
    drop-shadow(0 13px 18px rgba(0,0,0,0.6))
    drop-shadow(0 0 24px rgba(245,183,52,0.72));
}

.ww-clue-icon{
  left:17%;
  top:24%;
  width:6%;
}

.ww-life-icon{
  left:17%;
  top:35%;
  width:15%;
}

.ww-leader-icon{
  left:17%;
  top:45%;
  width:6%;
}

.ww-clue-hotspot{
  left:13.8%;
  top:19.8%;
  width:6.4%;
  height:8.6%;
}

.ww-life-hotspot{
  left:9.8%;
  top:29.2%;
  width:14.2%;
  height:11.4%;
}

.ww-leader-hotspot{
  left:13.8%;
  top:40.7%;
  width:6.4%;
  height:8.6%;
}

.ww-solve-hotspot{
  left:8%;
  top:51%;
  width:25.4%;
  height:9.2%;
  border-radius:0.75rem;
  border:0;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease,
    filter 180ms ease;
}

.ww-solve-hotspot:hover,
.ww-solve-hotspot:focus-visible{
  transform:scale(1.015);
  box-shadow:
    0 0 18px rgba(242,178,76,0.22),
    0 0 36px rgba(242,178,76,0.10);
  filter:brightness(1.08);
  outline:none;
}

.ww-solve-gleam{
  position:absolute;
  z-index:16;
  left:8%;
  top:51%;
  width:25.4%;
  height:9.2%;
  pointer-events:none;
  border-radius:0.75rem;
  overflow:hidden;
  opacity:0;
  transition:opacity 180ms ease;
}

.ww-solve-gleam::before{
  content:"";
  position:absolute;
  top:-135%;
  left:-40%;
  width:24%;
  height:370%;
  transform:rotate(24deg);
  background:
    linear-gradient(
      90deg,
      transparent 0%,
      rgba(255,238,170,0.0) 18%,
      rgba(255,238,170,0.58) 50%,
      rgba(255,238,170,0.0) 82%,
      transparent 100%
    );
}

.ww-solve-hotspot:hover + .ww-solve-gleam,
.ww-solve-hotspot:focus-visible + .ww-solve-gleam{
  opacity:1;
}

.ww-solve-hotspot:hover + .ww-solve-gleam::before,
.ww-solve-hotspot:focus-visible + .ww-solve-gleam::before{
  animation:wwSolveSlowGleam 2.8s ease-in-out infinite;
}

@keyframes wwSolveSlowGleam{
  0%{ left:-42%; }
  58%{ left:118%; }
  100%{ left:118%; }
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
  left:22%;
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
.ww-life-tooltip{ top:35%; }
.ww-leader-tooltip{ top:45%; }

.ww-clue-hotspot:hover ~ .ww-clue-tooltip,
.ww-clue-hotspot:focus-visible ~ .ww-clue-tooltip,
.ww-life-hotspot:hover ~ .ww-life-tooltip,
.ww-life-hotspot:focus-visible ~ .ww-life-tooltip,
.ww-leader-hotspot:hover ~ .ww-leader-tooltip,
.ww-leader-hotspot:focus-visible ~ .ww-leader-tooltip{
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

    <button class="ww-hotspot ww-clue-hotspot" data-nav="clues"></button>
    <img class="ww-icon ww-clue-icon" src="/assets/winterword/shared/icon_clue.png">

    <button class="ww-hotspot ww-life-hotspot" data-nav="lifeline" data-disabled="${lifelineAvailable ? "false" : "true"}"></button>
    <img class="ww-icon ww-life-icon" src="/assets/winterword/shared/icon_life.png">

    <button class="ww-hotspot ww-leader-hotspot" data-nav="leaderboard" data-disabled="${leaderboardAvailable ? "false" : "true"}"></button>
    <img class="ww-icon ww-leader-icon" src="/assets/winterword/shared/icon_leader.png">

    <a class="ww-hotspot ww-solve-hotspot" href="${solveHref}"></a>
    <div class="ww-solve-gleam"></div>

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

    <div class="ww-menu">
      <button class="ww-menu-hotspot" type="button"></button>

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
