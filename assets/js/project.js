(function () {
  "use strict";

  var content = window.SITE_CONTENT || {};
  var projectTitle = new URLSearchParams(window.location.search).get("project");
  var selectedProject = null;
  var categories = (content.projects && content.projects.categories) || [];

  categories.forEach(function (category) {
    (category.items || []).forEach(function (item) {
      if (!selectedProject && item.title === projectTitle) {
        selectedProject = item;
      }
    });
  });

  if (!selectedProject) {
    (content.projects && content.projects.items || []).forEach(function (item) {
      if (!selectedProject && item.title === projectTitle) selectedProject = item;
    });
  }

  var contentElement = document.getElementById("project-content");
  var notFoundElement = document.getElementById("project-not-found");
  if (!selectedProject) {
    contentElement.hidden = true;
    notFoundElement.hidden = false;
    return;
  }

  document.title = selectedProject.title + " | Asawari Sakharkar";
  var descriptionMeta = document.querySelector('meta[name="description"]');
  if (descriptionMeta) {
    descriptionMeta.setAttribute(
      "content",
      selectedProject.description || selectedProject.title
    );
  }

  var pdfPath = String(selectedProject.pdf || "assets/project-pdfs/Arohi.pdf")
    .split("/")
    .map(encodeURIComponent)
    .join("/");
  var pdfZoomQuery = window.matchMedia("(max-width: 860px)");
  if (pdfZoomQuery.matches) {
    window.location.replace(pdfPath);
    return;
  }

  var pdfFrame = document.getElementById("project-pdf-frame");
  document.body.classList.add("project-page--pdf");
  contentElement.hidden = true;
  document.getElementById("project-document").hidden = false;
  pdfFrame.src = pdfPath + "#zoom=48";
  pdfFrame.title = selectedProject.title + " case study PDF";
})();