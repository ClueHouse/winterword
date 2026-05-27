// WinterWord Clean Engine v1.5
// Pop clues render as overlays inside the standard Base Station.

(async function winterwordEngine() {
  "use strict";

  const MODULE_PATHS = {
    baseStationStandard: "/modules/renderBaseStationStandard.js",
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

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

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

  function renderOffMap() {
const subject = "Im%20lost%21";

const body =
  "I%20cant%20find%20my%20way%20back%20to%20WinterWord%21%0D%0A%0D%0A" +
  "The%20URL%20I%20am%20trying%20is%20this%3A%0D%0A%0D%0A" +
  encodeURIComponent(window.location.href) +
  "%0D%0A%0D%0ACurator%2C%20please%20help.";

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
          <h1 style="
            margin:0 0 18px;
            font-size:42px;
            line-height:1.1;
          ">
            You’ve wandered off the map.
          </h1>

          <p style="
            margin:0 0 18px;
            font-size:18px;
            line-height:1.65;
            color:#cfd6df;
          ">
            Somewhere beyond the snow, the correct trail still waits.
            This just isn’t the right door.
          </p>

          <p style="
            margin:0;
            font-size:16px;
            color:#f0b36a;
          ">
            Need a lantern?
            <a
              href="mailto:fix@cluehouse.co.nz?subject=${subject}&body=${body}"
              style="
                color:#f0b36a;
                text-decoration:none;
                border-bottom:1px solid rgba(240,179,106,0.45);
              "
            >
              Contact Clue House
            </a>.
          </p>
        </section>
      </main>
    `;
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
    try {
      return await loadJson(`${ORG_STATE_ENDPOINT}?slug=${encodeURIComponent(slug)}`);
    } catch {
      return { ok: false };
    }
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

  function getNowMs(orgState) {
    const serverNow = orgState?.now_iso ? new Date(orgState.now_iso) : null;

    if (serverNow && !Number.isNaN(serverNow.getTime())) {
      return serverNow.getTime();
    }

    return Date.now();
  }

  function computeResolvedFallback(orgState, totalClues) {
    const seasonStart = orgState?.season_start
      ? new Date(orgState.season_start)
      : orgState?.seasonStart
        ? new Date(orgState.seasonStart)
        : null;

    const dropFrequency =
      orgState?.drop_frequency ||
      orgState?.dropFrequency ||
      "weekly";

    const intervalMs = getFrequencyMs(dropFrequency);

    if (!seasonStart || Number.isNaN(seasonStart.getTime())) {
      return false;
    }

    const resolveTime =
      seasonStart.getTime() + Number(totalClues || 12) * intervalMs;

    return getNowMs(orgState) >= resolveTime;
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
      leaderboard: "leaderboard"
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
      video: found?.video || "",
      alt: found?.alt || found?.title || `WinterWord Answer ${clueId}`,
      audio: found?.audio || "",
      letter: found?.letter || "",
      unlocked: isResolved && clueId <= totalClues
    };
  }

  try {
    app.innerHTML = "Loading...";

    const slug = getSlug();
    const orgState = await loadOrgState(slug);

    if (!orgState || orgState.ok !== true) {
      renderOffMap();
      return;
    }

    const modules = await loadModules();

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

    const totalClues =
      Number(
        game.total_clues ||
        game.totalClues ||
        orgState.total_clues ||
        orgState.totalClues ||
        12
      ) || 12;

    const isResolved =
      rawSeasonState === "complete" ||
      rawSeasonState === "resolved" ||
      orgState.is_resolved === true ||
      orgState.isResolved === true ||
      orgState.is_complete === true ||
      orgState.isComplete === true ||
      computeResolvedFallback(orgState, totalClues);

    const seasonState = isResolved ? "complete" : rawSeasonState;

    const currentClue = isResolved
      ? totalClues
      : Math.max(
          0,
          Math.min(
            Number(
              orgState.current_clue ||
              orgState.currentClue ||
              0
            ),
            totalClues
          )
        );

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

    const pop1 =
      orgState.pop1 === true ||
      orgState.pop1 === "true";

    const pop2 =
      orgState.pop2 === true ||
      orgState.pop2 === "true";

    const popClueLive = pop1 || pop2;

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
              orgName: orgState.org_name || orgState.orgName || game.org_name || "WinterWord",
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
                ...orgState,
                orgName: orgState.org_name || orgState.orgName || game.org_name || "WinterWord",
                org_name: orgState.org_name || orgState.orgName || game.org_name || "WinterWord",
                seasonLabel: game.season_label || "WINTERWORD • 2026",
                currentClue,
                current_clue: currentClue,
                totalClues,
                total_clues: totalClues,
                lifelineAvailable,
                lifeline_live: orgState.lifeline_live,
                lifelineLive: orgState.lifelineLive,
                lifelineUnlockClue,
                pop1: false,
                pop2: false,
                popClueLive: false,
                hasLeaderboardEntries,
                isResolved: true,
                is_resolved: true
              },
              navigate
            );
            return;
          }

          const renderBaseStationStandard =
            modules.baseStationStandard.renderBaseStationStandard;

          if (typeof renderBaseStationStandard !== "function") {
            renderError("Base Station module error", "renderBaseStationStandard was not found.");
            return;
          }

          renderBaseStationStandard(
            app,
            {
              ...orgState,
              orgName: orgState.org_name || orgState.orgName || game.org_name || "WinterWord",
              org_name: orgState.org_name || orgState.orgName || game.org_name || "WinterWord",
              seasonLabel: game.season_label || "WINTERWORD • 2026",
              introLine1: game.base_station_intro_line_1,
              introLine2: game.base_station_intro_line_2,
              howParagraphs: game.how_it_works_paragraphs,
              guidepost: orgState.guidepost || orgState.guidepostText || orgState.updates_content || game.updates_text || "",
              guidepostText: orgState.guidepost || orgState.guidepostText || orgState.updates_content || game.updates_text || "",
              updatesText: orgState.guidepost || orgState.guidepostText || orgState.updates_content || game.updates_text || "",
              currentClue,
              current_clue: currentClue,
              totalClues,
              total_clues: totalClues,
              seasonState,
              season_state: seasonState,
              lifelineAvailable,
              lifeline_live: orgState.lifeline_live,
              lifelineLive: orgState.lifelineLive,
              lifelineUnlockClue,
              pop1,
              pop2,
              popClueLive,
              hasLeaderboardEntries,
              isResolved: false,
              is_resolved: false
            },
            navigate
          );
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
              ...orgState,
              currentClue,
              current_clue: currentClue,
              totalClues,
              total_clues: totalClues,
              lifelineAvailable,
              lifeline_live: orgState.lifeline_live,
              lifelineLive: orgState.lifelineLive,
              org: orgState,
              pop1,
              pop2,
              popClueLive,
              isResolved,
              is_resolved: isResolved
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
              ...orgState,
              clueId,
              totalClues,
              total_clues: totalClues,
              clue: clueData,
              currentClue,
              current_clue: currentClue,
              isResolved,
              is_resolved: isResolved,
              lifelineAvailable,
              lifeline_live: orgState.lifeline_live,
              lifelineLive: orgState.lifelineLive,
              org: orgState,
              pop1,
              pop2,
              popClueLive
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
              ...orgState,
              org: orgState,

              orgName:
                orgState.org_name ||
                orgState.orgName ||
                game.org_name ||
                "WinterWord",

              org_name:
                orgState.org_name ||
                orgState.orgName ||
                game.org_name ||
                "WinterWord",

              totalClues,
              total_clues: totalClues,

              final_word:
                orgState.final_word ||
                orgState.finalWord ||
                game.final_word ||
                game.finalWord ||
                "HOUSEWARMING",

              finalWord:
                orgState.finalWord ||
                orgState.final_word ||
                game.finalWord ||
                game.final_word ||
                "HOUSEWARMING",

              season_start:
                orgState.season_start ||
                orgState.seasonStart ||
                "",

              seasonStart:
                orgState.seasonStart ||
                orgState.season_start ||
                "",

              drop_frequency:
                orgState.drop_frequency ||
                orgState.dropFrequency ||
                "weekly",

              dropFrequency:
                orgState.dropFrequency ||
                orgState.drop_frequency ||
                "weekly",

              season_state: seasonState,
              seasonState,

              isResolved,
              is_resolved: isResolved,
              isComplete: isResolved,
              is_complete: isResolved
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
              ...orgState,
              clueId: answerId,
              totalClues,
              total_clues: totalClues,
              answer,
              isResolved,
              is_resolved: isResolved,
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
              ...orgState,
              isAvailable: true,
              currentClue,
              current_clue: currentClue,
              lifelineTitle: game.lifeline_title || "Need a nudge?",
              lifelineBody: game.lifeline_body || "Your lifeline content goes here.",
              lifelineImage: game.lifeline_image || "",
              orgName: orgState.org_name || orgState.orgName || game.org_name || "WinterWord",
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
              ...orgState,
              orgName: orgState.org_name || orgState.orgName || game.org_name || "WinterWord",
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
