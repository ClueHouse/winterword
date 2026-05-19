ChatGPT

Pasted text(306).txt
Document
can you look at this code pls?    is there an animated graph in there somewhere? 

Yes — there absolutely is 😊

This section is the animated graph logic:

The actual graph bars are created here:

<div class="ww-signal-graph">
  <span></span><span></span><span></span><span></span>
</div>

Then these lines animate them continuously:

const signalBars = app.querySelectorAll(".ww-signal-graph span");

const randomiseSignal = () => {
  signalBars.forEach((bar) => {
    const height = Math.floor(9 + Math.random() * 23);

And this is what makes it keep moving:

setInterval(randomiseSignal, 520);

So the graph is:

    4 vertical bars

    random heights

    refreshed every 520ms

    styled with glow + brightness animation

The CSS for how it visually looks is here:

And the box containing it is here:

they are hidden though, is that correct?

Yes. Very likely hidden underneath another layer or sitting in a dark area of the shell image.

The graph itself is definitely alive and animating. The issue is visual stacking/placement, not missing logic.

These are the likely causes:

    .ww-signal-box is behind part of the shell image

    the shell artwork itself is too dark in that corner

    the graph bars are too small/faint

    the box position is sitting over dark embedded artwork

    another overlay (.ww-left-focus or similar) is partially covering it

But the animation logic itself is correct and active.

The strongest clue:
your graph container is only:

width:56px;
height:56px;

…and the bars themselves are only:

width:5px;

So on a large monitor they can become tiny and visually disappear into the scene.

can you please change that in the code, and nothing else - i need them visible

Replace ONLY this section:

.ww-signal-box{
  position:absolute;
  z-index:95;
  top:3.2%;
  right:3.3%;
  width:56px;
  height:56px;
  border:1px solid rgba(255,197,111,.68);
  border-radius:.8rem;
  background:linear-gradient(180deg, rgba(8,13,19,.90), rgba(4,7,11,.96));
  box-shadow:
    inset 0 0 0 1px rgba(255,255,255,.055),
    inset 0 0 18px rgba(255,197,111,.055),
    0 0 18px rgba(242,178,76,.18),
    0 0 30px rgba(0,0,0,.35);
  display:flex;
  align-items:center;
  justify-content:center;
  overflow:hidden;
  pointer-events:none;
}

.ww-signal-graph{
  position:relative;
  z-index:97;
  width:34px;
  height:32px;
  display:flex;
  align-items:flex-end;
  justify-content:center;
  gap:4px;
}

.ww-signal-graph span{
  position:relative;
  z-index:98;
  display:block;
  width:5px;
  height:var(--bar-height, 12px);
  min-height:6px;
  border-radius:2px 2px 0 0;
  background:linear-gradient(180deg, rgba(255,248,225,.98), rgba(255,198,96,.94));
  box-shadow:
    0 0 8px rgba(255,224,168,.58),
    0 0 16px rgba(242,178,76,.28);
  transition:height 360ms ease, opacity 260ms ease, filter 260ms ease;
  opacity:var(--bar-opacity, .82);
  filter:brightness(var(--bar-brightness, 1));
}

WITH this:

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


i require full repacement code pls

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


Pasted text(307).txt
Document
can you see the winterword title and suheading 'resolved' in this script? 

Yes 😊

The large title:

<h1 class="ww-resolved-title">WINTERWORD</h1>

And the “Resolved” subheading:

<div class="ww-resolved-status">Resolved</div>

They appear here in the file:

Their styling is controlled by:

    .ww-resolved-title

    .ww-resolved-status


i need that, colour inverted in the script we are currently working on-  that last scruipt you sent wont load

Replace this entire section in your CURRENT working script:

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

WITH this:

.ww-title-meta{
  width:100%;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  text-align:center;
  pointer-events:none;
}

.ww-title-line{
  font-family:Georgia,"Times New Roman",serif;
  font-size:clamp(2rem,3.75vw,4.15rem);
  line-height:.94;
  font-weight:400;
  letter-spacing:.02em;
  color:#f4f1ea;
  text-align:center;
  text-shadow:
    0 2px 12px rgba(0,0,0,.72),
    0 0 24px rgba(255,255,255,.06);
}

.ww-title-sub{
  margin-top:1.1rem;
  width:22%;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:1rem;
  font-family:system-ui,-apple-system,"Segoe UI",sans-serif;
  font-size:clamp(.68rem,.92vw,.92rem);
  font-weight:800;
  letter-spacing:.34em;
  text-transform:uppercase;
  color:#f0d7a7;
  position:relative;
}

.ww-title-sub::before,
.ww-title-sub::after{
  content:"";
  height:1px;
  flex


STOP STOP STOP.  i need full replacement code.  send me the entire correct base station script.  no replacements. nothing truncated.  generate full code now

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
  left:5.2%;
  top:7.5%;
  width:32%;
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
  text-align:center;
  pointer-events:none;
}

.ww-title-main{
  width:100%;
  font-family:Georgia,"Times New Roman",serif;
  font-size:clamp(2rem,3.75vw,4.15rem);
  line-height:.94;
  font-weight:400;
  letter-spacing:.02em;
  color:#f4f1ea;
  text-align:center;
  text-shadow:
    0 2px 12px rgba(0,0,0,.72),
    0 0 24px rgba(255,255,255,.06);
}

.ww-title-status{
  margin-top:1.2rem;
  width:68%;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:1rem;
  font-family:system-ui,-apple-system,"Segoe UI",sans-serif;
  font-size:clamp(.68rem,.92vw,.92rem);
  font-weight:800;
  letter-spacing:.34em;
  text-transform:uppercase;
  color:#f0d7a7;
}

.ww-title-status::before,
.ww-title-status::after{
  content:"";
  height:1px;
  flex:1;
  background:#f0d7a7;
  opacity:.9;
  box-shadow:0 0 8px rgba(255,190,95,.18);
}

.ww-title-org{
  margin-top:.9rem;
  max-width:88%;
  font-family:system-ui,-apple-system,"Segoe UI",sans-serif;
  font-size:clamp(10px,.7vw,14px);
  line-height:1.35;
  letter-spacing:.22em;
  text-transform:uppercase;
  color:rgba(255,255,255,.82);
  font-weight:800;
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

/* MENU */

.ww-menu{
  position:absolute;
  z-index:80;
  top:calc(3.2% + 84px);
  right:3.3%;
  width:56px;
  height:56px;
}

.ww-menu-hotspot{
  width:56px;
  height:56px;
  position:absolute;
  top:0;
  right:0;
  border:1px solid rgba(255,197,111,.56);
  border-radius:.8rem;
  background:rgba(5,9,13,.42);
  cursor:pointer;
  z-index:82;
  box-shadow:inset 0 0 0 1px rgba(255,255,255,.035), 0 0 18px rgba(242,178,76,.14);
}

.ww-menu-hotspot span,
.ww-menu-hotspot::before,
.ww-menu-hotspot::after{
  content:"";
  position:absolute;
  left:50%;
  width:27px;
  height:2px;
  border-radius:999px;
  background:rgba(255,220,159,.96);
  transform:translateX(-50%);
  box-shadow:0 0 8px rgba(242,178,76,.28);
}

.ww-menu-hotspot::before{ top:18px; }
.ww-menu-hotspot span{ top:27px; }
.ww-menu-hotspot::after{ top:36px; }

.ww-menu-hotspot:hover,
.ww-menu-hotspot:focus-visible{
  transform:scale(1.06);
  background:rgba(255,197,111,.08);
  outline:none;
}

.ww-menu-dropdown,
.ww-legal-submenu{
  position:absolute;
  min-width:220px;
  padding:.55rem;
  border:1px solid rgba(224,155,32,.46);
  border-radius:.85rem;
  background:rgba(3,8,13,.94);
  box-shadow:0 22px 54px rgba(0,0,0,.62);
  opacity:0;
  pointer-events:none;
  transition:opacity 150ms ease, transform 150ms ease;
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

.ww-legal-wrap{ position:relative; }

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

/* LINKED TOOLTIPS */

.ww-tooltip{
  position:absolute;
  z-index:100;
  left:29.5%;
  width:18%;
  min-width:190px;
  padding:.82rem .92rem;
  border:1px solid rgba(230,230,230,.92);
  border-radius:.75rem;
  background:rgba(255,255,255,.96);
  color:rgba(0,0,0,.88);
  font-size:clamp(9px,.72vw,13px);
  line-height:1.42;
  box-shadow:0 16px 44px rgba(0,0,0,.38);
  opacity:0;
  pointer-events:none;
  transform:translateY(-50%) translateX(-6px);
  transition:opacity 150ms ease, transform 150ms ease;
}

.ww-tooltip.is-visible{
  opacity:1;
  transform:translateY(-50%) translateX(0);
}

.ww-tooltip--locked{
  background:linear-gradient(180deg, rgba(158,38,45,.96), rgba(104,18,25,.98));
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

.ww-clue-tooltip{ top:33.3%; }
.ww-life-tooltip{ top:43%; }
.ww-leader-tooltip{ top:52.7%; }
.ww-solve-tooltip{ top:66.8%; }

</style>

<div id="wwPortal">
  <div id="wwStage">

    <img class="ww-shell" src="/assets/winterword/shared/BS1.png" alt="WinterWord Base Station" draggable="false">

    <div class="ww-logo-softener"></div>
    <div class="ww-left-focus"></div>

    <div class="ww-left-panel">
      <div class="ww-title-meta">
        <div class="ww-title-main">WINTERWORD</div>
        <div class="ww-title-status">Base Station</div>
        <div class="ww-title-org">${safeText(seasonLabel)} ✧ ${safeText(orgName)}</div>
        <div class="ww-title-sub">
          A letter per week from a wintry scroll.<br>
          Piece them together — reveal the whole.
        </div>
      </div>

      <div class="ww-rule"></div>

      <nav class="ww-word-nav">
        <button class="ww-word-link" type="button" data-nav="clues" data-tooltip="clue">CLUE</button>

        <button class="ww-word-link" type="button" data-nav="lifeline" data-tooltip="life" data-disabled="${lifelineAvailable ? "false" : "true"}">LIFE</button>

        <button class="ww-word-link" type="button" data-nav="leaderboard" data-tooltip="leader" data-disabled="${leaderboardAvailable ? "false" : "true"}">LEAD</button>

        <div class="ww-rule"></div>

        <a class="ww-word-link ww-word-solve" href="${solveHref}" data-tooltip="solve">SOLVE</a>

        <div class="ww-rule"></div>

        <div class="ww-guidepost">
          <div class="ww-guidepost-title">The Guidepost</div>
        </div>
      </nav>
    </div>

    <div class="ww-signal-box" aria-hidden="true">
      <div class="ww-signal-graph">
        <span></span><span></span><span></span><span></span>
      </div>
    </div>

    <div class="ww-tooltip ww-clue-tooltip" data-tooltip-card="clue">
      <span class="ww-tooltip-title">Clues</span>
      Each clue reveals another piece.
    </div>

    <div class="ww-tooltip ww-life-tooltip ${lifelineAvailable ? "" : "ww-tooltip--locked"}" data-tooltip-card="life">
      <span class="ww-tooltip-title">Lifeline</span>
      ${lifelineAvailable ? "This passage is open." : "This passage waits its moment."}
    </div>

    <div class="ww-tooltip ww-leader-tooltip ${leaderboardAvailable ? "" : "ww-tooltip--locked"}" data-tooltip-card="leader">
      <span class="ww-tooltip-title">Leaderboard</span>
      ${leaderboardAvailable ? "The board remembers all." : "No answers received yet."}
    </div>

    <div class="ww-tooltip ww-solve-tooltip" data-tooltip-card="solve">
      <span class="ww-tooltip-title">Solve</span>
      Submit the WinterWord when the answer is clear.
    </div>

    <div class="ww-menu">
      <button class="ww-menu-hotspot" type="button" aria-label="Open menu">
        <span></span>
      </button>

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

  const tooltipTriggers = app.querySelectorAll("[data-tooltip]");
  const tooltipCards = app.querySelectorAll("[data-tooltip-card]");

  const hideTooltips = () => {
    tooltipCards.forEach((card) => card.classList.remove("is-visible"));
  };

  tooltipTriggers.forEach((trigger) => {
    const key = trigger.getAttribute("data-tooltip");
    const card = app.querySelector(`[data-tooltip-card="${key}"]`);

    trigger.addEventListener("mouseenter", () => {
      hideTooltips();
      if (card) card.classList.add("is-visible");
    });

    trigger.addEventListener("focus", () => {
      hideTooltips();
      if (card) card.classList.add("is-visible");
    });

    trigger.addEventListener("mouseleave", hideTooltips);
    trigger.addEventListener("blur", hideTooltips);
  });

  const menu = app.querySelector(".ww-menu");
  const menuHotspot = app.querySelector(".ww-menu-hotspot");

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

  const signalBars = app.querySelectorAll(".ww-signal-graph span");

  const randomiseSignal = () => {
    signalBars.forEach((bar) => {
      const height = Math.floor(13 + Math.random() * 30);
      const opacity = (0.86 + Math.random() * 0.14).toFixed(2);
      const brightness = (1.22 + Math.random() * 0.45).toFixed(2);

      bar.style.setProperty("--bar-height", `${height}px`);
      bar.style.setProperty("--bar-opacity", opacity);
      bar.style.setProperty("--bar-brightness", brightness);
    });
  };

  randomiseSignal();
  setInterval(randomiseSignal, 520);

  const stage = app.querySelector("#wwStage");

  if (stage) {
    stage.addEventListener("pointermove", (event) => {
      const rect = stage.getBoundingClientRect();

      const x = ((event.clientX - rect.left) / rect.width - .5) * 10;
      const y = ((event.clientY - rect.top) / rect.height - .5) * 10;

      stage.style.setProperty("--ww-drift-x", `${x}px`);
      stage.style.setProperty("--ww-drift-y", `${y}px`);
    });

    stage.addEventListener("pointerleave", () => {
      stage.style.setProperty("--ww-drift-x", "0px");
      stage.style.setProperty("--ww-drift-y", "0px");
    });
  }

}


export function renderBaseStationResolved(app, data = {}, navigate) {
const {
orgName = "",
seasonLabel = "WINTERWORD • 2026",
resolvedText = "The trail is quiet now: nothing more will fall. Everything you need is already in your hands. You can continue solving, or discover the answers now.\n\nIf you’ve made it here, you already know: the ending was never just a word.\nThis winter hit differently — the warmth was real. Clues fell, one by one, and every single one led you here.\nThe final word is ready. Reveal it when you are.",
finalLead = "Game over? No.",
finalEmphasis = "Game complete."
} = data;

function esc(value) {
return String(value ?? "")
.replaceAll("&", "&")
.replaceAll("<", "<")
.replaceAll(">", ">")
.replaceAll('"', """)
.replaceAll("'", "'");
}

const safeOrgName = String(orgName || "").trim();

const seasonParts = String(seasonLabel || "")
.split("•")
.map((part) => part.trim())
.filter(Boolean);

const leftLabel = seasonParts[0] || "WINTERWORD";
const yearLabel = seasonParts[1] || "2026";
const idLine = ${leftLabel} • ${yearLabel} ✧ ${safeOrgName || "BAY OF PLENTY REGIONAL COUNCIL"};

const resolvedParagraphs = String(resolvedText || "")
.split(/\n\s*\n/)
.map((para) => <p>${esc(para)}</p>)
.join("");

app.innerHTML = `

const answersButton = app.querySelector("#wwAnswersButton");
const leaderboardButton = app.querySelector("#wwLeaderboardButton");

if (answersButton) {
answersButton.addEventListener("click", () => {
navigate("answers");
});
}

if (leaderboardButton) {
leaderboardButton.addEventListener("click", () => {
navigate("leaderboard");
});
}
}
