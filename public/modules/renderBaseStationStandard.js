<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Base Station Menu Variations</title>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  background: #05080b;
  color: white;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
}

.stage {
  min-height: 100vh;
  padding: 48px;
  display: grid;
  grid-template-columns: repeat(3, minmax(260px, 1fr));
  gap: 42px;
  background:
    radial-gradient(circle at 30% 20%, rgba(213, 145, 45, 0.16), transparent 28%),
    linear-gradient(180deg, #070b10, #010203);
}

.panel {
  min-height: 420px;
  padding: 38px 32px;
  border: 1px solid rgba(255, 220, 160, 0.12);
  background:
    linear-gradient(145deg, rgba(255,255,255,0.035), rgba(0,0,0,0.3)),
    #0b0f12;
  box-shadow: inset 0 0 40px rgba(0,0,0,0.6);
}

.label {
  margin-bottom: 28px;
  font-size: 12px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255, 220, 160, 0.5);
}

.menu {
  display: flex;
  flex-direction: column;
}

.menu span {
  display: block;
}

/* VARIATION 1 — Clue Page Style */
.v1 {
  gap: 34px;
  align-items: center;
}

.v1 span {
  font-size: 34px;
  letter-spacing: 0.45em;
  font-weight: 700;
  color: rgba(245,245,245,0.92);
  text-shadow:
    0 3px 10px rgba(0,0,0,0.85),
    0 0 14px rgba(255,255,255,0.12);
}

/* VARIATION 2 — Warm Station */
.v2 {
  gap: 32px;
  align-items: flex-start;
}

.v2 span {
  font-family: Georgia, serif;
  font-size: 38px;
  letter-spacing: 0.28em;
  font-weight: 700;
  color: rgba(255, 224, 170, 0.88);
  text-shadow:
    0 3px 10px rgba(0,0,0,0.9),
    0 0 16px rgba(231,145,45,0.25);
}

/* VARIATION 3 — Minimal Luxury */
.v3 {
  gap: 28px;
  align-items: flex-start;
}

.v3 span {
  font-size: 22px;
  letter-spacing: 0.52em;
  font-weight: 800;
  color: rgba(238,238,238,0.82);
  text-transform: uppercase;
}

.v3 .solve {
  margin-top: 18px;
  color: rgba(255, 218, 155, 0.95);
}

/* VARIATION 4 — Divider Style */
.v4 {
  gap: 30px;
  align-items: center;
}

.v4 span {
  position: relative;
  font-size: 26px;
  letter-spacing: 0.38em;
  font-weight: 800;
  color: rgba(250,250,250,0.88);
}

.v4 span::before,
.v4 span::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 48px;
  height: 1px;
  background: rgba(255,220,160,0.38);
}

.v4 span::before {
  right: calc(100% + 20px);
}

.v4 span::after {
  left: calc(100% + 20px);
}

/* VARIATION 5 — Solve Priority */
.v5 {
  gap: 24px;
  align-items: flex-start;
}

.v5 span {
  font-size: 24px;
  letter-spacing: 0.44em;
  font-weight: 800;
  color: rgba(235,235,235,0.74);
}

.v5 .solve {
  margin-top: 36px;
  font-family: Georgia, serif;
  font-size: 52px;
  letter-spacing: 0.24em;
  color: rgba(255, 229, 180, 0.96);
  text-shadow:
    0 0 16px rgba(231,145,45,0.35),
    0 0 34px rgba(231,145,45,0.18);
}

/* VARIATION 6 — Small Institutional */
.v6 {
  gap: 26px;
  align-items: flex-start;
}

.v6 span {
  font-size: 18px;
  letter-spacing: 0.6em;
  font-weight: 900;
  color: rgba(255,255,255,0.8);
}

.v6 .solve {
  padding-top: 20px;
  border-top: 1px solid rgba(255,220,160,0.25);
  color: rgba(255,222,165,0.9);
}

/* VARIATION 7 — Embedded Glow */
.v7 {
  gap: 34px;
  align-items: center;
}

.v7 span {
  font-family: Georgia, serif;
  font-size: 31px;
  letter-spacing: 0.36em;
  font-weight: 700;
  color: rgba(255, 237, 204, 0.82);
  text-shadow:
    0 2px 5px rgba(0,0,0,0.95),
    0 0 8px rgba(235,148,48,0.22),
    0 0 22px rgba(235,148,48,0.14);
}

/* VARIATION 8 — Left Rail Modern */
.v8 {
  gap: 22px;
  align-items: flex-start;
}

.v8 span {
  padding-left: 18px;
  border-left: 2px solid rgba(255, 198, 110, 0.34);
  font-size: 21px;
  letter-spacing: 0.4em;
  font-weight: 850;
  color: rgba(245,245,245,0.78);
}

.v8 .solve {
  border-left-color: rgba(255, 198, 110, 0.8);
  color: rgba(255, 227, 180, 0.95);
}

/* VARIATION 9 — Quiet Premium */
.v9 {
  gap: 36px;
  align-items: flex-start;
}

.v9 span {
  font-size: 20px;
  letter-spacing: 0.7em;
  font-weight: 700;
  color: rgba(255,255,255,0.66);
}

.v9 .solve {
  color: rgba(255, 221, 170, 0.84);
  font-size: 28px;
}

/* VARIATION 10 — Finalist Candidate */
.v10 {
  gap: 30px;
  align-items: flex-start;
}

.v10 span {
  font-size: 24px;
  letter-spacing: 0.46em;
  font-weight: 850;
  color: rgba(238,238,238,0.84);
  text-shadow:
    0 3px 10px rgba(0,0,0,0.9),
    0 0 10px rgba(255,255,255,0.08);
}

.v10 .solve {
  margin-top: 20px;
  font-family: Georgia, serif;
  font-size: 40px;
  letter-spacing: 0.32em;
  color: rgba(255, 225, 175, 0.94);
  text-shadow:
    0 3px 12px rgba(0,0,0,0.94),
    0 0 18px rgba(231,145,45,0.28);
}
</style>
</head>

<body>
  <main class="stage">

    <section class="panel">
      <div class="label">Variation 1</div>
      <div class="menu v1">
        <span>CLUES</span>
        <span>LIFE</span>
        <span>LEAD</span>
        <span class="solve">SOLVE</span>
      </div>
    </section>

    <section class="panel">
      <div class="label">Variation 2</div>
      <div class="menu v2">
        <span>CLUES</span>
        <span>LIFE</span>
        <span>LEAD</span>
        <span class="solve">SOLVE</span>
      </div>
    </section>

    <section class="panel">
      <div class="label">Variation 3</div>
      <div class="menu v3">
        <span>CLUES</span>
        <span>LIFE</span>
        <span>LEAD</span>
        <span class="solve">SOLVE</span>
      </div>
    </section>

    <section class="panel">
      <div class="label">Variation 4</div>
      <div class="menu v4">
        <span>CLUES</span>
        <span>LIFE</span>
        <span>LEAD</span>
        <span class="solve">SOLVE</span>
      </div>
    </section>

    <section class="panel">
      <div class="label">Variation 5</div>
      <div class="menu v5">
        <span>CLUES</span>
        <span>LIFE</span>
        <span>LEAD</span>
        <span class="solve">SOLVE</span>
      </div>
    </section>

    <section class="panel">
      <div class="label">Variation 6</div>
      <div class="menu v6">
        <span>CLUES</span>
        <span>LIFE</span>
        <span>LEAD</span>
        <span class="solve">SOLVE</span>
      </div>
    </section>

    <section class="panel">
      <div class="label">Variation 7</div>
      <div class="menu v7">
        <span>CLUES</span>
        <span>LIFE</span>
        <span>LEAD</span>
        <span class="solve">SOLVE</span>
      </div>
    </section>

    <section class="panel">
      <div class="label">Variation 8</div>
      <div class="menu v8">
        <span>CLUES</span>
        <span>LIFE</span>
        <span>LEAD</span>
        <span class="solve">SOLVE</span>
      </div>
    </section>

    <section class="panel">
      <div class="label">Variation 9</div>
      <div class="menu v9">
        <span>CLUES</span>
        <span>LIFE</span>
        <span>LEAD</span>
        <span class="solve">SOLVE</span>
      </div>
    </section>

    <section class="panel">
      <div class="label">Variation 10</div>
      <div class="menu v10">
        <span>CLUES</span>
        <span>LIFE</span>
        <span>LEAD</span>
        <span class="solve">SOLVE</span>
      </div>
    </section>

  </main>
</body>
</html>
