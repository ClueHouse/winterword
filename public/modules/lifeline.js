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

          <div class="ww-side">
            <button class="ww-side-logo" type="button">
              <img src="/assets/winterword/shared/logo.png" alt="WinterWord">
              <div class="ww-divider"></div>
              <div class="ww-side-label">BASE STATION</div>
            </button>
          </div>

          <div class="ww-main">
            <div class="ww-lifeline">

              <div class="ww-lifeline-media"></div>

              <div class="ww-lifeline-inner">
                <div></div>

                <div class="ww-lifeline-right">
                  <div class="ww-lifeline-copy">

                    <p>The line between knowing and not-knowing is thin.<br>
                    Sometimes it hums.<br>
                    Sometimes it mocks.<br>
                    And sometimes - just once -<br>
                    you're allowed to speak across it.</p>

                    <p>You may ask one question to help you solve any clue.<br>
                    Just one.</p>

                    <p>Your question must be clear. Direct. Unriddled.<br>
                    In return, you'll hear only one of four replies -<br>
                    Yes. No. Warm. Cold.</p>

                    <p>The answer may help you. It may not.<br>
                    Use it early or save it for the coldest hour.<br>
                    But once it's gone... it's gone.</p>

                    <p>
                      <a class="ww-lifeline-email" href="${mailto}">
                        When it is time, click here.
                      </a>
                    </p>

                  </div>
                </div>
              </div>

            </div>
          </div>

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
      --ww-ink:#dce5ec;
    }

    *{box-sizing:border-box;}
    html,body{margin:0;padding:0;}

    body{
      margin:0;
      font-family:system-ui,-apple-system,"Segoe UI",sans-serif;
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
      background:radial-gradient(ellipse at center, rgba(0,0,0,0.16), rgba(0,0,0,0.74));
      pointer-events:none;
    }

    #wwPage{min-height:100vh;padding:2rem;}

    #wwShell{
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

    #wwContent{
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
      gap:1.35rem;
    }

    .ww-side-logo{
      display:flex;
      flex-direction:column;
      align-items:center;
      gap:.8rem;
      background:transparent;
      border:0;
      cursor:pointer;
    }

    .ww-side-logo img{width:9.6rem;}

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
    }

    .ww-main{display:flex;}

    .ww-lifeline{
      position:relative;
      width:100%;
      border-radius:1.4rem;
      overflow:hidden;
    }

    .ww-lifeline-media{
      position:absolute;
      inset:0;
      background-image:url("${lifelineImage}");
      background-size:cover;
      background-position:center;
      filter:brightness(.74);
    }

    .ww-lifeline-inner{
      position:relative;
      z-index:1;
      min-height:calc(100vh - 8.7rem);
      display:grid;
      grid-template-columns:minmax(15rem,29%) minmax(0,1fr);
    }

    .ww-lifeline-right{
      display:flex;
      align-items:center;
      justify-content:center;
      padding:3rem;
    }

    .ww-lifeline-copy{
      max-width:38rem;
      color:#f4f6f8;
      text-align:center;
      line-height:2.05;
      font-size:1.08rem;
    }

    .ww-lifeline-copy p{margin:0 0 1.25rem;}

    /* ✨ PREMIUM LINK */
    .ww-lifeline-email{
      color:#ffffff;
      text-decoration:none;
      font-weight:600;
      letter-spacing:0.05em;
      border-bottom:1px solid rgba(255,255,255,0.4);
      transition:all .2s ease;
    }

    .ww-lifeline-email:hover{
      border-bottom-color:#fff;
      letter-spacing:0.08em;
    }
  `;
}
