/* ==========================================================================
   layout.js – single source for the topbar & sidebar on every page.
   Usage:
     1. Add an attribute to <body>:  <body data-page="articles">
     2. Provide two mount points on the page:
          <div id="topbar-root"></div>
          <aside class="sidebar" id="sidebar"></aside>
   To add a menu: append an item to the MENU array below. Items with a
   `children` property automatically become an openable/closable submenu.
   Each HTML file must use the same data-page as the item's `page` value.
   ========================================================================== */
(function () {
  "use strict";

  var MENU = [
    { page: "dashboard", href: "index.html",     icon: "fa-solid fa-table-cells-large", label: "Dashboard" },
    { page: "articles",  href: "articles.html",  icon: "fa-regular fa-file-lines",      label: "My Articles" },
    { page: "analytics", href: "analytics.html", icon: "fa-solid fa-chart-column",      label: "Analytics" },
    { page: "inbox",     href: "inbox.html",     icon: "fa-solid fa-envelope",          label: "Inbox" },
    { page: "post-plan", href: "post-plan.html", icon: "fa-regular fa-calendar-days",   label: "Post Plan" },
    { label: "UI Components", icon: "fa-solid fa-layer-group", children: [
      { page: "ui-alerts",  href: "ui-alerts.html",  label: "Alerts & Labels" },
      { page: "ui-buttons", href: "ui-buttons.html", label: "Buttons" },
      { page: "ui-tables",  href: "ui-tables.html",  label: "Tables" },
      { page: "ui-forms",   href: "ui-forms.html",   label: "Forms" },
      { page: "ui-modals",  href: "ui-modals.html",  label: "Modals" },
      { page: "ui-pickers", href: "ui-pickers.html", label: "Pickers" },
      { page: "ui-editors", href: "ui-editors.html", label: "Editors" }
    ]},
    { page: "charts",   href: "charts.html",   icon: "fa-solid fa-chart-line",   label: "Charts" },
    { page: "calendar", href: "calendar.html", icon: "fa-regular fa-calendar",   label: "Calendar" },
    { page: "settings", href: "settings.html", icon: "fa-solid fa-gear",         label: "Settings" }
  ];

  function leafHtml(item, active) {
    var cls = item.page === active ? " active" : "";
    return '<a class="nav-link' + cls + '" href="' + item.href + '">' +
             '<i class="' + item.icon + '"></i>' + item.label + '</a>';
  }

  function parentHtml(item, active) {
    var childActive = item.children.some(function (c) { return c.page === active; });
    var kids = item.children.map(function (c) {
      var cls = c.page === active ? " active" : "";
      return '<a class="nav-link' + cls + '" href="' + c.href + '">' + c.label + '</a>';
    }).join("");

    return '<a class="nav-link nav-parent' + (childActive ? " active open" : "") + '" href="#" role="button" aria-expanded="' + (childActive ? "true" : "false") + '">' +
             '<i class="' + item.icon + '"></i>' + item.label +
             '<i class="fa-solid fa-chevron-right chev"></i>' +
           '</a>' +
           '<div class="submenu' + (childActive ? " show" : "") + '">' + kids + '</div>';
  }

  function sidebarHtml(active) {
    var items = MENU.map(function (m) {
      return m.children ? parentHtml(m, active) : leafHtml(m, active);
    }).join("");
    return '<nav class="nav flex-column">' + items + '</nav>';
  }

  function topbarHtml() {
    return [
      '<header class="topbar">',
        '<button class="icon-btn menu-toggle" id="menuToggle" aria-label="Open menu"><i class="fa-solid fa-bars"></i></button>',
        '<a href="index.html" class="brand">LOGO</a>',
        '<div class="search">',
          '<i class="fa-solid fa-magnifying-glass"></i>',
          '<input id="searchInput" type="search" class="form-control" placeholder="Search">',
        '</div>',
        '<div class="ms-auto d-flex align-items-center gap-3">',
          '<button class="icon-btn" aria-label="Messages"><i class="fa-regular fa-message"></i></button>',
          '<button class="icon-btn" aria-label="Notifications"><i class="fa-regular fa-bell"></i><span class="dot"></span></button>',
          '<div class="dropdown">',
            '<a href="#" class="user dropdown-toggle" data-bs-toggle="dropdown">',
              '<span class="name">John Snow</span>',
              '<span class="avatar"><i class="fa-solid fa-user"></i></span>',
            '</a>',
            '<ul class="dropdown-menu dropdown-menu-end">',
              '<li><a class="dropdown-item" href="settings.html">Profile</a></li>',
              '<li><a class="dropdown-item" href="settings.html">Settings</a></li>',
              '<li><hr class="dropdown-divider"></li>',
              '<li><a class="dropdown-item" href="#">Log out</a></li>',
            '</ul>',
          '</div>',
        '</div>',
      '</header>'
    ].join("");
  }

  function mount() {
    var active = document.body.getAttribute("data-page") || "";
    var topbarRoot = document.getElementById("topbar-root");
    if (topbarRoot) topbarRoot.innerHTML = topbarHtml();
    var sidebar = document.getElementById("sidebar");
    if (sidebar) sidebar.innerHTML = sidebarHtml(active);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
