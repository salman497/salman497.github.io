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
  loadEditorStateFailure,
  loadEditorStateSuccess,
  saveToLocalStorage,
  saveToStorage,
  saveToStorageFailure,
  saveToStorageSuccess,
  updateURLInfo,
} from './actions';
import { EMPTY, of } from 'rxjs';
import { initialState, Editor } from './state';
import { selectEditor, selectFullState, selectUrlInfo } from './selector';
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
    private snackBar: MatSnackBar
  ) {}

  loadEditorState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEditorState),
      switchMap(({ loadType: userType, id }) => {
        if (userType === Constant.UrlLoadType.Local && id) {
          const editor = JSON.parse(localStorage.getItem(id) || '{}');
          if (!isEmpty(editor)) {
            return of(loadEditorStateSuccess({ editor }));
          }
        }

        if (userType === Constant.UrlLoadType.Published && id) {
          return this.auth.getEditor(Number(id)).pipe(
            map((data) => {
              return loadEditorStateSuccess({ id: data.id, name: data.name, editor: data.editor as Editor });
            }),
            catchError(() =>
              of(loadEditorStateFailure(Constant.Error.LoadError))
            )
          );
        }
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
      withLatestFrom(this.store.select(selectFullState)),
      switchMap(([_ac, obj]) => {
        if (obj.editor) {
          return this.auth
            .saveEditor({
              id: Number(obj.id),
              name: obj.name,
              editor: obj.editor,
              url_name: obj.urlInfo.name,
            })
            .pipe(
              tap((data) => {
                this.store.dispatch(
                  updateURLInfo({
                    loadType: Constant.UrlLoadType.Published,
                    mode: Constant.UrlMode.Edit,
                    id: String(data.id),
                    name: obj.urlInfo.name,
                  })
                );
                // show message
                this.snackBar.open('Successfully saved!', 'Close', {
                  duration: 5000,
                });
              }),
              map((data) =>
                saveToStorageSuccess({
                  id: data.id as number,
                  name: obj.name,
                })
              ),
              catchError(() =>
                of(saveToStorageFailure(Constant.Error.SaveError))
              )
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
        withLatestFrom(
          this.store.select(selectUrlInfo),
          this.store.select(selectEditor)
        ),
        switchMap(([_ac, param, currentEditor]) => {
          if (!param.loadType || param.loadType === Constant.UrlLoadType.Startup) {
            // For first time only
            this.store.dispatch(
              updateURLInfo({
                loadType: Constant.UrlLoadType.Local,
                mode: Constant.UrlMode.Edit,
                id: '0',
                name: Constant.UrlName.Default,
              })
            );
            localStorage.setItem(
              Constant.UrlName.Default,
              JSON.stringify(currentEditor)
            );
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

  /***
   * Updates URL Info to url
   */
  updateURLInfo$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateURLInfo),
        withLatestFrom(this.store.select(selectUrlInfo)),
        switchMap(([_ac, param]) => {
          if (param.loadType === Constant.UrlLoadType.Local) {
            this.location.replaceState(
              `/${Constant.UrlLoadType.Local}/${Constant.UrlMode.Edit}/${param.name}`
            );
            return EMPTY;
          }
          if (param.loadType === Constant.UrlLoadType.Published) {
            this.location.replaceState(
              `/${Constant.UrlLoadType.Published}/${Constant.UrlMode.Edit}/${param.id}/${param.name}`
            );
            return EMPTY;
          }
          // return startup state
          this.location.replaceState(`/${Constant.UrlLoadType.Startup}`);
          return EMPTY;
        })
      ),
    { dispatch: false }
  );
}
