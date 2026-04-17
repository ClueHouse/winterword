(async function () {
  const app = document.getElementById("app");

  function getSlug() {
    const path = window.location.pathname.replace(/^\/|\/$/g, "");
    return path || "testslug";
  }

  async function loadGame(slug) {
    try {
      const res = await fetch(`/data/${slug}.json`);
      if (!res.ok) throw new Error("Game not found");
      return await res.json();
    } catch (e) {
      return null;
    }
  }

  function renderBaseStation(game) {
    app.innerHTML = `
      <h1>${game.org_name}</h1>
      <p>Base Station (ugly)</p>
      <button id="goClues">Go to Clue List</button>
    `;

    document.getElementById("goClues").onclick = () => {
      renderClueList(game);
    };
  }

  function renderClueList(game) {
    app.innerHTML = `
      <h1>Clue List</h1>
      <p>(placeholder)</p>
      <button id="back">Back</button>
    `;

    document.getElementById("back").onclick = () => {
      renderBaseStation(game);
    };
  }

  async function init() {
    const slug = getSlug();
    const game = await loadGame(slug);

    if (!game) {
      app.innerHTML = `<h1>Game not found</h1>`;
      return;
    }

    renderBaseStation(game);
  }

  init();
})();
