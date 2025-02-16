// @ts-nocheck
import RevealSvgTimelineFragment from 'reveal.js-svg-timeline-fragment';
import RevealAnimateFragments from 'reveal.js-animate-fragments';
import RevealScriptFragment from 'reveal.js-script-fragment';
import dynamicImports from './reveal-plugins/reveal-js-dynamic-imports';
import { Editor } from '../state/state';

export async function getRevealConfig(
  editor: Editor,
  isEditMode: boolean
): Promise<any> {
  const RevealCustomControls = await dynamicImports.customControls();
  const RevealChalkboard = await dynamicImports.chalkboard();
  const RevealZoom = await dynamicImports.zoom();
  const RevealSearch = await dynamicImports.search();
  const CustomMarkdown = await dynamicImports.customMarkdown();
  //const RevealMarkdown = await dynamicImports.markdown();
  const RevealMath = await dynamicImports.math();
  const RevealHighlight = await dynamicImports.highlight();
  const RevealNotes = await dynamicImports.notes();
  const RevealMermaidPlugin = await dynamicImports.mermaid();
  //   const SlideDown = await dynamicImports.slideDown();
  const RevealChartJsPlugin = await dynamicImports.chartJs();
  const RevealApexChartPlugin = await dynamicImports.apexChart();
  return {
    plugins: [
      //   SlideDown,
      RevealChartJsPlugin,
      RevealApexChartPlugin,
      CustomMarkdown,
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
      RevealMath.KaTeX,
      //   window.RevealMenu
    ],
    // hashOneBasedIndex: true,
    hash: false,
    autoSlide: editor.showAutoSlide ? editor.showAutoDelayInMS : 0,
    // autoPlayMedia: false,
    showNotes: false, // IN speaker view S
    embedded: true,
    minScale: 1.0,
    controls: true,
    controlsTutorial: true,
    keyboardCondition: 'focused',
    menu: getMenuConfig(isEditMode),
    transition: editor.animationSelected.toLowerCase(),
    // autoAnimateEasing: 'ease-out',
    // autoAnimateDuration: 0.8,
    // autoAnimateUnmatched: false,
    customcontrols: {
      controls: getCustomControls(editor, isEditMode),
    },
    mermaid: {
      theme: getMermaidThemeByRevealTheme(editor.themeSelected)
    },
    chalkboard: {
      // don't reset drawing when mermaid fragement change
      drawPerFragment: false
    }
  };
}

function getMenuConfig() {
  return {
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
    keyboard: true,
  };
}

function getCustomControls(editor: Editor, isEditMode: boolean) {
  const controls = [];
  if (isEditMode) {
    controls.push({
      id: 'menu-overview',
      title: 'Menu overview (O)',
      icon: '<i class="fa fa-bars"></i>',
      action: "invokeFromOutsideOfAngular('menu');",
    });
  }

  if (editor.showSlides) {
    controls.push({
      id: 'toggle-overview',
      title: 'Toggle overview (O)',
      icon: '<i class="fa fa-th"></i>',
      action: "invokeFromOutsideOfAngular('toggle');",
    });
  }
  if (editor.showDrawingArea) {
    controls.push({
      icon: '<i class="fa fa-pen-square"></i>',
      title: 'Toggle chalkboard (B)',
      action: "invokeFromOutsideOfAngular('chalkboardToggle');",
    });
  }

  if (editor.showPen) {
    controls.push({
      icon: '<i class="fa fa-pen"></i>',
      title: 'Toggle notes canvas (C)',
      action: "invokeFromOutsideOfAngular('chalkboardCanvas');",
    });
  }

  controls.push({
    id: 'fullscreen',
    title: 'Show in Full Screen (F)',
    icon: '<i class="fa fa-expand"></i>',
    action: "invokeFromOutsideOfAngular('fullscreen');",
  });
  
  return controls;
}

function getMermaidThemeByRevealTheme(revealTheme: string): string {
  /**
   * Mermaid theme https://mermaid.js.org/config/theming.html
   * default - This is the default theme for all diagrams.
   * neutral - This theme is great for black and white documents that will be printed.
   * dark - This theme goes well with dark-colored elements or dark-mode.
   * forest - This theme contains shades of green.
   * base - This is the only theme that can be modified. Use this theme as the base for customizations.
   */
  const revealMermaidThemeMap = {
    Black: 'dark',
    White: 'neutral',
    League: 'default', // Assuming default for League as there's no direct match
    Sky: 'default', // Assuming default for Sky for a light, airy feel
    Beige: 'neutral', // Beige is close to white, so neutral might be a good fit
    Simple: 'base', // Simple theme could use a customizable base
    Serif: 'default', // Serif is a traditional style, so default seems fitting
    Blood: 'dark', // Blood theme would go well with a dark theme
    Night: 'dark', // Night theme obviously matches well with dark
    Moon: 'neutral', // Moon can be a lighter theme, so neutral could work
    Solarized: 'default', // Solarized is unique, default could be a start
  };

  return revealMermaidThemeMap[revealTheme] || 'default';
}
