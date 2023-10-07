import { createReducer, on } from '@ngrx/store';
import {
  toggleViewerToReRender,
  loadEditorStateSuccess,
  updateEditorAnimation,
  updateEditorContent,
  updateEditorShowDrawingArea,
  updateEditorShowPen,
  updateEditorShowSlides,
  updateEditorTheme,
  loadEditorStateFailure,
  saveToStorageFailure,
  saveToStorageSuccess,
  loadEditorState,
  saveToStorage,
  updateURLInfo,
  updateURLNameOnly,
  updateNameOnly,
} from './actions';
import { initialState } from './state';

export const revealJsReducer = createReducer(
  initialState,
  on(loadEditorState, (state) => ({
    ...state,
    loading: true,
  })),
  on(loadEditorStateSuccess, (state, { editor }) => ({
    ...state,
    editor,
    loading: false,
    editorInitialized: true,
  })),
  on(loadEditorStateFailure, (state, { errorType, message }) => ({
    ...state,
    error: {
      errorType,
      message,
    },
    loading: false,
    editorInitialized: true,
  })),
  on(saveToStorage, (state) => ({
    ...state,
    loading: true,
  })),
  on(saveToStorageSuccess, (state, { id, name }) => ({
    ...state,
    id,
    name,
    loading: false,
  })),
  on(saveToStorageFailure, (state, { errorType, message }) => ({
    ...state,
    error: {
      errorType,
      message,
    },
    loading: false,
  })),
  on(updateEditorContent, (state, { content }) => ({
    ...state,
    editor: {
      ...state.editor,
      content,
    },
  })),
  on(updateEditorTheme, (state, { themeSelected }) => ({
    ...state,
    editor: {
      ...state.editor,
      themeSelected,
    },
  })),
  on(updateEditorAnimation, (state, { animationSelected }) => ({
    ...state,
    editor: {
      ...state.editor,
      animationSelected,
    },
  })),
  on(updateEditorShowPen, (state, { showPen }) => ({
    ...state,
    editor: {
      ...state.editor,
      showPen,
    },
  })),
  on(updateEditorShowDrawingArea, (state, { showDrawingArea }) => ({
    ...state,
    editor: {
      ...state.editor,
      showDrawingArea,
    },
  })),
  on(toggleViewerToReRender, (state) => ({
    ...state,
    editor: {
      ...state.editor,
      toggleViewer: !state.editor.toggleViewer,
    },
  })),
  on(updateEditorShowSlides, (state, { showSlides }) => ({
    ...state,
    editor: {
      ...state.editor,
      showSlides,
    },
  })),
  on(updateURLInfo, (state, {id, loadType, mode, name} ) => ({
    ...state,
    urlInfo: {
      id,
      loadType,
      mode,
      name
    },
  })),
  on(updateURLNameOnly, (state, { name }) => ({
    ...state,
    urlInfo: {
      ...state.urlInfo,
      name,
    },
  })),
  on(updateNameOnly, (state, { name }) => ({
    ...state,
    name
  }))
);
