export function renderLifelinePage(app, data, navigate) {
  const {
    isAvailable = false,
    unlockClue = 6,
    currentClue = 0,
    lifelineTitle = "Lifeline",
    lifelineBody = "No lifeline content yet."
  } = data || {};

  function esc(v) {
    return String(v ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  app.innerHTML = `
    <style>
      body {
        margin: 0;
        font-family: Arial, sans-serif;
        background: #0b1724;
        color: #fff;
      }

      .wrap {
        min-height: 100vh;
        padding: 40px;
      }

      .topbar {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
        margin-bottom: 24px;
      }

      .btn {
        padding: 10px 16px;
        cursor: pointer;
        border: 1px solid #c87b2a;
        background: #12283b;
        color: #fff;
        border-radius: 8px;
        font: inherit;
      }

      .btn:hover {
        background: #18344d;
      }

      .meta {
        color: #b8c6d4;
        font-size: 13px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        margin-bottom: 12px;
      }

      .title {
        font-size: 42px;
        color: #f19a2a;
        margin: 0 0 22px;
      }

      .card {
        background: #0f1f2f;
        padding: 24px;
        border: 1px solid #2c3f52;
        border-radius: 14px;
        margin-bottom: 24px;
      }

      .body {
        font-size: 18px;
        line-height: 1.7;
        color: #e7edf2;
        white-space: pre-wrap;
      }

      .locked {
        background: #2a1616;
        border-color: #6b2a2a;
        color: #ffd6d6;
      }
    </style>

    <div class="wrap">
      <div class="topbar">
        <button class="btn" id="backToBase" type="button">← Base Station</button>
        <button class="btn" id="backToClues" type="button">Clue List</button>
      </div>

      <div class="meta">Support</div>
      <h1 class="title">Lifeline</h1>

      ${
        isAvailable
          ? `
            <div class="card">
              <div class="body"><strong>${esc(lifelineTitle)}</strong>\n\n${esc(lifelineBody)}</div>
            </div>
          `
          : `
            <div class="card locked">
              <div class="body">This lifeline is not available yet.\n\nIt unlocks at clue ${esc(unlockClue)}.\nCurrent unlocked clue: ${esc(currentClue)}.</div>
            </div>
          `
      }
    </div>
  `;

  document.getElementById("backToBase").onclick = () => navigate("base-station");
  document.getElementById("backToClues").onclick = () => navigate("clues");
}
