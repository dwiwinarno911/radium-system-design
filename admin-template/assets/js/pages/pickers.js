/* ==========================================================================
   pages/pickers.js – initialise datepicker, timepicker, daterangepicker,
   and Select2 on the ui-pickers.html page
   ========================================================================== */
(function ($) {
  "use strict";

  $(function () {
    /* ===== Date picker (bootstrap-datepicker) ===== */
    if ($.fn.datepicker) {
      $(".js-datepicker").datepicker({
        format: "dd MM yyyy",
        autoclose: true,
        todayHighlight: true,
        todayBtn: "linked",
        orientation: "bottom auto"
      });

      $(".js-datepicker-inline").datepicker({
        todayHighlight: true
      });
    }

    /* ===== Time picker (jquery-timepicker) ===== */
    if ($.fn.timepicker) {
      $(".js-timepicker").timepicker({
        timeFormat: "HH:mm",
        interval: 30,
        minTime: "08:00",
        maxTime: "20:00",
        defaultTime: "now",
        dynamic: false,
        dropdown: true,
        scrollbar: true
      });
    }

    /* ===== Date range picker (bootstrap-daterangepicker) ===== */
    if ($.fn.daterangepicker && window.moment) {
      $(".js-daterange").daterangepicker({
        startDate: moment().subtract(6, "days"),
        endDate: moment(),
        ranges: {
          "Today":        [moment(), moment()],
          "Last 7 Days":  [moment().subtract(6, "days"), moment()],
          "Last 30 Days": [moment().subtract(29, "days"), moment()],
          "This Month":   [moment().startOf("month"), moment().endOf("month")],
          "Last Month":   [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")]
        },
        locale: {
          format: "MM/DD/YYYY",
          separator: " - ",
          applyLabel: "Apply",
          cancelLabel: "Cancel",
          fromLabel: "From",
          toLabel: "To",
          customRangeLabel: "Custom Range",
          firstDay: 0
        }
      });
    }

    /* ===== Select2 ===== */
    if ($.fn.select2) {
      var opts = function (extra) {
        return $.extend({ theme: "bootstrap-5", width: "100%" }, extra || {});
      };

      $(".js-select2").each(function () {
        var $el = $(this);
        $el.select2(opts({ placeholder: $el.data("placeholder") || "Select..." }));
      });

      $(".js-select2-multi").select2(opts({
        placeholder: "Select multiple...",
        closeOnSelect: false
      }));

      $(".js-select2-tags").select2(opts({
        tags: true,
        tokenSeparators: [",", " "],
        placeholder: "Type and press Enter..."
      }));
    }
  });
})(jQuery);
