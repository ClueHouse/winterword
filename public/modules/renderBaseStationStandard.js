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
  object-fit:cover;
  object-position:center center;
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
  left:0;
  top:0;
  width:39.3%;
  height:100%;
  pointer-events:none;
  background:linear-gradient(90deg, rgba(2,6,9,.24), rgba(2,6,9,.08) 58%, rgba(2,6,9,0));
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
  text-shadow:0 2px 8px rgba(0,0,0,.82), 0 0 12px rgba(255,255,255,.08);
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
  text-shadow:0 2px 12px rgba(0,0,0,.72), 0 0 24px rgba(255,255,255,.06);
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
  overflow:hidden;
}

.ww-title-status::before{
  background:
    linear-gradient(90deg, rgba(240,215,167,.14), rgba(240,215,167,.58), rgba(240,215,167,.14));
}

.ww-title-status::after{
  background:
    linear-gradient(90deg, rgba(240,215,167,.14), rgba(240,215,167,.58), rgba(240,215,167,.14));
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
  color:rgba(165,165,165,.42)!important;
  text-shadow:none!important;
  filter:saturate(.3);
}

.ww-word-solve{
  width:12rem;
  padding:.68rem 1rem .68rem 1.2rem;
  border:1px solid rgba(255,197,111,.44);
  border-radius:1rem;
  background:linear-gradient(180deg, rgba(255,197,111,.105), rgba(255,197,111,.035));
  box-shadow:0 0 18px rgba(255,185,80,.055);
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
  font-style:normal;
  font-weight:700;
  letter-spacing:.08em;
  text-transform:uppercase;
  color:rgba(255,255,255,.92);
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
  background:rgba(0,0,0,.72);
  backdrop-filter:blur(10px);
  opacity:0;
  pointer-events:none;
  transition:opacity .25s ease;
}

.ww-solve-overlay.is-open{
  opacity:1;
  pointer-events:auto;
}

.ww-solve-card{
  width:min(92vw,620px);
  padding:4rem 3rem;
  border-radius:2rem;
  border:2px solid rgba(190,128,42,.72);
  background:
    linear-gradient(180deg,
    rgba(186,128,49,.96),
    rgba(129,79,24,.96));
  box-shadow:
    0 30px 90px rgba(0,0,0,.55),
    inset 0 0 0 1px rgba(255,230,180,.12);
  text-align:center;
  position:relative;
}

.ww-solve-heading{
  font-family:"Arial Black",sans-serif;
  font-size:clamp(2rem,4vw,4rem);
  line-height:1;
  text-transform:uppercase;
  color:#0b0b0b;
  margin-bottom:2rem;
}

.ww-solve-copy{
  font-family:Georgia,serif;
  font-size:clamp(1.1rem,1.5vw,1.6rem);
  line-height:1.6;
  color:#1a1207;
  margin-bottom:3rem;
}

.ww-solve-button{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  min-width:320px;
  padding:1.4rem 2rem;
  border-radius:1.2rem;
  border:2px solid rgba(255,181,75,.42);
  background:#050505;
  color:#ffb23e;
  text-decoration:none;
  font-family:"Arial Black",sans-serif;
  font-size:clamp(1.2rem,2vw,2.2rem);
  text-transform:uppercase;
  letter-spacing:.08em;
  box-shadow:
    inset 0 0 0 1px rgba(255,255,255,.05),
    0 0 24px rgba(255,166,44,.18);
  transition:transform .18s ease;
}

.ww-solve-button:hover{
  transform:translateY(-2px) scale(1.01);
}

.ww-solve-warning{
  margin-top:3rem;
  font-family:Georgia,serif;
  font-size:clamp(1.05rem,1.4vw,1.5rem);
  line-height:1.7;
  color:#120d06;
}

.ww-solve-close{
  position:absolute;
  top:18px;
  right:18px;
  width:42px;
  height:42px;
  border-radius:999px;
  border:none;
  background:rgba(0,0,0,.16);
  color:#1b1207;
  font-size:1.4rem;
  cursor:pointer;
}

</style>

<div id="wwPortal">
  <div id="wwStage">

    <img class="ww-shell" src="/assets/winterword/shared/BS1.png" alt="WinterWord Base Station">

    <div class="ww-logo-softener"></div>
    <div class="ww-left-focus"></div>

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
      ${lifelineAvailable
        ? "This passage is open. Step carefully."
        : "This passage waits its moment."}
    </div>

    <div class="ww-tooltip ww-leader-tooltip ${leaderboardAvailable ? "" : "ww-tooltip--locked"}" data-tooltip-card="leader">
      <span class="ww-tooltip-title">Leaderboard</span>
      ${leaderboardAvailable
        ? "The WinterWord has been pierced. Footprints are beginning to appear."
        : "No answers received yet. No correct ones, anyway..."}
    </div>

    <div class="ww-tooltip ww-solve-tooltip" data-tooltip-card="solve">
      <span class="ww-tooltip-title">Solve</span>
      Submit the WinterWord when the answer is clear.
    </div>

    <div class="ww-solve-overlay" id="wwSolveOverlay">

      <div class="ww-solve-card">

        <button class="ww-solve-close" id="wwSolveClose">✕</button>

        <div class="ww-solve-heading">
          THE LAST WORD
        </div>

        <div class="ww-solve-copy">
          When the wind quietens,<br>
          certainty stirs
        </div>

        <a class="ww-solve-button" href="${solveHref}">
          Solve WinterWord
        </a>

        <div class="ww-solve-warning">
          One word.<br>
          One chance.<br>
          Guess wrong, and the silence wins.
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

    trigger.addEventListener("mouseleave", hideTooltips);

  });

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

}
