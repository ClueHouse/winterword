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
  --ww-ink: #d8dde3;
  --ww-left-narrow: 10.12rem;
  --ww-ink-blue: #f2f5f8;
  --ww-ink-blue-hover: #ffffff;
  --ww-orange: #f08a24;
  --ww-rail-gap: 2.35rem;
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
  flex: 0 0 var(--ww-left-narrow);
  position: relative;
  background:
    linear-gradient(
      90deg,
      rgba(0,0,0,0.96) 0%,
      rgba(10,12,14,0.94) 45%,
      rgba(18,22,26,0.88) 75%,
      rgba(28,34,40,0.65) 100%
    ),
    repeating-linear-gradient(
      0deg,
      rgba(255,255,255,0.015) 0px,
      rgba(255,255,255,0.015) 1px,
      transparent 1px,
      transparent 3px
    ),
    repeating-linear-gradient(
      90deg,
      rgba(255,255,255,0.01) 0px,
      rgba(255,255,255,0.01) 1px,
      transparent 1px,
      transparent 4px
    );
  box-shadow:
    inset -1px 0 0 rgba(255,255,255,0.05),
    inset -24px 0 36px rgba(255,255,255,0.015),
    6px 0 24px rgba(0,0,0,0.45);
  overflow: hidden;
}

#wwLeft::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at top left, rgba(255,255,255,0.04), transparent 45%),
    radial-gradient(circle at bottom left, rgba(240,138,36,0.03), transparent 35%);
  pointer-events: none;
}

.ww-mini-shell {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.ww-mini-logo {
  display: flex;
  margin-bottom: var(--ww-rail-gap);
  filter:
    drop-shadow(0 0 10px rgba(255,255,255,0.08))
    drop-shadow(0 0 18px rgba(240,138,36,0.05));
}

.ww-mini-logo img {
  width: 8.28rem;
  height: auto;
  display: block;
  opacity: 0.98;
}

.ww-mini-play {
  appearance: none;
  width: 4.83rem;
  height: 4.83rem;
  border-radius: 999px;
  border: 2px solid rgba(240,138,36,0.88);
  background: linear-gradient(180deg, #243242 0%, #192532 100%);
  color: #fff;
  cursor: pointer;
  box-shadow:
    0 14px 28px rgba(0,0,0,0.28),
    0 0 22px rgba(240,138,36,0.28);
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
    rgba(255,255,255,0.42) 50%,
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
    0 18px 34px rgba(0,0,0,0.34),
    0 0 30px rgba(240,138,36,0.4);
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
  gap: 0.98rem;
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
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--ww-ink-blue);
  opacity: 0.9;
  cursor: pointer;
  text-shadow: 0 0 8px rgba(255,255,255,0.04);
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
    0 0 10px rgba(255,255,255,0.08),
    0 0 18px rgba(240,138,36,0.12);
}

.ww-mini-textlink[data-active="true"] {
  color: #ffffff;
  opacity: 1;
  text-shadow:
    0 0 10px rgba(255,255,255,0.08),
    0 0 18px rgba(240,138,36,0.18);
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
    --ww-left-narrow: 9.4rem;
    --ww-rail-gap: 2rem;
  }

  .ww-mini-logo img {
    width: 7.4rem;
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
