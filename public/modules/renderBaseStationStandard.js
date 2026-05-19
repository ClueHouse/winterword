.ww-solve-overlay{
  position:fixed;
  inset:0;
  z-index:400;

  display:flex;
  align-items:center;
  justify-content:center;

  padding:4vh 4vw;

  background:
    radial-gradient(circle at top right, rgba(218,162,50,.16), transparent 34%),
    radial-gradient(circle at bottom left, rgba(70,110,165,.24), transparent 42%),
    rgba(0,0,0,.74);

  backdrop-filter:blur(11px);

  opacity:0;
  pointer-events:none;

  transition:opacity .25s ease;
}

.ww-solve-overlay.is-open{
  opacity:1;
  pointer-events:auto;
}

.ww-solve-card{
  width:min(92vw,760px);
  aspect-ratio:3 / 4;

  position:relative;

  overflow:hidden;

  background-image:url("/assets/winterword/shared/lastword.png");
  background-size:contain;
  background-repeat:no-repeat;
  background-position:center;

  border:none;
  border-radius:0;

  box-shadow:none;

  text-align:center;

  padding:0;

  transform:translateY(10px) scale(.985);

  transition:transform .25s ease;
}

.ww-solve-overlay.is-open .ww-solve-card{
  transform:translateY(0) scale(1);
}

.ww-solve-card::before{
  display:none;
}

.ww-solve-card::after{
  display:none;
}

.ww-solve-kicker{
  position:absolute;
  z-index:3;

  top:13.6%;
  left:50%;

  transform:translateX(-50%);

  width:70%;

  margin:0;

  font-size:0;
  color:transparent;

  pointer-events:none;
}

.ww-solve-heading{
  position:absolute;
  z-index:3;

  top:21%;
  left:50%;

  transform:translateX(-50%);

  width:80%;

  font-size:0;
  color:transparent;

  pointer-events:none;
}

.ww-solve-copy{
  position:absolute;
  z-index:3;

  top:42.2%;
  left:50%;

  transform:translateX(-50%);

  width:70%;

  font-size:0;
  color:transparent;

  pointer-events:none;
}

.ww-solve-button{
  position:absolute;
  z-index:5;

  left:50%;
  top:55.2%;

  transform:translateX(-50%);

  width:53%;
  height:10.2%;

  border-radius:0;

  background:transparent;

  border:none;
  box-shadow:none;

  color:transparent;
  font-size:0;

  text-decoration:none;

  transition:
    transform .18s ease,
    filter .18s ease;
}

.ww-solve-button:hover,
.ww-solve-button:focus-visible{

  transform:translateX(-50%) scale(1.02);

  filter:
    brightness(1.08)
    drop-shadow(0 0 18px rgba(255,177,64,.42));

  outline:none;
}

.ww-solve-warning{
  position:absolute;
  z-index:3;

  left:50%;
  top:76.8%;

  transform:translateX(-50%);

  width:70%;

  font-size:0;
  color:transparent;

  border:none;

  pointer-events:none;
}

.ww-solve-close{
  position:absolute;
  z-index:8;

  top:5.2%;
  right:6.1%;

  width:7%;
  aspect-ratio:1;

  border-radius:999px;

  border:none;
  background:transparent;

  color:transparent;

  cursor:pointer;

  box-shadow:none;

  transition:
    transform .18s ease,
    filter .18s ease;
}

.ww-solve-close:hover,
.ww-solve-close:focus-visible{

  transform:scale(1.06);

  filter:
    brightness(1.08)
    drop-shadow(0 0 12px rgba(255,177,64,.36));

  outline:none;
}
