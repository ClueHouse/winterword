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

  const paragraphs =
    Array.isArray(howParagraphs) && howParagraphs.length
      ? howParagraphs
      : [
          "Each clue is answerable with one letter.",
          "Together, they anagram to reveal the WinterWord.",
          "You may solve before full release.",
          "The leaderboard loves fearless players."
        ];

  const released = Number(currentClue) || 0;
  const clueTotal = Number(totalClues) || 12;
  const progressText = `${released} of ${clueTotal} clues released`;

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
:root{
  --ww-orange:#d8a24f;
  --ww-cream:#f3eee4;
  --ww-dark:#09111a;
  --ww-blue:#102030;
  --ww-muted:rgba(243,238,228,0.72);
  --ww-panel:rgba(9,17,26,0.74);
  --ww-border:rgba(216,162,79,0.34);
}

*{box-sizing:border-box;}

#wwPortal{
  display:flex;
  min-height:100vh;
  background:
    linear-gradient(180deg, rgba(7,14,22,0.88), rgba(7,14,22,0.94)),
    url('/assets/winterword/shared/BS1.png') center center / cover no-repeat;
  font-family:system-ui,-apple-system,"Segoe UI",sans-serif;
  color:var(--ww-cream);
}

#wwLeft{
  width:220px;
  min-height:100vh;
  position:relative;
  flex-shrink:0;
}

.ww-left-shell{
  position:absolute;
  inset:0;
  background:url('/assets/winterword/shared/BS1.png') left center / contain no-repeat;
  pointer-events:none;
}

.ww-left-hotspot{
  position:absolute;
  left:50%;
  transform:translateX(-50%);
  width:90px;
  height:90px;
  cursor:pointer;
  border:none;
  background:none;
  padding:0;
}

.ww-left-hotspot img{
  width:100%;
  height:auto;
  display:block;
  transition:transform 180ms ease, filter 180ms ease;
}

.ww-left-hotspot:hover img{
  transform:scale(1.06);
  filter:drop-shadow(0 0 14px rgba(216,162,79,0.35));
}

.ww-clue{ top:275px; }
.ww-life{ top:415px; }
.ww-leader{ top:555px; }

.ww-subscribe{
  position:absolute;
  bottom:48px;
  left:50%;
  transform:translateX(-50%);
  color:rgba(243,238,228,0.78);
  font-size:0.78rem;
  font-weight:700;
  letter-spacing:0.22em;
  text-transform:uppercase;
  text-decoration:none;
}

.ww-subscribe:hover{
  color:var(--ww-orange);
}

#wwRight{
  flex:1;
  padding:3.5rem 4rem;
  position:relative;
}

.ww-topbar{
  position:absolute;
  top:2rem;
  right:2.5rem;
  z-index:50;
}

.ww-menu{
  position:relative;
}

.ww-menu-btn{
  background:rgba(9,17,26,0.72);
  border:1px solid var(--ww-border);
  color:var(--ww-cream);
  font-size:1.5rem;
  padding:0.4rem 0.8rem;
  border-radius:0.5rem;
  cursor:pointer;
}

.ww-menu-dropdown,
.ww-legal-submenu{
  position:absolute;
  background:rgba(9,17,26,0.96);
  border:1px solid var(--ww-border);
  border-radius:0.6rem;
  min-width:200px;
  padding:0.5rem;
  opacity:0;
  pointer-events:none;
  transition:opacity 160ms ease;
}

.ww-menu:hover .ww-menu-dropdown,
.ww-legal-wrap:hover .ww-legal-submenu{
  opacity:1;
  pointer-events:auto;
}

.ww-menu-dropdown{
  top:110%;
  right:0;
}

.ww-legal-wrap{
  position:relative;
}

.ww-legal-submenu{
  top:0;
  left:100%;
}

.ww-menu-dropdown a,
.ww-legal-submenu a{
  display:block;
  padding:0.55rem 0.75rem;
  color:var(--ww-cream);
  text-decoration:none;
  font-size:0.82rem;
}

.ww-menu-dropdown a:hover,
.ww-legal-submenu a:hover{
  color:var(--ww-orange);
}

.ww-head{
  max-width:900px;
  margin-bottom:2.5rem;
}

.ww-slug{
  font-size:0.78rem;
  letter-spacing:0.3em;
  text-transform:uppercase;
  color:var(--ww-muted);
  font-weight:800;
}

.ww-title{
  font-size:3rem;
  text-transform:uppercase;
  color:var(--ww-orange);
  margin:0.5rem 0;
}

.ww-org-name{
  font-size:0.9rem;
  letter-spacing:0.2em;
  text-transform:uppercase;
  color:rgba(243,238,228,0.76);
}

.ww-tagline{
  font-size:1.12rem;
  line-height:1.75;
  font-style:italic;
  color:var(--ww-cream);
  margin-top:1.5rem;
}

.ww-base{
  display:grid;
  grid-template-columns:1.2fr 0.75fr;
  gap:2.5rem;
}

.ww-card{
  background:var(--ww-panel);
  border:1px solid rgba(255,255,255,0.08);
  border-radius:1rem;
  padding:2rem;
  margin-bottom:1.5rem;
  box-shadow:0 18px 48px rgba(0,0,0,0.42);
}

.ww-card h3{
  margin:0 0 1rem;
  font-size:0.88rem;
  letter-spacing:0.16em;
  text-transform:uppercase;
  color:var(--ww-orange);
}

.ww-card p{
  line-height:1.75;
  color:rgba(243,238,228,0.88);
}

.ww-progress{
  margin-top:1rem;
  font-size:0.76rem;
  letter-spacing:0.14em;
  text-transform:uppercase;
  color:var(--ww-muted);
}

.ww-lastword{
  background:linear-gradient(180deg, rgba(243,238,228,0.98), rgba(230,220,198,0.98));
  color:#18222c;
  border-radius:1rem;
  padding:2.8rem 2rem;
  text-align:center;
  box-shadow:0 28px 72px rgba(0,0,0,0.55);
}

.ww-lastword h3{
  margin:0 0 1.2rem;
  font-size:0.9rem;
  letter-spacing:0.14em;
  text-transform:uppercase;
}

.ww-lastword-kicker{
  font-size:1.08rem;
  line-height:1.7;
  margin-bottom:2rem;
}

.ww-primary{
  display:inline-block;
  padding:1rem 1.6rem;
  border-radius:0.65rem;
  background:linear-gradient(180deg,#1d2d3d,#111c28);
  color:#f3eee4;
  text-decoration:none;
  font-size:0.8rem;
  font-weight:900;
  letter-spacing:0.16em;
  text-transform:uppercase;
}

.ww-stakes{
  margin-top:1.8rem;
  font-size:0.95rem;
  line-height:1.7;
  color:rgba(24,34,44,0.72);
}

@media (max-width:1100px){
  .ww-base{
    grid-template-columns:1fr;
  }

  #wwLeft{
    display:none;
  }

  #wwRight{
    padding:2rem;
  }
}
</style>

<div id="wwPortal">

  <aside id="wwLeft">
    <div class="ww-left-shell"></div>

    <button class="ww-left-hotspot ww-clue" data-nav="clues">
      <img src="/assets/winterword/shared/icon_clue.png" alt="Clues">
    </button>

    <button
      class="ww-left-hotspot ww-life"
      data-nav="lifeline"
      data-disabled="${lifelineAvailable ? "false" : "true"}"
    >
      <img src="/assets/winterword/shared/icon_life.png" alt="Lifeline">
    </button>

    <button
      class="ww-left-hotspot ww-leader"
      data-nav="leaderboard"
      data-disabled="${leaderboardAvailable ? "false" : "true"}"
    >
      <img src="/assets/winterword/shared/icon_leader.png" alt="Leaderboard">
    </button>

    <a class="ww-subscribe" href="${subscribeHref}">
      Subscribe
    </a>
  </aside>

  <main id="wwRight">

    <div class="ww-topbar">
      <div class="ww-menu">
        <button class="ww-menu-btn">☰</button>

        <div class="ww-menu-dropdown">
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

    <div class="ww-head">
      <div class="ww-slug">${safeText(seasonLabel)}</div>
      <h1 class="ww-title">Base Station</h1>
      <div class="ww-org-name">${safeText(orgName)}</div>

      <div class="ww-tagline">
        ${safeText(introLine1)}<br>
        ${safeText(introLine2)}
      </div>
    </div>

    <div class="ww-base">

      <div>
        <div class="ww-card">
          <h3>How this works</h3>
          ${paragraphs.map((p) => `<p>${safeText(p)}</p>`).join("")}
        </div>

        <div class="ww-card">
          <h3>Updates</h3>
          ${
            updatesText && String(updatesText).trim()
              ? `<p>${safeText(updatesText)}</p>`
              : `<p>No new updates yet.</p>`
          }

          <div class="ww-progress">${safeText(progressText)}</div>
        </div>
      </div>

      <div class="ww-lastword">
        <h3>The Last Word</h3>

        <div class="ww-lastword-kicker">
          When the wind quietens,<br>
          certainty stirs
        </div>

        <a class="ww-primary" href="${solveHref}">
          Solve WinterWord
        </a>

        <div class="ww-stakes">
          One word.<br>
          One chance.<br>
          Guess wrong, and the silence wins.
        </div>
      </div>

    </div>

  </main>

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
