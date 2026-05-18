.ww-solve-hotspot{
  border:none;
  box-shadow:
    0 0 0 rgba(0,0,0,0),
    inset 0 0 0 rgba(0,0,0,0);
  transition:
    transform 180ms ease,
    box-shadow 180ms ease,
    filter 180ms ease;
}

.ww-solve-hotspot:hover,
.ww-solve-hotspot:focus-visible{
  transform:scale(1.015);
  box-shadow:
    0 0 18px rgba(242,178,76,0.22),
    0 0 36px rgba(242,178,76,0.10);
  filter:brightness(1.08);
}

.ww-menu-hotspot{
  border:none;
  box-shadow:none;
  transition:
    transform 160ms ease,
    box-shadow 160ms ease,
    background 160ms ease,
    filter 160ms ease;
}

.ww-menu-hotspot:hover,
.ww-menu-hotspot:focus-visible{
  transform:scale(1.08);
  background:rgba(255,255,255,0.04);
  box-shadow:
    0 0 16px rgba(242,178,76,0.24),
    0 0 30px rgba(242,178,76,0.12);
  filter:brightness(1.12);
  outline:none;
}

.ww-menu-hotspot:active,
.ww-menu-hotspot.is-clicked{
  transform:scale(0.94);
  background:rgba(255,255,255,0.10);
  box-shadow:
    0 0 18px rgba(242,178,76,0.28),
    inset 0 0 14px rgba(242,178,76,0.18);
}
