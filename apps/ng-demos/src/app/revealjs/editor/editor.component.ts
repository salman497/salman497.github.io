import {
  selectAllowEdit,
  selectEditor,
  selectIsEditMode,
  selectLoginUserEditors,
  selectName,
  selectUrlEdit,
  selectUrlView,
  selectUserImageUrl,
  selectUserName,
} from './../state/selector';

import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Editor, RevealJsState } from '../state/state';
import * as actions from './../state/actions';
import { AuthService } from '../../auth.service';
import { ActivatedRoute } from '@angular/router';
import { buildPublishedURL } from '../utils/basic-utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Subject,
  tap
} from 'rxjs';
import { MarkdownDB } from '../models/db.model';
import { Constant } from '../utils/constants';
import { selectIsLogin } from '../state/selector';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'mono-repo-editor',
  templateUrl: './editor.component.html',
  //capsulation: ViewEncapsulation.None,
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit, OnDestroy, AfterViewInit {
  themes = [
    'Black',
    'White',
    'League',
    'Sky',
    'Beige',
    'Simple',
    'Serif',
    'Blood',
    'Night',
    'Moon',
    'Solarized',
  ];
  allowEdit$ = this.store.select(selectAllowEdit);
  animations = ['None', 'Fade', 'Slide', 'Convex', 'Concave', 'Zoom'];
  /*** login */
  isLoggedIn$ = this.store.select(selectIsLogin);
  userName$ = this.store.select(selectUserName);
  userImage$ = this.store.select(selectUserImageUrl);
  editor$ = this.store.select(selectEditor).pipe(filter(e => e && e.content ? true : false));
  isEditMode$ = this.store.select(selectIsEditMode);
  name$ = this.store.select(selectName);
  viewUrl$ = this.store.select(selectUrlView);
  editUrl$ = this.store.select(selectUrlEdit);
  loginFeatureText$ = this.store.select(selectIsLogin).pipe(
    map((isLogin) => {
      if (!isLogin) {
        return '[login required]';
      }
      return '';
    })
  );

  disabled$ = this.store.select(selectIsLogin).pipe(
    map((isLogin) => {
      if (isLogin) {
        return false;
      }
      return true;
    })
  );

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onEditorClose = new EventEmitter<void>();
  private contentChangeSubject = new Subject<string>();

  selectedPresentation!: MarkdownDB;
  userPresentations$ = this.store.select(selectLoginUserEditors).pipe(
    tap((presets) => {
      if (presets && presets.length > 0) {
        const params = this.route.snapshot.paramMap;
        const id = params.get(Constant.UrlPart.Id) as string;
        const selectedPresentation = presets.find(
          (present) => String(present.id) == id
        );
        if (!this.selectedPresentation && selectedPresentation) {
          this.selectedPresentation = selectedPresentation;
        }
      }
    })
  );

  constructor(
    private store: Store<RevealJsState>,
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private clipboard: Clipboard,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
   
  }
  ngOnDestroy(): void {
    if (this.contentChangeSubject) {
      this.contentChangeSubject.unsubscribe();
    }
  }
  ngAfterViewInit() { 
    this.contentChangeSubject
    .pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter((content) => !!content && content.trim() !== '')
    )
    .subscribe((content) => {
      this.store.dispatch(actions.updateEditorContent({ content }));
      this.store.dispatch(actions.toggleViewerToReRender());
      this.store.dispatch(actions.saveToLocalStorage());
    });
  }
  onTextareaChange(event: any): void {
    this.contentChangeSubject.next(event?.target?.value);
  }

  updateTheme(themeSelected: string): void {
    this.store.dispatch(actions.updateEditorTheme({ themeSelected }));
    this.store.dispatch(actions.toggleViewerToReRender());
    this.store.dispatch(actions.saveToLocalStorage());
  }

  updateAnimation(animationSelected: string): void {
    this.store.dispatch(
      actions.updateEditorAnimation({
        animationSelected,
      })
    );
    this.store.dispatch(actions.saveToLocalStorage());
  }

  updateShowPen(event: MatSlideToggleChange): void {
    this.store.dispatch(
      actions.updateEditorShowPen({ showPen: event.checked })
    );
    this.store.dispatch(actions.toggleViewerToReRender());
    this.store.dispatch(actions.saveToLocalStorage());
  }

  updateShowDrawingArea(event: MatSlideToggleChange): void {
    this.store.dispatch(
      actions.updateEditorShowDrawingArea({
        showDrawingArea: event.checked,
      })
    );
    this.store.dispatch(actions.toggleViewerToReRender());
    this.store.dispatch(actions.saveToLocalStorage());
  }

  updateShowSlides(event: MatSlideToggleChange): void {
    this.store.dispatch(
      actions.updateEditorShowSlides({ showSlides: event.checked })
    );
    this.store.dispatch(actions.toggleViewerToReRender());
    this.store.dispatch(actions.saveToLocalStorage());
  }

  updateShowAutoSlides(event: MatSlideToggleChange): void {
    this.store.dispatch(
      actions.updateEditorShowAutoSlides({ showAutoSlide: event.checked })
    );
    this.store.dispatch(actions.toggleViewerToReRender());
    this.store.dispatch(actions.saveToLocalStorage());
  }

  onLogin(): void {
    this.auth.signInWithGoogle();
  }

  OnLogout() {
    this.auth.logout();
  }

  onClose(): void {
    this.onEditorClose.emit();
  }

  // publish
  onPublish(presentationName: string) {
    const urlName = presentationName.replace(/\s+/g, '-').toLowerCase();
    this.store.dispatch(actions.updateURLNameOnly({ name: urlName }));
    this.store.dispatch(actions.saveToStorage());
  }

  copyToClipboard(url: string) {
    this.clipboard.copy(url);
    this.snackBar.open('URL copied to clipboard!', 'Close', {
      duration: 2000,
    });
  }

  openInNewTab(url: string) {
    window.open(url, '_blank');
  }

  onPresentationNameChange(event: any) {
    const name = event.target.value;
    this.store.dispatch(actions.updateNameOnly({ name }));
  }

  onPresentationSelected() {
    this.store.dispatch(
      actions.setURLInfo({
        loadType: Constant.UrlLoadType.Published,
        mode: Constant.UrlMode.Edit,
        id: String(this.selectedPresentation.id),
        name: this.selectedPresentation.url_name,
      })
    );
    this.store.dispatch(actions.loadLoginUserEditor());
  }

  onAllowEditChange(event: MatSlideToggleChange) {
    this.store.dispatch(actions.setAllowEdit({ allowEdit: event.checked }));
  }

  async onDeleteButtonClick() {
    if (this.selectedPresentation && typeof this.selectedPresentation.id) {
      await this.auth.deleteMarkdown(this.selectedPresentation.id);
    }
  }
}
