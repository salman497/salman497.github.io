// effects.ts
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { saveEditor } from './actions';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { RevealJsState } from './state';
import { AuthService } from '../../auth.service';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { v4 as uuidv4 } from 'uuid';
import { addQueryParam } from '../utils/basic-utils';
@Injectable()
export class RevealJsEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store<{ revealJs: RevealJsState }>,
    private auth: AuthService
  ) {}

  /**************loadEditorState***************/
  loadEditorState$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ROUTER_NAVIGATION),
        map((action: RouterNavigationAction) => {
          let linkId = action.payload.routerState.root.queryParams['linkId'];
          if (linkId) {
            console.log('---------------linkId---------------------', linkId);
            // Load state from local storage based on linkId and dispatch an action to update the store
          } else {
            linkId = uuidv4(); 
           // addQueryParam('linkId', linkId);
            // this.router.navigate([], {
            //     relativeTo: this.router.routerState.root,
            //     queryParams: { linkId },
            //     queryParamsHandling: 'merge',
            //   });
          }
        })
      ),
    { dispatch: false } // Set to false if you are not dispatching an action
  );

 /**************saveEditorState***************/
  saveEditorState$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(saveEditor),
        withLatestFrom(this.store.select('revealJs')),
        tap(([action, revealJsState]) => {
          const linkId = revealJsState.editor.linkId;
          // Check if user is logged in
          if (this.auth.currentlyLoggedIn()) {
            console.log('---------------Save---------------------');
            // Make API call to save the editor state
          } else {
            // Save the editor state to local storage
            localStorage.setItem(
              `editorState_${linkId}`,
              JSON.stringify(revealJsState.editor)
            );
          }
          // Update the URL to include the linkId as a query parameter
          this.router.navigate([], {
            relativeTo: this.router.routerState.root,
            queryParams: { linkId },
            queryParamsHandling: 'merge',
          });
        })
      ),
    { dispatch: false }
  );
}
