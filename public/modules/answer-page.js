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

    const alphabetBeforeR = "ABCDEFGHIJKLMNOPQ".split("");
    const alphabetAfterR = "STUVWXYZ".split("");

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
  left: 58%;
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

  color: rgba(246,232,205,0);

  pointer-events: none;
}

.ww-answer-three-letter {
  display: inline-block;

  opacity: 0;

  transform:
    translate(
      calc(var(--from-x) * 1vw),
      calc(var(--from-y) * 1vh)
    )
    rotate(var(--rot))
    scale(0.66);
}

.ww-answer-three-gap {
  width: clamp(1rem, 2vw, 2.2rem);
  height: 1px;

  border-bottom: 2px solid rgba(246,232,205,0);

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

  pointer-events: none;
}

.ww-answer-three-answer-label {
  position: absolute;

  left: 50%;
  top: calc(50% + clamp(3.6rem, 8vw, 8rem));

  z-index: 9;

  transform:
    translateX(-50%)
    translateY(0.7rem);

  font-family: "Courier New", Courier, monospace;

  font-size: clamp(0.62rem, 1vw, 1rem);
  font-weight: 700;

  letter-spacing: 0.32em;
  text-transform: uppercase;

  color: rgba(246,232,205,0);

  opacity: 0;
}

body.ww-answer-three-start .ww-answer-three-poem {
  animation:
    wwAnswerThreePoemBreath 2.8s ease-in-out 0s 1,
    wwAnswerThreePoemLeave 2.2s ease-in-out 2.8s forwards;
}

body.ww-answer-three-start .ww-answer-three-alphabet {
  animation:
    wwAnswerThreeAlphabetArrive 1.8s ease-in-out 3.2s forwards;
}

body.ww-answer-three-start .ww-answer-three-letter {
  animation:
    wwAnswerThreeLetterFloat
    1.8s
    cubic-bezier(.16,.86,.26,1)
    calc(3.15s + (var(--i) * 0.03s))
    forwards;
}

body.ww-answer-three-start .ww-answer-three-gap {
  animation:
    wwAnswerThreeGapReveal
    0.8s
    ease
    4.8s
    forwards;
}

body.ww-answer-three-start .ww-answer-three-reveal {
  animation:
    wwAnswerThreeRevealR
    1.2s
    cubic-bezier(.13,.94,.22,1)
    6.2s
    forwards;
}

body.ww-answer-three-start .ww-answer-three-answer-label {
  animation:
    wwAnswerThreeLabelIn
    0.9s
    ease
    6.6s
    forwards;
}

@keyframes wwAnswerThreePoemBreath {
  0%, 100% {
    opacity: 0.86;
    transform: translateY(-50%) translateX(0);
  }

  45% {
    opacity: 0.98;
    transform: translateY(-50%) translateX(1px);
  }

  72% {
    opacity: 0.91;
    transform: translateY(-50%) translateX(-1px);
  }
}

@keyframes wwAnswerThreePoemLeave {
  0% {
    opacity: 0.92;
    filter: blur(0);
    transform: translateY(-50%) scale(1);
  }

  100% {
    opacity: 0;
    filter: blur(6px);
    transform: translateY(-50%) scale(0.96);
  }
}

@keyframes wwAnswerThreeAlphabetArrive {
  0% {
    color: rgba(246,232,205,0);
  }

  100% {
    color: rgba(246,232,205,0.92);
  }
}

@keyframes wwAnswerThreeLetterFloat {
  0% {
    opacity: 0;

    transform:
      translate(
        calc(var(--from-x) * 1vw),
        calc(var(--from-y) * 1vh)
      )
      rotate(var(--rot))
      scale(0.66);
  }

  18% {
    opacity: 0.92;
  }

  100% {
    opacity: 1;
    transform: translate(0,0) rotate(0deg) scale(1);
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
    width: 44%;
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

            <div class="ww-answer-three-poem">
${esc(clueThreeText)}
            </div>

            <div class="ww-answer-three-alphabet">

              ${
                alphabetBeforeR.map((letter, index) => `
                  <span
                    class="ww-answer-three-letter"
                    style="
                      --i:${index};
                      --from-x:${[-39,-32,-24,-17,-9,-3,6,13,21,28,35,41,-36,-27,-16,-7,4][index]};
                      --from-y:${[-19,13,-10,22,-25,16,-14,26,-21,9,-6,18,25,-16,7,-24,12][index]};
                      --rot:${[-18,11,-7,20,-13,9,-21,14,-10,17,-15,8,22,-19,12,-8,16][index]}deg;
                    "
                  >${letter}</span>
                `).join("")
              }

              <span class="ww-answer-three-gap"></span>

              ${
                alphabetAfterR.map((letter, offset) => {
                  const index = offset + alphabetBeforeR.length + 1;

                  const xs = [15,24,32,40,-30,-18,-5,9];
                  const ys = [-18,21,-9,14,24,-22,11,-15];
                  const rs = [-14,19,-11,8,16,-20,13,-9];

                  return `
                    <span
                      class="ww-answer-three-letter"
                      style="
                        --i:${index};
                        --from-x:${xs[offset]};
                        --from-y:${ys[offset]};
                        --rot:${rs[offset]}deg;
                      "
                    >${letter}</span>
                  `;
                }).join("")
              }

            </div>

            <div class="ww-answer-three-reveal">R</div>

            <div class="ww-answer-three-answer-label">
              Answer
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

    const playButton = app.querySelector("#wwPlayButton");

    if (playButton) {

      let started = false;

      playButton.addEventListener("click", () => {

        if (started) {
          return;
        }

        started = true;

        document.body.classList.add("ww-answer-three-start");

        playButton.setAttribute("data-playing", "true");

        setTimeout(() => {
          playButton.setAttribute("data-playing", "false");
        }, 7600);

      });

    }

    return;
  }

  app.innerHTML = `
<div style="padding:2rem;color:white;">
  Standard answer page fallback.
</div>
`;
}
