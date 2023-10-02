// @ts-nocheck
// copied from https://github.com/AleCandido/show/blob/30b54767ef279f4ebd94f60b08a780a4809ab5cf/packages/show/src/lib/plugins/imports.ts
//built-in plugins

export async function slideDownMermaid() {
  const MermaidPlugin = (await import('./reveal.js-mermaid/plugin')).default;

  return MermaidPlugin;
}
export async function slideDownApexChart() {
  const ApexCharPlugin = (await import('./reveal.js-apexchart/plugin')).default;

  return ApexCharPlugin;
}

export async function slideDownChartJs() {
  const ChartJsPlugin = (await import('./reveal.js-chartjs/plugin')).default;

  return ChartJsPlugin;
}

export async function slideDown() {
  const slideDown = (await import('./reveal.js-slidedown/main')).default;

  return slideDown;
}

export async function highlight() {
  const Highlight = (await import('reveal.js/plugin/highlight/highlight.esm'))
    .default;

  return Highlight;
}

export async function notes() {
  const SpeakerNotes = (await import('reveal.js/plugin/notes/notes.esm')).default;

  return SpeakerNotes;
}

export async function search() {
  const Search = (await import('reveal.js/plugin/search/search.esm')).default;

  return Search;
}

export async function zoom() {
  const Zoom = (await import('reveal.js/plugin/zoom/zoom.esm')).default;

  return Zoom;
}

export async function math() {
  const math = (await import('reveal.js/plugin/math/math.esm')).default;

  return math;
}

export async function markdown() {
  const markdown = (await import('reveal.js/plugin/markdown/markdown.esm.js'))
    .default;

  return markdown;
}

//extra plugins

export async function customControls() {
  await import('reveal.js-plugins/customcontrols/plugin');

  return window.RevealCustomControls;
}

export async function chalkboard() {
  await import('reveal.js-plugins/chalkboard/plugin');

  return window.RevealChalkboard;
}

// export async function menu() {
//   await import('reveal.js-menu/menu.esm');

//   return window.RevealMenu;
// }

export default {
  highlight,
  notes,
  search,
  zoom,
  math,
  customControls,
  chalkboard,
  slideDownChartJs,
  slideDownMermaid,
  slideDownApexChart,
  slideDown,
  markdown
};
