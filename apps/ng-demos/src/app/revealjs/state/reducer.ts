import { createReducer, on } from '@ngrx/store';
import { getCurrentISODataTime } from '../utils/basic-utils';
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
  saveToStorage,
  setURLInfo,
  updateURLNameOnly,
  updateNameOnly,
  changeLoadingState,
 
  setLoginUserEditors,
  loadLoginUserInfo,
  setLoginUserInfo,
  setAllowEdit,
  updateEditorShowAutoSlides as updateEditorShowAutoSlide,
  setURLSlideNumber,
  setEditorVisibility,
  updateEditorMermaidStyle
} from './actions';
import { initialState, URLInfo } from './state';

export const revealJsReducer = createReducer(
  initialState,
  on(loadLoginUserInfo, (state) => ({
    ...state,
    loading: true,
  })),
  on(loadEditorStateSuccess, (state, { name, id, editor, modified, allowEdit }) => ({
    ...state,
    editor: {
      ...state.editor, // just to override non existing prop by GPT
      ...editor,
      showAutoSlide: editor.showAutoSlide === undefined ? false: editor.showAutoSlide,
      showAutoDelayInMS: editor.showAutoSlide && editor.showAutoDelayInMS === undefined ? 3500: editor.showAutoDelayInMS,
      toggleViewer: !state.editor.toggleViewer,
    },
    editorInitialized: true,
    name: name ? name : state.name,
    id: id ? id : state.id,
    allowEdit: allowEdit === false ? false : true,
    modified
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
    modified: getCurrentISODataTime()
  })),
  on(updateEditorTheme, (state, { themeSelected }) => ({
    ...state,
    editor: {
      ...state.editor,
      themeSelected,
    },
    modified: getCurrentISODataTime()
  })),
  on(updateEditorMermaidStyle, (state, { mermaidStyleSelected }) => ({
    ...state,
    editor: {
      ...state.editor,
      mermaidStyleSelected,
    },
    modified: getCurrentISODataTime()
  })),
  on(updateEditorAnimation, (state, { animationSelected }) => ({
    ...state,
    editor: {
      ...state.editor,
      animationSelected,
    },
    modified: getCurrentISODataTime()
  })),
  on(updateEditorShowPen, (state, { showPen }) => ({
    ...state,
    editor: {
      ...state.editor,
      showPen,
    },
    modified: getCurrentISODataTime()
  })),
  on(updateEditorShowDrawingArea, (state, { showDrawingArea }) => ({
    ...state,
    editor: {
      ...state.editor,
      showDrawingArea,
    },
    modified: getCurrentISODataTime()
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
    modified: getCurrentISODataTime()
  })),
  on(updateEditorShowAutoSlide, (state, { showAutoSlide }) => ({
    ...state,
    editor: {
      ...state.editor,
      showAutoSlide,
    },
    modified: getCurrentISODataTime()
  })),
  on(setURLInfo, (state, {id, loadType, mode, name, slideNumber, slideNumberVertical, resetHash} ) => ({
    ...state,
    urlInfo: {
      id,
      loadType,
      mode,
      name,
      slideNumber,
      slideNumberVertical,
      resetHash
    },
  })),
  on(setURLSlideNumber, (state, {slideNumber, slideNumberVertical} ) => ({
    ...state,
    urlInfo: {
      ...state.urlInfo,
      slideNumber,
      slideNumberVertical
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
  })),
  on(changeLoadingState, (state, { loading }) => ({
    ...state,
    loading
  })),
  on(setLoginUserInfo, (state, loginUser) => ({
    ...state,
    loginUser,
    isLogin: loginUser?.id ? true: false
  })),
  on(setLoginUserEditors, (state, { loginUserEditors }) => ({
    ...state,
    loginUserEditors: loginUserEditors ? [...loginUserEditors] : []
  })),
  on(setAllowEdit, (state, { allowEdit }) => ({
    ...state,
    allowEdit,
    modified: getCurrentISODataTime()
  })),
  on(setEditorVisibility, (state, { isEditorVisible }) => ({
    ...state,
    isEditorVisible,
  })),
);
