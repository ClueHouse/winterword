console.log("ENGINE V2 LIVE");

// v6 RESOLVE LOGIC (BACKEND-FIRST) + LEADERBOARD MODULE + FIRST-VISIT WELCOME INTRO

import { renderBaseStation } from "/modules/base-station.js";
import { renderBaseStationResolved } from "/modules/base-station-resolved.js";
import { renderClueList } from "/modules/clue-list.js";
import { renderCluePage } from "/modules/clue-page.js";
import { renderAnswerPage } from "/modules/answer-page.js";
import { renderLifelinePage } from "/modules/lifeline.js";
import { renderLeaderboardPage } from "/modules/leaderboard.js";
import { renderWelcomeIntro } from "/modules/welcomeIntro.js";

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

      if (!res.ok) throw new Error(`Org state failed: ${res.status}`);
      return await res.json();
    } catch {
      return null;
    }
  }

  async function loadGame() {
    try {
      const res = await fetch(`/data/game.json`, {
        cache: "no-store"
      });

      if (!res.ok) throw new Error("Game not found");
      return await res.json();
    } catch {
      return null;
    }
  }

  function renderError(title, message) {
    app.innerHTML = `
      <div style="
        min-height:100vh;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:40px;
        font-family:Arial,sans-serif;
        background:#111;
        color:#fff;
        text-align:center;
      ">
        <div>
          <h1 style="margin:0 0 16px;font-size:42px;">${title}</h1>
          <p style="margin:0;font-size:18px;color:#ccc;">${message}</p>
        </div>
      </div>
    `;
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

    if (!seasonStart || Number.isNaN(seasonStart.getTime()) || intervalMs <= 0) {
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
      return false;
    }
  }

  function markWelcomeSeen(slug) {
    try {
      window.localStorage.setItem(getWelcomeStorageKey(slug), "true");
    } catch {
      // If localStorage is unavailable, continue without breaking the site.
    }
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

  if (orgState.season_state === "tech_diff") {
    renderError("Technical Difficulties", "Please try again a little later.");
    return;
  }

  const game = await loadGame();

  if (!game) {
    renderError("Game not found", "No game data could be loaded.");
    return;
  }

  const currentClue = Number(orgState.current_clue || 0);
  const totalClues = Number(orgState.total_clues || game.total_clues || 12);
  const seasonState = orgState.season_state || "pre";
  const lifelineUnlockClue = Number(game.lifeline_unlock_clue || 6);

  const isResolved =
    orgState.is_resolved === true
      ? true
      : computeResolvedFallback(orgState, totalClues);

  function isLifelineAvailable() {
    return orgState.lifeline_live === true;
  }

  function getClueById(id) {
    const clueId = Number(id) || 1;
    const clues = Array.isArray(game.clues) ? game.clues : [];
    const found = clues.find((c) => Number(c.id) === clueId);

    return {
      id: clueId,
      title: found?.title || `Clue ${String(clueId).padStart(2, "0")}`,
      body: found?.body || "No clue content yet.",
      image: found?.image || "",
      audio: found?.audio || "",
      unlocked: clueId <= currentClue
    };
  }

  function getAnswerById(id) {
    const clueId = Number(id) || 1;
    const answers = Array.isArray(game.answers) ? game.answers : [];
    const found = answers.find((a) => Number(a.id) === clueId);

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

  function navigate(pageName, options = {}) {
    const lifelineAvailable = isLifelineAvailable();

    switch (pageName) {
      case "welcome":
        renderWelcomeIntro(
          app,
          {
            orgName: orgState.org_name || game.org_name || "WinterWord",
            slug
          },
          function () {
            markWelcomeSeen(slug);
            navigate("base-station");
          }
        );
        return;

      case "base-station":
        if (isResolved) {
          renderBaseStationResolved(
            app,
            {
              orgName: orgState.org_name || game.org_name || "WinterWord",
              seasonLabel: game.season_label || "WINTERWORD • 2026",
              currentClue,
              totalClues,
              lifelineAvailable,
              lifelineUnlockClue
            },
            navigate
          );
          return;
        }

        renderBaseStation(
          app,
          {
            orgName: orgState.org_name || game.org_name || "WinterWord",
            seasonLabel: game.season_label,
            introLine1: game.base_station_intro_line_1,
            introLine2: game.base_station_intro_line_2,
            howParagraphs: game.how_it_works_paragraphs,
            updatesText: orgState.updates_content || game.updates_text,
            currentClue,
            totalClues,
            seasonState,
            lifelineAvailable,
            lifelineUnlockClue
          },
          navigate
        );
        return;

      case "clues":
        renderClueList(app, { currentClue, totalClues }, navigate);
        return;

      case "clue": {
        const clueId = Number(options.id) || 1;

        if (clueId > currentClue) {
          navigate("clues");
          return;
        }

        renderCluePage(
          app,
          {
            clueId,
            totalClues,
            clue: getClueById(clueId)
          },
          navigate
        );
        return;
      }

      case "answer": {
        const answerId = Number(options.id) || 1;
        const answer = getAnswerById(answerId);

        if (!answer.unlocked) {
          navigate("clue", { id: answerId });
          return;
        }

        renderAnswerPage(
          app,
          {
            clueId: answerId,
            totalClues,
            answer
          },
          navigate
        );
        return;
      }

      case "lifeline":
        if (!lifelineAvailable) {
          navigate("base-station");
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

      case "leaderboard":
        renderLeaderboardPage(
          app,
          {
            orgName: orgState.org_name || game.org_name || "WinterWord",
            seasonLabel: game.season_label || "WINTERWORD • 2026",
            slug,
            leaderboardEndpoint: "/api/leaderboard"
          },
          navigate
        );
        return;

      default:
        renderError("Page Not Found", "This page does not exist.");
        return;
    }
  }

  if (hasSeenWelcome(slug)) {
    navigate("base-station");
  } else {
    navigate("welcome");
  }
})();
