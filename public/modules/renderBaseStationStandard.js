/* SHELL SCALE / PILL CONTAINER REFINEMENT ONLY
   Replace ONLY these sections inside renderBaseStationStandard
*/

/* --- REPLACE #wwPortal --- */
#wwPortal{
  width:100vw;
  height:100vh;
  overflow:hidden;
  background:
    radial-gradient(circle at top right, rgba(218,162,50,0.08), transparent 35%),
    radial-gradient(circle at bottom left, rgba(32,58,92,0.18), transparent 40%),
    linear-gradient(180deg,#020609 0%, #07111c 100%);
  font-family:system-ui,-apple-system,"Segoe UI",sans-serif;
  color:#f5efe3;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:2.5vh 2.5vw;
}

/* --- REPLACE #wwStage --- */
#wwStage{
  position:relative;
  width:min(92vw,163vh);
  height:min(51.75vw,92vh);
  overflow:hidden;
  background:#020609;
  border-radius:2.2rem;
  box-shadow:
    0 28px 90px rgba(0,0,0,0.58),
    0 0 0 1px rgba(218,162,50,0.08),
    inset 0 0 40px rgba(255,180,50,0.03);
}

/* --- REPLACE .ww-shell --- */
.ww-shell{
  position:absolute;
  inset:0;
  width:100%;
  height:100%;
  object-fit:cover;
  user-select:none;
  pointer-events:none;
}

/* --- REPLACE RESPONSIVE RULES --- */
@media (max-aspect-ratio: 16 / 9){
  #wwStage{
    width:92vw;
    height:calc(92vw * 0.5625);
  }
}

@media (min-aspect-ratio: 16 / 9){
  #wwStage{
    width:calc(92vh * 1.77778);
    height:92vh;
  }
}
