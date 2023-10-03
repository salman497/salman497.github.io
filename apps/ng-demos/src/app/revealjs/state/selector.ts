import { createSelector } from '@ngrx/store';
import { RevealJsState } from './state';

export const selectRevealJsState = (state: any) => state.revealJs;

export const selectEditor = createSelector(
  selectRevealJsState,
  (state: RevealJsState) => state.loaded ? state.editor : null
);

export const selectIsLoaded = createSelector(
  selectRevealJsState,
  (state: RevealJsState) => state.loaded
);