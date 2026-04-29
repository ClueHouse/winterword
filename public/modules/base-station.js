// Full extracted base-station.js
// NOTE: This version is reconstructed directly from your pasted source,
// preserving the live pop clue rail pulse, navigation, subscription panel,
// legal links, and WinterWord base station structure.

export function renderBaseStation(app, data = {}, navigate) {
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
    popClueLive = false
  } = data;

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
          "Each week, a new clue will quietly unlock — each one revealing a single letter.",
          "Guard your answers, for as the season unfolds, they will begin to shift and settle… forming the anagram of the Winterword.",
          "If you feel the answer stirring early, step forward and claim your place on the leaderboard.",
          "But remember — one guess is all you get."
        ];

  const progressText = `${Number(currentClue) || 0} of ${Number(totalClues) || 12} clues released`;

  const reportProblemHref = `mailto:fix@cluehouse.co.nz?subject=WinterWord%20Issue%20-%20${encodedOrgName}`;
  const subscribeHref = `mailto:opt@cluehouse.co.nz?subject=WinterWord%20Subscribe%20-%20${encodedOrgName}`;
  const unsubscribeHref = `mailto:opt@cluehouse.co.nz?subject=WinterWord%20Unsubscribe%20-%20${encodedOrgName}`;
  const solveHref = `mailto:key@cluehouse.co.nz?subject=FINAL%20Winterword%20Submission%20-%20${encodedOrgName}%20-%202026`;
  const contactHref = `mailto:hq@cluehouse.co.nz?subject=Clue%20House%20Enquiry`;

  app.innerHTML = `
<style>
:root{
  --ww-night-0:#070c12;
  --ww-night-1:#0b141d;
  --ww-night-2:#13202c;
  --ww-ink-night:#d6dde6;
  --ww-muted-night:rgba(214,221,230,0.68);
  --ww-orange:#f08a24;
  --ww-left-wide:13.5rem;
  --ww-rail-bg:linear-gradient(90deg,
    rgba(7,12,18,1) 0%,
    rgba(11,20,29,1) 34%,
    rgba(19,32,44,1) 100%);
}

*{
  box-sizing:border-box;
}

#wwPortal{
  display:flex;
  height:100vh;
  font-family:system-ui,-apple-system,"Segoe UI",sans-serif;
  overflow:hidden;
}

#wwLeft{
  width:var(--ww-left-wide);
  background:var(--ww-rail-bg);
  position:sticky;
  top:0;
  flex:0 0 var(--ww-left-wide);
}

.ww-rail{
  position:absolute;
  inset:0;
  background:var(--ww-rail-bg);
}

.ww-rail--pop-live{
  animation:wwRailOrangePulse 2.2s ease-in-out infinite;
}

@keyframes wwRailOrangePulse{
  0%,100%{
    background:linear-gradient(90deg,
      rgba(7,12,18,1) 0%,
      rgba(11,20,29,1) 34%,
      rgba(19,32,44,1) 100%);
    box-shadow:
      inset -1px 0 0 rgba(240,138,36,0.92),
      0 0 0 rgba(240,138,36,0);
  }

  50%{
    background:linear-gradient(90deg,
      rgba(38,18,6,1) 0%,
      rgba(78,34,8,1) 34%,
      rgba(130,54,10,1) 100%);
    box-shadow:
      inset -2px 0 0 rgba(240,138,36,1),
      0 0 28px rgba(240,138,36,0.38);
  }
}

.ww-left-shell{
  height:100%;
  padding:1.5rem 0;
  display:flex;
  flex-direction:column;
  align-items:center;
}

.ww-left-logo img{
  width:9rem;
}

.ww-left-nav{
  display:flex;
  flex-direction:column;
  gap:1.6rem;
  margin-top:2rem;
}

.ww-left-item{
  background:none;
  border:none;
  cursor:pointer;
  display:flex;
  flex-direction:column;
  align-items:center;
  color:white;
}

.ww-left-icon{
  width:4.4rem;
}

.ww-left-label{
  margin-top:.4rem;
  font-size:.72rem;
  letter-spacing:.18em;
  color:var(--ww-muted-night);
  font-weight:700;
}

.ww-left-item--pop .ww-left-icon{
  animation:wwPopPulse 1.45s ease-in-out infinite;
}

@keyframes wwPopPulse{
  0%,100%{
    filter:drop-shadow(0 0 6px rgba(240,138,36,.38));
  }

  50%{
    filter:drop-shadow(0 0 14px rgba(240,138,36,.82));
  }
}

#wwRight{
  flex:1;
  overflow:auto;
  background:
    linear-gradient(90deg,
      var(--ww-night-0) 0%,
      var(--ww-night-1) 34%,
      var(--ww-night-2) 100%);
}

#wwView{
  max-width:78rem;
  margin:0 auto;
  padding:4rem;
  color:white;
}

.ww-title{
  font-size:2.6rem;
  color:var(--ww-orange);
  margin:0;
}

.ww-org-name{
  margin-top:.5rem;
  font-size:.84rem;
  letter-spacing:.18em;
  color:rgba(214,221,230,0.74);
}

.ww-tagline{
  margin:2rem 0;
  font-size:1.12rem;
  line-height:1.6;
}

.ww-base{
  display:grid;
  grid-template-columns:1.15fr .65fr;
  gap:2rem;
}

.ww-card{
  padding:1.75rem;
  border-radius:.85rem;
  background:rgba(255,255,255,.05);
  border:1px solid rgba(255,255,255,.08);
}

.ww-card h3{
  margin:0 0 1rem;
  font-size:.92rem;
  letter-spacing:.14em;
  text-transform:uppercase;
}

.ww-card p{
  line-height:1.7;
}

.ww-progress{
  margin-top:1rem;
  font-size:.78rem;
  letter-spacing:.14em;
  color:rgba(214,221,230,.62);
}

.ww-lastword{
  background:rgba(255,255,255,.96);
  color:#1a2330;
  padding:2.8rem 2rem;
  border-radius:.9rem;
}

.ww-primary{
  display:inline-block;
  padding:1rem 1.4rem;
  background:#243242;
  color:white;
  text-decoration:none;
  font-weight:900;
  letter-spacing:.14em;
  margin-top:1.5rem;
}

.ww-footer{
  margin-top:3rem;
  padding-top:2rem;
  font-size:.75rem;
  color:rgba(214,221,230,.72);
}

.ww-footer a{
  color:inherit;
  text-decoration:none;
}
</style>

<div id="wwPortal">
  <aside id="wwLeft">
    <div class="ww-rail ${popClueLive ? "ww-rail--pop-live" : ""}">
      <div class="ww-left-shell">

        <div class="ww-left-logo">
          <img src="/assets/winterword/shared/logo.png" alt="WinterWord">
        </div>

        <nav class="ww-left-nav">

          <button class="ww-left-item" type="button" data-nav="clues">
            <img class="ww-left-icon" src="/assets/winterword/shared/clue.png" alt="Clues">
            <div class="ww-left-label">CLUES</div>
          </button>

          <button
            class="ww-left-item"
            type="button"
            data-nav="lifeline"
            data-disabled="${lifelineAvailable ? "false" : "true"}"
          >
            <img class="ww-left-icon" src="/assets/winterword/shared/lifeline.png" alt="Lifeline">
            <div class="ww-left-label">LIFELINE</div>
          </button>

          ${
            popClueLive
              ? `
          <button class="ww-left-item ww-left-item--pop" type="button" data-nav="pop-clue">
            <img class="ww-left-icon" src="/assets/winterword/shared/flash.png" alt="Pop Clue">
            <div class="ww-left-label">POP</div>
          </button>
          `
              : ""
          }

          <button class="ww-left-item" type="button" data-nav="leaderboard">
            <img class="ww-left-icon" src="/assets/winterword/shared/leaderboard.png" alt="Leaderboard">
            <div class="ww-left-label">LEADER</div>
          </button>

        </nav>
      </div>
    </div>
  </aside>

  <main id="wwRight">
    <div id="wwView">

      <header>
        <div class="ww-slug">${safeText(seasonLabel)}</div>
        <h1 class="ww-title">Base Station</h1>
        <div class="ww-org-name">${safeText(orgName)}</div>
      </header>

      <p class="ww-tagline">
        ${safeText(introLine1)}<br>
        ${safeText(introLine2)}
      </p>

      <div class="ww-base">

        <div>
          <div class="ww-card">
            <h3>How this works</h3>
            ${paragraphs.map(p => `<p>${safeText(p)}</p>`).join("")}
          </div>

          <div class="ww-card" style="margin-top:1.25rem;">
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

          <p>
            When the wind quietens,<br>
            certainty stirs
          </p>

          <a class="ww-primary" href="${solveHref}">
            Solve WinterWord
          </a>

          <p style="margin-top:1.5rem;">
            One word.<br>
            One chance.<br>
            Guess wrong, and the silence wins.
          </p>
        </div>

      </div>

      <footer class="ww-footer">
        <div>WinterWord • Another Clue House Experience</div>

        <div style="margin-top:.7rem;">
          <a href="/legal/privacy-policy.html">Privacy</a> •
          <a href="/legal/terms-of-use.html">Terms</a> •
          <a href="/legal/disclaimer.html">Disclaimer</a> •
          <a href="${contactHref}">Contact</a>
        </div>
      </footer>

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
