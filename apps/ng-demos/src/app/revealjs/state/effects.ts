import { AuthService } from './../../auth.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { switchMap, map, withLatestFrom, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { loadEditorState, saveEditorState, updateEditor } from './actions';
import { EMPTY, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { initialState } from './state';
import { selectEditor } from './selector';
import { Constant } from '../utils/constants';



@Injectable()
export class RevealJsEffects {

  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store,
    private auth: AuthService 
  ) {}

  loadEditorState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEditorState),
      switchMap(({ identifier, isLoggedIn }) => {
        if (identifier === Constant.StartupTemplateIdentifier) {
          return of(updateEditor({ editor: initialState.editor }));
        } else if (!isLoggedIn) {
          const editor = JSON.parse(localStorage.getItem(identifier) || '{}');
          return of(updateEditor({ editor }));
        } else {
          return this.auth.loadContent(identifier).pipe(
            map(editor => updateEditor({ editor }))
          );
        }
      })
    )
  );

  saveEditorState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveEditorState),
      withLatestFrom(this.store.select(selectEditor)),
      switchMap(([action, currentEditor]) => {
        const { identifier, isLoggedIn } = action;
        if (identifier === Constant.StartupTemplateIdentifier && !isLoggedIn) {
          const newIdentifier = uuidv4();
          this.router.navigate([newIdentifier]);
          localStorage.setItem(newIdentifier, JSON.stringify(currentEditor));
          return EMPTY;
        } else if (!isLoggedIn) {
          localStorage.setItem(identifier, JSON.stringify(currentEditor));
          return EMPTY;
        } else {
          return this.auth.saveEditor(identifier, currentEditor as any).pipe(
            // Handle any actions after saving to API if needed
            tap(() => {
              // For example, you might want to show a success notification here
            })
          );
        }
      })
    ),
    { dispatch: false } // Since we're not dispatching any new action after the save
);
}

