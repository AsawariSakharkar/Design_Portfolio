(function () {
  "use strict";

  var header = document.getElementById("site-header");
  if (!header) return;

  var isProjectPage = document.body.classList.contains("project-page");
  var assetPrefix = document.body.dataset.siteRoot || "";
  var homePrefix = isProjectPage ? assetPrefix + "index.html" : "";
  var homeHref = homePrefix + "#top";
  var projectsHref = homePrefix + "#work";

  var icons = {
    home: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    skills: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m13 2-9 12h7l-1 8 9-12h-7l1-8Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    work: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 7.5A1.5 1.5 0 0 1 4.5 6h5l2 2h8A1.5 1.5 0 0 1 21 9.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18V7.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    about: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="3.2" stroke="currentColor" stroke-width="1.8"/><path d="M5 20c.7-3.4 3.1-5.3 7-5.3s6.3 1.9 7 5.3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    experience: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="7" width="18" height="13" rx="1.8" stroke="currentColor" stroke-width="1.8"/><path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7M3 12h18M10 12v2h4v-2" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    education: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m3 9 9-4 9 4-9 4-9-4Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M6 11.2v4.3c2.9 2.4 9.1 2.4 12 0v-4.3M21 9v6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    social: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.8"/><circle cx="17.5" cy="6.7" r="1" fill="currentColor"/></svg>',
    resume: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3.5h8l4 4V20a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 3.5V8h4M8 12h8M8 16h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  };

  function navLink(label, icon, href, section, extra) {
    return (
      '<li><a class="icon-nav__link" href="' + href + '" aria-label="' + label + '"' +
      (section ? ' data-section="' + section + '"' : "") +
      (extra || "") + '>' +
      icons[icon] +
      '<span class="icon-nav__tooltip">' + label + "</span>" +
      "</a></li>"
    );
  }

  var headerContent = (window.SITE_CONTENT || {}).header || {};
  var instagram = (headerContent.socials || []).filter(function (social) {
    return social.icon === "instagram" && social.url;
  })[0];
  var socialMarkup = instagram
    ? navLink("Instagram", "social", instagram.url, "", ' target="_blank" rel="noopener noreferrer"')
    : "";

  header.innerHTML =
    '<div class="container header__inner">' +
    '<a class="brand" href="' + homeHref + '" aria-label="Asawari Sakharkar, home">' +
    '<span class="brand__mark" aria-hidden="true"><img src="' + assetPrefix + 'assets/images/Group 32.png" alt=""></span>' +
    '<span class="brand__name">Asawari Sakharkar</span>' +
    "</a>" +
    '<span class="header__divider" aria-hidden="true"></span>' +
    '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation" aria-label="Open navigation">' +
    '<span></span><span></span><span></span>' +
    "</button>" +
    '<nav class="icon-nav" aria-label="Primary"><ul class="icon-nav__list" id="primary-navigation">' +
    (isProjectPage
      ? navLink("Back to projects", "work", projectsHref, "", "")
      : navLink("Home", "home", homeHref, "top") +
        navLink("Skills", "skills", homePrefix + "#expertise", "expertise") +
        navLink("Work", "work", homePrefix + "#work", "work") +
        navLink("About me", "about", homePrefix + "#about-me", "about-me") +
        navLink("Experience", "experience", homePrefix + "#experience", "experience") +
        navLink("Education", "education", homePrefix + "#education", "education") +
        socialMarkup +
        navLink("Resume", "resume", assetPrefix + (headerContent.resumeFile || "assets/resume.pdf"), "", ' id="resume-btn" target="_blank" rel="noopener noreferrer"')) +
    "</ul></nav>" +
    "</div>";

  var links = Array.prototype.slice.call(document.querySelectorAll(".icon-nav__link"));
  var nav = header.querySelector(".icon-nav");
  var navToggle = header.querySelector(".nav-toggle");
  var isHomePage = !isProjectPage;

  function setNavOpen(isOpen) {
    if (!nav || !navToggle) return;
    nav.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  }

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      setNavOpen(!nav.classList.contains("is-open"));
    });
  }
  links.forEach(function (link) {
    link.addEventListener("click", function () {
      setNavOpen(false);
    });
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setNavOpen(false);
  });

  function setActive(sectionId) {
    links.forEach(function (link) {
      var isActive = isHomePage && link.dataset.section === sectionId;
      if (!isHomePage && link.dataset.section === "work") isActive = true;
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  if (isHomePage) {
    var sections = links.map(function (link) {
      return document.getElementById(link.dataset.section || "");
    }).filter(Boolean);

    if ("IntersectionObserver" in window) {
      var visible = new Set();
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        });
        var focusY = window.innerHeight * 0.42;
        var current = Array.from(visible).sort(function (a, b) {
          return Math.abs(a.getBoundingClientRect().top - focusY) -
            Math.abs(b.getBoundingClientRect().top - focusY);
        })[0];
        setActive(current ? current.id : "top");
      }, { rootMargin: "-30% 0px -55% 0px", threshold: 0 });
      sections.forEach(function (section) { observer.observe(section); });
    } else {
      setActive("top");
    }
  } else {
    setActive("work");
  }

  header.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", function () {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }, { passive: true });
})();
