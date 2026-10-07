/* ==========================================================================
   app.js – shared behaviour for all pages.
   ========================================================================== */
(function ($) {
  "use strict";

  $(function () {
    /* Toggle the sidebar on small screens */
    $(document).on("click", "#menuToggle", function () {
      $("#sidebar").toggleClass("open");
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
      $("#sidebar").removeClass("open");
    });
  });
})(jQuery);
