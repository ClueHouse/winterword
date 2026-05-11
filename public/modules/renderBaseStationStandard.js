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
    hasLeaderboardEntries = false,
    popClueLive = false
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

.ww-stage-signal{
  position:absolute;
  z-index:24;
  right:12.2%;
  top:13.2%;
  display:flex;
  align-items:center;
  gap:0.72rem;
  padding:0.48rem 0.62rem 0.48rem 0.7rem;
  border:1px solid rgba(224,155,32,0.58);
  border-radius:0.82rem;
  background:rgba(4,9,14,0.62);
  box-shadow:
    0 14px 34px rgba(0,0,0,0.36),
    inset 0 0 14px rgba(224,155,32,0.055);
  backdrop-filter:blur(7px);
  pointer-events:none;
}

.ww-stage-signal-label{
  font-size:clamp(8px,0.64vw,12px);
  letter-spacing:0.26em;
  text-transform:uppercase;
  color:rgba(255,244,224,0.68);
  font-weight:900;
}

.ww-signal-bar{
  display:flex;
  align-items:flex-end;
  gap:4px;
  height:2.05rem;
}

.ww-signal-bar span{
  display:block;
  width:7px;
  height:30%;
  background:rgba(214,221,230,0.22);
  border-radius:4px;
  animation:wwSignal 6s infinite;
}

.ww-signal-bar span:nth-child(2){animation-duration:5.4s;}
.ww-signal-bar span:nth-child(3){animation-duration:6.8s;}
.ww-signal-bar span:nth-child(4){animation-duration:5.9s;}
.ww-signal-bar span:nth-child(5){animation-duration:7.2s;}

@keyframes wwSignal{
  0%{height:28%; background:rgba(214,221,230,0.18);}
  45%{height:100%; background:rgba(214,221,230,0.52);}
  100%{height:34%; background:rgba(214,221,230,0.20);}
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

.ww-hotspot[data-disabled="true"] + .ww-icon{
  opacity:1;
  filter:
    brightness(1)
    saturate(1.04)
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

.ww-pop-hotspot{
  left:3.1%;
  top:55.1%;
  width:7.8%;
  height:10.8%;
}

.ww-pop-icon{
  left:6.9%;
  top:60.4%;
  width:6.2%;
  animation:wwPopPulse 1.45s ease-in-out infinite;
}

@keyframes wwPopPulse{
  0%,100%{
    filter:
      drop-shadow(0 0 6px rgba(240,138,36,0.38))
      drop-shadow(0 0 12px rgba(240,138,36,0.18));
    transform:translate(-50%,-50%) scale(1);
  }
  50%{
    filter:
      drop-shadow(0 0 13px rgba(240,138,36,0.82))
      drop-shadow(0 0 28px rgba(240,138,36,0.36));
    transform:translate(-50%,calc(-50% - 2px)) scale(1.045);
  }
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
  transition:opacity 160ms ease, box-shadow 160ms ease;
}

.ww-subscribe-hotspot:hover::after,
.ww-subscribe-hotspot:focus-visible::after{
  opacity:1;
  animation:wwSubscribeGlow 1.2s ease-in-out infinite;
  box-shadow:
    0 0 18px rgba(242,178,76,0.28),
    0 0 34px rgba(242,178,76,0.18);
}

@keyframes wwSubscribeGlow{
  0%{ background-position:180% 0; }
  100%{ background-position:-80% 0; }
}

.ww-subscribe-tooltip{
  position:absolute;
  z-index:62;
  left:13%;
  bottom:8.4%;
  width:17%;
  min-width:190px;
  padding:0.85rem 0.92rem;
  border:1px solid rgba(224,155,32,0.24);
  border-radius:0.8rem;
  background:#ffffff;
  color:#101010;
  font-size:clamp(9px,0.74vw,13px);
  line-height:1.42;
  box-shadow:0 16px 44px rgba(0,0,0,0.58);
  opacity:0;
  pointer-events:none;
  transform:translateX(-6px);
  transition:opacity 150ms ease, transform 150ms ease;
}

.ww-subscribe-note{
  display:block;
  margin-top:0.55rem;
  padding-top:0.5rem;
  border-top:1px solid rgba(0,0,0,0.14);
  color:rgba(0,0,0,0.62);
  font-style:italic;
}

.ww-subscribe-hotspot:hover ~ .ww-subscribe-tooltip,
.ww-subscribe-hotspot:focus-visible ~ .ww-subscribe-tooltip{
  opacity:1;
  transform:translateX(0);
}

.ww-solve-hotspot{
  left:61.8%;
  top:61.8%;
  width:25.4%;
  height:9.2%;
  border-radius:0.75rem;
}

.ww-solve-gleam{
  position:absolute;
  z-index:16;
  left:61.8%;
  top:60.55%;
  width:25.4%;
  height:10.45%;
  pointer-events:none;
  border-radius:0.75rem;
  overflow:hidden;
  opacity:0;
  transition:opacity 180ms ease;
}

.ww-solve-gleam::before{
  content:"";
  position:absolute;
  top:-118%;
  left:-40%;
  width:24%;
  height:350%;
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
  filter:blur(1px);
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

.ww-solve-tooltip{
  position:absolute;
  z-index:62;
  left:75%;
  top:56.5%;
  padding:0.55rem 0.75rem;
  border:1px solid rgba(224,155,32,0.24);
  border-radius:0.68rem;
  background:#ffffff;
  color:#101010;
  font-size:clamp(9px,0.74vw,13px);
  font-weight:850;
  letter-spacing:0.12em;
  text-transform:uppercase;
  box-shadow:0 14px 36px rgba(0,0,0,0.5);
  opacity:0;
  pointer-events:none;
  transform:translateY(6px);
  transition:opacity 150ms ease, transform 150ms ease;
}

.ww-solve-hotspot:hover ~ .ww-solve-tooltip,
.ww-solve-hotspot:focus-visible ~ .ww-solve-tooltip{
  opacity:1;
  transform:translateY(0);
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
  font-size:clamp(9px,0.82vw,15px);
  line-height:1.42;
  letter-spacing:0.28em;
  text-transform:uppercase;
  font-style:italic;
  font-weight:400;
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
  cursor:pointer;
  box-shadow:
    0 10px 26px rgba(0,0,0,0.36),
    inset 0 0 12px rgba(224,155,32,0.08);
  display:flex;
  align-items:center;
  justify-content:center;
  padding:0;
}

.ww-menu-lines{
  display:flex;
  flex-direction:column;
  gap:5px;
  width:22px;
}

.ww-menu-lines span{
  display:block;
  height:2px;
  width:100%;
  border-radius:999px;
  background:rgba(255,239,206,0.92);
  box-shadow:0 0 10px rgba(242,178,76,0.24);
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
