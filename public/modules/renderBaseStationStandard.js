export function renderBaseStationStandard(app) {

app.innerHTML = `
<style>
*{
  box-sizing:border-box;
}

html,body{
  margin:0;
  padding:0;
  background:#000;
  font-family:system-ui,sans-serif;
}

#wwPortal{
  min-height:100vh;
  padding:48px;
  background:
    radial-gradient(circle at top right, rgba(214,140,36,.12), transparent 28%),
    linear-gradient(180deg,#05080c,#010203);
}

.stage{
  display:grid;
  grid-template-columns:repeat(4,minmax(240px,1fr));
  gap:34px;
}

.panel{
  min-height:380px;
  padding:34px 28px;
  background:#0b0f12;
  border:1px solid rgba(255,255,255,.06);
  box-shadow:
    inset 0 0 24px rgba(0,0,0,.55),
    0 12px 30px rgba(0,0,0,.45);
}

.label{
  margin-bottom:28px;
  color:rgba(255,220,170,.45);
  font-size:11px;
  letter-spacing:.24em;
  text-transform:uppercase;
}

.menu{
  display:flex;
  flex-direction:column;
}

.menu span{
  display:block;
}

/* ========== V1 ========== */

.v1{
  gap:28px;
}

.v1 span{
  font-family:"Courier New",monospace;
  font-size:36px;
  font-weight:700;
  letter-spacing:.22em;
  color:#f3f3f3;
}

.v1 .solve{
  margin-top:18px;
  color:#f2b24c;
}

/* ========== V2 ========== */

.v2{
  gap:24px;
}

.v2 span{
  font-family:"Lucida Console",monospace;
  font-size:34px;
  font-weight:700;
  letter-spacing:.38em;
  color:#ffffff;
}

.v2 .solve{
  margin-top:24px;
  color:#ffbf66;
}

/* ========== V3 ========== */

.v3{
  gap:22px;
}

.v3 span{
  font-family:"Courier New",monospace;
  font-size:32px;
  font-weight:700;
  letter-spacing:.52em;
  color:#ededed;
  text-shadow:
    0 0 12px rgba(255,255,255,.06);
}

.v3 .solve{
  margin-top:34px;
  color:#f2a93b;
  text-shadow:
    0 0 14px rgba(242,169,59,.25);
}

/* ========== V4 ========== */

.v4{
  gap:26px;
}

.v4 span{
  width:max-content;
  padding-bottom:10px;
  border-bottom:1px solid rgba(255,255,255,.08);
  font-family:"Courier New",monospace;
  font-size:30px;
  font-weight:700;
  letter-spacing:.42em;
  color:#f1f1f1;
}

.v4 .solve{
  margin-top:26px;
  border-bottom-color:rgba(242,178,76,.32);
  color:#f2b24c;
}

/* ========== V5 ========== */

.v5{
  gap:18px;
}

.v5 span{
  font-family:"Consolas",monospace;
  font-size:40px;
  font-weight:700;
  letter-spacing:.16em;
  color:#ffffff;
}

.v5 .solve{
  margin-top:30px;
  font-size:56px;
  color:#ffbe5e;
}

/* ========== V6 ========== */

.v6{
  gap:30px;
}

.v6 span{
  position:relative;
  width:max-content;
  padding-left:18px;
  font-family:"Courier New",monospace;
  font-size:28px;
  font-weight:700;
  letter-spacing:.44em;
  color:#f4f4f4;
}

.v6 span::before{
  content:"";
  position:absolute;
  left:0;
  top:50%;
  width:6px;
  height:1px;
  background:rgba(255,255,255,.25);
}

.v6 .solve{
  margin-top:26px;
  color:#f2b24c;
}

.v6 .solve::before{
  background:rgba(242,178,76,.55);
}

/* ========== V7 ========== */

.v7{
  gap:24px;
  align-items:center;
}

.v7 span{
  font-family:"Courier New",monospace;
  font-size:30px;
  font-weight:700;
  letter-spacing:.58em;
  color:#f7f7f7;
}

.v7 .solve{
  margin-top:34px;
  font-size:42px;
  color:#ffc56f;
  text-shadow:
    0 0 18px rgba(255,185,80,.18);
}

/* ========== V8 ========== */

.v8{
  gap:20px;
}

.v8 span{
  width:100%;
  font-family:"Consolas",monospace;
  font-size:34px;
  font-weight:700;
  letter-spacing:.24em;
  color:#f4f4f4;
  display:flex;
  justify-content:space-between;
}

.v8 .solve{
  margin-top:32px;
  color:#f2b24c;
}
</style>

<div id="wwPortal">

  <main class="stage">

    <section class="panel">
      <div class="label">Variation 1</div>
      <div class="menu v1">
        <span>CLUE</span>
        <span>LIFE</span>
        <span>LEAD</span>
        <span class="solve">SOLVE</span>
      </div>
    </section>

    <section class="panel">
      <div class="label">Variation 2</div>
      <div class="menu v2">
        <span>CLUE</span>
        <span>LIFE</span>
        <span>LEAD</span>
        <span class="solve">SOLVE</span>
      </div>
    </section>

    <section class="panel">
      <div class="label">Variation 3</div>
      <div class="menu v3">
        <span>CLUE</span>
        <span>LIFE</span>
        <span>LEAD</span>
        <span class="solve">SOLVE</span>
      </div>
    </section>

    <section class="panel">
      <div class="label">Variation 4</div>
      <div class="menu v4">
        <span>CLUE</span>
        <span>LIFE</span>
        <span>LEAD</span>
        <span class="solve">SOLVE</span>
      </div>
    </section>

    <section class="panel">
      <div class="label">Variation 5</div>
      <div class="menu v5">
        <span>CLUE</span>
        <span>LIFE</span>
        <span>LEAD</span>
        <span class="solve">SOLVE</span>
      </div>
    </section>

    <section class="panel">
      <div class="label">Variation 6</div>
      <div class="menu v6">
        <span>CLUE</span>
        <span>LIFE</span>
        <span>LEAD</span>
        <span class="solve">SOLVE</span>
      </div>
    </section>

    <section class="panel">
      <div class="label">Variation 7</div>
      <div class="menu v7">
        <span>CLUE</span>
        <span>LIFE</span>
        <span>LEAD</span>
        <span class="solve">SOLVE</span>
      </div>
    </section>

    <section class="panel">
      <div class="label">Variation 8</div>
      <div class="menu v8">
        <span><b>C</b><b>L</b><b>U</b><b>E</b></span>
        <span><b>L</b><b>I</b><b>F</b><b>E</b></span>
        <span><b>L</b><b>E</b><b>A</b><b>D</b></span>
        <span class="solve">SOLVE</span>
      </div>
    </section>

  </main>

</div>
`;
}
