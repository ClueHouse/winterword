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
  --ww-ink: #e9eadf;
  --ww-left-narrow: 10.12rem;
  --ww-ink-blue: #f5f1df;
  --ww-ink-blue-hover: #ffffff;
  --ww-orange: #f0a13a;
  --ww-rail-gap: 2.35rem;
  --ww-leaf: #cfd7bf;
  --ww-rail-green-deep: #101b13;
  --ww-rail-green-mid: #1f3422;
  --ww-rail-green-soft: #314b31;
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
    radial-gradient(circle at 50% 18%, rgba(246,215,142,0.12), transparent 28%),
    radial-gradient(circle at 50% 82%, rgba(240,161,58,0.18), transparent 34%),
    radial-gradient(circle at 20% 46%, rgba(255,255,255,0.055), transparent 36%),
    linear-gradient(
      90deg,
      #0d160f 0%,
      #142416 18%,
      #233924 50%,
      #2f4a30 76%,
      #1a2a1c 100%
    ),
    repeating-linear-gradient(
      0deg,
      rgba(255,255,255,0.026) 0px,
      rgba(255,255,255,0.026) 1px,
      transparent 1px,
      transparent 4px
    ),
    repeating-linear-gradient(
      90deg,
      rgba(0,0,0,0.12) 0px,
      rgba(0,0,0,0.12) 1px,
      transparent 1px,
      transparent 5px
    );
  box-shadow:
    inset -1px 0 0 rgba(247,210,127,0.28),
    inset 1px 0 0 rgba(247,210,127,0.12),
    inset -24px 0 40px rgba(0,0,0,0.28),
    6px 0 24px rgba(0,0,0,0.45);
  overflow: hidden;
}

#wwLeft::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 28% 12%, rgba(255,236,170,0.14), transparent 1.2px),
    radial-gradient(circle at 62% 22%, rgba(240,161,58,0.18), transparent 1.4px),
    radial-gradient(circle at 44% 38%, rgba(255,255,255,0.08), transparent 1px),
    radial-gradient(circle at 74% 58%, rgba(240,161,58,0.16), transparent 1.2px),
    radial-gradient(circle at 31% 76%, rgba(255,236,170,0.12), transparent 1.2px),
    radial-gradient(circle at 66% 88%, rgba(240,161,58,0.18), transparent 1.4px);
  background-size: 2.9rem 3.1rem;
  opacity: 0.54;
  pointer-events: none;
}

#wwLeft::after {
  content: "";
  position: absolute;
  inset: 0.45rem;
  border-left: 1px solid rgba(240,161,58,0.32);
  border-right: 1px solid rgba(240,161,58,0.18);
  pointer-events: none;
  opacity: 0.8;
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
    drop-shadow(0 0 10px rgba(255,255,255,0.18))
    drop-shadow(0 0 18px rgba(240,161,58,0.14));
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
  border: 2px solid rgba(240,161,58,0.92);
  background: linear-gradient(180deg, #263a35 0%, #12201b 100%);
  color: #fff;
  cursor: pointer;
  box-shadow:
    0 14px 28px rgba(0,0,0,0.36),
    0 0 24px rgba(240,161,58,0.38);
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
    rgba(255,255,255,0.46) 50%,
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
    0 18px 34px rgba(0,0,0,0.42),
    0 0 34px rgba(240,161,58,0.52);
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
  gap: 1.08rem;
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
  letter-spacing: 0.36em;
  text-transform: uppercase;
  color: var(--ww-ink-blue);
  opacity: 0.92;
  cursor: pointer;
  text-shadow:
    0 2px 8px rgba(0,0,0,0.34),
    0 0 8px rgba(255,255,255,0.05);
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
    0 0 10px rgba(255,255,255,0.18),
    0 0 18px rgba(240,161,58,0.28);
}

.ww-mini-textlink[data-active="true"] {
  position: relative;
  color: #ffffff;
  opacity: 1;
  text-shadow:
    0 0 10px rgba(255,255,255,0.18),
    0 0 20px rgba(240,161,58,0.38);
}

.ww-mini-textlink[data-active="true"]::before,
.ww-mini-textlink[data-active="true"]::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 1.05rem;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(240,161,58,0.95));
  box-shadow: 0 0 10px rgba(240,161,58,0.52);
}

.ww-mini-textlink[data-active="true"]::before {
  right: calc(100% + 0.55rem);
  transform: translateY(-50%);
}

.ww-mini-textlink[data-active="true"]::after {
  left: calc(100% + 0.55rem);
  transform: translateY(-50%) rotate(180deg);
}

.ww-mini-sprig {
  position: absolute;
  bottom: 0.45rem;
  left: 50%;
  width: 9.7rem;
  height: 11.2rem;
  transform: translateX(-50%);
  opacity: 0.96;
  pointer-events: none;
}

.ww-mini-sprig svg {
  width: 100%;
  height: 100%;
  display: block;
  overflow: visible;
  filter:
    drop-shadow(0 0 8px rgba(240,161,58,0.22))
    drop-shadow(0 0 18px rgba(255,255,255,0.07));
}

.ww-mini-sprig .sprig-stem {
  fill: none;
  stroke: rgba(214,150,61,0.82);
  stroke-width: 1.72;
  stroke-linecap: round;
}

.ww-mini-sprig .sprig-vein {
  fill: none;
  stroke: rgba(236,231,197,0.44);
  stroke-width: 0.62;
  stroke-linecap: round;
}

.ww-mini-sprig .sprig-leaf {
  fill: rgba(207,215,191,0.2);
  stroke: rgba(229,233,210,0.78);
  stroke-width: 1.05;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.ww-mini-sprig .sprig-leaf-dark {
  fill: rgba(128,152,111,0.18);
  stroke: rgba(198,213,181,0.66);
}

.ww-mini-sprig .sprig-berry {
  fill: rgba(240,161,58,0.88);
  stroke: rgba(255,228,157,0.48);
  stroke-width: 0.55;
}

.ww-mini-sprig .sprig-glow {
  fill: rgba(255,226,155,0.72);
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
    width: 8.4rem;
    height: 9.6rem;
    bottom: 0.35rem;
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
        <svg viewBox="0 0 120 150" role="img">
          <path class="sprig-stem" d="M60 144 C55 119, 48 96, 35 75 C26 60, 17 48, 8 38" />
          <path class="sprig-stem" d="M60 144 C65 119, 73 96, 86 75 C95 60, 104 48, 113 38" />
          <path class="sprig-stem" d="M60 144 C59 118, 59 93, 60 66 C61 50, 62 34, 64 18" />

          <path class="sprig-leaf" d="M34 75 C24 72, 16 76, 11 84 C22 86, 30 83, 34 75Z" />
          <path class="sprig-vein" d="M33 76 C25 78, 19 80, 12 84" />

          <path class="sprig-leaf sprig-leaf-dark" d="M27 61 C18 58, 11 60, 6 67 C16 70, 23 68, 27 61Z" />
          <path class="sprig-vein" d="M26 62 C19 63, 13 65, 7 67" />

          <path class="sprig-leaf" d="M20 48 C12 44, 6 45, 1 51 C10 55, 16 54, 20 48Z" />
          <path class="sprig-vein" d="M19 49 C13 50, 8 50, 2 51" />

          <path class="sprig-leaf" d="M46 99 C36 96, 27 101, 22 110 C34 112, 42 108, 46 99Z" />
          <path class="sprig-vein" d="M45 100 C36 102, 30 105, 23 110" />

          <path class="sprig-leaf sprig-leaf-dark" d="M51 117 C42 116, 35 121, 31 129 C41 130, 48 126, 51 117Z" />
          <path class="sprig-vein" d="M50 118 C43 121, 38 124, 32 129" />

          <path class="sprig-leaf" d="M86 75 C96 72, 104 76, 109 84 C98 86, 90 83, 86 75Z" />
          <path class="sprig-vein" d="M87 76 C95 78, 101 80, 108 84" />

          <path class="sprig-leaf sprig-leaf-dark" d="M93 61 C102 58, 109 60, 114 67 C104 70, 97 68, 93 61Z" />
          <path class="sprig-vein" d="M94 62 C101 63, 107 65, 113 67" />

          <path class="sprig-leaf" d="M100 48 C108 44, 114 45, 119 51 C110 55, 104 54, 100 48Z" />
          <path class="sprig-vein" d="M101 49 C107 50, 112 50, 118 51" />

          <path class="sprig-leaf" d="M74 99 C84 96, 93 101, 98 110 C86 112, 78 108, 74 99Z" />
          <path class="sprig-vein" d="M75 100 C84 102, 90 105, 97 110" />

          <path class="sprig-leaf sprig-leaf-dark" d="M69 117 C78 116, 85 121, 89 129 C79 130, 72 126, 69 117Z" />
          <path class="sprig-vein" d="M70 118 C77 121, 82 124, 88 129" />

          <path class="sprig-leaf" d="M60 69 C52 62, 52 52, 59 43 C66 52, 67 61, 60 69Z" />
          <path class="sprig-vein" d="M60 68 C60 60, 60 52, 59 44" />

          <path class="sprig-leaf sprig-leaf-dark" d="M64 43 C57 36, 58 27, 65 20 C71 29, 71 37, 64 43Z" />
          <path class="sprig-vein" d="M64 42 C64 35, 65 28, 65 21" />

          <circle class="sprig-berry" cx="60" cy="140" r="4.2" />
          <circle class="sprig-glow" cx="58.7" cy="138.5" r="1.05" />

          <circle class="sprig-berry" cx="49" cy="128" r="3.35" />
          <circle class="sprig-glow" cx="47.9" cy="126.8" r="0.85" />

          <circle class="sprig-berry" cx="71" cy="128" r="3.35" />
          <circle class="sprig-glow" cx="69.9" cy="126.8" r="0.85" />

          <circle class="sprig-berry" cx="39" cy="105" r="2.85" />
          <circle class="sprig-berry" cx="81" cy="105" r="2.85" />
          <circle class="sprig-berry" cx="60" cy="84" r="2.55" />
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
