export function renderAnswerList(app, data, navigate) {
  const {
    orgName = "",
    seasonLabel = "WINTERWORD • 2026",
    statusText = "Answers Released",
    title = "ANSWERS",
    subtitle = "The frost has lifted. Every hidden letter is now uncovered.",
    finalWordLabel = "Final WinterWord",
    finalWord = "HOUSEWARMING",
    introText = "Below are the released answers for this WinterWord season. Each clue revealed one letter; together, they formed the final word.",
    answers = [
      { number: "01", title: "Clue One", answer: "H", note: "Answer note coming soon." },
      { number: "02", title: "Clue Two", answer: "O", note: "Answer note coming soon." },
      { number: "03", title: "Clue Three", answer: "U", note: "Answer note coming soon." },
      { number: "04", title: "Clue Four", answer: "S", note: "Answer note coming soon." },
      { number: "05", title: "Clue Five", answer: "E", note: "Answer note coming soon." },
      { number: "06", title: "Clue Six", answer: "W", note: "Answer note coming soon." },
      { number: "07", title: "Clue Seven", answer: "A", note: "Answer note coming soon." },
      { number: "08", title: "Clue Eight", answer: "R", note: "Answer note coming soon." },
      { number: "09", title: "Clue Nine", answer: "M", note: "Answer note coming soon." },
      { number: "10", title: "Clue Ten", answer: "I", note: "Answer note coming soon." },
      { number: "11", title: "Clue Eleven", answer: "N", note: "Answer note coming soon." },
      { number: "12", title: "Clue Twelve", answer: "G", note: "Answer note coming soon." }
    ],
    closingTitle = "Signed, sealed, delivered.",
    closingText = "The trail is quiet now. The clues have fallen. The word has been found.",
    afterwordEmail = "cluehousehq@gmail.com"
  } = data || {};

  function esc(v) {
    return String(v ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  const safeOrgName = String(orgName || "").trim();
  const safeSeasonLabel = esc(seasonLabel);
  const safeStatusText = esc(statusText);
  const safeTitle = esc(title);
  const safeSubtitle = esc(subtitle);
  const safeFinalWordLabel = esc(finalWordLabel);
  const safeFinalWord = esc(finalWord);
  const safeIntroText = esc(introText);
  const safeClosingTitle = esc(closingTitle);
  const safeClosingText = esc(closingText);
  const safeAfterwordEmail = esc(afterwordEmail);

  const seasonParts = safeSeasonLabel.split("•").map((part) => part.trim()).filter(Boolean);
  const leftLabel = seasonParts[0] || "WINTERWORD";
  const rightLabel = seasonParts[1] || "2026";

  const answerCards = Array.isArray(answers)
    ? answers.map((item, index) => {
        const number = esc(item.number || String(index + 1).padStart(2, "0"));
        const itemTitle = esc(item.title || `Clue ${index + 1}`);
        const answer = esc(item.answer || "—");
        const note = esc(item.note || "");

        return `
          <article class="ww-answer-card">
            <div class="ww-answer-topline">
              <span class="ww-answer-number">${number}</span>
              <span class="ww-answer-title">${itemTitle}</span>
            </div>
            <div class="ww-answer-letter">${answer}</div>
            ${note ? `<p class="ww-answer-note">${note}</p>` : ""}
          </article>
        `;
      }).join("")
    : "";

  app.innerHTML = `
    <style>
      :root{
        --ww-ink:#ffffff;
        --ww-ink-soft:rgba(255,255,255,0.84);
        --ww-ink-faint:rgba(255,255,255,0.62);
        --ww-apricot:#ef8f3a;
        --ww-apricot-deep:#d87522;
        --ww-panel-line:1px solid rgba(255,255,255,0.10);
        --ww-panel-text-soft:rgba(214,221,230,0.78);
        --ww-panel-bg:rgba(38,40,34,0.54);
        --ww-panel-bg-soft:rgba(255,255,255,0.045);
      }

      *{box-sizing:border-box;}

      body{
        margin:0;
        min-height:100vh;
        font-family:system-ui,-apple-system,"Segoe UI",sans-serif;
        color:var(--ww-ink);
        background-image:url("/assets/winterword/shared/basestationresolvebg.png");
        background-size:cover;
        background-position:center;
        background-repeat:no-repeat;
        background-attachment:fixed;
      }

      body::before{
        content:"";
        position:fixed;
        inset:0;
        background:
          radial-gradient(ellipse at center, rgba(255,255,255,0.08), rgba(0,0,0,0.12) 44%, rgba(0,0,0,0.34)),
          linear-gradient(180deg, rgba(255,255,255,0.05), rgba(0,0,0,0.10));
        pointer-events:none;
      }

      #app{
        position:relative;
        z-index:1;
        min-height:100vh;
      }

      .ww-answer-wrap{
        max-width:82rem;
        margin:0 auto;
        padding:2.4rem 2rem 2.2rem;
      }

      .ww-hero{
        margin-top:1.2rem;
        margin-bottom:1.2rem;
        padding:2rem 2rem 2.4rem;
        border-radius:1.8rem;
        background:var(--ww-panel-bg);
        backdrop-filter:blur(12px);
        box-shadow:
          0 30px 80px rgba(0,0,0,0.34),
          inset 0 0 0 1px rgba(255,255,255,0.06);
      }

      .ww-slug{
        display:flex;
        flex-wrap:wrap;
        gap:.45rem;
        align-items:center;
        font-size:.72rem;
        letter-spacing:.25em;
        text-transform:uppercase;
        font-weight:900;
        margin:0 0 .6rem;
      }

      .ww-title{
        font-size:4.2rem;
        line-height:1;
        margin:0 0 .7rem;
        font-weight:950;
        letter-spacing:-.04em;
      }

      .ww-subtitle{
        max-width:48rem;
        margin:0;
        font-size:1.08rem;
        line-height:1.65;
        color:var(--ww-ink-soft);
        font-style:italic;
      }

      .ww-status-line{
        display:inline-flex;
        align-items:center;
        gap:.72rem;
        padding:.78rem 1.18rem;
        border-radius:999px;
        background:rgba(0,0,0,0.48);
        font-size:.88rem;
        font-weight:900;
        letter-spacing:.12em;
        margin:1.4rem 0 0;
      }

      .ww-status-dot{
        width:.82rem;
        height:.82rem;
        border-radius:999px;
        background:var(--ww-apricot);
        box-shadow:0 0 22px rgba(239,143,58,0.72);
      }

      .ww-final-panel{
        margin-top:1.8rem;
        padding:1.45rem 1.5rem;
        border-radius:1.55rem;
        background:rgba(0,0,0,0.34);
        border:var(--ww-panel-line);
      }

      .ww-final-label{
        margin:0 0 .35rem;
        font-size:.72rem;
        letter-spacing:.2em;
        text-transform:uppercase;
        font-weight:900;
        color:var(--ww-ink-faint);
      }

      .ww-final-word{
        margin:0;
        font-size:2.5rem;
        line-height:1;
        font-weight:950;
        letter-spacing:.08em;
        color:#fff;
      }

      .ww-intro{
        margin:1.2rem 0 0;
        max-width:58rem;
        color:var(--ww-panel-text-soft);
        line-height:1.75;
      }

      .ww-actions{
        margin-top:1.35rem;
        display:flex;
        flex-wrap:wrap;
        gap:.7rem;
      }

      .ww-primary,
      .ww-secondary{
        padding:.72rem 1.08rem;
        border-radius:999px;
        font-size:.7rem;
        font-weight:900;
        letter-spacing:.14em;
        text-decoration:none;
        border:0;
        cursor:pointer;
      }

      .ww-primary{
        background:var(--ww-apricot);
        color:#fff;
      }

      .ww-secondary{
        background:#fff;
        color:#222;
      }

      .ww-answer-grid{
        display:grid;
        grid-template-columns:repeat(4, minmax(0, 1fr));
        gap:1rem;
        margin-top:1.5rem;
      }

      .ww-answer-card{
        min-height:12rem;
        padding:1.2rem 1.15rem;
        border-radius:1.45rem;
        background:var(--ww-panel-bg-soft);
        border:var(--ww-panel-line);
        backdrop-filter:blur(8px);
        box-shadow:0 16px 38px rgba(0,0,0,0.18);
      }

      .ww-answer-topline{
        display:flex;
        align-items:center;
        gap:.55rem;
        margin-bottom:.9rem;
      }

      .ww-answer-number{
        display:inline-flex;
        align-items:center;
        justify-content:center;
        width:2.25rem;
        height:2.25rem;
        border-radius:999px;
        background:rgba(239,143,58,0.18);
        color:#fff;
        font-size:.72rem;
        font-weight:950;
      }

      .ww-answer-title{
        font-size:.74rem;
        text-transform:uppercase;
        letter-spacing:.13em;
        font-weight:900;
        color:var(--ww-ink-soft);
      }

      .ww-answer-letter{
        font-size:3.2rem;
        line-height:1;
        font-weight:950;
        color:#fff;
        letter-spacing:.02em;
      }

      .ww-answer-note{
        margin:.8rem 0 0;
        font-size:.9rem;
        line-height:1.55;
        color:var(--ww-panel-text-soft);
      }

      .ww-closing{
        margin-top:1.2rem;
        padding:1.4rem 1.45rem;
        border-radius:1.55rem;
        background:rgba(38,40,34,0.56);
        backdrop-filter:blur(10px);
      }

      .ww-closing h3{
        margin:0 0 .55rem;
        font-size:1.08rem;
        font-weight:950;
      }

      .ww-closing p{
        margin:0;
        color:var(--ww-ink-soft);
        font-style:italic;
        line-height:1.55;
      }

      @media (max-width: 1000px){
        .ww-answer-grid{
          grid-template-columns:repeat(3, minmax(0, 1fr));
        }
      }

      @media (max-width: 760px){
        .ww-answer-wrap{
          padding:1.2rem 1rem 1.4rem;
        }

        .ww-hero{
          padding:1.4rem 1.2rem 1.6rem;
        }

        .ww-title{
          font-size:3rem;
        }

        .ww-final-word{
          font-size:1.75rem;
        }

        .ww-answer-grid{
          grid-template-columns:1fr;
        }
      }
    </style>

    <div class="ww-answer-wrap">
      <section class="ww-hero">

        <div class="ww-slug">
          <span>${esc(leftLabel)}</span>
          ${safeOrgName ? `<span>•</span><span>${esc(safeOrgName)}</span>` : ""}
          <span>•</span>
          <span>${esc(rightLabel)}</span>
        </div>

        <h1 class="ww-title">${safeTitle}</h1>
        <p class="ww-subtitle">${safeSubtitle}</p>

        <div class="ww-status-line">
          <span class="ww-status-dot"></span>
          <span>${safeStatusText}</span>
        </div>

        <div class="ww-final-panel">
          <p class="ww-final-label">${safeFinalWordLabel}</p>
          <p class="ww-final-word">${safeFinalWord}</p>
        </div>

        <p class="ww-intro">${safeIntroText}</p>

        <div class="ww-actions">
          <button class="ww-primary" id="wwBaseButton" type="button">Base Station</button>
          <button class="ww-secondary" id="wwLeaderboardButton" type="button">Leaderboard</button>
          <a class="ww-secondary" href="mailto:${safeAfterwordEmail}?subject=WinterWord%20Afterword">Afterword</a>
        </div>

        <div class="ww-answer-grid">
          ${answerCards}
        </div>

        <div class="ww-closing">
          <h3>${safeClosingTitle}</h3>
          <p>${safeClosingText}</p>
        </div>

      </section>
    </div>
  `;

  const baseButton = document.getElementById("wwBaseButton");
  const leaderboardButton = document.getElementById("wwLeaderboardButton");

  if (baseButton) {
    baseButton.onclick = function () {
      navigate("base-resolve");
    };
  }

  if (leaderboardButton) {
    leaderboardButton.onclick = function () {
      navigate("leaderboard");
    };
  }
}
