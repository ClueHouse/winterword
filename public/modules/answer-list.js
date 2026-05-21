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
          radial-gradient(circle at 83% 8%, rgba(255,226,162,0.32), transparent 26%),
          radial-gradient(circle at 70% 82%, rgba(168,190,137,0.16), transparent 30%),
          linear-gradient(135deg,#fff8ec 0%, #f3e4cc 42%, #dfcaa9 100%);
        padding:1rem;
        overflow-x:hidden;
      }

      .ww-answer-list::before{
        content:"";
        position:fixed;
        inset:0;
        pointer-events:none;
        background:
          linear-gradient(90deg, rgba(255,255,255,0.24), transparent 18%, transparent 78%, rgba(119,84,42,0.07)),
          repeating-linear-gradient(
            0deg,
            rgba(96,64,32,0.022) 0px,
            rgba(96,64,32,0.022) 1px,
            transparent 1px,
            transparent 5px
          );
        mix-blend-mode:multiply;
      }

      .ww-answer-shell{
        position:relative;
        max-width:78rem;
        margin:0 auto;
        min-height:calc(100vh - 2rem);
        border-radius:1.55rem;
        overflow:hidden;
        background:
          linear-gradient(180deg, rgba(255,255,255,0.64), rgba(255,248,235,0.42));
        box-shadow:
          0 22px 70px rgba(91,61,28,0.22),
          inset 0 0 0 1px rgba(255,255,255,0.76);
        backdrop-filter:blur(10px);
      }

      .ww-answer-content{
        position:relative;
        min-height:calc(100vh - 2rem);
        padding:1.45rem 1.55rem;
        display:grid;
        grid-template-columns:6rem minmax(0,1fr);
        gap:1.35rem;
      }

      .ww-side{
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        gap:1.8rem;
        padding:.5rem 0;
      }

      .ww-side-logo{
        display:flex;
        flex-direction:column;
        align-items:center;
        gap:.7rem;
        text-decoration:none;
        cursor:pointer;
        background:none;
        border:none;
        padding:0;
      }

      .ww-side-logo img{
        width:7.6rem;
        max-width:none;
        display:block;
        background:transparent !important;
        box-shadow:none !important;
        border:none !important;
      }

      .ww-divider{
        width:34px;
        height:1px;
        background:rgba(83,58,33,0.28);
      }

      .ww-side-label{
        font-size:.62rem;
        letter-spacing:.19em;
        text-transform:uppercase;
        font-weight:900;
        color:#5f4a34;
        text-align:center;
      }

      .ww-word-btn{
        position:relative;
        width:8.7rem;
        padding:.82rem .7rem .86rem;
        border:none;
        border-radius:999px;
        cursor:pointer;
        text-align:center;
        color:#fffdf7;
        font:900 .58rem/1.22 system-ui,-apple-system,"Segoe UI",sans-serif;
        letter-spacing:.14em;
        text-transform:uppercase;
        background:
          linear-gradient(180deg, rgba(255,255,255,0.26), rgba(255,255,255,0.04)),
          linear-gradient(145deg, #b68b45, #7d5b2f);
        box-shadow:
          0 12px 24px rgba(91,61,28,0.24),
          inset 0 1px 0 rgba(255,255,255,0.32),
          inset 0 0 0 1px rgba(255,255,255,0.2);
        transition:transform .22s ease, box-shadow .22s ease, filter .22s ease;
        overflow:hidden;
        margin-top:.2rem;
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
        margin-top:.14rem;
      }

      .ww-main{
        display:flex;
        min-width:0;
      }

      .ww-gallery{
        width:100%;
        border-radius:1.35rem;
        position:relative;
        overflow:hidden;
        background:
          radial-gradient(circle at 20% 0%, rgba(255,255,255,0.82), transparent 30%),
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
          radial-gradient(circle at 10% 20%, rgba(181,138,69,0.09), transparent 28%),
          radial-gradient(circle at 90% 80%, rgba(111,128,97,0.1), transparent 32%);
      }

      .ww-gallery-inner{
        position:relative;
        z-index:1;
        padding:1.95rem 1.85rem 2.15rem;
      }

      .ww-head{
        text-align:center;
        max-width:48rem;
        margin:0 auto 1.55rem;
      }

      .ww-title{
        margin:0 0 .48rem;
        font-weight:1000;
        letter-spacing:.22em;
        text-transform:uppercase;
        font-size:clamp(1.35rem,1.85vw,2.05rem);
        color:#3c2b1c;
      }

      .ww-status{
        font-size:.64rem;
        letter-spacing:.2em;
        text-transform:uppercase;
        margin-bottom:.62rem;
        color:#8b6a35;
        font-weight:900;
      }

      .ww-intro{
        font-size:.86rem;
        color:var(--ww-soft);
        line-height:1.5;
      }

      .ww-grid{
        display:grid;
        grid-template-columns:repeat(4, minmax(0, 1fr));
        grid-auto-flow:dense;
        gap:.85rem;
        align-items:start;
      }

      .ww-card{
        position:relative;
        border:0;
        cursor:pointer;
        padding:.42rem .42rem .58rem;
        border-radius:.78rem;
        background:
          linear-gradient(180deg, #fffef9, #f8eddc);
        box-shadow:
          0 12px 24px rgba(91,61,28,0.15),
          0 4px 9px rgba(91,61,28,0.1),
          inset 0 0 0 1px rgba(255,255,255,0.82);
        transform:rotate(var(--tilt, 0deg));
        transition:
          transform .24s ease,
          box-shadow .24s ease,
          filter .24s ease;
      }

      .ww-card:nth-child(1){ --tilt:-1.2deg; grid-column:span 2; }
      .ww-card:nth-child(2){ --tilt:1deg; }
      .ww-card:nth-child(3){ --tilt:-.7deg; }
      .ww-card:nth-child(4){ --tilt:1.1deg; }
      .ww-card:nth-child(5){ --tilt:-.8deg; }
      .ww-card:nth-child(6){ --tilt:.6deg; grid-column:span 2; }
      .ww-card:nth-child(7){ --tilt:1deg; }
      .ww-card:nth-child(8){ --tilt:-1deg; }
      .ww-card:nth-child(9){ --tilt:.7deg; grid-column:span 2; }
      .ww-card:nth-child(10){ --tilt:-.6deg; }
      .ww-card:nth-child(11){ --tilt:.9deg; }
      .ww-card:nth-child(12){ --tilt:-.9deg; grid-column:span 2; }

      .ww-card::before{
        content:"";
        position:absolute;
        left:50%;
        top:-.38rem;
        width:2.5rem;
        height:.78rem;
        border-radius:.14rem;
        background:rgba(216,195,154,0.58);
        box-shadow:0 2px 7px rgba(91,61,28,0.12);
        transform:translateX(-50%) rotate(calc(var(--tilt, 0deg) * -1));
        z-index:3;
      }

      .ww-card:hover{
        transform:translateY(-4px) rotate(0deg);
        box-shadow:
          0 20px 42px rgba(91,61,28,0.22),
          0 6px 13px rgba(91,61,28,0.14),
          inset 0 0 0 1px rgba(255,255,255,0.9);
        filter:brightness(1.025);
        z-index:5;
      }

      .ww-thumb{
        width:100%;
        aspect-ratio:1.34 / .78;
        overflow:hidden;
        border-radius:.56rem;
        background:#eadfcf;
        box-shadow:inset 0 0 0 1px rgba(90,61,35,0.1);
      }

      .ww-card:nth-child(1) .ww-thumb,
      .ww-card:nth-child(6) .ww-thumb,
      .ww-card:nth-child(9) .ww-thumb,
      .ww-card:nth-child(12) .ww-thumb{
        aspect-ratio:1.72 / .78;
      }

      .ww-thumb img{
        width:100%;
        height:100%;
        object-fit:cover;
        display:block;
      }

      .ww-meta{
        padding:.52rem .35rem 0;
        font-size:.61rem;
        letter-spacing:.17em;
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
        width:min(32rem, 92vw);
        padding:2.1rem 1.8rem;
        border-radius:1.5rem;
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

      @media (max-width:1100px){
        .ww-answer-shell{
          max-width:70rem;
        }

        .ww-grid{
          grid-template-columns:repeat(3,1fr);
        }

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
          aspect-ratio:1.34 / .78;
        }
      }

      @media (max-width:820px){
        .ww-answer-content{
          grid-template-columns:1fr;
          gap:1rem;
        }

        .ww-side{
          flex-direction:row;
          justify-content:space-between;
          gap:1rem;
        }

        .ww-side-logo img{
          width:6.6rem;
        }

        .ww-word-btn{
          width:8.4rem;
        }

        .ww-grid{
          grid-template-columns:repeat(2,1fr);
        }
      }

      @media (max-width:560px){
        .ww-answer-list{
          padding:.7rem;
        }

        .ww-answer-content{
          padding:.85rem;
        }

        .ww-gallery-inner{
          padding:1.65rem .9rem;
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
