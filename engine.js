import { renderBaseStation } from "/modules/base-station.js";
import { renderClueList } from "/modules/clue-list.js";

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

  function navigate(pageName) {
    switch (pageName) {
      case "base-station":
        renderBaseStation(app, game, navigate);
        break;

      case "clues":
        renderPlaceholder("Clue List");
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
