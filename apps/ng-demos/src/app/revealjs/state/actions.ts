import { createAction, props } from '@ngrx/store';
import { Editor, ErrorState, URLInfo } from './state';

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


export const saveToLocalStorage = createAction(
  '[RevealJs Effect] Save Editor to Local Storage'
);

/********************* ASYNC OPERATIONS ***************************/

export const loadEditorState = createAction(
  '[RevealJs Effect] Load Editor State',
   props<{ loadType?: string, mode?: string, id?: string }>()
);

export const loadEditorStateSuccess = createAction(
  '[RevealJs] Load Editor State Success',
   props<{ editor: Editor }>()
);

export const loadEditorStateFailure = createAction(
  '[RevealJs] Load Editor State Failure',
   props<ErrorState>()
);


export const saveToStorage = createAction(
  '[RevealJs Effect] Save Editor to Storage'
);

export const saveToStorageSuccess = createAction(
  '[RevealJs] Save Editor to Storage Success',
  props<{ id: number, name: string }>()
);

export const saveToStorageFailure = createAction(
  '[RevealJs] Save Editor to Storage failure',
  props<ErrorState>()
);

export const updateURLInfo = createAction(
  '[RevealJs +Effect] Update URL info',
  props<URLInfo>()
);

export const updateURLNameOnly = createAction(
  '[RevealJs] Update URL Name only',
  props<{ name: string}>()
);

export const updateNameOnly = createAction(
  '[RevealJs] Update Presentation Name only',
  props<{ name: string}>()
);


export const changeLoadingState = createAction(
  '[RevealJs] Change Loading State',
  props<{ loading: boolean}>()
);



