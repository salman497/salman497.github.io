import { createAction, props } from '@ngrx/store';

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


export const saveEditor = createAction(
  '[RevealJs] Save Editor'
);