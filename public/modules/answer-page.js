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
  --ww-left-narrow: 18.4rem;
  --ww-orange: #f0a13a;
  --ww-gold: rgba(240,161,58,0.95);
  --ww-gold-soft: rgba(255,226,155,0.44);
  --ww-ink-main: #f2efe4;
  --ww-ink-soft: #d8d4c3;
  --ww-rail-gap: 1.72rem;
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
  color: #f5f7fb;
}

#wwLeft {
  width: var(--ww-left-narrow);
  flex: 0 0 var(--ww-left-narrow);
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 18% 18%, rgba(240,161,58,0.18), transparent 1.4px),
    radial-gradient(circle at 72% 26%, rgba(255,226,155,0.13), transparent 1.2px),
    radial-gradient(circle at 42% 46%, rgba(240,161,58,0.16), transparent 1.4px),
    radial-gradient(circle at 84% 68%, rgba(255,226,155,0.12), transparent 1.2px),
    radial-gradient(circle at 26% 82%, rgba(240,161,58,0.17), transparent 1.3px),
    linear-gradient(
      90deg,
      #070b09 0%,
      #0a100c 10%,
      #132116 14%,
      #1d321f 22%,
      #315134 48%,
      #28452c 72%,
      #162419 86%,
      #080d0a 100%
    );
  background-size:
    2.4rem 2.7rem,
    2.8rem 3.1rem,
    2.6rem 2.9rem,
    3rem 3.2rem,
    2.7rem 3rem,
    auto;
}

#wwLeft::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 50% 18%, rgba(255,226,155,0.12), transparent 28%),
    radial-gradient(ellipse at 50% 53%, rgba(97,132,78,0.22), transparent 44%),
    radial-gradient(ellipse at 50% 86%, rgba(240,161,58,0.18), transparent 34%),
    linear-gradient(
      90deg,
      rgba(0,0,0,0.78) 0%,
      rgba(0,0,0,0.58) 12%,
      rgba(0,0,0,0.08) 26%,
      rgba(255,255,255,0.045) 50%,
      rgba(0,0,0,0.08) 74%,
      rgba(0,0,0,0.58) 88%,
      rgba(0,0,0,0.78) 100%
    );
  pointer-events: none;
}

#wwLeft::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 3.12rem;
  right: 0.62rem;
  border-left: 1px solid rgba(240,161,58,0.34);
  border-right: 1px solid rgba(240,161,58,0.3);
  box-shadow:
    inset 1px 0 0 rgba(255,226,155,0.08),
    inset -1px 0 0 rgba(255,226,155,0.08);
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
  width: 100%;
  padding-left: 2.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: translateY(-5.4rem);
}

.ww-mini-logo {
  display: flex;
  margin-bottom: var(--ww-rail-gap);
  filter:
    drop-shadow(0 3px 6px rgba(0,0,0,0.55))
    drop-shadow(0 0 12px rgba(255,255,255,0.14));
}

.ww-mini-logo img {
  width: 9.85rem;
  height: auto;
  display: block;
  opacity: 0.98;
  background: transparent !important;
}

.ww-mini-play {
  appearance: none;
  width: 5.95rem;
  height: 5.95rem;
  border-radius: 999px;
  border: 2px solid rgba(240,161,58,0.96);
  background:
    radial-gradient(circle at 35% 30%, rgba(54,82,73,0.36), transparent 34%),
    linear-gradient(180deg, #1f342d 0%, #0f1d19 100%);
  color: #fff;
  cursor: pointer;
  box-shadow:
    0 16px 28px rgba(0,0,0,0.48),
    0 0 24px rgba(240,161,58,0.38),
    0 0 5px rgba(255,226,155,0.3);
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
  inset: -3px;
  border-radius: 999px;
  padding: 2px;
  background:
    conic-gradient(
      from 0deg,
      transparent 0deg,
      transparent 292deg,
      rgba(255,238,188,1) 313deg,
      rgba(240,161,58,1) 326deg,
      transparent 342deg,
      transparent 360deg
    );
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude;
  animation: wwRimGleam 4.2s linear infinite;
  pointer-events: none;
}

.ww-mini-play::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow:
    0 0 18px rgba(240,161,58,0.28),
    0 0 30px rgba(255,226,155,0.16);
  pointer-events: none;
}

@keyframes wwRimGleam {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.ww-mini-play:hover {
  transform: translateY(-1px) scale(1.035);
  box-shadow:
    0 20px 38px rgba(0,0,0,0.5),
    0 0 36px rgba(240,161,58,0.48),
    0 0 8px rgba(255,226,155,0.28);
}

.ww-mini-play-icon {
  position: relative;
  z-index: 2;
  width: 0;
  height: 0;
  border-top: 0.92rem solid transparent;
  border-bottom: 0.92rem solid transparent;
  border-left: 1.46rem solid #fff;
  margin-left: 0.26rem;
  filter: drop-shadow(0 0 5px rgba(255,255,255,0.22));
}

.ww-mini-play[data-playing="true"] .ww-mini-play-icon {
  width: 1.32rem;
  height: 1.62rem;
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
  gap: 1.12rem;
  margin-top: 1.1rem;
}

.ww-mini-textlink {
  appearance: none;
  background: transparent;
  border: 0;
  padding: 0;
  line-height: 1;
  text-decoration: none;
  font-family: Georgia, "Times New Roman", serif;
  font-weight: 900;
  font-size: 1.08rem;
  letter-spacing: 0.44em;
  text-transform: uppercase;
  color: var(--ww-ink-soft);
  opacity: 0.94;
  cursor: pointer;
  text-shadow:
    0 2px 4px rgba(0,0,0,0.82),
    0 0 8px rgba(255,255,255,0.05);
  transition:
    color 180ms ease,
    opacity 180ms ease,
    transform 180ms ease,
    text-shadow 180ms ease;
}

.ww-mini-textlink:hover {
  color: #ffffff;
  opacity: 1;
  transform: scale(1.045);
  text-shadow:
    0 2px 5px rgba(0,0,0,0.82),
    0 0 12px rgba(255,255,255,0.16),
    0 0 22px rgba(240,161,58,0.26);
}

.ww-mini-textlink[data-active="true"] {
  position: relative;
  color: #ffffff;
  opacity: 1;
  text-shadow:
    0 2px 5px rgba(0,0,0,0.82),
    0 0 12px rgba(255,255,255,0.24),
    0 0 22px rgba(240,161,58,0.46),
    0 0 34px rgba(255,226,155,0.16);
}

.ww-mini-textlink[data-active="true"]::before,
.ww-mini-textlink[data-active="true"]::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 1.72rem;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(240,161,58,0.98),
    rgba(255,226,155,0.86)
  );
  box-shadow:
    0 0 12px rgba(240,161,58,0.62),
    0 0 18px rgba(255,226,155,0.28);
}

.ww-mini-textlink[data-active="true"]::before {
  right: calc(100% + 0.7rem);
  transform: translateY(-50%);
}

.ww-mini-textlink[data-active="true"]::after {
  left: calc(100% + 0.7rem);
  transform: translateY(-50%) rotate(180deg);
}

.ww-mini-sprig {
  position: absolute;
  bottom: 1.25rem;
  left: calc(50% + 1.12rem);
  width: 15.95rem;
  height: auto;
  transform: translateX(-50%);
  pointer-events: none;
  filter:
    drop-shadow(0 8px 10px rgba(0,0,0,0.34))
    drop-shadow(0 0 10px rgba(240,161,58,0.16))
    drop-shadow(0 0 22px rgba(255,226,155,0.08));
}

.ww-mini-sprig img {
  width: 100%;
  height: auto;
  display: block;
  opacity: 0.96;
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
  width: min(78vw, 1520px);
  max-width: calc(100vw - var(--ww-left-narrow) - 5rem);
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
  max-height: 86vh;
  object-fit: contain;
  border-radius: 1.2rem;
  background: #000;
  box-shadow:
    0 38px 110px rgba(0,0,0,0.52);
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
    --ww-left-narrow: 11rem;
    --ww-rail-gap: 1.7rem;
  }

  #wwLeft::after {
    left: 1.4rem;
    right: 0.42rem;
  }

  .ww-mini-core {
    padding-left: 0.8rem;
    transform: translateY(-4.4rem);
  }

  .ww-mini-logo img {
    width: 7.4rem;
  }

  .ww-mini-play {
    width: 4.7rem;
    height: 4.7rem;
  }

  .ww-mini-textlink {
    font-size: 0.84rem;
  }

  .ww-mini-sprig {
    width: 9.6rem;
    bottom: 0.65rem;
    left: calc(50% + 0.4rem);
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
        <img src="/assets/winterword/shared/sprig.png" alt="">
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
