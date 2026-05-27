ChatGPT

this png needs to be scrollable, yes? 

The file that renders this specific clue/content page 😊

Most likely one of these:

    renderCluePage.js

    renderAnswerPage.js

    or the module that outputs the media/content viewport

What I need is the file containing:

    the outer content frame

    the <img> for the PNG

    the container wrapping that image

Upload that single file and I’ll turn the centre panel into a proper internal scroll viewport without breaking the shell/layout.

Pasted text(409).txt
Document
IS THIS IT? :) 

Directly underneath the ENTIRE .ww-main-clue { ... } block 😊

So you’ll have:

.ww-main-clue {
  ...
}

.ww-main-clue-image {
  width: 100%;
  height: auto;
  display: block;
}

Same <style> section.
Nothing fancy — just paste it immediately below the closing } of .ww-main-clue.

nope - not that smart. i am not guessing either

Perfect — thank you for saying that. Here’s the exact spot. 👍

Find THIS in your file:

.ww-main-clue {

Now scroll DOWN until you reach the FIRST lonely closing brace:

}

RIGHT AFTER that brace, press Enter once and paste THIS:

.ww-main-clue-image {
  width: 100%;
  height: auto;
  display: block;
}

So it becomes:

.ww-main-clue {
  existing stuff here
}

.ww-main-clue-image {
  width: 100%;
  height: auto;
  display: block;
}

NOT at the bottom of the file.
NOT inside another block.
Immediately after .ww-main-clue ends.

look good?       rgba(0,0,0,1) 100%
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

.ww-main-clue-image {
  width: 100%;
  height: auto;
  display: block;
}

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

No 🙂 — you pasted it in the middle of another block.

That entire section starting with:

background:

should NOT be underneath .ww-main-clue-image.

You inserted the new block too early.

What you need is:

.ww-main-clue {
  ALL the existing background stuff
  ALL the borders
  ALL the shadows
}

.ww-main-clue-image {
  width: 100%;
  height: auto;
  display: block;
}

Meaning:

    .ww-main-clue must contain EVERYTHING it originally had

    then it ends with }

    THEN add .ww-main-clue-image

Right now you accidentally split the original .ww-main-clue block in half.

Pasted text(410).txt
Document
please fix and return the entire script 

still looks like this - we were trying for a scroll? 

Yes — that means the image is still being scaled down to fit.

Use this instead for the image CSS:

.ww-main-clue-image {
  width: auto;
  max-width: none;
  height: auto;
  min-height: 140vh;
  display: block;
  margin: 0 auto;
}

Replace the current .ww-main-clue-image block with that.

That forces the PNG taller than the frame, so the frame should finally scroll.

i need what to replace with what

nope - i want the width of the png to be the width of the frame, just a little padding 

didnt work - whats going on? 

It’s because the PNG itself is portrait/narrow.

So width: 100% means 100% of its own displayed image slot, not magically filling the big landscape frame the way we want.

We need to force the image to fill the frame width.

Replace this block:

.ww-main-clue-image {
  width: 100%;
  height: auto;
  display: block;
}

with this:

.ww-main-clue-image {
  width: calc(min(54vw, 1088px) - 0.7rem);
  max-width: none;
  height: auto;
  display: block;
}

That should make the PNG almost as wide as the frame.

nope

Nope means the change is not hitting the thing on screen.

So either:

1. wrong file,
2. old cached deploy, or
3. there’s another CSS rule overriding this.

Please upload the current file exactly as it is now, and I’ll return the full corrected script again — no more piecemeal replacing.

Pasted text(411).txt
Document

Yes — current file confirms the CSS is being too polite. Replace the whole file with this. I’ve forced the PNG to fill the scroll frame width.

export function renderCluePage(app, data = {}, navigate) {
  const {
    clueId = 1,
    clue = {},
    org = {}
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

  const numericClueId = Number(clueId);
  const isClueThree = numericClueId === 3;
  const hasAudio = variant === "image-audio" && audio;

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

  const lifelineUnlocked =
    data?.lifeline_live === true ||
    data?.lifeline_live === "true" ||
    data?.lifelineLive === true ||
    data?.lifelineLive === "true" ||
    org?.lifeline_live === true ||
    org?.lifeline_live === "true" ||
    org?.lifelineLive === true ||
    org?.lifelineLive === "true";

alert("NEW renderCluePage file is running");

  app.innerHTML = `
<style>
:root {
  --ww-clue-bg: url("/assets/winterword/shared/fullclues.png");

  --ww-hotspot-group-left: 17%;
  --ww-hotspot-group-top: 50.6%;
  --ww-hotspot-gap: 9.2%;

  --ww-hotspot-play-top: 38.5%;

  --ww-hotspot-base-width: 11%;
  --ww-hotspot-base-height: 4.8%;

  --ww-hotspot-clues-width: 17%;
  --ww-hotspot-clues-height: 4.8%;

  --ww-hotspot-life-width: 11%;
  --ww-hotspot-life-height: 4.8%;

  --ww-hotspot-play-size: 8%;
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
  height: 78vh;
  overflow-y: auto;
  overflow-x: hidden;
  display: block;
  z-index: 2;
  padding: 0.35rem;

  background:
    linear-gradient(
      145deg,
      rgba(24,24,24,0.98) 0%,
      rgba(10,10,10,1) 18%,
      rgba(38,38,38,0.96) 36%,
      rgba(6,6,6,1) 58%,
      rgba(28,28,28,0.96) 78%,
      rgba(0,0,0,1) 100%
    );

  border: 2px solid rgba(70,70,70,0.35);

  box-shadow:
    0 0 0 2px rgba(0,0,0,0.92),
    0 12px 32px rgba(0,0,0,0.72),
    inset 0 0 10px rgba(255,255,255,0.03),
    inset 0 0 24px rgba(0,0,0,0.55);
}

.ww-main-clue-image {
  display: block !important;
  width: 100% !important;
  min-width: 100% !important;
  max-width: 100% !important;
  height: auto !important;
  margin: 0 !important;
  padding: 0 !important;
}

.ww-clue-three-frame {
  position: absolute;
  right: 7vw;
  top: 50%;
  transform: translateY(-50%);
  width: min(54vw, 1088px);
  aspect-ratio: 16 / 9;
  max-height: 78vh;
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
    );

  border: 2px solid rgba(70,70,70,0.35);

  box-shadow:
    0 0 0 2px rgba(0,0,0,0.92),
    0 12px 32px rgba(0,0,0,0.72),
    inset 0 0 10px rgba(255,255,255,0.03),
    inset 0 0 24px rgba(0,0,0,0.55);
}

.ww-clue-three-scene {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background:
    radial-gradient(circle at 28% 45%, rgba(255,230,190,0.055), transparent 28%),
    linear-gradient(90deg, rgba(0,0,0,0.38), rgba(0,0,0,0.04) 52%, rgba(0,0,0,0.16)),
    url("${esc(image)}") center center / cover no-repeat;
}

.ww-clue-three-scene::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 52% 48%, transparent 36%, rgba(0,0,0,0.18) 100%),
    linear-gradient(180deg, rgba(0,0,0,0.16), transparent 26%, rgba(0,0,0,0.22));
}

.ww-clue-three-poem {
  position: absolute;
  left: 6.2%;
  top: 48%;
  transform: translateY(-50%);
  z-index: 3;
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
  animation: wwClueThreeBreath 7.4s ease-in-out infinite;
}

.ww-clue-three-poem::before {
  content: "";
  position: absolute;
  inset: -0.8rem -1rem;
  z-index: -1;
  background:
    radial-gradient(circle at 42% 48%, rgba(0,0,0,0.22), transparent 68%);
  filter: blur(8px);
  opacity: 0.78;
}

@keyframes wwClueThreeBreath {
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
  border: none;
  background: transparent;
  cursor: pointer;
  transform: translate(-50%, -50%);
  overflow: visible;
  transition:
    transform 140ms ease,
    background 180ms ease,
    box-shadow 180ms ease;
}

.ww-hotspot:active {
  transform: translate(-50%, -50%) scale(0.96);
}

.ww-hotspot:focus-visible {
  outline: 2px solid rgba(200, 235, 255, 0.65);
  outline-offset: 3px;
}

.ww-hotspot-base,
.ww-hotspot-clues {
  overflow: hidden;
}

.ww-hotspot-life {
  overflow: visible;
}

.ww-hotspot-base::before,
.ww-hotspot-clues::before,
.ww-hotspot-life::before {
  content: "";
  position: absolute;
  top: -40%;
  left: -80%;
  width: 42%;
  height: 180%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255,255,255,0.10) 35%,
    rgba(230,245,255,0.42) 50%,
    rgba(255,255,255,0.10) 65%,
    transparent 100%
  );
  transform: rotate(22deg);
  opacity: 0;
  pointer-events: none;
}

.ww-hotspot-base:hover::before,
.ww-hotspot-clues:hover::before,
.ww-hotspot-life[data-locked="false"]:hover::before {
  animation: wwSilverSweep 900ms ease-out forwards;
}

.ww-hotspot-base:hover,
.ww-hotspot-clues:hover,
.ww-hotspot-life[data-locked="false"]:hover {
  background: transparent;
  box-shadow: none;
}

.ww-hotspot-life[data-locked="true"] {
  cursor: pointer;
}

.ww-hotspot-life[data-locked="true"]::before {
  display: none;
}

.ww-hotspot-life[data-locked="true"]::after {
  content: "This path remains hidden, for now";
  position: absolute;
  left: 50%;
  top: 155%;
  transform: translateX(-50%);
  padding: 0.58rem 1.25rem;
  font-size: 0.86rem;
  font-weight: 800;
  letter-spacing: 0.035em;
  text-transform: none;
  color: rgba(78,8,8,0.98);
  background: rgba(255,248,244,0.96);
  border: 1px solid rgba(120,20,20,0.35);
  border-radius: 0.55rem;
  box-shadow:
    0 8px 22px rgba(0,0,0,0.45),
    0 0 18px rgba(255,235,225,0.18);
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition:
    opacity 180ms ease,
    transform 180ms ease;
}

.ww-hotspot-life[data-locked="true"]:hover::after {
  opacity: 1;
  transform: translateX(-50%) translateY(2px);
}

.ww-hotspot-life[data-locked="true"]:hover {
  background: rgba(120,20,20,0.34);
  box-shadow:
    0 0 0 1px rgba(180,50,50,0.45),
    0 0 22px rgba(180,35,35,0.34),
    0 0 44px rgba(120,12,12,0.24),
    inset 0 0 22px rgba(255,80,80,0.08);
}

@keyframes wwSilverSweep {
  0% {
    left: -80%;
    opacity: 0;
  }

  18% {
    opacity: 1;
  }

  100% {
    left: 135%;
    opacity: 0;
  }
}

.ww-hotspot-base {
  left: var(--ww-hotspot-group-left);
  top: var(--ww-hotspot-group-top);
  width: var(--ww-hotspot-base-width);
  height: var(--ww-hotspot-base-height);
}

.ww-hotspot-clues {
  left: var(--ww-hotspot-group-left);
  top: calc(var(--ww-hotspot-group-top) + var(--ww-hotspot-gap));
  width: var(--ww-hotspot-clues-width);
  height: var(--ww-hotspot-clues-height);
}

.ww-hotspot-life {
  left: var(--ww-hotspot-group-left);
  top: calc(var(--ww-hotspot-group-top) + (var(--ww-hotspot-gap) * 2));
  width: var(--ww-hotspot-life-width);
  height: var(--ww-hotspot-life-height);
}

.ww-hotspot-play {
  left: var(--ww-hotspot-group-left);
  top: var(--ww-hotspot-play-top);
  width: var(--ww-hotspot-play-size);
  height: var(--ww-hotspot-play-size);
  border-radius: 999px;
}

.ww-hotspot-play:hover,
.ww-hotspot-play[data-playing="true"] {
  background: rgba(185, 225, 255, 0.18);
  box-shadow:
    0 0 0 1px rgba(200, 240, 255, 0.42),
    0 0 18px rgba(185, 225, 255, 0.28),
    0 0 34px rgba(170, 215, 255, 0.18);
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

@media (max-width: 900px) {
  .ww-clue-three-poem {
    left: 5.6%;
    width: 44%;
    font-size: clamp(0.42rem, 1vw, 0.82rem);
    line-height: 1.34;
  }
}
</style>

<div id="wwPortal">
  <main class="ww-clue-stage" aria-label="${esc(title)}">
    <section class="ww-clue-map" aria-label="WinterWord clue page">

      ${
        isClueThree && image
          ? `
            <section class="ww-clue-three-frame" aria-label="${esc(alt)}">
              <div class="ww-clue-three-scene">
                <div class="ww-clue-three-poem" aria-label="${esc(clueThreeText)}">
${esc(clueThreeText)}
                </div>
              </div>
            </section>
          `
          : image
            ? `
              <div class="ww-main-clue">
                <img
                  class="ww-main-clue-image"
                  src="${esc(image)}"
                  alt="${esc(alt)}"
                  loading="lazy"
                  decoding="async"
                  style="display:block;width:100%;min-width:100%;max-width:100%;height:auto;margin:0;padding:0;"
                >
              </div>
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
        data-locked="${lifelineUnlocked ? "false" : "true"}"
        aria-label="${lifelineUnlocked ? "Go to Lifeline" : "Lifeline unavailable"}"
      >
        <span class="ww-screen-reader-only">
          ${lifelineUnlocked ? "Lifeline" : "Lifeline unavailable"}
        </span>
      </button>

    </section>
  </main>
</div>
`;

  app.querySelectorAll("[data-nav]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-nav");

      if (target === "lifeline" && !lifelineUnlocked) {
        return;
      }

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


Yes — we’re back on track.

The code fix is probably not horizontal scroll.

It is either:

A) keep the image at width: 100% and crop out baked-in PNG margins with object-fit: cover, or
B) fix/regenerate the PNG so the artwork itself fills the canvas.

For code, next best move is: use the image as a background inside the scroll frame, not an <img>. That gives us better control over fill/crop/scroll.

try that

before you produce the next iteration, i have a request.  can you rewrite it so that all of the clue 6 logic is in one section, so instead of hunting for specific paragraphs through the code to replace, i can just ask you to do a different attempt for the same section  -are you with me?

Yes. 100%.

I’ll make a clearly marked section like:

/* ================================
   CLUE 6 SPECIAL LAYOUT
================================ */

And keep all Clue 6-specific logic together there:

    its CSS

    its HTML render block

    its sizing/scroll behaviour

Then future changes can be: “replace the Clue 6 special layout section” instead of hunting through the file.

That is the right way to do this.

Pasted text(412).txt
Document

Perfect. I’ve got the current file and now I can restructure it properly.

Next iteration I’ll do this:

/* ================================
   CLUE 6 SPECIAL LAYOUT
================================ */

Inside that ONE section will live:

    Clue 6 CSS

    Clue 6 render HTML

    Clue 6 scroll behaviour

    Clue 6 sizing

So from then on you can simply say:

    “replace the Clue 6 section”

instead of hunting through the script.

great - clearly label them and generate the entrie script pls

I’ll make Clue 6 a clearly labelled island: one CSS block and one render block, both easy to find later.

Replace the entire file with this:

export function renderCluePage(app, data = {}, navigate) {
  const {
    clueId = 1,
    clue = {},
    org = {}
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

  const numericClueId = Number(clueId);
  const isClueThree = numericClueId === 3;
const isClueSix = String(clueId) === "6" || String(clue?.id) === "6";
  const hasAudio = variant === "image-audio" && audio;

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

  const lifelineUnlocked =
    data?.lifeline_live === true ||
    data?.lifeline_live === "true" ||
    data?.lifelineLive === true ||
    data?.lifelineLive === "true" ||
    org?.lifeline_live === true ||
    org?.lifeline_live === "true" ||
    org?.lifelineLive === true ||
    org?.lifelineLive === "true";

  app.innerHTML = `
<style>
:root {
  --ww-clue-bg: url("/assets/winterword/shared/fullclues.png");

  --ww-hotspot-group-left: 17%;
  --ww-hotspot-group-top: 50.6%;
  --ww-hotspot-gap: 9.2%;

  --ww-hotspot-play-top: 38.5%;

  --ww-hotspot-base-width: 11%;
  --ww-hotspot-base-height: 4.8%;

  --ww-hotspot-clues-width: 17%;
  --ww-hotspot-clues-height: 4.8%;

  --ww-hotspot-life-width: 11%;
  --ww-hotspot-life-height: 4.8%;

  --ww-hotspot-play-size: 8%;
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

/* ================================
   STANDARD CLUE IMAGE LAYOUT
   Used by normal image clues.
================================ */

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

/* ================================
   CLUE 6 SPECIAL LAYOUT
   All Clue 6-specific display logic lives here.
   Replace only this section for future Clue 6 attempts.
================================ */

.ww-clue-six-panel {
  position: absolute;
  right: 5.5vw;
  top: 50%;
  transform: translateY(-50%);
  width: min(58vw, 1160px);
  height: 82vh;
  z-index: 2;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0.4rem;
  background: rgba(0,0,0,0.72);
  border: 1px solid rgba(255,255,255,0.18);
  box-shadow:
    0 16px 42px rgba(0,0,0,0.72),
    0 0 0 1px rgba(0,0,0,0.75);
}

.ww-clue-six-image {
  width: 100%;
  height: auto;
  display: block;
  margin: 0;
  padding: 0;
}

/* ================================
   CLUE 3 SPECIAL LAYOUT
================================ */

.ww-clue-three-frame {
  position: absolute;
  right: 7vw;
  top: 50%;
  transform: translateY(-50%);
  width: min(54vw, 1088px);
  aspect-ratio: 16 / 9;
  max-height: 78vh;
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

.ww-clue-three-scene {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background:
    radial-gradient(circle at 28% 45%, rgba(255,230,190,0.055), transparent 28%),
    linear-gradient(90deg, rgba(0,0,0,0.38), rgba(0,0,0,0.04) 52%, rgba(0,0,0,0.16)),
    url("${esc(image)}") center center / cover no-repeat;
}

.ww-clue-three-scene::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 52% 48%, transparent 36%, rgba(0,0,0,0.18) 100%),
    linear-gradient(180deg, rgba(0,0,0,0.16), transparent 26%, rgba(0,0,0,0.22));
}

.ww-clue-three-poem {
  position: absolute;
  left: 6.2%;
  top: 48%;
  transform: translateY(-50%);
  z-index: 3;
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
  animation: wwClueThreeBreath 7.4s ease-in-out infinite;
}

.ww-clue-three-poem::before {
  content: "";
  position: absolute;
  inset: -0.8rem -1rem;
  z-index: -1;
  background:
    radial-gradient(circle at 42% 48%, rgba(0,0,0,0.22), transparent 68%);
  filter: blur(8px);
  opacity: 0.78;
}

@keyframes wwClueThreeBreath {
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

/* ================================
   FALLBACK LAYOUT
================================ */

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

/* ================================
   HOTSPOTS / NAVIGATION
================================ */

.ww-hotspot {
  appearance: none;
  position: absolute;
  z-index: 5;
  display: block;
  padding: 0;
  margin: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  transform: translate(-50%, -50%);
  overflow: visible;
  transition:
    transform 140ms ease,
    background 180ms ease,
    box-shadow 180ms ease;
}

.ww-hotspot:active {
  transform: translate(-50%, -50%) scale(0.96);
}

.ww-hotspot:focus-visible {
  outline: 2px solid rgba(200, 235, 255, 0.65);
  outline-offset: 3px;
}

.ww-hotspot-base,
.ww-hotspot-clues {
  overflow: hidden;
}

.ww-hotspot-life {
  overflow: visible;
}

.ww-hotspot-base::before,
.ww-hotspot-clues::before,
.ww-hotspot-life::before {
  content: "";
  position: absolute;
  top: -40%;
  left: -80%;
  width: 42%;
  height: 180%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255,255,255,0.10) 35%,
    rgba(230,245,255,0.42) 50%,
    rgba(255,255,255,0.10) 65%,
    transparent 100%
  );
  transform: rotate(22deg);
  opacity: 0;
  pointer-events: none;
}

.ww-hotspot-base:hover::before,
.ww-hotspot-clues:hover::before,
.ww-hotspot-life[data-locked="false"]:hover::before {
  animation: wwSilverSweep 900ms ease-out forwards;
}

.ww-hotspot-base:hover,
.ww-hotspot-clues:hover,
.ww-hotspot-life[data-locked="false"]:hover {
  background: transparent;
  box-shadow: none;
}

.ww-hotspot-life[data-locked="true"] {
  cursor: pointer;
}

.ww-hotspot-life[data-locked="true"]::before {
  display: none;
}

.ww-hotspot-life[data-locked="true"]::after {
  content: "This path remains hidden, for now";
  position: absolute;
  left: 50%;
  top: 155%;
  transform: translateX(-50%);
  padding: 0.58rem 1.25rem;
  font-size: 0.86rem;
  font-weight: 800;
  letter-spacing: 0.035em;
  text-transform: none;
  color: rgba(78,8,8,0.98);
  background: rgba(255,248,244,0.96);
  border: 1px solid rgba(120,20,20,0.35);
  border-radius: 0.55rem;
  box-shadow:
    0 8px 22px rgba(0,0,0,0.45),
    0 0 18px rgba(255,235,225,0.18);
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition:
    opacity 180ms ease,
    transform 180ms ease;
}

.ww-hotspot-life[data-locked="true"]:hover::after {
  opacity: 1;
  transform: translateX(-50%) translateY(2px);
}

.ww-hotspot-life[data-locked="true"]:hover {
  background: rgba(120,20,20,0.34);
  box-shadow:
    0 0 0 1px rgba(180,50,50,0.45),
    0 0 22px rgba(180,35,35,0.34),
    0 0 44px rgba(120,12,12,0.24),
    inset 0 0 22px rgba(255,80,80,0.08);
}

@keyframes wwSilverSweep {
  0% {
    left: -80%;
    opacity: 0;
  }

  18% {
    opacity: 1;
  }

  100% {
    left: 135%;
    opacity: 0;
  }
}

.ww-hotspot-base {
  left: var(--ww-hotspot-group-left);
  top: var(--ww-hotspot-group-top);
  width: var(--ww-hotspot-base-width);
  height: var(--ww-hotspot-base-height);
}

.ww-hotspot-clues {
  left: var(--ww-hotspot-group-left);
  top: calc(var(--ww-hotspot-group-top) + var(--ww-hotspot-gap));
  width: var(--ww-hotspot-clues-width);
  height: var(--ww-hotspot-clues-height);
}

.ww-hotspot-life {
  left: var(--ww-hotspot-group-left);
  top: calc(var(--ww-hotspot-group-top) + (var(--ww-hotspot-gap) * 2));
  width: var(--ww-hotspot-life-width);
  height: var(--ww-hotspot-life-height);
}

.ww-hotspot-play {
  left: var(--ww-hotspot-group-left);
  top: var(--ww-hotspot-play-top);
  width: var(--ww-hotspot-play-size);
  height: var(--ww-hotspot-play-size);
  border-radius: 999px;
}

.ww-hotspot-play:hover,
.ww-hotspot-play[data-playing="true"] {
  background: rgba(185, 225, 255, 0.18);
  box-shadow:
    0 0 0 1px rgba(200, 240, 255, 0.42),
    0 0 18px rgba(185, 225, 255, 0.28),
    0 0 34px rgba(170, 215, 255, 0.18);
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

@media (max-width: 900px) {
  .ww-clue-three-poem {
    left: 5.6%;
    width: 44%;
    font-size: clamp(0.42rem, 1vw, 0.82rem);
    line-height: 1.34;
  }

  .ww-clue-six-panel {
    right: 4vw;
    width: 62vw;
    height: 82vh;
  }
}
</style>

<div id="wwPortal">
  <main class="ww-clue-stage" aria-label="${esc(title)}">
    <section class="ww-clue-map" aria-label="WinterWord clue page">

      ${
        isClueSix && image
          ? `
            <!-- ================================
                 CLUE 6 SPECIAL RENDER BLOCK
                 Replace only this block for future Clue 6 attempts.
            ================================= -->
            <section class="ww-clue-six-panel" aria-label="${esc(alt)}">
              <img
                class="ww-clue-six-image"
                src="${esc(image)}"
                alt="${esc(alt)}"
                loading="lazy"
                decoding="async"
              >
            </section>
          `
          : isClueThree && image
            ? `
              <section class="ww-clue-three-frame" aria-label="${esc(alt)}">
                <div class="ww-clue-three-scene">
                  <div class="ww-clue-three-poem" aria-label="${esc(clueThreeText)}">
${esc(clueThreeText)}
                  </div>
                </div>
              </section>
            `
            : image
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
        data-locked="${lifelineUnlocked ? "false" : "true"}"
        aria-label="${lifelineUnlocked ? "Go to Lifeline" : "Lifeline unavailable"}"
      >
        <span class="ww-screen-reader-only">
          ${lifelineUnlocked ? "Lifeline" : "Lifeline unavailable"}
        </span>
      </button>

    </section>
  </main>
</div>
`;

  app.querySelectorAll("[data-nav]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-nav");

      if (target === "lifeline" && !lifelineUnlocked) {
        return;
      }

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


