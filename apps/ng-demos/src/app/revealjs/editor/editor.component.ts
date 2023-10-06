import { URLParam } from './../models/url.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Editor, RevealJsState } from '../state/state';
import * as actions from './../state/actions';
import { AuthService } from '../../auth.service';
import { ActivatedRoute } from '@angular/router';
import { Constant } from '../utils/constants';
import { buildURL, generateShortID } from '../utils/basic-utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'mono-repo-editor',
  templateUrl: './editor.component.html',
  //capsulation: ViewEncapsulation.None,
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {
  @Input() editor!: Editor;
  currentContent!: string;
  themeSelected!: string;
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
  animationSelected!: string;
  animations = ['None', 'Fade', 'Slide', 'Convex', 'Concave', 'Zoom'];
  showPen!: boolean;
  showDrawingArea!: boolean;
  showSlides!: boolean;
  /*** login */
  isLoggedIn$ = this.auth.isAuthenticated$(); // Set to true if the user is logged in
  userName$ = this.auth.getUserName$(); // Replace with actual user name
  userImage$ = this.auth.getUserImage$(); // Replace with actual image path

  urlParam!: URLParam;
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onEditorClose = new EventEmitter<void>();

  // publish section
  presentationName: string = 'My presentation';
  publishedViewUrl: string = ''; // This will be set after publishing
  publishedEditUrl: string = ''; // This will be set after publishing
  userPresentations: string[] = []; // This should be fetched from the backend
  selectedPresentation: string = '';

  constructor(
    private store: Store<RevealJsState>,
    private auth: AuthService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private clipboard: Clipboard
  ) {}

  async ngOnInit() {
    this.currentContent = this.editor.content;
    this.themeSelected = this.editor.themeSelected;
    this.animationSelected = this.editor.animationSelected;
    this.showPen = this.editor.showPen;
    this.showDrawingArea = this.editor.showDrawingArea;
    this.showSlides = this.editor.showSlides;

    const params = this.route.snapshot.paramMap;
    this.urlParam = {
      userType: params.get(Constant.URLParam.Type) as string,
      mode: params.get(Constant.URLParam.Mode) as string,
      id: (Number(params.get(Constant.URLParam.Id))),
      name: (params.get(Constant.URLParam.Name) as string) || 'my-presentation',
    };
  }

  updateContent(): void {
    this.store.dispatch(
      actions.updateEditorContent({ content: this.currentContent })
    );
    this.store.dispatch(actions.toggleViewerToReRender());
    this.store.dispatch(actions.saveToLocalStorage(this.urlParam));
  }

  updateTheme(): void {
    this.store.dispatch(
      actions.updateEditorTheme({ themeSelected: this.themeSelected })
    );
    this.store.dispatch(actions.toggleViewerToReRender());
    this.store.dispatch(actions.saveToLocalStorage(this.urlParam));
  }

  updateAnimation(): void {
    this.store.dispatch(
      actions.updateEditorAnimation({
        animationSelected: this.animationSelected,
      })
    );
    this.store.dispatch(actions.saveToLocalStorage(this.urlParam));
  }

  updateShowPen(): void {
    this.store.dispatch(actions.updateEditorShowPen({ showPen: this.showPen }));
    this.store.dispatch(actions.toggleViewerToReRender());
    this.store.dispatch(actions.saveToLocalStorage(this.urlParam));
  }

  updateShowDrawingArea(): void {
    this.store.dispatch(
      actions.updateEditorShowDrawingArea({
        showDrawingArea: this.showDrawingArea,
      })
    );
    this.store.dispatch(actions.toggleViewerToReRender());
    this.store.dispatch(actions.saveToLocalStorage(this.urlParam));
  }

  updateShowSlides(): void {
    this.store.dispatch(
      actions.updateEditorShowSlides({ showSlides: this.showSlides })
    );
    this.store.dispatch(actions.toggleViewerToReRender());
    this.store.dispatch(actions.saveToLocalStorage(this.urlParam));
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
  onPublish() {
    this.store.dispatch(actions.saveToStorage(this.urlParam));
    this.snackBar.open(
      'Login will give the ability to load their existing presentations',
      'Close',
      {
        duration: 3000,
      }
    );
    this.urlParam.name = this.presentationName
      .replace(/\s+/g, '-')
      .toLowerCase();
    // Here, add your logic to save and publish the presentation
    // For the sake of this example, I'm just setting some dummy URLs
    this.publishedViewUrl = buildURL({
      userType: Constant.URLParamType.Published,
      mode: Constant.URLParamMode.View,
      id: this.urlParam.id,
      name: this.urlParam.name,
    });
    this.publishedEditUrl = buildURL({
      userType: Constant.URLParamType.Published,
      mode: Constant.URLParamMode.Edit,
      id: this.urlParam.id,
      name: this.urlParam.name,
    });
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
}
