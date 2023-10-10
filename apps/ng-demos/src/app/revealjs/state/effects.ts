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
  selectEditor,
  selectFullState,
  selectUrlInfo,
  selectUser,
} from './selector';
import { Constant } from '../utils/constants';
import { Location } from '@angular/common';
import { allowAccessToEditor, isEmpty } from '../utils/basic-utils';
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
        if (urlInfo.loadType === Constant.UrlLoadType.Local && urlInfo.id) {
          const editor = JSON.parse(localStorage.getItem(urlInfo.id) || '{}');
          if (!isEmpty(editor)) {
            return of(loadEditorStateSuccess({ editor }));
          }
        }

        if (urlInfo.loadType === Constant.UrlLoadType.Published) {
          return this.auth.getEditor$(Number(urlInfo.id)).pipe(
            map((data) => {
              if(!allowAccessToEditor(state.loginUser, data)) {
                return loadEditorStateFailure(Constant.Error.LoadErrorNoAccess); 
              }
              return loadEditorStateSuccess({
                id: data.id,
                name: data.name,
                publicAccess: data.public_access,
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

  loadEditorStateSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEditorStateSuccess),
      map(() => toggleViewerToReRender())
    )
  );


loadEditorStateFailure$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loadEditorStateFailure),
    tap((obj) => {
       this.store.dispatch(
        setURLInfo({
          loadType: Constant.UrlLoadType.Startup
        })
      );
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
              public_access: obj.allowPublicAccess
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
   * Save editor to local storage
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
          if (
            !param.loadType ||
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
