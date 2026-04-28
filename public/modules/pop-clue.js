export function renderPopCluePage(app, data = {}, navigate) {
  const {
    orgName = "WinterWord"
  } = data;

  const safeText = (value, fallback = "") =>
    String(value ?? fallback)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const mailSafeOrgName = orgName && String(orgName).trim()
    ? String(orgName).trim()
    : "WinterWord";

  const encodedOrgName = encodeURIComponent(mailSafeOrgName);

  const popSubmitHref =
    `mailto:pop@cluehouse.co.nz?subject=Pop%20Clue%20Submission%20-%20${encodedOrgName}&body=The%20Pop%20Clue%20has%20opened.%0A%0AIf%20you%20believe%20you%20have%20caught%20the%20answer%2C%20set%20it%20down%20below.%0A%0AYour%20answer%3A%0A%0A%0A%0AFirst%20correct%20answer%20receives%20the%20next%20clue%2024%20hours%20early.`;

  app.innerHTML = `
    <style>
      :root{
        --ww-night-0:#070c12;
        --ww-night-1:#0b141d;
        --ww-night-2:#13202c;
        --ww-ink-night:#d6dde6;
        --ww-muted-night:rgba(214,221,230,0.68);
        --ww-orange:#f08a24;
        --ww-left-wide:13.5rem;
        --ww-rail-bg:linear-gradient(90deg, var(--ww-night-0) 0%, var(--ww-night-1) 34%, var(--ww-night-2) 100%);
        --ww-page-bg:
          radial-gradient(760px 300px at 50% 0%, rgba(240,138,36,0.10), transparent 68%),
          radial-gradient(1200px 700px at 20% 18%, rgba(255,255,255,0.035), transparent 60%),
          radial-gradient(900px 560px at 78% 30%, rgba(240,138,36,0.055), transparent 62%),
          linear-gradient(90deg, var(--ww-night-0) 0%, var(--ww-night-1) 34%, var(--ww-night-2) 100%);
      }

      *{box-sizing:border-box;}

      #wwPortal{
        display:flex;
        height:100vh;
        font-family:system-ui,-apple-system,"Segoe UI",sans-serif;
        overflow:hidden;
      }

      #wwLeft{
        width:var(--ww-left-wide);
        background:var(--ww-rail-bg);
        height:100vh;
        position:sticky;
        top:0;
        box-shadow:inset -1px 0 0 rgba(240,138,36,0.92);
        flex:0 0 var(--ww-left-wide);
      }

      .ww-left-shell{
        height:100%;
        padding:1.55rem 0 2.6rem;
        display:flex;
        flex-direction:column;
        align-items:center;
        gap:2rem;
      }

      .ww-left-logo img{
        width:9.3rem;
        height:auto;
      }

      .ww-left-nav{
        flex:1;
        width:100%;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        gap:2.2rem;
      }

      .ww-left-item{
        background:none;
        border:none;
        cursor:pointer;
        display:flex;
        flex-direction:column;
        align-items:center;
        color:var(--ww-muted-night);
        font:inherit;
        text-transform:uppercase;
        letter-spacing:0.18em;
      }

      .ww-left-icon{
        width:4.6rem;
        height:auto;
      }

      .ww-left-item--pop .ww-left-icon{
        animation:wwPopPulse 1.45s ease-in-out infinite;
      }

      .ww-left-item--pop .ww-left-label{
        color:rgba(240,138,36,0.96);
      }

      @keyframes wwPopPulse{
        0%,100%{
          filter:
            drop-shadow(0 0 6px rgba(240,138,36,0.38))
            drop-shadow(0 0 12px rgba(240,138,36,0.18));
          transform:translateY(0) scale(1);
        }
        50%{
          filter:
            drop-shadow(0 0 13px rgba(240,138,36,0.82))
            drop-shadow(0 0 28px rgba(240,138,36,0.36));
          transform:translateY(-2px) scale(1.045);
        }
      }

      #wwRight{
        flex:1;
        min-width:0;
        height:100vh;
        overflow:auto;
        background:var(--ww-page-bg);
        border-left:1px solid rgba(240,138,36,0.92);
      }

      #wwView{
        min-height:100vh;
        max-width:74rem;
        margin:0 auto;
        padding:4rem;
        display:flex;
        align-items:center;
        justify-content:center;
      }

      .ww-pop-card{
        width:min(48rem, 100%);
        border-radius:1.2rem;
        padding:3.2rem 3rem;
        background:
          radial-gradient(circle at 0% 0%, rgba(240,138,36,0.18), transparent 60%),
          linear-gradient(180deg, rgba(255,255,255,0.075), rgba(255,255,255,0.042));
        border:1px solid rgba(240,138,36,0.42);
        box-shadow:
          0 30px 90px rgba(0,0,0,0.56),
          0 0 0 1px rgba(255,255,255,0.055) inset;
        text-align:center;
      }

      .ww-kicker{
        margin:0 0 0.65rem;
        font-size:0.78rem;
        letter-spacing:0.28em;
        text-transform:uppercase;
        color:rgba(214,221,230,0.64);
        font-weight:900;
      }

      .ww-title{
        margin:0;
        font-size:3.1rem;
        line-height:1.05;
        color:var(--ww-orange);
        letter-spacing:0.04em;
        text-transform:uppercase;
      }

      .ww-org{
        margin:0.9rem 0 2rem;
        font-size:0.84rem;
        letter-spacing:0.18em;
        text-transform:uppercase;
        color:rgba(214,221,230,0.68);
        font-weight:850;
      }

      .ww-body{
        max-width:36rem;
        margin:0 auto 1.8rem;
        color:rgba(214,221,230,0.88);
        font-size:1.08rem;
        line-height:1.75;
      }

      .ww-clue-box{
        max-width:34rem;
        margin:0 auto 1.8rem;
        padding:1.35rem 1.45rem;
        border-radius:1rem;
        background:rgba(255,255,255,0.062);
        border:1px solid rgba(255,255,255,0.10);
        color:rgba(214,221,230,0.92);
        line-height:1.75;
        font-style:italic;
      }

      .ww-reward{
        max-width:34rem;
        margin:0 auto 2.1rem;
        color:rgba(214,221,230,0.68);
        font-size:0.95rem;
        line-height:1.6;
      }

      .ww-actions{
        display:flex;
        flex-wrap:wrap;
        justify-content:center;
        gap:0.9rem;
      }

      .ww-primary,
      .ww-secondary{
        appearance:none;
        border:none;
        cursor:pointer;
        text-decoration:none;
        display:inline-flex;
        align-items:center;
        justify-content:center;
        min-height:2.9rem;
        padding:0.85rem 1.25rem;
        border-radius:999px;
        font-size:0.75rem;
        letter-spacing:0.14em;
        text-transform:uppercase;
        font-weight:900;
      }

      .ww-primary{
        background:linear-gradient(180deg,#f6a34b,#ef8420);
        color:#20140c;
      }

      .ww-secondary{
        background:rgba(255,255,255,0.08);
        color:rgba(214,221,230,0.88);
        border:1px solid rgba(255,255,255,0.12);
      }
    </style>

    <div id="wwPortal">
      <aside id="wwLeft">
        <div class="ww-left-shell">
          <div class="ww-left-logo">
            <img src="/assets/winterword/shared/logo.png" alt="WinterWord">
          </div>

          <nav class="ww-left-nav">
            <button class="ww-left-item" type="button" data-nav="base-station">
              <img class="ww-left-icon" src="/assets/winterword/shared/logo.png" alt="Base Station">
              <div class="ww-left-label">BASE</div>
            </button>

            <button class="ww-left-item ww-left-item--pop" type="button">
              <img class="ww-left-icon" src="/assets/winterword/shared/flash.png" alt="Pop Clue">
              <div class="ww-left-label">POP</div>
            </button>
          </nav>
        </div>
      </aside>

      <main id="wwRight">
        <div id="wwView">
          <section class="ww-pop-card">
            <p class="ww-kicker">Limited Signal</p>
            <h1 class="ww-title">Pop Clue</h1>
            <p class="ww-org">${safeText(orgName)}</p>

            <div class="ww-body">
              A brief clue has opened in the frost.
            </div>

            <div class="ww-clue-box">
              Placeholder: Your live Pop Clue content will appear here.
            </div>

            <div class="ww-reward">
              First correct answer receives the next clue 24 hours early.
            </div>

            <div class="ww-actions">
              <a class="ww-primary" href="${popSubmitHref}">Submit Pop Answer</a>
              <button class="ww-secondary" type="button" data-nav="base-station">Return to Base Station</button>
            </div>
          </section>
        </div>
      </main>
    </div>
  `;

  const navButtons = app.querySelectorAll("[data-nav]");

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-nav");
      if (typeof navigate === "function") navigate(target);
    });
  });
}
