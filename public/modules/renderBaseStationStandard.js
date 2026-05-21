export function renderBaseStationStandard(app, data = {}, navigate) {
  const {
    orgName = "WinterWord",
    seasonLabel = "WINTERWORD",
    guidepost = "",
    guidepostText = "",
    updates_content = "",
    updatesText = "",
    updatesContent = "",
    lifelineAvailable = false,
    hasLeaderboardEntries = false,
    pop1 = false,
    pop2 = false,
    popClueLive = false
  } = data;

const leaderboardAvailable =
  hasLeaderboardEntries === true ||
  hasLeaderboardEntries === "true" ||
  hasLeaderboardEntries === 1 ||
  hasLeaderboardEntries === "1";

  const pop1Live =
    pop1 === true ||
    pop1 === "true";

  const pop2Live =
    pop2 === true ||
    pop2 === "true";

  const activePop =
    pop1Live
      ? {
          key: "pop1",
          number: "1",
          image: "/assets/winterword/shared/pop1.png",
          subject: "BLACK ICE DETECTED"
        }
      : pop2Live
        ? {
            key: "pop2",
            number: "2",
            image: "/assets/winterword/shared/pop2.png",
            subject: "BLACK ICE DETECTED (2)"
          }
        : null;

  const popLive =
    popClueLive === true ||
    popClueLive === "true" ||
    Boolean(activePop);

  const safeText = (value, fallback = "") =>
    String(value ?? fallback)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");

  const rawGuidepost =
    guidepost ||
    guidepostText ||
    updates_content ||
    updatesText ||
    updatesContent ||
    "";

  const guidepostLines = safeText(rawGuidepost)
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => `<span>${line}</span>`)
    .join("");

  const mailSafeOrgName =
    orgName && String(orgName).trim()
      ? String(orgName).trim()
      : "WinterWord";

  const encodedOrgName = encodeURIComponent(mailSafeOrgName);

  const reportProblemBody = encodeURIComponent(
`SET THE SCENE:
Which page were you on?

PLOT TWIST:
What went wrong?

ALTERNATE ENDING:
What did you expect to happen?

YOUR TRAVELLER’S GEAR:
Which device + browser you brought on this journey.

Thanks for sharing — we’ll follow the trail and set things right.`
  );

  const subscribeBody = encodeURIComponent(
`Sign me up.

The winter hush is starting to feel personal.

Statistically, this probably ends with me squinting at maps at midnight.

I understand that I’ll only receive signals relevant to this journey.
If I ever feel that my inbox is snowed under, I can use this email to unsub at any time.

Somewhere, a clue just noticed me looking back.`
  );

  const popSubmitBody = encodeURIComponent(
`The ice arrived without warning.
Others have also noticed.
Can you answer first?

I believe the solution is:`
  );

  const reportProblemHref =
    `mailto:fix@cluehouse.co.nz?subject=WinterWord%20Issue%20-%20${encodedOrgName}&body=${reportProblemBody}`;

  const subscribeHref =
    `mailto:opt@cluehouse.co.nz?subject=WinterWord%20Subscribe%20-%20${encodedOrgName}&body=${subscribeBody}`;

  const solveBody = encodeURIComponent(
`I have chased this word all winter.

The path ends here.

The WinterWord is:`
  );

  const solveHref =
    `mailto:key@cluehouse.co.nz?subject=FINAL%20WinterWord%20Submission%20-%20${encodedOrgName}%20-%202026&body=${solveBody}`;

  const popSubmitHref =
    `mailto:ice@cluehouse.co.nz?subject=${encodeURIComponent(`${activePop?.subject || "BLACK ICE DETECTED"} — ${mailSafeOrgName}`)}&body=${popSubmitBody}`;

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
}

.ww-base-layer{
  position:absolute;
  inset:0;
  width:100%;
  height:100%;
  transition:
    filter .32s ease,
    transform .32s ease,
    opacity .32s ease;
}

#wwPortal.ww-pop-alert-active .ww-base-layer{
  filter:blur(7px) brightness(.62);
  transform:scale(1.012);
}

.ww-shell{
  position:absolute;
  inset:0;
  width:100%;
  height:100%;
  object-fit:cover;
  object-position:center center;
  user-select:none;
  pointer-events:none;
}

.ww-title-meta{
  position:absolute;
  z-index:24;
  left:0;
  top:4.4%;
  width:39.3%;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  text-align:center;
  pointer-events:none;
}

.ww-title-org{
  max-width:100%;
  margin-bottom:2.3rem;
  font-size:clamp(9px,.64vw,13px);
  line-height:1.35;
  letter-spacing:.22em;
  text-transform:uppercase;
  color:rgba(255,255,255,.82);
  font-weight:800;
  text-shadow:0 2px 8px rgba(0,0,0,.82);
}

.ww-title-main{
  width:100%;
  font-family:Georgia,"Times New Roman",serif;
  font-size:clamp(1.84rem,3.45vw,3.82rem);
  line-height:.94;
  font-weight:400;
  letter-spacing:.02em;
  color:#f4f1ea;
  text-align:center;
  text-shadow:0 2px 12px rgba(0,0,0,.72);
}

.ww-title-status{
  margin-top:1.1rem;
  width:68%;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:1rem;
  font-size:clamp(.62rem,.84vw,.84rem);
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
  position:relative;
  overflow:hidden;

  background:
    linear-gradient(
      90deg,
      rgba(240,215,167,.14),
      rgba(240,215,167,.58),
      rgba(240,215,167,.14)
    ),
    linear-gradient(
      90deg,
      transparent,
      rgba(255,255,255,.92),
      transparent
    );

  background-size:
    100% 100%,
    34% 100%;

  background-repeat:no-repeat;

  box-shadow:
    0 0 8px rgba(255,190,95,.18);
}

.ww-title-status::before{
  background-position:
    center,
    -60% 0;

  animation:wwStatusSweepLeft 4.6s ease-in-out infinite;
}

.ww-title-status::after{
  background-position:
    center,
    160% 0;

  animation:wwStatusSweepRight 4.6s ease-in-out infinite;
}

@keyframes wwStatusSweepLeft{

  0%,18%{
    background-position:
      center,
      -60% 0;
  }

  58%,100%{
    background-position:
      center,
      160% 0;
  }

}

@keyframes wwStatusSweepRight{

  0%,18%{
    background-position:
      center,
      160% 0;
  }

  58%,100%{
    background-position:
      center,
      -60% 0;
  }

}

.ww-title-sub{
  margin-top:1rem;
  max-width:88%;
  font-family:Georgia,serif;
  font-size:clamp(11px,.78vw,15px);
  line-height:1.5;
  font-style:italic;
  color:rgba(255,218,166,.88);
  text-shadow:0 2px 10px rgba(0,0,0,.9);
}

.ww-menu{
  position:absolute;
  z-index:80;
  top:3.2%;
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
  box-shadow:
    inset 0 0 0 1px rgba(255,255,255,.035),
    0 0 18px rgba(242,178,76,.14);
  transition:
    transform .16s ease,
    background .16s ease,
    box-shadow .16s ease,
    border-color .16s ease;
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
  border-color:rgba(255,213,143,.78);
  box-shadow:
    inset 0 0 0 1px rgba(255,255,255,.05),
    0 0 22px rgba(242,178,76,.18);
  outline:none;
}

.ww-menu-dropdown,
.ww-house-submenu{
  position:absolute;
  min-width:240px;
  padding:.55rem;
  border:1px solid rgba(224,155,32,.46);
  border-radius:.95rem;
  background:rgba(3,8,13,.95);
  box-shadow:0 22px 54px rgba(0,0,0,.62);
  opacity:0;
  pointer-events:none;
  transition:
    opacity 160ms ease,
    transform 160ms ease;
}

.ww-menu-dropdown{
  top:calc(100% + .8rem);
  right:0;
  transform:translateY(-8px);
}

.ww-menu.is-open .ww-menu-dropdown{
  opacity:1;
  pointer-events:auto;
  transform:translateY(0);
}

.ww-menu-title{
  padding:.78rem .95rem .92rem;
  margin-bottom:.28rem;
  font-family:Georgia,"Times New Roman",serif;
  font-size:.92rem;
  font-weight:600;
  letter-spacing:.22em;
  text-transform:uppercase;
  color:#f0d7a7;
  text-align:center;
  border-bottom:1px solid rgba(255,197,111,.14);
  text-shadow:
    0 2px 8px rgba(0,0,0,.62),
    0 0 12px rgba(255,190,95,.08);
}

.ww-house-wrap{
  position:relative;
}

.ww-house-submenu{
  top:0;
  right:calc(100% + .55rem);
  transform:translateX(6px);
  background:rgba(247,243,235,.98);
  border:1px solid rgba(190,168,126,.42);
}

.ww-house-wrap:hover .ww-house-submenu,
.ww-house-wrap:focus-within .ww-house-submenu{
  opacity:1;
  pointer-events:auto;
  transform:translateX(0);
}

.ww-menu-dropdown a,
.ww-house-submenu a{
  display:block;
  padding:.78rem .9rem;
  border-radius:.6rem;
  color:rgba(255,244,224,.92);
  text-decoration:none;
  font-size:.78rem;
  font-weight:850;
  letter-spacing:.12em;
  text-transform:uppercase;
  transition:
    background .14s ease,
    color .14s ease,
    transform .14s ease;
}

.ww-house-submenu a{
  color:#2a241d;
}

.ww-menu-dropdown a:hover,
.ww-menu-dropdown a:focus-visible{
  background:rgba(224,155,32,.15);
  color:#f2b24c;
  transform:translateX(2px);
  outline:none;
}

.ww-house-submenu a:hover,
.ww-house-submenu a:focus-visible{
  background:rgba(214,184,132,.18);
  color:#8d5d19;
  transform:translateX(2px);
  outline:none;
}

.ww-avalanche{
  position:relative;
}

.ww-avalanche-tooltip{
  position:absolute;
  right:105%;
  top:50%;
  transform:translateY(-50%);
  white-space:nowrap;
  padding:.55rem .75rem;
  border:1px solid rgba(255,255,255,.92);
  border-radius:.7rem;
  background:rgba(255,255,255,.97);
  color:#111;
  font-size:.72rem;
  font-weight:700;
  letter-spacing:.06em;
  box-shadow:0 14px 36px rgba(0,0,0,.38);
  opacity:0;
  pointer-events:none;
  transition:
    opacity .14s ease,
    transform .14s ease;
}

.ww-avalanche:hover .ww-avalanche-tooltip,
.ww-avalanche:focus-within .ww-avalanche-tooltip{
  opacity:1;
  transform:translateY(-50%) translateX(-2px);
}

.ww-left-panel{
  position:absolute;
  z-index:24;
  left:0;
  top:29.2%;
  width:39.3%;
  height:50%;
  display:flex;
  flex-direction:column;
  align-items:center;
}

.ww-word-nav{
  width:100%;
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:1.8vh;
  pointer-events:auto;
}

.ww-rule{
  width:88%;
  height:1px;
  margin:1.9vh 0;
  background:linear-gradient(
    90deg,
    transparent,
    rgba(255,190,95,.16),
    rgba(255,218,154,.42),
    rgba(255,190,95,.16),
    transparent
  );
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
}

.ww-word-link{
  appearance:none;
  position:relative;
  display:flex;
  align-items:center;
  justify-content:center;
  width:13rem;
  min-height:2rem;
  border:0;
  background:transparent;
  cursor:pointer;
  text-decoration:none;
  font-family:"Courier New",monospace;
  font-size:clamp(23px,1.64vw,32px);
  font-weight:700;
  line-height:1;

    letter-spacing:.34em;
  text-transform:uppercase;
  color:rgba(250,250,247,.95);
  text-shadow:0 2px 10px rgba(0,0,0,.88);
  transition:transform 170ms ease,color 170ms ease;
}

.ww-word-link:hover,
.ww-word-link:focus-visible{
  transform:translateY(-2px);
  color:#fff;
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
}

.ww-word-disabled{
  color:rgba(255,166,72,.42)!important;
  text-shadow:
    0 2px 8px rgba(0,0,0,.72),
    0 0 12px rgba(255,132,38,.06)!important;
}

.ww-word-solve{
  width:12rem;
  padding:.68rem 1rem .68rem 1.2rem;
  border:1px solid rgba(255,197,111,.44);
  border-radius:1rem;
  background:linear-gradient(
    180deg,
    rgba(255,197,111,.105),
    rgba(255,197,111,.035)
  );
  box-shadow:
    inset 0 0 0 1px rgba(255,255,255,.035),
    0 0 18px rgba(255,185,80,.055);

  font-size:clamp(22px,1.58vw,33px);
  letter-spacing:.34em;
  color:#ffc56f;
}

.ww-guidepost{
  width:88%;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  text-align:center;
  gap:1.45rem;
  margin-top:.5rem;
  padding:2rem 2.2rem 2.1rem;
  border-radius:1.8rem;

  background:
    radial-gradient(
      ellipse at top,
      rgba(255,181,80,.07),
      rgba(255,181,80,0) 46%
    ),
    linear-gradient(
      180deg,
      rgba(22,28,38,.56) 0%,
      rgba(12,16,24,.68) 48%,
      rgba(5,8,14,.86) 100%
    );

  border:2px solid rgba(120,78,36,.68);

  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.035),
    inset 0 -24px 48px rgba(0,0,0,.22),
    0 0 28px rgba(0,0,0,.28);

  backdrop-filter:blur(4px);
}

.ww-guidepost-title{
  width:100%;
  display:flex;
  align-items:center;
  justify-content:center;
  position:relative;
  padding-bottom:.25rem;

  font-family:Georgia,"Times New Roman",serif;
  font-size:clamp(20px,1.42vw,32px);
  line-height:1;
  letter-spacing:.22em;
  text-transform:uppercase;
  font-weight:700;

  color:rgba(255,236,198,.98);

  text-shadow:
    0 2px 10px rgba(0,0,0,.92),
    0 0 18px rgba(255,180,75,.18),
    0 0 34px rgba(255,180,75,.08);
}

.ww-guidepost-title::after{
  content:"";
  position:absolute;
  left:50%;
  bottom:-.15rem;
  width:72px;
  height:2px;
  transform:translateX(-50%);
  border-radius:999px;

  background:
    linear-gradient(
      90deg,
      transparent,
      rgba(255,201,120,.92),
      transparent
    );
}

.ww-guidepost-copy{
  max-width:92%;
  display:flex;
  flex-direction:column;
  gap:1.35rem;

  font-family:system-ui,-apple-system,"Segoe UI",sans-serif;
  font-size:clamp(10px,.72vw,14px);
  line-height:1.62;
  font-weight:700;
  letter-spacing:.08em;
  text-transform:uppercase;

  color:rgba(255,255,255,.92);

  text-shadow:0 2px 10px rgba(0,0,0,.92);
}

.ww-tooltip{
  position:absolute;
  z-index:100;
  left:26.7%;
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
  background:
    linear-gradient(
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

.ww-tooltip-line{
  display:block;
}

.ww-tooltip-line + .ww-tooltip-line{
  margin-top:.22rem;
}

.ww-clue-tooltip{ top:33%; }
.ww-life-tooltip{ top:38%; }
.ww-leader-tooltip{ top:44%; }
.ww-solve-tooltip{ top:55%; }

.ww-solve-overlay{
  position:fixed;
  inset:0;
  z-index:400;

  display:flex;
  align-items:center;
  justify-content:center;

  padding:4vh 4vw;

  background:
    radial-gradient(circle at top right, rgba(218,162,50,.16), transparent 34%),
    radial-gradient(circle at bottom left, rgba(70,110,165,.24), transparent 42%),
    rgba(0,0,0,.74);

  backdrop-filter:blur(11px);

  opacity:0;
  pointer-events:none;

  transition:opacity .25s ease;
}

.ww-solve-overlay.is-open{
  opacity:1;
  pointer-events:auto;
}

.ww-solve-card{
  width:min(46vw,380px);
  aspect-ratio:3 / 4;

  position:relative;

  overflow:visible;

  background-image:url("/assets/winterword/shared/lastword.png");
  background-size:contain;
  background-repeat:no-repeat;
  background-position:center;

  border:none;
  border-radius:0;

  box-shadow:none;

  text-align:center;

  padding:0;

  transform:translateY(10px) scale(.985);

  transition:transform .25s ease;
}

.ww-solve-overlay.is-open .ww-solve-card{
  transform:translateY(0) scale(1);
}

.ww-solve-card::before{
  display:none;
}

.ww-solve-card::after{
  display:none;
}

.ww-solve-kicker,
.ww-solve-heading,
.ww-solve-copy,
.ww-solve-warning{
  position:absolute;
  z-index:3;
  left:50%;
  transform:translateX(-50%);
  color:transparent;
  font-size:0;
  pointer-events:none;
}

.ww-solve-kicker{
  top:13.6%;
  width:70%;
  margin:0;
}

.ww-solve-heading{
  top:21%;
  width:80%;
}

.ww-solve-copy{
  top:42.2%;
  width:70%;
}

.ww-solve-warning{
  top:76.8%;
  width:70%;
  border:none;
}

.ww-solve-button{
  position:absolute;
  z-index:5;

  left:50%;
  top:53.5%;

  transform:translateX(-50%);

  width:53%;
  height:10.2%;

  border-radius:0;

  background:transparent;

  border:none;
  box-shadow:none;

  display:flex;
  align-items:center;
  justify-content:center;

  color:#f0a326;

  text-shadow:
    0 2px 0 rgba(0,0,0,.85),
    0 0 10px rgba(255,150,20,.34);

  font-family:"Arial Black","Impact",system-ui,sans-serif;
  font-size:clamp(1.3rem,2.2vw,2.4rem);
  font-weight:900;
  letter-spacing:.08em;
  text-transform:uppercase;

  text-decoration:none;

  transition:
    transform .18s ease,
    filter .18s ease;
}

.ww-solve-button:hover,
.ww-solve-button:focus-visible{

  transform:translateX(-50%) scale(1.02);

  filter:
    brightness(1.08)
    drop-shadow(0 0 18px rgba(255,177,64,.42));

  outline:none;
}

.ww-solve-close{
  position:absolute;
  z-index:12;

  top:10%;
  right:4.9%;

  width:34px;
  height:34px;

  border-radius:999px;

  border:1px solid rgba(215,159,72,.54);

  background:
    radial-gradient(
      circle at 34% 28%,
      rgba(255,218,139,.16),
      rgba(111,70,22,.18) 34%,
      rgba(7,7,6,.74) 72%
    );

  display:flex;
  align-items:center;
  justify-content:center;

  cursor:pointer;

  color:rgba(244,196,105,.9);

  font-family:Georgia,"Times New Roman",serif;
  font-size:1.18rem;
  font-weight:700;
  line-height:1;

  text-shadow:
    0 1px 0 rgba(0,0,0,.92),
    0 0 7px rgba(255,164,48,.2);

  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.08),
    inset 0 -8px 15px rgba(0,0,0,.25),
    0 3px 10px rgba(0,0,0,.34);

  backdrop-filter:blur(2px);

  transition:
    transform .18s ease,
    filter .18s ease,
    border-color .18s ease,
    box-shadow .18s ease,
    color .18s ease;
}

.ww-solve-close:hover,
.ww-solve-close:focus-visible{
  transform:scale(1.06);

  color:rgba(255,214,137,.98);

  border-color:rgba(239,190,98,.78);

  filter:
    brightness(1.06)
    drop-shadow(0 0 7px rgba(255,177,64,.22));

  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.12),
    inset 0 -8px 15px rgba(0,0,0,.22),
    0 3px 13px rgba(0,0,0,.38);

  outline:none;
}

.ww-pop-alert-overlay{
  position:fixed;
  inset:0;
  z-index:700;

  display:flex;
  align-items:center;
  justify-content:center;

  padding:4vh 4vw;

  background:
    radial-gradient(circle at 50% 46%, rgba(255,129,32,.2), transparent 28%),
    radial-gradient(circle at 50% 72%, rgba(255,90,20,.13), transparent 34%),
    rgba(0,0,0,.34);

  opacity:0;
  pointer-events:none;

  transition:opacity .28s ease;
}

.ww-pop-alert-overlay.is-open{
  opacity:1;
  pointer-events:auto;
}

.ww-pop-alert-card{
  position:relative;
  width:min(72vw,740px);
  aspect-ratio:1 / 1;
  transform:translateY(10px) scale(.985);
  transition:transform .28s ease;
}

.ww-pop-alert-overlay.is-open .ww-pop-alert-card{
  transform:translateY(0) scale(1);
}

.ww-pop-alert-img{
  position:absolute;
  inset:0;
  width:100%;
  height:100%;
  object-fit:contain;
  user-select:none;
  pointer-events:none;
  filter:
    drop-shadow(0 0 18px rgba(255,139,34,.28))
    drop-shadow(0 0 48px rgba(255,89,18,.2));
}

.ww-pop-alert-actions{
  position:absolute;
  left:50%;
  bottom:26.1%;
  transform:translateX(-50%);
  width:50%;
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:4.8%;
  z-index:4;
}

.ww-pop-alert-action{
  appearance:none;
  position:relative;
  top:0;
  border:none;
  background:transparent;
  min-height:42px;
  cursor:pointer;

  color:#ffc56f;

  font-size:clamp(18px,1.5vw,30px);
  line-height:1;
  font-weight:950;
  letter-spacing:.16em;
  text-transform:uppercase;

  text-shadow:
    0 1px 0 rgba(0,0,0,.9),
    0 0 10px rgba(255,115,30,.32);

  transition:
    transform .15s ease,
    filter .15s ease,
    opacity .15s ease;
}

.ww-pop-alert-action:hover,
.ww-pop-alert-action:focus-visible{

  transform:scale(1.08);

  filter:
    brightness(1.22)
    drop-shadow(0 0 14px rgba(255,165,55,.42));

  outline:none;
}

.ww-pop-alert-view{
  position:relative;
  left:0;
  top:0;
}

.ww-pop-alert-close{
  position:relative;
  left:-20px;
  top:0;

  color:#ffc56f;

  text-shadow:
    0 1px 0 rgba(0,0,0,.9),
    0 0 10px rgba(255,115,30,.32);
}

.ww-pop-clue-overlay{
  position:fixed;
  inset:0;
  z-index:760;

  display:flex;
  align-items:center;
  justify-content:center;

  padding:0;

  background:
    radial-gradient(circle at 50% 15%, rgba(255,140,42,.18), transparent 30%),
    rgba(0,0,0,.86);

  opacity:0;
  pointer-events:none;

  transition:opacity .28s ease;
}
.ww-pop-clue-overlay.is-open{
  opacity:1;
  pointer-events:auto;
}

.ww-pop-clue-frame{
  position:relative;
  width:min(70vw,1180px);
  max-height:80vh;
  display:flex;
  align-items:center;
  justify-content:center;
  transform:translateY(-4vh);
}

.ww-pop-clue-img{
  width:100%;
  max-height:80vh;
  height:auto;
  object-fit:contain;
  user-select:none;
  pointer-events:none;
  filter:
    drop-shadow(0 0 28px rgba(255,137,35,.16));
}

.ww-pop-clue-close{
  position:absolute;
  z-index:4;

  top:-18px;
  right:-18px;

  width:44px;
  height:44px;

  border-radius:999px;
  border:1px solid rgba(255,205,139,.56);

  background:
    radial-gradient(circle at 34% 28%, rgba(255,218,139,.18), rgba(10,9,8,.74) 70%);

  color:rgba(255,227,187,.96);

  font-family:Georgia,"Times New Roman",serif;
  font-size:1.4rem;
  font-weight:800;
  line-height:1;

  display:flex;
  align-items:center;
  justify-content:center;

  cursor:pointer;

  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.08),
    0 8px 24px rgba(0,0,0,.34);

  transition:
    transform .15s ease,
    filter .15s ease,
    border-color .15s ease;
}

.ww-pop-clue-close:hover,
.ww-pop-clue-close:focus-visible{
  transform:scale(1.06);
  filter:brightness(1.08) drop-shadow(0 0 10px rgba(255,153,42,.28));
  border-color:rgba(255,220,158,.82);
  outline:none;
}

.ww-pop-submit{
  position:absolute;
  z-index:4;
  left:50%;
  bottom:5.2vh;
  transform:translateX(-50%);

  display:flex;
  align-items:center;
  justify-content:center;

  min-width:min(330px,72vw);
  min-height:54px;
  padding:0 2rem;

  border-radius:999px;
  border:1px solid rgba(255,190,95,.72);

  background:
    linear-gradient(180deg, rgba(255,166,56,.95), rgba(190,82,24,.95));

  color:#150b05;
  text-decoration:none;
  text-align:center;

  font-size:clamp(13px,1vw,18px);
  font-weight:950;
  letter-spacing:.16em;
  text-transform:uppercase;

  text-shadow:0 1px 0 rgba(255,231,190,.42);

  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.2),
    0 14px 38px rgba(0,0,0,.44),
    0 0 28px rgba(255,125,26,.2);

  transition:
    transform .16s ease,
    filter .16s ease,
    box-shadow .16s ease;
}

.ww-pop-submit-pop2{
  bottom:7.5vh;
}

.ww-pop-submit:hover,
.ww-pop-submit:focus-visible{
  transform:translateX(-50%) translateY(-1px) scale(1.02);
  filter:brightness(1.08);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.26),
    0 16px 42px rgba(0,0,0,.48),
    0 0 36px rgba(255,125,26,.3);
  outline:none;
}

@media (max-width:760px){

  .ww-pop-alert-card{
    width:96vw;
  }

  .ww-pop-alert-actions{
    bottom:15.5%;
    width:56%;
  }

  .ww-pop-alert-action{
    min-height:34px;
    font-size:10px;
    letter-spacing:.12em;
  }

  .ww-pop-clue-frame{
    width:94vw;
    max-height:78vh;
    transform:translateY(-3vh);
  }

  .ww-pop-clue-img{
    max-height:78vh;
  }

  .ww-pop-clue-close{
    top:-12px;
    right:-6px;
    width:38px;
    height:38px;
  }

  .ww-pop-submit{
    bottom:3.2vh;
    min-height:48px;
    font-size:12px;
  }

}
</style>

<div id="wwPortal">
  <div id="wwStage">

    <div class="ww-base-layer">

      <img class="ww-shell" src="/assets/winterword/shared/BS1.png" alt="WinterWord Base Station" draggable="false">

      <div class="ww-title-meta">

        <div class="ww-title-org">
          ${safeText(seasonLabel)} ✧ 2026 ✧ ${safeText(orgName)}
        </div>

        <div class="ww-title-main">
          WINTERWORD
        </div>

        <div class="ww-title-status">
          LIVE
        </div>

        <div class="ww-title-sub">
          A letter per week from a wintry scroll.<br>
          Piece them together — reveal the whole.
        </div>

      </div>

      <div class="ww-left-panel">

        <nav class="ww-word-nav">

          <button class="ww-word-link" type="button" data-nav="clues" data-tooltip="clue">
            CLUE
          </button>

          <button class="ww-word-link ${lifelineAvailable ? "" : "ww-word-disabled"}" type="button" data-nav="lifeline" data-tooltip="life" data-disabled="${lifelineAvailable ? "false" : "true"}">
            LIFE
          </button>

          <button class="ww-word-link ${leaderboardAvailable ? "" : "ww-word-disabled"}" type="button" data-nav="leaderboard" data-tooltip="leader" data-disabled="${leaderboardAvailable ? "false" : "true"}">
            LEAD
          </button>

          <div class="ww-rule"></div>

          <button class="ww-word-link ww-word-solve" type="button" id="wwSolveOpen" data-tooltip="solve">
            SOLVE
          </button>

          <div class="ww-rule"></div>

          <div class="ww-guidepost">

            <div class="ww-guidepost-title">
              The Guidepost
            </div>

            <div class="ww-guidepost-copy">
              ${guidepostLines}
            </div>

          </div>

        </nav>

      </div>

      <div class="ww-tooltip ww-clue-tooltip" data-tooltip-card="clue">
        <span class="ww-tooltip-title">Clues</span>
        Each of your upcoming clues is designed to reveal just enough to move you forward — and hide the rest where only patience can reach it.
      </div>

      <div class="ww-tooltip ww-life-tooltip ${lifelineAvailable ? "" : "ww-tooltip--locked"}" data-tooltip-card="life">
        <span class="ww-tooltip-title">Lifeline</span>
        ${lifelineAvailable ? "This passage is open. Step carefully." : "This passage waits its moment."}
      </div>

      <div class="ww-tooltip ww-leader-tooltip ${leaderboardAvailable ? "" : "ww-tooltip--locked"}" data-tooltip-card="leader">
        <span class="ww-tooltip-title">Leaderboard</span>
        ${
          leaderboardAvailable
            ? "The WinterWord has been pierced. Footprints are beginning to appear."
            : `<span class="ww-tooltip-line">No answers received.</span><span class="ww-tooltip-line">No correct ones, anyway...</span>`
        }
      </div>

      <div class="ww-tooltip ww-solve-tooltip" data-tooltip-card="solve">
        <span class="ww-tooltip-title">Solve</span>
        Ready?
      </div>

      <div class="ww-menu">

        <button class="ww-menu-hotspot" type="button" aria-label="Open menu">
          <span></span>
        </button>

        <div class="ww-menu-dropdown">

          <div class="ww-menu-title">
            Menu
          </div>

          <a href="#" data-nav="welcome">
            Welcome
          </a>

          <a href="${subscribeHref}">
            Subscribe
          </a>

          <div class="ww-avalanche">
            <a href="${reportProblemHref}">
              AVALANCHE!
            </a>

            <div class="ww-avalanche-tooltip">
              Report a problem
            </div>
          </div>

          <a href="${contactHref}">
            Contact
          </a>

          <div class="ww-house-wrap">

            <a href="#">
              House Rules ▸
            </a>

            <div class="ww-house-submenu">

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

    <div class="ww-solve-overlay" id="wwSolveOverlay">

   <div class="ww-solve-card">

        <button class="ww-solve-close" id="wwSolveClose" type="button" aria-label="Close solve panel">
          ×
        </button>

        <div class="ww-solve-kicker">Final Submission</div>

        <div class="ww-solve-heading">The Last Word</div>

        <div class="ww-solve-copy">
          When the wind quietens,<br>
          certainty stirs.
        </div>

        <a class="ww-solve-button" href="${solveHref}" aria-label="Solve WinterWord">
          SOLVE
        </a>

        <div class="ww-solve-warning">
          One word.<br>
          One chance.<br>
          Guess wrong, and the silence wins.
        </div>

      </div>

    </div>

    ${
      popLive && activePop
        ? `
          <div class="ww-pop-alert-overlay" id="wwPopAlertOverlay" aria-hidden="false">

            <div class="ww-pop-alert-card">

              <img class="ww-pop-alert-img" src="/assets/winterword/shared/popalert.png" alt="Black Ice alert" draggable="false">

              <div class="ww-pop-alert-actions">

                <button class="ww-pop-alert-action ww-pop-alert-view" id="wwPopView" type="button" aria-label="View Black Ice clue">
                  VIEW
                </button>

                <button class="ww-pop-alert-action ww-pop-alert-close" id="wwPopAlertClose" type="button" aria-label="Close Black Ice alert">
                  CLOSE
                </button>

              </div>

            </div>

          </div>

          <div class="ww-pop-clue-overlay" id="wwPopClueOverlay" aria-hidden="true">

            <div class="ww-pop-clue-frame">

              <img class="ww-pop-clue-img" src="${activePop.image}" alt="Black Ice clue" draggable="false">

              <button class="ww-pop-clue-close" id="wwPopClueClose" type="button" aria-label="Close Black Ice clue">
                ×
              </button>

              <a class="ww-pop-submit ${activePop.key === "pop2" ? "ww-pop-submit-pop2" : ""}" id="wwPopSubmit" href="${popSubmitHref}" aria-label="Submit Black Ice answer">
                SUBMIT ANSWER
              </a>

            </div>

          </div>
        `
        : ""
    }

  </div>
</div>
`;

  const portal =
    app.querySelector("#wwPortal");

  const navButtons = app.querySelectorAll("[data-nav]");

  navButtons.forEach((button) => {
    button.addEventListener("click", (event) => {

      const target = button.getAttribute("data-nav");

      const disabled =
        button.getAttribute("data-disabled") === "true";

      if (disabled) return;

      event.preventDefault();

      const menu =
        app.querySelector(".ww-menu");

      if (menu) {
        menu.classList.remove("is-open");
      }
      if (typeof navigate === "function") {
        navigate(target);
      }

    });
  });

  const tooltipTriggers =
    app.querySelectorAll("[data-tooltip]");

  const tooltipCards =
    app.querySelectorAll("[data-tooltip-card]");

  const hideTooltips = () => {

    tooltipCards.forEach((card) =>
      card.classList.remove("is-visible")
    );

  };

  tooltipTriggers.forEach((trigger) => {

    const key =
      trigger.getAttribute("data-tooltip");

    const card =
      app.querySelector(
        '[data-tooltip-card="' + key + '"]'
      );

    trigger.addEventListener("mouseenter", () => {

      hideTooltips();

      if (card) {
        card.classList.add("is-visible");
      }

    });

    trigger.addEventListener("focus", () => {

      hideTooltips();

      if (card) {
        card.classList.add("is-visible");
      }

    });

    trigger.addEventListener("mouseleave", hideTooltips);
    trigger.addEventListener("blur", hideTooltips);

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

  const solveOpen =
    app.querySelector("#wwSolveOpen");

  const solveOverlay =
    app.querySelector("#wwSolveOverlay");

  const solveClose =
    app.querySelector("#wwSolveClose");

  if (solveOpen && solveOverlay) {

    solveOpen.addEventListener("click", () => {
      solveOverlay.classList.add("is-open");
    });

  }

  if (solveClose && solveOverlay) {

    solveClose.addEventListener("click", () => {
      solveOverlay.classList.remove("is-open");
    });

  }

  if (solveOverlay) {

    solveOverlay.addEventListener("click", (event) => {

      if (event.target === solveOverlay) {
        solveOverlay.classList.remove("is-open");
      }

    });

  }

  const popAlertOverlay =
    app.querySelector("#wwPopAlertOverlay");

  const popClueOverlay =
    app.querySelector("#wwPopClueOverlay");

  const popView =
    app.querySelector("#wwPopView");

  const popAlertClose =
    app.querySelector("#wwPopAlertClose");

  const popClueClose =
    app.querySelector("#wwPopClueClose");

  const popSubmit =
    app.querySelector("#wwPopSubmit");

  const openPopAlert = () => {
    if (!portal || !popAlertOverlay) return;
    portal.classList.add("ww-pop-alert-active");
    popAlertOverlay.classList.add("is-open");
    popAlertOverlay.setAttribute("aria-hidden", "false");
  };

  const closePopAlert = () => {
    if (!portal || !popAlertOverlay) return;
    portal.classList.remove("ww-pop-alert-active");
    popAlertOverlay.classList.remove("is-open");
    popAlertOverlay.setAttribute("aria-hidden", "true");
  };

  const openPopClue = () => {
    if (!popClueOverlay) return;
    closePopAlert();
    popClueOverlay.classList.add("is-open");
    popClueOverlay.setAttribute("aria-hidden", "false");
  };

  const closePopClue = () => {
    if (!popClueOverlay) return;
    popClueOverlay.classList.remove("is-open");
    popClueOverlay.setAttribute("aria-hidden", "true");
  };

  if (popView) {
    popView.addEventListener("click", openPopClue);
  }

  if (popAlertClose) {
    popAlertClose.addEventListener("click", closePopAlert);
  }

  if (popClueClose) {
    popClueClose.addEventListener("click", closePopClue);
  }

  if (popSubmit) {
    popSubmit.addEventListener("click", () => {
      closePopClue();
    });
  }

  if (popLive && activePop) {
    window.setTimeout(openPopAlert, 180);
  }

}
