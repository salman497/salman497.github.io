// @ts-nocheck
// copied from https://github.com/AleCandido/show/blob/30b54767ef279f4ebd94f60b08a780a4809ab5cf/packages/show/src/lib/plugins/imports.ts
//built-in plugins

import MermaidPlugin from './reveal.js-mermaid/plugin';
import ApexCharPlugin from './reveal.js-apexchart/plugin';
import ChartJsPlugin from './reveal.js-chartjs/plugin';
import SlideDown from './reveal.js-slidedown/main';
import Highlight from 'reveal.js/plugin/highlight/highlight.esm';
import SpeakerNotes from 'reveal.js/plugin/notes/notes.esm';
import Search from 'reveal.js/plugin/search/search.esm';
import Zoom from 'reveal.js/plugin/zoom/zoom.esm';
import Math from 'reveal.js/plugin/math/math.esm';
import CustomMarkdown from './reveal.js-markdown/plugin';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import 'reveal.js-plugins/customcontrols/plugin';
import './reveal.js-chalkboard/plugin';

export function mermaid() {
  return MermaidPlugin;
}

export function apexChart() {
  return ApexCharPlugin;
}

export function chartJs() {
  return ChartJsPlugin;
}

export function slideDown() {
  return SlideDown;
}

export function highlight() {
  return Highlight;
}

export function notes() {
  return SpeakerNotes;
}

export function search() {
  return Search;
}

export function zoom() {
  return Zoom;
}

export function math() {
  return Math;
}

export function customMarkdown() {
  return CustomMarkdown;
}

export function markdown() {
  return Markdown;
}

//extra plugins

export function customControls() {
  return window.RevealCustomControls;
}

export function chalkboard() {
  return window.RevealChalkboard;
}

// don't use it from node modules 
// export async function chalkboard() {
//   await import('reveal.js-plugins/chalkboard/plugin');
//   return window.RevealChalkboard;
// }

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
  chartJs,
  mermaid,
  apexChart,
  slideDown,
  markdown,
  customMarkdown
};
