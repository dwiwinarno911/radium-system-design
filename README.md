# Radium System Design — Admin Template

Template dashboard admin **statis (HTML + CSS + JavaScript)** yang siap pakai untuk panel penulisan/editorial.
Tampilannya mengikuti tema *navy* yang bersih, dibangun di atas Bootstrap 5, dan sudah responsif sampai layar ponsel.

> Tidak butuh build tool, bundler, atau `node_modules` — cukup buka filenya di browser.

**Stack:** HTML5 · CSS3 · Bootstrap 5 · jQuery · Vanilla JS · Font Awesome 6 · Font Poppins (lokal)

---

## Daftar Isi

- [Fitur](#fitur)
- [Menjalankan](#menjalankan)
- [Struktur Direktori](#struktur-direktori)
- [Halaman](#halaman)
- [Sistem Layout](#sistem-layout)
- [Kustomisasi Tema](#kustomisasi-tema)
- [Komponen & Library Pihak Ketiga](#komponen--library-pihak-ketiga)
- [Responsif](#responsif)
- [Lisensi](#lisensi)

---

## Fitur

- **Satu sumber untuk topbar & sidebar** — dipasang otomatis oleh `layout.js` ke setiap halaman, jadi navigasi tidak perlu disalin ulang.
- **17 halaman siap pakai** — dari dashboard, manajemen artikel, sampai kumpulan komponen UI.
- **Tema kohesif** — seluruh komponen bawaan Bootstrap maupun library pihak ketiga (datepicker, Select2, CKEditor, FullCalendar) sudah diseragamkan dengan palet template.
- **Responsif penuh** — sidebar berubah menjadi *drawer off-canvas* di layar kecil, lengkap dengan backdrop, tombol hamburger, dan tombol Esc.
- **Halaman mandiri** — halaman login dan sample email newsletter berdiri sendiri, tidak bergantung pada kerangka admin.
- **Tanpa dependensi build** — font, ikon, dan semua library sudah tersedia lokal di `assets/`.

---

## Menjalankan

Pilih salah satu cara:

1. **Langsung** — buka `admin-template/index.html` di browser.

2. **Lewat server lokal (disarankan)** — beberapa halaman memuat library vendor lewat jalur relatif, dan server lokal memastikan semuanya termuat benar:

   ```bash
   cd admin-template
   python3 -m http.server 8000
   # lalu buka http://localhost:8000/
   ```

---

## Struktur Direktori

```
radium-system-design/
├── reference.jpg                 # Referensi desain / blueprint tata letak
├── README.md
└── admin-template/
    ├── index.html                # Dashboard
    ├── articles.html             # My Articles
    ├── analytics.html            # Analytics
    ├── inbox.html                # Inbox
    ├── post-plan.html            # Post Plan
    ├── calendar.html             # Calendar (FullCalendar)
    ├── charts.html               # Charts (Highcharts)
    ├── settings.html             # Settings
    ├── login.html                # Halaman login (mandiri)
    ├── email-template.html       # Sample email newsletter (mandiri)
    ├── ui-alerts.html            # UI: Alerts & Labels
    ├── ui-buttons.html           # UI: Buttons
    ├── ui-tables.html            # UI: Tables
    ├── ui-forms.html             # UI: Forms
    ├── ui-modals.html            # UI: Modals & Offcanvas
    ├── ui-pickers.html           # UI: Pickers
    ├── ui-editors.html           # UI: Editors
    └── assets/
        ├── css/
        │   ├── poppins.css       # @font-face Poppins
        │   ├── bootstrap.min.css # Bootstrap 5
        │   ├── style.css         # Tema global template
        │   ├── vendor-theme.css  # Restyle library pihak ketiga
        │   └── auth.css          # Gaya halaman login
        ├── js/
        │   ├── jquery.min.js
        │   ├── bootstrap.bundle.min.js
        │   ├── layout.js         # Topbar + sidebar (single source)
        │   ├── app.js            # Perilaku bersama (drawer mobile, submenu)
        │   └── pages/            # Skrip khusus per halaman
        │       ├── dashboard.js
        │       ├── articles.js
        │       ├── analytics.js
        │       ├── inbox.js
        │       ├── calendar.js
        │       ├── charts.js
        │       ├── pickers.js
        │       └── editors.js
        ├── fonts/                # Poppins (woff2: 400/500/600/700)
        └── vendor/               # Library pihak ketiga
```

---

## Halaman

| Halaman | File | Deskripsi | Skrip |
| --- | --- | --- | --- |
| Dashboard | `index.html` | Hero, statistik, top articles, agenda harian | `pages/dashboard.js` |
| My Articles | `articles.html` | Tabel artikel + filter (cari, kategori, status) | `pages/articles.js` |
| Analytics | `analytics.html` | Kartu metrik + grafik Highcharts | `pages/analytics.js` |
| Inbox | `inbox.html` | Daftar pesan + panel baca (mailbox) | `pages/inbox.js` |
| Post Plan | `post-plan.html` | Ringkasan + tabel jadwal terbit | — |
| Calendar | `calendar.html` | Kalender FullCalendar (bulan/minggu/hari/list) | `pages/calendar.js` |
| Charts | `charts.html` | Kumpulan grafik Highcharts | `pages/charts.js` |
| Settings | `settings.html` | Tab profil, akun, notifikasi, keamanan | — |
| Alerts & Labels | `ui-alerts.html` | Alert, badge, dan status chip | — |
| Buttons | `ui-buttons.html` | Varian tombol, ukuran, grup, status | — |
| Tables | `ui-tables.html` | Tabel dasar, scroll horizontal/vertikal, sticky | — |
| Forms | `ui-forms.html` | Input, select, input group, validasi | — |
| Modals & Offcanvas | `ui-modals.html` | Dialog, ukuran, dan panel samping | — |
| Pickers | `ui-pickers.html` | Datepicker, timepicker, daterangepicker, Select2 | `pages/pickers.js` |
| Editors | `ui-editors.html` | Editor WYSIWYG CKEditor 5 | `pages/editors.js` |
| Login | `login.html` | Halaman masuk (mandiri, tanpa kerangka admin) | inline |
| Email Template | `email-template.html` | Sample email newsletter (mandiri, table-based) | — |

---

## Sistem Layout

Setiap halaman admin memakai kerangka yang sama. `layout.js` adalah **satu-satunya tempat** topbar dan sidebar didefinisikan.

### Kerangka minimum sebuah halaman

```html
<body data-page="reports">

  <div id="topbar-root"></div>

  <div class="shell">
    <aside class="sidebar" id="sidebar"></aside>

    <main class="main">
      <div class="page-head">
        <h1 class="page-title">Reports</h1>
        <p class="page-sub">Deskripsi singkat halaman.</p>
      </div>
      <!-- konten di sini -->
    </main>
  </div>

  <script src="assets/js/jquery.min.js"></script>
  <script src="assets/js/bootstrap.bundle.min.js"></script>
  <script src="assets/js/layout.js"></script>
  <script src="assets/js/app.js"></script>
</body>
```

- `data-page` pada `<body>` menandai menu mana yang aktif — nilainya harus sama dengan properti `page` di array `MENU`.
- `#topbar-root` dan `#sidebar` adalah titik pasang (mount point) yang diisi otomatis oleh `layout.js`.

### Menambah menu

Edit array `MENU` di `assets/js/layout.js`:

```js
var MENU = [
  // ...item yang sudah ada...
  { page: "reports", href: "reports.html", icon: "fa-solid fa-chart-pie", label: "Reports" }
];
```

Item dengan properti `children` otomatis menjadi submenu yang bisa dibuka/tutup:

```js
{ label: "Settings", icon: "fa-solid fa-gear", children: [
  { page: "settings",         href: "settings.html",         label: "General" },
  { page: "settings-billing", href: "settings-billing.html", label: "Billing" }
]}
```

---

## Kustomisasi Tema

Seluruh warna, radius, dan lebar sidebar dikendalikan lewat CSS variable di `assets/css/style.css`:

```css
:root{
  --navy:#12294a;   /* warna utama brand */
  --navy-2:#2f5073; /* navy lebih terang (input, tombol sekunder) */
  --panel:#e8edf0;  /* latar panel konten */
  --hero:#a5cef2;   /* latar kartu hero */
  --accent:#e0457b; /* warna aksen / link */
  --text:#12294a;
  --muted:#6b7a8c;
  --radius:12px;    /* radius kartu & tombol */
  --sidebar-w:300px;
  --curve:24px;
}
```

Ubah nilai di atas untuk mengganti identitas visual template secara menyeluruh — termasuk komponen Bootstrap dan library pihak ketiga, karena semuanya merujuk ke variabel yang sama.

Untuk mengganti logo, ubah teks `LOGO` pada fungsi `topbarHtml()` di `assets/js/layout.js` (dan pada `login.html` bila perlu).

---

## Komponen & Library Pihak Ketiga

Semua library tersedia lokal di `assets/vendor/` (tanpa CDN). Styling default-nya diselaraskan dengan tema lewat `assets/css/vendor-theme.css`.

| Library | Dipakai di | Dimuat oleh |
| --- | --- | --- |
| Highcharts (+ accessibility) | `charts.html`, `analytics.html` | halaman terkait |
| FullCalendar v6 | `calendar.html` | halaman terkait |
| Select2 (+ tema Bootstrap 5) | `ui-pickers.html` | halaman terkait |
| bootstrap-datepicker | `ui-pickers.html` | halaman terkait |
| jquery-timepicker | `ui-pickers.html` | halaman terkait |
| bootstrap-daterangepicker (+ Moment.js) | `ui-pickers.html` | halaman terkait |
| CKEditor 5 | `ui-editors.html` | halaman terkait |
| Font Awesome 6 | semua halaman | semua halaman |

> Muat `vendor-theme.css` **setelah** CSS vendor dan `style.css`, dan hanya pada halaman yang memakai library tersebut.

---

## Responsif

Template dirancang mobile-first pada breakpoint berikut:

| Breakpoint | Perilaku |
| --- | --- |
| `≤ 1199px` | Sidebar menjadi drawer off-canvas (hamburger + backdrop), nama user di topbar disembunyikan |
| `≤ 991px` | Toolbar FullCalendar ditumpuk; panel Inbox mail ditumpuk vertikal |
| `≤ 767px` | Padding konten dikecilkan, tombol pencarian/ikon diturunkan, tabel aktif scroll horizontal |
| `≤ 575px` | Daterangepicker memakai satu bulan, kartu lebih rapat |

Interaksi drawer (buka/tutup, klik backdrop, tombol `Esc`, reset saat kembali ke desktop) ditangani di `assets/js/app.js`.

---

## Lisensi

Kode template ini bebas dipakai untuk proyek pribadi maupun komersial.
Library pihak ketiga di dalam `assets/vendor/` memiliki lisensi masing-masing — silakan merujuk pada folder terkait sebelum distribusi ulang.
