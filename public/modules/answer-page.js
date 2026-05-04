.ww-mini-textlink {
  appearance: none;
  background: transparent;
  border: 0;
  padding: 0;
  line-height: 1;
  font-family: Georgia, "Times New Roman", serif;
  font-weight: 800;
  font-size: 0.82rem;
  letter-spacing: 0.38em;
  text-transform: uppercase;
  color: var(--ww-ink-soft);
  cursor: pointer;
  text-align: center;
  text-shadow:
    0 2px 5px rgba(0,0,0,0.86),
    0 0 8px rgba(255,255,255,0.05);
  position: relative;
  overflow: hidden;
  transition:
    color 180ms ease,
    text-shadow 180ms ease,
    transform 180ms ease;
}

.ww-mini-textlink:hover {
  color: #fff6d7;
  transform: translateX(0.08rem);
  text-shadow:
    0 2px 5px rgba(0,0,0,0.9),
    0 0 0.75rem rgba(246,186,76,0.36);
}

.ww-mini-textlink::after {
  content: "";
  position: absolute;
  top: -10%;
  left: -40%;
  width: 38%;
  height: 180%;
  background: linear-gradient(
    115deg,
    transparent 0%,
    transparent 34%,
    rgba(238,171,67,0) 42%,
    rgba(255,239,177,0.98) 49%,
    rgba(238,171,67,0.98) 52%,
    rgba(238,171,67,0) 58%,
    transparent 68%,
    transparent 100%
  );
  transform: translateX(-180%) skewX(-25deg);
  opacity: 0;
  pointer-events: none;
  border-radius: 999px;
}

.ww-mini-textlink:hover::after {
  animation: wwGoldSweep 700ms ease forwards;
}

.ww-mini-textlink[data-active="true"] {
  color: #ffffff;
}

.ww-mini-textlink[data-active="true"]::before,
.ww-mini-textlink[data-active="true"]::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 1.7rem;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(240,161,58,0.98),
    rgba(255,226,155,0.9)
  );
}

.ww-mini-textlink[data-active="true"]::before {
  right: calc(100% + 0.55rem);
  transform: translateY(-50%);
}

.ww-mini-textlink[data-active="true"]::after {
  left: calc(100% + 0.55rem);
  transform: translateY(-50%) rotate(180deg);
}

@keyframes wwGoldSweep {
  0% {
    opacity: 0;
    transform: translateX(-180%) skewX(-25deg);
  }

  15% {
    opacity: 1;
  }

  100% {
    opacity: 1;
    transform: translateX(360%) skewX(-25deg);
  }
}
