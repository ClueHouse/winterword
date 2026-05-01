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
  --ww-left-narrow: 17.5rem;
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
  background:
    radial-gradient(circle at 42% 45%, rgba(82,118,62,0.24) 0%, rgba(38,63,33,0.52) 34%, rgba(7,16,10,0.98) 78%),
    radial-gradient(circle at 12% 50%, rgba(108,145,70,0.14), transparent 36%),
    linear-gradient(90deg, #07110b 0%, #0d1b11 38%, #08120d 72%, #030604 100%);
  position: relative;
  color: #f5f7fb;
}

#wwLeft {
  width: var(--ww-left-narrow);
  flex: 0 0 var(--ww-left-narrow);
  position: relative;
  overflow: visible;
  background: transparent;
  z-index: 4;
}

.ww-rail-frame {
  position: absolute;
  top: 0;
  left: 50%;
  height: 100%;
  aspect-ratio: 1024 / 1792;
  transform: translateX(-50%);
  overflow: visible;
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
  z-index: 2;
}

.ww-mini-core {
  position: absolute;
  top: 46.8%;
  left: 44%;
  width: 100%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
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
}

#wwRight {
  flex: 1;
  min-width: 0;
  margin-left: 0;
  padding: 2.8vh 3vw 2.8vh 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  position: relative;
  overflow: hidden;
}

.ww-answer-stage {
  width: min(64vw, 1240px);
  max-width: calc(100vw - var(--ww-left-narrow) - 5rem);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
}

.ww-answer-frame {
  width: 100%;
  padding: 0.22rem;
  border-radius: 1.25rem;
  background:
    linear-gradient(145deg,
      rgba(255,240,190,0.98) 0%,
      rgba(212,160,64,0.96) 18%,
      rgba(82,52,18,0.98) 38%,
      rgba(245,206,118,0.96) 64%,
      rgba(70,42,12,0.98) 100%);
}

.ww-answer-inner {
  width: 100%;
  border-radius: 0.98rem;
  overflow: hidden;
  background:
    radial-gradient(circle at center, rgba(30,50,38,0.18), rgba(0,0,0,0.96));
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
</style>

<div id="wwPortal">
  <aside id="wwLeft">
    <div class="ww-rail-frame">
      <img class="ww-rail-image" src="/assets/winterword/shared/answer-rail.png" alt="">
      <div class="ww-mini-shell">
        <div class="ww-mini-core">

          ${
            showRailButton
              ? `
                <button class="ww-mini-play" id="wwPlayButton" type="button">
                  <span class="ww-mini-play-icon"></span>
                </button>
              `
              : ""
          }

          <nav class="ww-mini-textnav">
            <button class="ww-mini-textlink" type="button" data-nav="base-station">Base</button>
            <button class="ww-mini-textlink" type="button" data-nav="answers">Answers</button>
            <button class="ww-mini-textlink" type="button" data-nav="leaderboard">Leader</button>
          </nav>

        </div>
      </div>
    </div>
  </aside>

  <main id="wwRight">
    <section class="ww-answer-stage">
      <div class="ww-answer-frame">
        <div class="ww-answer-inner">
          <div class="ww-answer-media">
            ${
              isVideo
                ? `
                  <video id="wwAnswerVideo" playsinline preload="metadata">
                    <source src="${esc(image)}" type="video/mp4">
                  </video>
                `
                : `
                  <img src="${esc(image)}" alt="${esc(alt)}">
                `
            }
          </div>
        </div>
      </div>
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
}
