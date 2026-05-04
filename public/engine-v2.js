// WinterWord Clean Engine v1.2
// Airtable status is now authoritative: complete immediately resolves season.

(async function winterwordEngine() {
  "use strict";

  const MODULE_PATHS = {
    baseStation: "/modules/base-station.js",
    baseStationResolved: "/modules/base-station-resolved.js",
    clueList: "/modules/clue-list.js",
    cluePage: "/modules/clue-page.js",
    cluePagePlay: "/modules/clue-page-play.js",
    answerList: "/modules/answer-list.js",
    answerPage: "/modules/answer-page.js",
    lifeline: "/modules/lifeline.js",
    leaderboard: "/modules/leaderboard.js",
    welcomeIntro: "/modules/welcomeIntro.js"
  };

  const ORG_STATE_ENDPOINT = "/api/org-state";
  const LEADERBOARD_ENDPOINT = "/api/leaderboard";
  const GAME_DATA_PATH = "/data/game.json";

  const app = document.getElementById("app") || document.body;

  function renderTechDiff() {
    app.innerHTML = `
      <main style="
        min-height:100vh;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:40px;
        background:
          radial-gradient(circle at 50% 30%, rgba(240,138,36,0.14), transparent 34%),
          radial-gradient(circle at 50% 75%, rgba(120,160,210,0.10), transparent 42%),
          #10141b;
        color:#f5f7fb;
        font-family:Arial,sans-serif;
        text-align:center;
        box-sizing:border-box;
      ">
        <section style="
          max-width:720px;
          padding:38px 34px;
          border-radius:24px;
          border:1px solid rgba(255,255,255,0.12);
          background:rgba(255,255,255,0.045);
          box-shadow:0 28px 90px rgba(0,0,0,0.38);
        ">
          <img
            src="/assets/winterword/shared/logo.png"
            alt="WinterWord Logo"
            style="
              display:block;
              width:min(220px, 70%);
              height:auto;
              margin:0 auto 26px;
              user-select:none;
              pointer-events:none;
              filter:
                drop-shadow(0 0 18px rgba(240,138,36,0.12))
                drop-shadow(0 0 36px rgba(240,138,36,0.08));
            "
          />

          <p style="
            margin:0 0 12px;
            color:#f0b36a;
            font-size:13px;
            font-weight:900;
            letter-spacing:0.26em;
            text-transform:uppercase;
          ">
            WinterWord Base Station
          </p>

          <h1 style="
            margin:0 0 16px;
            font-size:42px;
            line-height:1.1;
          ">
            Transmission Disrupted
          </h1>

          <p style="
            margin:0 auto;
            max-width:560px;
            font-size:18px;
            line-height:1.55;
            color:#cfd6df;
          ">
            Atmospheric interference is currently affecting Base Station communications.
            Please try again a little later.
          </p>
        </section>
      </main>
    `;
  }

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

  function normaliseStatus(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/-/g, "_");
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
      variant: found?.variant || "image-only",
      body: found?.body || "",
      image: found?.image || "",
      alt: found?.alt || found?.title || `WinterWord Clue ${clueId}`,
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
      variant: found?.variant || "plain",
      body: found?.body || "No answer content yet.",
      image: found?.image || "",
      alt: found?.alt || found?.title || `WinterWord Answer ${clueId}`,
      audio: found?.audio || "",
      letter: found?.letter || "",
      unlocked: isResolved && clueId <= totalClues
    };
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

    const airtableStatus = normaliseStatus(orgState.status);
    const endpointSeasonState = normaliseStatus(orgState.season_state);
    const rawSeasonState = airtableStatus || endpointSeasonState || "pre";

    if (
      rawSeasonState === "tech_diff" ||
      rawSeasonState === "technical" ||
      rawSeasonState === "technical_difficulties"
    ) {
      renderTechDiff();
      return;
    }

    const game = await loadGame();

    const totalClues = Number(game.total_clues || 12);

    const isResolved =
      rawSeasonState === "complete" ||
      rawSeasonState === "resolved" ||
      orgState.is_resolved === true ||
      orgState.is_complete === true ||
      computeResolvedFallback(orgState, totalClues);

    const seasonState = isResolved ? "complete" : rawSeasonState;

    const currentClue = isResolved
      ? totalClues
      : Math.max(0, Math.min(Number(orgState.current_clue || 0), totalClues));

    const lifelineUnlockClue = Number(game.lifeline_unlock_clue || 6);

    const lifelineAvailable =
      orgState.lifeline_live === true ||
      orgState.lifeline_live === "true" ||
      orgState.lifelineLive === true ||
      orgState.lifelineLive === "true";

    const hasLeaderboardEntries =
      orgState.hasLeaderboardEntries === true ||
      orgState.has_leaderboard_entries === true ||
      Number(orgState.leaderboardCount || orgState.leaderboard_count || 0) > 0;

    const popClueLive =
      orgState.flash_clue_live === true ||
      orgState.flash_clue_live === "true" ||
      orgState.pop_clue_live === true ||
      orgState.pop_clue_live === "true" ||
      orgState.popClueLive === true ||
      orgState.popClueLive === "true";

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
                hasLeaderboardEntries,
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
              hasLeaderboardEntries,
              isResolved: false
            },
            navigate
          );
          return;
        }

        case "pop-clue": {
          if (!popClueLive || isResolved) {
            navigate("base-station");
            return;
          }

          renderPopCluePlaceholder(app, navigate);
          return;
        }

        case "clues": {
          if (isResolved) {
            navigate("answers");
            return;
          }

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
              lifeline_live: orgState.lifeline_live,
              lifelineLive: orgState.lifelineLive,
              org: orgState,
              popClueLive,
              isResolved
            },
            navigate
          );
          return;
        }

        case "clue": {
          if (isResolved) {
            navigate("answers");
            return;
          }

          const clueId = Number(options.id) || 1;

          if (clueId > currentClue) {
            navigate("clues");
            return;
          }

          const clueData = getClueById(game, currentClue, clueId);

          const renderCluePage =
            clueData.variant === "image-audio"
              ? modules.cluePagePlay.renderCluePage
              : modules.cluePage.renderCluePage;

          if (typeof renderCluePage !== "function") {
            renderError("Clue Page module error", "renderCluePage was not found.");
            return;
          }

          renderCluePage(
            app,
            {
              clueId,
              totalClues,
              clue: clueData,
              currentClue,
              isResolved,

              lifelineAvailable,
              lifeline_live: orgState.lifeline_live,
              lifelineLive: orgState.lifelineLive,
              org: orgState
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

          const renderAnswerList = modules.answerList.renderAnswerList;

          if (typeof renderAnswerList !== "function") {
            renderError("Answer List module error", "renderAnswerList was not found.");
            return;
          }

          renderAnswerList(
            app,
            {
              orgName: orgState.org_name || game.org_name || "WinterWord",
              totalClues,
              final_word: orgState.final_word || game.final_word || "HOUSEWARMING"
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
              isResolved,

              lifelineAvailable,
              lifeline_live: orgState.lifeline_live,
              lifelineLive: orgState.lifelineLive,
              org: orgState
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
              currentClue,
              lifelineTitle: game.lifeline_title || "Need a nudge?",
              lifelineBody: game.lifeline_body || "Your lifeline content goes here.",
              lifelineImage: game.lifeline_image || "",
              orgName: orgState.org_name || game.org_name || "WinterWord",

              lifelineAvailable,
              lifeline_live: orgState.lifeline_live,
              lifelineLive: orgState.lifelineLive,
              org: orgState
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
