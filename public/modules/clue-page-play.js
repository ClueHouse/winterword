.ww-hotspot-play {
  left: var(--ww-hotspot-group-left);
  top: var(--ww-hotspot-play-top);
  width: var(--ww-hotspot-play-diameter);
  height: var(--ww-hotspot-play-diameter);
  border-radius: 999px;
  overflow: visible;
}

.ww-hotspot-play::before {
  content: "";
  position: absolute;
  inset: -16%;
  border-radius: 999px;
  background:
    radial-gradient(
      circle,
      rgba(245,248,255,0.22) 0%,
      rgba(220,232,245,0.14) 34%,
      transparent 72%
    );
  pointer-events: none;
  opacity: 0;
}

.ww-hotspot-play::after {
  content: "";
  position: absolute;
  inset: 6%;
  border-radius: 999px;
  background:
    linear-gradient(
      115deg,
      transparent 0%,
      transparent 34%,
      rgba(255,255,255,0.55) 48%,
      rgba(255,255,255,0.22) 54%,
      transparent 68%,
      transparent 100%
    );
  pointer-events: none;
  opacity: 0;
  transform: translateX(-72%) rotate(8deg);
  animation: wwPlayIdleSweep 4s linear infinite;
}

.ww-hotspot-play:hover {
  animation: wwPlayHoverPulse 850ms ease-in-out infinite;
  background: rgba(225,238,255,0.08);
}

.ww-hotspot-play:hover::before {
  animation: wwPlayHoverGlow 850ms ease-in-out infinite;
}

.ww-hotspot-play:hover::after {
  animation: wwPlayHoverSweep 1.1s ease-out infinite;
}

.ww-hotspot-play[data-flash="true"]::before {
  animation: wwPlayClickFlash 420ms ease-out forwards;
}

.ww-hotspot-play[data-playing="true"] {
  animation: wwPlayActiveSignal 1.8s ease-in-out infinite;
  background: rgba(220,240,255,0.10);
}

.ww-hotspot-play[data-playing="true"]::after {
  animation: wwPlayIdleSweep 4s linear infinite;
}

@keyframes wwPlayIdleSweep {
  0% {
    opacity: 0;
    transform: translateX(-72%) rotate(8deg);
  }

  8% {
    opacity: 0;
  }

  18% {
    opacity: 0.78;
  }

  32% {
    opacity: 0;
  }

  100% {
    opacity: 0;
    transform: translateX(72%) rotate(8deg);
  }
}

@keyframes wwPlayHoverPulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    box-shadow:
      0 0 0 1px rgba(245,250,255,0.42),
      0 0 18px rgba(220,235,255,0.24);
  }

  50% {
    transform: translate(-50%, -50%) scale(0.955);
    box-shadow:
      0 0 0 2px rgba(255,255,255,0.68),
      0 0 26px rgba(235,245,255,0.42),
      0 0 52px rgba(210,230,255,0.24);
  }
}

@keyframes wwPlayHoverGlow {
  0%, 100% {
    opacity: 0.16;
    transform: scale(0.96);
  }

  50% {
    opacity: 0.46;
    transform: scale(1.12);
  }
}

@keyframes wwPlayHoverSweep {
  0% {
    opacity: 0;
    transform: translateX(-68%) rotate(8deg);
  }

  22% {
    opacity: 0.92;
  }

  100% {
    opacity: 0;
    transform: translateX(68%) rotate(8deg);
  }
}

@keyframes wwPlayClickFlash {
  0% {
    opacity: 0.92;
    transform: scale(0.92);
    box-shadow:
      0 0 0 2px rgba(255,255,255,0.82),
      0 0 34px rgba(240,248,255,0.52),
      0 0 68px rgba(220,235,255,0.34);
  }

  100% {
    opacity: 0;
    transform: scale(1.34);
    box-shadow:
      0 0 0 0 rgba(255,255,255,0),
      0 0 0 rgba(255,255,255,0),
      0 0 0 rgba(255,255,255,0);
  }
}
