export function renderClueList(app, data, navigate) {
  const {
    totalClues = 12,
    currentClue = 0
  } = data || {};

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function buildClues() {
    let html = "";

    for (let i = 1; i <= totalClues; i++) {
      const unlocked = i <= currentClue;

      html += `
        <button
          class="clue ${unlocked ? "open" : "locked"}"
          data-id="${i}"
          ${unlocked ? "" : "disabled"}
          type="button"
        >
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

      .topbar {
        margin-bottom: 20px;
      }

      .back {
        padding: 10px 16px;
        cursor: pointer;
        border: 1px solid #c87b2a;
        background: #12283b;
        color: #fff;
        border-radius: 8px;
        font: inherit;
      }

      .back:hover {
        background: #18344d;
      }

      .title {
        font-size: 42px;
        margin: 0 0 10px;
        color: #f19a2a;
      }

      .meta {
        margin: 0 0 24px;
        color: #c7d3df;
        font-size: 16px;
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
        border-radius: 10px;
        text-align: left;
        font: inherit;
      }

      .clue.open {
        border-color: #f19a2a;
        background: #16283a;
      }

      .clue.open:hover {
        background: #1c3349;
      }

      .clue.locked {
        opacity: 0.5;
        cursor: not-allowed;
        background: #161616;
        border-color: #333;
      }

      .clue-num {
        font-size: 20px;
        font-weight: bold;
      }

      .clue-state {
        font-size: 12px;
        margin-top: 6px;
        letter-spacing: 0.12em;
      }
    </style>

    <div class="wrap">
      <div class="topbar">
        <button class="back" id="back" type="button">← Base Station</button>
      </div>

      <h1 class="title">Clue List</h1>
      <p class="meta">${currentClue} of ${totalClues} clues unlocked</p>

      <div class="grid">
        ${buildClues()}
      </div>
    </div>
  `;

  document.getElementById("back").onclick = () => navigate("base-station");

  document.querySelectorAll(".clue.open").forEach((el) => {
    el.onclick = () => {
      const id = Number(el.getAttribute("data-id")) || 1;
      navigate("clue", { id });
    };
  });
}
