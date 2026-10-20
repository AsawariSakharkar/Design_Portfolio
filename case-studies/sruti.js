(function () {
  var all = document.querySelectorAll('.sruti-hotspot');
  if (!all.length) return;
  var touchOnly = window.matchMedia('(hover: none)').matches;

  function closeAll(except) {
    all.forEach(function (s) { if (s !== except) s.classList.remove('is-open'); });
  }

  // Touch: a tap opens one card, a second tap closes it.
  // Mouse: hover and keyboard focus already do the job.
  if (touchOnly) {
    all.forEach(function (s) {
      s.addEventListener('click', function (e) {
        e.stopPropagation();
        closeAll(s);
        s.classList.toggle('is-open');
      });
    });
    document.addEventListener('click', function () { closeAll(null); });
  }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAll(null); });

  // Hovering a list item highlights its area on the home screen image.
  if (!touchOnly) {
    document.querySelectorAll('.sruti-annotations [data-spot]').forEach(function (li) {
      var spot = document.getElementById(li.getAttribute('data-spot'));
      if (!spot) return;
      li.addEventListener('mouseenter', function () { spot.classList.add('is-linked'); });
      li.addEventListener('mouseleave', function () { spot.classList.remove('is-linked'); });
    });
  }
})();