/**
 * main.js — renders the page from SITE_CONTENT (content.js) + SITE_ICONS.
 * You normally never edit this file; change content.js instead.
 */
(function () {
  "use strict";

  var C = window.SITE_CONTENT || {};
  var ICONS = window.SITE_ICONS || {};

  var ARROW_RIGHT =
    '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var ARROW_DIAG =
    '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function $(id) {
    return document.getElementById(id);
  }
  function setText(id, value) {
    var el = $(id);
    if (el && value != null) el.textContent = value;
  }
  function el(tag, className) {
    var e = document.createElement(tag);
    if (className) e.className = className;
    return e;
  }

  // ---- Meta -------------------------------------------------------------
  function renderMeta() {
    var m = C.meta || {};
    if (m.title) document.title = m.title;
    if (m.description) {
      var d = document.querySelector('meta[name="description"]');
      if (d) d.setAttribute("content", m.description);
    }
    if (m.favicon) {
      var link = document.querySelector('link[rel="icon"]');
      if (link) {
        link.setAttribute("href", encodePath(m.favicon));
        var ext = m.favicon.split(".").pop().toLowerCase();
        var types = {
          svg: "image/svg+xml",
          png: "image/png",
          jpg: "image/jpeg",
          jpeg: "image/jpeg",
          ico: "image/x-icon",
          gif: "image/gif",
          webp: "image/webp",
        };
        if (types[ext]) link.setAttribute("type", types[ext]);
      }
    }
  }

  // ---- Header -----------------------------------------------------------
  function renderHeader() {
    var h = C.header || {};
    setText("resume-label", h.resumeLabel || "Resume");
    setText("find-me-text", h.findMeText || "You can find me on");

    var btn = $("resume-btn");
    if (btn && h.resumeFile) {
      btn.setAttribute("href", encodePath(h.resumeFile));
      btn.target = "_blank";
      btn.rel = "noopener noreferrer";
    }

    var list = $("socials-list");
    if (!list) return;
    list.innerHTML = "";
    (h.socials || []).forEach(function (s) {
      if (!s.url) return;
      var li = el("li");
      var a = el("a", "social-link");
      a.href = s.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.setAttribute("aria-label", s.label || s.icon);
      a.title = s.label || s.icon;
      a.innerHTML = ICONS[s.icon] || "";
      li.appendChild(a);
      list.appendChild(li);
    });
  }

  // ---- Hero -------------------------------------------------------------
  function renderHero() {
    var hero = C.hero || {};
    setText("hero-greeting", hero.greeting);
    setText("hero-name", hero.name);
    var tagline = $("hero-tagline");
    if (tagline) {
      tagline.textContent = hero.tagline || "";
    }
    setText("hero-subtitle", hero.subtitle);
    var img = $("hero-image");
    if (img) {
      img.src = encodePath(hero.image);
      img.alt = hero.imageAlt || "Portfolio portrait";
    }
  }

  // ---- Expertise --------------------------------------------------------
  function renderExpertise() {
    var e = C.expertise || {};
    setText("expertise-heading", e.heading || "Skills");
    var list = $("tags-list");
    if (!list) return;
    list.innerHTML = "";
    var groups = Object.create(null);
    (e.groups || []).forEach(function (groupName) {
      var group = el("li", "tag-group");
      var heading = el("h3", "tag-group__title");
      heading.textContent = groupName;
      var groupList = el("ul", "tag-group__list");
      group.appendChild(heading);
      group.appendChild(groupList);
      list.appendChild(group);
      groups[groupName] = groupList;
    });
    (e.tags || []).forEach(function (t) {
      var groupName = t.group || "Skills";
      if (!groups[groupName]) {
        var group = el("li", "tag-group");
        var heading = el("h3", "tag-group__title");
        heading.textContent = groupName;
        var groupList = el("ul", "tag-group__list");
        group.appendChild(heading);
        group.appendChild(groupList);
        list.appendChild(group);
        groups[groupName] = groupList;
      }
      var li = el("li", "tag" + (t.accent ? " tag--accent" : ""));
      li.textContent = t.label;
      if (t.label === "And an Outfit Planner" || t.accent) {
        li.tabIndex = 0;
        li.setAttribute("role", "button");
        li.addEventListener("click", function () {
          var target = $("about-me");
          if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
        li.addEventListener("keypress", function (event) {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            li.click();
          }
        });
      }
      groups[groupName].appendChild(li);
    });
    Object.keys(groups).forEach(function (groupName) {
      if (groups[groupName].children.length) return;
      var placeholder = el("li", "tag tag--placeholder");
      placeholder.textContent =
        groupName === "Prototyping & Tools" ? "[Add tools here]" : "[Add skills here]";
      groups[groupName].appendChild(placeholder);
    });
    var impactPanel = $("impact-panel");
    if (impactPanel) {
      impactPanel.innerHTML = "";
      (e.impact || []).forEach(function (item) {
        var stat = el("li", "impact-panel__item");
        var metric = el("p", "impact-panel__metric");
        metric.textContent = item.metric;
        var caption = el("p", "impact-panel__caption");
        caption.textContent = item.caption;
        stat.appendChild(metric);
        stat.appendChild(caption);
        impactPanel.appendChild(stat);
      });
    }
  }

  // ---- Projects ---------------------------------------------------------
  function renderProjects() {
    var p = C.projects || {};
    setText("projects-heading", p.heading || "My Projects");
    var grid = $("project-grid");
    if (!grid) return;
    grid.innerHTML = "";

    function appendProjectCard(item) {
      var entry = el("div", "project-entry");
      var status = el("span", "project-status");
      status.textContent = item.status || "Case study";
      entry.appendChild(status);
      var card;
      if (item.url) {
        card = el("a", "project-card");
        card.href = item.url;
        card.target = "_blank";
        card.rel = "noopener noreferrer";
      } else if (item.title) {
        card = el("a", "project-card");
        card.href = window.matchMedia("(max-width: 860px)").matches
          ? encodePath(item.pdf || "assets/project-pdfs/Arohi.pdf")
          : "project.html?project=" + encodeURIComponent(item.title);
      } else {
        card = el("div", "project-card");
      }
      var img = el("img");
      img.src = encodePath(item.image);
      img.alt = item.title || "Project";
      img.loading = "lazy";
      img.width = 800;
      img.height = 600;
      card.appendChild(img);

      if (item.title) {
        var overlay = el("div", "project-card__overlay");
        var title = el("span", "project-card__title");
        title.textContent = item.title;
        overlay.appendChild(title);
        card.appendChild(overlay);
      }

      entry.appendChild(card);
      if (item.description) {
        var description = el("p", "project-card__description");
        description.textContent = item.description;
        entry.appendChild(description);
      }
      if (item.tags && item.tags.length) {
        var tags = el("ul", "project-tags");
        tags.setAttribute("aria-label", "Project tags");
        item.tags.slice(0, 3).forEach(function (label) {
          var tag = el("li", "project-tags__item");
          tag.textContent = label;
          tags.appendChild(tag);
        });
        entry.appendChild(tags);
      }
      var role = el("p", "project-role");
      role.textContent = "Role: " + (item.role || "[Add your role]");
      entry.appendChild(role);

      var steps = el("ol", "project-steps");
      [
        ["Problem", item.problem],
        ["Research", item.research],
        ["Solution", item.solution],
        ["Impact", item.impact],
      ].forEach(function (step) {
        var stepItem = el("li", "project-steps__item");
        var stepLabel = el("strong");
        stepLabel.textContent = step[0];
        var stepText = el("span");
        stepText.textContent = step[1] || "[" + step[0] + " summary]";
        stepItem.appendChild(stepLabel);
        stepItem.appendChild(stepText);
        steps.appendChild(stepItem);
      });
      entry.appendChild(steps);

      if (item.url) {
        var caseStudyLink = el("a", "project-case-study");
        caseStudyLink.href = item.url;
        caseStudyLink.target = "_blank";
        caseStudyLink.rel = "noopener noreferrer";
        var caseStudyLabel = el("span");
        caseStudyLabel.textContent = "Read case study";
        var externalIcon = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        externalIcon.setAttribute("class", "project-case-study__icon");
        externalIcon.setAttribute("viewBox", "0 0 20 20");
        externalIcon.setAttribute("aria-hidden", "true");
        externalIcon.setAttribute("focusable", "false");
        var externalPath = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        externalPath.setAttribute("d", "M6 14 14 6M7 6h7v7");
        externalPath.setAttribute("fill", "none");
        externalPath.setAttribute("stroke", "currentColor");
        externalPath.setAttribute("stroke-width", "1.8");
        externalPath.setAttribute("stroke-linecap", "round");
        externalPath.setAttribute("stroke-linejoin", "round");
        externalIcon.appendChild(externalPath);
        caseStudyLink.appendChild(caseStudyLabel);
        caseStudyLink.appendChild(externalIcon);
        entry.appendChild(caseStudyLink);
      }
      grid.appendChild(entry);
    }

    var categories = p.categories || [];
    categories.forEach(function (category) {
      var categoryHeading = el("div", "project-category");
      var categoryTitle = el("h3", "project-category__title");
      categoryTitle.textContent = category.title || "Case Studies";
      var count = el("span", "project-category__count");
      var itemCount = (category.items || []).length;
      count.textContent = itemCount + " case stud" + (itemCount === 1 ? "y" : "ies");
      categoryHeading.appendChild(categoryTitle);
      categoryHeading.appendChild(count);
      grid.appendChild(categoryHeading);

      (category.items || []).forEach(appendProjectCard);
    });

    // Keep supporting the original flat data shape for future content edits.
    if (!categories.length) {
      (p.items || []).forEach(appendProjectCard);
    }

    if (p.seeMore && p.seeMore.label) {
      var more = el("a", "project-more-button");
      if (!p.seeMore.url) return;
      more.href = p.seeMore.url;
      if (p.seeMore.url) {
        more.target = "_blank";
        more.rel = "noopener noreferrer";
      }
      var label = el("span");
      label.textContent = p.seeMore.label;
      var arrow = el("span", "arrow");
      arrow.innerHTML = ARROW_RIGHT;
      more.appendChild(label);
      more.appendChild(arrow);
      grid.appendChild(more);
    }
  }

  // ---- Medium Articles ---------------------------------------------------
  function renderArticles() {
    var a = C.articles || {};
    setText("articles-heading", a.heading || "Latest from Medium");
    setText("articles-sub", a.subheading || "");
    var list = $("articles-list");
    if (!list) return;
    list.innerHTML = "";

    (a.items || []).forEach(function (item) {
      var card = el(item.url ? "a" : "div", "article-card");
      if (item.url) {
        card.href = item.url;
        card.target = "_blank";
        card.rel = "noopener noreferrer";
      }
      if (item.image) {
        var img = el("img", "article-card__image");
        img.src = encodePath(item.image);
        img.alt = item.title || "Medium article image";
        img.loading = "lazy";
        img.width = 800;
        img.height = 450;
        card.appendChild(img);
      }
      var header = el("div", "article-card__header");
      var title = el("h3", "article-card__title");
      title.textContent = item.title || "Medium Article";
      header.appendChild(title);
      if (item.url) {
        var arrow = el("span", "arrow article-card__arrow");
        arrow.innerHTML = ARROW_RIGHT;
        header.appendChild(arrow);
      }
      card.appendChild(header);
      if (item.date) {
        var date = el("time", "article-card__meta");
        var parsedDate = new Date(item.date);
        if (!Number.isNaN(parsedDate.getTime())) {
          date.dateTime = parsedDate.toISOString();
          date.textContent = parsedDate.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
        } else {
          date.textContent = item.date;
        }
        card.appendChild(date);
      }
      if (item.excerpt) {
        var excerpt = el("p", "article-card__excerpt");
        excerpt.textContent = item.excerpt;
        card.appendChild(excerpt);
      }
      var readLink = el("span", "article-card__read-link");
      readLink.textContent = "Read on Medium";
      card.appendChild(readLink);
      list.appendChild(card);
    });
  }

  function decodeHtml(html) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(html || "", "text/html");
    return doc.body.textContent || "";
  }

  function normalizeExcerpt(html) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(html || "", "text/html");
    var paragraph = doc.querySelector("p");
    if (paragraph && paragraph.textContent.trim()) {
      return paragraph.textContent.trim();
    }
    return doc.body.textContent.trim();
  }

  function fetchMediumFeed() {
    var a = C.articles || {};
    var feedUrl = a.feedUrl;
    if (!feedUrl || !window.fetch) return Promise.resolve();

    // Avoid attempting cross-origin RSS fetches from GitHub Pages or other
    // static-hosted origins that will be blocked by CORS. Only try live fetch
    // when running on localhost or a non-github origin.
    try {
      var host = window.location.hostname || "";
      if (host.indexOf("github.io") !== -1 || host === "") {
        return Promise.resolve();
      }
    } catch (e) {
      return Promise.resolve();
    }

    var proxies = [
      // prefer CORS proxy endpoints first; these may still fail depending on
      // availability, so fall back silently to the static items in content.js
      "https://api.allorigins.win/raw?url=" + encodeURIComponent(feedUrl),
      "https://api.allorigins.win/get?url=" + encodeURIComponent(feedUrl),
      feedUrl,
    ];

    function tryFetch(url) {
      return fetch(url, { mode: "cors", cache: "no-cache" })
        .then(function (response) {
          if (!response.ok) throw new Error("Fetch failed: " + response.status);
          return response.text().then(function (text) {
            if (url.indexOf("/get?") !== -1) {
              try {
                var json = JSON.parse(text);
                return json.contents || "";
              } catch (e) {
                throw new Error("Invalid JSON proxy response");
              }
            }
            return text;
          });
        })
        .then(function (text) {
          if (!text || text.indexOf("<rss") === -1) {
            throw new Error("Not RSS content");
          }
          return text;
        });
    }

    function parseFeed(xmlText) {
      var parser = new DOMParser();
      var xml = parser.parseFromString(xmlText, "application/xml");
      if (xml.querySelector("parsererror")) {
        throw new Error("Feed parse error");
      }
      var items = Array.prototype.slice.call(xml.querySelectorAll("item")).slice(0, 3);
      if (!items.length) throw new Error("No feed items found");
      return items.map(function (item) {
        var title = item.querySelector("title") ? decodeHtml(item.querySelector("title").textContent) : "Medium Article";
        var link = item.querySelector("link") ? decodeHtml(item.querySelector("link").textContent) : "";
        var excerpt = "";
        var desc = item.querySelector("description");
        if (desc) {
          excerpt = normalizeExcerpt(desc.textContent || desc.innerHTML);
        }
        if (!excerpt) {
          var content = item.querySelector("content\\:encoded");
          if (content) excerpt = normalizeExcerpt(content.textContent || content.innerHTML);
        }
        if (excerpt.length > 180) {
          excerpt = excerpt.slice(0, 180).trim() + "…";
        }
        return {
          title: title,
          url: link,
          date: item.querySelector("pubDate")
            ? item.querySelector("pubDate").textContent.trim()
            : "",
          excerpt: excerpt,
        };
      });
    }

    var attempt = proxies.reduce(function (promise, url) {
      return promise.catch(function () {
        return tryFetch(url);
      });
    }, Promise.reject());

    return attempt
      .then(function (xmlText) {
        var items = parseFeed(xmlText);
        if (items.length) {
          C.articles.items = items;
          renderArticles();
        }
      })
      .catch(function () {
        // Leave fallback content if live feed cannot be retrieved.
      });
  }
  function renderExperience() {
    var ex = C.experience || {};
    setText("experience-heading", ex.heading || "My Experience");
    var list = $("experience-list");
    if (!list) return;
    list.innerHTML = "";
    (ex.items || []).forEach(function (item) {
      var li = el("li", "timeline__item");
      var date = el("time", "timeline__date");
      date.textContent = item.duration || "[Add dates]";
      li.appendChild(date);
      var details = el("div", "timeline__content");
      var marker = el("span", "timeline__marker");
      var dot = el("span", "timeline__dot" + (item.current ? " timeline__dot--filled" : ""));
      marker.setAttribute("aria-hidden", "true");
      marker.appendChild(dot);
      details.appendChild(marker);
      var role = el("h3", "timeline__role");
      role.innerHTML =
        escapeHtml(item.role || "") +
        (item.org ? ' <span class="at">@' + escapeHtml(item.org) + "</span>" : "");
      details.appendChild(role);
      var orgLocation = el("p", "timeline__organization");
      var initials = el("span", "timeline__initial");
      initials.setAttribute("aria-hidden", "true");
      initials.textContent = (item.org || "?").trim().charAt(0).toUpperCase();
      var organizationName = el("span");
      organizationName.textContent = item.org || "[Organization]";
      var location = el("span");
      location.textContent = item.location || "[Location]";
      orgLocation.appendChild(initials);
      orgLocation.appendChild(organizationName);
      orgLocation.appendChild(location);
      details.appendChild(orgLocation);
      var descriptions = Array.isArray(item.description)
        ? item.description.filter(Boolean)
        : item.description
          ? [item.description]
          : [];
      var bulletList = el("ul", "timeline__desc-list");
      var bucketSize = Math.ceil(descriptions.length / 3);
      for (var i = 0; i < 3; i++) {
        var bullet = el("li", "timeline__desc-item");
        var bulletText = descriptions
          .slice(i * bucketSize, (i + 1) * bucketSize)
          .join(" ");
        bullet.textContent = bulletText || "[Action] resulting in [measurable outcome]";
        bulletList.appendChild(bullet);
      }
      details.appendChild(bulletList);
      li.appendChild(details);
      list.appendChild(li);
    });
  }

  // ---- Education --------------------------------------------------------
  function renderEducation() {
    var ed = C.education || {};
    setText("education-heading", ed.heading || "My Education");
    var list = $("education-list");
    if (!list) return;
    list.innerHTML = "";
    (ed.items || []).forEach(function (item) {
      var li = el("li", "timeline__item");
      li.appendChild(
        el("span", "timeline__dot" + (item.current ? " timeline__dot--filled" : ""))
      );
      var headingRow = el("div", "edu__heading-row");
      if (item.degree) {
        var degree = el("p", "edu__degree");
        degree.textContent = item.degree;
        headingRow.appendChild(degree);
      }
      if (item.institute) {
        var institute = el("h3", "timeline__role edu__institute");
        institute.textContent = item.institute;
        headingRow.appendChild(institute);
      }
      var meta = el("p", "edu__meta");
      meta.textContent = [item.period, item.location].filter(Boolean).join(" · ");
      if (meta.textContent) headingRow.appendChild(meta);
      li.appendChild(headingRow);
      var coursework = el("ul", "education-coursework");
      coursework.setAttribute("aria-label", "Selected coursework");
      (item.coursework || ["[Add selected coursework]"]).forEach(function (course) {
        var chip = el("li", "project-tags__item");
        chip.textContent = course;
        coursework.appendChild(chip);
      });
      li.appendChild(coursework);
      if (item.program) {
        var prog = el("p", "edu__program");
        prog.textContent = item.program;
        li.appendChild(prog);
      }
      list.appendChild(li);
    });
    setupEducationTimeline(list);
  }

  function setupEducationTimeline(list) {
    var dots = list.querySelectorAll(".timeline__dot");
    if (!dots.length) return;

    function measureLine() {
      var listTop = list.getBoundingClientRect().top;
      var firstDot = dots[0].getBoundingClientRect();
      var lastDot = dots[dots.length - 1].getBoundingClientRect();
      var lineTop = firstDot.top + firstDot.height / 2 - listTop;
      var lineHeight = Math.max(
        0,
        lastDot.top + lastDot.height / 2 - firstDot.top - firstDot.height / 2
      );

      list.style.setProperty("--timeline-line-top", lineTop + "px");
      list.style.setProperty("--timeline-line-height", lineHeight + "px");
    }
    measureLine();

    if (!("IntersectionObserver" in window)) {
      list.classList.add("is-animated");
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        list.classList.toggle("is-animated", entries[0].isIntersecting);
      },
      { threshold: 0.15 }
    );
    observer.observe(list);
  }

  // ---- Fashion ----------------------------------------------------------
  // Encode each path segment so file names with spaces/special chars
  // (e.g. "PXL_...~2.jpg") resolve correctly on GitHub Pages.
  function encodePath(path) {
    return String(path || "")
      .split("/")
      .map(function (seg) {
        return encodeURIComponent(seg);
      })
      .join("/");
  }

  function buildOutfit(photo) {
    var fig = el("figure", "outfit");
    var img = el("img");
    img.src = encodePath(photo.image);
    img.alt = photo.alt || "Outfit";
    img.loading = "lazy";
    img.width = 280;
    img.height = 410;
    img.draggable = false;
    fig.appendChild(img);
    return fig;
  }

  function buildBookCover(book) {
    var figure = el("figure", "book-cover");
    if (book.image) {
      var img = el("img");
      img.src = encodePath(book.image);
      img.alt = book.title || "Book cover";
      img.loading = "lazy";
      img.width = 180;
      img.height = 260;
      img.draggable = false;
      figure.appendChild(img);
    } else {
      var placeholder = el("div", "book-cover__placeholder");
      placeholder.setAttribute("role", "img");
      placeholder.setAttribute("aria-label", book.title || "Book cover placeholder");
      var label = el("span");
      label.textContent = "Add cover image";
      placeholder.appendChild(label);
      figure.appendChild(placeholder);
    }
    return figure;
  }

  function shuffleArray(array) {
    var shuffled = array.slice();
    for (var i = shuffled.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = shuffled[i];
      shuffled[i] = shuffled[j];
      shuffled[j] = temp;
    }
    return shuffled;
  }

  function renderFashion() {
    var f = C.fashion || {};
    setText("fashion-heading", f.heading);
    setText("fashion-greeting", f.greeting);
    var about = $("fashion-about");
    if (about) {
      about.innerHTML = "";
      (f.paragraphs || []).forEach(function (text) {
        var paragraph = el("p", "fashion__paragraph");
        appendFormattedText(paragraph, text);
        about.appendChild(paragraph);
      });
    }
    var aboutImageHolder = $("fashion-image-holder");
    if (aboutImageHolder) {
      aboutImageHolder.innerHTML = "";
      if (f.aboutImage) {
        var aboutImage = el("img");
        aboutImage.src = encodePath(f.aboutImage);
        aboutImage.alt = f.aboutImageAlt || "About me";
        aboutImage.loading = "lazy";
        aboutImage.width = 968;
        aboutImage.height = 1082;
        aboutImage.addEventListener("error", function () {
          aboutImageHolder.innerHTML = "";
          var imagePlaceholder = el("span", "fashion__image-placeholder");
          imagePlaceholder.textContent = "Add your photo";
          imagePlaceholder.setAttribute("role", "img");
          imagePlaceholder.setAttribute("aria-label", "Photo placeholder");
          aboutImageHolder.appendChild(imagePlaceholder);
        });
        aboutImageHolder.appendChild(aboutImage);
      } else {
        var imagePlaceholder = el("span", "fashion__image-placeholder");
        imagePlaceholder.textContent = "Add your photo";
        imagePlaceholder.setAttribute("role", "img");
        imagePlaceholder.setAttribute("aria-label", "Photo placeholder");
        aboutImageHolder.appendChild(imagePlaceholder);
      }
    }
    setText("fashion-books-heading", f.booksHeading);
    setText("fashion-sub", f.subheading);
    setText("fashion-outfit-intro", f.outfitIntro);
    var bookScroller = $("book-scroller");
    if (bookScroller) {
      bookScroller.innerHTML = "";
      var books = f.books || [];
      var bookTrack = el("div", "book-track");
      books.forEach(function (book) {
        bookTrack.appendChild(buildBookCover(book));
      });
      bookScroller.appendChild(bookTrack);
      setupCarousel(
        bookScroller,
        bookTrack,
        books.length,
        1,
        ".book-cover",
        "book-scroller--manual"
      );
    }

    var scroller = $("outfit-scroller");
    if (!scroller) return;

    var photos = shuffleArray(f.photos || []);
    scroller.innerHTML = "";

    var track = el("div", "outfit-track");
    photos.forEach(function (photo) {
      track.appendChild(buildOutfit(photo));
    });
    scroller.appendChild(track);

    setupCarousel(
      scroller,
      track,
      photos.length,
      -1,
      ".outfit",
      "outfit-scroller--manual"
    );
  }

  function appendFormattedText(target, text) {
    var parsed = new DOMParser().parseFromString(String(text || ""), "text/html");

    function appendNodes(source, destination) {
      Array.prototype.forEach.call(source.childNodes, function (node) {
        if (node.nodeType === Node.TEXT_NODE) {
          destination.appendChild(document.createTextNode(node.nodeValue));
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          var tagName = node.tagName.toLowerCase();
          if (tagName === "strong" || tagName === "em") {
            var formatted = document.createElement(tagName);
            appendNodes(node, formatted);
            destination.appendChild(formatted);
          } else {
            appendNodes(node, destination);
          }
        }
      });
    }

    appendNodes(parsed.body, target);
  }

  // ---- Auto-moving carousel --------------------------------------------
  function setupCarousel(
    scroller,
    track,
    originalCount,
    direction,
    cardSelector,
    manualClass,
    manualOnly
  ) {
    if (!track.children.length) return;

    var reduceMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Reduced-motion / no-JS-animation fallback: plain manual scroll.
    if (reduceMotion || manualOnly) {
      scroller.classList.add(manualClass);
      return;
    }

    // Duplicate the set so we can loop seamlessly.
    var originals = Array.prototype.slice.call(track.children);
    originals.forEach(function (node) {
      track.appendChild(node.cloneNode(true));
    });

    var NORMAL_SPEED = 45; // px per second
    var SLOW_SPEED = 4; // px per second while hovering an image
    var targetSpeed = NORMAL_SPEED;
    var currentSpeed = NORMAL_SPEED;

    var offset = 0;
    var loopWidth = 0;
    var lastTime = null;
    var hasMeasured = false;

    function measure() {
      // Distance from the first item to its duplicate = one full loop.
      var dup = track.children[originalCount];
      loopWidth = dup ? dup.offsetLeft : track.scrollWidth / 2;
      if (!hasMeasured) {
        offset = direction > 0 ? -loopWidth : 0;
        hasMeasured = true;
      }
    }
    measure();
    window.addEventListener("resize", measure);

    function pointerIsOnCard(target) {
      return target.closest && target.closest(cardSelector);
    }

    // Slow down drastically while hovering a gallery card.
    scroller.addEventListener("pointerenter", function (e) {
      if (pointerIsOnCard(e.target)) {
        targetSpeed = SLOW_SPEED;
      }
    });
    scroller.addEventListener(
      "pointerover",
      function (e) {
        targetSpeed = pointerIsOnCard(e.target) ? SLOW_SPEED : NORMAL_SPEED;
      }
    );
    scroller.addEventListener("pointerout", function (e) {
      if (!e.relatedTarget || !scroller.contains(e.relatedTarget)) {
        targetSpeed = NORMAL_SPEED;
      }
    });
    scroller.addEventListener("pointerleave", function () {
      targetSpeed = NORMAL_SPEED;
    });

    // Pause entirely when the tab is hidden to avoid a jump on return.
    var paused = false;
    document.addEventListener("visibilitychange", function () {
      paused = document.hidden;
      if (!paused) lastTime = null;
    });

    function frame(now) {
      if (lastTime == null) lastTime = now;
      var dt = (now - lastTime) / 1000;
      lastTime = now;

      // Ease current speed toward the target for a smooth slow-down.
      currentSpeed += (targetSpeed - currentSpeed) * Math.min(1, dt * 6);

      if (!paused && loopWidth > 0) {
        offset += direction * currentSpeed * dt;
        if (direction > 0 && offset >= 0) offset -= loopWidth;
        if (direction < 0 && offset <= -loopWidth) offset += loopWidth;
        track.style.transform = "translate3d(" + offset + "px, 0, 0)";
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  // ---- Connect ----------------------------------------------------------
  function renderConnect() {
    var c = C.connect || {};
    setText(
      "connect-heading",
      c.heading || "Hiring for UX or information design? Let's talk."
    );
    var email = $("connect-email");
    if (email && c.email) {
      email.textContent = c.email;
      email.href = "mailto:" + c.email;
    }
    var list = $("connect-links");
    if (!list) return;
    list.innerHTML = "";
    var links = (c.links || []).slice();
    var resumeLink = {
      label: "Resume",
      url: (C.header && C.header.resumeFile) || "assets/resume.pdf",
    };
    var linkedinIndex = links.findIndex(function (link) {
      return link.label === "LinkedIn";
    });
    links.splice(linkedinIndex < 0 ? 0 : linkedinIndex + 1, 0, resumeLink);
    var linkOrder = { LinkedIn: 0, Resume: 1, "Medium Articles": 2 };
    links.sort(function (a, b) {
      var aOrder = linkOrder[a.label] === undefined ? 3 : linkOrder[a.label];
      var bOrder = linkOrder[b.label] === undefined ? 3 : linkOrder[b.label];
      return aOrder - bOrder;
    });
    links.forEach(function (link) {
      if (!link.url) return;
      var li = el("li");
      var a = el("a", "connect__link");
      a.href = link.url;
      if (/^https?:/i.test(link.url) || link.url.toLowerCase().endsWith(".pdf")) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }
      var label = el("span");
      label.textContent = link.label;
      if (link.label === "Resume") {
        var newTabNote = el("span", "visually-hidden");
        newTabNote.textContent = "(opens in a new tab)";
        label.appendChild(newTabNote);
      }
      var arrow = el("span", "arrow");
      arrow.innerHTML = ARROW_DIAG;
      a.appendChild(label);
      a.appendChild(arrow);
      li.appendChild(a);
      list.appendChild(li);
    });
  }

  // ---- Footer note ------------------------------------------------------
  function renderFooter() {
    var name = ((C.hero && C.hero.name) || "").replace(/^I am\s+/i, "");
    var year = new Date().getFullYear();
    setText(
      "footer-text",
      "© " + year + (name ? " " + name : "") + ". All rights reserved."
    );
  }

  // ---- Active section navigation ---------------------------------------
  function setupMobileNavigation() {
    var toggle = document.querySelector(".nav-toggle");
    var navigation = document.querySelector(".primary-nav");
    if (!toggle || !navigation) return;

    function closeMenu() {
      navigation.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
    }

    toggle.addEventListener("click", function () {
      var isOpen = toggle.getAttribute("aria-expanded") === "true";
      navigation.classList.toggle("is-open", !isOpen);
      toggle.setAttribute("aria-expanded", String(!isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    });
    navigation.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) closeMenu();
    });
  }

  function setupActiveNavigation() {
    var links = Array.prototype.slice.call(
      document.querySelectorAll('.primary-nav__link[href^="#"]')
    );
    if (!links.length) return;

    function setActiveLink(sectionId) {
      links.forEach(function (link) {
        if (link.hash.slice(1) === sectionId) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }

    var sections = links
      .map(function (link) {
        return document.getElementById(link.hash.slice(1));
      })
      .filter(Boolean);
    if (!sections.length) return;

    if (!("IntersectionObserver" in window)) {
      function updateActiveLink() {
        var focusY = window.innerHeight / 2;
        var current = sections.find(function (section) {
          var bounds = section.getBoundingClientRect();
          return bounds.top <= focusY && bounds.bottom > focusY;
        });
        setActiveLink(current ? current.id : "");
      }
      window.addEventListener("scroll", updateActiveLink, { passive: true });
      window.addEventListener("resize", updateActiveLink);
      updateActiveLink();
      return;
    }

    var visibleSections = new Set();
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            visibleSections.add(entry.target);
          } else {
            visibleSections.delete(entry.target);
          }
        });

        var focusY = window.innerHeight / 2;
        var current = Array.from(visibleSections).sort(function (a, b) {
          return (
            Math.abs(a.getBoundingClientRect().top - focusY) -
            Math.abs(b.getBoundingClientRect().top - focusY)
          );
        })[0];
        setActiveLink(current ? current.id : "");
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  // ---- Scroll reveal ----------------------------------------------------
  function setupReveal() {
    var selectors = [
      ".hero__text",
      ".hero__art",
      ".section-title",
      ".tag",
      ".project-entry",
      ".article-card",
      ".metric",
      ".timeline__item",
      ".fashion__heading",
      ".connect__link",
    ];
    var els = [];
    selectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (node) {
        node.classList.add("reveal");
        els.push(node);
      });
    });

    if (!("IntersectionObserver" in window)) {
      els.forEach(function (n) {
        n.classList.add("is-visible");
      });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting) {
            setTimeout(function () {
              entry.target.classList.add("is-visible");
            }, Math.min(i, 6) * 50);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach(function (n) {
      io.observe(n);
    });
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function init() {
    renderMeta();
    renderHeader();
    renderHero();
    renderExpertise();
    renderProjects();
    renderArticles();
    fetchMediumFeed();
    renderExperience();
    renderEducation();
    renderFashion();
    renderConnect();
    renderFooter();
    setupMobileNavigation();
    setupActiveNavigation();
    setupReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
