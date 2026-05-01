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
    62% center / cover
    no-repeat;
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
  position: absolute;
  top: 44%;
  left: 53%;
  width: 100%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ww-mini-play {
  appearance: none;
  width: 7.15rem;
  height: 7.15rem;
  border-radius: 999px;
  border: 3px solid rgba(233,170,73,0.96);
  background:
    radial-gradient(circle at 34% 28%, rgba(70,100,90,0.24), transparent 34%),
    radial-gradient(circle at 50% 50%, rgba(8,22,19,0.25), transparent 62%),
    linear-gradient(180deg, #10251f 0%, #05100d 100%);
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3.8rem;
  box-shadow:
    0 18px 34px rgba(0,0,0,0.62),
    0 0 18px rgba(240,161,58,0.18);
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.ww-mini-play:hover {
  transform: scale(1.03);
  box-shadow:
    0 20px 38px rgba(0,0,0,0.68),
    0 0 26px rgba(240,161,58,0.32);
}

.ww-mini-play::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow:
    inset 0 0 0 2px rgba(255,227,160,0.18),
    inset 0 -10px 18px rgba(0,0,0,0.34);
  pointer-events: none;
}

.ww-mini-play::after {
  content: "";
  position: absolute;
  top: 1rem;
  right: 0.9rem;
  width: 1rem;
  height: 1rem;
  background:
    radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,225,150,0.95) 35%, rgba(255,180,60,0) 72%);
  filter: blur(0.2px);
  pointer-events: none;
}

.ww-mini-play-icon {
  position: relative;
  z-index: 2;
  width: 0;
  height: 0;
  border-top: 1.15rem solid transparent;
  border-bottom: 1.15rem solid transparent;
  border-left: 1.8rem solid #ffffff;
  margin-left: 0.38rem;
  filter:
    drop-shadow(0 0 6px rgba(255,255,255,0.18));
}

.ww-mini-play[data-playing="true"] .ww-mini-play-icon {
  width: 1.55rem;
  height: 1.95rem;
  border: 0;
  margin-left: 0;
  background:
    linear-gradient(
      90deg,
      #fff 0 36%,
      transparent 36% 64%,
      #fff 64% 100%
    );
}

.ww-mini-textnav {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.35rem;
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
  font-size: 1.16rem;
  letter-spacing: 0.46em;
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
  width: 2.25rem;
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
  right: calc(100% + 0.82rem);
  transform: translateY(-50%);
}

.ww-mini-textlink[data-active="true"]::after {
  left: calc(100% + 0.82rem);
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
