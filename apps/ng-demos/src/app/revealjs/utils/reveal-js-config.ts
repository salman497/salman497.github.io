// @ts-nocheck
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import RevealMermaidPlugin from 'reveal.js-mermaid-plugin';
import RevealHighlight from 'reveal.js/plugin/highlight/highlight.esm.js';
import RevealNotes from 'reveal.js/plugin/notes/notes.esm.js';
import RevealSvgTimelineFragment from 'reveal.js-svg-timeline-fragment';
import RevealAnimateFragments from 'reveal.js-animate-fragments';
import RevealScriptFragment from 'reveal.js-script-fragment';
import dynamicImports from '../utils/reveal-js-dynamic-imports';
import { Editor } from '../state/state';

export async function getRevealConfig(editor: Editor): Promise<any> {
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
    //   window.RevealMenu
    ],
	hash: true,
    embedded: true,
    minScale: 1.0,
    controls: true,
    controlsTutorial: true,
    keyboardCondition: 'focused',
    menu: getMenuConfig(),
    customcontrols: {
      controls: getCustomControls(editor)
    },
  };
}

function getMenuConfig() {
  return  {
		// Specifies which side of the presentation the menu will 
		// be shown. Use 'left' or 'right'.
		side: 'left',

		// Add slide numbers to the titles in the slide list.
		// Use 'true' or format string (same as reveal.js slide numbers)
		numbers: false,

		// Specifies which slide elements will be used for generating
		// the slide titles in the menu. The default selects the first
		// heading element found in the slide, but you can specify any
		// valid css selector and the text from the first matching
		// element will be used.
		// Note: that a section data-menu-title attribute or an element
		// with a menu-title class will take precedence over this option
		titleSelector: 'h1, h2, h3, h4, h5, h6',

		// Hide slides from the menu that do not have a title.
		// Set to 'true' to only list slides with titles.
		hideMissingTitles: false,

		// Add markers to the slide titles to indicate the 
		// progress through the presentation
		markers: false,

		// Specify custom panels to be included in the menu, by
		// providing an array of objects with 'title', 'icon'
		// properties, and either a 'src' or 'content' property.
		custom: false,

		// // Specifies the themes that will be available in the themes
		// // menu panel. Set to 'false' to hide themes panel.
		// themes: [
		// 	{ name: 'Black', theme: 'css/theme/black.css' },
		// 	{ name: 'White', theme: 'css/theme/white.css' },
		// 	{ name: 'League', theme: 'css/theme/league.css' },
		// 	{ name: 'Sky', theme: 'css/theme/sky.css' },
		// 	{ name: 'Beige', theme: 'css/theme/beige.css' },
		// 	{ name: 'Simple', theme: 'css/theme/simple.css' },
		// 	{ name: 'Serif', theme: 'css/theme/serif.css' },
		// 	{ name: 'Blood', theme: 'css/theme/blood.css' },
		// 	{ name: 'Night', theme: 'css/theme/night.css' },
		// 	{ name: 'Moon', theme: 'css/theme/moon.css' },
		// 	{ name: 'Solarized', theme: 'css/theme/solarized.css' }
		// ],

		// Specifies if the transitions menu panel will be shown.
		transitions: true,

		// Adds a menu button to the slides to open the menu panel.
		// Set to 'false' to hide the button.
		openButton: true,

		// If 'true' allows the slide number in the presentation to
		// open the menu panel. The reveal.js slideNumber option must 
		// be displayed for this to take effect
		openSlideNumber: false,

		// If true allows the user to open and navigate the menu using
		// the keyboard. Standard keyboard interaction with reveal
		// will be disabled while the menu is open.
		keyboard: true
	};
}


function getCustomControls(editor: Editor) {
	const controls = [];
	if(editor.showSlides) {
		controls.push({
			id: 'toggle-overview',
			title: 'Toggle overview (O)',
			icon: '<i class="fa fa-th"></i>',
			action: 'Reveal.toggleOverview();',
		  });
	}
	if(editor.showDrawingArea) {
		controls.push({
			icon: '<i class="fa fa-pen-square"></i>',
			title: 'Toggle chalkboard (B)',
			action: 'RevealChalkboard.toggleChalkboard();',
		});
	}

	if(editor.showPen) {
		controls.push({
			icon: '<i class="fa fa-pen"></i>',
			title: 'Toggle notes canvas (C)',
			action: 'RevealChalkboard.toggleNotesCanvas();',
		});
	}
	return controls;
}
