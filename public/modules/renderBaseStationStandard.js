export function renderBaseStationStandard(app, data = {}, navigate) {
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
    `mailto:fix@cluehouse.co.nz?subject=WinterWord%20Issue%20-%20${encodedOrgName}` +
    `&body=SET%20THE%20SCENE%3A%0AWhich%20page%20were%20you%20on%3F%0A%0A` +
    `PLOT%20TWIST%3A%0AWhat%20went%20wrong%3F%0A%0A` +
    `ALTERNATE%20ENDING%3A%0AWhat%20did%20you%20expect%20to%20happen%3F%0A%0A` +
    `YOUR%20TRAVELLER%E2%80%99S%20GEAR%3A%0AWhich%20device%20%2B%20browser%20you%20brought%20on%20this%20journey.%0A%0A` +
    `Thanks%20for%20sharing%20%E2%80%94%20we%E2%80%99ll%20follow%20the%20trail%20and%20set%20things%20right.`;

  const subscribeHref =
    `mailto:opt@cluehouse.co.nz?subject=WinterWord%20Subscribe%20-%20${encodedOrgName}` +
    `&body=Sign%20me%20up.%20The%20winter%20hush%20is%20starting%20to%20feel%20personal.`;

  const solveHref =
    `mailto:key@cluehouse.co.nz?subject=FINAL%20WinterWord%20Submission%20-%20${encodedOrgName}%20-%202026` +
    `&body=You%20feel%20the%20pieces%20have%20settled.%0A%0A` +
    `Clues%20gathered.%20Letters%20found.%0A` +
    `A%20pattern%2C%20perhaps%2C%20now%20clear%20beneath%20the%20frost.%0A%0A` +
    `If%20you%20believe%20you%20can%20name%20the%20WinterWord%2C%0A` +
    `set%20it%20down%20below.%0A%0A` +
    `Your%20answer%3A%0A%0A%5BTYPE%20YOUR%20FINAL%20WORD%20HERE%5D%0A%0A%0A` +
    `(Only%20one%20submission%20is%20counted.%0AChoose%20your%20moment%20%E2%80%94%20winter%20does%20not%20answer%20twice.)`;

  const contactHref =
    `mailto:hq@cluehouse.co.nz?subject=Clue%20House%20Enquiry`;

  app.innerHTML = `
<style>
*{
  box-sizing:border-box;
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
  display:flex;
  align-items:center;
  justify-content:center;
  padding:2.5vh 2.5vw;
  position:relative;
}

#wwStage{
  position:relative;
  width:min(92vw,163vh);
  height:min(51.75vw,92vh);
  overflow:hidden;
  background:#020609;
  border-radius:2.2rem;
  box-shadow:
    0 28px 90px rgba(0,0,0,0.58),
    0 0 0 1px rgba(218,162,50,0.08),
    inset 0 0 40px rgba(255,180,50,0.03);
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

.ww-title-meta{
  position:absolute;
  z-index:18;
  left:16%;
  top:16%;
  max-width:52%;
  width:auto;
  font-size:clamp(9px,0.82vw,15px);
  line-height:1.2;
  letter-spacing:0.28em;
  text-transform:uppercase;
  color:rgba(255,244,224,0.88);
  font-weight:900;
  text-shadow:0 2px 8px rgba(0,0,0,0.82);
  white-space:nowrap;
  overflow:visible;
  text-overflow:unset;
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
    drop-shadow(0 10px 14px rgba(0,0,0,0.48))
    drop-shadow(0 0 10px rgba(218,162,50,0.18));
  transition:
    transform 170ms ease,
    filter 170ms ease,
    opacity 170ms ease;
}

.ww-hotspot:hover + .ww-icon,
.ww-hotspot:focus-visible + .ww-icon{
  transform:translate(-50%,-50%) scale(1.055);
  filter:
    drop-shadow(0 12px 18px rgba(0,0,0,0.58))
    drop-shadow(0 0 22px rgba(234,172,45,0.55));
}

.ww-hotspot[data-disabled="true"] + .ww-icon{
  opacity:1;
  filter:
    drop-shadow(0 10px 14px rgba(0,0,0,0.48))
    drop-shadow(0 0 10px rgba(218,162,50,0.18));
}

.ww-clue-hotspot{
  left:3.1%;
  top:31.3%;
  width:7.5%;
  height:13.2%;
}

.ww-clue-icon{
  left:6.8%;
  top:37.6%;
  width:8.4%;
}

.ww-life-hotspot{
  left:3.1%;
  top:46.6%;
  width:7.8%;
  height:13.1%;
}

.ww-life-icon{
  left:7%;
  top:53.1%;
  width:6.8%;
}

.ww-leader-hotspot{
  left:3.05%;
  top:64.4%;
  width:7.8%;
  height:13.2%;
}

.ww-leader-icon{
  left:6.8%;
  top:71.1%;
  width:6.8%;
}

.ww-subscribe-hotspot{
  left:2.45%;
  bottom:8%;
  width:9.1%;
  height:6%;
  border:2px solid red;
  border-radius:0.7rem;
}

.ww-subscribe-hotspot::after{
  content:"";
  position:absolute;
  inset:-10%;
  border-radius:inherit;
  opacity:0;
  pointer-events:none;
  background:
    radial-gradient(circle at 50% 50%, rgba(255,255,255,0.16), transparent 58%),
    linear-gradient(110deg, transparent 0%, rgba(255,218,128,0.0) 34%, rgba(255,218,128,0.42) 50%, rgba(255,218,128,0.0) 66%, transparent 100%);
  background-size:220% 100%;
  transition:opacity 160ms ease;
}

.ww-subscribe-hotspot:hover::after,
.ww-subscribe-hotspot:focus-visible::after{
  opacity:1;
  animation:wwSubscribeGlow 1.2s ease-in-out infinite;
}

@keyframes wwSubscribeGlow{
  0%{ background-position:180% 0; }
  100%{ background-position:-80% 0; }
}

.ww-solve-hotspot{
  left:60%;
  top:60%;
  width:25.4%;
  height:9.2%;
  border:2px solid red;
  border-radius:0.75rem;
}

.ww-solve-glow{
  position:absolute;
  z-index:16;
  left:54.7%;
  top:58.4%;
  width:25.4%;
  height:9.2%;
  pointer-events:none;
  border-radius:0.75rem;
  opacity:0;
  background:
    linear-gradient(105deg, transparent 0%, rgba(255,220,122,0.0) 35%, rgba(255,220,122,0.45) 50%, rgba(255,220,122,0.0) 65%, transparent 100%);
  background-size:220% 100%;
  transition:opacity 180ms ease, box-shadow 180ms ease;
}

.ww-solve-hotspot:hover + .ww-solve-glow,
.ww-solve-hotspot:focus-visible + .ww-solve-glow{
  opacity:1;
  animation:wwSolveGleam 1.15s ease-in-out infinite;
  box-shadow:
    0 0 22px rgba(242,178,76,0.34),
    0 0 52px rgba(242,178,76,0.22);
}

@keyframes wwSolveGleam{
  0%{ background-position:180% 0; }
  100%{ background-position:-80% 0; }
}

.ww-updates-overlay{
  position:absolute;
  z-index:15;
  left:18%;
  top:82%;
  width:24.6%;
  min-height:8%;
  color:rgba(255,244,224,0.9);
  text-shadow:0 2px 8px rgba(0,0,0,0.82);
}

.ww-update-text{
  margin:0;
  font-size:clamp(10px,1.02vw,18px);
  line-height:1.42;
}

.ww-menu{
  position:absolute;
  z-index:80;
  top:4.4vh;
  right:1.45vw;
}

.ww-menu-button{
  width:clamp(36px,3.4vw,58px);
  height:clamp(36px,3.4vw,58px);
  border-radius:0.72rem;
  border:1px solid rgba(224,155,32,0.72);
  background:rgba(3,8,12,0.52);
  color:rgba(255,239,206,0.94);
  font-size:clamp(20px,1.85vw,32px);
  line-height:1;
  cursor:pointer;
  box-shadow:
    0 10px 26px rgba(0,0,0,0.36),
    inset 0 0 12px rgba(224,155,32,0.08);
}

.ww-menu-dropdown,
.ww-legal-submenu{
  position:absolute;
  min-width:220px;
  padding:0.55rem;
  border:1px solid rgba(224,155,32,0.58);
  border-radius:0.85rem;
  background:rgba(3,8,13,0.96);
  box-shadow:
    0 22px 54px rgba(0,0,0,0.62),
    inset 0 0 18px rgba(255,180,70,0.035);
  opacity:0;
  pointer-events:none;
  transition:opacity 150ms ease, transform 150ms ease;
  backdrop-filter:blur(10px);
}

.ww-menu-dropdown{
  top:calc(100% + 0.65rem);
  right:0;
  transform:translateY(-4px);
}

.ww-menu:hover .ww-menu-dropdown,
.ww-menu:focus-within .ww-menu-dropdown{
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
  transform:translateX(4px);
}

.ww-legal-wrap:hover .ww-legal-submenu,
.ww-legal-wrap:focus-within .ww-legal-submenu{
  opacity:1;
  pointer-events:auto;
  transform:translateX(0);
}

.ww-menu-dropdown a,
.ww-legal-submenu a{
  display:block;
  padding:0.72rem 0.86rem;
  border-radius:0.55rem;
  color:rgba(255,244,224,0.92);
  text-decoration:none;
  font-size:0.78rem;
  line-height:1.2;
  font-weight:850;
  letter-spacing:0.12em;
  text-transform:uppercase;
  white-space:nowrap;
}

.ww-menu-dropdown a:hover,
.ww-menu-dropdown a:focus-visible,
.ww-legal-submenu a:hover,
.ww-legal-submenu a:focus-visible{
  background:rgba(224,155,32,0.15);
  color:#f2b24c;
  outline:none;
}

.ww-tooltip{
  position:absolute;
  z-index:60;
  left:13%;
  width:15.5%;
  min-width:160px;
  padding:0.72rem 0.82rem;
  border:1px solid rgba(224,155,32,0.5);
  border-radius:0.75rem;
  background:rgba(4,9,14,0.94);
  color:rgba(255,244,224,0.9);
  font-size:clamp(9px,0.72vw,13px);
  line-height:1.42;
  box-shadow:0 16px 44px rgba(0,0,0,0.58);
  opacity:0;
  pointer-events:none;
  transform:translateY(-50%) translateX(-6px);
  transition:opacity 150ms ease, transform 150ms ease;
}

.ww-tooltip--locked{
  border-color:rgba(255,255,255,0.22);
  background:linear-gradient(180deg, rgba(122,18,24,0.96), rgba(72,8,14,0.98));
  color:#ffffff;
  box-shadow:
    0 16px 44px rgba(0,0,0,0.62),
    0 0 22px rgba(180,20,30,0.24);
}

.ww-tooltip-title{
  display:block;
  margin-bottom:0.3rem;
  color:#e4a735;
  font-size:0.72em;
  letter-spacing:0.16em;
  text-transform:uppercase;
  font-weight:900;
}

.ww-tooltip--locked .ww-tooltip-title{
  color:#ffffff;
}

.ww-clue-tooltip{ top:37.6%; }
.ww-life-tooltip{ top:53%; }
.ww-leader-tooltip{ top:71%; }

.ww-clue-hotspot:hover ~ .ww-clue-tooltip,
.ww-clue-hotspot:focus-visible ~ .ww-clue-tooltip,
.ww-life-hotspot:hover ~ .ww-life-tooltip,
.ww-life-hotspot:focus-visible ~ .ww-life-tooltip,
.ww-leader-hotspot:hover ~ .ww-leader-tooltip,
.ww-leader-hotspot:focus-visible ~ .ww-leader-tooltip{
  opacity:1;
  transform:translateY(-50%) translateX(0);
}

@media (max-aspect-ratio: 16 / 9){
  #wwStage{
    width:92vw;
    height:calc(92vw * 0.5625);
  }
}

@media (min-aspect-ratio: 16 / 9){
  #wwStage{
    width:calc(92vh * 1.77778);
    height:92vh;
  }
}
</style>

<div id="wwPortal">

  <div id="wwStage" aria-label="WinterWord Base Station">

    <img
      class="ww-shell"
      src="/assets/winterword/shared/BS1.png"
      alt="WinterWord Base Station"
      draggable="false"
    >

    <div class="ww-title-meta">
      ${safeText(seasonLabel)} &nbsp;✦&nbsp; ${safeText(orgName)}
    </div>

    <button
      class="ww-hotspot ww-clue-hotspot"
      type="button"
      data-nav="clues"
      aria-label="Open clues"
    ></button>
    <img
      class="ww-icon ww-clue-icon"
      src="/assets/winterword/shared/icon_clue.png"
      alt=""
      aria-hidden="true"
      draggable="false"
    >

    <button
      class="ww-hotspot ww-life-hotspot"
      type="button"
      data-nav="lifeline"
      data-disabled="${lifelineAvailable ? "false" : "true"}"
      aria-label="${lifelineAvailable ? "Open lifeline" : `Lifeline opens after clue ${safeText(lifelineUnlockClue)}`}"
    ></button>
    <img
      class="ww-icon ww-life-icon"
      src="/assets/winterword/shared/icon_life.png"
      alt=""
      aria-hidden="true"
      draggable="false"
    >

    <button
      class="ww-hotspot ww-leader-hotspot"
      type="button"
      data-nav="leaderboard"
      data-disabled="${leaderboardAvailable ? "false" : "true"}"
      aria-label="${leaderboardAvailable ? "Open leaderboard" : "Leaderboard unavailable"}"
    ></button>
    <img
      class="ww-icon ww-leader-icon"
      src="/assets/winterword/shared/icon_leader.png"
      alt=""
      aria-hidden="true"
      draggable="false"
    >

    <a
      class="ww-hotspot ww-subscribe-hotspot"
      href="${subscribeHref}"
      aria-label="Subscribe to WinterWord clue alerts"
    ></a>

    <a
      class="ww-hotspot ww-solve-hotspot"
      href="${solveHref}"
      aria-label="Submit final WinterWord answer"
    ></a>
    <div class="ww-solve-glow" aria-hidden="true"></div>

    <div class="ww-updates-overlay">
      ${
        updatesText && String(updatesText).trim()
          ? `<p class="ww-update-text">${safeText(updatesText)}</p>`
          : `<p class="ww-update-text">No new updates yet.</p>`
      }
    </div>

    <div class="ww-tooltip ww-clue-tooltip">
      <span class="ww-tooltip-title">Clues</span>
      Each clue reveals one letter. Gather them carefully.
    </div>

    <div class="ww-tooltip ww-life-tooltip ${lifelineAvailable ? "" : "ww-tooltip--locked"}">
      <span class="ww-tooltip-title">Lifeline</span>
      ${
        lifelineAvailable
          ? `The Lifeline is open. Step carefully.`
          : `This passage waits its moment. It opens after clue ${safeText(lifelineUnlockClue)}.`
      }
    </div>

    <div class="ww-tooltip ww-leader-tooltip ${leaderboardAvailable ? "" : "ww-tooltip--locked"}">
      <span class="ww-tooltip-title">Leaderboard</span>
      ${
        leaderboardAvailable
          ? `The Leaderboard remembers those who found the answer.`
          : `No answers have been received. No correct ones, anyway...`
      }
    </div>

  </div>

  <div class="ww-menu">
    <button class="ww-menu-button" type="button" aria-label="Open menu">
      ☰
    </button>

    <div class="ww-menu-dropdown">
      <a href="${reportProblemHref}">Report a Problem</a>
      <a href="${contactHref}">Contact</a>

      <div class="ww-legal-wrap">
        <a href="#" aria-label="Legal links">Legal ▸</a>

        <div class="ww-legal-submenu">
          <a href="/legal/privacy-policy.html">Privacy Policy</a>
          <a href="/legal/terms-of-use.html">Terms of Use</a>
          <a href="/legal/disclaimer.html">Disclaimer</a>
        </div>
      </div>
    </div>
  </div>

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
}
