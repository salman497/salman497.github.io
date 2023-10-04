import { createReducer, on } from '@ngrx/store';
import { toggleViewerToReRender, initEditor, updateEditorAnimation, updateEditorContent, updateEditorShowDrawingArea, updateEditorShowPen, updateEditorShowSlides, updateEditorTheme } from './actions';
import { initialState } from './state';

export const revealJsReducer = createReducer(
  initialState,
  on(initEditor, (state, { editor }) => ({
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
  on(toggleViewerToReRender, (state) => ({
    ...state,
    editor: {
      ...state.editor,
      toggleViewer: !state.editor.toggleViewer
    }
  })),
  on(updateEditorShowSlides, (state, { showSlides }) => ({
    ...state,
    editor: {
      ...state.editor,
      showSlides
    }
  }))
);