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

  --ww-paper:
    #efe6d5;

  --ww-paper-soft:
    #f7f0e3;

  --ww-card:
    rgba(244,233,214,0.92);

  --ww-card-border:
    rgba(255,255,255,0.72);

  --ww-ink:
    #443123;

  --ww-ink-soft:
    #685240;

  --ww-title:
    #3a271a;

  --ww-bronze:
    #9b6a2b;

  --ww-bronze-soft:
    #c49758;

  --ww-orange:
    #d08a36;

  --ww-orange-deep:
    #96531d;

  --ww-orange-shadow:
    rgba(92,44,8,0.28);

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
      circle at 50% 0%,
      rgba(255,255,255,0.72),
      transparent 28%
    ),

    radial-gradient(
      circle at 82% 12%,
      rgba(255,245,218,0.16),
      transparent 24%
    ),

    radial-gradient(
      circle at 14% 82%,
      rgba(255,223,176,0.12),
      transparent 30%
    ),

    linear-gradient(
      135deg,
      #d8e7de 0%,
      #bfd4c8 20%,
      #e4ede3 48%,
      #bfd3c7 74%,
      #97b2a2 100%
    );

}

#wwAnswerPage::before{
  content:"";

  position:fixed;
  inset:0;

  pointer-events:none;

  background:

    repeating-linear-gradient(
      0deg,
      rgba(0,0,0,0.018) 0px,
      rgba(0,0,0,0.018) 1px,
      transparent 1px,
      transparent 5px
    );

  opacity:.36;
}

#wwAnswerPage::after{
  content:"";

  position:absolute;

  left:50%;
  top:50%;

  width:min(82vw, 1100px);
  aspect-ratio:1 / 1;

  transform:
    translate(-50%, -42%);

  background:
    url("/assets/winterword/shared/logo.png")
    center center / contain
    no-repeat;

  opacity:.045;

  filter:
    blur(7px)
    sepia(1)
    saturate(2.1)
    hue-rotate(352deg)
    brightness(.62);

  pointer-events:none;
}

.ww-answer-shell{

  position:relative;
  z-index:2;

  width:min(100%, 1220px);

  margin:0 auto;

  padding:
    1.2rem
    2rem
    2.6rem;

}

.ww-answer-header{

  position:relative;

  text-align:center;

  margin-bottom:2rem;

}

.ww-answer-title{

  margin:0;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size:
    clamp(
      2.8rem,
      5.3vw,
      5.4rem
    );

  line-height:.9;

  letter-spacing:.015em;

  text-transform:uppercase;

  font-weight:700;

  color:
    rgba(58,39,26,0.92);

  text-shadow:
    0 1px 0 rgba(255,255,255,0.18),
    0 10px 24px rgba(12,30,24,0.08);

}

.ww-answer-logo{

  width:
    clamp(
      5.2rem,
      8vw,
      7.8rem
    );

  display:block;

  margin:
    .55rem auto
    .45rem;

  filter:
    sepia(1)
    saturate(2)
    hue-rotate(352deg)
    brightness(.68);

  opacity:.94;

}

.ww-answer-season{

  margin-top:.2rem;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size:.78rem;

  font-weight:700;

  line-height:1;

  letter-spacing:.72em;

  text-transform:uppercase;

  color:
    rgba(114,82,48,0.86);

  padding-left:.72em;

}

.ww-answer-ornament{

  display:flex;

  align-items:center;
  justify-content:center;

  gap:1rem;

  margin:
    .8rem auto
    .7rem;

}

.ww-answer-ornament::before,
.ww-answer-ornament::after{

  content:"";

  width:6rem;
  height:1px;

  background:
    linear-gradient(
      90deg,
      transparent,
      rgba(108,77,42,0.46),
      transparent
    );

}

.ww-answer-ornament-mark{

  width:1rem;

  opacity:.46;

  filter:
    sepia(1)
    saturate(2);

}

.ww-answer-subtitle{

  max-width:42rem;

  margin:0 auto;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size:
    clamp(
      .96rem,
      1.2vw,
      1.08rem
    );

  line-height:1.55;

  color:
    rgba(62,46,34,0.82);

  font-style:italic;

}

.ww-answer-grid{

  display:grid;

  grid-template-columns:
    repeat(
      6,
      minmax(0,1fr)
    );

  gap:
    1.4rem
    1.4rem;

  align-items:start;

}

.ww-answer-card{

  position:relative;

  border:none;

  cursor:pointer;

  border-radius:1rem;

  background:
    linear-gradient(
      180deg,
      rgba(250,244,234,0.98),
      rgba(233,219,194,0.96)
    );

  padding:
    .42rem
    .42rem
    .62rem;

  box-shadow:

    0 18px 34px rgba(12,30,24,0.10),

    0 3px 8px rgba(12,30,24,0.08),

    inset 0 0 0 1px rgba(255,255,255,0.82);

  transition:
    transform .22s ease,
    box-shadow .22s ease,
    filter .22s ease;

}

.ww-answer-card:hover{

  transform:
    translateY(-4px);

  filter:
    brightness(1.025);

  box-shadow:

    0 26px 48px rgba(12,30,24,0.14),

    0 5px 12px rgba(12,30,24,0.12),

    inset 0 0 0 1px rgba(255,255,255,0.96);

}

.ww-answer-thumb{

  position:relative;

  width:100%;

  aspect-ratio:
    .96 / 1.05;

  overflow:hidden;

  border-radius:.72rem;

  background:#d9ccb8;

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

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size:1.05rem;

  line-height:1;

  font-weight:700;

  letter-spacing:.12em;

  color:
    rgba(140,95,38,0.96);

}

.ww-answer-date{

  margin-top:.3rem;

  min-height:.8rem;

  font-size:.52rem;

  line-height:1.3;

  font-weight:900;

  letter-spacing:.22em;

  text-transform:uppercase;

  color:
    rgba(76,58,44,0.76);

}

.ww-answer-footer{

  display:flex;

  flex-direction:column;

  align-items:center;

  justify-content:center;

  gap:1rem;

  margin-top:2.2rem;

}

.ww-answer-base{

  display:flex;

  align-items:center;
  justify-content:center;

  gap:1rem;

  border:none;

  background:transparent;

  cursor:pointer;

  padding:0;

  color:
    rgba(44,32,22,0.92);

  font-size:.68rem;

  line-height:1;

  font-weight:900;

  letter-spacing:.34em;

  text-transform:uppercase;

}

.ww-answer-base::before,
.ww-answer-base::after{

  content:"";

  width:6.2rem;
  height:1px;

  background:
    linear-gradient(
      90deg,
      transparent,
      rgba(66,48,28,0.42),
      transparent
    );

}

.ww-answer-word{

  position:relative;

  display:inline-flex;

  align-items:center;
  justify-content:center;

  min-width:18rem;

  padding:
    1.1rem
    2rem;

  border:none;

  border-radius:999px;

  cursor:pointer;

  background:

    linear-gradient(
      180deg,
      rgba(255,255,255,0.14),
      rgba(255,255,255,0.03)
    ),

    linear-gradient(
      145deg,
      #df9a42,
      #bf7323 56%,
      #8e4f18
    );

  color:#fff8ef;

  font-size:.72rem;

  line-height:1;

  font-weight:950;

  letter-spacing:.24em;

  text-transform:uppercase;

  box-shadow:

    0 22px 42px rgba(90,44,10,0.22),

    0 6px 16px rgba(90,44,10,0.14),

    inset 0 1px 0 rgba(255,255,255,0.22),

    inset 0 0 0 1px rgba(0,0,0,0.12);

  transition:
    transform .2s ease,
    box-shadow .2s ease,
    filter .2s ease;

}

.ww-answer-word:hover{

  transform:
    translateY(-2px)
    scale(1.018);

  filter:
    brightness(1.06);

  box-shadow:

    0 30px 54px rgba(90,44,10,0.26),

    0 8px 18px rgba(90,44,10,0.18),

    inset 0 1px 0 rgba(255,255,255,0.24),

    inset 0 0 0 1px rgba(0,0,0,0.16);

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

  width:min(92vw, 34rem);

  border-radius:1.7rem;

  text-align:center;

  padding:
    2.3rem
    2rem;

  background:

    radial-gradient(
      circle at 50% 0%,
      rgba(255,255,255,0.74),
      transparent 34%
    ),

    linear-gradient(
      180deg,
      #f1e0c5,
      #cfa166
    );

  box-shadow:

    0 40px 90px rgba(12,26,22,0.32),

    inset 0 0 0 1px rgba(255,255,255,0.64);

}

.ww-answer-modal-kicker{

  font-size:.62rem;

  line-height:1.6;

  font-weight:900;

  letter-spacing:.28em;

  text-transform:uppercase;

  color:
    rgba(102,67,30,0.9);

}

.ww-answer-modal-word{

  margin-top:.8rem;

  font-size:
    clamp(
      1.9rem,
      5vw,
      2.9rem
    );

  line-height:1;

  font-weight:1000;

  letter-spacing:.14em;

  text-transform:uppercase;

  color:
    rgba(34,22,14,0.94);

}

@media (max-width:1200px){

  .ww-answer-grid{

    grid-template-columns:
      repeat(
        4,
        minmax(0,1fr)
      );

  }

}

@media (max-width:820px){

  .ww-answer-shell{

    padding:
      1rem
      1rem
      2rem;

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

    font-size:3rem;

  }

  .ww-answer-season{

    letter-spacing:.45em;

    padding-left:.45em;

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

  .ww-answer-word{

    min-width:100%;

  }

  .ww-answer-base::before,
  .ww-answer-base::after{

    width:3rem;

  }

}

@media (max-width:420px){

  .ww-answer-grid{

    grid-template-columns:1fr;

  }

  .ww-answer-title{

    font-size:2.2rem;

  }

}

</style>

<div id="wwAnswerPage">

  <div class="ww-answer-shell">

    <header class="ww-answer-header">

      <h1 class="ww-answer-title">
        The Answers
      </h1>

      <img
        class="ww-answer-logo"
        src="/assets/winterword/shared/logo.png"
        alt="${escapeHtml(orgName)}"
      >

      <div class="ww-answer-season">
        WinterWord ${escapeHtml(seasonYearLabel)}
      </div>

      <div class="ww-answer-ornament">

        <img
          class="ww-answer-ornament-mark"
          src="/assets/winterword/shared/logo.png"
          alt=""
        >

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
        Base Station
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
