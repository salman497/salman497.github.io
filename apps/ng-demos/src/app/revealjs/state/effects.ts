import { AuthService } from './../../auth.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, map, withLatestFrom, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { loadEditorState, saveToLocalStorage, initEditor, saveToStorage } from './actions';
import { EMPTY, of } from 'rxjs';
import { Editor, initialState } from './state';
import { selectEditor } from './selector';
import { Constant } from '../utils/constants';
import { Location } from '@angular/common';
import { isEmpty } from '../utils/basic-utils';

@Injectable()
export class RevealJsEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private auth: AuthService,
    private location: Location
  ) {}

  loadEditorState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEditorState),
      switchMap(({ userType, id }) => {
        if (userType === Constant.URLParamType.Local && id) {
          const editor = JSON.parse(localStorage.getItem(id) || '{}');
          if (!isEmpty(editor)) {
            return of(initEditor({ editor }));
          }
        }
         // return startup state
         this.location.replaceState(`/${Constant.URLParamType.Startup}`);
         return of(initEditor({ editor: initialState.editor }));
      })
    )
  );

  saveToLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(saveToLocalStorage),
        withLatestFrom(this.store.select(selectEditor)),
        switchMap(([param, currentEditor]) => {
          if (!param.userType || param.userType === Constant.URLParamType.Startup) {
            localStorage.setItem(param.name, JSON.stringify(currentEditor));
            this.location.replaceState(
              `/${Constant.URLParamType.Local}/${Constant.URLParamMode.Edit}/${param.name}`
            );
            return EMPTY;
          }
          if (param.id) {
            localStorage.setItem(param.name, JSON.stringify(currentEditor));
          }
          return EMPTY;
        })
      ),
    { dispatch: false } // Since we're not dispatching any new action after the save
  );

  saveToStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(saveToStorage),
        withLatestFrom(this.store.select(selectEditor)),
        switchMap(([param, editor]) => {
          return this.auth.saveEditor(param.id, param.name, editor as Editor).pipe(tap(data=> {
            this.location.replaceState(
              `/${Constant.URLParamType.Published}/${Constant.URLParamMode.Edit}/${data.id}/${param.name}`
            );
          }))
        }),
        map(() => EMPTY)
      ),
    { dispatch: false } // Since we're not dispatching any new action after the save
  );
}
