import { renderBaseStation } from "/modules/base-station.js";
import { renderClueList } from "/modules/clue-list.js";
import { renderCluePage } from "/modules/clue-page.js";
import { renderAnswerPage } from "/modules/answer-page.js";
import { renderLifelinePage } from "/modules/lifeline.js";

(async function () {
  const app = document.getElementById("app");

  function getSlug() {
    const path = window.location.pathname.replace(/^\/|\/$/g, "");
    return path || "testslug";
  }

  async function loadOrgState(slug) {
    try {
      const res = await fetch(`/api/org-state?slug=${encodeURIComponent(slug)}`, {
        cache: "no-store"
      });

      if (!res.ok) {
        throw new Error(`Org state failed: ${res.status}`);
      }

      return await res.json();
    } catch (error) {
      return null;
    }
  }

  async function loadGame(slug) {
    try {
      const res = await fetch(`/data/${slug}.json`, {
        cache: "no-store"
      });

      if (!res.ok) {
        throw new Error("Game not found");
      }

      return await res.json();
    } catch (error) {
      return null;
    }
  }

  function renderPlaceholder(title) {
    app.innerHTML = `
      <div style="
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 40px;
        font-family: Arial, sans-serif;
        background: #111;
        color: #fff;
        text-align: center;
      ">
        <div>
          <h1 style="margin: 0 0 16px; font-size: 42px;">${title}</h1>
          <p style="margin: 0 0 24px; font-size: 18px; color: #ccc;">Placeholder page</p>
          <button id="goBase" style="
            padding: 12px 20px;
            font-size: 16px;
            cursor: pointer;
            border: 0;
            border-radius: 8px;
          ">Back to Base Station</button>
        </div>
      </div>
    `;

    document.getElementById("goBase").addEventListener("click", function () {
      navigate("base-station");
    });
  }

  function renderError(title, message) {
    app.innerHTML = `
      <div style="
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 40px;
        font-family: Arial, sans-serif;
        background: #111;
        color: #fff;
        text-align: center;
      ">
        <div>
          <h1 style="margin: 0 0 16px; font-size: 42px;">${title}</h1>
          <p style="margin: 0; font-size: 18px; color: #ccc;">${message}</p>
        </div>
      </div>
    `;
  }

  const slug = getSlug();
  const orgState = await loadOrgState(slug);

  if (!orgState || !orgState.ok) {
    renderError("Organisation not found", "No Airtable state could be loaded.");
    return;
  }

  if (!orgState.is_visible) {
    renderError("Unavailable", "This WinterWord is not currently visible.");
    return;
  }

  const game = await loadGame(slug);

  if (!game) {
    renderError("Game not found", "No game data could be loaded.");
    return;
  }

  const currentClue = Number(orgState.current_clue || 0);
  const seasonState = orgState.season_state || "pre";
  const totalClues = Number(orgState.total_clues || game.total_clues || 12);

  const lifelineUnlockClue = Number(game.lifeline_unlock_clue || 6);
  const lifelineAvailable = seasonState === "complete" || currentClue >= lifelineUnlockClue;

  if (seasonState === "tech_diff") {
    renderError("Technical Difficulties", "Please try again a little later.");
    return;
  }

  function getClueById(id) {
    const clueId = Number(id) || 1;
    const clues = Array.isArray(game.clues) ? game.clues : [];

    const found = clues.find(function (item) {
      return Number(item.id) === clueId;
    });

    return {
      id: clueId,
      title: found && found.title ? found.title : `Clue ${String(clueId).padStart(2, "0")}`,
      body: found && found.body ? found.body : "No clue content yet.",
      image: found && found.image ? found.image : "",
      audio: found && found.audio ? found.audio : "",
      unlocked: clueId <= currentClue
    };
  }

  function getAnswerById(id) {
    const clueId = Number(id) || 1;
    const answers = Array.isArray(game.answers) ? game.answers : [];

    const found = answers.find(function (item) {
      return Number(item.id) === clueId;
    });

    const answersUnlocked = seasonState === "complete";

    return {
      id: clueId,
      title: found && found.title ? found.title : `Answer ${String(clueId).padStart(2, "0")}`,
      body: found && found.body ? found.body : "No answer content yet.",
      image: found && found.image ? found.image : "",
      audio: found && found.audio ? found.audio : "",
      letter: found && found.letter ? found.letter : "",
      unlocked: answersUnlocked && clueId <= currentClue
    };
  }

  function navigate(pageName, options = {}) {
    switch (pageName) {
      case "base-station":
        renderBaseStation(app, {
          orgName: orgState.org_name || game.org_name,
          seasonLabel: game.season_label,
          introLine1: game.base_station_intro_line_1,
          introLine2: game.base_station_intro_line_2,
          howParagraphs: game.how_it_works_paragraphs,
          updatesText: orgState.updates_content || game.updates_text,
          currentClue: currentClue,
          totalClues: totalClues,
          seasonState: seasonState
        }, navigate);
        break;

      case "clues":
        renderClueList(app, {
          currentClue: currentClue,
          totalClues: totalClues
        }, navigate);
        break;

      case "clue": {
        const clueId = Number(options.id) || 1;

        if (clueId > currentClue) {
          navigate("clues");
          return;
        }

        renderCluePage(app, {
          clueId: clueId,
          totalClues: totalClues,
          clue: getClueById(clueId)
        }, navigate);
        break;
      }

      case "answer": {
        const answerId = Number(options.id) || 1;
        const answer = getAnswerById(answerId);

        if (!answer.unlocked) {
          navigate("clue", { id: answerId });
          return;
        }

        renderAnswerPage(app, {
          clueId: answerId,
          totalClues: totalClues,
          answer: answer
        }, navigate);
        break;
      }

      case "lifeline":
        renderLifelinePage(app, {
          isAvailable: lifelineAvailable,
          unlockClue: lifelineUnlockClue,
          currentClue: currentClue,
          lifelineTitle: game.lifeline_title || "Need a nudge?",
          lifelineBody: game.lifeline_body || "Your lifeline content goes here."
        }, navigate);
        break;

      case "leaderboard":
        renderPlaceholder("Leaderboard");
        break;

      case "legal":
        renderPlaceholder("Legal");
        break;

      default:
        renderPlaceholder("Page Not Found");
        break;
    }
  }

  navigate("base-station");
})();
