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
    seasonStartDate instanceof Date &&
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
    if (!hasValidSeasonStart) return "";

    const releaseDate = new Date(
      seasonStartDate.getTime() +
      (index * dropDays * 24 * 60 * 60 * 1000)
    );

    return releaseDate.toLocaleDateString("en-NZ", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  const answers = Array.from({ length: totalClues }, (_, index) => {
    const num = String(index + 1).padStart(2, "0");
    const ext = index + 1 === 12 ? "gif" : "png";

    return {
      id: num,
      number: num,
      date: formatReleaseDate(index),
      image: `/assets/winterword/display/${num}.${ext}`,
      path: `/answers/${num}`
    };
  });

  app.innerHTML = `
    <style>
      :root{
        --ww-ink:#2c241c;
        --ww-muted:#7b6750;
        --ww-gold:#b58a45;
        --ww-gold-dark:#7d5b2f;
        --ww-cream:#fff8ed;
        --ww-card:#fffdf7;
        --ww-shadow:rgba(70,45,20,0.18);
      }

      *{ box-sizing:border-box; }

      .ww-answer-page{
        min-height:100vh;
        width:100%;
        margin:0;
        padding:2.2rem 2.4rem 1.45rem;
        font-family:system-ui,-apple-system,"Segoe UI",sans-serif;
        color:var(--ww-ink);
        background:
          radial-gradient(circle at 50% 0%, rgba(255,255,255,0.94), transparent 28%),
          radial-gradient(circle at 20% 18%, rgba(255,232,184,0.42), transparent 26%),
          radial-gradient(circle at 82% 26%, rgba(226,199,145,0.18), transparent 30%),
          linear-gradient(135deg,#fffaf1 0%, #f4e7cf 48%, #e2ca9e 100%);
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
            rgba(95,67,38,0.026) 0px,
            rgba(95,67,38,0.026) 1px,
            transparent 1px,
            transparent 5px
          );
        mix-blend-mode:multiply;
      }

      .ww-answer-wrap{
        position:relative;
        z-index:1;
        width:min(100%, 76rem);
        margin:0 auto;
      }

      .ww-answer-header{
        text-align:center;
        margin:0 auto 1.75rem;
      }

      .ww-title{
        margin:0;
        font-family:Georgia,"Times New Roman",serif;
        font-size:clamp(2rem,4.6vw,4.7rem);
        line-height:.95;
        letter-spacing:.05em;
        text-transform:uppercase;
        color:#261e17;
        font-weight:800;
      }

      .ww-season{
        margin-top:.9rem;
        font-size:clamp(.72rem,1.2vw,.98rem);
        line-height:1;
        letter-spacing:.62em;
        text-transform:uppercase;
        font-weight:950;
        color:#9c7336;
        padding-left:.62em;
      }

      .ww-subtitle{
        margin:.86rem auto 0;
        max-width:44rem;
        font-size:clamp(.82rem,1.1vw,.98rem);
        line-height:1.5;
        color:#6e5a43;
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
        padding:.55rem .55rem .72rem;
        border-radius:1rem;
        background:
          linear-gradient(180deg, rgba(255,255,255,0.96), rgba(250,239,219,0.96));
        box-shadow:
          0 16px 34px rgba(76,49,23,0.14),
          0 4px 10px rgba(76,49,23,0.1),
          inset 0 0 0 1px rgba(255,255,255,0.82);
        transition:
          transform .22s ease,
          box-shadow .22s ease,
          filter .22s ease;
      }

      .ww-answer-card:hover{
        transform:translateY(-4px);
        filter:brightness(1.025);
        box-shadow:
          0 23px 48px rgba(76,49,23,0.2),
          0 7px 15px rgba(76,49,23,0.13),
          inset 0 0 0 1px rgba(255,255,255,0.9);
      }

      .ww-thumb{
        width:100%;
        aspect-ratio:1.45 / .86;
        overflow:hidden;
        border-radius:.72rem;
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
        padding-top:.62rem;
      }

      .ww-card-number{
        font-size:.82rem;
        font-weight:1000;
        letter-spacing:.2em;
        color:#8c682f;
      }

      .ww-card-date{
        margin-top:.22rem;
        font-size:.62rem;
        font-weight:800;
        letter-spacing:.08em;
        text-transform:uppercase;
        color:#7d6a54;
      }

      .ww-footer{
        display:flex;
        justify-content:center;
        align-items:center;
        gap:1rem;
        margin-top:1.35rem;
      }

      .ww-footer-logo{
        width:7.8rem;
        display:block;
      }

      .ww-footer-button{
        border:0;
        cursor:pointer;
        border-radius:999px;
        padding:.72rem 1.15rem;
        background:
          linear-gradient(180deg, rgba(255,255,255,0.32), rgba(255,255,255,0.05)),
          linear-gradient(145deg, var(--ww-gold), var(--ww-gold-dark));
        color:#fffaf2;
        font:950 .68rem/1 system-ui,-apple-system,"Segoe UI",sans-serif;
        letter-spacing:.18em;
        text-transform:uppercase;
        box-shadow:
          0 12px 26px rgba(80,52,24,0.22),
          inset 0 1px 0 rgba(255,255,255,0.34),
          inset 0 0 0 1px rgba(255,255,255,0.2);
        transition:transform .2s ease, filter .2s ease, box-shadow .2s ease;
      }

      .ww-footer-button:hover{
        transform:translateY(-2px);
        filter:brightness(1.06);
        box-shadow:
          0 16px 32px rgba(80,52,24,0.27),
          inset 0 1px 0 rgba(255,255,255,0.34),
          inset 0 0 0 1px rgba(255,255,255,0.2);
      }

      .ww-word-button{
        border:0;
        cursor:pointer;
        border-radius:999px;
        padding:.72rem 1.15rem;
        background:
          linear-gradient(180deg, rgba(255,255,255,0.92), rgba(248,235,210,0.94));
        color:#6c4d24;
        font:950 .68rem/1 system-ui,-apple-system,"Segoe UI",sans-serif;
        letter-spacing:.16em;
        text-transform:uppercase;
        box-shadow:
          0 12px 26px rgba(80,52,24,0.16),
          inset 0 0 0 1px rgba(181,138,69,0.32);
        transition:transform .2s ease, filter .2s ease, box-shadow .2s ease;
      }

      .ww-word-button:hover{
        transform:translateY(-2px);
        filter:brightness(1.04);
        box-shadow:
          0 16px 32px rgba(80,52,24,0.21),
          inset 0 0 0 1px rgba(181,138,69,0.42);
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
        width:min(34rem, 92vw);
        padding:2.35rem 2rem;
        border-radius:1.6rem;
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
        font-size:.64rem;
        font-weight:900;
        letter-spacing:.28em;
        text-transform:uppercase;
        color:#8f6a33;
      }

      .ww-modal-word{
        margin-top:.75rem;
        font-size:clamp(1.8rem,5vw,2.75rem);
        font-weight:1000;
        letter-spacing:.14em;
        text-transform:uppercase;
        color:#332417;
      }

      @media (max-width:980px){
        .ww-answer-page{
          padding:1.6rem 1.4rem 1.2rem;
        }

        .ww-grid{
          grid-template-columns:repeat(3, minmax(0, 1fr));
        }

        .ww-season{
          letter-spacing:.42em;
          padding-left:.42em;
        }
      }

      @media (max-width:720px){
        .ww-grid{
          grid-template-columns:repeat(2, minmax(0, 1fr));
        }

        .ww-footer{
          flex-wrap:wrap;
        }

        .ww-footer-logo{
          width:6.8rem;
        }
      }

      @media (max-width:480px){
        .ww-answer-page{
          padding:1.2rem .8rem 1rem;
        }

        .ww-grid{
          grid-template-columns:1fr;
          gap:.8rem;
        }

        .ww-title{
          font-size:2.35rem;
        }

        .ww-season{
          letter-spacing:.26em;
          padding-left:.26em;
        }

        .ww-subtitle{
          font-size:.82rem;
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
          <button class="ww-footer-button" type="button" data-nav="base-station">
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
