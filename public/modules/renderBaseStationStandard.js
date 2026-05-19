export function renderBaseStationStandard(app, data = {}, navigate) {
  app.innerHTML = `
<style>
*{box-sizing:border-box}
html,body{margin:0;padding:0}
body{background:#000}

#wwPortal{
  width:100vw;
  height:100vh;
  overflow:auto;
  background:#05080b;
  color:white;
  font-family:system-ui,-apple-system,"Segoe UI",sans-serif;
}

.stage{
  min-height:100vh;
  padding:48px;
  display:grid;
  grid-template-columns:repeat(3,minmax(260px,1fr));
  gap:42px;
  background:
    radial-gradient(circle at 30% 20%, rgba(213,145,45,.16), transparent 28%),
    linear-gradient(180deg,#070b10,#010203);
}

.panel{
  min-height:420px;
  padding:38px 32px;
  border:1px solid rgba(255,220,160,.12);
  background:linear-gradient(145deg,rgba(255,255,255,.035),rgba(0,0,0,.3)),#0b0f12;
  box-shadow:inset 0 0 40px rgba(0,0,0,.6);
}

.label{
  margin-bottom:28px;
  font-size:12px;
  letter-spacing:.22em;
  text-transform:uppercase;
  color:rgba(255,220,160,.5);
}

.menu{display:flex;flex-direction:column}
.menu span{display:block}

.v1{gap:34px;align-items:center}
.v1 span{font-size:34px;letter-spacing:.45em;font-weight:700;color:rgba(245,245,245,.92)}

.v2{gap:32px;align-items:flex-start}
.v2 span{font-family:Georgia,serif;font-size:38px;letter-spacing:.28em;font-weight:700;color:rgba(255,224,170,.88)}

.v3{gap:28px;align-items:flex-start}
.v3 span{font-size:22px;letter-spacing:.52em;font-weight:800;color:rgba(238,238,238,.82)}
.v3 .solve{margin-top:18px;color:rgba(255,218,155,.95)}

.v4{gap:30px;align-items:center}
.v4 span{position:relative;font-size:26px;letter-spacing:.38em;font-weight:800;color:rgba(250,250,250,.88)}
.v4 span::before,.v4 span::after{content:"";position:absolute;top:50%;width:48px;height:1px;background:rgba(255,220,160,.38)}
.v4 span::before{right:calc(100% + 20px)}
.v4 span::after{left:calc(100% + 20px)}

.v5{gap:24px;align-items:flex-start}
.v5 span{font-size:24px;letter-spacing:.44em;font-weight:800;color:rgba(235,235,235,.74)}
.v5 .solve{margin-top:36px;font-family:Georgia,serif;font-size:52px;letter-spacing:.24em;color:rgba(255,229,180,.96)}

.v6{gap:26px;align-items:flex-start}
.v6 span{font-size:18px;letter-spacing:.6em;font-weight:900;color:rgba(255,255,255,.8)}
.v6 .solve{padding-top:20px;border-top:1px solid rgba(255,220,160,.25);color:rgba(255,222,165,.9)}

.v7{gap:34px;align-items:center}
.v7 span{font-family:Georgia,serif;font-size:31px;letter-spacing:.36em;font-weight:700;color:rgba(255,237,204,.82)}

.v8{gap:22px;align-items:flex-start}
.v8 span{padding-left:18px;border-left:2px solid rgba(255,198,110,.34);font-size:21px;letter-spacing:.4em;font-weight:850;color:rgba(245,245,245,.78)}
.v8 .solve{border-left-color:rgba(255,198,110,.8);color:rgba(255,227,180,.95)}

.v9{gap:36px;align-items:flex-start}
.v9 span{font-size:20px;letter-spacing:.7em;font-weight:700;color:rgba(255,255,255,.66)}
.v9 .solve{color:rgba(255,221,170,.84);font-size:28px}

.v10{gap:30px;align-items:flex-start}
.v10 span{font-size:24px;letter-spacing:.46em;font-weight:850;color:rgba(238,238,238,.84)}
.v10 .solve{margin-top:20px;font-family:Georgia,serif;font-size:40px;letter-spacing:.32em;color:rgba(255,225,175,.94)}
</style>

<div id="wwPortal">
  <main class="stage">
    ${[1,2,3,4,5,6,7,8,9,10].map(n => `
      <section class="panel">
        <div class="label">Variation ${n}</div>
        <div class="menu v${n}">
          <span>CLUES</span>
          <span>LIFE</span>
          <span>LEAD</span>
          <span class="solve">SOLVE</span>
        </div>
      </section>
    `).join("")}
  </main>
</div>
`;
}
