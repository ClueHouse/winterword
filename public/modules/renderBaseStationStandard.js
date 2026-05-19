.ww-word-nav{
  position:absolute;
  z-index:24;
  left:8.6%;
  top:22%;
  width:22%;
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:3.2vh;
}

.ww-word-link{
  appearance:none;
  position:relative;
  display:block;
  width:max-content;
  padding:0;
  margin:0;
  border:0;
  background:transparent;
  cursor:pointer;
  text-decoration:none;

  font-family:"Courier New",monospace;
  font-size:clamp(30px,2.2vw,42px);
  font-weight:700;
  line-height:1;

  letter-spacing:.58em;
  text-transform:uppercase;

  color:#f7f7f7;

  text-shadow:
    0 3px 10px rgba(0,0,0,.88),
    0 0 10px rgba(255,255,255,.05);

  transition:
    transform 170ms ease,
    color 170ms ease,
    text-shadow 170ms ease,
    filter 170ms ease;
}

.ww-word-link::before{
  content:"";
  position:absolute;
  top:-40%;
  left:-70%;
  width:34%;
  height:180%;

  background:linear-gradient(
    90deg,
    transparent 0%,
    rgba(255,255,255,.06) 28%,
    rgba(255,231,170,.44) 50%,
    rgba(255,255,255,.06) 72%,
    transparent 100%
  );

  transform:rotate(22deg);

  opacity:0;
  pointer-events:none;
}

.ww-word-link:hover,
.ww-word-link:focus-visible{
  transform:translateY(-2px);

  color:#ffffff;

  text-shadow:
    0 3px 12px rgba(0,0,0,.92),
    0 0 14px rgba(255,255,255,.10),
    0 0 28px rgba(255,255,255,.08);

  filter:brightness(1.04);

  outline:none;
}

.ww-word-link:hover::before,
.ww-word-link:focus-visible::before{
  animation:wwWordSweep 940ms ease-out forwards;
}

.ww-word-link[data-disabled="true"]{
  cursor:pointer;
}

.ww-word-link[data-disabled="true"]:hover,
.ww-word-link[data-disabled="true"]:focus-visible{
  color:rgba(255,210,195,.95);

  text-shadow:
    0 3px 12px rgba(0,0,0,.92),
    0 0 16px rgba(190,42,42,.22),
    0 0 30px rgba(120,12,12,.18);
}

.ww-word-link[data-disabled="true"]::before{
  display:none;
}

.ww-word-solve{
  margin-top:3.6vh;

  font-size:clamp(42px,3.4vw,72px);

  color:#ffc56f;

  text-shadow:
    0 4px 14px rgba(0,0,0,.94),
    0 0 18px rgba(255,185,80,.18);
}

.ww-word-solve:hover,
.ww-word-solve:focus-visible{
  color:#ffd08b;

  text-shadow:
    0 4px 16px rgba(0,0,0,.96),
    0 0 22px rgba(255,185,80,.28),
    0 0 42px rgba(255,185,80,.18);
}

@keyframes wwWordSweep{
  0%{
    left:-70%;
    opacity:0;
  }

  18%{
    opacity:1;
  }

  100%{
    left:128%;
    opacity:0;
  }
}
