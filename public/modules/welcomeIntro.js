export function renderWelcomeIntro(app, data, navigate) {
  app.innerHTML = `
    <section class="ww-welcome-page">
      <div class="ww-welcome-video-shell">
        <video
          class="ww-welcome-video"
          autoplay
          muted
          playsinline
          preload="auto"
        >
          <source src="/assets/winterword/videos/welcome.mp4" type="video/mp4">
        </video>
        <div class="ww-welcome-video-overlay"></div>
      </div>
      <div class="ww-welcome-page-fade"></div>
    </section>
  `;

  injectWelcomeIntroStyles();

  const page = app.querySelector(".ww-welcome-page");
  const video = app.querySelector(".ww-welcome-video");

  let leaving = false;
  let unlocked = false;
  let startY = null;

  if (video) {
    video.addEventListener("ended", () => {
      video.pause();
    });
  }

  const unlockTimer = window.setTimeout(() => {
    unlocked = true;
  }, 60000);

  function block(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  function goNext() {
    if (leaving || !unlocked) return;

    leaving = true;
    page.classList.add("is-leaving");

    window.setTimeout(() => {
      window.clearTimeout(unlockTimer);
      navigate("base-station");
    }, 650);
  }

  function onWheel(event) {
    if (!unlocked) {
      block(event);
      return;
    }

    if (event.deltaY > 0) {
      block(event);
      goNext();
    }
  }

  function onKeydown(event) {
    if (["ArrowDown", "PageDown", " "].includes(event.key)) {
      if (!unlocked) {
        block(event);
        return;
      }

      block(event);
      goNext();
    }
  }

  function onTouchStart(event) {
    startY = event.touches[0].clientY;
  }

  function onTouchMove(event) {
    if (!unlocked) {
      block(event);
      return;
    }

    const delta = startY - event.touches[0].clientY;

    if (delta > 60) {
      block(event);
      goNext();
    }
  }

  window.addEventListener("wheel", onWheel, { passive: false });
  window.addEventListener("keydown", onKeydown, { passive: false });
  window.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("touchmove", onTouchMove, { passive: false });
}

function injectWelcomeIntroStyles() {
  if (document.getElementById("ww-welcome-intro-styles")) return;

  const style = document.createElement("style");
  style.id = "ww-welcome-intro-styles";

  style.textContent = `
    .ww-welcome-page {
      --bg: #050505;
      --card-border-1: rgba(255,255,255,.20);
      --card-border-2: rgba(255,255,255,.08);
      --card-shadow:
        0 30px 80px rgba(0,0,0,.65),
        0 8px 24px rgba(0,0,0,.45);
      --card-radius: 24px;
      --leave-duration: 650ms;
      --leave-ease: cubic-bezier(.22,.61,.36,1);

      box-sizing: border-box;
      width: 100%;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      background:
        radial-gradient(circle at 20% 20%, rgba(255,255,255,.045) 0 1px, transparent 1.5px),
        radial-gradient(circle at 80% 30%, rgba(255,255,255,.03) 0 1px, transparent 1.5px),
        radial-gradient(circle at 30% 80%, rgba(255,255,255,.025) 0 1px, transparent 1.5px),
        linear-gradient(180deg, rgba(255,255,255,.025), rgba(255,255,255,0)),
        repeating-linear-gradient(
          135deg,
          rgba(255,255,255,.018) 0px,
          rgba(255,255,255,.018) 2px,
          transparent 2px,
          transparent 6px
        ),
        radial-gradient(circle at center, #121212 0%, #090909 48%, #030303 100%);
      transition:
        opacity var(--leave-duration) var(--leave-ease),
        transform var(--leave-duration) var(--leave-ease),
        filter var(--leave-duration) var(--leave-ease);
    }

    .ww-welcome-page *,
    .ww-welcome-page *::before,
    .ww-welcome-page *::after {
      box-sizing: border-box;
    }

    .ww-welcome-page::after {
      content: "";
      position: absolute;
      inset: 0;
      pointer-events: none;
      background: radial-gradient(circle at center, transparent 45%, rgba(0,0,0,.34) 100%);
    }

    .ww-welcome-video-shell {
      position: relative;
      width: min(66.666vw, calc(66.666vh * 16 / 9));
      aspect-ratio: 16 / 9;
      border-radius: var(--card-radius);
      overflow: hidden;
      background: #000;
      border: 1px solid var(--card-border-1);
      box-shadow: var(--card-shadow);
    }

    .ww-welcome-video-shell::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      padding: 1px;
      background: linear-gradient(
        145deg,
        rgba(255,255,255,.28),
        rgba(255,255,255,.08) 28%,
        rgba(255,255,255,.04) 55%,
        rgba(255,255,255,.18) 100%
      );
      -webkit-mask:
        linear-gradient(#000 0 0) content-box,
        linear-gradient(#000 0 0);
      -webkit-mask-composite: xor;
              mask-composite: exclude;
      pointer-events: none;
    }

    .ww-welcome-video-shell::after {
      content: "";
      position: absolute;
      inset: 10px;
      border-radius: calc(var(--card-radius) - 10px);
      border: 1px solid var(--card-border-2);
      pointer-events: none;
    }

    .ww-welcome-video {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .ww-welcome-video-overlay {
      position: absolute;
      inset: 0;
      pointer-events: none;
      background:
        linear-gradient(to bottom, rgba(0,0,0,.10), rgba(0,0,0,.04) 35%, rgba(0,0,0,.16) 100%);
    }

    .ww-welcome-page-fade {
      position: fixed;
      inset: 0;
      background: #000;
      opacity: 0;
      z-index: 9999;
      transition: opacity var(--leave-duration) var(--leave-ease);
      pointer-events: none;
    }

    .ww-welcome-page.is-leaving .ww-welcome-page-fade {
      opacity: 1;
    }

    .ww-welcome-page.is-leaving {
      opacity: 0;
      transform: translateY(-2vh) scale(.985);
      filter: blur(3px);
    }
  `;

  document.head.appendChild(style);
}
