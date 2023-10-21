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
  setEditorVisibility
} from './actions';
import { initialState, URLInfo } from './state';

export const revealJsReducer = createReducer(
  initialState,
  on(loadLoginUserInfo, (state) => ({
    ...state,
    loading: true,
  })),
  on(loadEditorStateSuccess, (state, { name, id, editor, allowEdit }) => ({
    ...state,
    editor: {
      ...editor,
      toggleViewer: !state.editor.toggleViewer,
    },
    editorInitialized: true,
    name: name ? name : state.name,
    id: id ? id : state.id,
    allowEdit: allowEdit === false ? false : true,
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
  on(updateEditorShowAutoSlide, (state, { showAutoSlide }) => ({
    ...state,
    editor: {
      ...state.editor,
      showAutoSlide,
    },
  })),
  on(setURLInfo, (state, {id, loadType, mode, name, slideNumber, slideNumberVertical} ) => ({
    ...state,
    urlInfo: {
      id,
      loadType,
      mode,
      name,
      slideNumber,
      slideNumberVertical
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
  })),
  on(setEditorVisibility, (state, { isEditorVisible }) => ({
    ...state,
    isEditorVisible,
  })),
);
