import { AuthService } from './../../auth.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ActivatedRoute, Router } from '@angular/router';
import {
  switchMap,
  map,
  withLatestFrom,
  tap,
  catchError,
} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
  loadEditorState,
  loadEditorStateSuccess,
  saveToLocalStorage,
  saveToStorage,
  saveToStorageFailure,
  saveToStorageSuccess,
} from './actions';
import { EMPTY, of } from 'rxjs';
import { Editor, initialState } from './state';
import { selectEditor } from './selector';
import { Constant } from '../utils/constants';
import { Location } from '@angular/common';
import { isEmpty } from '../utils/basic-utils';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class RevealJsEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private auth: AuthService,
    private location: Location,
    private snackBar: MatSnackBar,
  ) {}

  loadEditorState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEditorState),
      switchMap(({ userType, id }) => {
        if (userType === Constant.URLParamType.Local && id) {
          const editor = JSON.parse(localStorage.getItem(id) || '{}');
          if (!isEmpty(editor)) {
            return of(loadEditorStateSuccess({ editor }));
          }
        }
        // return startup state
        this.location.replaceState(`/${Constant.URLParamType.Startup}`);
        return of(loadEditorStateSuccess({ editor: initialState.editor }));
      })
    )
  );
 /***
  * Save editor to supabase
  */
  saveToStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveToStorage),
      withLatestFrom(this.store.select(selectEditor)),
      switchMap(([param, editor]) => {
        if (editor) {
          return this.auth.saveEditor(param.id, param.name, editor).pipe(
            tap((data) => this.performAfterSaveTasks(data.id, param.name)),
            map((data) => saveToStorageSuccess({ id: data.id, name: data })),
            catchError(() => of(saveToStorageFailure(Constant.Error.SaveError)))
          );
        }
        return of(saveToStorageFailure(Constant.Error.SaveErrorNoEditor));
      })
    )
  );

  /***
   * Save editor to local storage, for reload
   */
  saveToLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(saveToLocalStorage),
        withLatestFrom(this.store.select(selectEditor)),
        switchMap(([param, currentEditor]) => {
          if (param.userType === Constant.URLParamType.Startup) {
            localStorage.setItem(param.name, JSON.stringify(currentEditor));
            this.setLocationLocal(param.name);
            return EMPTY;
          }
          if (param.name) {
            localStorage.setItem(param.name, JSON.stringify(currentEditor));
          }
          return EMPTY;
        })
      ),
    { dispatch: false }
  );

  performAfterSaveTasks(id: number, name: string) {
    // change location 
    this.location.replaceState(
      `/${Constant.URLParamType.Published}/${Constant.URLParamMode.Edit}/${id}/${name}`
    );
    // show message
    this.snackBar.open('Successfully saved!', 'Close', {
      duration: 5000,  
    });
  }

  setLocationLocal(name: string) {
    this.location.replaceState(
      `/${Constant.URLParamType.Local}/${Constant.URLParamMode.Edit}/${name}`
    );
   
  }
}
