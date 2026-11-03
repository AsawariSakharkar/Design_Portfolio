(function () {
  "use strict";

  var track = document.querySelector(".hero-role-track");
  if (!track || !track.children.length) return;

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var index = 0;

  function showRole() {
    track.style.transform = "translateY(-" + index * 1.6 + "em)";
  }

  showRole();
  if (reducedMotion.matches) return;

  window.setInterval(function () {
    index = (index + 1) % track.children.length;
    showRole();
  }, 2800);
})();
