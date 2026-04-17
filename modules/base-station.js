export function renderBaseStation(app, game, navigate) {
  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  const orgName = escapeHtml(game.org_name || "WinterWord");
  const seasonLabel = escapeHtml(game.season_label || "WINTERWORD • 2026");
  const introLine1 = escapeHtml(game.base_station_intro_line_1 || "A letter per week from a wintry scroll,");
  const introLine2 = escapeHtml(game.base_station_intro_line_2 || "Piece them together — reveal the whole.");
  const howTitle = escapeHtml(game.how_it_works_title || "HOW THIS WORKS");
  const updatesTitle = escapeHtml(game.updates_title || "UPDATES");
  const updatesText = escapeHtml(game.updates_text || "No updates yet.");
  const solveTitle = escapeHtml(game.solve_panel_title || "THE LAST WORD");
  const solveIntro = escapeHtml(game.solve_panel_intro || "When the wind quietens, certainty stirs");
  const solveButtonLabel = escapeHtml(game.solve_button_label || "SOLVE WINTERWORD");
  const solveFooter1 = escapeHtml(game.solve_footer_line_1 || "One word.");
  const solveFooter2 = escapeHtml(game.solve_footer_line_2 || "One chance.");
  const solveFooter3 = escapeHtml(game.solve_footer_line_3 || "Guess wrong, and the silence wins.");

  const howParagraphs = Array.isArray(game.how_it_works_paragraphs) && game.how_it_works_paragraphs.length
    ? game.how_it_works_paragraphs
    : [
        "Each week, a new clue will quietly unlock — each one revealing a single letter.",
        "Guard your answers, for as the season unfolds, they will begin to shift and settle... forming the anagram of the WinterWord.",
        "If you feel the answer stirring early, step forward and claim your place on the leaderboard.",
        "But remember — one guess is all you get."
      ];

  const howHtml = howParagraphs
    .map(function (paragraph) {
      return `<p>${escapeHtml(paragraph)}</p>`;
    })
    .join("");

  app.innerHTML = `
    <style>
      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        font-family: Arial, Helvetica, sans-serif;
        background:
          radial-gradient(circle at top left, rgba(35, 61, 89, 0.45), transparent 40%),
          linear-gradient(90deg, #07131f 0%, #081624 24%, #05131f 55%, #04101a 100%);
        color: #f4f1ea;
        min-height: 100vh;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      #app {
        min-height: 100vh;
      }

      .ww-shell {
        min-height: 100vh;
        display: grid;
        grid-template-columns: 180px 1fr;
      }

      .ww-sidebar {
        background: linear-gradient(180deg, #082039 0%, #061626 100%);
        border-right: 1px solid rgba(230, 146, 34, 0.65);
        padding: 32px 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 34px;
      }

      .ww-brand {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 14px;
        margin-bottom: 12px;
      }

      .ww-brand-mark {
        width: 72px;
        height: 72px;
        border-radius: 18px;
        border: 1px solid rgba(255,255,255,0.18);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        font-weight: 700;
        color: #dfe7ef;
        background: rgba(255,255,255,0.04);
      }

      .ww-brand-name {
        text-align: center;
        font-size: 16px;
        line-height: 1.05;
        font-weight: 700;
        color: #eef3f7;
      }

      .ww-nav {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 18px;
        margin-top: 8px;
      }

      .ww-nav-link {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        padding: 12px 8px;
        border-radius: 14px;
        color: #c9d2dc;
        transition: background 0.15s ease, transform 0.15s ease, border-color 0.15s ease;
        border: 1px solid transparent;
        background: transparent;
        cursor: pointer;
        font: inherit;
      }

      .ww-nav-link:hover {
        background: rgba(255,255,255,0.05);
        border-color: rgba(230, 146, 34, 0.35);
        transform: translateY(-1px);
      }

      .ww-nav-icon {
        width: 54px;
        height: 54px;
        border-radius: 10px;
        background: linear-gradient(180deg, #c8d7e3 0%, #92a9bc 100%);
        color: #243848;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        font-weight: 700;
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.35);
      }

      .ww-nav-label {
        font-size: 13px;
        letter-spacing: 0.16em;
        font-weight: 700;
        text-transform: uppercase;
      }

      .ww-main {
        padding: 38px 46px 40px;
        display: grid;
        grid-template-columns: minmax(480px, 1fr) 352px;
        gap: 34px;
        align-items: start;
      }

      .ww-meta {
        color: #aeb9c5;
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 0.28em;
        margin-bottom: 22px;
      }

      .ww-title {
        margin: 0 0 22px;
        color: #f19a2a;
        font-size: 58px;
        line-height: 0.95;
        font-weight: 800;
        letter-spacing: -0.03em;
        text-transform: uppercase;
      }

      .ww-org-name {
        margin: 0 0 34px;
        color: #d9e1e8;
        font-size: 20px;
        font-weight: 700;
      }

      .ww-intro {
        margin: 0 0 28px;
        color: #d8dde3;
        font-size: 19px;
        line-height: 1.55;
        font-style: italic;
      }

      .ww-card {
        background: linear-gradient(180deg, rgba(26, 38, 53, 0.78) 0%, rgba(9, 19, 31, 0.78) 100%);
        border: 1px solid rgba(255, 255, 255, 0.10);
        border-radius: 18px;
        padding: 24px 28px;
        box-shadow: 0 18px 40px rgba(0, 0, 0, 0.22);
        margin-bottom: 22px;
      }

      .ww-card-title {
        margin: 0 0 14px;
        color: #cbd3db;
        font-size: 16px;
        font-weight: 800;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        padding-bottom: 14px;
        border-bottom: 1px solid rgba(255,255,255,0.12);
      }

      .ww-card p {
        margin: 0 0 18px;
        color: #dbe1e6;
        font-size: 17px;
        line-height: 1.7;
      }

      .ww-card p:last-child {
        margin-bottom: 0;
      }

      .ww-right {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .ww-actions {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 12px;
      }

      .ww-signal {
        width: 176px;
        border: 2px solid #df8c27;
        border-radius: 20px;
        padding: 14px 16px;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        color: #c2cad4;
        background: rgba(255,255,255,0.04);
      }

      .ww-signal-label {
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        align-self: center;
      }

      .ww-bars {
        display: flex;
        align-items: flex-end;
        gap: 6px;
        height: 58px;
      }

      .ww-bar {
        width: 12px;
        border-radius: 5px;
        background: rgba(193, 202, 212, 0.75);
      }

      .ww-bar-1 { height: 56px; }
      .ww-bar-2 { height: 56px; }
      .ww-bar-3 { height: 24px; }
      .ww-bar-4 { height: 38px; }
      .ww-bar-5 { height: 54px; }

      .ww-action-link {
        min-width: 176px;
        text-align: center;
        border: 1px solid #df8c27;
        color: #f2f4f6;
        border-radius: 12px;
        padding: 12px 16px;
        font-size: 14px;
        font-weight: 800;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        background: rgba(255,255,255,0.03);
        cursor: pointer;
        font: inherit;
      }

      .ww-action-link:hover {
        background: rgba(223, 140, 39, 0.10);
      }

      .ww-solve-card {
        margin-top: 72px;
        background: linear-gradient(180deg, #f1ede5 0%, #e8e0d5 100%);
        color: #1f2d3b;
        border-radius: 18px;
        border: 1px solid rgba(223, 140, 39, 0.65);
        padding: 42px 28px 36px;
        box-shadow: 0 24px 44px rgba(0, 0, 0, 0.22);
        text-align: center;
      }

      .ww-solve-title {
        margin: 0 0 20px;
        font-size: 16px;
        font-weight: 800;
        letter-spacing: 0.16em;
        text-transform: uppercase;
      }

      .ww-solve-intro {
        margin: 0 0 34px;
        color: #263545;
        font-size: 18px;
        line-height: 1.45;
      }

      .ww-solve-button {
        display: inline-block;
        width: 100%;
        padding: 18px 18px;
        border-radius: 10px;
        background: linear-gradient(180deg, #263a50 0%, #1d2f42 100%);
        color: #f4f0e7;
        font-size: 16px;
        font-weight: 800;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        box-shadow: 0 12px 24px rgba(18, 28, 40, 0.26);
        margin-bottom: 34px;
        cursor: pointer;
        border: 0;
      }

      .ww-solve-button:hover {
        transform: translateY(-1px);
      }

      .ww-solve-footer {
        color: #6c737b;
        font-size: 16px;
        line-height: 1.55;
      }

      .ww-legal-row {
        display: flex;
        justify-content: flex-start;
        margin-top: 4px;
      }

      .ww-legal-link {
        color: #c4cbd3;
        font-size: 14px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        border-bottom: 1px solid rgba(196, 203, 211, 0.4);
        padding-bottom: 2px;
        background: transparent;
        border-top: 0;
        border-left: 0;
        border-right: 0;
        cursor: pointer;
        font: inherit;
      }

      .ww-legal-link:hover {
        color: #f0f2f4;
        border-color: rgba(240, 242, 244, 0.8);
      }

      @media (max-width: 1100px) {
        .ww-main {
          grid-template-columns: 1fr;
        }

        .ww-solve-card {
          margin-top: 12px;
        }

        .ww-actions {
          align-items: flex-start;
        }
      }

      @media (max-width: 760px) {
        .ww-shell {
          grid-template-columns: 1fr;
        }

        .ww-sidebar {
          border-right: 0;
          border-bottom: 1px solid rgba(230, 146, 34, 0.65);
          flex-direction: column;
          align-items: center;
          padding: 22px 18px;
        }

        .ww-nav {
          flex-direction: row;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .ww-main {
          padding: 26px 20px 32px;
        }

        .ww-title {
          font-size: 44px;
        }

        .ww-action-link,
        .ww-signal {
          min-width: 0;
          width: 100%;
        }
      }
    </style>

    <div class="ww-shell">
      <aside class="ww-sidebar">
        <div class="ww-brand">
          <div class="ww-brand-mark">WW</div>
          <div class="ww-brand-name">Winter<br>Word</div>
        </div>

        <nav class="ww-nav" aria-label="Main">
          <button class="ww-nav-link" id="navClues" type="button">
            <div class="ww-nav-icon">•••</div>
            <div class="ww-nav-label">Clues</div>
          </button>

          <button class="ww-nav-link" id="navLifeline" type="button">
            <div class="ww-nav-icon">?</div>
            <div class="ww-nav-label">Lifeline</div>
          </button>

          <button class="ww-nav-link" id="navLeaderboard" type="button">
            <div class="ww-nav-icon">↑</div>
            <div class="ww-nav-label">Leader</div>
          </button>
        </nav>
      </aside>

      <main class="ww-main">
        <section class="ww-left">
          <div class="ww-meta">${seasonLabel}</div>
          <h1 class="ww-title">Base Station</h1>
          <p class="ww-org-name">${orgName}</p>
          <p class="ww-intro">${introLine1}<br>${introLine2}</p>

          <section class="ww-card">
            <h2 class="ww-card-title">${howTitle}</h2>
            ${howHtml}
          </section>

          <section class="ww-card">
            <h2 class="ww-card-title">${updatesTitle}</h2>
            <p>${updatesText}</p>
          </section>

          <div class="ww-legal-row">
            <button class="ww-legal-link" id="legalLink" type="button">Legal</button>
          </div>
        </section>

        <aside class="ww-right">
          <div class="ww-actions">
            <div class="ww-signal">
              <div class="ww-signal-label">Signal</div>
              <div class="ww-bars" aria-hidden="true">
                <div class="ww-bar ww-bar-1"></div>
                <div class="ww-bar ww-bar-2"></div>
                <div class="ww-bar ww-bar-3"></div>
                <div class="ww-bar ww-bar-4"></div>
                <div class="ww-bar ww-bar-5"></div>
              </div>
            </div>

            <a class="ww-action-link" href="mailto:fix@cluehouse.co.nz?subject=WinterWord%20Problem">Report a Problem</a>
            <a class="ww-action-link" href="mailto:opt@cluehouse.co.nz?subject=Subscribe%20to%20WinterWord">Subscribe</a>
          </div>

          <section class="ww-solve-card">
            <h2 class="ww-solve-title">${solveTitle}</h2>
            <p class="ww-solve-intro">${solveIntro}</p>
            <a class="ww-solve-button" href="mailto:key@cluehouse.co.nz?subject=FINAL%20Winterword%20Submission%20-%20Endgame%20-%202026">${solveButtonLabel}</a>
            <div class="ww-solve-footer">
              <div>${solveFooter1}</div>
              <div>${solveFooter2}</div>
              <div>${solveFooter3}</div>
            </div>
          </section>
        </aside>
      </main>
    </div>
  `;

  document.getElementById("navClues").addEventListener("click", function () {
    navigate("clues");
  });

  document.getElementById("navLifeline").addEventListener("click", function () {
    navigate("lifeline");
  });

  document.getElementById("navLeaderboard").addEventListener("click", function () {
    navigate("leaderboard");
  });

  document.getElementById("legalLink").addEventListener("click", function () {
    navigate("legal");
  });
}
