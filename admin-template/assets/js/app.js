/* ==========================================================================
   app.js – shared behaviour for all pages.
   ========================================================================== */
(function ($) {
  "use strict";

  var MOBILE_MAX = 1199;

  $(function () {
    var $sidebar = $("#sidebar");

    /* Scrim behind the off-canvas sidebar on small screens */
    var $backdrop = $('<div class="sidebar-backdrop" aria-hidden="true"></div>');
    if ($sidebar.length) $("body").append($backdrop);

    function isDrawer() { return window.matchMedia("(max-width:" + MOBILE_MAX + "px)").matches; }

    function openSidebar() {
      $sidebar.addClass("open");
      $backdrop.addClass("show");
      $("#menuToggle").attr("aria-expanded", "true");
    }

    function closeSidebar() {
      $sidebar.removeClass("open");
      $backdrop.removeClass("show");
      $("#menuToggle").attr("aria-expanded", "false");
    }

    /* Toggle the sidebar on small screens */
    $(document).on("click", "#menuToggle", function () {
      if ($sidebar.hasClass("open")) closeSidebar(); else openSidebar();
    });

    /* Tap the scrim or press Esc to dismiss the drawer */
    $backdrop.on("click", closeSidebar);
    $(document).on("keydown", function (e) {
      if (e.key === "Escape") closeSidebar();
    });

    /* Reset when leaving the drawer breakpoint */
    $(window).on("resize", function () {
      if (!isDrawer()) closeSidebar();
    });

    /* Open/close the submenu */
    $(document).on("click", ".sidebar .nav-parent", function (e) {
      e.preventDefault();
      var $parent = $(this);
      $parent.toggleClass("open");
      $parent.attr("aria-expanded", $parent.hasClass("open") ? "true" : "false");
      $parent.next(".submenu").toggleClass("show");
    });

    /* Close the sidebar after a menu item is clicked (mobile) */
    $(document).on("click", ".sidebar .nav-link:not(.nav-parent)", function () {
      if (isDrawer()) closeSidebar();
    });
  });
})(jQuery);
