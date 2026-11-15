/**
 * Books fan carousel: rotates automatically and loops with no seam.
 * No wheel, drag, hover or keyboard control; the page scrolls normally.
 */
(function () {
  const stage = document.getElementById("books-stage");
  const ring  = document.getElementById("books-ring");
  if (!stage || !ring) return;

  const content = window.SITE_CONTENT || {};

  /* Description (skipped if something else already filled it) */
  const descEl = document.getElementById("books-description");
  const paras  = (content.books && content.books.description) || [];
  if (descEl && !descEl.children.length) {
    paras.forEach(function (text) {
      const p = document.createElement("p");
      p.textContent = text;
      descEl.appendChild(p);
    });
  }

  /* Books from content.js -> fashion.books (encodeURI handles names like "image 60.png") */
  const safeSrc = function (s) {
    return s && s.indexOf("%") === -1 ? encodeURI(s) : s;
  };
  const books = ((content.fashion && content.fashion.books) || [])
    .map(function (b) { return { src: safeSrc(b.image), label: b.title || "" }; })
    .filter(function (b) { return b.src; });
  if (!books.length) return;

  /* Tunables */
  const AUTO_SPEED   = 0.2;    // cards per second (about one card every 5 s)
  const X_SPACING    = 0.55;   // x offset per step, as a fraction of card width
  const Z_DEPTH      = 90;     // px each step goes back
  const ROTATE_Y     = 32;     // degrees per step (use -32 if the fan bends the wrong way)
  const SCALE_STEP   = 0.06;
  const BLUR_STEP    = 2;      // px per step, capped at 6
  const VISIBLE      = 3;      // render cards within this distance of the centre

  const N = books.length;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Distance wrapped into -N/2 .. N/2 so the loop has no seam
  const wrap = function (x) { return (((x + N / 2) % N) + N) % N - N / 2; };

  let pos = 0;
  let onScreen = true;
  let cardW = 180;

  /* Build cards (two faces each so covers never appear mirrored) */
  const makeFace = function (b, back) {
    const img = document.createElement("img");
    img.className = "books-ring__face" + (back ? " books-ring__face--back" : "");
    img.src = b.src;
    img.alt = back ? "" : b.label;
    img.draggable = false;
    img.decoding = "async";
    return img;
  };

  const cards = books.map(function (b) {
    const el = document.createElement("div");
    el.className = "books-ring__card";
    el.appendChild(makeFace(b, false));
    el.appendChild(makeFace(b, true));
    ring.appendChild(el);
    return el;
  });
  cardW = cards[0].offsetWidth || cardW;

  /* Keep sizes fresh, pause when off-screen */
  const ro = new ResizeObserver(function () { cardW = cards[0].offsetWidth || cardW; });
  ro.observe(stage);
  const io = new IntersectionObserver(function (entries) { onScreen = entries[0].isIntersecting; });
  io.observe(stage);

  /* Layout: each card is placed from its distance d to the centre */
  function layout() {
    for (let i = 0; i < N; i++) {
      const el = cards[i];
      const d = wrap(i - pos);
      const a = Math.abs(d);

      if (a > VISIBLE + 0.5) { el.style.visibility = "hidden"; continue; }
      el.style.visibility = "visible";

      const x  = d * cardW * X_SPACING;
      const z  = -a * Z_DEPTH;
      const ry = -Math.max(-2.5, Math.min(2.5, d)) * ROTATE_Y;
      const s  = 1 - SCALE_STEP * a;

      el.style.transform = "translate3d(" + x + "px,0," + z + "px) rotateY(" + ry + "deg) scale(" + s + ")";
      el.style.opacity   = reduce ? (a < 0.5 ? 1 : 0.35) : Math.max(0.25, 1 - 0.3 * a).toFixed(3);
      el.style.filter    = reduce ? "none" : "blur(" + Math.min(6, a * BLUR_STEP).toFixed(2) + "px)";
      el.style.zIndex    = 100 - Math.round(a * 10);
    }
  }

  /* Loop with delta time, so speed is the same on every refresh rate */
  let raf = 0;
  let last = performance.now();

  function frame(now) {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;

    if (onScreen && !document.hidden && !reduce) {
      pos += AUTO_SPEED * dt;
      layout();
    }
    raf = requestAnimationFrame(frame);
  }

  layout();
  raf = requestAnimationFrame(frame);

  window.addEventListener("pagehide", function () {
    cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
  });
})();