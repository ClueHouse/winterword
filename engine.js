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

  function parseFrequency(freq) {
    if (freq === "weekly") return 7 * 24 * 60 * 60 * 1000;
    if (freq === "hourly") return 60 * 60 * 1000;
    if (freq === "quarter_hourly") return 15 * 60 * 1000;
    if (freq === "daily_weekdays") return 24 * 60 * 60 * 1000;
    return 7 * 24 * 60 * 60 * 1000;
  }

  function calculateCurrentClue(orgState) {
    if (!orgState) return 0;

    if (orgState.current_clue_override !== null && orgState.current_clue_override !== undefined && orgState.current_clue_override !== "") {
      const overridden = Number(orgState.current_clue_override);
      if (!Number.isNaN(overridden)) {
        return Math.max(0, Math.min(overridden, orgState.total_clues || 12));
      }
    }

    if (!orgState.season_start) return 0;

    const startMs = new Date(orgState.season_start).getTime();
    if (Number.isNaN(startMs)) return 0;

    const nowMs = Date.now();

    if (nowMs < startMs) return 0;

    const totalClues = orgState.total_clues || 12;

    if (orgState.drop_frequency === "daily_weekdays") {
      let clueCount = 0;
      let cursor = new Date(startMs);

      while (cursor.getTime() <= nowMs && clueCount < totalClues) {
        const day = cursor.getDay();
        if (day !== 0 && day !== 6) {
          clueCount += 1;
        }
        cursor.setDate(cursor.getDate() + 1);
      }

      return Math.max(0, Math.min(clueCount, totalClues));
    }

    const freqMs = parseFrequency(orgState.drop_frequency);
    const diffMs = nowMs - startMs;
    const clueNumber = Math.floor(diffMs / freqMs) + 1;

    return Math.max(0, Math.min(clueNumber, totalClues));
  }

  function getSeasonState(orgState, currentClue) {
    if (!orgState) return "unavailable";
    if (!orgState.is_visible) return "hidden";
    if (orgState.status === "paused") return "paused";
    if (orgState.status === "tech_diff") return "tech_diff";
    if (orgState.status === "complete") return "complete";

    if (orgState.season_end) {
      const endMs = new Date(orgState.season_end).getTime();
      if (!Number.isNaN(endMs) && Date.now() > endMs) {
        return "complete";
      }
    }

    if (currentClue <= 0) return "pre";
    return "live";
  }

  function getClueById(id, game, currentClue) {
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

  function getAnswerById(id, game, currentClue) {
    const clueId = Number(id) || 1;
    const answers = Array.isArray(game.answers) ? game.answers : [];

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

  const currentClue = calculateCurrentClue(orgState);
  const seasonState = getSeasonState(orgState, currentClue);

  if (seasonState === "tech_diff") {
    renderError("Technical Difficulties", "Please try again a little later.");
    return;
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
          totalClues: orgState.total_clues || game.total_clues || 12,
          seasonState: seasonState
        }, navigate);
        break;

      case "clues":
        renderClueList(app, {
          currentClue: currentClue,
          totalClues: orgState.total_clues || game.total_clues || 12
        }, navigate);
        break;

      case "clue":
        renderCluePage(app, {
          clueId: Number(options.id) || 1,
          totalClues: orgState.total_clues || game.total_clues || 12,
          clue: getClueById(options.id, game, currentClue)
        }, navigate);
        break;

      case "answer":
        renderAnswerPage(app, {
          clueId: Number(options.id) || 1,
          totalClues: orgState.total_clues || game.total_clues || 12,
          answer: getAnswerById(options.id, game, currentClue)
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

  navigate("base-station");
})();
