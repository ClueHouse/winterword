export function renderAnswerList(app, data = {}, navigate) {

  const orgName =
    data.orgName ||
    data.org_name ||
    "WinterWord";

  const finalWord =
    data.final_word ||
    data.finalWord ||
    "HOUSEWARMING";

  const seasonStartRaw =
    data.season_start ||
    data.seasonStart ||
    data.start_date ||
    data.startDate ||
    data.season?.season_start ||
    data.orgState?.season_start ||
    data.org_state?.season_start ||
    data.state?.season_start ||
    "";

  const dropFrequencyRaw =
    data.drop_frequency ||
    data.dropFrequency ||
    data.season?.drop_frequency ||
    data.orgState?.drop_frequency ||
    data.org_state?.drop_frequency ||
    data.state?.drop_frequency ||
    "weekly";

  const dropFrequency =
    String(dropFrequencyRaw || "weekly")
      .trim()
      .toLowerCase();

  const totalClues = 12;

  const seasonStartDate =
    new Date(seasonStartRaw);

  const hasValidSeasonStart =
    Boolean(seasonStartRaw) &&
    !Number.isNaN(seasonStartDate.getTime());

  function getDropMs(freq) {

    switch (freq) {

      case "quarter_hourly":
      case "quarter-hourly":
      case "quarter hourly":
      case "15_minutely":
      case "15-minutely":
      case "15 minutely":
      case "15_minutes":
      case "15 minutes":
        return 15 * 60 * 1000;

      case "hourly":
      case "hour":
        return 60 * 60 * 1000;

      case "daily":
      case "day":
        return 24 * 60 * 60 * 1000;

      case "weekly":
      case "week":
      default:
        return 7 * 24 * 60 * 60 * 1000;

    }

  }

  const dropMs =
    getDropMs(dropFrequency);

  const seasonEndDate =
    hasValidSeasonStart
      ? new Date(
          seasonStartDate.getTime() +
          ((totalClues - 1) * dropMs)
        )
      : null;

  const startYear =
    hasValidSeasonStart
      ? seasonStartDate.getFullYear()
      : new Date().getFullYear();

  const endYear =
    seasonEndDate
      ? seasonEndDate.getFullYear()
      : startYear;

  const seasonYearLabel =
    startYear === endYear
      ? `${startYear}`
      : `${startYear}/${String(endYear).slice(-2)}`;

  function formatReleaseDate(index) {

    if (!hasValidSeasonStart) {
      return "DATE TO BE ADVISED";
    }

    const releaseDate =
      new Date(
        seasonStartDate.getTime() +
        (index * dropMs)
      );

    const showTime =
      dropFrequency === "hourly" ||
      dropFrequency === "hour" ||
      dropFrequency === "quarter_hourly" ||
      dropFrequency === "quarter-hourly" ||
      dropFrequency === "quarter hourly" ||
      dropFrequency === "15_minutely" ||
      dropFrequency === "15-minutely" ||
      dropFrequency === "15 minutely" ||
      dropFrequency === "15_minutes" ||
      dropFrequency === "15 minutes";

    return releaseDate
      .toLocaleString(
        "en-NZ",
        showTime
          ? {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit",
              hour12: true
            }
          : {
              day: "2-digit",
              month: "long",
              year: "numeric"
            }
      )
      .toUpperCase();
  }

  const answers =
    Array.from(
      { length: totalClues },
      (_, index) => {

        const number =
          String(index + 1).padStart(2, "0");

        const ext =
          index + 1 === 12
            ? "gif"
            : "png";

        return {
          id: number,
          number,
          image:
            `/assets/winterword/display/${number}.${ext}`,
          releaseDate:
            formatReleaseDate(index)
        };
      }
    );

  app.innerHTML = `
<style>

:root{

  --ww-paper:#f2e7d4;
  --ww-paper-soft:#fbf4e8;

  --ww-ink:#4d3628;
  --ww-ink-soft:#6e5440;

  --ww-bronze:#8d6033;
  --ww-bronze-soft:#ba8a57;

  --ww-brown-deep:#2f1d14;
  --ww-brown-mid:#4a2e20;
  --ww-brown-soft:#653f2d;

}

*{
  box-sizing:border-box;
}

html,
body{
  margin:0;
  padding:0;
  width:100%;
  min-height:100%;
}

#wwAnswerPage{
  position:relative;
  width:100%;
  min-height:100vh;
  overflow-x:hidden;

  font-family:
    system-ui,
    -apple-system,
    "Segoe UI",
    sans-serif;

  color:var(--ww-ink);

  background:
    linear-gradient(
      135deg,
      rgba(247,248,242,.18),
      rgba(228,236,228,.12)
    ),
    url("/assets/winterword/shared/answerlistbg.png")
    center center / cover
    no-repeat;

  background-attachment:fixed;
}

#wwAnswerPage::before{
  content:"";
  position:fixed;
  inset:0;
  pointer-events:none;
  z-index:0;

  background:
    radial-gradient(
      circle at 50% 0%,
      rgba(255,255,255,.34),
      transparent 42%
    ),
    radial-gradient(
      circle at 50% 100%,
      rgba(255,255,255,.12),
      transparent 36%
    ),
    repeating-linear-gradient(
      0deg,
      rgba(44,42,34,.014) 0px,
      rgba(44,42,34,.014) 1px,
      transparent 1px,
      transparent 4px
    );

  opacity:.38;
}

.ww-answer-shell{
  position:relative;
  z-index:2;
  width:min(100%, 1660px);
  margin:0 auto;
  padding:4.4rem 3rem 3.5rem;
}

.ww-answer-header{
  text-align:center;
  margin-bottom:3.1rem;
}

.ww-answer-title{
  margin:0;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size:
    clamp(
      4.2rem,
      6.2vw,
      7.6rem
    );

  line-height:.82;
  font-weight:700;
  letter-spacing:.08em;
  text-transform:uppercase;

  color:
    rgba(69,46,31,.97);

  text-shadow:
    0 1px 0 rgba(255,255,255,.3),
    0 14px 38px rgba(28,33,28,.1);

  padding-left:.08em;
}

.ww-answer-season-row{
  display:flex;
  align-items:center;
  justify-content:center;
  gap:1.25rem;
  margin-top:.9rem;
}

.ww-answer-season-row::before,
.ww-answer-season-row::after{
  content:"";
  width:8rem;
  height:1px;

  background:
    linear-gradient(
      90deg,
      transparent,
      rgba(128,89,52,.42),
      transparent
    );
}

.ww-answer-season{
  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size:.88rem;
  line-height:1;
  font-weight:900;
  letter-spacing:.42em;
  text-transform:uppercase;

  color:
    rgba(133,88,43,.95);

  padding-left:.42em;
}

.ww-answer-ornament{
  display:flex;
  align-items:center;
  justify-content:center;
  gap:.8rem;
  margin:.9rem auto .9rem;
}

.ww-answer-ornament::before,
.ww-answer-ornament::after{
  content:"";
  width:4.8rem;
  height:1px;

  background:
    linear-gradient(
      90deg,
      transparent,
      rgba(156,105,49,.56),
      transparent
    );
}

.ww-answer-ornament-mark{
  width:.55rem;
  height:.55rem;
  transform:rotate(45deg);

  background:
    linear-gradient(
      135deg,
      rgba(214,157,83,.98),
      rgba(128,82,39,.82)
    );

  box-shadow:
    0 0 0 3px rgba(190,136,65,.08);
}

.ww-answer-subtitle{
  max-width:52rem;
  margin:0 auto;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size:
    clamp(
      1rem,
      1.14vw,
      1.18rem
    );

  line-height:1.5;
  font-style:italic;

  color:
    rgba(73,54,41,.82);

  text-shadow:
    0 1px 0 rgba(255,255,255,.2);
}

.ww-answer-grid{
  display:grid;

  grid-template-columns:
    repeat(
      6,
      minmax(0,1fr)
    );

  gap:
    1.5rem
    1.7rem;

  align-items:start;
  margin-top:3.6rem;
}

.ww-answer-card{
  position:relative;
  border:none;
  cursor:pointer;
  border-radius:.92rem;

  background:
    linear-gradient(
      180deg,
      rgba(252,248,241,.985),
      rgba(237,223,198,.985)
    );

  padding:.44rem .44rem .82rem;

  box-shadow:
    0 16px 30px rgba(24,36,30,.1),
    0 5px 10px rgba(24,36,30,.06),
    inset 0 0 0 1px rgba(255,255,255,.88);

  transition:
    transform .22s ease,
    box-shadow .22s ease,
    filter .22s ease;
}

.ww-answer-card::before{
  content:"";
  position:absolute;
  inset:0;
  border-radius:inherit;
  pointer-events:none;

  box-shadow:
    inset 0 0 0 1px rgba(115,78,39,.12);
}

.ww-answer-card:hover{
  transform:
    translateY(-5px);

  filter:
    brightness(1.03);

  box-shadow:
    0 24px 42px rgba(24,36,30,.14),
    0 8px 16px rgba(24,36,30,.08),
    inset 0 0 0 1px rgba(255,255,255,.94);
}

.ww-answer-thumb{
  position:relative;
  width:100%;
  aspect-ratio:16 / 10;
  overflow:hidden;
  border-radius:.58rem;
  background:#ddd0bc;
}

.ww-answer-thumb::after{
  content:"";
  position:absolute;
  inset:0;
  pointer-events:none;

  background:
    linear-gradient(
      180deg,
      rgba(255,255,255,.08),
      transparent 24%,
      rgba(0,0,0,.05) 100%
    );

  box-shadow:
    inset 0 0 0 1px rgba(255,255,255,.34);
}

.ww-answer-thumb img{
  width:100%;
  height:100%;
  display:block;
  object-fit:cover;
}

.ww-answer-meta{
  text-align:center;
  padding-top:.72rem;
}

.ww-answer-release-date{
  display:flex;
  align-items:center;
  justify-content:center;
  gap:.58rem;
  min-height:1.2rem;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size:.82rem;
  line-height:1.15;
  font-weight:900;
  letter-spacing:.13em;
  text-transform:uppercase;

  color:
    rgba(140,92,42,.98);
}

.ww-answer-release-date::before,
.ww-answer-release-date::after{
  content:"";
  flex:0 0 .95rem;
  width:.95rem;
  height:1px;

  background:
    linear-gradient(
      90deg,
      transparent,
      rgba(118,76,31,.72)
    );
}

.ww-answer-release-date::after{
  background:
    linear-gradient(
      90deg,
      rgba(118,76,31,.72),
      transparent
    );
}

.ww-answer-footer{
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:1.45rem;
  margin-top:4.4rem;
}

.ww-answer-base{
  position:relative;

  display:flex;
  align-items:center;
  justify-content:center;
  gap:1rem;

  border:none;
  background:transparent;
  cursor:pointer;

  padding:
    .28rem
    .8rem;

  color:
    rgba(46,34,26,.96);

  font-size:.76rem;
  line-height:1;
  font-weight:950;
  letter-spacing:.38em;
  text-transform:uppercase;

  padding-left:1.18em;

  text-shadow:
    0 0 10px rgba(255,239,198,.55),
    0 0 22px rgba(214,151,71,.22),
    0 1px 0 rgba(255,255,255,.42);

  filter:
    drop-shadow(0 0 8px rgba(255,228,178,.32));

  transition:
    color .2s ease,
    filter .2s ease,
    text-shadow .2s ease,
    transform .2s ease;
}

.ww-answer-base::before,
.ww-answer-base::after{
  content:"";
  width:9rem;
  height:1px;

  background:
    linear-gradient(
      90deg,
      transparent,
      rgba(87,59,30,.42),
      rgba(170,110,43,.5),
      transparent
    );
}

.ww-answer-base span{
  position:relative;
  z-index:2;
}

.ww-answer-base span::before,
.ww-answer-base span::after{
  content:"◆";
  position:relative;
  top:-.06rem;
  font-size:.38rem;

  color:
    rgba(175,111,39,.88);

  text-shadow:
    0 0 8px rgba(255,219,166,.5);
}

.ww-answer-base span::before{
  margin-right:.8rem;
}

.ww-answer-base span::after{
  margin-left:.45rem;
}

.ww-answer-base:hover{
  color:
    rgba(38,27,20,.98);

  transform:
    translateY(-1px);

  filter:
    drop-shadow(0 0 12px rgba(255,228,178,.48));

  text-shadow:
    0 0 14px rgba(255,239,198,.72),
    0 0 30px rgba(214,151,71,.3),
    0 1px 0 rgba(255,255,255,.5);
}

.ww-answer-word{
  position:relative;

  display:inline-flex;
  align-items:center;
  justify-content:center;

  min-width:28rem;

  padding:
    1.18rem
    3.5rem;

  border:none;
  border-radius:999px;

  cursor:pointer;

  background:
    linear-gradient(
      145deg,
      var(--ww-brown-soft),
      var(--ww-brown-mid) 56%,
      var(--ww-brown-deep)
    );

  color:
    #fff7ec;

  font-size:.82rem;
  line-height:1;
  font-weight:950;
  letter-spacing:.28em;
  text-transform:uppercase;

  box-shadow:
    0 20px 40px rgba(48,26,15,.26),
    inset 0 1px 0 rgba(255,255,255,.2);

  transition:
    transform .2s ease,
    filter .2s ease,
    box-shadow .2s ease;
}

.ww-answer-word::before,
.ww-answer-word::after{
  content:"❄";
  position:relative;
  font-size:.8rem;

  color:
    rgba(255,232,196,.72);
}

.ww-answer-word::before{
  margin-right:1.2rem;
}

.ww-answer-word::after{
  margin-left:1rem;
}

.ww-answer-word:hover{
  transform:
    translateY(-2px)
    scale(1.02);

  filter:
    brightness(1.06);

  box-shadow:
    0 26px 48px rgba(48,26,15,.3),
    inset 0 1px 0 rgba(255,255,255,.26);
}

.ww-answer-modal{
  position:fixed;
  inset:0;
  z-index:9999;

  display:flex;
  align-items:center;
  justify-content:center;

  padding:1.4rem;

  background:
    rgba(18,30,24,.48);

  backdrop-filter:
    blur(12px);

  opacity:0;
  pointer-events:none;

  transition:
    opacity .28s ease;
}

.ww-answer-modal.is-open{
  opacity:1;
  pointer-events:auto;
}

.ww-answer-modal-panel{
  width:min(92vw, 36rem);
  border-radius:1.8rem;
  text-align:center;
  padding:2.5rem 2.2rem;

  background:
    linear-gradient(
      180deg,
      rgba(251,243,230,.98),
      rgba(229,209,180,.98)
    );

  box-shadow:
    0 42px 94px rgba(12,26,22,.34),
    inset 0 0 0 1px rgba(255,255,255,.62);
}

.ww-answer-modal-kicker{
  font-size:.66rem;
  line-height:1.6;
  font-weight:950;
  letter-spacing:.25em;
  text-transform:uppercase;

  color:
    rgba(86,48,16,.92);
}

.ww-answer-modal-word{
  margin-top:.95rem;

  font-size:
    clamp(
      2rem,
      5vw,
      3.2rem
    );

  line-height:1;
  font-weight:1000;
  letter-spacing:.13em;
  text-transform:uppercase;

  color:
    rgba(31,20,13,.96);
}

@media (max-width:1380px){

  .ww-answer-shell{
    width:min(100%, 1320px);
  }

  .ww-answer-grid{
    gap:
      1.2rem
      1.2rem;
  }

  .ww-answer-release-date{
    font-size:.72rem;
    letter-spacing:.1em;
  }

  .ww-answer-release-date::before,
  .ww-answer-release-date::after{
    flex-basis:.72rem;
    width:.72rem;
  }

}

@media (max-width:1120px){

  .ww-answer-grid{
    grid-template-columns:
      repeat(
        4,
        minmax(0,1fr)
      );
  }

}

@media (max-width:860px){

  .ww-answer-shell{
    padding:
      2.4rem
      1rem
      2rem;
  }

  .ww-answer-grid{
    grid-template-columns:
      repeat(
        3,
        minmax(0,1fr)
      );
  }

  .ww-answer-title{
    font-size:3.4rem;
  }

  .ww-answer-word{
    min-width:min(100%, 24rem);
  }

  .ww-answer-release-date{
    font-size:.68rem;
    letter-spacing:.08em;
  }

}

@media (max-width:620px){

  .ww-answer-grid{
    grid-template-columns:
      repeat(
        2,
        minmax(0,1fr)
      );
  }

  .ww-answer-title{
    font-size:2.7rem;
  }

  .ww-answer-base{
    font-size:.66rem;
    letter-spacing:.26em;
    padding-left:1.06em;
  }

  .ww-answer-base::before,
  .ww-answer-base::after{
    width:4.8rem;
  }

  .ww-answer-word{
    width:100%;
    min-width:0;

    padding:
      1rem
      1.2rem;

    font-size:.68rem;
    letter-spacing:.18em;
  }

  .ww-answer-word::before,
  .ww-answer-word::after{
    display:none;
  }

  .ww-answer-release-date{
    font-size:.62rem;
  }

  .ww-answer-release-date::before,
  .ww-answer-release-date::after{
    display:none;
  }

}

@media (max-width:420px){

  .ww-answer-grid{
    grid-template-columns:1fr;
  }

  .ww-answer-title{
    font-size:2.2rem;
  }

  .ww-answer-season-row::before,
  .ww-answer-season-row::after{
    display:none;
  }

  .ww-answer-base::before,
  .ww-answer-base::after{
    display:none;
  }

}

</style>

<div id="wwAnswerPage">

  <div class="ww-answer-shell">

    <header class="ww-answer-header">

      <h1 class="ww-answer-title">
        The Answers
      </h1>

      <div class="ww-answer-season-row">

        <div class="ww-answer-season">
          WinterWord ${escapeHtml(seasonYearLabel)}
        </div>

      </div>

      <div class="ww-answer-ornament">

        <span
          class="ww-answer-ornament-mark"
          aria-hidden="true"
        ></span>

      </div>

      <div class="ww-answer-subtitle">
        The ice has melted. All that remains is transparency.
      </div>

    </header>

    <section
      class="ww-answer-grid"
      aria-label="WinterWord Answers"
    >

      ${answers.map((answer) => `

        <button
          class="ww-answer-card"
          type="button"
          data-answer-id="${answer.id}"
          aria-label="View Answer ${answer.id}"
        >

          <div class="ww-answer-thumb">

            <img
              src="${answer.image}"
              alt="Answer ${answer.id}"
            >

          </div>

          <div class="ww-answer-meta">

            <div class="ww-answer-release-date">
              ${escapeHtml(answer.releaseDate)}
            </div>

          </div>

        </button>

      `).join("")}

    </section>

    <footer class="ww-answer-footer">

      <button
        class="ww-answer-base"
        type="button"
        id="wwAnswerBaseButton"
      >
        <span>Base Station</span>
      </button>

      <button
        class="ww-answer-word"
        type="button"
        id="wwAnswerWordButton"
      >
        Your WinterWord Is...
      </button>

    </footer>

  </div>

  <div
    class="ww-answer-modal"
    id="wwAnswerModal"
    aria-hidden="true"
  >

    <div class="ww-answer-modal-panel">

      <div class="ww-answer-modal-kicker">
        YOUR<br>
        WINTERWORD IS
      </div>

      <div class="ww-answer-modal-word">
        ${escapeHtml(finalWord)}
      </div>

    </div>

  </div>

</div>
`;

  const answerButtons =
    app.querySelectorAll(
      "[data-answer-id]"
    );

  const baseButton =
    app.querySelector(
      "#wwAnswerBaseButton"
    );

  const wordButton =
    app.querySelector(
      "#wwAnswerWordButton"
    );

  const modal =
    app.querySelector(
      "#wwAnswerModal"
    );

  const modalPanel =
    app.querySelector(
      ".ww-answer-modal-panel"
    );

  answerButtons.forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const id =
          Number(
            button.getAttribute(
              "data-answer-id"
            )
          );

        if (
          typeof navigate === "function"
        ) {

          navigate(
            "answer",
            { id }
          );

        }

      }
    );

  });

  if (baseButton) {

    baseButton.addEventListener(
      "click",
      () => {

        if (
          typeof navigate === "function"
        ) {

          navigate(
            "base"
          );

        }

      }
    );

  }

  function openModal(){

    if (!modal) {
      return;
    }

    modal.classList.add(
      "is-open"
    );

    modal.setAttribute(
      "aria-hidden",
      "false"
    );

  }

  function closeModal(){

    if (!modal) {
      return;
    }

    modal.classList.remove(
      "is-open"
    );

    modal.setAttribute(
      "aria-hidden",
      "true"
    );

  }

  if (wordButton) {

    wordButton.addEventListener(
      "click",
      openModal
    );

  }

  if (modal) {

    modal.addEventListener(
      "click",
      closeModal
    );

  }

  if (modalPanel) {

    modalPanel.addEventListener(
      "click",
      (event) => {

        event.stopPropagation();

      }
    );

  }

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape"
      ) {

        closeModal();

      }

    }
  );

}

function escapeHtml(value){

  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}
