import { AuthService } from './../../auth.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  switchMap,
  map,
  withLatestFrom,
  tap,
  catchError,
  concatMap,
} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
  loadLoginUserInfo,
  loadEditorStateFailure,
  loadEditorStateSuccess,
  saveToLocalStorage,
  saveToStorage,
  saveToStorageFailure,
  saveToStorageSuccess,
  setLoginUserEditors,
  toggleViewerToReRender,
  setURLInfo,
  setLoginUserInfo,
  loadAllLoginUserEditors,
  loadLoginUserEditor,
} from './actions';
import { EMPTY, from, of } from 'rxjs';
import { initialState, Editor, LoginUser } from './state';
import {
  selectFullState,
  selectUrlInfo,
  selectUser,
} from './selector';
import { Constant } from '../utils/constants';
import { Location } from '@angular/common';
import { allowEdit, isEmpty, isLocalStorageGreater } from '../utils/basic-utils';
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


  loadLoginUserInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadLoginUserInfo),
      switchMap(() => {
        return from(this.auth.getLoginUser()).pipe(
          concatMap((loginUser) => {
            return from([
              // multiple actions
              setLoginUserInfo(loginUser),
              loadLoginUserEditor(),
              loadAllLoginUserEditors(),
            ])
          })
        );
      })
    )
  );

  /**
   * Get login user editors
   */
  loadAllLoginUserEditors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAllLoginUserEditors),
      withLatestFrom(this.store.select(selectUser)),
      switchMap(([_, user]) => {
        if (user?.id) {
          return this.auth
            .getAllUserEditors$(user.id)
            .pipe(
              map((editors) =>
                setLoginUserEditors({ loginUserEditors: editors })
              )
            );
        }
        return of(setLoginUserEditors({ loginUserEditors: [] }));
      })
    )
  );

  /***
   * Load editor state
   */
  loadEditorState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadLoginUserEditor),
      withLatestFrom(this.store.select(selectFullState)),
      switchMap(([_, state]) => {
        const urlInfo = state?.urlInfo || {};
        if (urlInfo.loadType === Constant.UrlLoadType.Local) {
          const fullState = JSON.parse(localStorage.getItem(urlInfo.id || '0') || '{}');
          if (!isEmpty(fullState)) {
            return of(loadEditorStateSuccess({ ...fullState }));
          }
        }

        if (urlInfo.loadType === Constant.UrlLoadType.Published) {
          return this.auth.getEditor$(Number(urlInfo.id)).pipe(
            tap(data => {
              if(!allowEdit(state.loginUser, data) && urlInfo.mode === Constant.UrlMode.Edit) {
                // Apply permission
                this.snackBar.open('Only view permission given.', 'Close', {
                  duration: 5000,
                });
                this.store.dispatch(
                  setURLInfo({
                    loadType: Constant.UrlLoadType.Published,
                    mode: Constant.UrlMode.View,
                    id: String(data.id),
                    name: data.url_name
                  })
                );
              }
            }),
            map((data) => {
              const localState = JSON.parse(localStorage.getItem(urlInfo.id || '0') || '{}');
              if(isLocalStorageGreater(localState, data)) {
                return loadEditorStateSuccess({ ...localState });
              }
              return loadEditorStateSuccess({
                id: data.id,
                name: data.name,
                allowEdit: data.allow_edit,
                modified: data.modified,
                editor: data.editor as Editor,
              });
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

 


loadEditorStateFailure$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loadEditorStateFailure),
    tap((obj) => {

       // show message
       this.snackBar.open(obj.message, 'Close', {
        duration: 5000,
      });
    }),
  ),
  { dispatch: false }
);
  /***
   * Save editor to supabase
   */
  saveToStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveToStorage),
      withLatestFrom(this.store.select(selectFullState)),
      switchMap(([_, obj]) => {
        if (obj.editor) {
          return this.auth
            .saveEditor({
              id: Number(obj.id),
              name: obj.name,
              editor: obj.editor,
              url_name: obj.urlInfo.name,
              allow_edit: obj.allowEdit,
              user_id: obj?.loginUser?.id,
              modified: obj?.modified
            })
            .pipe(
              tap((data) => {
                // try getting his editor if login
                this.store.dispatch(loadAllLoginUserEditors());
                this.store.dispatch(
                  setURLInfo({
                    loadType: Constant.UrlLoadType.Published,
                    mode: Constant.UrlMode.Edit,
                    id: String(data.id),
                    name: obj.urlInfo.name
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
   * Save editor to local storage
   */
  saveToLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(saveToLocalStorage),
        withLatestFrom(
          this.store.select(selectUrlInfo),
          this.store.select(selectFullState)
        ),
        switchMap(([_ac, param, fullState]) => {
          if (!param.loadType ||
            param.loadType === Constant.UrlLoadType.Startup
          ) {
            // For first time only
            this.store.dispatch(
              setURLInfo({
                loadType: Constant.UrlLoadType.Local,
                mode: Constant.UrlMode.Edit,
                id: '0',
                name: Constant.UrlName.Default,
              })
            );
            localStorage.setItem(
              '0',
              JSON.stringify(fullState)
            );
            return EMPTY;
          }
          if (param.name) {
            localStorage.setItem(String(fullState.id || 0), JSON.stringify(fullState));
          }
          return EMPTY;
        })
      ),
    { dispatch: false }
  );

  /***
   * Updates URL Info in location
   */
  updateURLLocation$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setURLInfo),
        withLatestFrom(this.store.select(selectUrlInfo)),
        switchMap(([_ac, param]) => {
          if (param.loadType === Constant.UrlLoadType.Local) {
            this.location.replaceState(
              `/${Constant.UrlLoadType.Local}/${Constant.UrlMode.Edit}/${param.name}${window.location.hash}`
            );
            return EMPTY;
          }
          if (param.loadType === Constant.UrlLoadType.Published) {
            this.location.replaceState(
              `/${Constant.UrlLoadType.Published}/${param.mode}/${param.id}/${param.name}${window.location.hash}`
            );
            return EMPTY;
          }
          // return startup state
          this.location.replaceState(`/${Constant.UrlLoadType.Startup}${window.location.hash}`);
          return EMPTY;
        })
      ),
    { dispatch: false }
  );
}
