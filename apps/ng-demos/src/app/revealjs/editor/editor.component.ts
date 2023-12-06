import {
  selectAllowEdit,
  selectEditor,
  selectIsEditMode,
  selectLoginUserEditors,
  selectMarkdown,
  selectName,
  selectUrlEdit,
  selectUrlInfo,
  selectUrlView,
  selectUserImageUrl,
  selectUserName,
} from './../state/selector';

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { RevealJsState } from '../state/state';
import * as actions from './../state/actions';
import { AuthService } from '../../auth.service';
import { ActivatedRoute } from '@angular/router';

import { filter, map, of, Subject } from 'rxjs';
import { MarkdownDB } from '../models/db.model';
import { selectIsLogin } from '../state/selector';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Constant } from '../utils/constants';
import { environment } from '../../environment/environment';
@Component({
  selector: 'mono-repo-editor',
  templateUrl: './editor.component.html',
  //capsulation: ViewEncapsulation.None,
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {

  allowEdit$ = this.store.select(selectAllowEdit);

  /*** login */
 
  isLoggedIn$ = this.store.select(selectIsLogin);
  chatDisabled$ = environment.chatDisabled ?  of(true): this.isLoggedIn$.pipe(map(login => login === false));
  userName$ = this.store.select(selectUserName);
  userImage$ = this.store.select(selectUserImageUrl);
  markdown$ = this.store.select(selectMarkdown);
  theme$ = this.store
    .select(selectEditor)
    .pipe(map((e) => e && e.themeSelected));
  animation$ = this.store
    .select(selectEditor)
    .pipe(map((e) => e && e.animationSelected));
  showPen$ = this.store.select(selectEditor).pipe(map((e) => e && e.showPen));
  showDrawingArea$ = this.store
    .select(selectEditor)
    .pipe(map((e) => e && e.showDrawingArea));
  showSlides$ = this.store
    .select(selectEditor)
    .pipe(map((e) => e && e.showSlides));
  showAutoSlide$ = this.store
    .select(selectEditor)
    .pipe(map((e) => e && e.showAutoSlide));
  isEditMode$ = this.store.select(selectIsEditMode);
  name$ = this.store.select(selectName);
  viewUrl$ = this.store.select(selectUrlView);
  editUrl$ = this.store.select(selectUrlEdit);
  selectedPresentationId$ = this.store.select(selectUrlInfo).pipe(
    filter((info) => !!info?.id),
    map((info) => Number(info?.id))
  );

  loginFeatureText$ = this.store.select(selectIsLogin).pipe(
    map((isLogin) => {
      if (!isLogin) {
        return '[login required]';
      }
      return '';
    })
  );

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onEditorClose = new EventEmitter<void>();
  private contentChangeSubject = new Subject<string>();

  selectedPresentation!: MarkdownDB;
  userPresentations$ = this.store.select(selectLoginUserEditors);

  constructor(private store: Store<RevealJsState>, private auth: AuthService) {}

  ngOnInit() {}

  onLogin(): void {
    this.auth.signInWithGoogle();
  }

  OnLogout() {
    this.auth.logout();
  }

  onClose(): void {
    this.onEditorClose.emit();
  }

  onPublish(): void {
    this.store.dispatch(actions.saveToStorage());
  }

  newPresentation(): void {
    this.store.dispatch(
      actions.updateEditorContent({
        content: `
# New Presentation`,
      })
    );
    this.store.dispatch(actions.toggleViewerToReRender());
    this.store.dispatch(
      actions.setURLInfo({
        loadType: Constant.UrlLoadType.Local,
        mode: Constant.UrlMode.Edit,
        id: '0',
        name: Constant.UrlName.New,
        resetHash: true
      })
    );
    this.store.dispatch(actions.saveToLocalStorage());
  }
}
