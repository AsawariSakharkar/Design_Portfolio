(function () {
  "use strict";

  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var SELECTORS = {
    media:
      'img, picture, video, canvas, svg, [data-cursor="media"], .card, .project-card, .project-thumbnail, figure',
    interactive:
      'a, button, [role="button"], summary, label[for], [data-cursor="interactive"]',
    text:
      'p, h1, h2, h3, h4, h5, h6, li, blockquote, [data-cursor="text"]',
    input: 'input, textarea, select, [contenteditable="true"]',
    hide: '[data-cursor="hide"]',
  };
  var MEDIA_ELEMENTS =
    "img, picture, video, canvas, svg, [data-cursor=\"media\"], figure";
  var cursor = document.createElement("div");
  var star = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  var starShape = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  var gem = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  var highlight = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  var ping = document.createElement("span");
  var pointerX = -100;
  var pointerY = -100;
  var renderedX = pointerX;
  var renderedY = pointerY;
  var frameId = null;
  var activeTimer = null;
  var pingTimer = null;
  var state = "default";
  var resolvePending = false;
  var debug = new URLSearchParams(window.location.search).get("cursor-debug") === "1";

  cursor.className = "portfolio-cursor";
  cursor.setAttribute("aria-hidden", "true");
  star.classList.add("portfolio-cursor__star");
  star.setAttribute("viewBox", "0 0 48 48");
  star.setAttribute("aria-hidden", "true");
  starShape.setAttribute(
    "points",
    "24,1 27,19 33,15 30,22 47,24 30,27 33,33 27,30 24,47 21,30 15,33 18,27 1,24 18,21 15,15 21,19"
  );
  gem.classList.add("portfolio-cursor__gem");
  gem.setAttribute("cx", "24");
  gem.setAttribute("cy", "24");
  gem.setAttribute("r", "4");
  highlight.classList.add("portfolio-cursor__highlight");
  highlight.setAttribute("cx", "22.5");
  highlight.setAttribute("cy", "22.5");
  highlight.setAttribute("r", "1");
  ping.className = "portfolio-cursor__ping";
  star.appendChild(starShape);
  star.appendChild(gem);
  star.appendChild(highlight);
  cursor.appendChild(star);
  cursor.appendChild(ping);
  document.body.appendChild(cursor);
  document.body.classList.add("portfolio-cursor-ready");
  cursor.classList.add("portfolio-cursor--ready");
  if (reducedMotion.matches) {
    cursor.classList.add("portfolio-cursor--reduced-motion");
  }

  function closestElement(target, selector) {
    return target && target.closest ? target.closest(selector) : null;
  }

  function pathElement(path, selector) {
    for (var i = 0; i < path.length; i += 1) {
      if (path[i] && path[i].nodeType === 1 && closestElement(path[i], selector)) {
        return closestElement(path[i], selector);
      }
    }
    return null;
  }

  function resolveTarget(target, path) {
    var explicit = pathElement(path || [], '[data-cursor]');
    if (explicit && explicit.getAttribute("data-cursor") !== "hide") {
      return {
        element: explicit,
        state: explicit.getAttribute("data-cursor"),
      };
    }
    if (pathElement(path || [], SELECTORS.hide) || closestElement(target, SELECTORS.hide)) {
      return { element: target, state: "hide" };
    }
    var input = pathElement(path || [], SELECTORS.input) || closestElement(target, SELECTORS.input);
    if (input) return { element: input, state: "input" };

    // Media wins only when the pointer is over the image/media itself. This
    // lets linked cards remain interactive when the pointer is over their text.
    var media = pathElement(path || [], MEDIA_ELEMENTS) || closestElement(target, MEDIA_ELEMENTS);
    if (media) return { element: media, state: "image" };

    var interactive =
      pathElement(path || [], SELECTORS.interactive) ||
      closestElement(target, SELECTORS.interactive);
    if (interactive) return { element: interactive, state: "interactive" };

    var text =
      pathElement(path || [], SELECTORS.text) || closestElement(target, SELECTORS.text);
    if (text) return { element: text, state: "text" };

    return { element: target, state: "default" };
  }

  function setInteraction(target, path) {
    var resolved = resolveTarget(target, path);
    if (resolved.state === state) return;
    state = resolved.state;
    cursor.classList.remove(
      "portfolio-cursor--interactive",
      "portfolio-cursor--image",
      "portfolio-cursor--text",
      "portfolio-cursor--input",
      "portfolio-cursor--outside"
    );
    if (state !== "default") cursor.classList.add("portfolio-cursor--" + state);
    if (debug) {
      var element = resolved.element;
      console.debug("[cursor]", state, element && element.tagName, element && element.className);
    }
  }

  function resolveAtPointer() {
    if (pointerX < 0 || pointerY < 0) return;
    var target = document.elementFromPoint(pointerX, pointerY);
    if (target && target !== cursor) setInteraction(target, [target]);
  }

  function render() {
    var easing = reducedMotion.matches ? 1 : 0.2;
    if (resolvePending) {
      resolvePending = false;
      resolveAtPointer();
    }
    renderedX += (pointerX - renderedX) * easing;
    renderedY += (pointerY - renderedY) * easing;
    cursor.style.transform =
      "translate3d(" +
      (renderedX - 14).toFixed(2) +
      "px, " +
      (renderedY - 14).toFixed(2) +
      "px, 0)";
    frameId = document.hidden ? null : window.requestAnimationFrame(render);
  }

  function startRendering() {
    if (frameId === null && !document.hidden) {
      frameId = window.requestAnimationFrame(render);
    }
  }

  function scheduleResolve() {
    resolvePending = true;
    startRendering();
  }

  function handleMediaLoad(event) {
    if (event.target && closestElement(event.target, SELECTORS.media)) {
      scheduleResolve();
    }
  }

  function handlePointerMove(event) {
    pointerX = event.clientX;
    pointerY = event.clientY;
    setInteraction(event.target, event.composedPath ? event.composedPath() : []);
    startRendering();
  }

  function handlePointerOver(event) {
    setInteraction(event.target, event.composedPath ? event.composedPath() : []);
    cursor.classList.remove("portfolio-cursor--outside");
  }

  function handlePointerOut(event) {
    if (!event.relatedTarget) {
      cursor.classList.add("portfolio-cursor--outside");
      return;
    }
    setInteraction(
      event.relatedTarget,
      event.composedPath ? event.composedPath() : []
    );
  }

  function handlePointerDown() {
    clearTimeout(activeTimer);
    cursor.classList.add("portfolio-cursor--active");
    activeTimer = window.setTimeout(function () {
      cursor.classList.remove("portfolio-cursor--active");
    }, 120);
    if (!reducedMotion.matches) {
      clearTimeout(pingTimer);
      cursor.classList.remove("portfolio-cursor--ping");
      void cursor.offsetWidth;
      cursor.classList.add("portfolio-cursor--ping");
      pingTimer = window.setTimeout(function () {
        cursor.classList.remove("portfolio-cursor--ping");
      }, 400);
    }
  }

  function handleVisibilityChange() {
    if (document.hidden) {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
        frameId = null;
      }
    } else {
      startRendering();
      scheduleResolve();
    }
  }

  function handleWindowBlur() {
    cursor.classList.add("portfolio-cursor--outside");
  }

  function handleWindowFocus() {
    cursor.classList.remove("portfolio-cursor--outside");
    scheduleResolve();
  }

  document.addEventListener("pointermove", handlePointerMove, { passive: true });
  document.addEventListener("pointerover", handlePointerOver, { passive: true });
  document.addEventListener("pointerout", handlePointerOut, { passive: true });
  document.addEventListener("pointerdown", handlePointerDown, { passive: true });
  document.addEventListener("visibilitychange", handleVisibilityChange, { passive: true });
  document.addEventListener("scroll", scheduleResolve, { passive: true });
  window.addEventListener("resize", scheduleResolve, { passive: true });
  window.addEventListener("blur", handleWindowBlur, { passive: true });
  window.addEventListener("focus", handleWindowFocus, { passive: true });
  window.addEventListener("pointerleave", handleWindowBlur, { passive: true });
  window.addEventListener("pointerenter", handleWindowFocus, { passive: true });
  document.addEventListener("load", handleMediaLoad, { passive: true, capture: true });
  startRendering();
})();
