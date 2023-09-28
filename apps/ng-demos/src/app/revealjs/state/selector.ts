import { createSelector } from '@ngrx/store';
import { RevealJsState } from './state';

// Define the feature state first
export const selectRevealJsState = (state: any) => state.revealJs;


export const selectEditor = createSelector(
  selectRevealJsState,
  (state: RevealJsState) => state.editor
);
