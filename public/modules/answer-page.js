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
  --ww-left-zone: 19.75rem;
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
    url("/assets/winterword/shared/fullanswer.png") center center / cover no-repeat;
}

.ww-mini-shell {
  position: absolute;
  top: 0;
  left: 0;
  width: var(--ww-left-zone);
  height: 100%;
  z-index: 30;
  pointer-events: none;
}

.ww-mini-core {
  position: absolute;
  top: 46%;
  left: 58%;
  width: 100%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.ww-mini-play,
.ww-mini-textlink {
  pointer-events: auto;
}

.ww-mini-play {
  appearance: none;
  width: 5.4rem;
  height: 5.4rem;
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
  margin-bottom: 2.3rem;
  box-shadow:
    0 1rem 2rem rgba(0,0,0,0.64),
    0 0 1rem rgba(239,174,74,0.22);
  overflow: hidden;
  transform: translateY(0) scale(1);
  transition:
    transform 160ms ease,
    box-shadow 160ms ease,
    filter 160ms ease;
}

.ww-mini-play:hover {
  transform: translateY(-0.08rem) scale(1.035);
  filter: brightness(1.08);
  box-shadow:
    0 1.15rem 2.35rem rgba(0,0,0,0.72),
    0 0 1.4rem rgba(239,174,74,0.42);
}

.ww-mini-play:active {
  transform: translateY(0.16rem) scale(0.94);
  filter: brightness(0.88);
  box-shadow:
    0 0.45rem 0.95rem rgba(0,0,0,0.78),
    0 0 0.55rem rgba(239,174,74,0.2);
}

.ww-mini-play::before {
  content: "";
  position: absolute;
  inset: 0.3rem;
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
  top: 0.38rem;
  right: 0.38rem;
  width: 0.9rem;
  height: 0.9rem;
  background:
    radial-gradient(circle, #ffffff 0%, #fff1b0 24%, rgba(246,186,76,0.72) 42%, rgba(246,186,76,0) 72%);
  clip-path: polygon(50% 0%, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0% 50%, 39% 39%);
}

.ww-mini-play-glow {
  position: absolute;
  inset: -40%;
  z-index: 1;
  background: linear-gradient(
    115deg,
    transparent 35%,
    rgba(255,242,184,0.34) 46%,
    rgba(255,255,255,0.58) 50%,
    rgba(255,242,184,0.24) 54%,
    transparent 65%
  );
  transform: translateX(-85%) rotate(8deg);
  opacity: 0;
  pointer-events: none;
}

.ww-mini-play:hover .ww-mini-play-glow {
  animation: wwButtonGleam 1.25s ease forwards;
}

.ww-mini-play-icon {
  position: relative;
  z-index: 2;
  width: 0;
  height: 0;
  border-top: 0.9rem solid transparent;
  border-bottom: 0.9rem solid transparent;
  border-left: 1.4rem solid #ffffff;
  margin-left: 0.24rem;
  transition: transform 160ms ease;
}

.ww-mini-play:active .ww-mini-play-icon {
  transform: scale(0.88);
}

.ww-mini-play[data-playing="true"] .ww-mini-play-icon {
  width: 1.2rem;
  height: 1.5rem;
  border: 0;
  margin-left: 0;
  background:
    linear-gradient(90deg, #fff 0 35%, transparent 35% 65%, #fff 65% 100%);
}

.ww-mini-textnav {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.95rem;
}

.ww-mini-textlink {
  appearance: none;
  background: transparent;
  border: 0;
  padding: 0;
  line-height: 1;
  font-family: Georgia, "Times New Roman", serif;
  font-weight: 800;
  font-size: 0.82rem;
  letter-spacing: 0.38em;
  text-transform: uppercase;
  color: var(--ww-ink-soft);
  cursor: pointer;
  text-align: center;
  text-shadow:
    0 2px 5px rgba(0,0,0,0.86),
    0 0 8px rgba(255,255,255,0.05);
  position: relative;
  transition:
    color 180ms ease,
    text-shadow 180ms ease,
    transform 180ms ease;
}

.ww-mini-textlink:hover {
  color: #fff6d7;
  transform: translateX(0.08rem);
  text-shadow:
    0 2px 5px rgba(0,0,0,0.9),
    0 0 0.75rem rgba(246,186,76,0.36);
}

.ww-mini-textlink::after {
  content: "";
  position: absolute;
  left: -0.15rem;
  right: 0.15rem;
  top: 50%;
  height: 2px;
  border-radius: 999px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(111,63,16,0.2) 8%,
    rgba(238,171,67,0.95) 28%,
    rgba(255,239,177,1) 50%,
    rgba(238,171,67,0.95) 72%,
    rgba(111,63,16,0.2) 92%,
    transparent 100%
  );
  box-shadow:
    0 0 0.4rem rgba(239,174,74,0.45),
    0 1px 2px rgba(0,0,0,0.65);
  transform: translateY(-50%) scaleX(0);
  transform-origin: left center;
  opacity: 0;
  pointer-events: none;
}

.ww-mini-textlink:hover::after {
  animation: wwGoldStrike 520ms ease forwards;
}

.ww-mini-textlink[data-active="true"] {
  color: #ffffff;
}

.ww-mini-textlink[data-active="true"]::before {
  content: "";
  position: absolute;
  top: 50%;
  width: 1.7rem;
  height: 1px;
  right: calc(100% + 0.55rem);
  transform: translateY(-50%);
  background: linear-gradient(90deg, transparent, rgba(240,161,58,0.98), rgba(255,226,155,0.9));
}

.ww-mini-textlink[data-active="true"] .ww-active-slash {
  display: none;
}

.ww-mini-textlink[data-active="true"]::after {
  left: calc(100% + 0.55rem);
  right: auto;
  width: 1.7rem;
  height: 1px;
  opacity: 1;
  transform: translateY(-50%) rotate(180deg) scaleX(1);
  animation: none;
}

#wwRight {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3vh 3vw 3vh calc(var(--ww-left-zone) + 3rem);
  z-index: 10;
}

.ww-answer-stage {
  width: min(58vw, 1080px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.ww-answer-frame {
  width: 100%;
  padding: 0.42rem;
  border-radius: 1.2rem;
  background:
    linear-gradient(145deg,
      rgba(255,240,184,0.96) 0%,
      rgba(231,178,78,0.98) 18%,
      rgba(164,103,36,0.98) 42%,
      rgba(245,202,112,0.98) 68%,
      rgba(112,64,15,0.98) 100%);
  box-shadow:
    0 0 0 1px rgba(255,228,155,0.16),
    0 1.4rem 3rem rgba(0,0,0,0.72),
    0 0 1.6rem rgba(239,174,74,0.12);
  position: relative;
}

.ww-answer-frame::before {
  content: "";
  position: absolute;
  inset: 0.22rem;
  border-radius: 0.95rem;
  border: 1px solid rgba(255,232,166,0.22);
  pointer-events: none;
}

.ww-answer-frame::after {
  content: "";
  position: absolute;
  inset: 0.45rem;
  border-radius: 0.82rem;
  border: 1px solid rgba(82,52,18,0.28);
  pointer-events: none;
}

.ww-answer-inner {
  width: 100%;
  border-radius: 0.9rem;
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

@keyframes wwButtonGleam {
  0% {
    opacity: 0;
    transform: translateX(-85%) rotate(8deg);
  }

  18% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: translateX(85%) rotate(8deg);
  }
}

@keyframes wwGoldStrike {
  0% {
    opacity: 0;
    transform: translateY(-50%) scaleX(0);
  }

  18% {
    opacity: 1;
  }

  100% {
    opacity: 1;
    transform: translateY(-50%) scaleX(1);
  }
}

@media (max-width: 900px) {
  :root {
    --ww-left-zone: 16.5rem;
  }

  .ww-mini-core {
    top: 41%;
  }

  .ww-mini-play {
    width: 4.8rem;
    height: 4.8rem;
  }

  .ww-mini-textlink {
    font-size: 0.72rem;
    letter-spacing: 0.28em;
  }

  #wwRight {
    padding-left: calc(var(--ww-left-zone) + 1.5rem);
  }

  .ww-answer-stage {
    width: min(64vw, 980px);
  }
}
</style>

<div id="wwPortal">
  <div class="ww-mini-shell" aria-label="Answer Rail">
    <div class="ww-mini-core">
      ${
        showRailButton
          ? `
            <button class="ww-mini-play" id="wwPlayButton" type="button" aria-label="${hasPlayableMedia ? "Play answer media" : "Play"}" data-playing="false">
              <span class="ww-mini-play-glow" aria-hidden="true"></span>
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
