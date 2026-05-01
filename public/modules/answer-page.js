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
  --ww-orange: #f0a13a;
  --ww-gold: rgba(240,161,58,0.95);
  --ww-gold-soft: rgba(255,226,155,0.44);
  --ww-ink-main: #f2efe4;
  --ww-ink-soft: #d8d4c3;
  --ww-rail-gap: 1.55rem;
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

/* -----------------------------------------------------------
   UPDATED RAIL — MATCHES THE PHOTO EXACTLY
----------------------------------------------------------- */

#wwLeft {
  width: var(--ww-left-narrow);
  flex: 0 0 var(--ww-left-narrow);
  position: relative;
  overflow: hidden;

  background:
    radial-gradient(circle at 18% 18%, rgba(240,161,58,0.22), transparent 1.4px),
    radial-gradient(circle at 72% 26%, rgba(255,226,155,0.18), transparent 1.3px),
    radial-gradient(circle at 42% 46%, rgba(240,161,58,0.18), transparent 1.5px),
    radial-gradient(circle at 84% 68%, rgba(255,226,155,0.15), transparent 1.3px),
    radial-gradient(circle at 26% 82%, rgba(240,161,58,0.18), transparent 1.4px),
    linear-gradient(
      90deg,
      #0a0f0c 0%,
      #122018 12%,
      #1c3525 28%,
      #2d4a2f 50%,
      #1c3525 72%,
      #122018 88%,
      #0a0f0c 100%
    );
  background-size:
    2.8rem 3rem,
    3rem 3.2rem,
    3.2rem 3.4rem,
    3rem 3.1rem,
    2.9rem 3.2rem,
    auto;
}

#wwLeft::before {
  content: "";
  position: absolute;
  inset: 0;

  background:
    radial-gradient(ellipse at 50% 12%, rgba(255,226,155,0.10), transparent 26%),
    radial-gradient(ellipse at 50% 48%, rgba(122,164,96,0.22), transparent 38%),
    radial-gradient(ellipse at 50% 88%, rgba(240,161,58,0.14), transparent 28%),
    radial-gradient(circle at 22% 30%, rgba(240,161,58,0.10), transparent 34%),
    radial-gradient(circle at 78% 62%, rgba(240,161,58,0.10), transparent 34%),
    linear-gradient(
      90deg,
      rgba(0,0,0,0.92) 0%,
      rgba(0,0,0,0.82) 9%,
      rgba(0,0,0,0.52) 15%,
      rgba(0,0,0,0.18) 24%,
      rgba(255,255,255,0.04) 50%,
      rgba(0,0,0,0.18) 76%,
      rgba(0,0,0,0.52) 85%,
      rgba(0,0,0,0.82) 91%,
      rgba(0,0,0,0.92) 100%
    );
  pointer-events: none;
}

#wwLeft::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;

  left: 3.2rem;
  right: 3.2rem;

  border-left: 1px solid rgba(240,161,58,0.38);
  border-right: 1px solid rgba(240,161,58,0.38);

  box-shadow:
    inset 1px 0 0 rgba(255,226,155,0.10),
    inset -1px 0 0 rgba(255,226,155,0.10),
    0 0 22px rgba(240,161,58,0.18);
  pointer-events: none;
}

/* -----------------------------------------------------------
   EVERYTHING BELOW HERE IS YOUR ORIGINAL CODE
----------------------------------------------------------- */

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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: translateY(-4.8rem);
}

.ww-mini-logo {
  display: flex;
  margin-bottom: var(--ww-rail-gap);
  filter:
    drop-shadow(0 4px 8px rgba(0,0,0,0.6))
    drop-shadow(0 0 14px rgba(255,255,255,0.12));
}

.ww-mini-logo img {
  width: 10.8rem;
  height: auto;
  display: block;
  opacity: 0.98;
  background: transparent !important;
}

.ww-mini-play {
  appearance: none;
  width: 6.35rem;
  height: 6.35rem;
  border-radius: 999px;
  border: 2px solid rgba(240,161,58,0.96);
  background:
    radial-gradient(circle at 35% 30%, rgba(54,82,73,0.34), transparent 34%),
    linear-gradient(180deg, #173028 0%, #091611 100%);
  color: #fff;
  cursor: pointer;
  box-shadow:
    0 16px 32px rgba(0,0,0,0.5),
    0 0 24px rgba(240,161,58,0.34);
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

@keyframes wwRimGleam {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.ww-mini-play-icon {
  position: relative;
  z-index: 2;
  width: 0;
  height: 0;
  border-top: 1rem solid transparent;
  border-bottom: 1rem solid transparent;
  border-left: 1.58rem solid #fff;
  margin-left: 0.28rem;
  filter: drop-shadow(0 0 4px rgba(255,255,255,0.22));
}

.ww-mini-play[data-playing="true"] .ww-mini-play-icon {
  width: 1.38rem;
  height: 1.72rem;
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
  gap: 1rem;
  margin-top: 0.8rem;
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
  opacity: 0.95;
  cursor: pointer;
  text-shadow:
    0 2px 5px rgba(0,0,0,0.82),
    0 0 8px rgba(255,255,255,0.04);
}

.ww-mini-textlink[data-active="true"] {
  position: relative;
  color: #ffffff;
  text-shadow:
    0 2px 5px rgba(0,0,0,0.82),
    0 0 12px rgba(255,255,255,0.2),
    0 0 18px rgba(240,161,58,0.38);
}

.ww-mini-textlink[data-active="true"]::before,
.ww-mini-textlink[data-active="true"]::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 1.85rem;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(240,161,58,0.98),
    rgba(255,226,155,0.8)
  );
  box-shadow:
    0 0 10px rgba(240,161,58,0.58),
    0 0 16px rgba(255,226,155,0.22);
}

.ww-mini-textlink[data-active="true"]::before {
  right: calc(100% + 0.72rem);
  transform: translateY(-50%);
}

.ww-mini-textlink[data-active="true"]::after {
  left: calc(100% + 0.72rem);
  transform: translateY(-50%) rotate(180deg);
}

.ww-mini-sprig {
  position: absolute;
  bottom: 1.4rem;
  left: 50%;
  width: 16.8rem;
  height: auto;
  transform: translateX(-50%);
  pointer-events: none;
  filter:
    brightness(0.78)
    saturate(0.82)
    drop-shadow(0 8px 12px rgba(0,0,0,0.44));
}

.ww-mini-sprig img {
  width: 100%;
  height: auto;
  display: block;
  opacity: 0.9;
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
