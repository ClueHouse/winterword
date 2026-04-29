export function renderAnswerPage(app, data = {}, navigate) {
  const {
    clueId = 1,
    answer = {}
  } = data;

  const {
    title = `Answer ${String(clueId).padStart(2, "0")}`,
    variant = "plain",
    body = "No answer content yet.",
    letter = "",
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

  const hasImage = Boolean(image);
  const hasAudio = Boolean(audio);

  app.innerHTML = `
<style>
:root {
  --ww-left-narrow: 8.8rem;
  --ww-ink: #3b4149;
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
  background: #10141b;
}

#wwPortal {
  display: flex;
  min-height: 100vh;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  background: #10141b;
  color: #f5f7fb;
}

#wwLeft {
  width: var(--ww-left-narrow);
  background: var(--ww-rail-bg);
  box-shadow: inset -1px 0 0 rgba(0,0,0,0.04);
  flex: 0 0 var(--ww-left-narrow);
}

.ww-mini-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.15rem;
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
  min-width: 0;
  padding: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ww-answer-card {
  width: min(920px, 100%);
  padding: 2.2rem;
  border-radius: 1.4rem;
  background:
    radial-gradient(circle at 20% 0%, rgba(240,138,36,0.10), transparent 38%),
    rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.12);
  box-shadow: 0 28px 80px rgba(0,0,0,0.35);
}

.ww-answer-meta {
  margin: 0 0 0.7rem;
  font-size: 0.76rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(245,247,251,0.58);
  font-weight: 900;
}

.ww-answer-title {
  margin: 0 0 1rem;
  color: var(--ww-orange);
  font-size: 2.8rem;
  line-height: 1;
}

.ww-answer-letter {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 4.2rem;
  height: 4.2rem;
  margin: 0 0 1.4rem;
  border-radius: 999px;
  background: rgba(240,138,36,0.96);
  color: #fff;
  font-size: 2rem;
  font-weight: 950;
  box-shadow: 0 12px 28px rgba(240,138,36,0.22);
}

.ww-answer-body {
  font-size: 1.08rem;
  line-height: 1.75;
  color: rgba(245,247,251,0.86);
  white-space: pre-wrap;
}

.ww-answer-image {
  margin-top: 1.4rem;
}

.ww-answer-image img {
  display: block;
  width: 100%;
  max-height: 62vh;
  object-fit: contain;
  border-radius: 1rem;
  border: 1px solid rgba(255,255,255,0.12);
  background: #000;
}

@media (max-width: 820px) {
  :root {
    --ww-left-narrow: 8.4rem;
  }

  .ww-mini-logo img {
    width: 6.6rem;
  }

  #wwRight {
    padding: 2rem 1.2rem;
  }

  .ww-answer-title {
    font-size: 2.15rem;
  }
}
</style>

<div id="wwPortal">

  <aside id="wwLeft" aria-label="Answer Rail">
    <div class="ww-mini-shell">

      <div class="ww-mini-logo" aria-label="WinterWord">
        <img src="/assets/winterword/shared/logo.png" alt="WinterWord">
      </div>

      ${
        hasAudio
          ? `
            <button class="ww-mini-play" id="wwPlayButton" type="button" aria-label="Play answer audio" data-playing="false">
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
  </aside>

  <main id="wwRight">
    <section class="ww-answer-card">
      <p class="ww-answer-meta">Answer ${String(clueId).padStart(2, "0")}</p>
      <h1 class="ww-answer-title">${esc(title)}</h1>

      ${
        letter
          ? `<div class="ww-answer-letter">${esc(letter)}</div>`
          : ""
      }

      <div class="ww-answer-body">${esc(body)}</div>

      ${
        hasImage
          ? `
            <div class="ww-answer-image">
              <img src="${esc(image)}" alt="${esc(alt)}" loading="lazy" decoding="async">
            </div>
          `
          : ""
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

  if (hasAudio) {
    const playButton = app.querySelector("#wwPlayButton");
    const audioElement = new Audio(audio);

    if (playButton) {
      playButton.addEventListener("click", async () => {
        try {
          if (audioElement.paused) {
            await audioElement.play();
            playButton.setAttribute("data-playing", "true");
            playButton.setAttribute("aria-label", "Pause answer audio");
          } else {
            audioElement.pause();
            playButton.setAttribute("data-playing", "false");
            playButton.setAttribute("aria-label", "Play answer audio");
          }
        } catch {
          playButton.setAttribute("data-playing", "false");
          playButton.setAttribute("aria-label", "Audio could not play");
        }
      });

      audioElement.addEventListener("ended", () => {
        playButton.setAttribute("data-playing", "false");
        playButton.setAttribute("aria-label", "Play answer audio");
      });
    }
  }
}
