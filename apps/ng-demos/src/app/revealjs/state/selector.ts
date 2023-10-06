import { createSelector } from '@ngrx/store';
import { RevealJsState } from './state';

export const selectRevealJsState = (state: any) => state.revealJs;

export const selectEditor = createSelector(
  selectRevealJsState,
  (state: RevealJsState) => state.editorInitialized ? state.editor : null
);

export const selectIsLoading = createSelector(
  selectRevealJsState,
  (state: RevealJsState) => state.loading
);

export const selectError = createSelector(
  selectRevealJsState,
  (state: RevealJsState) => state.error ? state.error : null
);

export const selectSavedValues = createSelector(
  selectRevealJsState,
  (state: RevealJsState) => ({ id: state.id, name: state.name })
);