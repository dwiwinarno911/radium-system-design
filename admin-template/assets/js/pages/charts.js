/* ==========================================================================
   pages/charts.js – Highcharts setup for the charts.html page
   ========================================================================== */
(function () {
  "use strict";

  function boot() {
    if (!window.Highcharts) return;
    var H = window.Highcharts;

    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    /* Global theme to match the template */
    H.setOptions({
      colors: ["#12294a", "#e0457b", "#a5cef2", "#d2b4de", "#ffadcb", "#9fd0ff"],
      chart: {
        style: { fontFamily: "Poppins, system-ui, sans-serif" },
        backgroundColor: "transparent"
      },
      title: { style: { color: "#12294a", fontWeight: "600" } },
      subtitle: { style: { color: "#6b7a8c" } },
      credits: { enabled: false },
      xAxis: { gridLineColor: "#e6edf4", lineColor: "#d9e1ea", tickColor: "#d9e1ea" },
      yAxis: { gridLineColor: "#e6edf4", title: { text: null } },
      legend: { itemStyle: { color: "#12294a", fontWeight: "500" } },
      tooltip: { backgroundColor: "#12294a", style: { color: "#fff" }, borderRadius: 8 }
    });

    /* Sparkline helper */
    function sparkline(id, data, color, type) {
      if (!document.getElementById(id)) return;
      H.chart(id, {
        chart: { type: type || "area", height: 56, margin: [2, 2, 2, 2], backgroundColor: "transparent" },
        title: { text: null },
        legend: { enabled: false },
        credits: { enabled: false },
        xAxis: { visible: false },
        yAxis: { visible: false },
        tooltip: { enabled: false },
        plotOptions: { series: { marker: { enabled: false }, lineWidth: 2, color: color } },
        series: [{ data: data, fillOpacity: 0.12 }]
      });
    }

    sparkline("spark1", [12, 18, 15, 22, 20, 28, 25, 32, 30, 38, 35, 42], "#12294a");
    sparkline("spark2", [8, 12, 10, 16, 14, 18, 17, 22, 21, 26, 24, 30], "#e0457b");
    sparkline("spark3", [20, 17, 19, 15, 18, 14, 16, 13, 15, 12, 14, 11], "#d2b4de");
    sparkline("spark4", [10, 12, 11, 13, 12, 14, 13, 13, 14, 13, 14, 14], "#a5cef2");

    /* Line: visits vs readers */
    if (document.getElementById("chartLine")) {
      H.chart("chartLine", {
        chart: { type: "spline" },
        title: { text: null },
        xAxis: { categories: months, crosshair: true },
        yAxis: { title: { text: "Count" } },
        tooltip: { shared: true },
        series: [
          { name: "Visits", data: [820, 932, 901, 1290, 1330, 1520, 1480, 1620, 1710, 1890, 2010, 2240] },
          { name: "Readers", data: [620, 710, 690, 980, 1020, 1180, 1120, 1240, 1310, 1420, 1510, 1680] }
        ]
      });
    }

    /* Area: revenue */
    if (document.getElementById("chartArea")) {
      H.chart("chartArea", {
        chart: { type: "area" },
        title: { text: null },
        xAxis: { categories: months },
        yAxis: { title: { text: "Million (IDR)" } },
        tooltip: { valueSuffix: " M" },
        series: [{
          name: "Revenue",
          data: [2.1, 2.4, 2.2, 3.1, 3.4, 3.9, 3.7, 4.2, 4.5, 4.9, 5.3, 5.8]
        }]
      });
    }

    /* Donut: traffic sources */
    if (document.getElementById("chartDonut")) {
      H.chart("chartDonut", {
        chart: { type: "pie" },
        title: { text: null },
        tooltip: { pointFormat: "<b>{point.percentage:.1f}%</b>" },
        plotOptions: {
          pie: {
            innerSize: "58%",
            borderRadius: 6,
            dataLabels: { enabled: true, format: "{point.name}: {point.percentage:.0f}%" }
          }
        },
        series: [{
          name: "Traffic",
          data: [
            { name: "Organic", y: 45 },
            { name: "Social", y: 25 },
            { name: "Direct", y: 18 },
            { name: "Referral", y: 12 }
          ]
        }]
      });
    }

    /* Column: articles by category */
    if (document.getElementById("chartBar")) {
      H.chart("chartBar", {
        chart: { type: "column" },
        title: { text: null },
        xAxis: { categories: ["Technology", "Design", "Business", "Health", "Education", "Entertainment"], crosshair: true },
        yAxis: { title: { text: "Articles" } },
        plotOptions: { column: { borderRadius: 6, pointPadding: 0.15, borderWidth: 0 } },
        series: [{ name: "Articles", data: [64, 48, 39, 27, 22, 18] }]
      });
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
