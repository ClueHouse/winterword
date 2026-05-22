export function renderAnswerList(app, data = {}, navigate) {
  const orgName = data.orgName || data.org_name || "WinterWord";
  const finalWord = data.final_word || data.finalWord || "HOUSEWARMING";

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
  const seasonStartDate = new Date(seasonStartRaw);

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
    if (!hasValidSeasonStart) return "";

    const releaseDate = new Date(
      seasonStartDate.getTime() +
      (index * dropDays * 24 * 60 * 60 * 1000)
    );

    return releaseDate
      .toLocaleDateString("en-NZ", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      })
      .toUpperCase();
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
        --ww-ink:#261a10;
        --ww-espresso:#1f150e;
        --ww-muted:#6c5338;
        --ww-bronze:#8a5f28;
        --ww-bronze-soft:#b88a45;
        --ww-paper:#f4e6cf;
        --ww-paper-light:#fff7ea;
      }

      *{ box-sizing:border-box; }

      .ww-answer-page{
        min-height:100vh;
        width:100%;
        margin:0;
        padding:1.05rem 1.4rem .9rem;
        font-family:system-ui,-apple-system,"Segoe UI",sans-serif;
        color:var(--ww-ink);
        background:
          radial-gradient(circle at 50% 8%, rgba(255,248,231,0.82), transparent 33%),
          radial-gradient(circle at 18% 92%, rgba(145,96,42,0.10), transparent 34%),
          radial-gradient(circle at 88% 18%, rgba(94,58,24,0.10), transparent 30%),
          linear-gradient(135deg,#ead7b9 0%, #f7ead4 42%, #d6b987 100%);
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
            rgba(55,34,18,0.032) 0px,
            rgba(55,34,18,0.032) 1px,
            transparent 1px,
            transparent 5px
          ),
          repeating-linear-gradient(
            90deg,
            rgba(255,255,255,0.18) 0px,
            rgba(255,255,255,0.18) 1px,
            transparent 1px,
            transparent 7px
          );
        mix-blend-mode:multiply;
        opacity:.58;
      }

      .ww-answer-wrap{
        position:relative;
        z-index:1;
        width:min(100%, 61rem);
        margin:0 auto;
      }

      .ww-answer-header{
        text-align:center;
        margin:0 auto 1.08rem;
      }

      .ww-title{
        margin:0;
        font-family:Georgia,"Times New Roman",serif;
        font-size:clamp(2.15rem,3.95vw,4.2rem);
        line-height:.88;
        letter-spacing:.025em;
        text-transform:uppercase;
        color:var(--ww-espresso);
        font-weight:800;
        text-shadow:
          0 1px 0 rgba(255,255,255,0.4),
          0 10px 24px rgba(84,52,20,0.08);
      }

      .ww-season{
        margin-top:.68rem;
        font-family:Georgia,"Times New Roman",serif;
        font-size:.76rem;
        line-height:1;
        letter-spacing:.72em;
        text-transform:uppercase;
        font-weight:700;
        color:#805621;
        padding-left:.72em;
      }

      .ww-ornament{
        display:flex;
        align-items:center;
        justify-content:center;
        gap:.78rem;
        margin:.62rem auto .54rem;
      }

      .ww-ornament::before,
      .ww-ornament::after{
        content:"";
        width:4.8rem;
        height:1px;
        background:linear-gradient(90deg, transparent, rgba(125,84,35,0.54), transparent);
      }

      .ww-ornament img{
        width:.92rem;
        height:auto;
        opacity:.78;
        filter:
          sepia(1)
          saturate(2.1)
          hue-rotate(350deg)
          brightness(.58)
          contrast(1.15);
      }

      .ww-subtitle{
        margin:0 auto;
        max-width:38rem;
        font-family:Georgia,"Times New Roman",serif;
        font-size:.95rem;
        line-height:1.45;
        color:#513b27;
        font-style:italic;
      }

      .ww-grid{
        display:grid;
        grid-template-columns:repeat(4, minmax(0, 1fr));
        gap:1rem;
        align-items:stretch;
      }

      .ww-answer-card{
        border:0;
        cursor:pointer;
        padding:.36rem .36rem .58rem;
        border-radius:.68rem;
        background:
          linear-gradient(180deg, rgba(255,250,240,0.98), rgba(239,220,190,0.98));
        box-shadow:
          0 14px 28px rgba(72,43,16,0.15),
          0 3px 7px rgba(72,43,16,0.10),
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
          0 20px 40px rgba(72,43,16,0.20),
          0 5px 12px rgba(72,43,16,0.13),
          inset 0 0 0 1px rgba(255,255,255,0.95);
      }

      .ww-thumb{
        width:100%;
        aspect-ratio:1.68 / .84;
        overflow:hidden;
        border-radius:.46rem;
        background:#e5d2b4;
        box-shadow:inset 0 0 0 1px rgba(55,34,18,0.12);
      }

      .ww-thumb img{
        display:block;
        width:100%;
        height:100%;
        object-fit:cover;
      }

      .ww-card-meta{
        text-align:center;
        padding-top:.48rem;
      }

      .ww-card-number{
        font-family:Georgia,"Times New Roman",serif;
        font-size:1.18rem;
        line-height:1;
        font-weight:700;
        letter-spacing:.08em;
        color:#875b24;
      }

      .ww-card-date{
        margin-top:.26rem;
        font-size:.52rem;
        font-weight:850;
        letter-spacing:.24em;
        text-transform:uppercase;
        color:#51402f;
        min-height:.65rem;
      }

      .ww-footer{
        margin-top:1.35rem;
        text-align:center;
      }

      .ww-footer-logo{
        width:4.9rem;
        display:block;
        margin:0 auto .36rem;
        filter:
          sepia(1)
          saturate(2.2)
          hue-rotate(350deg)
          brightness(.55)
          contrast(1.18);
        opacity:.92;
      }

      .ww-footer-base{
        display:inline-flex;
        align-items:center;
        justify-content:center;
        gap:.82rem;
        border:0;
        background:transparent;
        cursor:pointer;
        padding:.22rem .5rem;
        color:#6f4a1f;
        font:950 .66rem/1 system-ui,-apple-system,"Segoe UI",sans-serif;
        letter-spacing:.34em;
        text-transform:uppercase;
      }

      .ww-footer-base::before,
      .ww-footer-base::after{
        content:"";
        width:5rem;
        height:1px;
        background:linear-gradient(90deg, transparent, rgba(111,74,31,0.45), transparent);
      }

      .ww-footer-base:hover{
        color:#3f2811;
      }

      .ww-word-button{
        display:block;
        margin:.36rem auto 0;
        border:0;
        background:transparent;
        cursor:pointer;
        color:#765222;
        font:900 .52rem/1 system-ui,-apple-system,"Segoe UI",sans-serif;
        letter-spacing:.22em;
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
        background:rgba(49,34,18,0.38);
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
          radial-gradient(circle at 50% 0%, rgba(255,255,255,0.82), transparent 36%),
          linear-gradient(180deg, #f7ead4, #d4b47e);
        box-shadow:
          0 30px 80px rgba(56,37,18,0.34),
          inset 0 0 0 1px rgba(255,255,255,0.62);
      }

      .ww-modal-kicker-line{
        display:block;
        font-size:.62rem;
        font-weight:900;
        letter-spacing:.28em;
        text-transform:uppercase;
        color:#77511f;
      }

      .ww-modal-word{
        margin-top:.75rem;
        font-size:clamp(1.7rem,5vw,2.55rem);
        font-weight:1000;
        letter-spacing:.14em;
        text-transform:uppercase;
        color:#261a10;
      }

      @media (max-width:900px){
        .ww-answer-wrap{
          width:min(100%, 48rem);
        }

        .ww-grid{
          grid-template-columns:repeat(3, minmax(0, 1fr));
        }

        .ww-season{
          letter-spacing:.45em;
          padding-left:.45em;
        }
      }

      @media (max-width:650px){
        .ww-answer-page{
          padding:1rem .8rem;
        }

        .ww-grid{
          grid-template-columns:repeat(2, minmax(0, 1fr));
        }

        .ww-footer-base::before,
        .ww-footer-base::after{
          width:2.4rem;
        }
      }

      @media (max-width:440px){
        .ww-grid{
          grid-template-columns:1fr;
        }

        .ww-title{
          font-size:2.15rem;
        }

        .ww-season{
          letter-spacing:.28em;
          padding-left:.28em;
        }
      }
    </style>

    <main class="ww-answer-page">
      <div class="ww-answer-wrap">

        <header class="ww-answer-header">
          <h1 class="ww-title">The Answers</h1>
          <div class="ww-season">WinterWord ${escapeHtml(seasonYearLabel)}</div>
          <div class="ww-ornament">
            <img src="/assets/winterword/shared/logo.png" alt="">
          </div>
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
            Your WinterWord is...
          </button>
        </footer>

      </div>
    </main>

    <div class="ww-modal" id="wwWordModal" aria-hidden="true">
      <div class="ww-modal-panel">
        <div class="ww-modal-kicker">
          <span class="ww-modal-kicker-line">Your</span>
          <span class="ww-modal-kicker-line">WinterWord is</span>
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
