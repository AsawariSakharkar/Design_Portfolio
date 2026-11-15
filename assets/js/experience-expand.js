(function () {
  "use strict";

  var list = document.getElementById("experience-list");
  if (!list) return;

  var VISIBLE_BULLETS = 2;
  var LONG_BULLET = 130;
  var chevron =
    '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
    '<path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
    "</svg>";

  function enhance(item, index) {
    if (item.dataset.expandReady) return;

    var listEl = item.querySelector(".timeline__desc-list");
    if (!listEl) return;

    var bullets = Array.prototype.slice.call(listEl.querySelectorAll(".timeline__desc-item"));
    var hasMore =
      bullets.length > VISIBLE_BULLETS ||
      bullets.some(function (b) { return b.textContent.length > LONG_BULLET; });

    item.dataset.expandReady = "true";
    if (!hasMore) return;

    item.classList.add("is-collapsed");
    bullets.forEach(function (b, i) {
      if (i >= VISIBLE_BULLETS) b.classList.add("is-extra");
    });

    var id = "exp-desc-" + index;
    listEl.id = id;

    var button = document.createElement("button");
    button.type = "button";
    button.className = "exp-toggle";
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", id);
    button.innerHTML = "<span>Show more</span>" + chevron;

    button.addEventListener("click", function () {
      var expanded = item.classList.toggle("is-expanded");
      item.classList.toggle("is-collapsed", !expanded);
      button.setAttribute("aria-expanded", expanded ? "true" : "false");
      button.firstChild.textContent = expanded ? "Show less" : "Show more";
    });

    listEl.insertAdjacentElement("afterend", button);
  }

  function run() {
    Array.prototype.forEach.call(list.querySelectorAll(".timeline__item"), enhance);
  }

  run();
  new MutationObserver(run).observe(list, { childList: true });
})();
