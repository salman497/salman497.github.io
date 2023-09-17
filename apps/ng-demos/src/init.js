import RevealHighlight from "reveal-highlight";
import RevealMath from "reveal-math";
import RevealNotes from "reveal-notes";
import RevealSearch from "reveal-search";
import RevealZoom from "reveal-zoom";
import RevealApexchart from "reveal-apexchart";
import RevealMermaid from "reveal-mermaid";
import RevealChartjs from "reveal-chartjs";


const initialize = () => {
  Reveal.initialize({
    hash: true,
    plugins: [
      SlidesDown,
      RevealHighlight,
      RevealMath,
      RevealNotes,
      RevealSearch,
      RevealZoom,
      // Source: https://github.com/McShelby/reveal-pdfexport
      PdfExport,
      // Source: https://github.com/rajgoel/reveal.js-plugins/tree/master/chalkboard
      RevealChalkboard,
      // Source: https://github.com/rajgoel/reveal.js-plugins/tree/master/customcontrols
      RevealCustomControls,
      // Source: https://github.com/rajgoel/reveal.js-plugins/tree/master/anything
      // RevealAnything,
      RevealChartjs,
      RevealApexchart,
      RevealMermaid,
    ],
    customcontrols: {
      controls: [
        {
          icon: '<i class="fa-solid fa-folder-open"></i>',
          title: "Open another presentation",
          action: "Reveal.slidesdownLoader();",
        },
        {
          id: "toggle-overview",
          title: "Toggle overview (O)",
          icon: '<i class="fa-solid fa-th"></i>',
          action: "Reveal.toggleOverview();",
        },
        {
          icon: '<i class="fa-solid fa-pen-square"></i>',
          title: "Toggle chalkboard (B)",
          action: "RevealChalkboard.toggleChalkboard();",
        },
        {
          icon: '<i class="fa-solid fa-pen"></i>',
          title: "Toggle notes canvas (C)",
          action: "RevealChalkboard.toggleNotesCanvas();",
        },
        {
          icon: '<i class="fa-solid fa-print"></i>',
          title: "Toggle print view (E)",
          action: "PdfExport.togglePdfExport();",
        },
      ],
    },
  }).then(() => {
    console.debug("initialization finished");
  });
};

initialize();


