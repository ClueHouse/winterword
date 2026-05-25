/* =========================================
   ANSWER 3 — REAL LETTER MIGRATION VERSION
   Replace ONLY the Answer 3 scene section
   and script logic with this version.
   ========================================= */

/* ---------- REPLACE THIS BLOCK ----------

<div class="ww-answer-three-poem">
${esc(clueThreeText)}
</div>

----------------------------------------- */

<div
  class="ww-answer-three-poem"
  id="wwAnswerThreePoem"
  aria-label="${esc(clueThreeText)}"
></div>

<div class="ww-answer-three-alphabet" id="wwAnswerThreeAlphabet">

  ${
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => `
      <span
        class="ww-answer-three-slot"
        data-letter="${letter}"
      >
        ${letter === "R"
          ? `<span class="ww-answer-three-gap"></span>`
          : letter}
      </span>
    `).join("")
  }

</div>

<div class="ww-answer-three-reveal">
  R
</div>

<div class="ww-answer-three-answer-label">
  Answer
</div>

/* ---------- END REPLACEMENT ---------- */



/* =========================================
   ADD THESE CSS RULES
   ========================================= */

.ww-answer-three-poem {
  position: absolute;

  left: 6.2%;
  top: 48%;

  transform: translateY(-50%);

  z-index: 5;

  width: 39%;

  color: rgba(246,232,205,0.92);

  font-family: "Courier New", Courier, monospace;

  font-size: clamp(0.48rem, 0.82vw, 1rem);

  line-height: 1.42;
  letter-spacing: 0.012em;

  text-align: left;
  white-space: pre-wrap;

  text-shadow:
    0 0 12px rgba(255,220,170,0.14),
    0 2px 8px rgba(0,0,0,0.78);

  opacity: 0.92;
}

.ww-answer-three-char {
  position: relative;
  display: inline-block;
  transition:
    transform 2.1s cubic-bezier(.16,.84,.23,1),
    opacity 1.4s ease,
    filter 1.4s ease,
    color 1.4s ease;
}

.ww-answer-three-char.is-floating {
  z-index: 20;
}

.ww-answer-three-char.is-settled {
  color: rgba(246,232,205,0.95);

  text-shadow:
    0 0 12px rgba(255,220,170,0.16),
    0 2px 10px rgba(0,0,0,0.82);
}

.ww-answer-three-char.is-fading {
  opacity: 0;
  filter: blur(4px);
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
}

.ww-answer-three-slot {
  position: relative;

  width: 0.95em;
  height: 1.1em;

  display: flex;
  align-items: center;
  justify-content: center;

  color: rgba(246,232,205,0.12);
}

.ww-answer-three-gap {
  width: 100%;
  height: 1px;

  border-bottom: 2px solid rgba(246,232,205,0.7);

  opacity: 0;
}

body.ww-answer-three-start .ww-answer-three-gap {
  animation:
    wwAnswerThreeGapReveal
    0.8s
    ease
    2.4s
    forwards;
}

body.ww-answer-three-start .ww-answer-three-reveal {
  animation:
    wwAnswerThreeRevealR
    1.2s
    cubic-bezier(.13,.94,.22,1)
    4.4s
    forwards;
}

body.ww-answer-three-start .ww-answer-three-answer-label {
  animation:
    wwAnswerThreeLabelIn
    0.9s
    ease
    4.8s
    forwards;
}



/* =========================================
   REPLACE THE EXISTING PLAY BUTTON SCRIPT
   WITH THIS VERSION
   ========================================= */

const playButton = app.querySelector("#wwPlayButton");

if (playButton) {

  let started = false;

  playButton.addEventListener("click", () => {

    if (started) {
      return;
    }

    started = true;

    playButton.setAttribute("data-playing", "true");

    document.body.classList.add("ww-answer-three-start");

    const poemContainer =
      app.querySelector("#wwAnswerThreePoem");

    const alphabetContainer =
      app.querySelector("#wwAnswerThreeAlphabet");

    if (!poemContainer || !alphabetContainer) {
      return;
    }

    const poemText = clueThreeText;

    poemContainer.innerHTML = "";

    const liveLetterMap = {};

    for (const char of poemText) {

      const span = document.createElement("span");

      span.className = "ww-answer-three-char";

      span.textContent = char;

      poemContainer.appendChild(span);

      if (/[A-QS-Z]/i.test(char)) {

        const upper = char.toUpperCase();

        if (!liveLetterMap[upper]) {
          liveLetterMap[upper] = [];
        }

        liveLetterMap[upper].push(span);

      } else if (/R/i.test(char)) {

        span.classList.add("is-fading");

      }

    }

    requestAnimationFrame(() => {

      const slots =
        alphabetContainer.querySelectorAll(".ww-answer-three-slot");

      slots.forEach((slot) => {

        const targetLetter =
          slot.getAttribute("data-letter");

        if (targetLetter === "R") {
          return;
        }

        const available =
          liveLetterMap[targetLetter];

        if (!available || !available.length) {
          return;
        }

        const moving =
          available.shift();

        const fromRect =
          moving.getBoundingClientRect();

        const toRect =
          slot.getBoundingClientRect();

        const dx =
          toRect.left - fromRect.left;

        const dy =
          toRect.top - fromRect.top;

        moving.classList.add("is-floating");

        moving.style.transform =
          `translate(${dx}px, ${dy}px)`;

        moving.style.opacity = "1";

        setTimeout(() => {
          moving.classList.add("is-settled");
        }, 1800);

      });

      setTimeout(() => {

        poemContainer
          .querySelectorAll(".ww-answer-three-char")
          .forEach((char) => {

            if (!char.classList.contains("is-floating")) {
              char.classList.add("is-fading");
            }

          });

      }, 1200);

    });

    setTimeout(() => {
      playButton.setAttribute("data-playing", "false");
    }, 6200);

  });

}
