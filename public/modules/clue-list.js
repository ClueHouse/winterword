export function renderClueList(app, data = {}, navigate) {
  const currentClue = Number(data.currentClue || 0);
  const totalClues = Number(data.totalClues || 12);

  const clueAssets = [
    "01.png","02.png","03.png","04.png","05.png","06.png",
    "07.png","08.png","09.png","10.png","11.png","12.gif"
  ];

  const clueNames = [
    "one","two","three","four","five","six",
    "seven","eight","nine","ten","eleven","twelve"
  ];

  function numberWord(num) {
    return clueNames[num - 1] || String(num);
  }

  const visibleClues = clueAssets
    .map((file, index) => {
      const clueNum = index + 1;
      return {
        file,
        clueNum,
        padded: String(clueNum).padStart(2, "0"),
        name: clueNames[index]
      };
    })
    .filter((clue) => clue.clueNum <= currentClue)
    .reverse();

  const statusCurrent =
    currentClue <= 0
      ? "NO CLUES ARE LIVE YET"
      : currentClue >= totalClues
        ? `ALL ${numberWord(totalClues).toUpperCase()} CLUES ARE NOW LIVE`
        : currentClue === 1
          ? "ONE CLUE IS NOW LIVE"
          : `${numberWord(currentClue).toUpperCase()} CLUES ARE NOW LIVE`;

  const statusNext =
    currentClue >= totalClues
      ? "SEASON COMPLETE"
      : "NEXT DROP: WEDNESDAY NOON";

  app.innerHTML = `
    <style>
      :root{
        --ww-ink:#dce5ec;
        --ww-bg-1:#070c12;
        --ww-bg-2:#0e1721;
        --ww-bg-3:#152534;
      }

      *{box-sizing:border-box;}

      html,body{
        margin:0;
        padding:0;
      }

      #wwPage{
        min-height:100vh;
        padding:2rem;
        overflow:hidden;
        font-family:system-ui,-apple-system,"Segoe UI",sans-serif;
        color:var(--ww-ink);
        background:
          radial-gradient(1200px 700px at 18% 18%, rgba(255,255,255,0.04), transparent 60%),
          radial-gradient(900px 520px at 82% 22%, rgba(224,182,182,0.08), transparent 58%),
          linear-gradient(135deg, var(--ww-bg-1) 0%, var(--ww-bg-2) 48%, var(--ww-bg-3) 100%);
      }

      #wwShell{
        max-width:82rem;
        margin:0 auto;
        height:calc(100vh - 4rem);
        border-radius:1.75rem;
        overflow:hidden;
        background:rgba(0,0,0,0.48);
        backdrop-filter:blur(6px);
        box-shadow:
          0 30px 80px rgba(0,0,0,0.6),
          inset 0 0 0 1px rgba(255,255,255,0.05);
      }

      #wwContent{
        height:100%;
        display:grid;
        grid-template-columns:11rem minmax(0,1fr);
        gap:2rem;
        padding:2.35rem 2.4rem;
        overflow:hidden;
      }

      .ww-side{
        height:100%;
        display:flex;
        align-items:center;
        justify-content:center;
      }

      .ww-side-wrap{
        display:flex;
        flex-direction:column;
        align-items:center;
        gap:.85rem;
      }

      .ww-side-logo{
        display:block;
        background:transparent !important;
        border:0 !important;
        padding:0 !important;
        margin:0;
        box-shadow:none !important;
      }

      .ww-side-logo img{
        width:8.2rem;
        display:block;
        background:transparent !important;
        border:0 !important;
        box-shadow:none !important;
        pointer-events:none;
      }

      .ww-side-divider{
        width:44px;
        height:1px;
        background:rgba(255,255,255,0.22);
      }

      .ww-side-button{
        appearance:none;
        -webkit-appearance:none;
        background:transparent;
        border:0;
        padding:0;
        margin:0;
        cursor:pointer;
        font-size:.82rem;
        letter-spacing:.22em;
        text-transform:uppercase;
        font-weight:900;
        color:#ffffff;
        white-space:nowrap;
      }

      .ww-main{
        height:100%;
        overflow:hidden;
      }

      .ww-scroll{
        height:100%;
        overflow-y:auto;
        overflow-x:hidden;
        padding-right:.85rem;
      }

      .ww-scroll::-webkit-scrollbar{
        width:2px;
      }

      .ww-scroll::-webkit-scrollbar-thumb{
        background:rgba(255,255,255,0.5);
      }

      .ww-wrap{
        padding:3rem 0 2rem;
      }

      .ww-cllist{
        width:min(980px,100%);
        margin:0 auto;
        display:flex;
        flex-direction:column;
        gap:26px;
      }

      .ww-status{
        width:100%;
        margin:0 auto 34px;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        gap:.65rem;
        text-align:center;
        color:#ecf3fa;
      }

      .ww-status-main{
        font-size:1.05rem;
        font-weight:950;
        letter-spacing:.20em;
        text-transform:uppercase;
      }

      .ww-status-next{
        font-size:.86rem;
        font-weight:850;
        letter-spacing:.16em;
        text-transform:uppercase;
        color:rgba(236,243,250,0.74);
      }

      .ww-banner{
        width:100%;
        border-radius:28px;
        border:1px solid rgba(255,255,255,0.18);
        background:linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.035));
        overflow:hidden;
      }

      .ww-clrow{
        display:flex;
        height:132px;
      }

      .ww-img{
        width:62%;
        overflow:hidden;
        background:#000;
      }

      .ww-img img{
        width:100%;
        height:100%;
        object-fit:cover;
        transform:scale(1.04);
      }

      .ww-meta{
        width:38%;
        display:flex;
        justify-content:space-between;
        align-items:center;
        gap:1rem;
        padding:14px 20px;
        border-left:1px solid rgba(255,255,255,0.10);
      }

      .ww-meta-copy{
        display:flex;
        flex-direction:column;
        gap:4px;
      }

      .ww-kicker{
        font-size:.68rem;
        letter-spacing:.22em;
        text-transform:uppercase;
        color:#9dc3d6;
        font-weight:900;
      }

      .ww-num{
        font:900 20px/1 system-ui,-apple-system,"Segoe UI",sans-serif;
        color:#ecf3fa;
      }

      .ww-line{
        width:40px;
        height:1px;
        background:rgba(157,195,214,0.5);
      }

      .ww-open{
        padding:12px 20px;
        border-radius:16px;
        border:1px solid rgba(157,195,214,0.40);
        background:rgba(157,195,214,0.15);
        color:#ecf3fa;
        font:900 13px system-ui,-apple-system,"Segoe UI",sans-serif;
        white-space:nowrap;
        cursor:pointer;
      }

      .ww-empty{
        text-align:center;
        padding:4rem 1rem;
        color:rgba(236,243,250,0.72);
        font-size:1.05rem;
        letter-spacing:.08em;
      }

      @media (max-width:760px){
        #wwPage{padding:1rem;}
        #wwShell{height:calc(100vh - 2rem);}
        #wwContent{
          grid-template-columns:1fr;
          gap:1.2rem;
          padding:1.4rem;
        }

        .ww-side{height:auto;}

        .ww-side-logo img{
          width:6.5rem;
        }

        .ww-wrap{
          padding:1rem 0 2rem;
        }

        .ww-status-main{
          font-size:.82rem;
        }

        .ww-status-next{
          font-size:.72rem;
        }

        .ww-clrow{
          flex-direction:column;
          height:auto;
        }

        .ww-img,
        .ww-meta{
          width:100%;
        }

        .ww-img{
          height:120px;
        }

        .ww-meta{
          border-left:none;
          border-top:1px solid rgba(255,255,255,0.10);
        }
      }
    </style>

    <div id="wwPage">
      <div id="wwShell">
        <div id="wwContent">

          <aside class="ww-side">
            <div class="ww-side-wrap">
              <div class="ww-side-logo">
                <img src="/assets/winterword/shared/logo.png" alt="WinterWord">
              </div>
              <div class="ww-side-divider"></div>
              <button class="ww-side-button" id="wwBaseStationButton" type="button">
                BASE STATION
              </button>
            </div>
          </aside>

          <main class="ww-main">
            <div class="ww-scroll">
              <section class="ww-wrap">
                <div class="ww-cllist">

                  <div class="ww-status">
                    <div class="ww-status-main">${statusCurrent}</div>
                    <div class="ww-status-next">${statusNext}</div>
                  </div>

                  ${
                    visibleClues.length
                      ? visibleClues.map((clue) => `
                        <article class="ww-banner">
                          <div class="ww-clrow">
                            <div class="ww-img">
                              <img src="/assets/winterword/display/${clue.file}" alt="Clue ${clue.name}">
                            </div>
                            <div class="ww-meta">
                              <div class="ww-meta-copy">
                                <div class="ww-kicker">CLUE</div>
                                <div class="ww-num">${clue.name}</div>
                                <div class="ww-line"></div>
                              </div>
                              <button class="ww-open" type="button" data-clue-open="${clue.clueNum}">
                                OPEN →
                              </button>
                            </div>
                          </div>
                        </article>
                      `).join("")
                      : `<div class="ww-empty">The first clue has not unlocked yet.</div>`
                  }

                </div>
              </section>
            </div>
          </main>

        </div>
      </div>
    </div>
  `;

  const baseButton = app.querySelector("#wwBaseStationButton");
  if (baseButton) {
    baseButton.addEventListener("click", () => {
      navigate("base-station");
    });
  }

  app.querySelectorAll("[data-clue-open]").forEach((button) => {
    button.addEventListener("click", () => {
      const clueId = Number(button.getAttribute("data-clue-open"));
      navigate("clue", { id: clueId });
    });
  });
}
