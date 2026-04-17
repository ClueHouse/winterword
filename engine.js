import { renderBaseStation } from "/modules/base-station.js";
import { renderClueList } from "/modules/clue-list.js";
import { renderCluePage } from "/modules/clue-page.js";
import { renderAnswerPage } from "/modules/answer-page.js";

(async function () {
  const app = document.getElementById("app");

  function getSlug() {
    const path = window.location.pathname.replace(/^\/|\/$/g, "");
    return path || "testslug";
  }

  async function loadGame(slug) {
    try {
      const res = await fetch(`/data/${slug}.json`);
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

  function getClueById(id) {
    const clueId = Number(id) || 1;
    const clues = Array.isArray(game.clues) ? game.clues : [];
    const currentClue = game.current_clue || 0;

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
    const currentClue = game.current_clue || 0;

    const found = answers.find(function (item) {
      return Number(item.id) === clueId;
    });

    return {
      id: clueId,
      title: found && found.title ? found.title : `Answer ${String(clueId).padStart(2, "0")}`,
      body: found && found.body ? found.body : "No answer content yet.",
      image: found && found.image ? found.image : "",
      audio: found && found.audio ? found.audio : "",
      letter: found && found.letter ? found.letter : "",
      unlocked: clueId <= currentClue
    };
  }

  function navigate(pageName, options = {}) {
    switch (pageName) {
      case "base-station":
        renderBaseStation(app, {
          orgName: game.org_name,
          seasonLabel: game.season_label,
          introLine1: game.base_station_intro_line_1,
          introLine2: game.base_station_intro_line_2,
          howParagraphs: game.how_it_works_paragraphs,
          updatesText: game.updates_text,
          currentClue: game.current_clue || 0,
          totalClues: game.total_clues || 12
        }, navigate);
        break;

      case "clues":
        renderClueList(app, {
          currentClue: game.current_clue || 0,
          totalClues: game.total_clues || 12
        }, navigate);
        break;

      case "clue":
        renderCluePage(app, {
          clueId: Number(options.id) || 1,
          totalClues: game.total_clues || 12,
          clue: getClueById(options.id)
        }, navigate);
        break;

      case "answer":
        renderAnswerPage(app, {
          clueId: Number(options.id) || 1,
          totalClues: game.total_clues || 12,
          answer: getAnswerById(options.id)
        }, navigate);
        break;

      case "lifeline":
        renderPlaceholder("Lifeline");
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

  const slug = getSlug();
  const game = await loadGame(slug);

  if (!game) {
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
          <h1 style="margin: 0 0 16px; font-size: 42px;">Game not found</h1>
          <p style="margin: 0; font-size: 18px; color: #ccc;">No game data could be loaded.</p>
        </div>
      </div>
    `;
    return;
  }

  navigate("base-station");
})();
