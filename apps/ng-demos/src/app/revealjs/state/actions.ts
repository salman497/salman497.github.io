import { createAction, props } from '@ngrx/store';
import { Editor } from './state';

export const updateEditorContent = createAction(
  '[RevealJs] Update Editor Content',
  props<{ content: string }>()
);

export const initEditor = createAction(
  '[RevealJs] Initialize Editor',
  props<{ editor: Editor }>()
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

// New actions for loading and saving the editor state
export const loadEditorState = createAction(
  '[RevealJs] Load Editor State',
  props<{ identifier: string, isLoggedIn: boolean }>()
);

export const saveEditorState = createAction(
  '[RevealJs] Save Editor State',
  props<{ identifier: string, isLoggedIn: boolean }>()
);
