/* BASE-STATION V2 TEST */
/* EXACT V1 BASELINE + TITLE STYLE ONLY */

export { renderBaseStation } from "/modules/base-station-v1.js";

/* 
V2 PHASE 1:
In base-station-v1.js, change ONLY this CSS block:

.ww-title{
  font-size:3.35rem;
  color:#f6c56a;
  margin:0;
  letter-spacing:0.18em;
  font-weight:950;
  text-shadow:
    0 0 18px rgba(240,138,36,0.22),
    0 2px 4px rgba(0,0,0,0.38);
}

This confirms:
- module path works
- V2 naming works
- styling changes apply
- no structural breakage

Once confirmed:
We expand gradually.
*/
