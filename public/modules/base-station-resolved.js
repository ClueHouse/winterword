export function renderBaseStationResolved(app, data = {}, navigate) {
  const {
    orgName = "",
    seasonLabel = "WINTERWORD • 2026",
    statusText = "Season Complete",
    tagline = "The frost is lifting, and what was hidden is now uncovered.",
    updatesText = "The trail is quiet now: nothing more will fall.\nEverything you need is already in your hands.\nYou can continue solving, or discover the answers now.",
    revealLine1 = "The final word and full solution are ready.",
    revealLine2 = "Reveal the final word when ready.",
    noteTitle = "Signed, sealed, delivered.",
    noteLines = [
      "If you’ve made it here, you already know: the ending was never just a word.",
      "This winter hit differently — the warmth was real.",
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
  const safeSeasonLabel = esc(seasonLabel);
  const safeStatusText = esc(statusText);
  const safeTagline = esc(tagline);
  const safeUpdatesText = esc(updatesText);
  const safeRevealLine1 = esc(revealLine1);
  const safeRevealLine2 = esc(revealLine2);
  const safeNoteTitle = esc(noteTitle);
  const safeFinalLine = esc(finalLine);

  const noteHtml = Array.isArray(noteLines)
    ? noteLines.map((line) => `<p>${esc(line)}</p>`).join("")
    : "";

  const seasonParts = String(seasonLabel || "")
    .split("•")
    .map((part) => part.trim())
    .filter(Boolean);

  const leftLabel = seasonParts[0] || "WINTERWORD";
  const rightLabel = seasonParts[1] || "2026";

  app.innerHTML = `
<style>
* {
  box-sizing: border-box;
}

.ww-resolved-page {
  min-height: 100vh;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  color: #ffffff;
  background-image:
    radial-gradient(ellipse at center, rgba(255,255,255,0.07), rgba(0,0,0,0.10) 44%, rgba(0,0,0,0.30)),
    linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.08)),
    url("/assets/winterword/shared/basestationresolvebg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 2.4rem 2rem 2.2rem;
}

.ww-resolve-wrap {
  max-width: 78rem;
  margin: 0 auto;
}

.ww-hero {
  margin-top: 1.2rem;
  margin-bottom: 1.2rem;
  padding: 2rem 2rem 2.4rem;
  border-radius: 1.8rem;
  background: rgba(38,40,34,0.54);
  backdrop-filter: blur(12px);
  box-shadow:
    0 30px 80px rgba(0,0,0,0.32),
    inset 0 0 0 1px rgba(255,255,255,0.06);
}

.ww-slug {
  display: flex;
  flex-wrap: wrap;
  gap: .45rem;
  align-items: center;
  font-size: .72rem;
  letter-spacing: .25em;
  text-transform: uppercase;
  font-weight: 900;
  margin: 0 0 .6rem;
}

.ww-title {
  font-size: 3.8rem;
  line-height: 1;
  margin: 0 0 .6rem;
  font-weight: 900;
}

.ww-status-stack {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: .4rem;
  margin-bottom: 2.6rem;
}

.ww-status-line {
  display: inline-flex;
  align-items: center;
  gap: .72rem;
  padding: .78rem 1.18rem;
  border-radius: 999px;
  background: rgba(0,0,0,0.48);
  font-size: .88rem;
  font-weight: 900;
  letter-spacing: .12em;
  margin-bottom: .6rem;
}

.ww-status-dot {
  width: .82rem;
  height: .82rem;
  border-radius: 999px;
  background: #ef8f3a;
}

.ww-tagline {
  margin: 1rem 0 0;
  font-style: italic;
  color: rgba(255,255,255,0.84);
}

.ww-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.1rem;
  margin-top: 1.8rem;
}

.ww-memory,
.ww-card {
  padding: 1.6rem 1.5rem;
  border-radius: 1.6rem;
  background: rgba(255,255,255,0.035);
  border: 1px solid rgba(255,255,255,0.10);
  backdrop-filter: blur(8px);
}

.ww-card {
  background: rgba(38,40,34,0.56);
  backdrop-filter: blur(10px);
}

.ww-memory-label {
  margin: 0 0 1rem;
  font-size: .92rem;
  letter-spacing: .14em;
  text-transform: uppercase;
  font-weight: 900;
  padding-bottom: .55rem;
  border-bottom: 1px solid rgba(255,255,255,0.16);
}

.ww-memory-line {
  font-size: 1rem;
  line-height: 1.75;
  color: rgba(214,221,230,0.78);
  margin: 0 0 .85rem;
  white-space: pre-line;
}

.ww-reveal-copy {
  color: rgba(214,221,230,0.78);
  line-height: 1.75;
}

.ww-reveal-copy p {
  margin: 0 0 .45rem;
}

.ww-main-actions {
  margin-top: 1.2rem;
  display: flex;
  gap: .7rem;
  flex-wrap: wrap;
}

.ww-primary,
.ww-secondary {
  padding: .68rem 1.04rem;
  border-radius: 999px;
  font-size: .7rem;
  font-weight: 900;
  letter-spacing: .14em;
  text-decoration: none;
  border: 0;
  cursor: pointer;
  text-transform: uppercase;
}

.ww-primary {
  background: #ef8f3a;
  color: #fff;
}

.ww-secondary {
  background: #fff;
  color: #222;
}

.ww-note-title {
  margin: 0 0 1rem;
  font-size: 1.08rem;
  font-weight: 900;
}

.ww-note-body {
  font-style: italic;
  line-height: 1.32;
  color: rgba(255,255,255,0.84);
}

.ww-note-body p {
  margin: 0 0 .25rem;
}

.ww-final {
  font-weight: 900;
  color: #fff;
}

@media (max-width: 860px) {
  .ww-grid {
    grid-template-columns: 1fr;
  }

  .ww-title {
    font-size: 2.8rem;
  }

  .ww-hero {
    padding: 1.4rem 1.2rem 1.6rem;
  }

  .ww-resolved-page {
    padding: 1.2rem 1rem 1.4rem;
  }
}
</style>

<div class="ww-resolved-page">
  <div class="ww-resolve-wrap">
    <section class="ww-hero">

      <div class="ww-slug">
        <span>${esc(leftLabel)}</span>
        ${safeOrgName ? `<span>•</span><span>${esc(safeOrgName)}</span>` : ""}
        <span>•</span>
        <span>${esc(rightLabel)}</span>
      </div>

      <h1 class="ww-title">BASE STATION</h1>

      <div class="ww-status-stack">
        <div class="ww-status-line">
          <span class="ww-status-dot"></span>
          <span>${safeStatusText}</span>
        </div>

        <div class="ww-tagline">${safeTagline}</div>
      </div>

      <div class="ww-grid">

        <div class="ww-memory">
          <div class="ww-memory-label">Updates</div>

          <p class="ww-memory-line">${safeUpdatesText}</p>

          <div class="ww-reveal-copy">
            <p>${safeRevealLine1}</p>
            <p>${safeRevealLine2}</p>
          </div>

          <div class="ww-main-actions">
            <button class="ww-primary" id="wwAnswersButton" type="button">View Answers</button>
            <button class="ww-secondary" id="wwLeaderboardButton" type="button">View Leaderboard</button>
            <a class="ww-secondary" href="mailto:cluehousehq@gmail.com?subject=WinterWord%20Afterword">Afterword</a>
          </div>
        </div>

        <div class="ww-card">
          <h3 class="ww-note-title">${safeNoteTitle}</h3>
          <div class="ww-note-body">
            ${noteHtml}
            <p class="ww-final">${safeFinalLine}</p>
          </div>
        </div>

      </div>

    </section>
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
