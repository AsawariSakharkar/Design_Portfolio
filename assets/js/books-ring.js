/**
 * Books fan carousel
 * - Reads covers from SITE_CONTENT.fashion.books and copy from SITE_CONTENT.books.description
 * - While the section is pinned, ANY page scroll (cursor anywhere) turns the cards; scroll is never blocked
 * - Drag / keys / sideways swipe on the stage also work
 * - Drifts slowly by itself, loops with no seam
 */
(function () {
  const stage = document.getElementById("books-stage");
  const ring  = document.getElementById("books-ring");
  if (!stage || !ring) return;

  const content = window.SITE_CONTENT || {};

  /* ---------------------------------------------------------------
     Description (skipped if something else already filled it)
     --------------------------------------------------------------- */
  const descEl = document.getElementById("books-description");
  const paras  = (content.books && content.books.description) || [];
  if (descEl && !descEl.children.length) {
    paras.forEach(function (text) {
      const p = document.createElement("p");
      p.textContent = text;
      descEl.appendChild(p);
    });
  }

  /* ---------------------------------------------------------------
     Books from content.js -> fashion.books
     encodeURI handles names like "image 60.png"
     --------------------------------------------------------------- */
  const safeSrc = function (s) {
    return s && s.indexOf("%") === -1 ? encodeURI(s) : s;
  };
  const books = ((content.fashion && content.fashion.books) || [])
    .map(function (b) { return { src: safeSrc(b.image), label: b.title || "" }; })
    .filter(function (b) { return b.src; });
  if (!books.length) return;

  /* ---------------------------------------------------------------
     Tunables
     --------------------------------------------------------------- */
  const AUTO_SPEED   = 0.15;   // cards per second while idle (about 1 card every 6.7 s)
  const WHEEL_GAIN   = 0.004;  // cards per pixel of horizontal swipe / shift+wheel
  const SCROLL_CARDS = 1;      // cards turned per card-count of scroll runway (1 = whole set once over the pinned section)
  const LERP         = 0.12;   // smoothing toward the target
  const RESUME_DELAY = 2000;   // ms after the last interaction before drifting again
  const SNAP_DELAY   = 150;    // ms before settling on a whole card
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

  /* ---------------------------------------------------------------
     State
     --------------------------------------------------------------- */
  let target = 0, pos = 0, autoFactor = 0;
  let lastInteract = -1e9, snapPending = false;
  let dragging = false, hovering = false, focused = false, onScreen = true;
  let moved = 0;
  let cardW = 180;

  const interacted = function (wantSnap) {
    lastInteract = performance.now();
    if (wantSnap) snapPending = true;
  };

  /* ---------------------------------------------------------------
     Build cards (two faces each so covers never appear mirrored)
     --------------------------------------------------------------- */
  const makeFace = function (b, back) {
    const img = document.createElement("img");
    img.className = "books-ring__face" + (back ? " books-ring__face--back" : "");
    img.src = b.src;
    img.alt = back ? "" : b.label;
    img.draggable = false;
    img.decoding = "async";
    return img;
  };

  const cards = books.map(function (b, i) {
    const el = document.createElement("div");
    el.className = "books-ring__card";
    el.appendChild(makeFace(b, false));
    el.appendChild(makeFace(b, true));
    el.addEventListener("click", function () {
      if (moved > 5) return;                          // it was a drag, not a click
      target = Math.round(pos + wrap(i - pos));       // bring this card to the centre
      interacted(true);
    });
    ring.appendChild(el);
    return el;
  });
  cardW = cards[0].offsetWidth || cardW;

  /* ---------------------------------------------------------------
     Wheel: ONLY over the stage. Page scrolls normally everywhere else.
     --------------------------------------------------------------- */
  const onWheel = function (e) {
    const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey;
    if (horizontal) {
      // sideways swipe or shift+wheel: move the cards, don't let the browser navigate
      e.preventDefault();
      target += (e.deltaX || e.deltaY) * WHEEL_GAIN;
      interacted(true);
    }
    // vertical wheel is left alone: the scroll listener below drives the cards wherever the cursor is
  };
  stage.addEventListener("wheel", onWheel, { passive: false });

  /* ---------------------------------------------------------------
     Page scroll drives the cards while the section is pinned,
     regardless of where the cursor is. Uses scroll deltas, so it
     works for wheel, trackpad, touch, keyboard and scrollbar drags.
     --------------------------------------------------------------- */
  const section = document.getElementById("books");
  let lastY = window.scrollY;
  const onScroll = function () {
    const y = window.scrollY;
    const dy = y - lastY;
    lastY = y;
    if (!section || !dy) return;
    const r = section.getBoundingClientRect();
    const runway = Math.max(1, r.height - window.innerHeight);   // pixels of scrolling while pinned
    // distance of this scroll step that happened inside the pinned range
    const before = -(r.top + dy);                                // scroll offset into section before the step
    const after  = -r.top;                                       // ... and after
    const lo = Math.max(0, Math.min(runway, Math.min(before, after)));
    const hi = Math.max(0, Math.min(runway, Math.max(before, after)));
    if (hi === lo) return;
    const inside = (hi - lo) * (dy > 0 ? 1 : -1);
    target += inside / runway * N * SCROLL_CARDS;
    interacted(true);
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------------------------------------------------------------
     Drag (mouse + touch). CSS touch-action: pan-y keeps vertical page scroll.
     --------------------------------------------------------------- */
  let startX = 0, startTarget = 0;

  const onMove = function (e) {
    const dx = e.clientX - startX;
    moved = Math.max(moved, Math.abs(dx));
    target = startTarget - dx / (cardW * X_SPACING * 1.2);
    interacted(false);
  };
  const onUp = function () {
    dragging = false;
    stage.classList.remove("is-dragging");
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
    window.removeEventListener("pointercancel", onUp);
    interacted(true);
  };
  const onDown = function (e) {
    if (e.button !== undefined && e.button !== 0) return;
    dragging = true;
    moved = 0;
    startX = e.clientX;
    startTarget = target;
    stage.classList.add("is-dragging");
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
  };
  stage.addEventListener("pointerdown", onDown);

  /* ---------------------------------------------------------------
     Hover, focus, keyboard
     --------------------------------------------------------------- */
  const onEnter = function () { hovering = true; };
  const onLeave = function () { hovering = false; interacted(false); };
  const onFocus = function () { focused = true; };
  const onBlur  = function () { focused = false; interacted(false); };
  const onKey = function (e) {
    if (e.key === "ArrowRight") { target = Math.round(target) + 1; interacted(true); e.preventDefault(); }
    if (e.key === "ArrowLeft")  { target = Math.round(target) - 1; interacted(true); e.preventDefault(); }
  };
  stage.addEventListener("pointerenter", onEnter);
  stage.addEventListener("pointerleave", onLeave);
  stage.addEventListener("focus", onFocus);
  stage.addEventListener("blur", onBlur);
  stage.addEventListener("keydown", onKey);

  /* ---------------------------------------------------------------
     Keep sizes fresh, pause when off-screen
     --------------------------------------------------------------- */
  const ro = new ResizeObserver(function () { cardW = cards[0].offsetWidth || cardW; });
  ro.observe(stage);
  const io = new IntersectionObserver(function (entries) { onScreen = entries[0].isIntersecting; });
  io.observe(stage);

  /* ---------------------------------------------------------------
     Layout: each card is placed from its distance d to the centre
     --------------------------------------------------------------- */
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

  /* ---------------------------------------------------------------
     Loop with delta time, so speed is the same on every refresh rate
     --------------------------------------------------------------- */
  let raf = 0;
  let last = performance.now();

  function frame(now) {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;

    if (onScreen && !document.hidden) {
      const idle = !dragging && !hovering && !focused && !reduce && (now - lastInteract > RESUME_DELAY);
      autoFactor += ((idle ? 1 : 0) - autoFactor) * Math.min(1, dt * 2);   // eases in, no jump
      target += AUTO_SPEED * autoFactor * dt;

      if (snapPending && !dragging && now - lastInteract > SNAP_DELAY) {
        target = Math.round(target);                                         // settle on a whole card
        snapPending = false;
      }

      pos += (target - pos) * (1 - Math.pow(1 - LERP, dt * 60));
      layout();
    }
    raf = requestAnimationFrame(frame);
  }

  layout();
  raf = requestAnimationFrame(frame);

  /* ---------------------------------------------------------------
     Cleanup
     --------------------------------------------------------------- */
  window.addEventListener("pagehide", function () {
    cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
    stage.removeEventListener("wheel", onWheel);
    window.removeEventListener("scroll", onScroll);
    stage.removeEventListener("pointerdown", onDown);
    stage.removeEventListener("pointerenter", onEnter);
    stage.removeEventListener("pointerleave", onLeave);
    stage.removeEventListener("focus", onFocus);
    stage.removeEventListener("blur", onBlur);
    stage.removeEventListener("keydown", onKey);
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
    window.removeEventListener("pointercancel", onUp);
  });
})();