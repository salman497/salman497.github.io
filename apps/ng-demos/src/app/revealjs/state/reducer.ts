import { createReducer, on } from '@ngrx/store';
import { saveEditor, toggleViewerToReRender, updateEditorAnimation, updateEditorContent, updateEditorShowDrawingArea, updateEditorShowPen, updateEditorShowSlides, updateEditorTheme } from './actions';
import { initialState } from './state';
import { v4 as uuidv4 } from 'uuid';

export const revealJsReducer = createReducer(
  initialState,
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
  })),
  on(saveEditor, (state) => {
    const linkId = uuidv4(); // Generate a new UUID
    return {
      ...state,
      editor: {
        ...state.editor,
        linkId
      }
    };
  })
);
