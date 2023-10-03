import { createReducer, on } from '@ngrx/store';
import { updateEditorContent, updateEditorAnimation, updateEditorShowDrawingArea, updateEditorShowPen, updateEditorShowSlides, updateEditorTheme, updateEditor } from './actions';
import { initialState } from './state';

export const revealJsReducer = createReducer(
  initialState,
  on(updateEditor, (state, { editor }) => ({
    ...state,
    editor,
    loaded: true
  })),
  on(updateEditorContent, (state, { content }) => ({
    ...state,
    editor: {
      ...state.editor,
      content
    }
  })),
  on(updateEditorTheme, (state, { themeSelected }) => ({
    ...state,
    editor: {
      ...state.editor,
      themeSelected
    }
  })),
  on(updateEditorAnimation, (state, { animationSelected }) => ({
    ...state,
    editor: {
      ...state.editor,
      animationSelected
    }
  })),
  on(updateEditorShowPen, (state, { showPen }) => ({
    ...state,
    editor: {
      ...state.editor,
      showPen
    }
  })),
  on(updateEditorShowDrawingArea, (state, { showDrawingArea }) => ({
    ...state,
    editor: {
      ...state.editor,
      showDrawingArea
    }
  })),
  on(updateEditorShowSlides, (state, { showSlides }) => ({
    ...state,
    editor: {
      ...state.editor,
      showSlides
    }
  })),
  // Add other action handlers as needed
);

