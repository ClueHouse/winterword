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

  const reportProblemHref =
    `mailto:fix@cluehouse.co.nz?subject=WinterWord%20Issue%20-%20${encodedOrgName}&body=${reportProblemBody}`;

  const subscribeHref =
    `mailto:opt@cluehouse.co.nz?subject=WinterWord%20Subscribe%20-%20${encodedOrgName}&body=${subscribeBody}`;

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

.ww-house-wrap{
  position:relative;
}

.ww-house-submenu{
  top:0;
  right:calc(100% + .55rem);
  transform:translateX(6px);
}

.ww-house-wrap:hover .ww-house-submenu,
.ww-house-wrap:focus-within .ww-house-submenu{
  opacity:1;
  pointer-events:auto;
  transform:translateX(0);
}

.ww-menu-title{
  padding:.72rem .9rem .8rem;
  margin-bottom:.2rem;
  font-size:.72rem;
  font-weight:900;
  letter-spacing:.28em;
  text-transform:uppercase;
  color:#f0d7a7;
  border-bottom:1px solid rgba(255,197,111,.16);
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

.ww-menu-dropdown a:hover,
.ww-menu-dropdown a:focus-visible,
.ww-house-submenu a:hover,
.ww-house-submenu a:focus-visible{
  background:rgba(224,155,32,.15);
  color:#f2b24c;
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

</style>

<div id="wwPortal">
  <div id="wwStage">

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

        <button class="ww-word-link" type="button" data-nav="clues">
          CLUE
        </button>

        <button class="ww-word-link ${lifelineAvailable ? "" : "ww-word-disabled"}" type="button" data-nav="lifeline" data-disabled="${lifelineAvailable ? "false" : "true"}">
          LIFE
        </button>

        <button class="ww-word-link ${leaderboardAvailable ? "" : "ww-word-disabled"}" type="button" data-nav="leaderboard" data-disabled="${leaderboardAvailable ? "false" : "true"}">
          LEAD
        </button>

        <div class="ww-rule"></div>

        <button class="ww-word-link ww-word-solve" type="button" id="wwSolveOpen">
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

    <div class="ww-menu">

      <button class="ww-menu-hotspot" type="button" aria-label="Open menu">
        <span></span>
      </button>

      <div class="ww-menu-dropdown">

        <div class="ww-menu-title">
          THE LANTERN
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
            Report a problem.
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

            <a href="/legal/privacy-policy.html" target="_blank" rel="noopener">
              Privacy Policy
            </a>

            <a href="/legal/terms-of-use.html" target="_blank" rel="noopener">
              Terms of Use
            </a>

            <a href="/legal/disclaimer.html" target="_blank" rel="noopener">
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

}
