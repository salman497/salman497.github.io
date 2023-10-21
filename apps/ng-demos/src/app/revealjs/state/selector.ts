import { Constant } from './../utils/constants';
import { createSelector } from '@ngrx/store';
import { RevealJsState } from './state';
import { buildURL } from '../utils/basic-utils';

export const selectRevealJsState = (state: any) => state.revealJs;

export const selectEditor = createSelector(
  selectRevealJsState,
  (state: RevealJsState) => state.editorInitialized ? state.editor : null
);

export const selectMarkdown = createSelector(
  selectRevealJsState,
  (state: RevealJsState) => state.editorInitialized ? state.editor.content : null
);



export const selectFullState = createSelector(
  selectRevealJsState,
  (state: RevealJsState) => state
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

export const selectUrlInfo = createSelector(
  selectRevealJsState,
  (state: RevealJsState) => state.urlInfo
);

export const selectIsEditMode = createSelector(
  selectRevealJsState,
  (state: RevealJsState) => state.urlInfo.mode !== Constant.UrlMode.View 
);

export const selectName = createSelector(
  selectRevealJsState,
  (state: RevealJsState) => state.name
);

export const selectIsEditorVisible = createSelector(
  selectRevealJsState,
  (state: RevealJsState) => state.isEditorVisible
);

/******** URL ***********/
export const selectUrlView = createSelector(
  selectRevealJsState,
  (state: RevealJsState) => { 
    return buildURL({ ...state.urlInfo, mode: Constant.UrlMode.View});
  }
);

export const selectUrlEdit = createSelector(
  selectRevealJsState,
  (state: RevealJsState) => { 
    return buildURL({ ...state.urlInfo, mode: Constant.UrlMode.Edit});
  }
);

export const selectSlideNumber = createSelector(
  selectRevealJsState,
  (state: RevealJsState) => { 
    return state.urlInfo.slideNumber;
  }
);


/************** login ******************/

export const selectIsLogin = createSelector(
  selectRevealJsState,
  (state: RevealJsState) => state.isLogin ? true : false
);

export const selectUser = createSelector(
  selectRevealJsState,
  (state: RevealJsState) => state.loginUser
);

export const selectUserName = createSelector(
  selectRevealJsState,
  (state: RevealJsState) => state.loginUser?.name ? state.loginUser?.name : ''
);

export const selectUserImageUrl = createSelector(
  selectRevealJsState,
  (state: RevealJsState) => state.loginUser?.imageUrl ? state.loginUser?.imageUrl : ''
);


export const selectLoginUserEditors = createSelector(
  selectRevealJsState,
  (state: RevealJsState) => state.loginUserEditors ? state.loginUserEditors : []
);

export const selectAllowEdit = createSelector(
  selectRevealJsState,
  (state: RevealJsState) => state.allowEdit === false ? false : true
);