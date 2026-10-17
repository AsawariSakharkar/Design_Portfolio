(function () {
  "use strict";

  var header = document.getElementById("site-header");
  if (!header) return;

  var isProjectPage = document.body.classList.contains("project-page");
  var isCaseStudy = document.body.classList.contains("case-study");
  var assetPrefix = document.body.dataset.siteRoot || "";
  var homePrefix = isProjectPage ? assetPrefix + "index.html" : "";
  var brandMarkup = isCaseStudy
    ? '<a class="brand brand--back" href="' + assetPrefix + 'index.html#work" aria-label="Back to projects" data-cursor="interactive">← Back to projects</a>'
    : '<a class="brand" href="' + (isProjectPage ? "index.html" : "#top") + '" aria-label="Asawari, home" data-cursor="interactive">' +
      '<img class="brand__mark" src="' + assetPrefix + 'assets/images/Group 32.png" alt="" width="52" height="52" decoding="async">' +
      "</a>";
  var navigationMarkup = isCaseStudy
    ? '<nav class="socials" aria-label="Social links"><span class="socials__label" id="find-me-text">You can find me on</span><ul class="socials__list" id="socials-list"></ul></nav>'
    :
    '<button class="nav-toggle" type="button" aria-label="Open navigation" aria-controls="primary-navigation" aria-expanded="false">' +
    "<span></span><span></span><span></span>" +
    "</button>" +
    '<nav class="primary-nav" aria-label="Main navigation">' +
    '<ul class="primary-nav__list" id="primary-navigation">' +
    '<li><a class="primary-nav__link" href="' + homePrefix + '#expertise">Skills</a></li>' +
    '<li><a class="primary-nav__link" href="' + homePrefix + '#work"' +
    (isProjectPage ? ' aria-current="page"' : "") +
    ">Work</a></li>" +
    '<li><a class="primary-nav__link" href="' + homePrefix + '#about-me">About Me</a></li>' +
    '<li><a class="primary-nav__link" href="' + homePrefix + '#experience">Experience</a></li>' +
    '<li><a class="primary-nav__link" href="' + homePrefix + '#education">Education</a></li>' +
    '<li><a class="primary-nav__link primary-nav__link--resume" id="resume-btn" href="' + assetPrefix + 'assets/resume.pdf" target="_blank" rel="noopener noreferrer">' +
    '<span id="resume-label">Resume</span><span class="visually-hidden">(opens in a new tab)</span>' +
    '<svg class="primary-nav__external-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
    "</a></li></ul></nav>" +
    '<nav class="socials" aria-label="Social links"><span class="socials__label" id="find-me-text">You can find me on</span><ul class="socials__list" id="socials-list"></ul></nav>';
  header.innerHTML =
    '<div class="container header__inner">' +
    brandMarkup +
    navigationMarkup +
    "</div>";

  var siteContent = window.SITE_CONTENT || {};
  var headerContent = siteContent.header || {};
  var resume = document.getElementById("resume-btn");
  if (resume && headerContent.resumeFile) resume.href = assetPrefix + headerContent.resumeFile;
  var findMeText = document.getElementById("find-me-text");
  if (findMeText) findMeText.textContent = headerContent.findMeText || "You can find me on";
  var socialsList = document.getElementById("socials-list");
  (headerContent.socials || []).forEach(function (social) {
    if (!social.url || !socialsList) return;
    var item = document.createElement("li");
    var link = document.createElement("a");
    link.className = "social-link";
    link.href = social.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.innerHTML = window.SITE_ICONS && window.SITE_ICONS[social.icon]
      ? window.SITE_ICONS[social.icon]
      : (social.label || social.icon);
    link.setAttribute("aria-label", social.label || social.icon);
    item.appendChild(link);
    socialsList.appendChild(item);
  });

  function updateHeaderState() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  window.addEventListener("scroll", updateHeaderState, { passive: true });
  updateHeaderState();
})();
