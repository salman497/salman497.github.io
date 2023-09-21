
// @ts-nocheck
// copied from https://github.com/AleCandido/show/blob/30b54767ef279f4ebd94f60b08a780a4809ab5cf/packages/show/src/lib/plugins/imports.ts 
//built-in plugins


export async function highlight() {
    let Highlight = (await import('reveal.js/plugin/highlight/highlight.esm')).default;
  
    return Highlight;
  }
  
  export async function notes() {
    let SpeakerNotes = (await import('reveal.js/plugin/notes/notes.esm')).default;
  
    return SpeakerNotes;
  }
  
  export async function search() {
    let Search = (await import('reveal.js/plugin/search/search.esm')).default;
  
    return Search;
  }
  
  export async function zoom() {
    let Zoom = (await import('reveal.js/plugin/zoom/zoom.esm')).default;
  
    return Zoom;
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
  
  export default { highlight, notes, search, zoom, customControls, chalkboard };