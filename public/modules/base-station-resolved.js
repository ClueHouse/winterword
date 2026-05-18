export function renderBaseStationResolved(app, data = {}, navigate) {
  const {
    orgName = "",
    seasonLabel = "WINTERWORD • 2026",
    updatesText = "The trail is quiet now: nothing more will fall.\nEverything you need is already in your hands.\nYou can continue solving, or discover the answers now.",
    revealLine1 = "The final word and full solution are ready.",
    revealLine2 = "Reveal the final word when ready.",
    noteTitle = "Signed, sealed, delivered.",
    noteLines = [
      "If you’ve made it here, you already know:",
      "the ending was never just a word.",
      "This winter hit differently —",
      "the warmth was real.",
      "You watched the clues fall, one by one.",
      "Every one of them pointed here."
    ],
    finalLine = "Game over. No. Game complete."
  } = data;

  function esc(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  const safeOrgName = String(orgName || "").trim();

  const seasonParts = String(seasonLabel || "")
    .split("•")
    .map((part) => part.trim())
    .filter(Boolean);

  const leftLabel = seasonParts[0] || "WINTERWORD";
  const yearLabel = seasonParts[1] || "2026";

  const noteHtml = Array.isArray(noteLines)
    ? noteLines.map((line) => `<p>${esc(line)}</p>`).join("")
    : "";

  app.innerHTML = `
<style>
* {
  box-sizing: border-box;
}

.ww-resolved-page {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  font-family: Georgia, "Times New Roman", serif;
  color: #262626;
  background-image: url("/assets/winterword/shared/bsresolvebg.png?v=4");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.ww-resolved-id {
  position: absolute;
  top: 4.2%;
  left: 6.8%;
  width: 52%;
  text-align: left;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: clamp(0.5rem, 0.72vw, 0.78rem);
  font-weight: 800;
  letter-spacing: 0.38em;
  text-transform: uppercase;
  color: #151515;
  white-space: nowrap;
  opacity: 0.88;
}

.ww-resolved-title {
  position: absolute;
  top: 21.4%;
  left: 6.7%;
  width: 28%;
  font-size: clamp(2rem, 3.55vw, 3.95rem);
  line-height: 0.9;
  font-weight: 400;
  letter-spacing: 0.02em;
  color: #282828;
}

.ww-resolved-status {
  position: absolute;
  top: 32.3%;
  left: 14.2%;
  width: 19.4%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: clamp(0.72rem, 1vw, 1rem);
  font-weight: 800;
  letter-spacing: 0.34em;
  text-transform: uppercase;
  color: #b88a3d;
}

.ww-resolved-status::before,
.ww-resolved-status::after {
  content: "";
  height: 1px;
  flex: 1;
  background: #b88a3d;
  opacity: 0.9;
}

.ww-card {
  position: absolute;
  top: 38.8%;
  width: 17.6%;
  height: 39.4%;
  padding: 1.7% 1.35%;
  border: 1px solid rgba(120, 95, 58, 0.22);
  border-radius: 10px;
  background: rgba(255, 252, 244, 0.22);
  color: #222;
}

.ww-card-updates {
  left: 3.5%;
}

.ww-card-note {
  left: 21.9%;
}

.ww-card-title {
  margin: 0 0 1.05rem;
  padding-bottom: 1.1rem;
  border-bottom: 1px solid rgba(184, 138, 61, 0.8);
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: clamp(0.52rem, 0.72vw, 0.78rem);
  font-weight: 900;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.ww-card p {
  margin: 0 0 0.78rem;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: clamp(0.52rem, 0.7vw, 0.78rem);
  line-height: 1.58;
}

.ww-updates-text {
  white-space: pre-line;
}

.ww-note-body p {
  font-style: italic;
}

.ww-note-body .ww-final {
  margin-top: 1rem;
  font-style: normal;
  font-weight: 900;
}

.ww-buttons {
  position: absolute;
  left: 3.8%;
  bottom: 7.9%;
  display: flex;
  gap: 1.05rem;
  align-items: center;
}

.ww-button {
  min-width: 10.6rem;
  height: 2.95rem;
  padding: 0 1.4rem;
  border-radius: 12px;
  border: 1.5px solid #c69a4a;
  background: rgba(255, 252, 244, 0.5);
  color: #1f1f1f;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: clamp(0.56rem, 0.76vw, 0.8rem);
  font-weight: 900;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;
}

.ww-button-primary {
  background: #d8a94f;
  border-color: #d8a94f;
}

.ww-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 18px rgba(114, 79, 25, 0.18);
}

@media (max-width: 900px) {
  .ww-resolved-page {
    min-height: 100svh;
    background-position: center;
  }

  .ww-resolved-id {
    left: 5%;
    width: 90%;
    text-align: left;
    letter-spacing: 0.18em;
  }

  .ww-resolved-title {
    top: 13%;
    left: 6%;
    width: 88%;
    font-size: 3rem;
  }

  .ww-resolved-status {
    top: 22%;
    left: 8%;
    width: 60%;
  }

  .ww-card {
    position: relative;
    top: auto;
    left: auto;
    width: calc(100% - 2rem);
    height: auto;
    margin-left: 1rem;
    margin-right: 1rem;
    padding: 1.2rem;
    background: rgba(255, 252, 244, 0.78);
  }

  .ww-card-updates {
    margin-top: 18rem;
  }

  .ww-card-note {
    margin-top: 1rem;
  }

  .ww-buttons {
    position: relative;
    left: auto;
    bottom: auto;
    margin: 1rem;
    flex-direction: column;
    align-items: stretch;
  }

  .ww-button {
    width: 100%;
  }
}
</style>

<div class="ww-resolved-page">
  <div class="ww-resolved-id">
    ${esc(leftLabel)} • ${esc(yearLabel)} ✧ ${safeOrgName ? esc(safeOrgName) : "BAY OF PLENTY REGIONAL COUNCIL"}
  </div>

  <h1 class="ww-resolved-title">BASE STATION</h1>

  <div class="ww-resolved-status">Resolved</div>

  <section class="ww-card ww-card-updates">
    <h2 class="ww-card-title">Updates</h2>
    <p class="ww-updates-text">${esc(updatesText)}</p>
    <p>${esc(revealLine1)}</p>
    <p>${esc(revealLine2)}</p>
  </section>

  <section class="ww-card ww-card-note">
    <h2 class="ww-card-title">${esc(noteTitle)}</h2>
    <div class="ww-note-body">
      ${noteHtml}
      <p class="ww-final">${esc(finalLine)}</p>
    </div>
  </section>

  <div class="ww-buttons">
    <button class="ww-button ww-button-primary" id="wwAnswersButton" type="button">View Answers</button>
    <button class="ww-button" id="wwLeaderboardButton" type="button">View Leaderboard</button>
    <a class="ww-button" href="mailto:cluehousehq@gmail.com?subject=WinterWord%20Afterword">Afterword</a>
  </div>
</div>
`;

  const answersButton = app.querySelector("#wwAnswersButton");
  const leaderboardButton = app.querySelector("#wwLeaderboardButton");

  if (answersButton) {
    answersButton.addEventListener("click", () => {
      navigate("answers");
    });
  }

  if (leaderboardButton) {
    leaderboardButton.addEventListener("click", () => {
      navigate("leaderboard");
    });
  }
}
