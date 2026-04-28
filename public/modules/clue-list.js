<!-- ======================================================
WINTERWORD — CLUE LIST
FULL GITHUB / CLOUDFLARE LIVE VERSION
Airtable org-state connected
Season-dependent clue progression
Fixed left rail + scrollable clue stack
====================================================== -->

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

body{
  font-family:system-ui,-apple-system,"Segoe UI",sans-serif;
  color:var(--ww-ink);
  background:
    radial-gradient(1200px 700px at 18% 18%, rgba(255,255,255,0.04), transparent 60%),
    radial-gradient(900px 520px at 82% 22%, rgba(224,182,182,0.08), transparent 58%),
    linear-gradient(135deg, var(--ww-bg-1) 0%, var(--ww-bg-2) 48%, var(--ww-bg-3) 100%);
}

#wwPage{
  min-height:100vh;
  padding:2rem;
  overflow:hidden;
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

/* LEFT SIDE */
.ww-side{
  height:100%;
  display:flex;
  align-items:center;
  justify-content:center;
}

.ww-side-logo{
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:.85rem;
  text-decoration:none;
}

.ww-side-logo img{
  width:8.2rem;
  display:block;
}

.ww-side-divider{
  width:44px;
  height:1px;
  background:rgba(255,255,255,0.22);
}

.ww-side-label{
  font-size:.82rem;
  letter-spacing:.22em;
  text-transform:uppercase;
  font-weight:900;
  color:#ffffff;
  white-space:nowrap;
}

/* RIGHT SIDE */
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
  justify-content:center;
  gap:28px;
  font-size:.98rem;
  font-weight:950;
  letter-spacing:.20em;
  text-transform:uppercase;
  color:#ecf3fa;
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
  text-decoration:none;
  white-space:nowrap;
}

.ww-open:hover{
  background:rgba(157,195,214,0.24);
}

/* MOBILE */
@media (max-width:760px){
  #wwContent{
    grid-template-columns:1fr;
  }

  .ww-status{
    flex-direction:column;
    align-items:center;
    gap:.6rem;
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
        <a href="/base-station" class="ww-side-logo" aria-label="Base Station">
          <img src="/assets/winterword/shared/logo.png" alt="WinterWord">
          <div class="ww-side-divider"></div>
          <div class="ww-side-label">BASE STATION</div>
        </a>
      </aside>

      <main class="ww-main">
        <div class="ww-scroll">
          <section class="ww-wrap">
            <div class="ww-cllist">

              <div class="ww-status">
                <span id="wwStatusCurrent">Loading...</span>
                <span id="wwStatusNext">Loading...</span>
              </div>

              <!-- CLUES -->
              <!-- Repeatable stack -->
              <script>
                const clueAssets = [
                  "01.png","02.png","03.png","04.png","05.png","06.png",
                  "07.png","08.png","09.png","10.png","11.png","12.gif"
                ];

                const clueNames = [
                  "one","two","three","four","five","six",
                  "seven","eight","nine","ten","eleven","twelve"
                ];

                document.write(
                  clueAssets.slice().reverse().map((file, i) => {
                    const clueNum = 12 - i;
                    const padded = String(clueNum).padStart(2,"0");
                    return `
                    <article class="ww-banner" data-clue="${clueNum}">
                      <div class="ww-clrow">
                        <div class="ww-img">
                          <img src="/assets/winterword/display/${file}" alt="Clue ${clueNames[clueNum-1]}">
                        </div>
                        <div class="ww-meta">
                          <div class="ww-meta-copy">
                            <div class="ww-kicker">CLUE</div>
                            <div class="ww-num">${clueNames[clueNum-1]}</div>
                            <div class="ww-line"></div>
                          </div>
                          <a class="ww-open" href="/clues/${padded}">OPEN →</a>
                        </div>
                      </div>
                    </article>`;
                  }).join("")
                );
              </script>

            </div>
          </section>
        </div>
      </main>

    </div>
  </div>
</div>

<script>
(async function(){

  const API_ENDPOINT = "https://winterword-assets.vercel.app/api/org-state";
  const shell = document.getElementById("wwShell");
  const statusCurrentEl = document.getElementById("wwStatusCurrent");
  const statusNextEl = document.getElementById("wwStatusNext");
  const clueCards = Array.from(document.querySelectorAll(".ww-banner"));

  function stopRendering(){
    if(shell) shell.style.display = "none";
  }

  function getOrgSlug(){
    const path = window.location.pathname.replace(/^\/+/,'').split('/')[0];
    return path || "";
  }

  function parseDate(value){
    if(!value) return null;
    const d = new Date(value);
    return isNaN(d) ? null : d;
  }

  function getIntervalMs(freq){
    switch(String(freq || "").toLowerCase()){
      case "weekly": return 7*24*60*60*1000;
      case "daily": return 24*60*60*1000;
      case "hourly": return 60*60*1000;
      case "quarter_hourly": return 15*60*1000;
      default: return null;
    }
  }

  function formatNextUnlock(date, timezone){
    if(!date) return "Next Unlock · TBC";

    try{
      const weekday = new Intl.DateTimeFormat("en-NZ", {
        weekday:"short",
        timeZone:timezone || undefined
      }).format(date);

      const time = new Intl.DateTimeFormat("en-NZ", {
        hour:"2-digit",
        minute:"2-digit",
        hour12:false,
        timeZone:timezone || undefined
      }).format(date);

      return `Next Unlock · ${weekday} ${time}`;
    }catch(e){
      return "Next Unlock · TBC";
    }
  }

  function updateClueVisibility(currentClue){
    clueCards.forEach(card => {
      const num = Number(card.dataset.clue);
      card.style.display = num <= currentClue ? "" : "none";
    });
  }

  try{

    const org = getOrgSlug();

    if(!org){
      stopRendering();
      return;
    }

    const response = await fetch(`${API_ENDPOINT}?org=${encodeURIComponent(org)}`);
    const data = await response.json();

    if(!response.ok || !data.ok || !data.is_visible){
      stopRendering();
      return;
    }

    const currentClue = Number(data.current_clue || 0);
    const totalClues = Number(data.total_clues || 12);

    updateClueVisibility(currentClue);

    if(data.is_complete){
      statusCurrentEl.textContent = "Season Complete";
      statusNextEl.textContent = "All Clues Available";
      return;
    }

    statusCurrentEl.textContent = currentClue > 0
      ? `Week ${currentClue} Available`
      : "No Clues Available Yet";

    const seasonStart = parseDate(data.season_start);
    const interval = getIntervalMs(data.drop_frequency);

    if(seasonStart && interval && currentClue < totalClues){
      const nextUnlock = new Date(seasonStart.getTime() + (currentClue * interval));
      statusNextEl.textContent = formatNextUnlock(nextUnlock, data.timezone);
    } else {
      statusNextEl.textContent = "All Clues Available";
    }

  } catch(err){
    console.error("WinterWord Clue List failed:", err);
    stopRendering();
  }

})();
</script>
