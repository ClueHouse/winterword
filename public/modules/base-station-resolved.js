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
  top: 10%;
  left: 5.9%;
  width: 32%;
  font-size: clamp(2rem, 3.75vw, 4.15rem);
  line-height: 0.94;
  font-weight: 400;
  letter-spacing: 0.02em;
  color: #282828;
  text-align: center;
}

.ww-resolved-status {
  position: absolute;
  top: 21.8%;
  left: 11.4%;
  width: 22%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: clamp(0.68rem, 0.92vw, 0.92rem);
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
  top: 28.8%;
  left: 5.2%;
  width: 32%;
  height: 43.5%;
  padding: 1.85% 1.7%;
  border: 1px solid rgba(120, 95, 58, 0.22);
  border-radius: 10px;
  background: rgba(255, 252, 244, 0.24);
  color: #222;
}

.ww-card-title {
  margin: 0 0 1.1rem;
  padding-bottom: 1.05rem;
  border-bottom: 1px solid rgba(184, 138, 61, 0.8);
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: clamp(0.54rem, 0.72vw, 0.8rem);
  font-weight: 900;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  line-height: 1.6;
}

.ww-card p {
  margin: 0 0 1rem;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: clamp(0.62rem, 0.82vw, 0.9rem);
  line-height: 1.66;
}

.ww-final {
  margin-top: 1.25rem;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: clamp(0.66rem, 0.86vw, 0.95rem);
  font-weight: 900;
  line-height: 1.6;
}

.ww-final em {
  font-style: italic;
  font-weight: 900;
}

.ww-buttons {
  position: absolute;
  left: 5.2%;
  bottom: 16.2%;
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

.ww-tooltip-wrap {
  position: relative;
  display: inline-flex;
}

.ww-tooltip-wrap::after {
  content: attr(data-tooltip);
  position: absolute;
  left: 50%;
  bottom: calc(100% + 0.75rem);
  transform: translateX(-50%);
  width: max-content;
  max-width: 17rem;
  padding: 0.7rem 0.85rem;
  border-radius: 0.8rem;
  background: rgba(255, 252, 244, 0.96);
  border: 1px solid rgba(198, 154, 74, 0.55);
  box-shadow: 0 10px 24px rgba(72, 52, 20, 0.16);
  color: #1f1f1f;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  line-height: 1.45;
  letter-spacing: 0.02em;
  text-transform: none;
  text-align: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
  z-index: 20;
}

.ww-tooltip-wrap::before {
  content: "";
  position: absolute;
  left: 50%;
  bottom: calc(100% + 0.35rem);
  transform: translateX(-50%);
  border: 0.42rem solid transparent;
  border-top-color: rgba(255, 252, 244, 0.96);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
  z-index: 21;
}

.ww-tooltip-wrap:hover::after,
.ww-tooltip-wrap:hover::before,
.ww-tooltip-wrap:focus-within::after,
.ww-tooltip-wrap:focus-within::before {
  opacity: 1;
}

.ww-tooltip-wrap:hover::after,
.ww-tooltip-wrap:focus-within::after {
  transform: translateX(-50%) translateY(-0.15rem);
}

@media (max-width: 900px) {
  .ww-resolved-page {
    min-height: 100svh;
    background-position: center;
  }

  .ww-resolved-title {
    top: 8%;
    left: 6%;
    width: 88%;
    font-size: 3rem;
  }

  .ww-resolved-status {
    top: 18%;
    left: 8%;
    width: 60%;
  }

  .ww-card {
    position: relative;
    top: auto;
    left: auto;
    width: calc(100% - 2rem);
    height: auto;
    margin: 15rem 1rem 0;
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

  .ww-button,
  .ww-tooltip-wrap {
    width: 100%;
  }

  .ww-tooltip-wrap::after {
    width: calc(100vw - 3rem);
    max-width: none;
  }
}
</style>

<div class="ww-resolved-page">
  <h1 class="ww-resolved-title">WINTERWORD</h1>

  <div class="ww-resolved-status">Resolved</div>

  <section class="ww-card">
    <h2 class="ww-card-title">${esc(idLine)}</h2>
    ${resolvedParagraphs}
    <p class="ww-final">${esc(finalLead)} <em>${esc(finalEmphasis)}</em></p>
  </section>

  <div class="ww-buttons">
    <button class="ww-button ww-button-primary" id="wwAnswersButton" type="button">View Answers</button>
    <button class="ww-button" id="wwLeaderboardButton" type="button">View Leaderboard</button>
    <span class="ww-tooltip-wrap" data-tooltip="Offer your thoughts on the path behind you. Your reflections help shape what comes next.">
      <a class="ww-button" href="mailto:say@cluehouse.co.nz?subject=WinterWord%20Afterword">Afterword</a>
    </span>
  </div>
</div>
`;

  const answersButton = app.querySelector("#wwAnswersButton");
  const leaderboardButton = app.querySelector("#wwLeaderboardButton");

  if (answersButton && typeof navigate === "function") {
    answersButton.addEventListener("click", () => {
      navigate("answers");
    });
  }

  if (leaderboardButton && typeof navigate === "function") {
    leaderboardButton.addEventListener("click", () => {
      navigate("leaderboard");
    });
  }
}
