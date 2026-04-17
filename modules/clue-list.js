export function renderClueList(app, data, navigate) {
  const {
    totalClues = 12,
    currentClue = 0
  } = data || {};

  function esc(v) {
    return String(v ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function buildClues() {
    let html = "";

    for (let i = 1; i <= totalClues; i++) {
      const unlocked = i <= currentClue;

      html += `
        <button class="clue ${unlocked ? "open" : "locked"}" data-id="${i}">
          <div class="clue-num">${pad(i)}</div>
          <div class="clue-state">${unlocked ? "OPEN" : "LOCKED"}</div>
        </button>
      `;
    }

    return html;
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

      .title {
        font-size: 42px;
        margin-bottom: 20px;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 16px;
      }

      .clue {
        padding: 20px;
        border: 1px solid #444;
        background: #111;
        color: #fff;
        cursor: pointer;
      }

      .clue.open {
        border-color: #f19a2a;
        background: #16283a;
      }

      .clue.locked {
        opacity: 0.5;
        cursor: default;
      }

      .clue-num {
        font-size: 20px;
        font-weight: bold;
      }

      .clue-state {
        font-size: 12px;
        margin-top: 6px;
      }

      .topbar {
        margin-bottom: 20px;
      }

      .back {
        padding: 10px 16px;
        cursor: pointer;
      }
    </style>

    <div class="wrap">
      <div class="topbar">
        <button class="back" id="back">← Base Station</button>
      </div>

      <h1 class="title">Clue List</h1>

      <div class="grid">
        ${buildClues()}
      </div>
    </div>
  `;

  document.getElementById("back").onclick = () => navigate("base-station");

  document.querySelectorAll(".clue.open").forEach(el => {
    el.onclick = () => {
      const id = el.getAttribute("data-id");
      navigate("clue", { id });
    };
  });
}
