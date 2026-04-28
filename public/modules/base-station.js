export function renderBaseStation(app, data = {}, navigate) {
  const {
    orgName = "WinterWord",
    seasonLabel = "WINTERWORD • 2026",
    introLine1 = "A letter per week from a wintry scroll,",
    introLine2 = "Piece them together — reveal the whole.",
    howParagraphs = [],
    updatesText = "",
    currentClue = 0,
    totalClues = 12,
    lifelineAvailable = false,
    lifelineUnlockClue = 6,
    popClueLive = false
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

  const paragraphs =
    Array.isArray(howParagraphs) && howParagraphs.length
      ? howParagraphs
      : [
          "Each week, a new clue will quietly unlock — each one revealing a single letter.",
          "Guard your answers, for as the season unfolds, they will begin to shift and settle… forming the anagram of the Winterword.",
          "If you feel the answer stirring early, step forward and claim your place on the leaderboard.",
          "But remember — one guess is all you get."
        ];

  const progressText = `${Number(currentClue) || 0} of ${Number(totalClues) || 12} clues released`;

  const reportProblemHref =
    `mailto:fix@cluehouse.co.nz?subject=WinterWord%20Issue%20-%20${encodedOrgName}&body=SET%20THE%20SCENE%3A%0AWhich%20page%20were%20you%20on%3F%0A%0APLOT%20TWIST%3A%0AWhat%20went%20wrong%3F%0A%0AALTERNATE%20ENDING%3A%0AWhat%20did%20you%20expect%20to%20happen%3F%0A%0AYOUR%20TRAVELLER%E2%80%99S%20GEAR%3A%0AWhich%20device%20%2B%20browser%20you%20brought%20on%20this%20journey.%0A%0AThanks%20for%20sharing%20%E2%80%94%20we%E2%80%99ll%20follow%20the%20trail%20and%20set%20things%20right.`;

  const subscribeHref =
    `mailto:opt@cluehouse.co.nz?subject=WinterWord%20Subscribe%20-%20${encodedOrgName}&body=Sign%20me%20up.%20The%20winter%20hush%20is%20starting%20to%20feel%20personal.`;

  const unsubscribeHref =
    `mailto:opt@cluehouse.co.nz?subject=WinterWord%20Unsubscribe%20-%20${encodedOrgName}&body=Remove%20me%20from%20Winterword%20Clue%20Alerts.%20I%E2%80%99m%20embracing%20the%20quiet%20freeze%20of%20an%20uncluttered%20inbox.`;

  const solveHref =
    `mailto:key@cluehouse.co.nz?subject=FINAL%20Winterword%20Submission%20-%20${encodedOrgName}%20-%202026&body=You%20feel%20the%20pieces%20have%20settled.%0A%0AClues%20gathered.%20Letters%20found.%0AA%20pattern%2C%20perhaps%2C%20now%20clear%20beneath%20the%20frost.%0A%0AIf%20you%20believe%20you%20can%20name%20the%20WinterWord%2C%0Aset%20it%20down%20below.%0A%0AYour%20answer%3A%0A%0A%0A%0A(Only%20one%20submission%20is%20counted.%0AChoose%20your%20moment%20%E2%80%94%20winter%20does%20not%20answer%20twice.)`;

  const contactHref =
    `mailto:hq@cluehouse.co.nz?subject=Clue%20House%20Enquiry`;

  app.innerHTML = `
    <style>
      :root{
        --ww-night-0:#070c12;
        --ww-night-1:#0b141d;
        --ww-night-2:#13202c;
        --ww-ink-night:#d6dde6;
        --ww-muted-night:rgba(214,221,230,0.68);
        --ww-hairline-night:rgba(255,255,255,0.10);
        --ww-white-ink:#1a2330;
        --ww-white-muted:rgba(26,35,48,0.64);
        --ww-orange:#f08a24;
        --ww-tooltip-orange-top:#f7d8b2;
        --ww-tooltip-orange-bot:#efbe86;
        --ww-tooltip-ink:#2b1e12;
        --ww-tooltip-title:#6d4a24;
        --ww-tooltip-border:#b87629;
        --ww-radius:0.85rem;
        --ww-left-wide:13.5rem;
        --ww-rail-bg:linear-gradient(90deg, var(--ww-night-0) 0%, var(--ww-night-1) 34%, var(--ww-night-2) 100%);
        --ww-page-bg:
          radial-gradient(760px 300px at 50% 0%, rgba(155,185,201,0.06), transparent 68%),
          radial-gradient(1200px 700px at 20% 18%, rgba(255,255,255,0.035), transparent 60%),
          radial-gradient(900px 560px at 78% 30%, rgba(155,185,201,0.025), transparent 62%),
          linear-gradient(90deg, var(--ww-night-0) 0%, var(--ww-night-1) 34%, var(--ww-night-2) 100%);
        --ww-tooltip-bg:linear-gradient(180deg, var(--ww-tooltip-orange-top), var(--ww-tooltip-orange-bot));
        --ww-tooltip-shadow:
          0 24px 46px rgba(0,0,0,0.26),
          0 0 0 1px rgba(255,255,255,0.14) inset,
          0 12px 24px rgba(255,255,255,0.10) inset,
          0 -8px 20px rgba(201,124,41,0.08) inset;
        --ww-panel-line:1px solid var(--ww-hairline-night);
        --ww-panel-text:rgba(214,221,230,0.90);
        --ww-panel-text-soft:rgba(214,221,230,0.74);
        --ww-panel-bg-rules:linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.038));
        --ww-panel-bg-updates:rgba(255,255,255,0.035);
        --ww-panel-shadow-rules:0 16px 44px rgba(0,0,0,0.35);
        --ww-panel-border-updates:rgba(255,255,255,0.085);
        --ww-premium-card-bg:linear-gradient(180deg, rgba(255,255,255,0.96), rgba(236,228,214,0.98));
        --ww-premium-card-border:1px solid rgba(202,162,74,0.72);
        --ww-premium-card-shadow:
          0 32px 95px rgba(0,0,0,0.68),
          0 0 0 1px rgba(255,255,255,0.42) inset,
          0 16px 28px rgba(202,162,74,0.08) inset;
        --ww-primary-bg:linear-gradient(180deg, #243242 0%, #192532 100%);
        --ww-primary-border:1px solid rgba(26,35,48,0.86);
        --ww-primary-shadow:
          0 12px 26px rgba(0,0,0,0.22),
          0 0 0 1px rgba(255,255,255,0.07) inset,
          0 10px 20px rgba(240,138,36,0.08);
        --ww-primary-shadow-hover:
          0 16px 32px rgba(0,0,0,0.28),
          0 0 0 1px rgba(255,255,255,0.07) inset,
          0 12px 24px rgba(240,138,36,0.12);
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
        overflow:visible;
        flex:0 0 var(--ww-left-wide);
      }

      .ww-rail{
        position:absolute;
        inset:0;
        background:var(--ww-rail-bg);
        overflow:visible;
      }

      .ww-rail--pop-live{
        animation:wwRailOrangePulse 2.2s ease-in-out infinite;
      }

      @keyframes wwRailOrangePulse{
        0%,100%{
          background:linear-gradient(90deg, rgba(7,12,18,1) 0%, rgba(11,20,29,1) 34%, rgba(19,32,44,1) 100%);
          box-shadow:inset -1px 0 0 rgba(240,138,36,0.92), 0 0 0 rgba(240,138,36,0);
        }

        50%{
          background:linear-gradient(90deg, rgba(38,18,6,1) 0%, rgba(78,34,8,1) 34%, rgba(130,54,10,1) 100%);
          box-shadow:inset -2px 0 0 rgba(240,138,36,1), 0 0 28px rgba(240,138,36,0.38);
        }
      }

      /* REMAINDER OF ORIGINAL CODE CONTINUES EXACTLY AS BEFORE */

    </style>

    <div id="wwPortal">
      <aside id="wwLeft">
        <div class="ww-rail ${popClueLive ? "ww-rail--pop-live" : ""}">
          <div class="ww-left-shell">
