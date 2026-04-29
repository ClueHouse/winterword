// WinterWord Clean Engine v1
// Full module router: Base Station, Resolve, Welcome, Clues, Answers, Lifeline, Leaderboard, Pop Clue

(async function winterwordEngine() {
  "use strict";

  const MODULE_PATHS = {
    baseStation: "/modules/base-station.js",
    baseStationResolved: "/modules/base-station-resolved.js",
    clueList: "/modules/clue-list.js",
    cluePage: "/modules/clue-page.js",
    answerPage: "/modules/answer-page.js",
    lifeline: "/modules/lifeline.js",
    leaderboard: "/modules/leaderboard.js",
    welcomeIntro: "/modules/welcomeIntro.js"
  };

  const ORG_STATE_ENDPOINT = "/api/org-state";
  const LEADERBOARD_ENDPOINT = "/api/leaderboard";
  const GAME_DATA_PATH = "/data/game.json";

  const app = document.getElementById("app") || document.body;

  function renderError(title, message, detail = "") {
    app.innerHTML = `
      <main style="
        min-height:100vh;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:40px;
        background:#10141b;
        color:#f5f7fb;
        font-family:Arial,sans-serif;
        text-align:center;
        box-sizing:border-box;
      ">
        <section style="max-width:720px;">
          <h1 style="margin:0 0 16px;font-size:42px;">${escapeHtml(title)}</h1>
          <p style="margin:0 0 18px;font-size:18px;line-height:1.55;color:#cfd6df;">${escapeHtml(message)}</p>
          ${
            detail
              ? `<pre style="
                  white-space:pre-wrap;
                  text-align:left;
                  margin:24px auto 0;
                  padding:18px;
                  max-width:680px;
                  border-radius:12px;
                  background:rgba(255,255,255,0.08);
                  color:#f0b36a;
                  font-size:13px;
                  overflow:auto;
                ">${escapeHtml(detail)}</pre>`
              : ""
          }
        </section>
      </main>
    `;
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function getSlug() {
    const path = window.location.pathname
      .replace(/^\/+/, "")
      .replace(/\/+$/, "");

    const firstPart = path.split("/")[0];

    return firstPart || "testslug";
  }

  async function loadJson(url) {
    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`${url} returned ${response.status}`);
    }

    return response.json();
  }

  async function loadOrgState(slug) {
    return loadJson(`${ORG_STATE_ENDPOINT}?slug=${encodeURIComponent(slug)}`);
  }

  async function loadGame() {
    return loadJson(GAME_DATA_PATH);
  }

  async function loadModules() {
    const loaded = {};

    for (const [key, path] of Object.entries(MODULE_PATHS)) {
      try {
        loaded[key] = await import(path);
      } catch (error) {
        throw new Error(`Could not import ${path}\n${error.message}`);
      }
    }

    return loaded;
  }

  function getFrequencyMs(freq) {
    switch (freq) {
      case "quarter_hourly":
        return 15 * 60 * 1000;
      case "hourly":
        return 60 * 60 * 1000;
      case "daily":
        return 24 * 60 * 60 * 1000;
      case "weekly":
        return 7 * 24 * 60 * 60 * 1000;
      default:
        return 7 * 24 * 60 * 60 * 1000;
    }
  }

  function computeResolvedFallback(orgState, totalClues) {
    const seasonStart = orgState?.season_start ? new Date(orgState.season_start) : null;
    const dropFrequency = orgState?.drop_frequency || "weekly";
    const intervalMs = getFrequencyMs(dropFrequency);

    if (!seasonStart || Number.isNaN(seasonStart.getTime())) {
      return false;
    }

    const resolveTime = seasonStart.getTime() + Number(totalClues) * intervalMs;
    return Date.now() >= resolveTime;
  }

  function getWelcomeStorageKey(slug) {
    return `winterword_welcome_seen_${slug}`;
  }

  function hasSeenWelcome(slug) {
    try {
      return window.localStorage.getItem(getWelcomeStorageKey(slug)) === "true";
    } catch {
      return true;
    }
  }

  function markWelcomeSeen(slug) {
    try {
      window.localStorage.setItem(getWelcomeStorageKey(slug), "true");
    } catch {
      // Continue without localStorage.
    }
  }

  function normalisePageName(pageName) {
    const page = String(pageName || "").toLowerCase();

    const aliases = {
      home: "base-station",
      base: "base-station",
      basestation: "base-station",
      "base-station": "base-station",
      "base-station-resolved": "base-station",
      resolve: "base-station",
      resolved: "base-station",

      welcome: "welcome",
      intro: "welcome",

      clues: "clues",
      "clue-list": "clues",
      clue: "clue",

      answers: "answers",
      "answer-list": "answers",
      answer: "answer",

      lifeline: "lifeline",
      leaderboard: "leaderboard",

      pop: "pop-clue",
      "pop-clue": "pop-clue",
      popclue: "pop-clue"
    };

    return aliases[page] || page;
  }

  function getClueById(game, currentClue, id) {
    const clueId = Number(id) || 1;
    const clues = Array.isArray(game.clues) ? game.clues : [];
    const found = clues.find((item) => Number(item.id) === clueId);

    return {
      id: clueId,
      title: found?.title || `Clue ${String(clueId).padStart(2, "0")}`,
      body: found?.body || "No clue content yet.",
      image: found?.image || "",
      audio: found?.audio || "",
      unlocked: clueId <= currentClue
    };
  }

  function getAnswerById(game, isResolved, totalClues, id) {
    const clueId = Number(id) || 1;
    const answers = Array.isArray(game.answers) ? game.answers : [];
    const found = answers.find((item) => Number(item.id) === clueId);

    return {
      id: clueId,
      title: found?.title || `Answer ${String(clueId).padStart(2, "0")}`,
      body: found?.body || "No answer content yet.",
      image: found?.image || "",
      audio: found?.audio || "",
      letter: found?.letter || "",
      unlocked: isResolved && clueId <= totalClues
    };
  }

  function renderAnswerList(app, data, navigate) {
    const totalClues = Number(data.totalClues || 12);

    app.innerHTML = `
      <main style="
        min-height:100vh;
        background:#10141b;
        color:#f5f7fb;
        font-family:Arial,sans-serif;
        padding:42px 24px;
        box-sizing:border-box;
      ">
        <section style="max-width:860px;margin:0 auto;">
          <button
            type="button"
            id="wwBackToBase"
            style="
              margin:0 0 28px;
              border:1px solid rgba(255,255,255,0.22);
              background:rgba(255,255,255,0.08);
              color:#fff;
              padding:12px 16px;
              border-radius:10px;
              cursor:pointer;
              font-weight:700;
            "
          >
            Back to Base Station
          </button>

          <h1 style="font-size:44px;margin:0 0 10px;">Answers</h1>
          <p style="margin:0 0 28px;color:#cfd6df;font-size:18px;">The full answer list is now unlocked.</p>

          <div style="display:grid;gap:12px;">
            ${Array.from({ length: totalClues }, (_, index) => {
              const id = index + 1;
              return `
                <button
                  type="button"
                  class="wwAnswerButton"
                  data-answer-id="${id}"
                  style="
                    width:100%;
                    text-align:left;
                    border:1px solid rgba(255,255,255,0.14);
                    background:rgba(255,255,255,0.07);
                    color:#fff;
                    padding:18px 20px;
                    border-radius:14px;
                    cursor:pointer;
                    font-size:18px;
                    font-weight:800;
                  "
                >
                  Answer ${String(id).padStart(2, "0")}
                </button>
              `;
            }).join("")}
          </div>
        </section>
      </main>
    `;

    const back = app.querySelector("#wwBackToBase");
    if (back) {
      back.addEventListener("click", () => navigate("base-station"));
    }

    app.querySelectorAll(".wwAnswerButton").forEach((button) => {
      button.addEventListener("click", () => {
        navigate("answer", { id: Number(button.dataset.answerId) });
      });
    });
  }

  function renderPopCluePlaceholder(app, navigate) {
    app.innerHTML = `
      <main style="
        min-height:100vh;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:40px;
        background:#10141b;
        color:#f5f7fb;
        font-family:Arial,sans-serif;
        text-align:center;
        box-sizing:border-box;
      ">
        <section style="
          max-width:680px;
          padding:34px;
          border-radius:22px;
          border:1px solid rgba(240,138,36,0.44);
          background:rgba(255,255,255,0.07);
          box-shadow:0 24px 80px rgba(0,0,0,0.35);
        ">
          <p style="
            margin:0 0 10px;
            color:#f08a24;
            font-weight:900;
            letter-spacing:0.22em;
            text-transform:uppercase;
          ">
            Pop Clue
          </p>

          <h1 style="margin:0 0 16px;font-size:42px;color:#f3f6f9;">
            Something brief has surfaced.
          </h1>

          <p style="margin:0 0 26px;font-size:18px;line-height:1.65;color:rgba(214,221,230,0.78);">
            The signal is live, but the dedicated Pop Clue page has not been dressed yet.
          </p>

          <button
            type="button"
            id="wwBackToBase"
            style="
              appearance:none;
              border:1px solid rgba(240,138,36,0.9);
              background:#243242;
              color:#fff;
              padding:14px 20px;
              border-radius:10px;
              font-weight:900;
              letter-spacing:0.12em;
              text-transform:uppercase;
              cursor:pointer;
            "
          >
            Back to Base Station
          </button>
        </section>
      </main>
    `;

    const back = app.querySelector("#wwBackToBase");
    if (back) {
      back.addEventListener("click", () => navigate("base-station"));
    }
  }

  try {
    app.innerHTML = "Loading...";

    const slug = getSlug();
    const modules = await loadModules();
    const orgState = await loadOrgState(slug);

    if (!orgState || orgState.ok === false) {
      renderError("Organisation not found", "No Airtable state could be loaded for this WinterWord.");
      return;
    }

    if (orgState.is_visible === false) {
      renderError("Unavailable", "This WinterWord is not currently visible.");
      return;
    }

    if (orgState.season_state === "tech_diff") {
      renderError("Technical Difficulties", "Please try again a little later.");
      return;
    }

    const game = await loadGame();

    const totalClues = Number(orgState.total_clues || game.total_clues || 12);
    const currentClue = Math.max(0, Math.min(Number(orgState.current_clue || 0), totalClues));
    const seasonState = orgState.season_state || "pre";
    const lifelineUnlockClue = Number(game.lifeline_unlock_clue || 6);

    const isResolved =
      orgState.is_resolved === true ||
      orgState.is_complete === true ||
      seasonState === "complete" ||
      seasonState === "resolved" ||
      computeResolvedFallback(orgState, totalClues);

    const lifelineAvailable =
      orgState.lifeline_live === true ||
      currentClue >= lifelineUnlockClue ||
      isResolved;

    const popClueLive =
      orgState.flash_clue_live === true ||
      orgState.pop_clue_live === true ||
      orgState.popClueLive === true;

    function navigate(pageName, options = {}) {
      const page = normalisePageName(pageName);

      switch (page) {
        case "welcome": {
          const renderWelcomeIntro = modules.welcomeIntro.renderWelcomeIntro;

          if (typeof renderWelcomeIntro !== "function") {
            renderError("Welcome module error", "renderWelcomeIntro was not found.");
            return;
          }

          renderWelcomeIntro(
            app,
            {
              orgName: orgState.org_name || game.org_name || "WinterWord",
              slug
            },
            function handleWelcomeDone() {
              markWelcomeSeen(slug);
              navigate("base-station");
            }
          );
          return;
        }

        case "base-station": {
          if (isResolved) {
            const renderBaseStationResolved = modules.baseStationResolved.renderBaseStationResolved;

            if (typeof renderBaseStationResolved !== "function") {
              renderError("Resolve module error", "renderBaseStationResolved was not found.");
              return;
            }

            renderBaseStationResolved(
              app,
              {
                orgName: orgState.org_name || game.org_name || "WinterWord",
                seasonLabel: game.season_label || "WINTERWORD • 2026",
                currentClue,
                totalClues,
                lifelineAvailable,
                lifelineUnlockClue,
                popClueLive,
                isResolved: true
              },
              navigate
            );
            return;
          }

          const renderBaseStation = modules.baseStation.renderBaseStation;

          if (typeof renderBaseStation !== "function") {
            renderError("Base Station module error", "renderBaseStation was not found.");
            return;
          }

          renderBaseStation(
            app,
            {
              orgName: orgState.org_name || game.org_name || "WinterWord",
              seasonLabel: game.season_label || "WINTERWORD • 2026",
              introLine1: game.base_station_intro_line_1,
              introLine2: game.base_station_intro_line_2,
              howParagraphs: game.how_it_works_paragraphs,
              updatesText: orgState.updates_content || game.updates_text,
              currentClue,
              totalClues,
              seasonState,
              lifelineAvailable,
              lifelineUnlockClue,
              popClueLive,
              isResolved: false
            },
            navigate
          );
          return;
        }

        case "pop-clue": {
          if (!popClueLive) {
            navigate("base-station");
            return;
          }

          renderPopCluePlaceholder(app, navigate);
          return;
        }

        case "clues": {
          const renderClueList = modules.clueList.renderClueList;

          if (typeof renderClueList !== "function") {
            renderError("Clue List module error", "renderClueList was not found.");
            return;
          }

          renderClueList(
            app,
            {
              currentClue,
              totalClues,
              lifelineAvailable,
              popClueLive,
              isResolved
            },
            navigate
          );
          return;
        }

        case "clue": {
          const clueId = Number(options.id) || 1;

          if (clueId > currentClue && !isResolved) {
            navigate("clues");
            return;
          }

          const renderCluePage = modules.cluePage.renderCluePage;

          if (typeof renderCluePage !== "function") {
            renderError("Clue Page module error", "renderCluePage was not found.");
            return;
          }

          renderCluePage(
            app,
            {
              clueId,
              totalClues,
              clue: getClueById(game, currentClue, clueId),
              currentClue,
              isResolved
            },
            navigate
          );
          return;
        }

        case "answers": {
          if (!isResolved) {
            navigate("base-station");
            return;
          }

          renderAnswerList(
            app,
            {
              totalClues
            },
            navigate
          );
          return;
        }

        case "answer": {
          const answerId = Number(options.id) || 1;
          const answer = getAnswerById(game, isResolved, totalClues, answerId);

          if (!answer.unlocked) {
            navigate("base-station");
            return;
          }

          const renderAnswerPage = modules.answerPage.renderAnswerPage;

          if (typeof renderAnswerPage !== "function") {
            renderError("Answer Page module error", "renderAnswerPage was not found.");
            return;
          }

          renderAnswerPage(
            app,
            {
              clueId: answerId,
              totalClues,
              answer,
              isResolved
            },
            navigate
          );
          return;
        }

        case "lifeline": {
          if (!lifelineAvailable) {
            navigate("base-station");
            return;
          }

          const renderLifelinePage = modules.lifeline.renderLifelinePage;

          if (typeof renderLifelinePage !== "function") {
            renderError("Lifeline module error", "renderLifelinePage was not found.");
            return;
          }

          renderLifelinePage(
            app,
            {
              isAvailable: true,
              unlockClue: lifelineUnlockClue,
              currentClue,
              lifelineTitle: game.lifeline_title || "Need a nudge?",
              lifelineBody: game.lifeline_body || "Your lifeline content goes here.",
              lifelineImage: game.lifeline_image || "",
              orgName: orgState.org_name || game.org_name || "WinterWord"
            },
            navigate
          );
          return;
        }

        case "leaderboard": {
          const renderLeaderboardPage = modules.leaderboard.renderLeaderboardPage;

          if (typeof renderLeaderboardPage !== "function") {
            renderError("Leaderboard module error", "renderLeaderboardPage was not found.");
            return;
          }

          renderLeaderboardPage(
            app,
            {
              orgName: orgState.org_name || game.org_name || "WinterWord",
              seasonLabel: game.season_label || "WINTERWORD • 2026",
              slug,
              leaderboardEndpoint: LEADERBOARD_ENDPOINT
            },
            navigate
          );
          return;
        }

        default:
          renderError("Page Not Found", "This WinterWord page does not exist.");
          return;
      }
    }

    if (hasSeenWelcome(slug)) {
      navigate("base-station");
    } else {
      navigate("welcome");
    }
  } catch (error) {
    renderError(
      "WinterWord could not load",
      "The engine stopped before the page could render.",
      error?.stack || error?.message || String(error)
    );
  }
})();
