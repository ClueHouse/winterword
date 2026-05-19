/* =========================================================
   PREMIUM MENU BUTTON
========================================================= */

.ww-menu{
  position:absolute;
  z-index:80;
  top:3.1%;
  right:3.1%;
  width:66px;
  height:66px;
}

.ww-menu-hotspot{
  position:absolute;
  inset:0;

  border-radius:1.25rem;

  border:1.5px solid rgba(181,124,54,.72);

  background:
    linear-gradient(
      180deg,
      rgba(255,255,255,.06),
      rgba(255,255,255,.015)
    ),
    linear-gradient(
      135deg,
      rgba(56,34,16,.58),
      rgba(9,12,18,.82)
    );

  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.08),
    inset 0 0 0 1px rgba(255,210,140,.05),
    0 0 0 1px rgba(0,0,0,.55),
    0 10px 28px rgba(0,0,0,.42),
    0 0 18px rgba(191,128,48,.12);

  backdrop-filter:blur(6px);

  cursor:pointer;

  transition:
    transform .22s ease,
    border-color .22s ease,
    box-shadow .22s ease,
    background .22s ease;
}

.ww-menu-hotspot::before{
  content:"";

  position:absolute;
  inset:1px;

  border-radius:1.15rem;

  background:
    linear-gradient(
      180deg,
      rgba(255,255,255,.045),
      rgba(255,255,255,0)
    );

  pointer-events:none;
}

.ww-menu-hotspot:hover,
.ww-menu-hotspot:focus-visible{

  transform:
    translateY(-1px)
    scale(1.03);

  border-color:
    rgba(236,177,94,.92);

  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.11),
    inset 0 0 0 1px rgba(255,210,140,.08),
    0 0 0 1px rgba(0,0,0,.62),
    0 14px 34px rgba(0,0,0,.5),
    0 0 24px rgba(255,182,72,.22);

  outline:none;
}

.ww-menu-hotspot span,
.ww-menu-hotspot::after{

  content:"";

  position:absolute;

  left:50%;

  width:26px;
  height:2px;

  border-radius:999px;

  background:
    linear-gradient(
      90deg,
      rgba(255,224,173,.88),
      rgba(255,197,111,1),
      rgba(255,224,173,.88)
    );

  transform:
    translateX(-50%);

  box-shadow:
    0 0 10px rgba(255,182,72,.24);
}

.ww-menu-hotspot span{
  top:32px;
}

.ww-menu-hotspot::after{
  top:40px;
}

.ww-menu-hotspot .ww-menu-line-top{
  position:absolute;

  left:50%;
  top:24px;

  width:26px;
  height:2px;

  border-radius:999px;

  background:
    linear-gradient(
      90deg,
      rgba(255,224,173,.88),
      rgba(255,197,111,1),
      rgba(255,224,173,.88)
    );

  transform:
    translateX(-50%);

  box-shadow:
    0 0 10px rgba(255,182,72,.24);
}

/* =========================================================
   GUIDEPOST PANEL REFINEMENT
========================================================= */

.ww-guidepost{

  width:88%;

  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;

  text-align:center;

  gap:1.45rem;

  margin-top:.5rem;

  padding:
    2rem
    2.2rem
    2.1rem;

  border-radius:1.8rem;

  background:
    linear-gradient(
      180deg,
      rgba(255,255,255,.032),
      rgba(255,255,255,.018)
    );

  border:
    2px solid
    rgba(120,78,36,.68);

  box-shadow:
    inset 0 0 0 1px rgba(255,255,255,.018),
    0 0 28px rgba(0,0,0,.22);

  backdrop-filter:blur(2px);
}

.ww-guidepost-title{

  width:100%;

  display:flex;
  align-items:center;
  justify-content:center;

  font-size:
    clamp(15px,1vw,21px);

  letter-spacing:.3em;

  text-transform:uppercase;

  font-weight:950;

  color:
    rgba(255,236,198,.98);

  text-shadow:
    0 2px 10px rgba(0,0,0,.9),
    0 0 14px rgba(255,190,95,.16);
}

.ww-guidepost-title::before,
.ww-guidepost-title::after{
  display:none;
}
