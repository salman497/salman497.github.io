// @ts-nocheck
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import RevealMermaidPlugin from 'reveal.js-mermaid-plugin';
import RevealHighlight from 'reveal.js/plugin/highlight/highlight.esm.js';
import RevealNotes from 'reveal.js/plugin/notes/notes.esm.js';
import RevealSvgTimelineFragment from 'reveal.js-svg-timeline-fragment';
import RevealAnimateFragments from 'reveal.js-animate-fragments';
import RevealScriptFragment from 'reveal.js-script-fragment';
import dynamicImports from '../utils/reveal-js-dynamic-imports';

export async function getRevealConfig(): Promise<any> {
  const RevealCustomControls = await dynamicImports.customControls();
  const RevealChalkboard = await dynamicImports.chalkboard();
  const RevealZoom = await dynamicImports.zoom();
  const RevealSearch = await dynamicImports.search();
  return {
    plugins: [
      Markdown,
      RevealMermaidPlugin,
      RevealSvgTimelineFragment,
      RevealNotes,
      RevealScriptFragment,
      RevealAnimateFragments,
      RevealHighlight,
      RevealCustomControls,
      RevealChalkboard,
      RevealZoom,
      RevealSearch,
      window.RevealMenu
    ],
    embedded: true,
    minScale: 1.0,
    controls: true,
    controlsTutorial: true,
    keyboardCondition: 'focused',
    customcontrols: {
      controls: [
        {
          id: 'toggle-overview',
          title: 'Toggle overview (O)',
          icon: '<i class="fa fa-th"></i>',
          action: 'Reveal.toggleOverview();',
        },
        {
          icon: '<i class="fa fa-pen-square"></i>',
          title: 'Toggle chalkboard (B)',
          action: 'RevealChalkboard.toggleChalkboard();',
        },
        {
          icon: '<i class="fa fa-pen"></i>',
          title: 'Toggle notes canvas (C)',
          action: 'RevealChalkboard.toggleNotesCanvas();',
        },
      ],
    },
  };
}
