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

  const numericClueId = Number(clueId);
  const isAnswerThree = numericClueId === 3;

  const hasMedia = Boolean(image);
  const hasAudio = Boolean(audio);
  const isVideo = variant === "video" || variant === "video-audio";
  const hasPlayableMedia = isVideo || hasAudio;

  const clueThreeText = `
A quiet glass left beside the sink,
A bell once sung, now still,
A static TV, no one in sight —
The silence seems to spill.
A jigsaw lies beneath the steps,
A box once twice the size.
The wooden edge meets flecks of ash,
Each piece sits with nested lies.
The toast is sliced. The tea is cold.
The echo fades like stone.
All feels as it did again,
Yet something’s not at home.
`.trim();

  if (isAnswerThree) {
    const alphabetLetters = [
      ..."abcdefghijklmnopqrstuvwxyz"
    ];

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
    url("/assets/winterword/shared/fullanswer.png")
    center center / cover
    no-repeat;
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
  left: 70%;
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
    linear-gradient(
      145deg,
      #fff0b8 0%,
      #e7b24e 17%,
      #a46724 38%,
      #f5ca70 62%,
      #70400f 100%
    );
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

.ww-mini-textlink[data-active="true"] {
  color: #ffffff;
}

#wwRight {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding:
    3vh
    3vw
    3vh
    calc(var(--ww-left-zone) + 3rem);
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
  aspect-ratio: 16 / 9;
  padding: 0.42rem;
  border-radius: 1.2rem;
  background:
    linear-gradient(
      145deg,
      rgba(255,240,184,0.96) 0%,
      rgba(231,178,78,0.98) 18%,
      rgba(164,103,36,0.98) 42%,
      rgba(245,202,112,0.98) 68%,
      rgba(112,64,15,0.98) 100%
    );
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
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 0.9rem;
  overflow: hidden;
  background:
    radial-gradient(circle at center, rgba(30,50,38,0.22), rgba(0,0,0,0.92));
}

.ww-answer-three-scene {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 28% 45%, rgba(255,230,190,0.055), transparent 28%),
    linear-gradient(90deg, rgba(0,0,0,0.38), rgba(0,0,0,0.04) 52%, rgba(0,0,0,0.16)),
    url("${esc(image)}")
    center center / cover
    no-repeat;
}

.ww-answer-three-scene::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 52% 48%, transparent 36%, rgba(0,0,0,0.18) 100%),
    linear-gradient(180deg, rgba(0,0,0,0.16), transparent 26%, rgba(0,0,0,0.22));
}

.ww-answer-three-poem {
  position: absolute;
  left: 6.2%;
  top: 48%;
  transform: translateY(-50%);
  z-index: 5;
  width: 43%;
  color: rgba(246,232,205,0.92);
  font-family: "Courier New", Courier, monospace;
  font-size: clamp(0.48rem, 0.82vw, 1rem);
  line-height: 1.42;
  letter-spacing: 0.012em;
  text-align: left;
  white-space: normal;
  overflow: visible;
  text-shadow:
    0 0 12px rgba(255,220,170,0.14),
    0 2px 8px rgba(0,0,0,0.78);
  opacity: 0.92;
}

.ww-answer-three-poem::before {
  content: "";
  position: absolute;
  inset: -0.8rem -1rem;
  z-index: -1;
  background:
    radial-gradient(circle at 42% 48%, rgba(0,0,0,0.22), transparent 68%);
  filter: blur(8px);
  opacity: 0.78;
}

.ww-answer-three-line {
  display: block;
  white-space: nowrap;
}

.ww-answer-three-char {
  position: relative;
  display: inline-block;
  will-change: transform, opacity, filter;
}

.ww-answer-three-char.is-moving {
  z-index: 30;
  text-transform: lowercase;
  animation:
    wwAnswerThreeRealLetterMove
    2.25s
    cubic-bezier(.16,.86,.26,1)
    var(--delay)
    forwards;
}

.ww-answer-three-char.is-fading {
  animation:
    wwAnswerThreeUnusedFade
    1.15s
    ease
    1.15s
    forwards;
}

.ww-answer-three-alphabet {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 7;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(0.16rem, 0.45vw, 0.52rem);
  transform: translate(-50%, -50%);
  font-family: "Courier New", Courier, monospace;
  font-size: clamp(0.82rem, 1.35vw, 1.9rem);
  font-weight: 700;
  letter-spacing: 0.03em;
  pointer-events: none;
  text-transform: lowercase;
}

.ww-answer-three-slot {
  position: relative;
  width: 0.95em;
  height: 1.1em;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: lowercase;
}

.ww-answer-three-gap {
  width: 100%;
  height: 1px;
  opacity: 0;
}

#wwPortal.ww-answer-three-start .ww-answer-three-gap {
  opacity: 0;
}

.ww-answer-three-reveal {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 8;
  transform: translate(-50%, -50%) scale(0.68);
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(5rem, 12vw, 12rem);
  font-weight: 900;
  line-height: 1;
  color: rgba(255,244,212,0);
  opacity: 0;
  text-align: center;
  pointer-events: none;
  text-transform: uppercase;
}

.ww-answer-three-answer-top {
  position: absolute;
  left: 50%;
  top: calc(50% - clamp(4.8rem, 9vw, 9rem));
  z-index: 9;
  transform:
    translateX(-50%)
    translateY(-0.7rem);
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(0.82rem, 1.1vw, 1.08rem);
  font-weight: 700;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(246,232,205,0);
  opacity: 0;
  text-shadow:
    0 2px 10px rgba(0,0,0,0.82),
    0 0 18px rgba(255,200,120,0.08);
}

#wwPortal.ww-answer-three-start .ww-answer-three-answer-top {
  animation:
    wwAnswerThreeLabelTopIn
    0.9s
    ease
    4.9s
    forwards;
}

#wwPortal.ww-answer-three-start .ww-answer-three-reveal {
  animation:
    wwAnswerThreeRevealR
    1.2s
    cubic-bezier(.13,.94,.22,1)
    4.7s
    forwards;
}

.ww-answer-three-answer-label {
  position: absolute;
  left: 50%;
  top: calc(50% + clamp(3.8rem, 8vw, 8rem));
  z-index: 9;
  transform:
    translateX(-50%)
    translateY(0.7rem);
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(0.92rem, 1.25vw, 1.25rem);
  font-style: italic;
  font-weight: 500;
  letter-spacing: 0.08em;
  color: rgba(246,232,205,0);
  opacity: 0;
  text-shadow:
    0 2px 10px rgba(0,0,0,0.82),
    0 0 18px rgba(255,200,120,0.08);
}

#wwPortal.ww-answer-three-start .ww-answer-three-answer-label {
  animation:
    wwAnswerThreeLabelIn
    0.9s
    ease
    5.1s
    forwards;
}

@keyframes wwAnswerThreeRealLetterMove {
  0% {
    opacity: 1;
    transform:
      translate(0, 0)
      scale(1);
    color: rgba(246,232,205,0.92);
    filter: blur(0);
  }

  78% {
    opacity: 1;
    filter: blur(0);
  }

  100% {
    opacity: 1;
    transform:
      translate(var(--dx), var(--dy))
      scale(var(--scale));
    color: rgba(246,232,205,0.98);
    filter: blur(0);
    text-shadow:
      0 0 12px rgba(255,220,170,0.18),
      0 2px 10px rgba(0,0,0,0.86);
  }
}

@keyframes wwAnswerThreeUnusedFade {
  0% {
    opacity: 1;
    filter: blur(0);
  }

  100% {
    opacity: 0;
    filter: blur(4px);
  }
}

@keyframes wwAnswerThreeGapReveal {
  0% {
    opacity: 0;
    border-bottom-color: rgba(246,232,205,0);
  }

  100% {
    opacity: 1;
    border-bottom-color: rgba(246,232,205,0.72);
  }
}

@keyframes wwAnswerThreeRevealR {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.68);
    filter: blur(10px);
    color: rgba(255,244,212,0);
  }

  40% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.08);
    filter: blur(0);
    color: rgba(255,244,212,1);
  }

  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
    filter: blur(0);
    color: rgba(255,244,212,1);
    text-shadow:
      0 0 28px rgba(255,190,95,0.36),
      0 0 72px rgba(255,170,70,0.16),
      0 5px 22px rgba(0,0,0,0.82);
  }
}

@keyframes wwAnswerThreeLabelIn {
  0% {
    opacity: 0;
    transform:
      translateX(-50%)
      translateY(0.7rem);
    color: rgba(246,232,205,0);
  }

  100% {
    opacity: 1;
    transform:
      translateX(-50%)
      translateY(0);
    color: rgba(246,232,205,0.84);
  }
}

@keyframes wwAnswerThreeLabelTopIn {
  0% {
    opacity: 0;
    transform:
      translateX(-50%)
      translateY(-0.7rem);
    color: rgba(246,232,205,0);
  }

  100% {
    opacity: 1;
    transform:
      translateX(-50%)
      translateY(0);
    color: rgba(246,232,205,0.82);
  }
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

  .ww-answer-three-poem {
    left: 5.6%;
    width: 48%;
    font-size: clamp(0.42rem, 1vw, 0.82rem);
    line-height: 1.34;
  }
}
</style>

<div id="wwPortal">

  <div class="ww-mini-shell" aria-label="Answer Rail">

    <div class="ww-mini-core">

      <button
        class="ww-mini-play"
        id="wwPlayButton"
        type="button"
        aria-label="Play answer reveal"
        data-playing="false"
      >
        <span class="ww-mini-play-glow" aria-hidden="true"></span>
        <span class="ww-mini-play-icon" aria-hidden="true"></span>
      </button>

      <nav class="ww-mini-textnav" aria-label="Answer navigation">
        <button class="ww-mini-textlink" type="button" data-nav="base-station">Base</button>
        <button class="ww-mini-textlink" type="button" data-nav="answers" data-active="true">Answers</button>
        <button class="ww-mini-textlink" type="button" data-nav="leaderboard">Leader</button>
      </nav>

    </div>

  </div>

  <main id="wwRight">

    <section class="ww-answer-stage" aria-label="${esc(title)}">

      <div class="ww-answer-frame">

        <div class="ww-answer-inner">

          <div class="ww-answer-three-scene">

            <div
              class="ww-answer-three-poem"
              id="wwAnswerThreePoem"
              aria-label="${esc(clueThreeText)}"
            ></div>

            <div
              class="ww-answer-three-alphabet"
              id="wwAnswerThreeAlphabet"
              aria-label="Lowercase alphabet with missing r"
            >
              ${
                alphabetLetters.map((letter) => `
                  <span
                    class="ww-answer-three-slot"
                    data-letter="${letter}"
                    aria-hidden="true"
                  >
                    ${
                      letter === "r"
                        ? `<span class="ww-answer-three-gap"></span>`
                        : ""
                    }
                  </span>
                `).join("")
              }
            </div>

            <div class="ww-answer-three-answer-top">
              The letter
            </div>

            <div class="ww-answer-three-reveal" aria-label="Answer R">
              R
            </div>

            <div class="ww-answer-three-answer-label">
              is not at home
            </div>

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

        if (typeof navigate === "function") {
          navigate(target);
        }
      });
    });

    const portal = app.querySelector("#wwPortal");
    const playButton = app.querySelector("#wwPlayButton");
    const poemContainer = app.querySelector("#wwAnswerThreePoem");
    const alphabetContainer = app.querySelector("#wwAnswerThreeAlphabet");

    if (poemContainer) {
      poemContainer.innerHTML = "";

      const lines = clueThreeText
        .split(/\r?\n/)
        .map((line) => line.trimEnd());

      lines.forEach((line) => {
        const lineElement = document.createElement("span");
        lineElement.className = "ww-answer-three-line";

        for (const character of line) {
          const characterElement = document.createElement("span");
          characterElement.className = "ww-answer-three-char";
          characterElement.textContent = character;
          lineElement.appendChild(characterElement);
        }

        poemContainer.appendChild(lineElement);
      });
    }

    if (playButton && portal && poemContainer && alphabetContainer) {
      let started = false;

      playButton.addEventListener("click", () => {
        if (started) {
          return;
        }

        started = true;

        playButton.setAttribute("data-playing", "true");
        playButton.setAttribute("aria-label", "Answer reveal playing");

        const chars = Array.from(
          poemContainer.querySelectorAll(".ww-answer-three-char")
        );

        const availableLetters = new Map();

        chars.forEach((char) => {
          const value = String(char.textContent || "").toLowerCase();

          if (!/^[a-z]$/.test(value)) {
            return;
          }

          if (value === "r") {
            char.classList.add("is-fading");
            return;
          }

          if (!availableLetters.has(value)) {
            availableLetters.set(value, []);
          }

          availableLetters.get(value).push(char);
        });

        const selectedChars = new Set();

        window.requestAnimationFrame(() => {
          const slots = Array.from(
            alphabetContainer.querySelectorAll(".ww-answer-three-slot")
          );

          slots.forEach((slot, slotIndex) => {
            const targetLetter = String(slot.getAttribute("data-letter") || "").toLowerCase();

            if (!targetLetter || targetLetter === "r") {
              return;
            }

            const sourceList = availableLetters.get(targetLetter);

            if (!sourceList || sourceList.length === 0) {
              return;
            }

            const movingChar = sourceList.shift();

            if (!movingChar) {
              return;
            }

            selectedChars.add(movingChar);
            movingChar.textContent = targetLetter;

            const fromRect = movingChar.getBoundingClientRect();
            const toRect = slot.getBoundingClientRect();

            const dx =
              toRect.left +
              (toRect.width / 2) -
              (fromRect.left + (fromRect.width / 2));

            const dy =
              toRect.top +
              (toRect.height / 2) -
              (fromRect.top + (fromRect.height / 2));

            const fromSize =
              parseFloat(window.getComputedStyle(movingChar).fontSize) || 12;

            const toSize =
              parseFloat(window.getComputedStyle(alphabetContainer).fontSize) || fromSize;

            const scale =
              Math.max(0.72, Math.min(3.2, toSize / fromSize));

            movingChar.style.setProperty("--dx", `${dx}px`);
            movingChar.style.setProperty("--dy", `${dy}px`);
            movingChar.style.setProperty("--scale", String(scale));
            movingChar.style.setProperty("--delay", `${0.04 * slotIndex}s`);

            movingChar.classList.add("is-moving");
          });

          chars.forEach((char) => {
            if (selectedChars.has(char)) {
              return;
            }

            if (!char.classList.contains("is-fading")) {
              char.classList.add("is-fading");
            }
          });

          portal.classList.add("ww-answer-three-start");
        });

        window.setTimeout(() => {
          playButton.setAttribute("data-playing", "false");
          playButton.setAttribute("aria-label", "Answer revealed");
        }, 6200);
      });
    }

    return;
  }

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
  left: 70%;
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
  overflow: visible;
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

.ww-mini-textlink[data-active="true"] {
  color: #ffffff;
}

.ww-mini-textlink[data-active="true"]::before,
.ww-mini-textlink[data-active="true"]::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 1.7rem;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(240,161,58,0.98),
    rgba(255,226,155,0.9)
  );
}

.ww-mini-textlink[data-active="true"]::before {
  right: calc(100% + 0.55rem);
  transform: translateY(-50%);
}

.ww-mini-textlink[data-active="true"]::after {
  left: calc(100% + 0.55rem);
  transform: translateY(-50%) rotate(180deg);
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
    linear-gradient(
      145deg,
      rgba(255,240,184,0.96) 0%,
      rgba(231,178,78,0.98) 18%,
      rgba(164,103,36,0.98) 42%,
      rgba(245,202,112,0.98) 68%,
      rgba(112,64,15,0.98) 100%
    );
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
      <button class="ww-mini-play" id="wwPlayButton" type="button" aria-label="${hasPlayableMedia ? "Play answer media" : "Play"}" data-playing="false">
        <span class="ww-mini-play-glow" aria-hidden="true"></span>
        <span class="ww-mini-play-icon" aria-hidden="true"></span>
      </button>

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
