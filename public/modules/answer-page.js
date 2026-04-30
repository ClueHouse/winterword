export function renderAnswerPage(app, data = {}, navigate) {
  const {
    clueId = 1,
    answer = {}
  } = data;

  const {
    title = `Answer ${String(clueId).padStart(2, "0")}`,
    variant = "plain",
    image = "",
    alt = title,
    audio = ""
  } = answer;

  function esc(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  const hasMedia = Boolean(image);
  const hasAudio = Boolean(audio);
  const isVideo = variant === "video" || variant === "video-audio";
  const hasPlayableMedia = isVideo || hasAudio;

  app.innerHTML = `
<style>
:root {
  --ww-left-narrow: 8.8rem;
  --ww-ink: #3b4149;
  --ww-ink-blue: #1f3f57;
  --ww-ink-blue-hover: #163244;
  --ww-rail-bg: #f4f8fb;
  --ww-orange: #f08a24;
}

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
}

body {
  background: #10141b;
}

#wwPortal {
  display: flex;
  min-height: 100vh;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  background: #10141b;
  color: #f5f7fb;
}

#wwLeft {
  width: var(--ww-left-narrow);
  background: var(--ww-rail-bg);
  box-shadow: inset -1px 0 0 rgba(0,0,0,0.04);
  flex: 0 0 var(--ww-left-narrow);
}

.ww-mini-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.15rem;
}

.ww-mini-logo img {
  width: 7.2rem;
  height: auto;
  display: block;
  background: transparent !important;
}

.ww-mini-textnav {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
}

.ww-mini-textlink {
  appearance: none;
  background: transparent;
  border: 0;
  padding: 0;
  font-weight: 900;
  font-size: 0.78rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--ww-ink-blue);
  opacity: 0.92;
  cursor: pointer;
}

.ww-mini-textlink:hover {
  color: var(--ww-ink-blue-hover);
  opacity: 1;
}

.ww-mini-textlink[data-active="true"] {
  color: var(--ww-ink);
  opacity: 1;
}

.ww-mini-play {
  appearance: none;
  width: 4.2rem;
  height: 4.2rem;
  border-radius: 999px;
  border: 2px solid rgba(240,138,36,0.85);
  background: linear-gradient(180deg, #243242 0%, #192532 100%);
  color: #fff;
  cursor: pointer;
  box-shadow:
    0 12px 24px rgba(0,0,0,0.18),
    0 0 18px rgba(240,138,36,0.24);
  display: flex;
  align-items: center;
  justify-content: center;
}

.ww-mini-play-icon {
  width: 0;
  height: 0;
  border-top: 0.68rem solid transparent;
  border-bottom: 0.68rem solid transparent;
  border-left: 1.05rem solid #fff;
  margin-left: 0.18rem;
}

.ww-mini-play[data-playing="true"] .ww-mini-play-icon {
  width: 1rem;
  height: 1.25rem;
  border: 0;
  margin-left: 0;
  background:
    linear-gradient(90deg, #fff 0 35%, transparent 35% 65%, #fff 65% 100%);
}

#wwRight {
  flex: 1;
  min-width: 0;
  padding: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ww-answer-stage {
  width: min(66vw, 1200px);
  max-width: calc(100vw - var(--ww-left-narrow) - 6rem);
  display: flex;
  align-items: center;
  justify-content: center;
}

.ww-answer-media {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ww-answer-media img,
.ww-answer-media video {
  display: block;
  width: 100%;
  max-height: 78vh;
  object-fit: contain;
  border-radius: 1rem;
  background: #000;
  box-shadow: 0 28px 90px rgba(0,0,0,0.42);
}

.ww-answer-empty {
  width: min(66vw, 900px);
  padding: 3rem;
  border-radius: 1.4rem;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.12);
  text-align: center;
  color: rgba(245,247,251,0.78);
  font-size: 1.1rem;
}

@media (max-width: 820px) {
  :root {
    --ww-left-narrow: 8.4rem;
  }

  .ww-mini-logo img {
    width: 6.6rem;
  }

  #wwRight {
    padding: 1.4rem;
  }

  .ww-answer-stage {
    width: calc(100vw - var(--ww-left-narrow) - 2.8rem);
    max-width: calc(100vw - var(--ww-left-narrow) - 2.8rem);
  }

  .ww-answer-media img,
  .ww-answer-media video {
    max-height: 82vh;
  }
}
</style>

<div id="wwPortal">

  <aside id="wwLeft" aria-label="Answer Rail">
    <div class="ww-mini-shell">

      <div class="ww-mini-logo" aria-label="WinterWord">
        <img src="/assets/winterword/shared/logo.png" alt="WinterWord">
      </div>

      ${
        hasPlayableMedia
          ? `
            <button class="ww-mini-play" id="wwPlayButton" type="button" aria-label="Play answer media" data-playing="false">
              <span class="ww-mini-play-icon" aria-hidden="true"></span>
            </button>
          `
          : ""
      }

      <nav class="ww-mini-textnav" aria-label="Answer navigation">
        <button class="ww-mini-textlink" type="button" data-nav="base-station">Base</button>
        <button class="ww-mini-textlink" type="button" data-nav="answers" data-active="true">Answers</button>
        <button class="ww-mini-textlink" type="button" data-nav="leaderboard">Leader</button>
      </nav>

    </div>
  </aside>

  <main id="wwRight">
    <section class="ww-answer-stage" aria-label="${esc(title)}">
      ${
        hasMedia
          ? `
            <div class="ww-answer-media">
              ${
                isVideo
                  ? `
                    <video id="wwAnswerVideo" playsinline preload="metadata" aria-label="${esc(alt)}">
                      <source src="${esc(image)}" type="video/mp4">
                    </video>
                  `
                  : `
                    <img src="${esc(image)}" alt="${esc(alt)}" loading="lazy" decoding="async">
                  `
              }
            </div>
          `
          : `
            <div class="ww-answer-empty">No answer media found.</div>
          `
      }
    </section>
  </main>

</div>
`;

  app.querySelectorAll("[data-nav]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-nav");

      if (typeof navigate === "function") {
        navigate(target);
      }
    });
  });

  const playButton = app.querySelector("#wwPlayButton");
  const videoElement = app.querySelector("#wwAnswerVideo");
  const audioElement = hasAudio ? new Audio(audio) : null;

  function setPlayingState(isPlaying) {
    if (!playButton) return;
    playButton.setAttribute("data-playing", isPlaying ? "true" : "false");
    playButton.setAttribute("aria-label", isPlaying ? "Pause answer media" : "Play answer media");
  }

  function pauseAll() {
    if (videoElement && !videoElement.paused) {
      videoElement.pause();
    }

    if (audioElement && !audioElement.paused) {
      audioElement.pause();
    }

    setPlayingState(false);
  }

  if (playButton) {
    playButton.addEventListener("click", async () => {
      try {
        const videoPaused = videoElement ? videoElement.paused : true;
        const audioPaused = audioElement ? audioElement.paused : true;
        const shouldPlay = videoPaused && audioPaused;

        if (shouldPlay) {
          if (videoElement) {
            await videoElement.play();
          }

          if (audioElement) {
            await audioElement.play();
          }

          setPlayingState(true);
        } else {
          pauseAll();
        }
      } catch {
        pauseAll();
        playButton.setAttribute("aria-label", "Media could not play");
      }
    });
  }

  if (videoElement) {
    videoElement.addEventListener("ended", () => {
      if (audioElement && !audioElement.paused) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }

      setPlayingState(false);
    });
  }

  if (audioElement) {
    audioElement.addEventListener("ended", () => {
      if (videoElement && !videoElement.paused) {
        videoElement.pause();
      }

      setPlayingState(false);
    });
  }
}
