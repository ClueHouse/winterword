export function renderCluePage(app, data, navigate) {
  const {
    clueId = 1,
    totalClues = 12,
    clue = {}
  } = data || {};

  function esc(v) {
    return String(v ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  const title = clue.title || `Clue ${pad(clueId)}`;
  const body = clue.body || "No clue content yet.";
  const image = clue.image || "";
  const audio = clue.audio || "";
  const isUnlocked = clue.unlocked !== false;

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

      .clue-body {
        font-size: 18px;
        line-height: 1.7;
        color: #e7edf2;
        white-space: pre-wrap;
      }

      .media {
        margin-top: 18px;
      }

      .media img {
        display: block;
        max-width: 100%;
        height: auto;
        border-radius: 12px;
        border: 1px solid #33485c;
      }

      .audio {
        width: 100%;
        margin-top: 18px;
      }

      .footer {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
      }

      .locked {
        background: #2a1616;
        border-color: #6b2a2a;
        color: #ffd6d6;
      }
    </style>

    <div class="wrap">
      <div class="topbar">
        <button class="btn" id="backToClues" type="button">← Clue List</button>
        <button class="btn" id="backToBase" type="button">Base Station</button>
      </div>

      <div class="meta">Clue ${pad(clueId)} of ${pad(totalClues)}</div>
      <h1 class="title">${esc(title)}</h1>

      <div class="card ${isUnlocked ? "" : "locked"}">
        <div class="clue-body">${esc(body)}</div>

        ${image ? `
          <div class="media">
            <img src="${esc(image)}" alt="${esc(title)}">
          </div>
        ` : ""}

        ${audio ? `
          <audio class="audio" controls src="${esc(audio)}"></audio>
        ` : ""}
      </div>

      <div class="footer">
        <button class="btn" id="goAnswer" type="button">Answer Page</button>
      </div>
    </div>
  `;

  document.getElementById("backToClues").onclick = () => navigate("clues");
  document.getElementById("backToBase").onclick = () => navigate("base-station");
  document.getElementById("goAnswer").onclick = () => navigate("answer", { id: clueId });
}
