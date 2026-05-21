export function renderAnswerList(app, data = {}, navigate) {
  const orgName = data.orgName || data.org_name || "WinterWord";
  const finalWord = data.final_word || data.finalWord || "HOUSEWARMING";

  const answers = Array.from({ length: 12 }, (_, index) => {
    const num = String(index + 1).padStart(2, "0");
    const ext = index + 1 === 12 ? "gif" : "png";

    return {
      id: num,
      label: `${num} · Revealed`,
      image: `/assets/winterword/display/${num}.${ext}`,
      path: `/answers/${num}`
    };
  });

  app.innerHTML = `
    <style>
      :root{
        --ww-ink:#2f241b;
        --ww-soft:#6f5b47;
        --ww-cream:#fff8ed;
        --ww-paper:#fffdf6;
        --ww-brass:#b58a45;
        --ww-sage:#6f8061;
        --ww-shadow:rgba(72,48,24,0.22);
      }

      *{box-sizing:border-box;}

      .ww-answer-list{
        min-height:100vh;
        margin:0;
        font-family:system-ui,-apple-system,"Segoe UI",sans-serif;
        color:var(--ww-ink);
        background:
          radial-gradient(circle at 18% 12%, rgba(255,255,255,0.95), transparent 24%),
          radial-gradient(circle at 83% 8%, rgba(255,226,162,0.35), transparent 26%),
          radial-gradient(circle at 70% 82%, rgba(168,190,137,0.18), transparent 30%),
          linear-gradient(135deg,#fff8ec 0%, #f3e4cc 42%, #dfcaa9 100%);
        padding:2rem;
        overflow-x:hidden;
      }

      .ww-answer-list::before{
        content:"";
        position:fixed;
        inset:0;
        pointer-events:none;
        background:
          linear-gradient(90deg, rgba(255,255,255,0.28), transparent 18%, transparent 78%, rgba(119,84,42,0.08)),
          repeating-linear-gradient(
            0deg,
            rgba(96,64,32,0.025) 0px,
            rgba(96,64,32,0.025) 1px,
            transparent 1px,
            transparent 5px
          );
        mix-blend-mode:multiply;
      }

      .ww-answer-shell{
        position:relative;
        max-width:88rem;
        margin:0 auto;
        min-height:calc(100vh - 4rem);
        border-radius:2rem;
        overflow:hidden;
        background:
          linear-gradient(180deg, rgba(255,255,255,0.64), rgba(255,248,235,0.45));
        box-shadow:
          0 30px 90px rgba(91,61,28,0.24),
          inset 0 0 0 1px rgba(255,255,255,0.76);
        backdrop-filter:blur(10px);
      }

      .ww-answer-content{
        position:relative;
        min-height:calc(100vh - 4rem);
        padding:2.35rem 2.4rem;
        display:grid;
        grid-template-columns:7rem minmax(0,1fr);
        gap:2.1rem;
      }

      .ww-side{
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        gap:2.4rem;
        padding:.8rem 0;
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
        width:9.8rem;
        max-width:none;
        display:block;
        background:transparent !important;
        box-shadow:none !important;
        border:none !important;
      }

      .ww-divider{
        width:42px;
        height:1px;
        background:rgba(83,58,33,0.28);
      }

      .ww-side-label{
        font-size:.68rem;
        letter-spacing:.2em;
        text-transform:uppercase;
        font-weight:900;
        color:#5f4a34;
        text-align:center;
      }

      .ww-word-btn{
        position:relative;
        width:10.3rem;
        padding:1rem .85rem 1.04rem;
        border:none;
        border-radius:999px;
        cursor:pointer;
        text-align:center;
        color:#fffdf7;
        font:900 .66rem/1.22 system-ui,-apple-system,"Segoe UI",sans-serif;
        letter-spacing:.15em;
        text-transform:uppercase;
        background:
          linear-gradient(180deg, rgba(255,255,255,0.26), rgba(255,255,255,0.04)),
          linear-gradient(145deg, #b68b45, #7d5b2f);
        box-shadow:
          0 16px 32px rgba(91,61,28,0.28),
          inset 0 1px 0 rgba(255,255,255,0.32),
          inset 0 0 0 1px rgba(255,255,255,0.2);
        transition:transform .22s ease, box-shadow .22s ease, filter .22s ease;
        overflow:hidden;
        margin-top:.5rem;
      }

      .ww-word-btn::before{
        content:"";
        position:absolute;
        inset:0;
        background:
          linear-gradient(115deg,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0.12) 32%,
            rgba(255,255,255,0.34) 48%,
            rgba(255,255,255,0.08) 64%,
            rgba(255,255,255,0) 100%);
        transform:translateX(-120%) skewX(-18deg);
        pointer-events:none;
      }

      .ww-word-btn:hover{
        transform:translateY(-2px);
        filter:brightness(1.06);
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

      .ww-gallery{
        width:100%;
        border-radius:1.7rem;
        position:relative;
        overflow:hidden;
        background:
          radial-gradient(circle at 20% 0%, rgba(255,255,255,0.86), transparent 30%),
          linear-gradient(180deg, rgba(255,255,255,0.48), rgba(255,248,235,0.2));
        box-shadow:
          inset 0 0 0 1px rgba(255,255,255,0.65);
      }

      .ww-gallery::before{
        content:"";
        position:absolute;
        inset:0;
        pointer-events:none;
        background:
          radial-gradient(circle at 10% 20%, rgba(181,138,69,0.1), transparent 28%),
          radial-gradient(circle at 90% 80%, rgba(111,128,97,0.12), transparent 32%);
      }

      .ww-gallery-inner{
        position:relative;
        z-index:1;
        padding:2.8rem 2.5rem 3rem;
      }

      .ww-head{
        text-align:center;
        max-width:52rem;
        margin:0 auto 2.3rem;
      }

      .ww-title{
        margin:0 0 .65rem;
        font-weight:1000;
        letter-spacing:.22em;
        text-transform:uppercase;
        font-size:clamp(1.55rem,2.3vw,2.45rem);
        color:#3c2b1c;
      }

      .ww-status{
        font-size:.74rem;
        letter-spacing:.22em;
        text-transform:uppercase;
        margin-bottom:.85rem;
        color:#8b6a35;
        font-weight:900;
      }

      .ww-intro{
        font-size:.98rem;
        color:var(--ww-soft);
        line-height:1.6;
      }

      .ww-grid{
        display:grid;
        grid-template-columns:repeat(4, minmax(0, 1fr));
        grid-auto-flow:dense;
        gap:1.25rem;
        align-items:start;
      }

      .ww-card{
        position:relative;
        border:0;
        cursor:pointer;
        padding:.58rem .58rem .82rem;
        border-radius:1rem;
        background:
          linear-gradient(180deg, #fffef9, #f8eddc);
        box-shadow:
          0 18px 36px rgba(91,61,28,0.18),
          0 5px 12px rgba(91,61,28,0.12),
          inset 0 0 0 1px rgba(255,255,255,0.82);
        transform:rotate(var(--tilt, 0deg));
        transition:
          transform .24s ease,
          box-shadow .24s ease,
          filter .24s ease;
      }

      .ww-card:nth-child(1){ --tilt:-1.6deg; grid-column:span 2; }
      .ww-card:nth-child(2){ --tilt:1.2deg; }
      .ww-card:nth-child(3){ --tilt:-.8deg; }
      .ww-card:nth-child(4){ --tilt:1.5deg; }
      .ww-card:nth-child(5){ --tilt:-1.1deg; }
      .ww-card:nth-child(6){ --tilt:.7deg; grid-column:span 2; }
      .ww-card:nth-child(7){ --tilt:1.4deg; }
      .ww-card:nth-child(8){ --tilt:-1.4deg; }
      .ww-card:nth-child(9){ --tilt:.9deg; grid-column:span 2; }
      .ww-card:nth-child(10){ --tilt:-.7deg; }
      .ww-card:nth-child(11){ --tilt:1.1deg; }
      .ww-card:nth-child(12){ --tilt:-1.2deg; grid-column:span 2; }

      .ww-card::before{
        content:"";
        position:absolute;
        left:50%;
        top:-.56rem;
        width:3.2rem;
        height:1.1rem;
        border-radius:.16rem;
        background:rgba(216,195,154,0.58);
        box-shadow:0 2px 8px rgba(91,61,28,0.13);
        transform:translateX(-50%) rotate(calc(var(--tilt, 0deg) * -1));
        z-index:3;
      }

      .ww-card:hover{
        transform:translateY(-6px) rotate(0deg);
        box-shadow:
          0 26px 54px rgba(91,61,28,0.25),
          0 8px 16px rgba(91,61,28,0.16),
          inset 0 0 0 1px rgba(255,255,255,0.9);
        filter:brightness(1.025);
        z-index:5;
      }

      .ww-thumb{
        width:100%;
        aspect-ratio:1.32 / .86;
        overflow:hidden;
        border-radius:.72rem;
        background:#eadfcf;
        box-shadow:inset 0 0 0 1px rgba(90,61,35,0.1);
      }

      .ww-card:nth-child(1) .ww-thumb,
      .ww-card:nth-child(6) .ww-thumb,
      .ww-card:nth-child(9) .ww-thumb,
      .ww-card:nth-child(12) .ww-thumb{
        aspect-ratio:1.78 / .92;
      }

      .ww-thumb img{
        width:100%;
        height:100%;
        object-fit:cover;
        display:block;
      }

      .ww-meta{
        padding:.72rem .45rem 0;
        font-size:.72rem;
        letter-spacing:.18em;
        text-transform:uppercase;
        text-align:center;
        color:#715436;
        font-weight:950;
      }

      .ww-modal{
        position:fixed;
        inset:0;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:1.5rem;
        background:rgba(61,42,24,0.36);
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
        padding:2.35rem 2rem;
        border-radius:1.7rem;
        text-align:center;
        background:
          radial-gradient(circle at 25% 0%, rgba(255,255,255,0.9), transparent 35%),
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

      @media (max-width:1100px){
        .ww-grid{grid-template-columns:repeat(3,1fr);}
        .ww-card:nth-child(1),
        .ww-card:nth-child(6),
        .ww-card:nth-child(9),
        .ww-card:nth-child(12){
          grid-column:span 1;
        }

        .ww-card:nth-child(1) .ww-thumb,
        .ww-card:nth-child(6) .ww-thumb,
        .ww-card:nth-child(9) .ww-thumb,
        .ww-card:nth-child(12) .ww-thumb{
          aspect-ratio:1.32 / .86;
        }
      }

      @media (max-width:820px){
        .ww-answer-content{
          grid-template-columns:1fr;
          gap:1.4rem;
        }

        .ww-side{
          flex-direction:row;
          justify-content:space-between;
          gap:1rem;
        }

        .ww-side-logo img{
          width:7.7rem;
        }

        .ww-word-btn{
          width:9.3rem;
        }

        .ww-grid{
          grid-template-columns:repeat(2,1fr);
        }
      }

      @media (max-width:560px){
        .ww-answer-list{
          padding:1rem;
        }

        .ww-answer-content{
          padding:1.1rem;
        }

        .ww-gallery-inner{
          padding:2rem 1.1rem;
        }

        .ww-grid{
          grid-template-columns:1fr;
        }

        .ww-side{
          flex-direction:column;
        }
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
            <div class="ww-gallery">
              <div class="ww-gallery-inner">

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
