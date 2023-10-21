import { createAction, props } from '@ngrx/store';
import { MarkdownDB } from '../models/db.model';
import { Editor, ErrorState, URLInfo, LoginUser } from './state';

export const updateEditorContent = createAction(
  '[RevealJs] Update Editor Content',
  props<{ content: string }>()
);

export const updateEditorTheme = createAction(
  '[RevealJs] Update Editor Theme',
  props<{ themeSelected: string }>()
);

export const updateEditorAnimation = createAction(
  '[RevealJs] Update Editor Animation',
  props<{ animationSelected: string }>()
);

export const updateEditorShowPen = createAction(
  '[RevealJs] Update Editor Show Pen',
  props<{ showPen: boolean }>()
);

export const updateEditorShowDrawingArea = createAction(
  '[RevealJs] Update Editor Show Drawing Area',
  props<{ showDrawingArea: boolean }>()
);

export const toggleViewerToReRender = createAction(
  '[RevealJs] Toggle Viewer to rerender it'
);

export const updateEditorShowSlides = createAction(
  '[RevealJs] Update Editor Show Slides',
  props<{ showSlides: boolean }>()
);

export const updateEditorShowAutoSlides = createAction(
  '[RevealJs] Update Editor show Auto Slide',
  props<{ showAutoSlide: boolean }>()
);


/******************** Operations ************************/

export const loadEditorStateSuccess = createAction(
  '[RevealJs] Load Editor State Success',
   props<{ id?: number, name?: string, allowEdit?: boolean, editor: Editor }>()
);

export const saveToStorageSuccess = createAction(
  '[RevealJs] Save Editor to Storage Success',
  props<{ id: number, name: string }>()
);

export const saveToStorageFailure = createAction(
  '[RevealJs] Save Editor to Storage failure',
  props<ErrorState>()
);


export const updateURLNameOnly = createAction(
  '[RevealJs] Update URL Info Name only',
  props<{ name: string}>()
);


export const updateNameOnly = createAction(
  '[RevealJs] Update Presentation Name only',
  props<{ name: string}>()
);

export const loadEditorStateFailure = createAction(
  '[RevealJs] Load Editor State Failure',
   props<ErrorState>()
);

export const setLoginUserInfo = createAction(
  '[RevealJs] Set Login User Info',
  props<LoginUser>()
);


export const setAllowEdit = createAction(
  '[RevealJs] Set Allow Edit to Other User',
  props<{ allowEdit: boolean}>()
);


export const changeLoadingState = createAction(
  '[RevealJs] Change Loading State',
  props<{ loading: boolean}>()
);

export const setLoginUserEditors = createAction(
  '[RevealJs] Set Login User Editors',
  props<{ loginUserEditors?: MarkdownDB[] }>()
);


/********************* That Trigger Effects  ***************************/

export const loadLoginUserInfo = createAction(
  '[RevealJs Effect] Try to load login User'
);


export const saveToStorage = createAction(
  '[RevealJs Effect] Save Editor to Storage'
);


export const saveToLocalStorage = createAction(
  '[RevealJs Effect] Save Editor to Local Storage'
);


export const loadAllLoginUserEditors = createAction(
  '[RevealJs Effect] Load All Login User Editors'
);

export const loadLoginUserEditor = createAction(
  '[RevealJs Effect] Load Login User Editor'
);


export const setURLInfo = createAction(
  '[RevealJs +Effect] Set URL info and update location',
  props<URLInfo>()
);

export const setURLSlideNumber = createAction(
  '[RevealJs] Set URL Slide Number',
  props<{ slideNumber: string, slideNumberVertical?: string}>()
);

export const setEditorVisibility = createAction(
  '[RevealJs] Set Editor Visibility',
  props<{ isEditorVisible: boolean }>()
);









