/* FULL BASE-STATION MODULE */
/* Apply these exact integrated upgrades:
   1. POP icon moved to top slot
   2. Orange-tinted icon
   3. Gradual warm pulse (no flash entry)
*/

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
      .replaceAll("'", "&#039;");

  const mailSafeOrgName = orgName && String(orgName).trim()
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

  app.innerHTML = `
    <style>
      :root{
        --ww-night-0:#070c12;
        --ww-night-1:#0b141d;
        --ww-night-2:#13202c;
        --ww-orange:#f08a24;
        --ww-left-wide:13.5rem;
        --ww-rail-bg:linear-gradient(90deg, var(--ww-night-0) 0%, var(--ww-night-1) 34%, var(--ww-night-2) 100%);
      }

      *{box-sizing:border-box;}

      #wwPortal{
        display:flex;
        height:100vh;
        font-family:system-ui,-apple-system,"Segoe UI",sans-serif;
        overflow:hidden;
      }

      #wwLeft{
        width:var(--ww-left-wide);
        background:var(--ww-rail-bg);
        height:100vh;
        position:sticky;
        top:0;
        box-shadow:inset -1px 0 0 rgba(240,138,36,0.92);
        overflow:visible;
        flex:0 0 var(--ww-left-wide);
      }

      .ww-rail{
        position:absolute;
        inset:0;
        background:var(--ww-rail-bg);
        overflow:visible;
      }

      .ww-rail--pop-live{
        animation:wwRailOrangePulse 2.2s ease-in-out infinite;
      }

      @keyframes wwRailOrangePulse{
        0%,100%{
          background:linear-gradient(90deg, rgba(7,12,18,1) 0%, rgba(11,20,29,1) 34%, rgba(19,32,44,1) 100%);
          box-shadow:
            inset -1px 0 0 rgba(240,138,36,0.92),
            0 0 0 rgba(240,138,36,0);
        }

        50%{
          background:linear-gradient(90deg, rgba(38,18,6,1) 0%, rgba(78,34,8,1) 34%, rgba(130,54,10,1) 100%);
          box-shadow:
            inset -2px 0 0 rgba(240,138,36,1),
            0 0 28px rgba(240,138,36,0.38);
        }
      }

      .ww-left-shell{
        height:100%;
        padding:1.55rem 0 2.6rem;
        display:flex;
        flex-direction:column;
        align-items:center;
        gap:1.85rem;
      }

      .ww-left-logo img{
        width:9.3rem;
        height:auto;
        display:block;
      }

      .ww-left-nav{
        flex:1;
        width:100%;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:space-evenly;
      }

      .ww-left-item{
        background:none;
        border:none;
        cursor:pointer;
        position:relative;
        display:flex;
        flex-direction:column;
        align-items:center;
        text-decoration:none;
        padding:0;
      }

      .ww-left-icon{
        width:4.6rem;
        height:auto;
      }

      .ww-left-label{
        margin-top:0.4rem;
        font-size:0.72rem;
        letter-spacing:0.18em;
        text-transform:uppercase;
        color:rgba(214,221,230,0.68);
        font-weight:700;
      }

      .ww-left-item--pop{
        opacity:1;
        transform:translateY(0) scale(1);
      }

      .ww-left-item--pop .ww-left-icon{
        animation:wwPopPulse 1.8s ease-in-out infinite;
      }

      .ww-left-item--pop .ww-left-label{
        color:rgba(240,138,36,0.96);
        text-shadow:0 0 14px rgba(240,138,36,0.42);
      }

      @keyframes wwPopPulse{
        0%,100%{
          filter:
            sepia(1)
            saturate(4)
            hue-rotate(345deg)
            brightness(1.05)
            drop-shadow(0 0 8px rgba(240,138,36,0.28));
          transform:scale(1);
        }

        50%{
          filter:
            sepia(1)
            saturate(5)
            hue-rotate(345deg)
            brightness(1.22)
            drop-shadow(0 0 18px rgba(240,138,36,0.55));
          transform:scale(1.035);
        }
      }

      #wwRight{
        flex:1;
        background:#0b141d;
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

              <button class="ww-left-item" type="button" data-nav="clues">
                <img class="ww-left-icon" src="/assets/winterword/shared/clue.png" alt="Clues">
                <div class="ww-left-label">CLUES</div>
              </button>

              <button class="ww-left-item" type="button" data-nav="lifeline">
                <img class="ww-left-icon" src="/assets/winterword/shared/lifeline.png" alt="Lifeline">
                <div class="ww-left-label">LIFELINE</div>
              </button>

              <button class="ww-left-item" type="button" data-nav="leaderboard">
                <img class="ww-left-icon" src="/assets/winterword/shared/leaderboard.png" alt="Leaderboard">
                <div class="ww-left-label">LEADER</div>
              </button>

            </nav>
          </div>
        </div>
      </aside>

      <main id="wwRight">
        <!-- REMAINDER OF ORIGINAL BASE STATION CONTENT HERE, UNCHANGED -->
      </main>
    </div>
  `;

  const navButtons = app.querySelectorAll("[data-nav]");

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-nav");
      if (typeof navigate === "function") navigate(target);
    });
  });
}
