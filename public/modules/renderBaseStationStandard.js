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

*{ box-sizing:border-box; }

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
  --ww-drift-x:0px;
  --ww-drift-y:0px;
}

.ww-shell{
  position:absolute;
  inset:0;
  width:100%;
  height:100%;
  object-fit:contain;
  user-select:none;
  pointer-events:none;
  transform:translate(calc(var(--ww-drift-x) * .18), calc(var(--ww-drift-y) * .18)) scale(1.003);
  transition:transform 180ms ease-out;
}

.ww-logo-softener{
  position:absolute;
  z-index:12;
  left:34.4%;
  top:20.5%;
  width:18.5%;
  height:43%;
  pointer-events:none;
  background:radial-gradient(ellipse at center, rgba(2,6,9,.16), rgba(2,6,9,.10) 38%, rgba(2,6,9,0) 72%);
  mix-blend-mode:multiply;
}

.ww-left-focus{
  position:absolute;
  z-index:13;
  left:3.8%;
  top:0;
  width:30.8%;
  height:100%;
  pointer-events:none;
  background:linear-gradient(90deg, rgba(2,6,9,.22), rgba(2,6,9,.08) 58%, rgba(2,6,9,0));
}

.ww-left-panel{
  position:absolute;
  z-index:24;
  left:6.6%;
  top:3.1%;
  width:24.4%;
  height:74%;
  display:flex;
  flex-direction:column;
  align-items:center;
  pointer-events:none;
  transform:translate(calc(var(--ww-drift-x) * -.12), calc(var(--ww-drift-y) * -.12));
  transition:transform 180ms ease-out;
}

.ww-title-meta{
  width:100%;
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
  letter-spacing:.32em;
  text-transform:uppercase;
  color:rgba(255,255,255,.96);
  font-weight:900;
  white-space:nowrap;
  text-shadow:0 2px 8px rgba(0,0,0,.82), 0 0 12px rgba(255,255,255,.08);
}

.ww-title-sub{
  margin-top:1rem;
  max-width:88%;
  font-family:Georgia,serif;
  font-size:clamp(13px,.88vw,17px);
  line-height:1.48;
  font-style:italic;
  font-weight:500;
  letter-spacing:.012em;
  color:rgba(255,218,166,.88);
  text-shadow:0 2px 10px rgba(0,0,0,.9), 0 0 16px rgba(255,181,75,.08);
}

.ww-rule{
  width:88%;
  height:1px;
  margin:2.25vh 0 1.55vh;
  background:linear-gradient(90deg, transparent, rgba(255,190,95,.16), rgba(255,218,154,.42), rgba(255,190,95,.16), transparent);
  position:relative;
}

.ww-rule::after{
  content:"";
  position:absolute;
  left:50%;
  top:50%;
  width:7px;
  height:7px;
  border:1px solid rgba(255,198,107,.54);
  transform:translate(-50%,-50%) rotate(45deg);
  background:rgba(5,9,13,.92);
  box-shadow:0 0 10px rgba(255,180,75,.14);
}

.ww-word-nav{
  width:100%;
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:1.45vh;
  pointer-events:auto;
}

.ww-word-nav > .ww-rule{
  margin:1.55vh 0 1.55vh;
}

.ww-word-link{
  appearance:none;
  position:relative;
  display:flex;
  align-items:center;
  justify-content:center;
  width:13.6rem;
  min-height:2.15rem;
  padding:0;
  margin:0;
  border:0;
  background:transparent;
  cursor:pointer;
  text-decoration:none;
  font-family:"Courier New",monospace;
  font-size:clamp(25px,1.78vw,35px);
  font-weight:700;
  line-height:1;
  letter-spacing:.34em;
  text-transform:uppercase;
  color:rgba(250,250,247,.95);
  text-shadow:0 2px 10px rgba(0,0,0,.88), 0 0 10px rgba(255,255,255,.035);
  transition:transform 170ms ease,color 170ms ease,text-shadow 170ms ease,filter 170ms ease;
}

.ww-word-link:hover,
.ww-word-link:focus-visible{
  transform:translateY(-2px);
  color:#fff;
  filter:brightness(1.06);
  outline:none;
}

.ww-word-link::after{
  content:"";
  position:absolute;
  left:.55rem;
  top:50%;
  width:7px;
  height:7px;
  border:1px solid rgba(255,199,112,.58);
  transform:translateY(-50%) rotate(45deg);
  background:rgba(5,9,13,.7);
  box-shadow:0 0 9px rgba(255,181,75,.13);
  opacity:.78;
}

.ww-word-link:hover::after,
.ww-word-link:focus-visible::after{
  opacity:1;
  transform:translateY(-50%) rotate(45deg) scale(1.2);
  border-color:rgba(255,218,154,.86);
  box-shadow:0 0 11px rgba(255,181,75,.34), 0 0 22px rgba(255,181,75,.12);
}

.ww-word-link[data-disabled="true"]:hover,
.ww-word-link[data-disabled="true"]:focus-visible{
  color:rgba(255,210,195,.95);
}

.ww-word-solve{
  width:12.6rem;
  padding:.74rem 1.05rem .74rem 1.28rem;
  border:1px solid rgba(255,197,111,.44);
  border-radius:.78rem;
  background:linear-gradient(180deg, rgba(255,197,111,.105), rgba(255,197,111,.035));
  box-shadow:inset 0 0 0 1px rgba(255,255,255,.035), 0 0 18px rgba(255,185,80,.055);
  font-size:clamp(24px,1.72vw,36px);
  letter-spacing:.34em;
  color:#ffc56f;
}

.ww-guidepost{
  width:100%;
  display:flex;
  align-items:center;
  justify-content:center;
  text-align:center;
}

.ww-guidepost-title{
  width:88%;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:1.1rem;
  font-size:clamp(13px,.82vw,17px);
  letter-spacing:.26em;
  text-transform:uppercase;
  font-weight:900;
  color:rgba(255,232,188,.9);
}

.ww-guidepost-title::before,
.ww-guidepost-title::after{
  content:"";
  height:2px;
  flex:1;
  background:linear-gradient(90deg, transparent, rgba(255,206,140,.62));
  box-shadow:0 0 8px rgba(255,190,95,.18);
}

.ww-guidepost-title::after{
  background:linear-gradient(90deg, rgba(255,206,140,.62), transparent);
}

/* SIGNAL BOX */

.ww-signal-box{
  position:absolute;
  z-index:120;
  top:3.2%;
  right:3.3%;
  width:72px;
  height:72px;
  border:1px solid rgba(255,197,111,.78);
  border-radius:.9rem;
  background:rgba(3,7,11,.96);
  box-shadow:
    inset 0 0 0 1px rgba(255,255,255,.08),
    inset 0 0 24px rgba(255,197,111,.08),
    0 0 24px rgba(242,178,76,.24),
    0 0 40px rgba(0,0,0,.45);
  display:flex;
  align-items:center;
  justify-content:center;
  overflow:hidden;
  pointer-events:none;
}

.ww-signal-graph{
  position:relative;
  z-index:121;
  width:48px;
  height:44px;
  display:flex;
  align-items:flex-end;
  justify-content:center;
  gap:6px;
}

.ww-signal-graph span{
  position:relative;
  z-index:122;
  display:block;
  width:7px;
  height:var(--bar-height, 18px);
  min-height:10px;
  border-radius:3px 3px 0 0;
  background:linear-gradient(180deg, rgba(255,255,255,1), rgba(255,198,96,1));
  box-shadow:
    0 0 12px rgba(255,240,200,.85),
    0 0 22px rgba(242,178,76,.52),
    0 0 40px rgba(242,178,76,.22);
  transition:height 360ms ease, opacity 260ms ease, filter 260ms ease;
  opacity:1;
  filter:brightness(1.35);
}

</style>
`;
}
