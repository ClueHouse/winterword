/* APPLY TO ALL 3 NAV BUTTONS */
.ww-hotspot-base::before,
.ww-hotspot-clues::before,
.ww-hotspot-life::before {
  content: "";
  position: absolute;
  top: -40%;
  left: -80%;
  width: 42%;
  height: 180%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255,255,255,0.10) 35%,
    rgba(230,245,255,0.42) 50%,
    rgba(255,255,255,0.10) 65%,
    transparent 100%
  );
  transform: rotate(22deg);
  opacity: 0;
  pointer-events: none;
}

.ww-hotspot-base:hover::before,
.ww-hotspot-clues:hover::before,
.ww-hotspot-life:hover::before {
  animation: wwSilverSweep 900ms ease-out forwards;
}

.ww-hotspot-base:hover,
.ww-hotspot-clues:hover,
.ww-hotspot-life:hover {
  background: transparent;
  box-shadow: none;
}
