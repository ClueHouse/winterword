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
  --ww-ink: #d8dde3;
  --ww-left-narrow: 10.12rem;
  --ww-ink-blue: #f2f5f8;
  --ww-ink-blue-hover: #ffffff;
  --ww-orange: #f08a24;
  --ww-rail-gap: 2.35rem;
}

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
}

body {
  background: #000;
}

#wwPortal {
  display: flex;
  height: 100vh;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  overflow: hidden;
  background: #000;
  position: relative;
  z-index: 1;
  color: #f5f7fb;
}

#wwLeft {
  width: var(--ww-left-narrow);
  flex: 0 0 var(--ww-left-narrow);
  position: relative;
  background:
    linear-gradient(
      90deg,
      rgba(0,0,0,0.96) 0%,
      rgba(10,12,14,0.94) 45%,
      rgba(18,22,26,0.88) 75%,
      rgba(28,34,40,0.65) 100%
    ),
    repeating-linear-gradient(
      0deg,
      rgba(255,255,255,0.015) 0px,
      rgba(255,255,255,0.015) 1px,
      transparent 1px,
      transparent 3px
    ),
    repeating-linear-gradient(
      90deg,
      rgba(255,255,255,0.01) 0px,
      rgba(255,255,255,0.01) 1px,
      transparent 1px,
      transparent 4px
    );
  box-shadow:
    inset -1px 0 0 rgba(255,255,255,0.05),
    inset -24px 0 36px rgba(255,255,255,0.015),
    6px 0 24px rgba(0,0,0,0.45);
  overflow: hidden;
}

#wwLeft::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at top left, rgba(255,255,255,0.04), transparent 45%),
    radial-gradient(circle at bottom left, rgba(240,138,36,0.04), transparent 38%);
  pointer-events: none;
}

.ww-mini-shell {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ww-mini-core {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.ww-mini-logo {
  display: flex;
  margin-bottom: var(--ww-rail-gap);
  filter:
    drop-shadow(0 0 10px rgba(255,255,255,0.08))
    drop-shadow(0 0 18px rgba(240,138,36,0.05));
}

.ww-mini-logo img {
  width: 8.28rem;
  height: auto;
  display: block;
  opacity: 0.98;
  background: transparent !important;
}

.ww-mini-play {
  appearance: none;
  width: 4.83rem;
  height: 4.83rem;
  border-radius: 999px;
  border: 2px solid rgba(240,138,36,0.88);
  background: linear-gradient(180deg, #243242 0%, #192532 100%);
  color: #fff;
  cursor: pointer;
  box-shadow:
    0 14px 28px rgba(0,0,0,0.28),
    0 0 22px rgba(240,138,36,0.28);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--ww-rail-gap);
  position: relative;
  overflow: hidden;
  transition:
    transform 160ms ease,
    box-shadow 160ms ease;
}

.ww-mini-play::before {
  content: "";
  position: absolute;
  top: -30%;
  left: -85%;
  width: 55%;
  height: 160%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255,255,255,0.16) 42%,
    rgba(255,255,255,0.42) 50%,
    rgba(255,255,255,0.16) 58%,
    transparent 100%
  );
  transform: rotate(24deg);
  animation: wwPlayShine 3.8s ease-in-out infinite;
  pointer-events: none;
}

@keyframes wwPlayShine {
  0% {
    left: -85%;
    opacity: 0;
  }

  18% {
    opacity: 0;
  }

  32% {
    opacity: 1;
  }

  52% {
    left: 130%;
    opacity: 0.9;
  }

  70% {
    opacity: 0;
  }

  100% {
    left: 130%;
    opacity: 0;
  }
}

.ww-mini-play:hover {
  transform: translateY(-1px) scale(1.04);
  box-shadow:
    0 18px 34px rgba(0,0,0,0.34),
    0 0 30px rgba(240,138,36,0.4);
}

.ww-mini-play-icon {
  position: relative;
  z-index: 2;
  width: 0;
  height: 0;
  border-top: 0.78rem solid transparent;
  border-bottom: 0.78rem solid transparent;
  border-left: 1.21rem solid #fff;
  margin-left: 0.22rem;
}

.ww-mini-play[data-playing="true"] .ww-mini-play-icon {
  width: 1.15rem;
  height: 1.42rem;
  border: 0;
  margin-left: 0;
  background:
    linear-gradient(
      90deg,
      #fff 0 35%,
      transparent 35% 65%,
      #fff 65% 100%
    );
}

.ww-mini-textnav {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.98rem;
  margin-top: 2rem;
}

.ww-mini-textlink {
  appearance: none;
  background: transparent;
  border: 0;
  padding: 0;
  line-height: 1;
  text-decoration: none;
  font-weight: 900;
  font-size: 0.9rem;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--ww-ink-blue);
  opacity: 0.9;
  cursor: pointer;
  text-shadow: 0 0 8px rgba(255,255,255,0.04);
  transition:
    color 180ms ease,
    opacity 180ms ease,
    transform 180ms ease,
    text-shadow 180ms ease;
}

.ww-mini-textlink:hover {
  color: var(--ww-ink-blue-hover);
  opacity: 1;
  transform: scale(1.06);
  text-shadow:
    0 0 10px rgba(255,255,255,0.08),
    0 0 18px rgba(240,138,36,0.12);
}

.ww-mini-textlink[data-active="true"] {
  color: #ffffff;
  opacity: 1;
  text-shadow:
    0 0 10px rgba(255,255,255,0.08),
    0 0 18px rgba(240,138,36,0.18);
}

.ww-mini-sprig {
  position: absolute;
  bottom: 1.85rem;
  left: 50%;
  width: 5.9rem;
  height: 3.2rem;
  transform: translateX(-50%);
  opacity: 0.82;
  pointer-events: none;
}

.ww-mini-sprig svg {
  width: 100%;
  height: 100%;
  display: block;
  overflow: visible;
  filter:
    drop-shadow(0 0 7px rgba(240,138,36,0.14))
    drop-shadow(0 0 14px rgba(255,255,255,0.05));
}

.ww-mini-sprig .sprig-stem {
  fill: none;
  stroke: rgba(240,138,36,0.58);
  stroke-width: 1.8;
  stroke-linecap: round;
}

.ww-mini-sprig .sprig-leaf {
  fill: none;
  stroke: rgba(216,221,227,0.58);
  stroke-width: 1.45;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.ww-mini-sprig .sprig-berry {
  fill: rgba(240,138,36,0.56);
}

#wwRight {
  flex: 1;
  min-width: 0;
  padding: 3.2vh 3.2vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
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
    --ww-left-narrow: 9.4rem;
    --ww-rail-gap: 2rem;
  }

  .ww-mini-logo img {
    width: 7.4rem;
  }

  .ww-mini-sprig {
    width: 5.2rem;
    bottom: 1.35rem;
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

      <div class="ww-mini-core">

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

      <div class="ww-mini-sprig" aria-hidden="true">
        <svg viewBox="0 0 100 54" role="img">
          <path class="sprig-stem" d="M50 47 C48 38, 45 31, 39 24 C34 18, 27 13, 18 9" />
          <path class="sprig-stem" d="M50 47 C52 38, 56 30, 63 23 C69 17, 76 12, 84 8" />

          <path class="sprig-leaf" d="M37 23 C30 22, 26 25, 23 30 C30 30, 34 28, 37 23Z" />
          <path class="sprig-leaf" d="M31 17 C25 16, 21 18, 18 22 C24 23, 28 21, 31 17Z" />
          <path class="sprig-leaf" d="M25 12 C20 11, 16 12, 13 16 C18 17, 22 15, 25 12Z" />

          <path class="sprig-leaf" d="M63 23 C70 22, 74 25, 77 30 C70 30, 66 28, 63 23Z" />
          <path class="sprig-leaf" d="M69 17 C75 16, 79 18, 82 22 C76 23, 72 21, 69 17Z" />
          <path class="sprig-leaf" d="M75 12 C80 11, 84 12, 87 16 C82 17, 78 15, 75 12Z" />

          <circle class="sprig-berry" cx="50" cy="47" r="2.3" />
          <circle class="sprig-berry" cx="45" cy="37" r="1.9" />
          <circle class="sprig-berry" cx="55" cy="37" r="1.9" />
        </svg>
      </div>

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
