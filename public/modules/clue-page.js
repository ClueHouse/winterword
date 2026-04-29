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
  --ww-ink: #3b4149;
  --ww-left-narrow: 8.8rem;
  --ww-ink-blue: #1f3f57;
  --ww-ink-blue-hover: #163244;
  --ww-rail-bg: #f4f8fb;
  --ww-orange: #f08a24;
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
}

#wwLeft {
  width: var(--ww-left-narrow);
  background: var(--ww-rail-bg);
  box-shadow: inset -1px 0 0 rgba(0,0,0,0.04);
  flex: 0 0 var(--ww-left-narrow);
}

.ww-mini-shell {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.15rem;
}

.ww-mini-logo {
  display: flex;
}

.ww-mini-logo img {
  width: 7.2rem;
  height: auto;
  display: block;
}

.ww-mini-textnav {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
}

.ww-mini-textlink {
  appearance: none;
  background: transparent;
  border: 0;
  padding: 0;
  text-decoration: none;
  font-weight: 900;
  font-size: 0.78rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--ww-ink-blue);
  opacity: 0.92;
  cursor: pointer;
}

.ww-mini-textlink:hover {
  color: var(--ww-ink-blue-hover);
  opacity: 1;
}

.ww-mini-textlink[data-active="true"] {
  color: var(--ww-ink);
  opacity: 1;
}

.ww-mini-play {
  appearance: none;
  width: 4.2rem;
  height: 4.2rem;
  border-radius: 999px;
  border: 2px solid rgba(240,138,36,0.85);
  background: linear-gradient(180deg, #243242 0%, #192532 100%);
  color: #fff;
  cursor: pointer;
  box-shadow:
    0 12px 24px rgba(0,0,0,0.18),
    0 0 18px rgba(240,138,36,0.24);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 160ms ease, box-shadow 160ms ease;
}

.ww-mini-play:hover {
  transform: translateY(-1px) scale(1.03);
  box-shadow:
    0 16px 30px rgba(0,0,0,0.24),
    0 0 26px rgba(240,138,36,0.38);
}

.ww-mini-play-icon {
  width: 0;
  height: 0;
  border-top: 0.68rem solid transparent;
  border-bottom: 0.68rem solid transparent;
  border-left: 1.05rem solid #fff;
  margin-left: 0.18rem;
}

.ww-mini-play[data-playing="true"] .ww-mini-play-icon {
  width: 1rem;
  height: 1.25rem;
  border: 0;
  margin-left: 0;
  background:
    linear-gradient(90deg, #fff 0 35%, transparent 35% 65%, #fff 65% 100%);
}

#wwRight {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
  padding: 3.2vh 3.2vw;
  min-width: 0;
}

#clueImage {
  width: min(90vw, 1400px);
  max-height: 90vh;
  object-fit: contain;
  display: block;
}

.ww-clue-fallback {
  max-width: 760px;
  padding: 2rem;
  border-radius: 1rem;
  background: rgba(255,255,255,0.08);
  color: #fff;
  text-align: center;
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

@media (max-width: 820px) {
  :root {
    --ww-left-narrow: 8.4rem;
  }

  .ww-mini-logo img {
    width: 6.6rem;
  }
}
</style>

<div id="wwPortal">

  <aside id="wwLeft" aria-label="Mini Rail">
    <div class="ww-mini-shell">

      <div class="ww-mini-logo" aria-label="WinterWord">
        <img src="/assets/winterword/shared/logo.png" alt="WinterWord">
      </div>

      ${
        hasAudio
          ? `
            <button class="ww-mini-play" id="wwPlayButton" type="button" aria-label="Play clue audio" data-playing="false">
              <span class="ww-mini-play-icon" aria-hidden="true"></span>
            </button>
          `
          : ""
      }

      <nav class="ww-mini-textnav" aria-label="Mini navigation">
        <button class="ww-mini-textlink" type="button" data-nav="base-station">Base</button>
        <button class="ww-mini-textlink" type="button" data-nav="clues" data-active="true">Clues</button>
        <button class="ww-mini-textlink" type="button" data-nav="lifeline">Life</button>
      </nav>

    </div>
  </aside>

  <main id="wwRight">
    ${
      image
        ? `
          <img
            id="clueImage"
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
