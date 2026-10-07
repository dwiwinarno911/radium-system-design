/* ==========================================================================
   pages/analytics.js – Highcharts setup for the analytics.html page
   ========================================================================== */
(function () {
  "use strict";

  function boot() {
    if (!window.Highcharts) return;
    var H = window.Highcharts;

    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    H.setOptions({
      colors: ["#12294a", "#e0457b", "#a5cef2", "#d2b4de", "#ffadcb", "#9fd0ff"],
      chart: { style: { fontFamily: "Poppins, system-ui, sans-serif" }, backgroundColor: "transparent" },
      title: { style: { color: "#12294a", fontWeight: "600" } },
      credits: { enabled: false },
      xAxis: { gridLineColor: "#e6edf4", lineColor: "#d9e1ea", tickColor: "#d9e1ea" },
      yAxis: { gridLineColor: "#e6edf4", title: { text: null } },
      legend: { itemStyle: { color: "#12294a", fontWeight: "500" } },
      tooltip: { backgroundColor: "#12294a", style: { color: "#fff" }, borderRadius: 8 }
    });

    function sparkline(id, data, color) {
      if (!document.getElementById(id)) return;
      H.chart(id, {
        chart: { type: "area", height: 52, margin: [2, 2, 2, 2], backgroundColor: "transparent" },
        title: { text: null }, legend: { enabled: false }, credits: { enabled: false },
        xAxis: { visible: false }, yAxis: { visible: false }, tooltip: { enabled: false },
        plotOptions: { series: { marker: { enabled: false }, lineWidth: 2, color: color } },
        series: [{ data: data, fillOpacity: 0.12 }]
      });
    }

    sparkline("aSpark1", [12, 18, 15, 22, 20, 28, 25, 32, 30, 38, 35, 42], "#12294a");
    sparkline("aSpark2", [8, 12, 10, 16, 14, 18, 17, 22, 21, 26, 24, 30], "#e0457b");
    sparkline("aSpark3", [20, 22, 19, 21, 18, 20, 17, 19, 18, 16, 17, 15], "#a5cef2");
    sparkline("aSpark4", [30, 28, 29, 26, 27, 25, 26, 24, 25, 23, 24, 22], "#d2b4de");

    if (document.getElementById("aTraffic")) {
      H.chart("aTraffic", {
        chart: { type: "spline" },
        title: { text: null },
        xAxis: { categories: months, crosshair: true },
        yAxis: { title: { text: "Count" } },
        tooltip: { shared: true },
        series: [
          { name: "Sessions", data: [1200, 1350, 1280, 1520, 1640, 1780, 1720, 1890, 2010, 2180, 2320, 2510] },
          { name: "Page Views", data: [2600, 2900, 2750, 3300, 3550, 3900, 3720, 4100, 4360, 4720, 5010, 5420] }
        ]
      });
    }

    if (document.getElementById("aPages")) {
      H.chart("aPages", {
        chart: { type: "bar" },
        title: { text: null },
        xAxis: { categories: ["/pricing", "/docs/getting-started", "/blog/css-queries", "/blog/design-systems", "/home"] },
        yAxis: { title: { text: "Views" } },
        plotOptions: { bar: { borderRadius: 6, borderWidth: 0 } },
        legend: { enabled: false },
        series: [{ name: "Views", data: [4200, 6800, 9100, 12400, 18600] }]
      });
    }

    if (document.getElementById("aDevices")) {
      H.chart("aDevices", {
        chart: { type: "pie" },
        title: { text: null },
        tooltip: { pointFormat: "<b>{point.percentage:.1f}%</b>" },
        plotOptions: { pie: { innerSize: "58%", borderRadius: 6, dataLabels: { enabled: true, format: "{point.name}: {point.percentage:.0f}%" } } },
        series: [{ name: "Sessions", data: [
          { name: "Desktop", y: 58 },
          { name: "Mobile", y: 34 },
          { name: "Tablet", y: 8 }
        ] }]
      });
    }

    if (document.getElementById("aCountries")) {
      H.chart("aCountries", {
        chart: { type: "column" },
        title: { text: null },
        xAxis: { categories: ["USA", "UK", "Germany", "Indonesia", "Japan"], crosshair: true },
        yAxis: { title: { text: "Sessions" } },
        plotOptions: { column: { borderRadius: 6, pointPadding: 0.15, borderWidth: 0 } },
        legend: { enabled: false },
        series: [{ name: "Sessions", data: [12400, 8600, 6400, 5200, 3900] }]
      });
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
