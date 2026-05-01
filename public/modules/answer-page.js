:root {
  --ww-left-narrow: 24rem;
  --ww-rail-gap: 1.18rem;
}

#wwLeft {
  background:
    radial-gradient(circle at 14% 18%, rgba(255,226,155,0.08), transparent 1.3px),
    radial-gradient(circle at 82% 24%, rgba(240,161,58,0.08), transparent 1.4px),
    radial-gradient(circle at 28% 72%, rgba(255,226,155,0.06), transparent 1.2px),
    radial-gradient(circle at 74% 82%, rgba(240,161,58,0.07), transparent 1.3px),
    linear-gradient(
      90deg,
      #030504 0%,
      #060907 6%,
      #0b120d 12%,
      #152219 18%,
      #213726 25%,
      #34553a 34%,
      #4d7650 50%,
      #34553a 66%,
      #213726 75%,
      #152219 82%,
      #0b120d 88%,
      #060907 94%,
      #030504 100%
    );
  background-size:
    3rem 3rem,
    3.2rem 3.2rem,
    3rem 3rem,
    3.2rem 3.2rem,
    auto;
}

#wwLeft::before {
  background:
    radial-gradient(ellipse at 50% 14%, rgba(255,226,155,0.06), transparent 24%),
    radial-gradient(ellipse at 50% 48%, rgba(118,158,92,0.22), transparent 36%),
    radial-gradient(ellipse at 50% 88%, rgba(240,161,58,0.08), transparent 24%),
    linear-gradient(
      90deg,
      rgba(0,0,0,0.96) 0%,
      rgba(0,0,0,0.9) 7%,
      rgba(0,0,0,0.68) 14%,
      rgba(0,0,0,0.24) 24%,
      rgba(255,255,255,0.028) 50%,
      rgba(0,0,0,0.24) 76%,
      rgba(0,0,0,0.68) 86%,
      rgba(0,0,0,0.9) 93%,
      rgba(0,0,0,0.96) 100%
    );
}

#wwLeft::after {
  left: 3.1rem;
  right: 3.1rem;
  border-left: 3px solid rgba(240,161,58,0.58);
  border-right: 3px solid rgba(240,161,58,0.58);
  box-shadow:
    inset 1px 0 0 rgba(255,226,155,0.22),
    inset -1px 0 0 rgba(255,226,155,0.22),
    inset 8px 0 18px rgba(0,0,0,0.22),
    inset -8px 0 18px rgba(0,0,0,0.22);
}

.ww-mini-core {
  transform: translateY(-7rem);
}

.ww-mini-logo {
  margin-bottom: 1.05rem;
}

.ww-mini-logo img {
  width: 11.8rem;
}

.ww-mini-play {
  width: 6.9rem;
  height: 6.9rem;
  margin-bottom: 1.05rem;
}

.ww-mini-textnav {
  gap: 0.78rem;
  margin-top: 0.45rem;
}

.ww-mini-textlink {
  font-size: 1.18rem;
}

.ww-mini-sprig {
  width: 17.4rem;
  bottom: 1.2rem;
  filter:
    brightness(0.66)
    saturate(0.72)
    drop-shadow(0 10px 14px rgba(0,0,0,0.52));
}
