export function renderAnswerList(app, data = {}, navigate) {
  const orgName = data.orgName || data.org_name || "WinterWord";
  const finalWord = data.final_word || data.finalWord || "HOUSEWARMING";

  const season_start = data.season_start || "";
  const drop_frequency = data.drop_frequency || "weekly";

  const totalClues = 12;
  const seasonStartDate = new Date(season_start);

  const dropDays =
    drop_frequency === "weekly"
      ? 7
      : drop_frequency === "daily"
        ? 1
        : drop_frequency === "quarter_hourly"
          ? (15 / 1440)
          : 7;

  const hasValidSeasonStart =
    season_start &&
    !Number.isNaN(seasonStartDate.getTime());

  const seasonEndDate = hasValidSeasonStart
    ? new Date(
        seasonStartDate.getTime() +
        ((totalClues - 1) * dropDays * 24 * 60 * 60 * 1000)
      )
    : null;

  const startYear = hasValidSeasonStart
    ? seasonStartDate.getFullYear()
    : new Date().getFullYear();

  const endYear = seasonEndDate
    ? seasonEndDate.getFullYear()
    : startYear;

  const seasonYearLabel =
    startYear === endYear
      ? `${startYear}`
      : `${startYear}/${String(endYear).slice(-2)}`;

  const formatReleaseDate = (index) => {
    if (!hasValidSeasonStart) return "DATE TO BE SET";

    const releaseDate = new Date(
      seasonStartDate.getTime() +
      (index * dropDays * 24 * 60 * 60 * 1000)
    );

    return releaseDate.toLocaleDateString("en-NZ", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }).toUpperCase();
  };

  const answers = Array.from({ length: totalClues }, (_, index) => {
    const num = String(index + 1).padStart(2, "0");
    const ext = index + 1 === 12 ? "gif" : "png";

    return {
      id: num,
      number: num,
      date: formatReleaseDate(index),
      image: `/assets/winterword/display/${num}.${ext}`
    };
  });

  app.innerHTML = `
    <style>
      :root{
        --ww-ink:#2b2118;
        --ww-muted:#6f5c45;
        --ww-gold:#a97931;
        --ww-gold-dark:#755426;
        --ww-cream:#fff8ed;
        --ww-card:#fffdf7;
      }

      *{ box-sizing:border-box; }

      .ww-answer-page{
        min-height:100vh;
        width:100%;
        margin:0;
        padding:1.25rem 1.7rem 1.1rem;
        font-family:system-ui,-apple-system,"Segoe UI",sans-serif;
        color:var(--ww-ink);
        background:
          radial-gradient(circle at 50% 0%, rgba(255,255,255,0.9), transparent 30%),
          linear-gradient(135deg,#fffaf1 0%, #f3e4c8 52%, #dec393 100%);
        overflow-x:hidden;
      }

      .ww-answer-page::before{
        content:"";
        position:fixed;
        inset:0;
        pointer-events:none;
        background:
          repeating-linear-gradient(
            0deg,
            rgba(92,62,30,0.025) 0px,
            rgba(92,62,30,0.025) 1px,
            transparent 1px,
            transparent 5px
          );
        mix-blend-mode:multiply;
      }

      .ww-answer-wrap{
        position:relative;
        z-index:1;
        width:min(100%, 62rem);
        margin:0 auto;
      }

      .ww-answer-header{
        text-align:center;
        margin:0 auto 1rem;
      }

      .ww-title{
        margin:0;
        font-family:Georgia,"Times New Roman",serif;
        font-size:clamp(2rem,4vw,3.75rem);
        line-height:.95;
        letter-spacing:.045em;
        text-transform:uppercase;
        color:#241b14;
        font-weight:800;
      }

      .ww-season{
        margin-top:.55rem;
        font-size:.72rem;
        line-height:1;
        letter-spacing:.56em;
        text-transform:uppercase;
        font-weight:950;
        color:#9a6f2f;
        padding-left:.56em;
      }

      .ww-subtitle{
        margin:.58rem auto 0;
        max-width:38rem;
        font-size:.78rem;
        line-height:1.45;
        color:#66513b;
      }

      .ww-grid{
        display:grid;
        grid-template-columns:repeat(4, minmax(0, 1fr));
        gap:.68rem;
        align-items:stretch;
      }

      .ww-answer-card{
        border:0;
        cursor:pointer;
        padding:.38rem .38rem .48rem;
        border-radius:.78rem;
        background:
          linear-gradient(180deg, rgba(255,255,255,0.96), rgba(250,239,219,0.96));
        box-shadow:
          0 11px 22px rgba(76,49,23,0.13),
          0 3px 7px rgba(76,49,23,0.09),
          inset 0 0 0 1px rgba(255,255,255,0.82);
        transition:
          transform .2s ease,
          box-shadow .2s ease,
          filter .2s ease;
      }

      .ww-answer-card:hover{
        transform:translateY(-3px);
        filter:brightness(1.025);
        box-shadow:
          0 17px 34px rgba(76,49,23,0.18),
          0 5px 11px rgba(76,49,23,0.12),
          inset 0 0 0 1px rgba(255,255,255,0.9);
      }

      .ww-thumb{
        width:100%;
        aspect-ratio:1.55 / .83;
        overflow:hidden;
        border-radius:.58rem;
        background:#eadfcf;
        box-shadow:inset 0 0 0 1px rgba(70,45,20,0.12);
      }

      .ww-thumb img{
        display:block;
        width:100%;
        height:100%;
        object-fit:cover;
      }

      .ww-card-meta{
        text-align:center;
        padding-top:.38rem;
      }

      .ww-card-number{
        font-size:.66rem;
        font-weight:1000;
        letter-spacing:.18em;
        color:#8c642b;
      }

      .ww-card-date{
        margin-top:.16rem;
        font-size:.48rem;
        font-weight:850;
        letter-spacing:.11em;
        text-transform:uppercase;
        color:#7d6a54;
      }

      .ww-footer{
        margin-top:1rem;
        text-align:center;
      }

      .ww-footer-logo{
        width:4.6rem;
        display:block;
        margin:0 auto .22rem;
      }

      .ww-footer-base{
        display:inline-flex;
        align-items:center;
        justify-content:center;
        gap:.55rem;
        border:0;
        background:transparent;
        cursor:pointer;
        padding:.25rem .5rem;
        color:#7f5b29;
        font:950 .62rem/1 system-ui,-apple-system,"Segoe UI",sans-serif;
        letter-spacing:.22em;
        text-transform:uppercase;
      }

      .ww-footer-base::before,
      .ww-footer-base::after{
        content:"";
        width:3.2rem;
        height:1px;
        background:rgba(127,91,41,0.34);
      }

      .ww-footer-base:hover{
        color:#5e421f;
      }

      .ww-word-button{
        display:block;
        margin:.42rem auto 0;
        border:0;
        background:transparent;
        cursor:pointer;
        color:#8c642b;
        font:900 .54rem/1 system-ui,-apple-system,"Segoe UI",sans-serif;
        letter-spacing:.18em;
        text-transform:uppercase;
        opacity:.88;
      }

      .ww-word-button:hover{
        opacity:1;
        text-decoration:underline;
        text-underline-offset:.28rem;
      }

      .ww-modal{
        position:fixed;
        inset:0;
        z-index:9999;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:1.5rem;
        background:rgba(49,34,18,0.36);
        backdrop-filter:blur(10px);
        opacity:0;
        pointer-events:none;
        transition:opacity .3s ease;
      }

      .ww-modal.is-open{
        opacity:1;
        pointer-events:auto;
      }

      .ww-modal-panel{
        width:min(32rem, 92vw);
        padding:2.1rem 1.8rem;
        border-radius:1.45rem;
        text-align:center;
        background:
          radial-gradient(circle at 50% 0%, rgba(255,255,255,0.92), transparent 36%),
          linear-gradient(180deg, #fffaf0, #ead7b9);
        box-shadow:
          0 30px 80px rgba(56,37,18,0.32),
          inset 0 0 0 1px rgba(255,255,255,0.72);
      }

      .ww-modal-kicker-line{
        display:block;
        font-size:.62rem;
        font-weight:900;
        letter-spacing:.28em;
        text-transform:uppercase;
        color:#8f6a33;
      }

      .ww-modal-word{
        margin-top:.75rem;
        font-size:clamp(1.7rem,5vw,2.55rem);
        font-weight:1000;
        letter-spacing:.14em;
        text-transform:uppercase;
        color:#332417;
      }

      @media (max-width:900px){
        .ww-answer-wrap{
          width:min(100%, 50rem);
        }

        .ww-grid{
          grid-template-columns:repeat(3, minmax(0, 1fr));
        }
      }

      @media (max-width:650px){
        .ww-answer-page{
          padding:1rem .8rem;
        }

        .ww-grid{
          grid-template-columns:repeat(2, minmax(0, 1fr));
        }

        .ww-season{
          letter-spacing:.32em;
          padding-left:.32em;
        }
      }

      @media (max-width:440px){
        .ww-grid{
          grid-template-columns:1fr;
        }

        .ww-title{
          font-size:2.25rem;
        }
      }
    </style>

    <main class="ww-answer-page">
      <div class="ww-answer-wrap">

        <header class="ww-answer-header">
          <h1 class="ww-title">The Answers</h1>
          <div class="ww-season">WinterWord ${escapeHtml(seasonYearLabel)}</div>
          <div class="ww-subtitle">
            The ice has melted. All that remains is transparency.
          </div>
        </header>

        <section class="ww-grid" aria-label="WinterWord answers">
          ${answers.map((answer) => `
            <button class="ww-answer-card" type="button" data-nav="answer" data-id="${parseInt(answer.id, 10)}" aria-label="View answer ${parseInt(answer.id, 10)}">
              <div class="ww-thumb">
                <img src="${answer.image}" alt="Answer ${parseInt(answer.id, 10)}">
              </div>
              <div class="ww-card-meta">
                <div class="ww-card-number">${escapeHtml(answer.number)}</div>
                <div class="ww-card-date">${escapeHtml(answer.date)}</div>
              </div>
            </button>
          `).join("")}
        </section>

        <footer class="ww-footer">
          <img class="ww-footer-logo" src="/assets/winterword/shared/logo.png" alt="${escapeHtml(orgName)}">
          <button class="ww-footer-base" type="button" data-nav="base-station">
            Base Station
          </button>
          <button class="ww-word-button" type="button" id="wwWordBtn">
            WinterWord
          </button>
        </footer>

      </div>
    </main>

    <div class="ww-modal" id="wwWordModal" aria-hidden="true">
      <div class="ww-modal-panel">
        <div class="ww-modal-kicker">
          <span class="ww-modal-kicker-line">The</span>
          <span class="ww-modal-kicker-line">WinterWord</span>
        </div>
        <div class="ww-modal-word">${escapeHtml(finalWord)}</div>
      </div>
    </div>
  `;

  const navButtons = app.querySelectorAll("[data-nav]");
  const wordButton = app.querySelector("#wwWordBtn");
  const modal = app.querySelector("#wwWordModal");
  const modalPanel = app.querySelector(".ww-modal-panel");

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const path = button.getAttribute("data-nav");
      const id = button.getAttribute("data-id");

      if (typeof navigate === "function") {
        if (path === "answer" && id) {
          navigate("answer", { id: Number(id) });
        } else {
          navigate(path);
        }
      }
    });
  });

  function openModal() {
    if (!modal) return;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  }

  if (wordButton) {
    wordButton.addEventListener("click", openModal);
  }

  if (modal) {
    modal.addEventListener("click", closeModal);
  }

  if (modalPanel) {
    modalPanel.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  }

  app.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
