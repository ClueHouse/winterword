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
  const showRailButton = true;

  app.innerHTML = `
<style>
:root {
  --ww-rail-visible-width: 19.75rem;
  --ww-rail-frame-centre: 9.875rem;
  --ww-ink-soft: #d8d4c3;
}

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  width: 100%;
  height: 100%;
}

body {
  background: #000;
}

#wwPortal {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  color: #f5f7fb;
  background:
    radial-gradient(circle at 42% 45%, rgba(82,118,62,0.24) 0%, rgba(38,63,33,0.52) 34%, rgba(7,16,10,0.98) 78%),
    radial-gradient(circle at 12% 50%, rgba(108,145,70,0.14), transparent 36%),
    linear-gradient(90deg, #07110b 0%, #0d1b11 38%, #08120d 72%, #030604 100%);
}

#wwPortal::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at center, rgba(255,215,120,0.025), transparent 60%),
    repeating-radial-gradient(circle at center, rgba(255,210,120,0.012) 0 2px, transparent 2px 6px);
  opacity: 0.55;
  pointer-events: none;
  z-index: 1;
}

#wwLeft {
  position: absolute;
  top: 0;
  left: 0;
  width: var(--ww-rail-visible-width);
  height: 100%;
  overflow: hidden;
  z-index: 50;
  pointer-events: none;
}

.ww-rail-frame {
  position: absolute;
  top: 0;
  left: var(--ww-rail-frame-centre);
  height: 100%;
  aspect-ratio: 1024 / 1792;
  transform: translateX(-50%);
  overflow: visible;
  pointer-events: none;
}

.ww-rail-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: fill;
  user-select: none;
  pointer-events: none;
}

.ww-mini-shell {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
}

.ww-mini-core {
  position: absolute;
  top: 46.8%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
}

.ww-mini-play,
.ww-mini-textlink {
  pointer-events: auto;
}

.ww-mini-play {
  appearance: none;
  width: 6rem;
  height: 6rem;
  border-radius: 999px;
  border: 0;
  padding: 0;
  background:
    linear-gradient(145deg, #fff0b8 0%, #e7b24e 17%, #a46724 38%, #f5ca70 62%, #70400f 100%);
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3.05rem;
  box-shadow:
    0 1.15rem 2.15rem rgba(0,0,0,0.64),
    0 0 1.1rem rgba(239,174,74,0.22);
  overflow: visible;
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
}

.ww-mini-play::after {
  content: "";
  position: absolute;
  top: 0.42rem;
  right: 0.42rem;
  width: 1rem;
  height: 1rem;
  background:
    radial-gradient(circle, #ffffff 0%, #fff1b0 24%, rgba(246,186,76,0.72) 42%, rgba(246,186,76,0) 72%);
  clip-path: polygon(50% 0%, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0% 50%, 39% 39%);
}

.ww-mini-play-icon {
  position: relative;
  z-index: 2;
  width: 0;
  height: 0;
  border-top: 1rem solid transparent;
  border-bottom: 1rem solid transparent;
  border-left: 1.58rem solid #ffffff;
  margin-left: 0.28rem;
}

.ww-mini-play[data-playing="true"] .ww-mini-play-icon {
  width: 1.34rem;
  height: 1.68rem;
  border: 0;
  margin-left: 0;
  background:
    linear-gradient(90deg, #fff 0 35%, transparent 35% 65%, #fff 65% 100%);
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
  font-family: Georgia, "Times New Roman", serif;
  font-weight: 900;
  font-size: 1.12rem;
  letter-spacing: 0.44em;
  text-transform: uppercase;
  color: var(--ww-ink-soft);
  cursor: pointer;
  text-shadow:
    0 2px 5px rgba(0,0,0,0.86),
    0 0 8px rgba(255,255,255,0.05);
}

.ww-mini-textlink[data-active="true"] {
  position: relative;
  color: #ffffff;
}

.ww-mini-textlink[data-active="true"]::before,
.ww-mini-textlink[data-active="true"]::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 2.05rem;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(240,161,58,0.98), rgba(255,226,155,0.9));
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
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3vh 3vw 3vh calc(var(--ww-rail-visible-width) + 3.5rem);
  z-index: 10;
}

.ww-answer-stage {
  width: min(68vw, 1320px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.ww-answer-frame {
  width: 100%;
  padding: 0.8rem;
  border-radius: 1.6rem;
  background:
    linear-gradient(145deg,
      rgba(255,240,184,0.96) 0%,
      rgba(231,178,78,0.98) 18%,
      rgba(164,103,36,0.98) 42%,
      rgba(245,202,112,0.98) 68%,
      rgba(112,64,15,0.98) 100%);
  box-shadow:
    0 0 0 1px rgba(255,228,155,0.18),
    0 1.6rem 3.8rem rgba(0,0,0,0.72),
    0 0 2.2rem rgba(239,174,74,0.14);
  position: relative;
}

.ww-answer-frame::before {
  content: "";
  position: absolute;
  inset: 0.28rem;
  border-radius: 1.25rem;
  border: 1px solid rgba(255,232,166,0.26);
  pointer-events: none;
}

.ww-answer-frame::after {
  content: "";
  position: absolute;
  inset: 0.62rem;
  border-radius: 1.08rem;
  border: 1px solid rgba(82,52,18,0.38);
  pointer-events: none;
}

.ww-answer-inner {
  width: 100%;
  border-radius: 1.15rem;
  overflow: hidden;
  background: radial-gradient(circle at center, rgba(30,50,38,0.22), rgba(0,0,0,0.92));
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
  max-height: 75vh;
  object-fit: contain;
  background: #000;
}

.ww-answer-empty {
  padding: 3rem;
  color: rgba(245,247,251,0.78);
  text-align: center;
}
</style>

<div id="wwPortal">
  <aside id="wwLeft" aria-label="Answer Rail">
    <div class="ww-rail-frame">
      <img class="ww-rail-image" src="/assets/winterword/shared/answer-rail.png" alt="" aria-hidden="true">

      <div class="ww-mini-shell">
        <div class="ww-mini-core">
          ${
            showRailButton
              ? `
                <button class="ww-mini-play" id="wwPlayButton" type="button" aria-label="${hasPlayableMedia ? "Play answer media" : "Play"}" data-playing="false">
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
    </div>
  </aside>

  <main id="wwRight">
    <section class="ww-answer-stage" aria-label="${esc(title)}">
      ${
        hasMedia
          ? `
            <div class="ww-answer-frame">
              <div class="ww-answer-inner">
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
              </div>
            </div>
          `
          : `<div class="ww-answer-empty">No answer media found.</div>`
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
    if (videoElement && !videoElement.paused) {
      videoElement.pause();
      videoElement.currentTime = 0;
    }

    if (audioElement && !audioElement.paused) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }

    setPlayingState(false);
  }

  if (playButton) {
    playButton.addEventListener("click", async () => {
      if (!hasPlayableMedia) return;

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
    videoElement.addEventListener("ended", pauseAll);
  }

  if (audioElement) {
    audioElement.addEventListener("ended", pauseAll);
  }
}
