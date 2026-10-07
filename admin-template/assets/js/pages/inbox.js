/* ==========================================================================
   pages/inbox.js – sample mailbox: renders the list and the reading pane
   ========================================================================== */
(function ($) {
  "use strict";

  $(function () {
    var $list = $("#mailList");
    var $main = $("#mailMain");
    if (!$list.length) return;

    var messages = [
      { id: 1, from: "Sarah Lee", initials: "SL", subject: "Re: Design tokens article", time: "09:24", unread: true,
        preview: "Thanks for the draft, I left a few notes on section 3.",
        body: "<p>Hi,</p><p>Thanks for sharing the draft. I left a few notes on section 3 about naming conventions.</p><p>Overall it reads well. Let me know if you want me to look at the examples again.</p><p>Best,<br>Sarah</p>" },
      { id: 2, from: "John Carter", initials: "JC", subject: "Article request: Web performance", time: "08:10", unread: true,
        preview: "Could you write a piece about Core Web Vitals?",
        body: "<p>Hello,</p><p>Could you write a piece about Core Web Vitals for our readers? Something practical with real examples.</p><p>Thanks,<br>John</p>" },
      { id: 3, from: "Editorial Team", initials: "ET", subject: "Weekly content planning", time: "Yesterday", unread: false,
        preview: "Agenda for Monday's meeting is attached.",
        body: "<p>Team,</p><p>The agenda for Monday's meeting is attached. Please add your topics before Friday.</p><p>Regards,<br>Editorial Team</p>" },
      { id: 4, from: "Maya Ellis", initials: "ME", subject: "Broken link on /pricing", time: "Yesterday", unread: false,
        preview: "The CTA button leads to a 404 page.",
        body: "<p>Hi,</p><p>The main CTA button on the pricing page leads to a 404. Could you take a look?</p><p>Thanks,<br>Maya</p>" },
      { id: 5, from: "David Brooks", initials: "DB", subject: "Guest post proposal", time: "Jan 11", unread: false,
        preview: "I would love to contribute a post about TypeScript.",
        body: "<p>Hello,</p><p>I would love to contribute a guest post about TypeScript best practices. I can send an outline first.</p><p>Cheers,<br>David</p>" },
      { id: 6, from: "Laura Price", initials: "LP", subject: "Invoice for January", time: "Jan 10", unread: false,
        preview: "Please find the invoice for last month.",
        body: "<p>Hi,</p><p>Please find attached the invoice for last month. Let me know if anything is missing.</p><p>Thanks,<br>Laura</p>" }
    ];

    function esc(s) { return $("<div>").text(s).html(); }

    function renderList(filter) {
      var q = (filter || "").toLowerCase();
      $list.empty();
      var count = 0;

      $.each(messages, function (i, m) {
        if (q && (m.from + " " + m.subject + " " + m.preview).toLowerCase().indexOf(q) === -1) return;
        count++;
        $list.append(
          '<button class="mail-item' + (m.unread ? " unread" : "") + (m.id === 1 ? " active" : "") + '" data-id="' + m.id + '">' +
            '<div class="d-flex justify-content-between align-items-center mb-1">' +
              '<span class="from">' + esc(m.from) + '</span><span class="time">' + esc(m.time) + '</span>' +
            '</div>' +
            '<div class="subject">' + esc(m.subject) + '</div>' +
            '<div class="preview">' + esc(m.preview) + '</div>' +
          '</button>');
      });

      if (!count) $list.append('<div class="empty">No messages found.</div>');
    }

    function renderMain(id) {
      var m = null;
      $.each(messages, function (i, x) { if (x.id === id) m = x; });
      if (!m) { $main.html(""); return; }

      $main.html(
        '<div class="d-flex align-items-start gap-3 mb-3">' +
          '<div class="mail-avatar">' + esc(m.initials) + '</div>' +
          '<div class="flex-grow-1">' +
            '<div class="fw-semibold" style="color:var(--navy)">' + esc(m.from) + '</div>' +
            '<div class="text-muted small">to me &middot; ' + esc(m.time) + '</div>' +
          '</div>' +
          '<button class="btn btn-sm btn-outline-secondary btn-icon" title="More"><i class="fa-solid fa-ellipsis"></i></button>' +
        '</div>' +
        '<h4 class="h5 mb-3">' + esc(m.subject) + '</h4>' +
        '<div class="mb-3">' + m.body + '</div>' +
        '<hr>' +
        '<div class="d-flex gap-2 mb-3">' +
          '<button class="btn btn-navy btn-sm"><i class="fa-solid fa-reply me-2"></i>Reply</button>' +
          '<button class="btn btn-outline-secondary btn-sm"><i class="fa-solid fa-share me-2"></i>Forward</button>' +
        '</div>' +
        '<textarea class="form-control" rows="3" placeholder="Write a reply..."></textarea>');
    }

    renderList("");
    renderMain(1);

    $(document).on("click", ".mail-item", function () {
      var id = $(this).data("id");
      $(".mail-item").removeClass("active");
      $(this).addClass("active").removeClass("unread");
      renderMain(id);
    });

    $(document).on("input", "#mailSearch", function () {
      renderList($(this).val());
    });
  });
})(jQuery);
