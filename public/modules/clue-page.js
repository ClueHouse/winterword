export function renderCluePage(app, data = {}, navigate) {const {clueId = 1,clue = {},org = {}} = data;

const {title = Clue ${String(clueId).padStart(2, "0")},variant = "image-only",image = "",alt = title,body = "",audio = ""} = clue;

function esc(value) {return String(value ?? "").replaceAll("&", "&").replaceAll("<", "<").replaceAll(">", ">").replaceAll('"', """).replaceAll("'", "'");}

const isClueSix = String(clueId) === "6" || String(clue?.id) === "6";const hasAudio = variant === "image-audio" && audio;

const lifelineUnlocked =data?.lifeline_live === true ||data?.lifeline_live === "true" ||data?.lifelineLive === true ||data?.lifelineLive === "true" ||org?.lifeline_live === true ||org?.lifeline_live === "true" ||org?.lifelineLive === true ||org?.lifelineLive === "true";

app.innerHTML = `

  ${
    image
      ? isClueSix
        ? `

<imgclass="ww-clue-six-image"src="${esc(image)}"alt="${esc(alt)}"loading="lazy"decoding="async"



  ${
    hasAudio
      ? `
        <button
          class="ww-hotspot ww-hotspot-play"
          id="wwPlayButton"
          type="button"
          aria-label="Play clue audio"
          data-playing="false"
          data-flash="false"
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

app.querySelectorAll("[data-nav]").forEach((button) => {button.addEventListener("click", () => {const target = button.getAttribute("data-nav");

  if (target === "lifeline" && !lifelineUnlocked) {
    return;
  }

  if (typeof navigate === "function") {
    navigate(target);
  }
});

});

if (hasAudio) {const playButton = app.querySelector("#wwPlayButton");const audioElement = new Audio(audio);let flashTimer = null;

function flashPlayButton() {
  if (!playButton) return;

  if (flashTimer) {
    window.clearTimeout(flashTimer);
  }

  playButton.setAttribute("data-flash", "false");

  window.requestAnimationFrame(() => {
    playButton.setAttribute("data-flash", "true");

    flashTimer = window.setTimeout(() => {
      playButton.setAttribute("data-flash", "false");
    }, 430);
  });
}

if (playButton) {
  playButton.addEventListener("click", async () => {
    flashPlayButton();

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

}}
