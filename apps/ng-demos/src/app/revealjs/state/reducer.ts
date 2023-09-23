import { createReducer, on } from '@ngrx/store';
import { updateEditorContent } from './actions';
import { initialState } from './state';

export const revealJsReducer = createReducer(
  initialState,
  on(updateEditorContent, (state, { content }) => ({
    ...state,
    editor: {
      ...state.editor,
      content
    }
  }))
);