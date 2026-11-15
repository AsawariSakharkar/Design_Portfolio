(function () {
  "use strict";

  /* Change SEED for a different arrangement. Same seed = same layout every visit. */
  var SEED = 7;

  /* Sections that get decorations (ids from index.html). */
  var SECTIONS = ["hero", "expertise", "work", "about-me", "articles", "experience", "education"];

  /* Large, fully visible shapes for specific sections (replaces the old cut-off circles). */
  var EXTRA = {
    expertise: [
      { kind: "rings", size: 230, top: "2.5rem", right: "2.5rem", opacity: 0.1},
      { kind: "orbit", size: 150, bottom: "2rem", left: "2rem", opacity: 0.1 }
    ]
  };

  var SHAPES = {
    ring: '<circle cx="12" cy="12" r="10.5"/>',
    rings: '<circle cx="12" cy="12" r="10.5"/><circle cx="12" cy="12" r="6"/>',
    orbit: '<circle cx="12" cy="12" r="9"/><circle cx="21" cy="12" r="1.7" fill="currentColor"/>',
    diamond: '<path d="M12 2 22 12 12 22 2 12Z"/>',
    sparkle: '<path d="M12 2c.8 5.2 4.8 9.2 10 10-5.2.8-9.2 4.8-10 10-.8-5.2-4.8-9.2-10-10 5.2-.8 9.2-4.8 10-10Z"/>',
    star: '<path d="m12 2 2.9 6.9 7.5.6-5.7 4.9 1.8 7.3L12 17.8l-6.5 3.9 1.8-7.3-5.7-4.9 7.5-.6L12 2Z"/>',
    plus: '<path d="M12 4v16M4 12h16"/>',
    dot: '<circle cx="12" cy="12" r="4" fill="currentColor" stroke="none"/>'
  };
  var KINDS = ["ring", "diamond", "sparkle", "star", "dot", "diamond", "sparkle"];

  var mq = window.matchMedia("(max-width: 700px)");

  /* Seeded random number generator so the layout is stable between visits. */
  function rng(seed) {
    return function () {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function hash(str) {
    var h = 0;
    for (var i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
    return h;
  }

  function between(rand, min, max) {
    return min + rand() * (max - min);
  }

  function makeShape(kind, size, rand, opts) {
    var el = document.createElement("span");
    el.className = "deco" + (kind === "orbit" ? " deco--spin" : "");
    el.style.width = size + "px";
    el.style.height = size + "px";

    if (opts.top) el.style.top = opts.top;
    if (opts.bottom) el.style.bottom = opts.bottom;
    if (opts.left) el.style.left = opts.left;
    if (opts.right) el.style.right = opts.right;

    el.style.setProperty("--o", String(opts.opacity));
    el.style.setProperty("--dur", (kind === "orbit" ? between(rand, 40, 70) : between(rand, 7, 13)).toFixed(1) + "s");
    el.style.setProperty("--delay", "-" + between(rand, 0, 10).toFixed(1) + "s");
    el.style.setProperty("--r0", Math.round(between(rand, -12, 0)) + "deg");
    el.style.setProperty("--r1", Math.round(between(rand, 0, 14)) + "deg");
    el.style.setProperty("--drift", "-" + Math.round(between(rand, 10, 22)) + "px");

    el.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      SHAPES[kind] +
      "</svg>";
    return el;
  }

  function build(section) {
    if (section._decoLayer) section._decoLayer.remove();

    var rand = rng(hash(section.id) + SEED);
    var small = mq.matches;
    var count = small ? 4 : 8;

    var layer = document.createElement("div");
    layer.className = "deco-layer";
    layer.setAttribute("aria-hidden", "true");

    // Scattered shapes: one per vertical band so they spread over the whole section.
    for (var i = 0; i < count; i++) {
      var kind = KINDS[Math.floor(rand() * KINDS.length)];
      var size = Math.round(small ? between(rand, 14, 38) : between(rand, 18, 70));
      if (kind === "dot") size = Math.round(between(rand, 8, 16));

      var top = ((i + rand() * 0.8) / count) * 96 + 1;
      var opts = {
        top: "min(" + top.toFixed(1) + "%, calc(100% - " + size + "px))",
        opacity: between(rand, 0.1, 0.2).toFixed(2)
      };

      var roll = rand();
      var edge = (small ? between(rand, 0.5, 4) : between(rand, 1, 10)).toFixed(1) + "%";

      if (!small && roll > 0.78) {
        // a few small ones wander into the middle of the page
        size = Math.min(size, 24);
        opts.top = "min(" + top.toFixed(1) + "%, calc(100% - " + size + "px))";
        opts.left = between(rand, 14, 80).toFixed(1) + "%";
        opts.opacity = between(rand, 0.1, 0.2).toFixed(2);
      } else if (roll > 0.39) {
        opts.right = edge;
      } else {
        opts.left = edge;
      }

      layer.appendChild(makeShape(kind, size, rand, opts));
    }

    // Large, fully visible shapes for chosen sections.
    (EXTRA[section.id] || []).forEach(function (item) {
      var scale = small ? 0.5 : 1;
      layer.appendChild(
        makeShape(item.kind, Math.round(item.size * scale), rand, {
          top: item.top,
          bottom: item.bottom,
          left: item.left,
          right: item.right,
          opacity: item.opacity
        })
      );
    });

    section.insertBefore(layer, section.firstChild);
    section._decoLayer = layer;
    if (observer) observer.observe(section);
  }

  /* Only animate sections that are on screen. */
  var observer =
    "IntersectionObserver" in window
      ? new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.target._decoLayer) {
              entry.target._decoLayer.classList.toggle("is-live", entry.isIntersecting);
            }
          });
        })
      : null;

  var sections = SECTIONS.map(function (id) { return document.getElementById(id); }).filter(Boolean);

  function buildAll() {
    sections.forEach(function (section) {
      section.classList.add("has-deco");
      build(section);
    });
    if (!observer) {
      sections.forEach(function (section) { section._decoLayer.classList.add("is-live"); });
    }
  }

  buildAll();
  console.info("[decor] " + document.querySelectorAll(".deco").length + " shapes added to " + sections.length + " sections");

  if (mq.addEventListener) mq.addEventListener("change", buildAll);
  else if (mq.addListener) mq.addListener(buildAll);
})();