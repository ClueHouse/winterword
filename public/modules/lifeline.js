export function renderLifelinePage(app, data, navigate) {
  const {
    lifelineImage = "/assets/winterword/shared/lifelinebg.png",
    orgName = "WinterWord"
  } = data;

  const subject = encodeURIComponent(`WinterWord Lifeline — ${orgName}`);

  const body = encodeURIComponent(
`Curator,

The frost is thick on this one.
Help me break through.

Clue number:
My question:

-
I understand I will receive only one reply:
Yes, No, Warm, or Cold.`
  );

  const mailto = `mailto:ask@cluehouse.co.nz?subject=${subject}&body=${body}`;

  app.innerHTML = `
    <section id="wwPage">
      <div id="wwShell">
        <div id="wwContent">

          <aside class="ww-side">
            <button class="ww-side-logo" type="button" aria-label="Return to Base Station">
              <img src="/assets/winterword/shared/logo.png" alt="WinterWord">
              <div class="ww-divider"></div>
              <div class="ww-side-label">BASE STATION</div>
            </button>
          </aside>

          <main class="ww-main">
            <section class="ww-lifeline" aria-label="WinterWord Lifeline">

              <div class="ww-lifeline-media"></div>
              <div class="ww-lifeline-glow"></div>

              <div class="ww-lifeline-inner">
                <div class="ww-lifeline-left"></div>

                <div class="ww-lifeline-right">
                  <div class="ww-lifeline-copy">

                    <div class="ww-lifeline-kicker">LIFELINE OPEN</div>
                    <h1>The Thin Line</h1>

                    <p>The line between knowing and not-knowing is thin.<br>
                    Sometimes it hums.<br>
                    Sometimes it mocks.<br>
                    And sometimes — just once —<br>
                    you are allowed to speak across it.</p>

                    <p>You may ask <strong>one question</strong> to help you solve any clue.<br>
                    Just one.</p>

                    <p>Your question must be clear. Direct. Unriddled.<br>
                    In return, you will hear only one of four replies:</p>

                    <div class="ww-answer-row">
                      <span>Yes</span>
                      <span>No</span>
                      <span>Warm</span>
                      <span>Cold</span>
                    </div>

                    <p>The answer may save you.<br>
                    It may not.<br>
                    Use it early, or save it for the coldest hour.</p>

                    <p class="ww-final-line">But once it is gone… it is gone.</p>

                    <a class="ww-lifeline-email" href="${mailto}">
                      Ask your question
                    </a>

                  </div>
                </div>
              </div>

            </section>
          </main>

        </div>
      </div>
    </section>
  `;

  injectLifelineStyles(lifelineImage);

  const backButton = app.querySelector(".ww-side-logo");

  if (backButton) {
    backButton.addEventListener("click", () => {
      navigate("base-station");
    });
  }
}

function injectLifelineStyles(lifelineImage) {
  let style = document.getElementById("ww-lifeline-styles");

  if (!style) {
    style = document.createElement("style");
    style.id = "ww-lifeline-styles";
    document.head.appendChild(style);
  }

  style.textContent = `
    :root{
      --ww-cream:#fff8e8;
      --ww-soft:#f8ead0;
      --ww-gold:#f5b75c;
      --ww-amber:#ff9f32;
      --ww-bronze:#8b5a25;
      --ww-dark:#100b05;
      --ww-ink:#fffaf0;
    }

    *{box-sizing:border-box;}
    html,body{margin:0;padding:0;}

    body{
      margin:0;
      font-family:Georgia,"Times New Roman",serif;
      color:var(--ww-ink);
      background-image:url("${lifelineImage}");
      background-size:cover;
      background-position:center;
      background-repeat:no-repeat;
      background-attachment:fixed;
    }

    body::before{
      content:"";
      position:fixed;
      inset:0;
      z-index:0;
      background:
        radial-gradient(circle at 68% 46%, rgba(255,178,82,.24), transparent 27%),
        radial-gradient(circle at 50% 50%, rgba(255,248,225,.16), transparent 42%),
        linear-gradient(135deg, rgba(18,10,3,.42), rgba(7,5,3,.76));
      pointer-events:none;
    }

    #wwPage{
      position:relative;
      z-index:1;
      min-height:100vh;
      padding:2rem;
    }

    #wwShell{
      max-width:82rem;
      margin:0 auto;
      min-height:calc(100vh - 4rem);
      border-radius:1.75rem;
      overflow:hidden;
      background:rgba(18,12,6,.52);
      backdrop-filter:blur(5px);
      box-shadow:
        0 34px 90px rgba(0,0,0,.52),
        0 0 70px rgba(255,164,65,.12),
        inset 0 0 0 1px rgba(255,232,188,.13);
    }

    #wwContent{
      min-height:calc(100vh - 4rem);
      padding:2.25rem;
      display:grid;
      grid-template-columns:7.1rem minmax(0,1fr);
      gap:2rem;
    }

    .ww-side{
      display:flex;
      align-items:center;
      justify-content:center;
      border-radius:1.3rem;
      background:
        linear-gradient(180deg, rgba(255,236,190,.08), rgba(0,0,0,.38)),
        rgba(5,3,1,.48);
      box-shadow:inset 0 0 0 1px rgba(255,235,198,.08);
    }

    .ww-side-logo{
      display:flex;
      flex-direction:column;
      align-items:center;
      gap:.82rem;
      background:transparent;
      border:0;
      cursor:pointer;
      padding:0;
    }

    .ww-side-logo img{
      width:9.6rem;
      filter:drop-shadow(0 0 14px rgba(255,255,255,.18));
    }

    .ww-divider{
      width:38px;
      height:1px;
      background:rgba(255,232,188,.28);
    }

    .ww-side-label{
      font-family:system-ui,-apple-system,"Segoe UI",sans-serif;
      font-size:.7rem;
      letter-spacing:.25em;
      text-transform:uppercase;
      font-weight:900;
      color:#fff8e8;
      text-shadow:0 2px 12px rgba(0,0,0,.7);
    }

    .ww-main{display:flex;}

    .ww-lifeline{
      position:relative;
      width:100%;
      border-radius:1.45rem;
      overflow:hidden;
      box-shadow:
        inset 0 0 0 1px rgba(255,232,188,.18),
        inset 0 0 70px rgba(255,198,105,.1);
    }

    .ww-lifeline-media{
      position:absolute;
      inset:0;
      background-image:url("${lifelineImage}");
      background-size:cover;
      background-position:center;
      filter:brightness(.94) saturate(1.18) contrast(1.04);
      transform:scale(1.01);
    }

    .ww-lifeline-glow{
      position:absolute;
      inset:0;
      background:
        radial-gradient(circle at 69% 48%, rgba(255,224,155,.42), transparent 24%),
        radial-gradient(circle at 71% 62%, rgba(255,145,38,.22), transparent 30%),
        linear-gradient(90deg, rgba(23,12,3,.28), rgba(83,50,15,.14), rgba(255,238,190,.1));
      pointer-events:none;
    }

    .ww-lifeline-inner{
      position:relative;
      z-index:1;
      min-height:calc(100vh - 8.5rem);
      display:grid;
      grid-template-columns:minmax(15rem,31%) minmax(0,1fr);
    }

    .ww-lifeline-right{
      display:flex;
      align-items:center;
      justify-content:center;
      padding:3.2rem;
    }

    .ww-lifeline-copy{
      max-width:40rem;
      padding:2.4rem 2.65rem;
      text-align:center;
      color:#fffaf0;
      line-height:1.82;
      font-size:1.08rem;
      border-radius:1.4rem;
      background:
        radial-gradient(circle at 50% 0%, rgba(255,238,190,.18), transparent 38%),
        linear-gradient(180deg, rgba(64,36,10,.46), rgba(18,10,3,.32));
      box-shadow:
        0 24px 70px rgba(0,0,0,.28),
        inset 0 0 0 1px rgba(255,232,188,.18);
      text-shadow:0 2px 10px rgba(0,0,0,.52);
    }

    .ww-lifeline-kicker{
      font-family:system-ui,-apple-system,"Segoe UI",sans-serif;
      font-size:.73rem;
      font-weight:900;
      letter-spacing:.25em;
      color:var(--ww-gold);
      text-transform:uppercase;
      margin-bottom:.7rem;
    }

    .ww-lifeline-copy h1{
      margin:0 0 1.35rem;
      font-size:clamp(2.2rem,4vw,4rem);
      line-height:.95;
      font-weight:700;
      color:#fff4d6;
      text-shadow:
        0 3px 18px rgba(0,0,0,.68),
        0 0 34px rgba(255,156,55,.2);
    }

    .ww-lifeline-copy p{
      margin:0 0 1.18rem;
    }

    .ww-lifeline-copy strong{
      color:#ffd48a;
      font-weight:800;
    }

    .ww-answer-row{
      display:flex;
      justify-content:center;
      flex-wrap:wrap;
      gap:.65rem;
      margin:.25rem 0 1.35rem;
    }

    .ww-answer-row span{
      min-width:4.8rem;
      padding:.45rem .9rem;
      border-radius:999px;
      font-family:system-ui,-apple-system,"Segoe UI",sans-serif;
      font-size:.82rem;
      font-weight:900;
      letter-spacing:.08em;
      text-transform:uppercase;
      color:#281403;
      background:linear-gradient(180deg, #ffe4a8, #f4a43f);
      box-shadow:
        0 7px 20px rgba(0,0,0,.22),
        inset 0 1px 0 rgba(255,255,255,.5);
    }

    .ww-final-line{
      color:#ffe5af;
      font-weight:700;
    }

    .ww-lifeline-email{
      display:inline-flex;
      align-items:center;
      justify-content:center;
      margin-top:.35rem;
      padding:.86rem 1.45rem;
      border-radius:999px;
      font-family:system-ui,-apple-system,"Segoe UI",sans-serif;
      color:#1b0d02;
      background:
        linear-gradient(180deg, #fff0c4, #ffae3f 56%, #d87918);
      text-decoration:none;
      font-weight:950;
      letter-spacing:.08em;
      text-transform:uppercase;
      box-shadow:
        0 14px 32px rgba(0,0,0,.32),
        0 0 34px rgba(255,157,48,.28),
        inset 0 1px 0 rgba(255,255,255,.65);
      transition:
        transform .18s ease,
        filter .18s ease,
        box-shadow .18s ease;
    }

    .ww-lifeline-email:hover{
      transform:translateY(-2px) scale(1.035);
      filter:brightness(1.08);
      box-shadow:
        0 18px 40px rgba(0,0,0,.36),
        0 0 46px rgba(255,176,70,.45),
        inset 0 1px 0 rgba(255,255,255,.7);
    }

    @media (max-width: 820px){
      #wwPage{padding:1rem;}

      #wwShell{
        min-height:calc(100vh - 2rem);
        border-radius:1.25rem;
      }

      #wwContent{
        min-height:calc(100vh - 2rem);
        grid-template-columns:1fr;
        padding:1rem;
      }

      .ww-side{
        min-height:6rem;
      }

      .ww-side-logo img{
        width:7.6rem;
      }

      .ww-lifeline-inner{
        grid-template-columns:1fr;
      }

      .ww-lifeline-left{
        display:none;
      }

      .ww-lifeline-right{
        padding:1.2rem;
      }

      .ww-lifeline-copy{
        padding:1.7rem 1.25rem;
        font-size:1rem;
      }
    }
  `;
}
