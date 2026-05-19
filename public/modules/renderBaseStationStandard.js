.ww-signal-box{
  position:absolute;
  z-index:95;
  top:3.2%;
  right:3.3%;
  width:56px;
  height:56px;
  border:1px solid rgba(255,197,111,.68);
  border-radius:.8rem;
  background:linear-gradient(180deg, rgba(8,13,19,.90), rgba(4,7,11,.96));
  box-shadow:
    inset 0 0 0 1px rgba(255,255,255,.055),
    inset 0 0 18px rgba(255,197,111,.055),
    0 0 18px rgba(242,178,76,.18),
    0 0 30px rgba(0,0,0,.35);
  display:flex;
  align-items:center;
  justify-content:center;
  overflow:hidden;
  pointer-events:none;
}

.ww-signal-graph{
  position:relative;
  z-index:97;
  width:34px;
  height:32px;
  display:flex;
  align-items:flex-end;
  justify-content:center;
  gap:4px;
}

.ww-signal-graph span{
  position:relative;
  z-index:98;
  display:block;
  width:5px;
  height:var(--bar-height, 12px);
  min-height:6px;
  border-radius:2px 2px 0 0;
  background:linear-gradient(180deg, rgba(255,248,225,.98), rgba(255,198,96,.94));
  box-shadow:
    0 0 8px rgba(255,224,168,.58),
    0 0 16px rgba(242,178,76,.28);
  transition:height 360ms ease, opacity 260ms ease, filter 260ms ease;
  opacity:var(--bar-opacity, .82);
  filter:brightness(var(--bar-brightness, 1));
}
