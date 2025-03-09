/*****************************************************************
 ** Authors: Asvin Goel, goel@telematique.eu
 **
 ** A plugin for reveal.js adding a chalkboard.
 **
 ** Version: 2.3.2
 **
 ** License: MIT license (see LICENSE.md)
 **
 ** Credits:
 ** Chalkboard effect by Mohamed Moustafa https://github.com/mmoustafa/Chalkboard
 ** Multi color support initially added by Kurt Rinnert https://github.com/rinnert
 ** Compatibility with reveal.js v4 by Hakim El Hattab https://github.com/hakimel
 ******************************************************************/

"use strict";

// Import utility functions
import * as Utils from './utils';

// Define the RevealChalkboard object
window.RevealChalkboard = window.RevealChalkboard || {
  id: 'RevealChalkboard',
  init: function (deck) {
    initChalkboard.call(this, deck);
  },
  configure: function (config) {
    Utils.configure(config);
  },
  toggleNotesCanvas: function () {
    Utils.toggleNotesCanvas();
  },
  toggleChalkboard: function () {
    Utils.toggleChalkboard();
  },
  showEraser: function () {
    Utils.showEraser();
  },
  colorIndex: function (idx) {
    Utils.colorIndex(idx);
  },
  colorNext: function () {
    Utils.colorNext();
  },
  colorPrev: function () {
    Utils.colorPrev();
  },
  clear: function () {
    Utils.clear();
  },
  reset: function () {
    Utils.resetSlide();
  },
  resetAll: function () {
    Utils.resetStorage();
  },
  updateStorage: function () {
    Utils.updateStorage();
  },
  getData: function () {
    return Utils.getData();
  },
  download: function () {
    Utils.downloadData();
  },
  setDrawingTool: function (toolName) {
    Utils.setDrawingTool(toolName);
  },
};

// Get the script path
const path = Utils.scriptPath();

// Initialize the chalkboard
const initChalkboard = function (Reveal) {
  /* Feature detection for passive event handling */
  var passiveSupported = false;

  try {
    window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
      get: function () {
        passiveSupported = true;
        return true;
      }
    }));
  } catch (err) {
    // Do nothing
  }

  /*****************************************************************
   ** Configuration
   ******************************************************************/

  // Initialize configuration with Reveal
  Utils.initConfig(Reveal, path);

  // Set up canvas elements
  Utils.setupCanvases();

  // Load data from storage or file
  Utils.loadData();

  // Set up event listeners
  Utils.setupEventListeners(Reveal);

  // Set up key bindings
  const keyBindings = Utils.getKeyBindings();
  for (var key in keyBindings) {
    if (keyBindings[key]) {
      Reveal.addKeyBinding(keyBindings[key], window.RevealChalkboard[key]);
    }
  }
};

// Export the chalkboard plugin
export default () => {
  return window.RevealChalkboard;
};
