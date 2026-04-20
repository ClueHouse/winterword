export function renderBaseStation(app, data, navigate) {
  const {
    orgName = "WinterWord",
    seasonLabel = "WINTERWORD • 2026",
    introLine1 = "A letter per week from a wintry scroll,",
    introLine2 = "Piece them together — reveal the whole.",
    howParagraphs = [],
    updatesText = "No updates yet.",
    currentClue = 0,
    totalClues = 12,
    lifelineAvailable = false,
    lifelineUnlockClue = 6
  } = data || {};

  function esc(v) {
    return String(v ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  const howHtml = (howParagraphs.length ? howParagraphs : [
    "Each week, a new clue unlocks — revealing a single letter.",
    "Together, they form the WinterWord.",
    "One guess only."
  ])
    .map((p) => `<p>${esc(p)}</p>`)
    .join("");

  // 🔴 TEST STRING ADDED HERE
  const lifelineLockedHTML = `
    <div class="nav-btn locked">
      LOCKED LIFELINE TEST
      <div class="lifeline-tip">Not yet available.</div>
    </div>
  `;

  const lifelineActiveHTML = `
    <button class="nav-btn" id="lifeline" type="button">
      Lifeline
    </button>
  `;

  app.innerHTML = `
    <style>
      body {
        margin: 0;
        font-family: Arial, sans-serif;
        background: #0b1724;
        color: #fff;
      }

      .wrap {
        display: grid;
        grid-template-columns: 180px 1fr;
        min-height: 100vh;
      }

      .side {
        background: #08131f;
        padding: 20px;
        border-right: 1px solid #c87b2a;
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .nav-btn {
        padding: 12px;
        background: #12283b;
        border: 1px solid #c87b2a;
        color: #fff;
        text-align: center;
        border-radius: 8px;
        font: inherit;
      }

      .nav-btn.locked {
        background: #1a1f26;
        border-color: #4b5563;
        color: #9ca3af;
        opacity: 0.6;
        cursor: default;
        position: relative;
      }

      .nav-btn.locked:hover .lifeline-tip {
        opacity: 1;
      }

      .lifeline-tip {
        position: absolute;
        left: calc(100% + 10px);
        top: 50%;
        transform: translateY(-50%);
        background: #111827;
        border: 1px solid #4b5563;
        padding: 6px 10px;
        border-radius: 6px;
        font-size: 12px;
        opacity: 0;
        transition: 0.2s;
        white-space: nowrap;
      }

      .main {
        padding: 40px;
      }
    </style>

    <div class="wrap">
      <div class="side">
        <button class="nav-btn" id="clues">Clues</button>

        ${lifelineAvailable ? lifelineActiveHTML : lifelineLockedHTML}

        <button class="nav-btn" id="leaderboard">Leaderboard</button>
      </div>

      <div class="main">
        <div>${esc(seasonLabel)}</div>
        <h1>Base Station</h1>
        <div>${esc(orgName)}</div>

        <p>${esc(introLine1)}<br>${esc(introLine2)}</p>

        <div>
          <strong>HOW THIS WORKS</strong>
          ${howHtml}
        </div>

        <div>
          <strong>UPDATES</strong>
          <p>${esc(updatesText)}</p>
        </div>
      </div>
    </div>
  `;

  const cluesBtn = app.querySelector("#clues");
  const lifelineBtn = app.querySelector("#lifeline");
  const leaderboardBtn = app.querySelector("#leaderboard");

  if (cluesBtn) cluesBtn.onclick = () => navigate("clues");
  if (leaderboardBtn) leaderboardBtn.onclick = () => navigate("leaderboard");

  if (lifelineBtn) {
    lifelineBtn.onclick = () => navigate("lifeline");
  }
}
