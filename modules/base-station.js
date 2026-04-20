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
    .map(p => `<p>${esc(p)}</p>`)
    .join("");

  const lifelineTitle = lifelineAvailable
    ? "Open Lifeline"
    : `Lifeline unlocks at clue ${lifelineUnlockClue}`;

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
        cursor: pointer;
        text-align: center;
        border-radius: 8px;
        font: inherit;
      }

      .nav-btn:hover {
        background: #18344d;
      }

      .nav-btn.locked {
        background: #1a1f26;
        border-color: #4b5563;
        color: #9ca3af;
        cursor: not-allowed;
        opacity: 0.7;
      }

      .nav-btn.locked:hover {
        background: #1a1f26;
      }

      .main {
        padding: 40px;
      }

      .title {
        font-size: 48px;
        color: #f19a2a;
        margin: 0 0 10px;
      }

      .org {
        margin-bottom: 20px;
      }

      .card {
        background: #0f1f2f;
        padding: 20px;
        margin-bottom: 20px;
        border: 1px solid #333;
        border-radius: 12px;
      }

      .actions {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .link-btn {
        padding: 12px;
        border: 1px solid #c87b2a;
        text-align: center;
        border-radius: 8px;
      }

      .lifeline-wrap {
        position: relative;
      }

      .lifeline-tip {
        position: absolute;
        left: calc(100% + 10px);
        top: 50%;
        transform: translateY(-50%);
        background: #111827;
        color: #fff;
        border: 1px solid #4b5563;
        border-radius: 8px;
        padding: 8px 10px;
        white-space: nowrap;
        font-size: 12px;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.15s ease;
        z-index: 20;
      }

      .lifeline-wrap:hover .lifeline-tip {
        opacity: 1;
      }

      @media (max-width: 900px) {
        .wrap {
          grid-template-columns: 1fr;
        }

        .side {
          border-right: 0;
          border-bottom: 1px solid #c87b2a;
        }

        .lifeline-tip {
          left: 0;
          top: calc(100% + 8px);
          transform: none;
          white-space: normal;
          width: 220px;
        }
      }
    </style>

    <div class="wrap">
      <div class="side">
        <button class="nav-btn" id="clues" type="button">Clues</button>

        <div class="lifeline-wrap">
          <button
            class="nav-btn ${lifelineAvailable ? "" : "locked"}"
            id="lifeline"
            type="button"
            title="${esc(lifelineTitle)}"
            ${lifelineAvailable ? "" : "disabled"}
          >
            Lifeline
          </button>
          ${
            lifelineAvailable
              ? ""
              : `<div class="lifeline-tip">Available after clue ${esc(lifelineUnlockClue)} is released.</div>`
          }
        </div>

        <button class="nav-btn" id="leaderboard" type="button">Leaderboard</button>
      </div>

      <div class="main">
        <div>${esc(seasonLabel)}</div>
        <h1 class="title">Base Station</h1>
        <div class="org">${esc(orgName)}</div>

        <p>${esc(introLine1)}<br>${esc(introLine2)}</p>

        <div class="card">
          <strong>HOW THIS WORKS</strong>
          ${howHtml}
        </div>

        <div class="card">
          <strong>UPDATES</strong>
          <p>${esc(updatesText)}</p>
        </div>

        <div class="card">
          <strong>PROGRESS</strong>
          <p>${currentClue} / ${totalClues} clues unlocked</p>
        </div>

        <div class="actions">
          <a class="link-btn" href="mailto:fix@cluehouse.co.nz">Report a Problem</a>
          <a class="link-btn" href="mailto:opt@cluehouse.co.nz">Subscribe</a>
          <a class="link-btn" href="mailto:key@cluehouse.co.nz">Solve WinterWord</a>
          <button class="link-btn" id="legal" type="button">Legal</button>
        </div>
      </div>
    </div>
  `;

  document.getElementById("clues").onclick = () => navigate("clues");
  document.getElementById("leaderboard").onclick = () => navigate("leaderboard");
  document.getElementById("legal").onclick = () => navigate("legal");

  if (lifelineAvailable) {
    document.getElementById("lifeline").onclick = () => navigate("lifeline");
  }
}
