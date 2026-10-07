/* ==========================================================================
   pages/dashboard.js – logic specific to the Dashboard page (index.html)
   ========================================================================== */
(function ($) {
  "use strict";

  $(function () {
    /* ====== Sample data – replace with data from your API/backend ====== */
    var articles = [
      { title: "Disney's motion principles in designing interface animations", date: "Jan 13, 2026", views: "6.5K", likes: "3.4K", earn: "Rp 3.000", thumb: "Disney+", bg: "#fff", color: "#0b1c8c" },
      { title: "Building a design system that scales across teams",            date: "Jan 12, 2026", views: "5.1K", likes: "2.9K", earn: "Rp 2.500", thumb: "AWB",     bg: "#000", color: "#e0457b" },
      { title: "What Meta's redesign teaches us about product identity",       date: "Jan 10, 2026", views: "4.8K", likes: "2.2K", earn: "Rp 2.100", thumb: "Meta",    bg: "#fff", color: "#0866ff" }
    ];

    var agendaData = {
      8:  [],
      9:  [{ t: "09:00", title: "Weekly content planning", by: "Jokowi" }],
      10: [{ t: "10:15", title: "Review draft: API design basics", by: "alex" }],
      11: [{ t: "12:30", title: "Disney's motion principles in designing interface animations", by: "James k" },
           { t: "12:30", title: "Disney's motion principles in designing interface animations", by: "alex" },
           { t: "12:30", title: "Disney's motion principles in designing interface animations", by: "Jokowi" }],
      12: [{ t: "14:00", title: "Publish: Design tokens in practice", by: "James k" }],
      13: []
    };

    var days = ["S", "M", "T", "W", "F", "S"];
    var dates = [8, 9, 10, 11, 12, 13];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    /* ====== Render ====== */
    function esc(s) { return $("<div>").text(s).html(); }

    function renderArticles(filter) {
      var q = (filter || "").toLowerCase();
      var $list = $("#articleList").empty();
      var n = 0;

      $.each(articles, function (i, a) {
        if (q && a.title.toLowerCase().indexOf(q) === -1) return;
        n++;
        $list.append(
          '<article class="article-row">' +
            '<span class="rank">' + String(n).padStart(2, "0") + '</span>' +
            '<div class="thumb" style="background:' + a.bg + ';color:' + a.color + '">' + esc(a.thumb) + '</div>' +
            '<div><div class="title">' + esc(a.title) + '</div><div class="date">' + esc(a.date) + '</div></div>' +
            '<div class="metrics">' +
              '<span><i class="fa-solid fa-eye"></i>' + a.views + '</span>' +
              '<span><i class="fa-solid fa-thumbs-up"></i>' + a.likes + '</span>' +
              '<span class="earn"><i class="fa-solid fa-certificate"></i>' + a.earn + '</span>' +
            '</div>' +
          '</article>');
      });

      if (!n) $list.append('<div class="empty">No articles match your search.</div>');
    }

    function renderAgenda(d) {
      var items = agendaData[d] || [];
      var $agenda = $("#agenda").empty();

      if (!items.length) {
        $agenda.append('<div class="empty">No articles scheduled for this day.</div>');
        return;
      }

      $.each(items, function (i, it) {
        $agenda.append(
          '<div class="agenda-item"><span class="t">' + it.t + '</span><div>' +
            '<div class="fw-semibold">' + esc(it.title) + '</div>' +
            '<div class="by">Assigned by <b>' + esc(it.by) + '</b></div>' +
          '</div></div>');
      });
    }

    $.each(days, function (i, l) {
      $("#week").append('<button data-d="' + dates[i] + '" class="' + (dates[i] === 11 ? "active" : "") + '">' + l + '<span class="d">' + dates[i] + '</span></button>');
    });

    $.each(months, function (i, m) {
      $("#monthMenu").append('<li><a class="dropdown-item" href="#">' + m + '</a></li>');
    });

    renderArticles();
    renderAgenda(11);

    /* ====== Interactions ====== */
    $(document).on("click", "#week button", function () {
      $("#week button").removeClass("active");
      $(this).addClass("active");
      renderAgenda($(this).data("d"));
    });

    $(document).on("click", "#monthMenu a", function (e) {
      e.preventDefault();
      $("#monthLabel").text($(this).text());
    });

    $(document).on("input", "#searchInput", function () {
      renderArticles($(this).val());
    });
  });
})(jQuery);
