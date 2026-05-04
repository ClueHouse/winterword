export function renderCluePage(app, data = {}, navigate) {
  const {
    clueId = 1,
    clue = {}
  } = data;

  const {
    title = `Clue ${String(clueId).padStart(2, "0")}`,
    variant = "image-only",
    image = "",
    alt = title,
    body = "",
    audio = ""
  } = clue;

  function esc(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  const hasAudio = variant === "image-audio" && audio;

  app.innerHTML = `
<style>
:root {
  --ww-clue-bg: url("/assets/winterword/shared/fullclues.png");

  --ww-hotspot-base-left: 18%;
  --ww-hotspot-base-top: 46.2%;
  --ww-hotspot-base-width: 11%;
  --ww-hotspot-base-height: 4.8%;

  --ww-hotspot-clues-left: 18%;
  --ww-hotspot-clues-top: 55.3%;
  --ww-hotspot-clues-width: 17%;
  --ww-hotspot-clues-height: 4.8%;

  --ww-hotspot-life-left: 18%;
  --ww-hotspot-life-top: 64.8%;
  --ww-hotspot-life-width: 11%;
  --ww-hotspot-life-height: 4.8%;

  --ww-hotspot-play-left: 18%;
  --ww-hotspot-play-top: 38.5%;
  --ww-hotspot-play-size: 8%;

  --ww-debug-border: 2px solid rgba(255, 0, 0, 0.95);
  --ww-debug-fill: rgba(255, 0, 0, 0.08);
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
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  overflow: hidden;
  background: #000;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  position: relative;
}

.ww-clue-stage {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: #000;
}

.ww-clue-map {
  position: absolute;
  inset: 0;
  background-image: var(--ww-clue-bg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  overflow: hidden;
}

.ww-main-clue {
  position: absolute;
  right: 7vw;
  top: 50%;
  transform: translateY(-50%);
  width: min(54vw, 1088px);
  max-height: 78vh;
  object-fit: contain;
  display: block;
  z-index: 2;

  padding: 0.9rem;
  background:
    linear-gradient(145deg,
      rgba(115,115,115,0.95) 0%,
      rgba(58,58,58,0.98) 18%,
      rgba(138,138,138,0.92) 38%,
      rgba(44,44,44,0.98) 58%,
      rgba(95,95,95,0.94) 78%,
      rgba(28,28,28,1) 100%);
  border:
    2px solid rgba(170,170,170,0.35);

  box-shadow:
    0 0 0 2px rgba(25,25,25,0.85),
    0 10px 28px rgba(0,0,0,0.55),
    inset 0 0 12px rgba(255,255,255,0.08),
    inset 0 0 22px rgba(0,0,0,0.35);
}

.ww-clue-fallback {
  position: absolute;
  right: 7vw;
  top: 50%;
  transform: translateY(-50%);
  width: min(54vw, 760px);
  padding: 2rem;
  border-radius: 1rem;
  background: rgba(255,255,255,0.08);
  color: #fff;
  text-align: center;
  z-index: 2;
}

.ww-clue-fallback h1 {
  margin: 0 0 1rem;
  font-size: 2rem;
}

.ww-clue-fallback p {
  margin: 0;
  color: rgba(255,255,255,0.76);
  line-height: 1.6;
  white-space: pre-wrap;
}

.ww-hotspot {
  appearance: none;
  position: absolute;
  z-index: 5;
  display: block;
  padding: 0;
  margin: 0;
  border: var(--ww-debug-border);
  background: var(--ww-debug-fill);
  cursor: pointer;
  transform: translate(-50%, -50%);
  transition:
    transform 140ms ease,
    box-shadow 140ms ease,
    background 140ms ease;
}

.ww-hotspot:hover {
  background: rgba(240, 138, 36, 0.16);
  box-shadow:
    0 0 0 1px rgba(240, 138, 36, 0.5),
    0 0 18px rgba(240, 138, 36, 0.4);
}

.ww-hotspot:active {
  transform: translate(-50%, -50%) scale(0.96);
}

.ww-hotspot:focus-visible {
  outline: 3px solid rgba(240, 138, 36, 0.95);
  outline-offset: 4px;
}

.ww-hotspot-base {
  left: var(--ww-hotspot-base-left);
  top: var(--ww-hotspot-base-top);
  width: var(--ww-hotspot-base-width);
  height: var(--ww-hotspot-base-height);
}

.ww-hotspot-clues {
  left: var(--ww-hotspot-clues-left);
  top: var(--ww-hotspot-clues-top);
  width: var(--ww-hotspot-clues-width);
  height: var(--ww-hotspot-clues-height);
}

.ww-hotspot-life {
  left: var(--ww-hotspot-life-left);
  top: var(--ww-hotspot-life-top);
  width: var(--ww-hotspot-life-width);
  height: var(--ww-hotspot-life-height);
}

.ww-hotspot-play {
  left: var(--ww-hotspot-play-left);
  top: var(--ww-hotspot-play-top);
  width: var(--ww-hotspot-play-size);
  height: var(--ww-hotspot-play-size);
  border-radius: 999px;
}

.ww-hotspot-play[data-playing="true"] {
  background: rgba(240, 138, 36, 0.22);
  box-shadow:
    0 0 0 1px rgba(240, 138, 36, 0.65),
    0 0 24px rgba(240, 138, 36, 0.5);
}

.ww-screen-reader-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}
</style>

<div id="wwPortal">
  <main class="ww-clue-stage" aria-label="${esc(title)}">
    <section class="ww-clue-map" aria-label="WinterWord clue page">

      ${
        image
          ? `
            <img
              class="ww-main-clue"
              src="${esc(image)}"
              alt="${esc(alt)}"
              loading="lazy"
              decoding="async"
            >
          `
          : `
            <section class="ww-clue-fallback">
              <h1>${esc(title)}</h1>
              <p>${body ? esc(body) : "No clue image has been supplied yet."}</p>
            </section>
          `
      }

      ${
        hasAudio
          ? `
            <button
              class="ww-hotspot ww-hotspot-play"
              id="wwPlayButton"
              type="button"
              aria-label="Play clue audio"
              data-playing="false"
            >
              <span class="ww-screen-reader-only">Play clue audio</span>
            </button>
          `
          : ""
      }

      <button class="ww-hotspot ww-hotspot-base" type="button" data-nav="base-station" aria-label="Go to Base Station">
        <span class="ww-screen-reader-only">Base Station</span>
      </button>

      <button class="ww-hotspot ww-hotspot-clues" type="button" data-nav="clues" aria-label="Go to Clues">
        <span class="ww-screen-reader-only">Clues</span>
      </button>

      <button class="ww-hotspot ww-hotspot-life" type="button" data-nav="lifeline" aria-label="Go to Lifeline">
        <span class="ww-screen-reader-only">Lifeline</span>
      </button>

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

  if (hasAudio) {
    const playButton = app.querySelector("#wwPlayButton");
    const audioElement = new Audio(audio);

    if (playButton) {
      playButton.addEventListener("click", async () => {
        try {
          if (audioElement.paused) {
            await audioElement.play();
            playButton.setAttribute("data-playing", "true");
            playButton.setAttribute("aria-label", "Pause clue audio");
          } else {
            audioElement.pause();
            playButton.setAttribute("data-playing", "false");
            playButton.setAttribute("aria-label", "Play clue audio");
          }
        } catch {
          playButton.setAttribute("data-playing", "false");
          playButton.setAttribute("aria-label", "Audio could not play");
        }
      });

      audioElement.addEventListener("ended", () => {
        playButton.setAttribute("data-playing", "false");
        playButton.setAttribute("aria-label", "Play clue audio");
      });
    }
  }
}
