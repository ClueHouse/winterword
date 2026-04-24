export function renderLifelinePage(app, data, navigate) {
  const {
    isAvailable = false,
    unlockClue = 6,
    currentClue = 0,
    lifelineTitle = "Need a nudge?",
    lifelineBody = "Your lifeline content goes here.",
    lifelineImage = ""
  } = data;

  const isUnlocked = currentClue >= unlockClue && isAvailable;

  app.innerHTML = `
    <section class="ww-lifeline-page">
      <div class="ww-lifeline-container">
        <h1 class="ww-lifeline-title">${lifelineTitle}</h1>

        ${
          isUnlocked
            ? `
              ${lifelineImage ? `<img src="${lifelineImage}" class="ww-lifeline-image" />` : ""}
              <p class="ww-lifeline-body">${lifelineBody}</p>
            `
            : `
              <p class="ww-lifeline-locked">
                Lifeline unlocks at clue ${unlockClue}.
              </p>
            `
        }

        <button class="ww-lifeline-back">Back</button>
      </div>
    </section>
  `;

  injectLifelineStyles();

  app.querySelector(".ww-lifeline-back").addEventListener("click", () => {
    navigate("base-station");
  });
}

function injectLifelineStyles() {
  if (document.getElementById("ww-lifeline-styles")) return;

  const style = document.createElement("style");
  style.id = "ww-lifeline-styles";

  style.textContent = `
    .ww-lifeline-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #0b0b0b;
      color: #fff;
      font-family: system-ui, sans-serif;
      padding: 40px;
      text-align: center;
    }

    .ww-lifeline-container {
      max-width: 600px;
    }

    .ww-lifeline-title {
      font-size: 32px;
      margin-bottom: 20px;
    }

    .ww-lifeline-body {
      font-size: 18px;
      color: #ccc;
      margin-top: 20px;
    }

    .ww-lifeline-locked {
      font-size: 18px;
      color: #888;
    }

    .ww-lifeline-image {
      max-width: 100%;
      border-radius: 12px;
      margin-top: 20px;
    }

    .ww-lifeline-back {
      margin-top: 30px;
      padding: 10px 20px;
      background: #222;
      color: #fff;
      border: none;
      cursor: pointer;
    }
  `;

  document.head.appendChild(style);
}
