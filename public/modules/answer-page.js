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
  --ww-left-narrow: 21.5rem;
  --ww-ink-soft: #d8d4c3;
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
    #000
    url("/assets/winterword/shared/answer-rail.png")
    58% center / cover
    no-repeat;
}

.ww-mini-shell {
  position: relative;
  z-index: 2;
  height: 100%;
}

.ww-mini-core {
  position: absolute;
  top: 50%;
  left: 40%;
  width: 100%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ww-mini-play {
  appearance: none;
  width: 6.35rem;
  height: 6.35rem;
  border-radius: 999px;
  border: 0;
  padding: 0;
  background:
    linear-gradient(145deg, #fff0b8 0%, #e6b04d 18%, #9b621f 38%, #f5ca70 62%, #70400f 100%);
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3.15rem;
  box-shadow:
    0 1.15rem 2.15rem rgba(0,0,0,0.64),
    0 0 1.1rem rgba(239,174,74,0.22);
  overflow: visible;
  transition:
    transform 160ms ease,
    box-shadow 160ms ease,
    filter 160ms ease;
}

.ww-mini-play:hover {
  transform: translateY(-1px) scale(1.018);
  filter: brightness(1.05);
  box-shadow:
    0 1.3rem 2.4rem rgba(0,0,0,0.7),
    0 0 1.45rem rgba(239,174,74,0.32);
}

.ww-mini-play:active {
  transform: translateY(1px) scale(0.992);
}

.ww-mini-play::before {
  content: "";
  position: absolute;
  inset: 0.34rem;
  border-radius: inherit;
  background:
    radial-gradient(circle at 38% 28%, rgba(78,112,94,0.34), transparent 33%),
    radial-gradient(circle at 52% 58%, rgba(3,9,8,0.9), rgba(8,25,20,0.98) 68%, #020605 100%);
  box-shadow:
    inset 0 0 0 1px rgba(255,242,184,0.2),
    inset 0 0.45rem 0.75rem rgba(255,255,255,0.06),
    inset 0 -0.75rem 1.05rem rgba(0,0,0,0.6);
  pointer-events: none;
}

.ww-mini-play::after {
  content: "";
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  width: 1.05rem;
  height: 1.05rem;
  background:
    radial-gradient(circle, #ffffff 0%, #fff1b0 24%, rgba(246,186,76,0.72) 42%, rgba(246,186,76,0) 72%);
  clip-path: polygon(
    50% 0%,
    61% 39%,
    100% 50%,
    61% 61%,
    50% 100%,
    39% 61%,
    0% 50%,
    39% 39%
  );
  filter:
    drop-shadow(0 0 0.35rem rgba(255,230,150,0.72))
    drop-shadow(0 0 0.7rem rgba(240,161,58,0.4));
  pointer-events: none;
}

.ww-mini-play-icon {
  position: relative;
  z-index: 2;
  width: 0;
  height: 0;
  border-top: 1.02rem solid transparent;
  border-bottom: 1.02rem solid transparent;
  border-left: 1.62rem solid #ffffff;
  margin-left: 0.28rem;
  filter:
    drop-shadow(0 0 0.28rem rgba(255,255,255,0.18))
    drop-shadow(0 0.08rem 0.12rem rgba(0,0,0,0.5));
}

.ww-mini-play[data-playing="true"] .ww-mini-play-icon {
  width: 1.38rem;
  height: 1.74rem;
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
  gap: 1.22rem;
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
  font-size: 1.12rem;
  letter-spacing: 0.44em;
  text-transform: uppercase;
  color: var(--ww-ink-soft);
  opacity: 0.96;
  cursor: pointer;
  text-shadow:
    0 2px 5px rgba(0,0,0,0.86),
    0 0 8px rgba(255,255,255,0.05);
}

.ww-mini-textlink:hover {
  color: #ffffff;
}

.ww-mini-textlink[data-active="true"] {
  position: relative;
  color: #ffffff;
  text-shadow:
    0 2px 5px rgba(0,0,0,0.86),
    0 0 12px rgba(255,255,255,0.2),
    0 0 18px rgba(240,161,58,0.34);
}

.ww-mini-textlink[data-active="true"]::before,
.ww-mini-textlink[data-active="true"]::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 2.05rem;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(240,161,58,0.98),
    rgba(255,226,155,0.9)
  );
  box-shadow:
    0 0 10px rgba(240,161,58,0.55),
    0 0 14px rgba(255,226,155,0.18);
}

.ww-mini-textlink[data-active="true"]::before {
  right: calc(100% + 0.78rem);
  transform: translateY(-50%);
}

.ww-mini-textlink[data-active="true"]::after {
  left: calc(100% + 0.78rem);
  transform: translateY(-50%) rotate(180deg);
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

@media (max-height: 760px) {
  .ww-mini-core {
    top: 52%;
  }

  .ww-mini-play {
    width: 5.65rem;
    height: 5.65rem;
    margin-bottom: 2.35rem;
  }

  .ww-mini-textnav {
    gap: 1rem;
  }

  .ww-mini-textlink {
    font-size: 1rem;
  }
}
</style>

<div id="wwPortal">
  <aside id="wwLeft" aria-label="Answer Rail">
    <div class="ww-mini-shell">
      <div class="ww-mini-core">

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
      if (typeof navigate === "function") navigate(target);
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
    if (videoElement && !videoElement.paused) videoElement.pause();
    if (audioElement && !audioElement.paused) audioElement.pause();
    setPlayingState(false);
  }

  if (playButton) {
    playButton.addEventListener("click", async () => {
      try {
        const shouldPlay =
          (videoElement ? videoElement.paused : true) &&
          (audioElement ? audioElement.paused : true);

        if (shouldPlay) {
          if (videoElement) await videoElement.play();
          if (audioElement) await audioElement.play();
          setPlayingState(true);
        } else {
          pauseAll();
        }
      } catch {
        pauseAll();
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
      if (videoElement && !videoElement.paused) videoElement.pause();
      setPlayingState(false);
    });
  }
}
