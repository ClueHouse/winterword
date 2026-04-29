export function renderBaseStation(app, data = {}, navigate) {const {orgName = "WinterWord",seasonLabel = "WINTERWORD • 2026",introLine1 = "A letter per week from a wintry scroll,",introLine2 = "Piece them together — reveal the whole.",howParagraphs = [],updatesText = "",currentClue = 0,totalClues = 12,lifelineAvailable = false,lifelineUnlockClue = 6,popClueLive = false} = data;

const safeText = (value, fallback = "") =>String(value ?? fallback).replaceAll("&", "&").replaceAll("<", "<").replaceAll(">", ">").replaceAll('"', """).replaceAll("'", "'");

const mailSafeOrgName = orgName && String(orgName).trim()? String(orgName).trim(): "WinterWord";

const encodedOrgName = encodeURIComponent(mailSafeOrgName);

const paragraphs =Array.isArray(howParagraphs) && howParagraphs.length? howParagraphs: ["Each week, a new clue will quietly unlock — each one revealing a single letter.","Guard your answers, for as the season unfolds, they will begin to shift and settle… forming the anagram of the Winterword.","If you feel the answer stirring early, step forward and claim your place on the leaderboard.","But remember — one guess is all you get."];

const progressText = ${Number(currentClue) || 0} of ${Number(totalClues) || 12} clues released;

const reportProblemHref =mailto:fix@cluehouse.co.nz?subject=WinterWord%20Issue%20-%20${encodedOrgName}&body=SET%20THE%20SCENE%3A%0AWhich%20page%20were%20you%20on%3F%0A%0APLOT%20TWIST%3A%0AWhat%20went%20wrong%3F%0A%0AALTERNATE%20ENDING%3A%0AWhat%20did%20you%20expect%20to%20happen%3F%0A%0AYOUR%20TRAVELLER%E2%80%99S%20GEAR%3A%0AWhich%20device%20%2B%20browser%20you%20brought%20on%20this%20journey.%0A%0AThanks%20for%20sharing%20%E2%80%94%20we%E2%80%99ll%20follow%20the%20trail%20and%20set%20things%20right.;

const subscribeHref =mailto:opt@cluehouse.co.nz?subject=WinterWord%20Subscribe%20-%20${encodedOrgName}&body=Sign%20me%20up.%20The%20winter%20hush%20is%20starting%20to%20feel%20personal.;

const unsubscribeHref =mailto:opt@cluehouse.co.nz?subject=WinterWord%20Unsubscribe%20-%20${encodedOrgName}&body=Remove%20me%20from%20Winterword%20Clue%20Alerts.%20I%E2%80%99m%20embracing%20the%20quiet%20freeze%20of%20an%20uncluttered%20inbox.;

const solveHref =mailto:key@cluehouse.co.nz?subject=FINAL%20Winterword%20Submission%20-%20${encodedOrgName}%20-%202026&body=You%20feel%20the%20pieces%20have%20settled.%0A%0AClues%20gathered.%20Letters%20found.%0AA%20pattern%2C%20perhaps%2C%20now%20clear%20beneath%20the%20frost.%0A%0AIf%20you%20believe%20you%20can%20name%20the%20WinterWord%2C%0Aset%20it%20down%20below.%0A%0AYour%20answer%3A%0A%0A%0A%0A(Only%20one%20submission%20is%20counted.%0AChoose%20your%20moment%20%E2%80%94%20winter%20does%20not%20answer%20twice.);

const contactHref =mailto:hq@cluehouse.co.nz?subject=Clue%20House%20Enquiry;

app.innerHTML = `{--ww-night-0:#070c12;--ww-night-1:#0b141d;--ww-night-2:#13202c;--ww-ink-night:#d6dde6;--ww-muted-night(214,221,230,0.68);--ww-hairline-night(255,255,255,0.10);--ww-white-ink:#1a2330;--ww-white-muted(26,35,48,0.64);--ww-orange:#f08a24;--ww-tooltip-orange-top:#f7d8b2;--ww-tooltip-orange-bot:#efbe86;--ww-tooltip-ink:#2b1e12;--ww-tooltip-title:#6d4a24;--ww-tooltip-border:#b87629;--ww-radius:0.85rem;--ww-left-wide:13.5rem;--ww-rail-bg(90deg, var(--ww-night-0) 0%, var(--ww-night-1) 34%, var(--ww-night-2) 100%);--ww-page-bg:radial-gradient(760px 300px at 50% 0%, rgba(155,185,201,0.06), transparent 68%),radial-gradient(1200px 700px at 20% 18%, rgba(255,255,255,0.035), transparent 60%),radial-gradient(900px 560px at 78% 30%, rgba(155,185,201,0.025), transparent 62%),linear-gradient(90deg, var(--ww-night-0) 0%, var(--ww-night-1) 34%, var(--ww-night-2) 100%);--ww-tooltip-bg(180deg, var(--ww-tooltip-orange-top), var(--ww-tooltip-orange-bot));--ww-tooltip-shadow:0 24px 46px rgba(0,0,0,0.26),0 0 0 1px rgba(255,255,255,0.14) inset,0 12px 24px rgba(255,255,255,0.10) inset,0 -8px 20px rgba(201,124,41,0.08) inset;--ww-panel-line:1px solid var(--ww-hairline-night);--ww-panel-text(214,221,230,0.90);--ww-panel-text-soft(214,221,230,0.74);--ww-panel-bg-rules(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.038));--ww-panel-bg-updates(255,255,255,0.035);--ww-panel-shadow-rules:0 16px 44px rgba(0,0,0,0.35);--ww-panel-border-updates(255,255,255,0.085);--ww-premium-card-bg(180deg, rgba(255,255,255,0.96), rgba(236,228,214,0.98));--ww-premium-card-border:1px solid rgba(202,162,74,0.72);--ww-premium-card-shadow:0 32px 95px rgba(0,0,0,0.68),0 0 0 1px rgba(255,255,255,0.42) inset,0 16px 28px rgba(202,162,74,0.08) inset;--ww-primary-bg(180deg, #243242 0%, #192532 100%);--ww-primary-border:1px solid rgba(26,35,48,0.86);--ww-primary-shadow:0 12px 26px rgba(0,0,0,0.22),0 0 0 1px rgba(255,255,255,0.07) inset,0 10px 20px rgba(240,138,36,0.08);--ww-primary-shadow-hover:0 16px 32px rgba(0,0,0,0.28),0 0 0 1px rgba(255,255,255,0.07) inset,0 12px 24px rgba(240,138,36,0.12);}

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
    overflow:visible;
    flex:0 0 var(--ww-left-wide);
  }

  .ww-rail{
    position:absolute;
    inset:0;
    background:var(--ww-rail-bg);
    overflow:visible;
  }

  .ww-left-shell{
    height:100%;
    padding:1.55rem 0 2.6rem;
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:1.85rem;
    overflow:visible;
  }

  .ww-left-logo{
    position:relative;
    z-index:5;
  }

  .ww-left-logo img{
    width:9.3rem;
    height:auto;
    display:block;
  }

  .ww-left-nav{
    flex:1;
    width:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:space-evenly;
    overflow:visible;
    position:relative;
  }

  .ww-left-item{
    background:none;
    border:none;
    cursor:pointer;
    position:relative;
    display:flex;
    flex-direction:column;
    align-items:center;
    user-select:none;
    text-decoration:none;
    overflow:visible;
    z-index:3;
    padding:0;
    font:inherit;
    opacity:1;
    transform:translateY(0) scale(1);
    transition:opacity 180ms ease, transform 180ms ease, filter 180ms ease;
  }

  .ww-left-icon{
    width:4.6rem;
    height:auto;
    transition:transform 160ms ease, filter 160ms ease, opacity 160ms ease;
  }

  .ww-left-label{
    margin-top:0.4rem;
    font-size:0.72rem;
    letter-spacing:0.18em;
    text-transform:uppercase;
    color:var(--ww-muted-night);
    font-weight:700;
  }

  .ww-left-tooltip{
    position:absolute;
    top:50%;
    left:calc(100% + 1rem);
    transform:translateY(-50%);
    max-width:18rem;
    min-width:13.5rem;
    padding:1rem 1.15rem;
    background:var(--ww-tooltip-bg);
    border:1px solid var(--ww-tooltip-border);
    border-radius:1rem;
    box-shadow:var(--ww-tooltip-shadow);
    color:var(--ww-tooltip-ink);
    font-size:0.82rem;
    line-height:1.52;
    opacity:0;
    pointer-events:none;
    transition:opacity 160ms ease-out;
    z-index:60;
    text-align:left;
  }

  .ww-left-tooltip::before{
    content:"";
    position:absolute;
    left:-7px;
    top:50%;
    width:16px;
    height:16px;
    background:inherit;
    border-radius:4px;
    transform:translateY(-50%) rotate(45deg);
    box-shadow:-1px -1px 0 0 var(--ww-tooltip-border);
  }

  .ww-left-tooltip-title{
    font-size:0.68rem;
    letter-spacing:0.18em;
    text-transform:uppercase;
    color:var(--ww-tooltip-title);
    margin-bottom:0.35rem;
    text-align:center;
    font-weight:800;
  }

  .ww-left-item[data-disabled="true"]{
    cursor:default;
  }

  .ww-left-item[data-disabled="true"] .ww-left-icon{
    opacity:0.35;
    filter:grayscale(1);
  }

  .ww-left-item[data-disabled="true"] .ww-left-label{
    opacity:0.45;
  }

  .ww-left-item:hover .ww-left-tooltip{
    opacity:1;
  }

  .ww-left-item--pop{
    animation:wwPopRailIn 260ms ease-out both;
  }

  .ww-left-item--pop .ww-left-icon{
    animation:wwPopPulse 1.45s ease-in-out infinite;
  }

  .ww-left-item--pop .ww-left-label{
    color:rgba(240,138,36,0.96);
    text-shadow:0 0 14px rgba(240,138,36,0.42);
  }

  @keyframes wwPopRailIn{
    from{
      opacity:0;
      transform:translateY(10px) scale(0.94);
    }
    to{
      opacity:1;
      transform:translateY(0) scale(1);
    }
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
    overflow:hidden;
    min-width:0;
  }

  #wwScroll{
    height:100%;
    overflow:auto;
    background:var(--ww-page-bg);
    border-left:1px solid rgba(240,138,36,0.92);
  }

  #wwView{
    max-width:78rem;
    min-height:100%;
    margin:0 auto;
    padding:4rem 4rem 2.2rem;
    display:flex;
    flex-direction:column;
  }

  .ww-head{
    position:relative;
    margin-bottom:1.15rem;
    min-height:10.8rem;
    padding-right:340px;
  }

  .ww-slug{
    font-size:0.76rem;
    letter-spacing:0.26em;
    text-transform:uppercase;
    color:var(--ww-muted-night);
    font-weight:900;
    margin:0 0 0.75rem;
  }

  .ww-title{
    font-size:2.55rem;
    color:var(--ww-orange);
    margin:0;
  }

  .ww-org-name{
    margin:0.45rem 0 0;
    font-size:0.84rem;
    letter-spacing:0.18em;
    text-transform:uppercase;
    color:rgba(214,221,230,0.74);
    font-weight:850;
  }

  .ww-signal-wrap{
    position:absolute;
    top:0.15rem;
    right:0;
    display:flex;
    flex-direction:column;
    align-items:flex-end;
    gap:0.75rem;
    padding-top:0.15rem;
    z-index:20;
  }

  .ww-signal{
    display:flex;
    align-items:flex-end;
    gap:1.2rem;
    padding:0.9rem 1.1rem;
    border-radius:1.1rem;
    background:rgba(255,255,255,0.05);
    border:2px solid var(--ww-orange);
    box-shadow:0 14px 34px rgba(0,0,0,0.26);
  }

  .ww-st-label{
    font-size:0.72rem;
    letter-spacing:0.3em;
    text-transform:uppercase;
    color:rgba(214,221,230,0.6);
    font-weight:900;
  }

  .ww-signal-bar{
    display:flex;
    align-items:flex-end;
    gap:6px;
    height:3.6rem;
  }

  .ww-signal-bar span{
    width:12px;
    height:30%;
    background:rgba(214,221,230,0.22);
    border-radius:4px;
    animation:wwSignal 6s infinite;
  }

  .ww-signal-bar span:nth-child(2){animation-duration:5.4s;}
  .ww-signal-bar span:nth-child(3){animation-duration:6.8s;}
  .ww-signal-bar span:nth-child(4){animation-duration:5.9s;}
  .ww-signal-bar span:nth-child(5){animation-duration:7.2s;}

  @keyframes wwSignal{
    0%{height:28%; background:rgba(214,221,230,0.18);}
    45%{height:100%; background:rgba(214,221,230,0.52);}
    100%{height:34%; background:rgba(214,221,230,0.20);}
  }

  .ww-action-btn{
    appearance:none;
    border:1px solid var(--ww-orange);
    background:rgba(255,255,255,0.11);
    color:rgba(255,255,255,0.94);
    font-size:0.7rem;
    letter-spacing:0.16em;
    text-transform:uppercase;
    font-weight:900;
    padding:0.62rem 0.92rem;
    border-radius:0.6rem;
    cursor:pointer;
    transition:background 160ms ease, border-color 160ms ease, transform 160ms ease, box-shadow 160ms ease;
    text-decoration:none;
    display:inline-block;
    box-shadow:0 8px 22px rgba(0,0,0,0.22);
    position:relative;
    z-index:25;
  }

  .ww-action-btn:hover{
    background:rgba(255,255,255,0.16);
    transform:translateY(-1px);
    box-shadow:0 12px 28px rgba(0,0,0,0.28), 0 0 0 1px rgba(240,138,36,0.18) inset;
  }

  .ww-action-btn[aria-expanded="true"]{
    background:rgba(255,255,255,0.17);
    border-color:rgba(240,138,36,0.98);
    box-shadow:0 12px 28px rgba(0,0,0,0.28), 0 0 0 1px rgba(240,138,36,0.24) inset;
  }

  .wwSubPanelWrap{
    position:absolute;
    top:2.2rem;
    right:18.8rem;
    width:300px;
    min-height:1px;
    z-index:40;
    pointer-events:none;
  }

  .wwSubPanel{
    position:absolute;
    top:0;
    left:0;
    width:300px;
    border-radius:18px;
    box-shadow:0 24px 52px rgba(0,0,0,0.22);
    z-index:40;
    overflow:hidden;
    opacity:0;
    transform:translateY(8px);
    pointer-events:none;
    transition:opacity 180ms ease, transform 180ms ease;
  }

  .wwSubPanel.is-previewing,
  .wwSubPanel.is-open{
    opacity:1;
    transform:translateY(0);
    pointer-events:auto;
  }

  .wwSubTop{
    background:rgba(255,255,255,0.985);
    border:1px solid rgba(31,63,87,0.12);
    padding:1rem 1rem 0.95rem;
  }

  .wwSubBottom{
    background:linear-gradient(180deg,#f39a3f 0%, #ef8420 100%);
    border:1px solid rgba(173,94,26,0.34);
    border-top:none;
    max-height:0;
    opacity:0;
    overflow:hidden;
    padding:0 1rem;
    transition:max-height 180ms ease, opacity 140ms ease, padding-top 180ms ease, padding-bottom 180ms ease;
  }

  .wwSubPanel.is-open .wwSubBottom{
    max-height:10rem;
    opacity:1;
    padding-top:0.95rem;
    padding-bottom:1rem;
  }

  .wwSubTitle{
    font-size:.8rem;
    letter-spacing:.18em;
    text-transform:uppercase;
    color:#a85f1f;
    font-weight:800;
    margin-bottom:.5rem;
  }

  .wwSubText{
    font-size:.92rem;
    line-height:1.5;
    color:#4b5d6b;
    margin-bottom:.45rem;
  }

  .wwSubAction{
    display:block;
    width:100%;
    text-align:center;
    padding:.78rem .7rem;
    border-radius:999px;
    font-size:.75rem;
    letter-spacing:.16em;
    text-transform:uppercase;
    font-weight:800;
    text-decoration:none;
    transition:transform 140ms ease, box-shadow 140ms ease, background 140ms ease, border-color 140ms ease;
  }

  .wwSubAction:hover{
    transform:translateY(-1px);
  }

  .wwSubActionPrimary{
    background:#c7772d;
    color:#fff;
    box-shadow:0 8px 18px rgba(199,119,45,0.22);
  }

  .wwSubActionPrimary:hover{
    background:#b86a25;
    box-shadow:0 12px 22px rgba(199,119,45,0.28);
  }

  .wwSubActionSecondary{
    background:rgba(255,255,255,0.22);
    color:#fffdf9;
    border:1px solid rgba(255,255,255,0.34);
    box-shadow:0 8px 18px rgba(137,73,15,0.16);
  }

  .wwSubActionSecondary:hover{
    background:rgba(255,255,255,0.28);
  }

  .wwSubSub{
    font-size:.72rem;
    color:rgba(255,255,255,0.92);
    text-align:center;
    margin-top:.55rem;
    margin-bottom:0;
    font-weight:600;
  }

  .ww-tagline{
    margin:0 0 1.85rem;
    font-size:1.12rem;
    line-height:1.55;
    font-style:italic;
    color:var(--ww-ink-night);
    opacity:0.92;
    max-width:38rem;
  }

  .ww-base{
    display:grid;
    grid-template-columns:1.15fr 0.65fr;
    gap:2.2rem;
    align-items:start;
  }

  .ww-card{
    padding:1.75rem;
    border-radius:var(--ww-radius);
    border:var(--ww-panel-line);
  }

  .ww-card--rules{
    background:var(--ww-panel-bg-rules);
    box-shadow:var(--ww-panel-shadow-rules);
  }

  .ww-card--rules h3{
    opacity:0.86;
  }

  .ww-card--updates{
    background:var(--ww-panel-bg-updates);
    box-shadow:none;
    border-color:var(--ww-panel-border-updates);
  }

  .ww-card h3{
    margin:0 0 1rem;
    font-size:0.92rem;
    letter-spacing:0.14em;
    text-transform:uppercase;
    color:var(--ww-ink-night);
    padding-bottom:0.55rem;
    border-bottom:1px solid rgba(255,255,255,0.16);
  }

  .ww-card p{
    margin:0 0 0.85rem;
    line-height:1.75;
    color:var(--ww-panel-text);
  }

  .ww-card p:last-child{
    margin-bottom:0;
  }

  .ww-card--updates p{
    color:var(--ww-panel-text-soft);
  }

  .ww-progress{
    margin-top:0.9rem;
    padding-top:0.85rem;
    border-top:1px solid rgba(255,255,255,0.12);
    font-size:0.78rem;
    letter-spacing:0.14em;
    text-transform:uppercase;
    font-weight:800;
    color:rgba(214,221,230,0.62);
  }

  .ww-lastword{
    background:var(--ww-premium-card-bg);
    color:var(--ww-white-ink);
    padding:2.9rem 2.1rem 3.05rem;
    border-radius:0.9rem;
    border:var(--ww-premium-card-border);
    box-shadow:var(--ww-premium-card-shadow);
    max-width:22rem;
    text-align:center;
    position:relative;
    overflow:visible;
  }

  .ww-lastword::before{
    content:"";
    position:absolute;
    inset:0;
    opacity:0.52;
    background:
      radial-gradient(140% 180% at 20% 20%, rgba(0,0,0,0.07), transparent 55%),
      radial-gradient(120% 160% at 80% 75%, rgba(202,162,74,0.09), transparent 60%);
    mix-blend-mode:multiply;
    pointer-events:none;
  }

  .ww-lastword::after{
    content:"";
    position:absolute;
    inset:0;
    background:linear-gradient(180deg, rgba(255,255,255,0.42), rgba(255,255,255,0) 24%);
    pointer-events:none;
  }

  .ww-lastword h3,
  .ww-lastword-kicker,
  .ww-primary-wrap,
  .ww-stakes{
    position:relative;
    z-index:1;
  }

  .ww-lastword h3{
    margin:0 0 1.1rem;
    font-size:0.92rem;
    letter-spacing:0.14em;
    text-transform:uppercase;
  }

  .ww-lastword-kicker{
    font-size:1.05rem;
    line-height:1.6;
    margin:0 0 1.9rem;
  }

  .ww-primary-wrap{
    display:inline-block;
    position:relative;
    margin:0 auto 1.9rem;
  }

  .ww-primary{
    display:inline-block;
    padding:0.95rem 1.35rem;
    border-radius:0.55rem;
    background:var(--ww-primary-bg);
    border:var(--ww-primary-border);
    box-shadow:var(--ww-primary-shadow);
    font-weight:950;
    letter-spacing:0.14em;
    text-transform:uppercase;
    color:#f5f0e7;
    text-decoration:none;
    position:relative;
    overflow:hidden;
    text-shadow:0 1px 0 rgba(0,0,0,0.28);
  }

  .ww-primary::before{
    content:"";
    position:absolute;
    inset:1px;
    border-radius:0.48rem;
    border:1px solid rgba(255,255,255,0.06);
    pointer-events:none;
  }

  .ww-primary::after{
    content:"";
    position:absolute;
    top:-18%;
    bottom:-18%;
    left:-34%;
    width:22%;
    background:linear-gradient(
      90deg,
      rgba(255,255,255,0) 0%,
      rgba(255,255,255,0.12) 30%,
      rgba(255,255,255,0.72) 50%,
      rgba(255,255,255,0.12) 70%,
      rgba(255,255,255,0) 100%
    );
    transform:skewX(-22deg);
    animation:wwSolveStreak 3s ease-in-out infinite;
    pointer-events:none;
  }

  .ww-primary:hover{
    transform:translateY(-1px);
    box-shadow:var(--ww-primary-shadow-hover);
  }

  .ww-primary-tooltip{
    position:absolute;
    bottom:calc(100% + 0.85rem);
    left:50%;
    transform:translate(-50%, 4px);
    min-width:7rem;
    max-width:12rem;
    padding:0.95rem 1.1rem;
    background:var(--ww-tooltip-bg);
    border:1px solid var(--ww-tooltip-border);
    border-radius:1rem;
    box-shadow:var(--ww-tooltip-shadow);
    color:var(--ww-tooltip-ink);
    font-size:0.95rem;
    font-weight:800;
    letter-spacing:0.04em;
    line-height:1.2;
    text-align:center;
    opacity:0;
    pointer-events:none;
    transition:opacity 160ms ease-out, transform 160ms ease-out;
    z-index:30;
  }

  .ww-primary-tooltip::before{
    content:"";
    position:absolute;
    left:50%;
    bottom:-7px;
    width:16px;
    height:16px;
    background:inherit;
    border-radius:4px;
    transform:translateX(-50%) rotate(45deg);
    box-shadow:1px 1px 0 0 var(--ww-tooltip-border);
  }

  .ww-primary-wrap:hover .ww-primary-tooltip{
    opacity:1;
    transform:translate(-50%, 0);
  }

  @keyframes wwSolveStreak{
    0%{left:-34%; opacity:0;}
    10%{opacity:1;}
    44%{left:118%; opacity:1;}
    56%{left:118%; opacity:0;}
    100%{left:118%; opacity:0;}
  }

  .ww-stakes{
    font-size:0.98rem;
    line-height:1.65;
    color:var(--ww-white-muted);
  }

  .ww-footer{
    margin-top:auto;
    padding-top:3rem;
    display:flex;
    justify-content:flex-end;
    font-size:0.75rem;
    color:rgba(214,221,230,0.72);
  }

  .ww-footer-right{
    display:flex;
    flex-direction:column;
    align-items:flex-end;
    text-align:right;
    gap:0.42rem;
  }

  .ww-footer-brand{
    font-weight:850;
    letter-spacing:0.08em;
    text-transform:uppercase;
    color:rgba(214,221,230,0.86);
  }

  .ww-footer-subtitle{
    font-style:italic;
    color:rgba(214,221,230,0.62);
  }

  .ww-footer-links{
    display:inline-flex;
    align-items:center;
    justify-content:flex-end;
    text-transform:uppercase;
    letter-spacing:0.12em;
    font-size:0.68rem;
  }

  .ww-footer a,
  .ww-footer button{
    color:inherit;
    text-decoration:none;
    font:inherit;
    text-transform:uppercase;
    letter-spacing:0.12em;
    background:none;
    border:0;
    padding:0;
    cursor:pointer;
  }

  .ww-footer a:hover,
  .ww-footer button:hover{
    text-decoration:underline;
  }

  .ww-footer-dot{
    display:inline-block;
    padding:0 0.6rem;
    opacity:0.9;
    transform:translateY(-0.5px);
  }

  .ww-legal{
    position:relative;
    display:inline-flex;
    align-items:center;
  }

  .ww-legal-menu{
    position:absolute;
    right:0;
    bottom:calc(100% + 10px);
    min-width:170px;
    border-radius:14px;
    padding:0.5rem;
    background:
      radial-gradient(circle at 0 0, rgba(255,238,204,0.18), transparent 60%),
      rgba(25, 15, 14, 0.95);
    border:1px solid rgba(255,238,210,0.22);
    box-shadow:0 18px 46px rgba(0,0,0,0.85);
    opacity:0;
    transform:translateY(8px);
    pointer-events:none;
    transition:opacity 0.14s ease, transform 0.14s ease;
    z-index:100;
  }

  .ww-legal:hover .ww-legal-menu,
  .ww-legal:focus-within .ww-legal-menu{
    opacity:1;
    transform:translateY(0);
    pointer-events:auto;
  }

  .ww-legal-menu a{
    display:block;
    padding:0.5rem 0.65rem;
    border-radius:10px;
    text-decoration:none;
    color:rgba(253,247,239,0.92);
  }

  .ww-legal-menu a:hover,
  .ww-legal-menu a:focus-visible{
    background:rgba(240,189,125,0.16);
    text-decoration:none;
    outline:none;
  }

  @media (max-width:1180px){
    .ww-head{
      min-height:auto;
      padding-right:0;
    }

    .ww-signal-wrap{
      position:relative;
      top:auto;
      right:auto;
      align-items:flex-start;
      padding-top:0;
      margin-top:1.35rem;
    }

    .wwSubPanelWrap{
      position:relative;
      top:auto;
      right:auto;
      width:300px;
      margin-top:0.75rem;
    }

    .wwSubPanel{
      position:relative;
      width:300px;
    }
  }

  @media (max-width:1100px){
    .ww-base{
      grid-template-columns:1fr;
    }

    .ww-lastword{
      max-width:none;
    }
  }

  @media (max-width:820px){
    :root{
      --ww-left-wide:12.8rem;
    }

    .ww-left-logo img{
      width:8.9rem;
    }

    .ww-left-icon{
      width:4.4rem;
    }

    #wwView{
      padding:3rem 1.6rem 2rem;
    }
  }
</style>

<div id="wwPortal">
  <aside id="wwLeft">
    <div class="ww-rail">
      <div class="ww-left-shell">
        <div class="ww-left-logo">
          <img src="/assets/winterword/shared/logo.png" alt="WinterWord">
        </div>

        <nav class="ww-left-nav">
          <button class="ww-left-item" type="button" data-nav="clues">
            <img class="ww-left-icon" src="/assets/winterword/shared/clue.png" alt="Clues">
            <div class="ww-left-label">CLUES</div>
            <div class="ww-left-tooltip">
              <div class="ww-left-tooltip-title">Clues</div>
              Each of your upcoming clues is designed to reveal just enough
              to move you forward — and hide the rest where only patience can reach it.
            </div>
          </button>

          <button class="ww-left-item" type="button" data-nav="lifeline" data-disabled="${lifelineAvailable ? "false" : "true"}">
            <img class="ww-left-icon" src="/assets/winterword/shared/lifeline.png" alt="Lifeline">
            <div class="ww-left-label">LIFELINE</div>
            <div class="ww-left-tooltip">
              ${
                lifelineAvailable
                  ? `<div class="ww-left-tooltip-title">Lifeline</div>This passage is open. Step carefully.`
                  : `<div class="ww-left-tooltip-title">Lifeline</div>This passage waits its moment.`
              }
            </div>
          </button>

          ${
            popClueLive
              ? `
                <button class="ww-left-item ww-left-item--pop" type="button" data-nav="pop-clue">
                  <img class="ww-left-icon" src="/assets/winterword/shared/flash.png" alt="Pop Clue">
                  <div class="ww-left-label">POP</div>
                  <div class="ww-left-tooltip">
                    <div class="ww-left-tooltip-title">Pop Clue</div>
                    A brief signal has opened. Solve it first, and the next clue may arrive early.
                  </div>
                </button>
              `
              : ""
          }

          <button class="ww-left-item" type="button" data-nav="leaderboard">
            <img class="ww-left-icon" src="/assets/winterword/shared/leaderboard.png" alt="Leaderboard">
            <div class="ww-left-label">LEADER</div>
            <div class="ww-left-tooltip">
              <div class="ww-left-tooltip-title">Leaderboard</div>
              The Leaderboard remembers all who enter the game.
              It reflects those who find the answer,
              and honours the one who found it first.
            </div>
          </button>
        </nav>
      </div>
    </div>
  </aside>

  <main id="wwRight">
    <div id="wwScroll">
      <div id="wwView">
        <div class="ww-head">
          <div class="ww-head-copy">
            <p class="ww-slug">
              ${safeText(seasonLabel || "WINTERWORD • 2026")}
            </p>
            <h2 class="ww-title">BASE STATION</h2>
            <p class="ww-org-name">${safeText(orgName)}</p>
          </div>

          <div class="ww-signal-wrap">
            <div class="ww-signal" aria-label="Signal">
              <div class="ww-st-label">Signal</div>
              <div class="ww-signal-bar" aria-hidden="true">
                <span></span><span></span><span></span><span></span><span></span>
              </div>
            </div>

            <a class="ww-action-btn" href="${reportProblemHref}">
              Report a problem
            </a>

            <button class="ww-action-btn" id="wwSubToggle" type="button" aria-expanded="false" aria-controls="wwSubPanel">
              Subscribe
            </button>
          </div>

          <div class="wwSubPanelWrap">
            <div class="wwSubPanel" id="wwSubPanel">
              <div class="wwSubTop">
                <div class="wwSubTitle">Clue Alerts</div>

                <div class="wwSubText">
                  Curious minds tend to wander.<br>
                  When each clue falls,<br>
                  subscribers will hear the click.
                </div>

                <a class="wwSubAction wwSubActionPrimary" href="${subscribeHref}">
                  Subscribe to Clue Alerts
                </a>
              </div>

              <div class="wwSubBottom">
                <a class="wwSubAction wwSubActionSecondary" href="${unsubscribeHref}">
                  Unsubscribe
                </a>

                <div class="wwSubSub">Execute ESCAPE ROOM protocol.</div>
              </div>
            </div>
          </div>
        </div>

        <p class="ww-tagline">
          ${safeText(introLine1)}<br>
          ${safeText(introLine2)}
        </p>

        <div class="ww-base">
          <div>
            <div class="ww-card ww-card--rules">
              <h3>How this works</h3>
              ${paragraphs.map((p) => `<p>${safeText(p)}</p>`).join("")}
            </div>

            <div class="ww-card ww-card--updates" style="margin-top:1.25rem;">
              <h3>Updates</h3>
              ${
                updatesText && String(updatesText).trim()
                  ? `<p>${safeText(updatesText)}</p>`
                  : `<p>No new updates yet.</p>`
              }
              <div class="ww-progress">${safeText(progressText)}</div>
            </div>
          </div>

          <div class="ww-lastword">
            <h3>The Last Word</h3>

            <p class="ww-lastword-kicker">
              When the wind quietens,<br>
              certainty stirs
            </p>

            <div class="ww-primary-wrap">
              <a class="ww-primary" href="${solveHref}">
                Solve WinterWord
              </a>
              <div class="ww-primary-tooltip">Ready?</div>
            </div>

            <div class="ww-stakes">
              One word.<br>
              One chance.<br>
              Guess wrong, and the silence wins.
            </div>
          </div>
        </div>

        <footer class="ww-footer">
          <div class="ww-footer-right">
            <div class="ww-footer-brand">WinterWord</div>
            <div class="ww-footer-subtitle">Another Clue House Experience</div>
            <div class="ww-footer-links">
              <div class="ww-legal">
                <button type="button">Legal</button>
                <div class="ww-legal-menu">
                  <a href="/legal/privacy-policy.html">Privacy</a>
                  <a href="/legal/terms-of-use.html">Terms</a>
                  <a href="/legal/disclaimer.html">Disclaimer</a>
                </div>
              </div>
              <span class="ww-footer-dot">•</span>
              <a href="${contactHref}">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </main>
</div>

`;

const navButtons = app.querySelectorAll("[data-nav]");

navButtons.forEach((button) => {button.addEventListener("click", () => {const target = button.getAttribute("data-nav");const disabled = button.getAttribute("data-disabled") === "true";

  if (disabled) return;
  if (typeof navigate === "function") navigate(target);
});

});

const toggle = app.querySelector("#wwSubToggle");const panel = app.querySelector("#wwSubPanel");

if (toggle && panel) {const setPreview = (on) => {if (panel.classList.contains("is-open")) return;panel.classList.toggle("is-previewing", on);};

const setOpen = (on) => {
  panel.classList.toggle("is-open", on);
  toggle.setAttribute("aria-expanded", on ? "true" : "false");
  if (on) panel.classList.remove("is-previewing");
};

const closePanel = () => {
  setOpen(false);
  panel.classList.remove("is-previewing");
};

toggle.addEventListener("mouseenter", () => setPreview(true));
toggle.addEventListener("mouseleave", () => setPreview(false));

panel.addEventListener("mouseenter", () => {
  if (!panel.classList.contains("is-open")) panel.classList.add("is-previewing");
});

panel.addEventListener("mouseleave", () => {
  if (!panel.classList.contains("is-open")) panel.classList.remove("is-previewing");
});

toggle.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  setOpen(!panel.classList.contains("is-open"));
});

panel.addEventListener("click", (event) => {
  event.stopPropagation();
});

document.addEventListener("click", closePanel);

app.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closePanel();
});

}
