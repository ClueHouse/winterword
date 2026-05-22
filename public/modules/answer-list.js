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

  const dropFrequency =
    data.drop_frequency ||
    data.dropFrequency ||
    data.season?.drop_frequency ||
    data.orgState?.drop_frequency ||
    data.org_state?.drop_frequency ||
    data.state?.drop_frequency ||
    "weekly";

  const totalClues = 12;

  const seasonStartDate =
    new Date(seasonStartRaw);

  const hasValidSeasonStart =
    seasonStartRaw &&
    !Number.isNaN(seasonStartDate.getTime());

  const dropDays =
    dropFrequency === "weekly"
      ? 7
      : dropFrequency === "daily"
        ? 1
        : dropFrequency === "quarter_hourly"
          ? (15 / 1440)
          : 7;

  const seasonEndDate =
    hasValidSeasonStart
      ? new Date(
          seasonStartDate.getTime() +
          ((totalClues - 1) * dropDays * 24 * 60 * 60 * 1000)
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
      return "";
    }

    const releaseDate =
      new Date(
        seasonStartDate.getTime() +
        (index * dropDays * 24 * 60 * 60 * 1000)
      );

    return releaseDate
      .toLocaleDateString(
        "en-NZ",
        {
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

  --ww-paper:#efe3cb;
  --ww-paper-soft:#f8efdd;
  --ww-ink:#4a3324;
  --ww-ink-soft:#6b503b;
  --ww-bronze:#9e6829;
  --ww-bronze-soft:#c08a45;
  --ww-orange:#e9902d;
  --ww-orange-deep:#9a5418;

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
    radial-gradient(
      circle at 50% 8%,
      rgba(255,255,255,0.94),
      rgba(255,255,255,0.6) 18%,
      transparent 35%
    ),
    radial-gradient(
      circle at 50% 96%,
      rgba(255,255,255,0.38),
      transparent 28%
    ),
    radial-gradient(
      circle at 15% 28%,
      rgba(255,247,224,0.18),
      transparent 26%
    ),
    radial-gradient(
      circle at 85% 72%,
      rgba(255,247,224,0.14),
      transparent 28%
    ),
    linear-gradient(
      135deg,
      #dfece4 0%,
      #c9ddd1 23%,
      #edf1e8 48%,
      #c2d9cd 74%,
      #9fbba9 100%
    );
}

#wwAnswerPage::before{
  content:"";
  position:fixed;
  inset:0;
  pointer-events:none;
  z-index:0;

  background:
    radial-gradient(
      circle at 14% 22%,
      rgba(255,255,255,0.24),
      transparent 23%
    ),
    radial-gradient(
      circle at 86% 76%,
      rgba(255,245,220,0.19),
      transparent 28%
    ),
    repeating-linear-gradient(
      0deg,
      rgba(40,42,32,0.024) 0px,
      rgba(40,42,32,0.024) 1px,
      transparent 1px,
      transparent 5px
    );

  opacity:.52;
}

#wwAnswerPage::after{
  content:"";
  position:fixed;
  left:50%;
  top:17%;

  width:min(62vw, 980px);
  aspect-ratio:1 / 1;

  transform:
    translate(-50%, -22%);

  background:
    url("/assets/winterword/shared/logo.png")
    center center / contain
    no-repeat;

  opacity:.08;

  filter:
    blur(28px)
    sepia(1)
    saturate(2.25)
    hue-rotate(350deg)
    brightness(.82);

  pointer-events:none;
  z-index:0;
}

.ww-answer-shell{
  position:relative;
  z-index:2;

  width:min(100%, 1570px);
  margin:0 auto;

  padding:
    4.25rem
    2.6rem
    2.4rem;
}

.ww-answer-header{
  text-align:center;
  margin-bottom:1.65rem;
}

.ww-answer-header::before{
  content:"";

  display:block;

  width:7.2rem;
  height:7.2rem;

  margin:
    0 auto
    1.05rem;

  background:
    url("/assets/winterword/shared/logo.png")
    center center / contain
    no-repeat;

  filter:
    sepia(1)
    saturate(2.1)
    hue-rotate(350deg)
    brightness(.78);

  opacity:.92;
}

.ww-answer-title{
  margin:0;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size:
    clamp(
      4rem,
      6.1vw,
      7.2rem
    );

  line-height:.82;
  letter-spacing:.08em;
  text-transform:uppercase;
  font-weight:700;

  color:
    rgba(70,48,34,0.96);

  text-shadow:
    0 1px 0 rgba(255,255,255,0.35),
    0 12px 28px rgba(30,36,28,0.11);

  padding-left:.08em;
}

.ww-answer-season-row{
  display:flex;
  align-items:center;
  justify-content:center;
  gap:1.25rem;

  margin-top:.65rem;
}

.ww-answer-season-row::before,
.ww-answer-season-row::after{
  content:"";
  width:8.2rem;
  height:1px;

  background:
    linear-gradient(
      90deg,
      transparent,
      rgba(115,78,39,0.42),
      transparent
    );
}

.ww-answer-season{
  position:relative;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size:.88rem;
  font-weight:800;
  line-height:1;

  letter-spacing:.44em;
  text-transform:uppercase;

  color:
    rgba(137,91,42,0.94);

  padding-left:.44em;
}

.ww-answer-season::before,
.ww-answer-season::after{
  content:"◆";
  position:relative;
  top:-.05rem;

  font-size:.42rem;
  color:
    rgba(172,112,44,0.9);
}

.ww-answer-season::before{
  margin-right:1rem;
}

.ww-answer-season::after{
  margin-left:.56rem;
}

.ww-answer-ornament{
  display:flex;
  align-items:center;
  justify-content:center;
  gap:.8rem;

  margin:
    .82rem auto
    .52rem;
}

.ww-answer-ornament::before,
.ww-answer-ornament::after{
  content:"";
  width:4.6rem;
  height:1px;

  background:
    linear-gradient(
      90deg,
      transparent,
      rgba(149,96,37,0.54),
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
      rgba(221,157,71,0.96),
      rgba(126,78,29,0.72)
    );

  box-shadow:
    0 0 0 3px rgba(184,124,51,0.08);
}

.ww-answer-subtitle{
  max-width:46rem;
  margin:0 auto;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size:
    clamp(
      1rem,
      1.12vw,
      1.16rem
    );

  line-height:1.45;
  font-style:italic;

  color:
    rgba(67,48,36,0.86);

  text-shadow:
    0 1px 0 rgba(255,255,255,0.28);
}

.ww-answer-grid{
  display:grid;

  grid-template-columns:
    repeat(
      6,
      minmax(0,1fr)
    );

  gap:
    1.15rem
    1.45rem;

  align-items:start;

  margin-top:2rem;
}

.ww-answer-card{
  position:relative;

  border:none;
  cursor:pointer;

  border-radius:.78rem;

  background:
    linear-gradient(
      180deg,
      rgba(252,247,238,0.98),
      rgba(234,219,191,0.98)
    );

  padding:
    .42rem
    .42rem
    .68rem;

  box-shadow:
    0 20px 36px rgba(24,39,32,0.15),
    0 4px 10px rgba(24,39,32,0.09),
    inset 0 0 0 1px rgba(255,255,255,0.88);

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
    inset 0 0 0 1px rgba(115,78,39,0.14);
}

.ww-answer-card:hover{
  transform:
    translateY(-5px);

  filter:
    brightness(1.035);

  box-shadow:
    0 30px 52px rgba(24,39,32,0.19),
    0 6px 14px rgba(24,39,32,0.12),
    inset 0 0 0 1px rgba(255,255,255,0.95);
}

.ww-answer-thumb{
  position:relative;
  width:100%;

  aspect-ratio:
    16 / 10;

  overflow:hidden;

  border-radius:.52rem;

  background:#d9ccb8;
}

.ww-answer-thumb::after{
  content:"";
  position:absolute;
  inset:0;

  pointer-events:none;

  background:
    linear-gradient(
      180deg,
      rgba(255,255,255,0.08),
      transparent 24%,
      rgba(0,0,0,0.08) 100%
    );

  box-shadow:
    inset 0 0 0 1px rgba(255,255,255,0.38);
}

.ww-answer-thumb img{
  width:100%;
  height:100%;
  display:block;
  object-fit:cover;
}

.ww-answer-meta{
  text-align:center;
  padding-top:.62rem;
}

.ww-answer-number{
  display:flex;
  align-items:center;
  justify-content:center;
  gap:.58rem;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size:1.08rem;
  line-height:1;

  font-weight:800;
  letter-spacing:.13em;

  color:
    rgba(144,92,35,0.98);
}

.ww-answer-number::before,
.ww-answer-number::after{
  content:"";
  width:.9rem;
  height:1px;

  background:
    linear-gradient(
      90deg,
      transparent,
      rgba(118,76,31,0.72)
    );
}

.ww-answer-number::after{
  background:
    linear-gradient(
      90deg,
      rgba(118,76,31,0.72),
      transparent
    );
}

.ww-answer-date{
  margin-top:.25rem;
  min-height:.6rem;

  font-size:.48rem;
  line-height:1.25;
  font-weight:900;

  letter-spacing:.16em;
  text-transform:uppercase;

  color:
    rgba(76,58,44,0.68);
}

.ww-answer-footer{
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;

  gap:.95rem;

  margin-top:2.15rem;
}

.ww-answer-base{
  display:flex;
  align-items:center;
  justify-content:center;

  gap:1.05rem;

  border:none;
  background:transparent;
  cursor:pointer;
  padding:0;

  color:
    rgba(45,32,23,0.94);

  font-size:.76rem;
  line-height:1;

  font-weight:950;
  letter-spacing:.36em;
  text-transform:uppercase;

  padding-left:.36em;
}

.ww-answer-base::before,
.ww-answer-base::after{
  content:"";
  width:8rem;
  height:1px;

  background:
    linear-gradient(
      90deg,
      transparent,
      rgba(87,59,30,0.44),
      rgba(170,110,43,0.54),
      transparent
    );
}

.ww-answer-base span{
  position:relative;
}

.ww-answer-base span::before,
.ww-answer-base span::after{
  content:"◆";
  position:relative;
  top:-.06rem;

  font-size:.38rem;
  color:
    rgba(175,111,39,0.88);
}

.ww-answer-base span::before{
  margin-right:.8rem;
}

.ww-answer-base span::after{
  margin-left:.44rem;
}

.ww-answer-word{
  position:relative;

  display:inline-flex;
  align-items:center;
  justify-content:center;

  min-width:27rem;

  padding:
    1.14rem
    3.1rem;

  border:none;
  border-radius:999px;

  cursor:pointer;

  background:
    radial-gradient(
      circle at 50% 0%,
      rgba(255,244,214,0.48),
      transparent 40%
    ),
    linear-gradient(
      145deg,
      #f5a13a,
      #d87d24 54%,
      #9b5318
    );

  color:#fff8ef;

  font-size:.82rem;
  line-height:1;

  font-weight:950;
  letter-spacing:.28em;
  text-transform:uppercase;

  box-shadow:
    0 24px 42px rgba(91,43,9,0.28),
    0 8px 18px rgba(91,43,9,0.17),
    inset 0 1px 0 rgba(255,255,255,0.34),
    inset 0 0 0 1px rgba(0,0,0,0.14);

  transition:
    transform .2s ease,
    box-shadow .2s ease,
    filter .2s ease;
}

.ww-answer-word::before,
.ww-answer-word::after{
  content:"❄";
  position:relative;

  font-size:.8rem;
  color:
    rgba(255,234,197,0.72);
}

.ww-answer-word::before{
  margin-right:1.2rem;
}

.ww-answer-word::after{
  margin-left:.9rem;
}

.ww-answer-word:hover{
  transform:
    translateY(-2px)
    scale(1.018);

  filter:
    brightness(1.075);

  box-shadow:
    0 32px 56px rgba(91,43,9,0.32),
    0 10px 20px rgba(91,43,9,0.22),
    inset 0 1px 0 rgba(255,255,255,0.38),
    inset 0 0 0 1px rgba(0,0,0,0.18);
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
    rgba(18,34,28,0.44);

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

  padding:
    2.45rem
    2.15rem;

  background:
    radial-gradient(
      circle at 50% 0%,
      rgba(255,255,255,0.72),
      transparent 34%
    ),
    linear-gradient(
      180deg,
      #f4dec0,
      #df9a42 52%,
      #a85b1b
    );

  box-shadow:
    0 42px 94px rgba(12,26,22,0.34),
    inset 0 0 0 1px rgba(255,255,255,0.58);
}

.ww-answer-modal-kicker{
  font-size:.66rem;
  line-height:1.6;

  font-weight:950;
  letter-spacing:.25em;
  text-transform:uppercase;

  color:
    rgba(86,48,16,0.92);
}

.ww-answer-modal-word{
  margin-top:.92rem;

  font-size:
    clamp(
      2rem,
      5vw,
      3.1rem
    );

  line-height:1;

  font-weight:1000;
  letter-spacing:.13em;
  text-transform:uppercase;

  color:
    rgba(31,20,13,0.96);
}

@media (max-width:1380px){

  .ww-answer-shell{
    width:min(100%, 1260px);
  }

  .ww-answer-grid{
    gap:
      1rem
      1.1rem;
  }

  .ww-answer-title{
    font-size:
      clamp(
        3.8rem,
        6vw,
        6.4rem
      );
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

  .ww-answer-title{
    letter-spacing:.055em;
    padding-left:.055em;
  }

}

@media (max-width:860px){

  .ww-answer-shell{
    padding:
      2.2rem
      1rem
      2rem;
  }

  .ww-answer-header::before{
    width:5.8rem;
    height:5.8rem;
    margin-bottom:.8rem;
  }

  .ww-answer-grid{
    grid-template-columns:
      repeat(
        3,
        minmax(0,1fr)
      );

    gap:1rem;
  }

  .ww-answer-title{
    font-size:3.15rem;
  }

  .ww-answer-season-row{
    gap:.65rem;
  }

  .ww-answer-season-row::before,
  .ww-answer-season-row::after{
    width:3.6rem;
  }

  .ww-answer-season{
    font-size:.72rem;
    letter-spacing:.22em;
    padding-left:.22em;
  }

  .ww-answer-base::before,
  .ww-answer-base::after{
    width:3.2rem;
  }

  .ww-answer-word{
    min-width:min(100%, 24rem);
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
    font-size:2.55rem;
  }

  .ww-answer-word{
    width:100%;
    min-width:0;

    padding:
      1.05rem
      1.2rem;

    font-size:.68rem;
    letter-spacing:.18em;
  }

  .ww-answer-word::before,
  .ww-answer-word::after{
    display:none;
  }

}

@media (max-width:420px){

  .ww-answer-grid{
    grid-template-columns:1fr;
  }

  .ww-answer-title{
    font-size:2.15rem;
  }

  .ww-answer-season-row::before,
  .ww-answer-season-row::after{
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

            <div class="ww-answer-number">
              ${answer.number}
            </div>

            <div class="ww-answer-date">
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
