export function renderBaseStationResolved(app, data = {}, navigate) {
  const {
    orgName = "",
    seasonLabel = "WINTERWORD • 2026",
    resolvedText = "The trail is quiet now: nothing more will fall. Everything you need is already in your hands. You can continue solving, or discover the answers now.\n\nIf you’ve made it here, you already know: the ending was never just a word.\nThis winter hit differently — the warmth was real. Clues fell, one by one, and every single one led you here.\nThe final word is ready. Reveal it when you are.",
    finalLead = "Game over? No.",
    finalEmphasis = "Game complete."
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
  const idLine = `${leftLabel} • ${yearLabel} ✧ ${safeOrgName || "BAY OF PLENTY REGIONAL COUNCIL"}`;

  const resolvedParagraphs = String(resolvedText || "")
    .split(/\n\s*\n/)
    .map((para) => `<p>${esc(para)}</p>`)
    .join("");

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

.ww-resolved-title {
  position: absolute;
  top: 14.8%;
  left: 5.9%;
  width: 32%;
  font-size: clamp(2.2rem, 4.2vw, 4.65rem);
  line-height: 0.94;
  font-weight: 400;
  letter-spacing: 0.02em;
  color: #282828;
  text-align: center;
}

.ww-resolved-status {
  position: absolute;
  top: 27.5%;
  left: 11.4%;
  width: 22%;
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
  top: 34.6%;
  left: 5.1%;
  width: 34.2%;
  height: 42.4%;
  padding: 1.85% 1.7%;
  border: 1px solid rgba(120, 95, 58, 0.22);
  border-radius: 10px;
  background: rgba(255, 252, 244, 0.24);
  color: #222;
}

.ww-card-title {
  margin: 0 0 1.05rem;
  padding-bottom: 1.05rem;
  border-bottom: 1px solid rgba(184, 138, 61, 0.8);
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: clamp(0.5rem, 0.68vw, 0.76rem);
  font-weight: 900;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  line-height: 1.6;
}

.ww-card p {
  margin: 0 0 0.82rem;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: clamp(0.54rem, 0.74vw, 0.82rem);
  line-height: 1.58;
}

.ww-final {
  margin-top: 1.1rem;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: clamp(0.58rem, 0.78vw, 0.86rem);
  font-weight: 900;
  line-height: 1.6;
}

.ww-final em {
  font-style: italic;
  font-weight: 900;
}

.ww-buttons {
  position: absolute;
  left: 5.1%;
  bottom: 9.1%;
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

  .ww-resolved-title {
    top: 10%;
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
    margin: 17rem 1rem 0;
    padding: 1.2rem;
    background: rgba(255, 252, 244, 0.78);
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
  <h1 class="ww-resolved-title">BASE STATION</h1>

  <div class="ww-resolved-status">Resolved</div>

  <section class="ww-card">
    <h2 class="ww-card-title">${esc(idLine)}</h2>
    ${resolvedParagraphs}
    <p class="ww-final">${esc(finalLead)} <em>${esc(finalEmphasis)}</em></p>
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
