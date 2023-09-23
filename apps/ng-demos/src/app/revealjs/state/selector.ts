import { createSelector } from '@ngrx/store';
import { RevealJsState } from './state';

// Define the feature state first
export const selectRevealJsState = (state: any) => state.revealJs;

// Then define a selector to get the content
export const selectEditorContent = createSelector(
  selectRevealJsState,
  (state: RevealJsState) => state.editor.content
);