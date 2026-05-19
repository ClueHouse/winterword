export function renderBaseStationStandard(app, data = {}, navigate) {

  const {
    orgName = "WinterWord",
    seasonLabel = "WINTERWORD • 2026",
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
  transform:translate(calc(var(--ww-drift-x) * -.12), calc(var(--ww-drift-y) * -.12));
  transition:transform 180ms ease-out;
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
    linear-gradient(90deg, rgba(240,215,167,.14), rgba(240,215,167,.58), rgba(240,215,167,.14)),
    linear-gradient(90deg, transparent, rgba(255,255,255,.95), transparent);
  background-size:100% 100%, 34% 100%;
  background-position:center, -60% 0;
  background-repeat:no-repeat;
  animation:wwStatusSweepLeft 8.5s linear infinite;
}

.ww-title-status::after{
  background:
    linear-gradient(90deg, rgba(240,215,167,.14), rgba(240,215,167,.58), rgba(240,215,167,.14)),
    linear-gradient(90deg, transparent, rgba(255,255,255,.95), transparent);
  background-size:100% 100%, 34% 100%;
  background-position:center, 160% 0;
  background-repeat:no-repeat;
  animation:wwStatusSweepRight 8.5s linear infinite;
}

@keyframes wwStatusSweepLeft{
  0%{ background-position:center, -60% 0; }
  100%{ background-position:center, 160% 0; }
}

@keyframes wwStatusSweepRight{
  0%{ background-position:center, 160% 0; }
  100%{ background-position:center, -60% 0; }
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
  pointer-events:none;
  transform:translate(calc(var(--ww-drift-x) * -.12), calc(var(--ww-drift-y) * -.12));
  transition:transform 180ms ease-out;
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
  box-shadow:0 0 10px rgba(255,180,75,.14);
}

.ww-word-link{
  appearance:none;
  position:relative;
  display:flex;
  align-items:center;
  justify-content:center;
  width:13rem;
  min-height:2rem;
  padding:0;
  margin:0;
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

.ww-word-solve{
  width:12rem;
  padding:.68rem 1rem .68rem 1.2rem;
  border:1px solid rgba(255,197,111,.44);
  border-radius:1rem;
  background:linear-gradient(180deg, rgba(255,197,111,.105), rgba(255,197,111,.035));
  box-shadow:inset 0 0 0 1px rgba(255,255,255,.035), 0 0 18px rgba(255,185,80,.055);
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

  font-size:
    clamp(20px,1.42vw,32px);

  line-height:1;

  letter-spacing:.22em;

  text-transform:uppercase;

  font-weight:700;

  color:
    rgba(255,236,198,.98);

  text-shadow:
    0 2px 10px rgba(0,0,0,.92),
    0 0 18px rgba(255,180,75,.18),
    0 0 34px rgba(255,180,75,.08);

  filter:
    drop-shadow(0 0 12px rgba(255,170,60,.08));
}

.ww-guidepost-title::before{
  display:none;
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

  box-shadow:
    0 0 12px rgba(255,181,75,.28);
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
  text-shadow:0 2px 10px rgba(0,0,0,.92);
}

.ww-menu{
  position:absolute;
  z-index:80;
  top:3.1%;
  right:3.1%;
  width:66px;
  height:66px;
}

.ww-menu-hotspot{
  position:absolute;
  inset:0;
  border-radius:1.25rem;
  border:1.5px solid rgba(181,124,54,.72);

  background:
    linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.015)),
    linear-gradient(135deg, rgba(56,34,16,.58), rgba(9,12,18,.82));

  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.08),
    inset 0 0 0 1px rgba(255,210,140,.05),
    0 0 0 1px rgba(0,0,0,.55),
    0 10px 28px rgba(0,0,0,.42),
    0 0 18px rgba(191,128,48,.12);

  backdrop-filter:blur(6px);

  cursor:pointer;

  transition:
    transform .22s ease,
    border-color .22s ease,
    box-shadow .22s ease,
    background .22s ease;
}

.ww-menu-hotspot::before{
  content:"";
  position:absolute;
  inset:1px;
  border-radius:1.15rem;
  background:linear-gradient(180deg, rgba(255,255,255,.045), rgba(255,255,255,0));
  pointer-events:none;
}

.ww-menu-hotspot:hover,
.ww-menu-hotspot:focus-visible{
  transform:translateY(-1px) scale(1.03);

  border-color:rgba(236,177,94,.92);

  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.11),
    inset 0 0 0 1px rgba(255,210,140,.08),
    0 0 0 1px rgba(0,0,0,.62),
    0 14px 34px rgba(0,0,0,.5),
    0 0 24px rgba(255,182,72,.22);

  outline:none;
}

.ww-menu-lines,
.ww-menu-lines::before,
.ww-menu-lines::after{
  content:"";
  position:absolute;
  left:50%;
  width:26px;
  height:2px;
  border-radius:999px;

  background:linear-gradient(
    90deg,
    rgba(255,224,173,.88),
    rgba(255,197,111,1),
    rgba(255,224,173,.88)
  );

  transform:translateX(-50%);

  box-shadow:0 0 10px rgba(255,182,72,.24);
}

.ww-menu-lines{
  top:32px;
}

.ww-menu-lines::before{
  top:-8px;
}

.ww-menu-lines::after{
  top:8px;
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

.ww-clue-tooltip{ top:30%; }
.ww-life-tooltip{ top:40; }
.ww-leader-tooltip{ top:50%; }
.ww-solve-tooltip{ top:60%; }

</style>

<div id="wwPortal">
  <div id="wwStage">

    <img class="ww-shell" src="/assets/winterword/shared/BS1.png" alt="WinterWord Base Station" draggable="false">

    <div class="ww-logo-softener"></div>
    <div class="ww-left-focus"></div>

    <div class="ww-title-meta">

      <div class="ww-title-org">
        ${safeText(seasonLabel)} ✧ ${safeText(orgName)}
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

        <button class="ww-word-link" type="button" data-nav="lifeline" data-tooltip="life" data-disabled="${lifelineAvailable ? "false" : "true"}">
          LIFE
        </button>

        <button class="ww-word-link" type="button" data-nav="leaderboard" data-tooltip="leader" data-disabled="${leaderboardAvailable ? "false" : "true"}">
          LEAD
        </button>

        <div class="ww-rule"></div>

        <a class="ww-word-link ww-word-solve" href="${solveHref}" data-tooltip="solve">
          SOLVE
        </a>

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
        <span class="ww-menu-lines"></span>
      </button>

      <div class="ww-menu-dropdown">

        <a href="#" data-nav="welcome">
          Welcome
        </a>

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

    trigger.addEventListener(
      "mouseleave",
      hideTooltips
    );

    trigger.addEventListener(
      "blur",
      hideTooltips
    );

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

  const stage =
    app.querySelector("#wwStage");

  if (stage) {

    stage.addEventListener("pointermove", (event) => {

      const rect =
        stage.getBoundingClientRect();

      const x =
        ((event.clientX - rect.left) / rect.width - .5) * 10;

      const y =
        ((event.clientY - rect.top) / rect.height - .5) * 10;

      stage.style.setProperty(
        "--ww-drift-x",
        x + "px"
      );

      stage.style.setProperty(
        "--ww-drift-y",
        y + "px"
      );

    });

    stage.addEventListener("pointerleave", () => {

      stage.style.setProperty(
        "--ww-drift-x",
        "0px"
      );

      stage.style.setProperty(
        "--ww-drift-y",
        "0px"
      );

    });

  }

}
