/* ==========================================================================
   pages/articles.js – client-side search & filter for the articles table
   ========================================================================== */
(function ($) {
  "use strict";

  $(function () {
    var $body = $("#artBody");
    if (!$body.length) return;

    var $rows = $body.find("tr");
    var total = 24;

    function apply() {
      var q = ($("#artSearch").val() || "").toLowerCase().trim();
      var cat = $("#artCategory").val() || "";
      var status = $("#artStatus").val() || "";
      var shown = 0;

      $rows.each(function () {
        var $r = $(this);
        var titleMatch = (q === "" || $r.data("title").toLowerCase().indexOf(q) !== -1);
        var match = titleMatch &&
          (!cat || $r.data("category") === cat) &&
          (!status || $r.data("status") === status);
        $r.toggle(match);
        if (match) shown++;
      });

      $body.find(".empty-row").remove();
      if (!shown) {
        $body.append('<tr class="empty-row"><td colspan="7" class="text-center text-muted py-4">No articles match your filters.</td></tr>');
      }
      $("#artCount").text("Showing " + shown + " of " + total + " articles");
    }

    $(document).on("input", "#artSearch", apply);
    $(document).on("change", "#artCategory, #artStatus", apply);
    $(document).on("click", "#artReset", function () {
      $("#artSearch").val("");
      $("#artCategory").val("");
      $("#artStatus").val("");
      apply();
    });
  });
})(jQuery);
