.ww-answer-page{
  min-height:100vh;
  width:100%;
  margin:0;
  padding:1rem 1.4rem .9rem;
  font-family:system-ui,-apple-system,"Segoe UI",sans-serif;
  color:var(--ww-ink);

  background:
    radial-gradient(circle at 50% 8%, rgba(255,250,235,0.82), transparent 34%),
    radial-gradient(circle at 18% 92%, rgba(255,214,156,0.16), transparent 36%),
    radial-gradient(circle at 88% 18%, rgba(255,244,210,0.18), transparent 30%),
    linear-gradient(
      135deg,
      #c7d9cf 0%,
      #b8d0c4 24%,
      #dbe5d4 52%,
      #b8cdbf 76%,
      #8fa998 100%
    );

  overflow-x:hidden;
}

.ww-answer-page::before{
  content:"";
  position:fixed;
  inset:0;
  pointer-events:none;

  background:
    repeating-linear-gradient(
      0deg,
      rgba(20,42,34,0.022) 0px,
      rgba(20,42,34,0.022) 1px,
      transparent 1px,
      transparent 5px
    ),
    radial-gradient(circle at 50% 40%, rgba(255,255,255,0.22), transparent 62%);

  mix-blend-mode:multiply;
  opacity:.48;
}

.ww-word-button{
  display:inline-flex;
  align-items:center;
  justify-content:center;

  margin:.72rem auto 0;

  border:1px solid rgba(255,244,214,0.24);
  border-radius:999px;

  background:
    linear-gradient(
      180deg,
      rgba(255,255,255,0.12),
      rgba(255,255,255,0.02)
    ),
    linear-gradient(
      145deg,
      #d4933b,
      #b96d1f 52%,
      #8d4d16
    );

  cursor:pointer;

  color:#fff7eb;

  font:950 .68rem/1 system-ui,-apple-system,"Segoe UI",sans-serif;

  letter-spacing:.22em;
  text-transform:uppercase;

  padding:.98rem 1.75rem;

  min-width:14.5rem;

  box-shadow:
    0 18px 34px rgba(88,44,10,0.28),
    0 5px 12px rgba(88,44,10,0.16),
    inset 0 1px 0 rgba(255,255,255,0.22),
    inset 0 0 0 1px rgba(0,0,0,0.12);

  transition:
    transform .2s ease,
    filter .2s ease,
    box-shadow .2s ease;
}

.ww-word-button:hover{
  transform:translateY(-2px) scale(1.02);

  filter:brightness(1.08);

  box-shadow:
    0 24px 44px rgba(88,44,10,0.34),
    0 8px 18px rgba(88,44,10,0.20),
    inset 0 1px 0 rgba(255,255,255,0.24),
    inset 0 0 0 1px rgba(0,0,0,0.14);
}
