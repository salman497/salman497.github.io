/**
 * Index file to export all utilities for the Reveal.js Chalkboard plugin
 */

// Export canvas utilities
export * from './canvas-utils';

// Export drawing utilities
export * from './drawing-utils';

// Export storage utilities
export * from './storage-utils';

// Export event utilities
export * from './event-utils';

// Export UI utilities
export * from './ui-utils';

// Export configuration utilities
export * from './config-utils';

// Additional utility functions needed by the refactored plugin.js
export function initConfig(Reveal, path) {
  // Initialize configuration with Reveal
  // This function would coordinate the configuration setup
  // Placeholder implementation
}

export function setupCanvases() {
  // Set up canvas elements
  // This function would coordinate the canvas setup
  // Placeholder implementation
}

export function loadData() {
  // Load data from storage or file
  // This function would coordinate the data loading
  // Placeholder implementation
}

export function setupEventListeners(Reveal) {
  // Set up event listeners
  // This function would coordinate the event listener setup
  // Placeholder implementation
}

export function getKeyBindings() {
  // Get key bindings
  // This function would return the key bindings
  // Placeholder implementation
  return {};
} 