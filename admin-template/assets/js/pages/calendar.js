/* ==========================================================================
   pages/calendar.js – FullCalendar setup for the calendar.html page
   ========================================================================== */
(function () {
  "use strict";

  function boot() {
    var el = document.getElementById("calendar");
    if (!el || !window.FullCalendar) return;

    var now = new Date();
    var y = now.getFullYear(), m = now.getMonth();

    var d = function (day, h, min) { return new Date(y, m, day, h || 9, min || 0); };

    var calendar = new window.FullCalendar.Calendar(el, {
      initialView: "dayGridMonth",
      height: "auto",
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
      },
      dayMaxEvents: true,
      navLinks: true,
      events: [
        { title: "Weekly content planning", start: d(3), backgroundColor: "#12294a", borderColor: "#12294a" },
        { title: "Review draft: API design basics", start: d(7, 10, 15), backgroundColor: "#2f5073", borderColor: "#2f5073" },
        { title: "Publish: Design tokens in practice", start: d(10, 14, 0), backgroundColor: "#e0457b", borderColor: "#e0457b" },
        { title: "Interview a guest author", start: d(12, 13, 0), backgroundColor: "#7fb5e6", borderColor: "#7fb5e6" },
        { title: "Deadline: technology article", start: d(15), backgroundColor: "#d2b4de", borderColor: "#d2b4de" },
        { title: "Editorial team meeting", start: d(18, 9, 30), end: d(18, 11, 0), backgroundColor: "#12294a", borderColor: "#12294a" },
        { title: "Update SEO for old posts", start: d(22), backgroundColor: "#2f5073", borderColor: "#2f5073" },
        { title: "Send weekly newsletter", start: d(25, 8, 0), backgroundColor: "#e0457b", borderColor: "#e0457b" },
        { title: "Public holiday", start: d(28), backgroundColor: "#9aa7b4", borderColor: "#9aa7b4" }
      ]
    });

    calendar.render();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
