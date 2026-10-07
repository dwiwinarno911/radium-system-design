/* ==========================================================================
   pages/editors.js – CKEditor 5 setup for the ui-editors.html page
   The UMD build exposes a global `CKEDITOR` namespace.
   ========================================================================== */
(function () {
  "use strict";

  function boot() {
    var CK = window.CKEDITOR;
    if (!CK || !CK.ClassicEditor) return;

    /* Plugin list; .filter(Boolean) guards against any that are unavailable. */
    var plugins = [
      CK.Essentials, CK.Paragraph, CK.Heading,
      CK.FontFamily, CK.FontSize, CK.FontColor, CK.FontBackgroundColor,
      CK.Bold, CK.Italic, CK.Underline, CK.Strikethrough, CK.Subscript, CK.Superscript,
      CK.Highlight, CK.RemoveFormat, CK.Alignment,
      CK.List, CK.ListProperties, CK.TodoList, CK.Indent,
      CK.Link, CK.AutoLink,
      CK.Image, CK.ImageUpload, CK.Base64UploadAdapter, CK.AutoImage,
      CK.ImageToolbar, CK.ImageCaption, CK.ImageStyle, CK.ImageResize, CK.ImageInsert, CK.LinkImage,
      CK.MediaEmbed, CK.Table, CK.TableToolbar, CK.TableColumnResize,
      CK.TableProperties, CK.TableCellProperties, CK.TableCaption,
      CK.BlockQuote, CK.HorizontalLine, CK.CodeBlock,
      CK.SpecialCharacters, CK.FindAndReplace, CK.SourceEditing, CK.PasteFromOffice
    ].filter(Boolean);

    var main = document.querySelector("#editor1");
    if (main) {
      CK.ClassicEditor.create(main, {
        licenseKey: "GPL",
        plugins: plugins,
        language: "en",
        toolbar: [
          "undo", "redo", "|", "sourceEditing", "findAndReplace", "|",
          "heading", "|",
          "fontFamily", "fontSize", "fontColor", "fontBackgroundColor", "|",
          "bold", "italic", "underline", "strikethrough", "subscript", "superscript", "highlight", "removeFormat", "|",
          "alignment", "|",
          "bulletedList", "numberedList", "todoList", "|",
          "outdent", "indent", "|",
          "link", "insertImage", "mediaEmbed", "insertTable", "blockQuote", "horizontalLine", "codeBlock", "specialCharacters"
        ],
        table: {
          contentToolbar: ["tableColumn", "tableRow", "mergeTableCells", "tableProperties", "tableCellProperties"]
        }
      }).catch(function (e) { console.error("CKEditor #editor1:", e); });
    }

    var simple = document.querySelector("#editor2");
    if (simple) {
      CK.ClassicEditor.create(simple, {
        licenseKey: "GPL",
        plugins: [CK.Essentials, CK.Paragraph, CK.Bold, CK.Italic, CK.Link, CK.List].filter(Boolean),
        language: "en",
        toolbar: ["bold", "italic", "link", "bulletedList", "numberedList"]
      }).catch(function (e) { console.error("CKEditor #editor2:", e); });
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
