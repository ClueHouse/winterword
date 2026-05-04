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

  /* MASTER GROUP POSITION */
  --ww-hotspot-group-left: 17%;
  --ww-hotspot-group-top: 50.5%;

  /* INTERNAL GROUP SPACING */
  --ww-hotspot-gap: 9.3%;

  /* PLAY BUTTON */
  --ww-hotspot-play-top: 38.5%;

  /* DIMENSIONS */
  --ww-hotspot-base-width: 11%;
  --ww-hotspot-base-height: 4.8%;

  --ww-hotspot-clues-width: 17%;
  --ww-hotspot-clues-height: 4.8%;

  --ww-hotspot-life-width: 11%;
  --ww-hotspot-life-height: 4.8%;

  --ww-hotspot-play-size: 8%;

  /* DEBUG */
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
    linear-gradient(
      145deg,
      rgba(24,24,24,0.98) 0%,
      rgba(10,10,10,1) 18%,
      rgba(38,38,38,0.96) 36%,
      rgba(6,6,6,1) 58%,
      rgba(28,28,28,0.96) 78%,
      rgba(0,0,0,1) 100%
    ),
    repeating-linear-gradient(
      45deg,
      rgba(255,255,255,0.018) 0px,
      rgba(255,255,255,0.018) 2px,
      transparent 2px,
      transparent 6px
    ),
    repeating-linear-gradient(
      -45deg,
      rgba(255,255,255,0.012) 0px,
      rgba(255,255,255,0.012) 2px,
      transparent 2px,
      transparent 6px
    );

  border: 2px solid rgba(70,70,70,0.35);

  box-shadow:
    0 0 0 2px rgba(0,0,0,0.92),
    0 12px 32px rgba(0,0,0,0.72),
    inset 0 0 10px rgba(255,255,255,0.03),
    inset 0 0 24px rgba(0,0,0,0.55);
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

/* BASE */
.ww-hotspot-base {
  left: var(--ww-hotspot-group-left);
  top: var(--ww-hotspot-group-top);
  width: var(--ww-hotspot-base-width);
  height: var(--ww-hotspot-base-height);
}

/* CLUES */
.ww-hotspot-clues {
  left: var(--ww-hotspot-group-left);
  top: calc(var(--ww-hotspot-group-top) + var(--ww-hotspot-gap));
  width: var(--ww-hotspot-clues-width);
  height: var(--ww-hotspot-clues-height);
}

/* LIFE */
.ww-hotspot-life {
  left: var(--ww-hotspot-group-left);
  top: calc(var(--ww-hotspot-group-top) + (var(--ww-hotspot-gap) * 2));
  width: var(--ww-hotspot-life-width);
  height: var(--ww-hotspot-life-height);
}

/* PLAY */
.ww-hotspot-play {
  left: var(--ww-hotspot-group-left);
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

      <button
        class="ww-hotspot ww-hotspot-base"
        type="button"
        data-nav="base-station"
        aria-label="Go to Base Station"
      >
        <span class="ww-screen-reader-only">Base Station</span>
      </button>

      <button
        class="ww-hotspot ww-hotspot-clues"
        type="button"
        data-nav="clues"
        aria-label="Go to Clues"
      >
        <span class="ww-screen-reader-only">Clues</span>
      </button>

      <button
        class="ww-hotspot ww-hotspot-life"
        type="button"
        data-nav="lifeline"
        aria-label="Go to Lifeline"
      >
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
