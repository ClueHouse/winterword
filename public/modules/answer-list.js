export function renderAnswerList(app, data = {}, navigate) {
  const orgName = data.orgName || data.org_name || "WinterWord";
  const finalWord = data.final_word || data.finalWord || "HOUSEWARMING";

  const answers = Array.from({ length: 12 }, (_, index) => {
    const num = String(index + 1).padStart(2, "0");
    const ext = index + 1 === 12 ? "gif" : "png";

    return {
      id: num,
      label: `Answer ${index + 1}`,
      image: `/assets/winterword/display/${num}.${ext}`,
      path: `/answers/${num}`
    };
  });

  app.innerHTML = `
    <style>
      :root{
        --ww-ink:#f6eee9;
        --ww-muted:rgba(246,238,233,0.74);
      }

      *{box-sizing:border-box;}

      .ww-answer-list{
        min-height:100vh;
        margin:0;
        font-family:system-ui,-apple-system,"Segoe UI",sans-serif;
        color:var(--ww-ink);
        background:
          radial-gradient(ellipse at center, rgba(0,0,0,0.18), rgba(0,0,0,0.78)),
          linear-gradient(135deg,#220408 0%, #390911 34%, #53101a 66%, #240409 100%);
        padding:2rem;
      }

      .ww-answer-shell{
        max-width:82rem;
        margin:0 auto;
        min-height:calc(100vh - 4rem);
        border-radius:1.75rem;
        overflow:hidden;
        background:rgba(0,0,0,0.48);
        backdrop-filter:blur(6px);
        box-shadow:
          0 30px 80px rgba(0,0,0,0.58),
          inset 0 0 0 1px rgba(255,255,255,0.05);
      }

      .ww-answer-content{
        min-height:calc(100vh - 4rem);
        padding:2.35rem 2.4rem;
        display:grid;
        grid-template-columns:6.4rem minmax(0,1fr);
        gap:2rem;
      }

      .ww-side{
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        gap:3rem;
      }

      .ww-side-logo{
        display:flex;
        flex-direction:column;
        align-items:center;
        gap:.8rem;
        text-decoration:none;
        cursor:pointer;
        background:none;
        border:none;
        padding:0;
      }

      .ww-side-logo img{
        width:9.6rem;
        max-width:none;
        display:block;
        background:transparent !important;
        mix-blend-mode:normal;
        box-shadow:none !important;
        border:none !important;
        outline:none !important;
        filter:drop-shadow(0 0 0 transparent);
      }

      .ww-divider{
        width:36px;
        height:1px;
        background:rgba(255,255,255,0.18);
      }

      .ww-side-label{
        font-size:.72rem;
        letter-spacing:.22em;
        text-transform:uppercase;
        font-weight:900;
        color:#ffffff;
        text-align:center;
        text-shadow:
          0 1px 2px rgba(0,0,0,0.75),
          0 0 4px rgba(255,255,255,0.04);
      }

      .ww-word-btn{
        position:relative;
        width:9.8rem;
        padding:1rem .85rem 1.02rem;
        border:none;
        border-radius:1rem;
        cursor:pointer;
        text-align:center;
        color:#fff5f4;
        font:900 .66rem/1.2 system-ui,-apple-system,"Segoe UI",sans-serif;
        letter-spacing:.16em;
        text-transform:uppercase;
        background:
          linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.04)),
          linear-gradient(145deg, rgba(164,19,38,0.96), rgba(94,8,19,0.96));
        box-shadow:
          0 12px 26px rgba(0,0,0,0.46),
          0 0 26px rgba(140,26,38,0.18),
          inset 0 1px 0 rgba(255,255,255,0.22),
          inset 0 0 0 1px rgba(255,210,210,0.14);
        backdrop-filter:blur(8px);
        transition:
          transform .22s ease,
          box-shadow .22s ease,
          filter .22s ease;
        overflow:hidden;
        margin-top:1rem;
      }

      .ww-word-btn::before{
        content:"";
        position:absolute;
        inset:0;
        background:
          linear-gradient(115deg,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0.06) 28%,
            rgba(255,255,255,0.18) 45%,
            rgba(255,255,255,0.04) 62%,
            rgba(255,255,255,0) 100%);
        transform:translateX(-120%) skewX(-18deg);
        pointer-events:none;
      }

      .ww-word-btn:hover{
        transform:translateY(-2px);
        filter:brightness(1.05);
      }

      .ww-word-btn:hover::before{
        animation:wwBtnSweep .85s ease forwards;
      }

      @keyframes wwBtnSweep{
        0%{ transform:translateX(-120%) skewX(-18deg); }
        100%{ transform:translateX(170%) skewX(-18deg); }
      }

      .ww-word-btn span{
        display:block;
        position:relative;
        z-index:1;
      }

      .ww-word-btn .ww-word-line + .ww-word-line{
        margin-top:.18rem;
      }

      .ww-main{
        display:flex;
        min-width:0;
      }

      .ww-tile{
        position:relative;
        width:100%;
        border-radius:1.4rem;
        overflow:hidden;
        background:
          linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.01));
        box-shadow:
          inset 0 0 0 1px rgba(255,255,255,0.04);
      }

      .ww-tile-inner{
        padding:2.9rem 2.4rem;
        display:flex;
        flex-direction:column;
        gap:2.35rem;
      }

      .ww-head{
        text-align:center;
        max-width:50rem;
        margin:0 auto;
      }

      .ww-title{
        margin:0 0 .7rem;
        font-weight:1000;
        letter-spacing:.24em;
        text-transform:uppercase;
        font-size:clamp(1.45rem,2vw,2.25rem);
        color:#fff3ec;
      }

      .ww-status{
        font-size:.75rem;
        letter-spacing:.2em;
        text-transform:uppercase;
        margin-bottom:.7rem;
        color:#ffd8cb;
        font-weight:900;
      }

      .ww-intro{
        font-size:.94rem;
        color:var(--ww-muted);
        line-height:1.55;
      }

      .ww-grid{
        display:grid;
        grid-template-columns:repeat(4,1fr);
        gap:1rem;
      }

      .ww-card{
        border-radius:1rem;
        overflow:hidden;
        background:
          linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01));
        position:relative;
        border:1px solid rgba(255,255,255,0.05);
        cursor:pointer;
      }

      .ww-thumb{
        width:100%;
        aspect-ratio:1.4 / .8;
        overflow:hidden;
        background:#000;
      }

      .ww-thumb img{
        width:100%;
        height:100%;
        object-fit:cover;
        display:block;
      }

      .ww-meta{
        padding:.66rem .8rem;
        background:
          linear-gradient(180deg, rgba(16,6,8,0.72), rgba(8,3,4,0.86));
        font-size:.78rem;
        letter-spacing:.18em;
        text-transform:uppercase;
        text-align:center;
        color:#fff2ec;
      }

      .ww-modal{
        position:fixed;
        inset:0;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:1.5rem;
        background:rgba(0,0,0,0.65);
        backdrop-filter:blur(10px);
        opacity:0;
        pointer-events:none;
        transition:opacity .3s ease;
        z-index:9999;
      }

      .ww-modal.is-open{
        opacity:1;
        pointer-events:auto;
      }

      .ww-modal-panel{
        width:min(34rem, 92vw);
        padding:2.25rem 2rem;
        border-radius:1.6rem;
        text-align:center;
        background:
          linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.03)),
          linear-gradient(145deg, rgba(88,12,23,0.98), rgba(38,6,12,0.98));
      }

      .ww-modal-kicker-line{
        display:block;
        font-size:.64rem;
        font-weight:900;
        letter-spacing:.26em;
        text-transform:uppercase;
        color:#ffd4cf;
      }

      .ww-modal-word{
        font-size:clamp(1.7rem,5vw,2.55rem);
        font-weight:1000;
        letter-spacing:.14em;
        text-transform:uppercase;
        color:#fff7f3;
      }

      @media (max-width:1100px){
        .ww-grid{grid-template-columns:repeat(3,1fr);}
      }

      @media (max-width:800px){
        .ww-answer-content{
          grid-template-columns:1fr;
        }

        .ww-grid{grid-template-columns:repeat(2,1fr);}
      }

      @media (max-width:520px){
        .ww-answer-list{padding:1rem;}

        .ww-answer-content{
          padding:1.3rem 1.1rem;
        }

        .ww-grid{grid-template-columns:1fr;}
      }
    </style>

    <main class="ww-answer-list">
      <section class="ww-answer-shell">
        <div class="ww-answer-content">

          <aside class="ww-side">
            <button class="ww-side-logo" type="button" data-nav="base-station" aria-label="Return to Base Station">
              <img src="/assets/winterword/shared/logo.png" alt="${escapeHtml(orgName)}">
              <div class="ww-divider"></div>
              <div class="ww-side-label">BASE STATION</div>
            </button>

            <button class="ww-word-btn" type="button" id="wwWordBtn">
              <span class="ww-word-line">The</span>
              <span class="ww-word-line">Winterword</span>
              <span class="ww-word-line">Is:</span>
            </button>
          </aside>

          <section class="ww-main">
            <div class="ww-tile">
              <div class="ww-tile-inner">

                <header class="ww-head">
                  <h1 class="ww-title">The Answers</h1>
                  <div class="ww-status">WinterWord Complete • All Revealed</div>
                  <div class="ww-intro">
                    The hunt is over. What was hidden may now be viewed in full.
                  </div>
                </header>

                <div class="ww-grid">
                  ${answers.map((answer) => `
                    <button class="ww-card" type="button" data-nav="answer" data-id="${parseInt(answer.id, 10)}">
                      <div class="ww-thumb">
                        <img src="${answer.image}" alt="${escapeHtml(answer.label)}">
                      </div>
                      <div class="ww-meta">${escapeHtml(answer.label)}</div>
                    </button>
                  `).join("")}
                </div>

              </div>
            </div>
          </section>

        </div>
      </section>
    </main>

    <div class="ww-modal" id="wwWordModal" aria-hidden="true">
      <div class="ww-modal-panel">
        <div class="ww-modal-kicker">
          <span class="ww-modal-kicker-line">The</span>
          <span class="ww-modal-kicker-line">Winterword</span>
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
