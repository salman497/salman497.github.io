import { createAction, props } from '@ngrx/store';

export const updateEditorContent = createAction(
  '[RevealJs] Update Editor Content',
  props<{ content: string }>()
);