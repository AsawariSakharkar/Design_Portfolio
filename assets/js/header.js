(function () {
  "use strict";

  var header = document.getElementById("site-header");
  if (!header) return;

  var isProjectPage = document.body.classList.contains("project-page");
  var siteRoot = document.body.dataset.siteRoot || "";
  var homePrefix = isProjectPage ? siteRoot + "index.html" : "";
  var homeHref = homePrefix + "#top";
  var projectsHref = homePrefix + "#work";

  var content = (window.SITE_CONTENT || {}).header || {};
  var resumeHref = siteRoot + (content.resumeFile || "assets/resume.pdf");
  var logoSrc = siteRoot + "assets/images/Group 32.png";

  // Fallback: paste your LinkedIn profile URL here if it isn't in content.js
  var LINKEDIN_URL = "https://www.linkedin.com/in/asawari-sakharkar-0861b3300/";

  var icons = {
    home: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    skills: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m13 2-9 12h7l-1 8 9-12h-7l1-8Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    work: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 7.5A1.5 1.5 0 0 1 4.5 6h5l2 2h8A1.5 1.5 0 0 1 21 9.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18V7.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    about: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="3.2" stroke="currentColor" stroke-width="1.8"/><path d="M5 20c.7-3.4 3.1-5.3 7-5.3s6.3 1.9 7 5.3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    experience: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="7" width="18" height="13" rx="1.8" stroke="currentColor" stroke-width="1.8"/><path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7M3 12h18M10 12v2h4v-2" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    education: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m3 9 9-4 9 4-9 4-9-4Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M6 11.2v4.3c2.9 2.4 9.1 2.4 12 0v-4.3M21 9v6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" stroke-width="1.8"/><path d="M8 10.5V16M8 7.8v.01M12 16v-5.5M12 12.8c0-1.4 1-2.3 2.3-2.3 1.4 0 2.2.9 2.2 2.4V16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    resume: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3.5h8l4 4V20a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 3.5V8h4M8 12h8M8 16h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'
  };

  /* ---------- Shared pieces ---------- */

  var brandMarkup =
    '<a class="brand" href="' + homeHref + '" aria-label="Asawari Sakharkar, home">' +
      '<span class="brand__mark" aria-hidden="true"><img src="' + logoSrc + '" alt=""></span>' +
      '<span class="brand__name">Asawari Sakharkar</span>' +
    "</a>";

  /* ---------- Project pages: logo + name, then "Back to projects" ---------- */

  if (isProjectPage) {
    header.innerHTML =
      '<div class="header__inner">' +
        brandMarkup +
        '<span class="header__divider" aria-hidden="true"></span>' +
        '<a class="back-link" href="' + projectsHref + '">' +
          icons.work +
          "<span>Back to projects</span>" +
        "</a>" +
      "</div>";
    return;
  }

  /* ---------- Home page ---------- */

  function navLink(label, icon, href, section, shortLabel) {
    return (
      "<li>" +
        '<a class="icon-nav__link" href="' + href + '" aria-label="' + label + '" data-section="' + section + '">' +
          icons[icon] +
          '<span class="icon-nav__tooltip">' + (shortLabel || label) + "</span>" +
        "</a>" +
      "</li>"
    );
  }

  function otherLink(label, icon, href, extra, modifier) {
    return (
      "<li>" +
        '<a class="header__other-link' + (modifier ? " " + modifier : "") + '" href="' + href + '" aria-label="' + label + '"' + (extra || "") + ">" +
          (icon ? icons[icon] : "") +
          "<span>" + label + "</span>" +
        "</a>" +
      "</li>"
    );
  }

  var linkedin = (content.socials || []).filter(function (social) {
    return social.icon === "linkedin" && social.url;
  })[0];
  var linkedinUrl = (linkedin && linkedin.url) || LINKEDIN_URL;

  var externalAttrs = ' target="_blank" rel="noopener noreferrer"';

  // Top bar: brand on the left, other links on the right.
  header.innerHTML =
    '<div class="header__inner">' +
      brandMarkup +
      '<ul class="header__other">' +
        (linkedinUrl ? otherLink("LinkedIn", "linkedin", linkedinUrl, externalAttrs) : "") +
        otherLink("Resume", "", resumeHref, ' id="resume-btn"' + externalAttrs, "header__other-link--resume") +
      "</ul>" +
    "</div>";

  // Main navigation: centred on desktop, fixed to the bottom on mobile (see CSS).
  var existing = document.getElementById("page-nav");
  if (existing) existing.remove();

  var pageNav = document.createElement("nav");
  pageNav.id = "page-nav";
  pageNav.className = "page-nav";
  pageNav.setAttribute("aria-label", "Primary");
  pageNav.innerHTML =
    '<ul class="icon-nav__list">' +
      navLink("Home", "home", "#top", "top") +
      navLink("Work", "work", "#work", "work") +
      navLink("Skills", "skills", "#expertise", "expertise") +
      navLink("About me", "about", "#about-me", "about-me", "About") +
      navLink("Experience", "experience", "#experience", "experience") +
      navLink("Education", "education", "#education", "education", "Study") +
    "</ul>";
  header.parentNode.insertBefore(pageNav, header.nextSibling);

  /* ---------- Active section highlight ---------- */

  var links = Array.prototype.slice.call(pageNav.querySelectorAll(".icon-nav__link"));
  var targets = links
    .map(function (link) {
      return { id: link.dataset.section, el: document.getElementById(link.dataset.section) };
    })
    .filter(function (t) { return t.el; });

  var currentId = null;
  var locked = false;
  var ticking = false;
  var idleTimer = null;

  function setActive(id) {
    if (id === currentId) return;
    currentId = id;
    links.forEach(function (link) {
      if (link.dataset.section === id) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  // The active section is the last one whose top has passed the focus line.
  function sectionInView() {
    var focusY = window.innerHeight * 0.4;
    var found = "top";
    targets.forEach(function (t) {
      if (t.id !== "top" && t.el.getBoundingClientRect().top <= focusY) found = t.id;
    });
    var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    if (atBottom && targets.length) found = targets[targets.length - 1].id;
    return found;
  }

  function update() {
    ticking = false;
    if (!locked) setActive(sectionInView());
  }

  function unlockSoon(delay) {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(function () {
      locked = false;
      update();
    }, delay);
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
    if (locked) unlockSoon(150);
  }

  // Tapping a link highlights it straight away and holds that
  // until the smooth scroll has finished.
  links.forEach(function (link) {
    link.addEventListener("click", function () {
      setActive(link.dataset.section);
      locked = true;
      unlockSoon(900);
    });
  });

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  window.addEventListener("load", update);
  update();
})();