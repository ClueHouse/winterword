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
  flex-direction:column;
  align-items:center;
  justify-content:center;
  padding:2vh 2.5vw;
  position:relative;
}

.ww-title-meta{
  position:relative;
  z-index:30;
  width:100%;
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
  margin-bottom:1.6vh;
  white-space:nowrap;
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

/* HOTSPOTS REALIGNED TO ICONS */
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

.ww-subscribe-hotspot{
  left:2.45%;
  bottom:8%;
  width:9.1%;
  height:6%;
  border-radius:0.7rem;
}

.ww-solve-hotspot{
  left:61.8%;
  top:61.8%;
  width:25.4%;
  height:9.2%;
  border-radius:0.75rem;
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
  border-color:rgba(255,255,255,0.32);
  background:linear-gradient(180deg, rgba(158,38,45,0.96), rgba(104,18,25,0.98));
  color:#ffffff;
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
  font-size:clamp(10px,0.88vw,16px);
  line-height:1.42;
  letter-spacing:0.28em;
  text-transform:uppercase;
  font-style:italic;
  font-weight:400;
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
</style>

<div id="wwPortal">

  <div class="ww-title-meta">
    ${safeText(seasonLabel)} &nbsp;✦&nbsp; ${safeText(orgName)}
  </div>

  <div id="wwStage" aria-label="WinterWord Base Station">

    <img
      class="ww-shell"
      src="/assets/winterword/shared/BS1.png"
      alt="WinterWord Base Station"
      draggable="false"
    >

    <div class="ww-morse-pulse" aria-hidden="true">
      <i></i><i></i><b></b><i></i><b></b>
    </div>

    <button class="ww-hotspot ww-clue-hotspot" type="button" data-nav="clues"></button>
    <img class="ww-icon ww-clue-icon" src="/assets/winterword/shared/icon_clue.png" alt="" draggable="false">

    <button
      class="ww-hotspot ww-life-hotspot"
      type="button"
      data-nav="lifeline"
      data-disabled="${lifelineAvailable ? "false" : "true"}"
    ></button>
    <img class="ww-icon ww-life-icon" src="/assets/winterword/shared/icon_life.png" alt="" draggable="false">

    <button
      class="ww-hotspot ww-leader-hotspot"
      type="button"
      data-nav="leaderboard"
      data-disabled="${leaderboardAvailable ? "false" : "true"}"
    ></button>
    <img class="ww-icon ww-leader-icon" src="/assets/winterword/shared/icon_leader.png" alt="" draggable="false">

    <a class="ww-hotspot ww-subscribe-hotspot" href="${subscribeHref}"></a>
    <a class="ww-hotspot ww-solve-hotspot" href="${solveHref}"></a>

    <div class="ww-updates-overlay">
      ${
        updatesText && String(updatesText).trim()
          ? `<p class="ww-update-text">${safeText(updatesText)}</p>`
          : `<p class="ww-update-text">No new updates yet.</p>`
      }
    </div>

    <div class="ww-tooltip ww-clue-tooltip">
      <span class="ww-tooltip-title">Clues</span>
      Each clue reveals just enough to move you forward.
    </div>

    <div class="ww-tooltip ww-life-tooltip ${lifelineAvailable ? "" : "ww-tooltip--locked"}">
      <span class="ww-tooltip-title">Lifeline</span>
      ${
        lifelineAvailable
          ? `This passage is open.`
          : `This passage waits its moment.`
      }
    </div>

    <div class="ww-tooltip ww-leader-tooltip ${leaderboardAvailable ? "" : "ww-tooltip--locked"}">
      <span class="ww-tooltip-title">Leaderboard</span>
      ${
        leaderboardAvailable
          ? `The Leaderboard remembers all who enter.`
          : `No answers received yet.`
      }
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
