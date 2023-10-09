
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Editor, RevealJsState } from '../state/state';
import * as actions from './../state/actions';
import { AuthService } from '../../auth.service';
import { ActivatedRoute } from '@angular/router';
import { buildPublishedURL } from '../utils/basic-utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';
import { EMPTY, map } from 'rxjs';
import { MarkdownDB } from '../models/db.model';
import { Constant } from '../utils/constants';

@Component({
  selector: 'mono-repo-editor',
  templateUrl: './editor.component.html',
  //capsulation: ViewEncapsulation.None,
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit{
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
  disabled$ = this.auth.isAuthenticated$().pipe(map(isLogin => {
    if(isLogin) {
      return false;
    }
    return true;
}));

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onEditorClose = new EventEmitter<void>();

  // publish section
  @Input() presentationName = 'My presentation';
  @Input() publishedViewUrl = ''; // This will be set after publishing
  @Input() publishedEditUrl = ''; // This will be set after publishing
  userPresentations$ = this?.auth.getMyEditors(); // This should be fetched from the backend
  selectedPresentation!: MarkdownDB;
  titlename = 'Login to enable this feature. [login required]'
  tooltip = 'Login to enable this feature. [login required]'


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
    
    if(!this.auth.currentlyLoggedIn()) {
      this.titlename = 'Presenation Selecton [login required]'
      this.tooltip = 'Login to enable this feature. [login required]'
    } else {
      this.titlename = 'Presenation Selecton'
      this.tooltip  = 'Presenation Selecton'

    }


  }


  updateContent(): void {
    this.store.dispatch(
      actions.updateEditorContent({ content: this.currentContent })
    );
    this.store.dispatch(actions.toggleViewerToReRender());
    this.store.dispatch(actions.saveToLocalStorage());
  }

  updateTheme(): void {
    this.store.dispatch(
      actions.updateEditorTheme({ themeSelected: this.themeSelected })
    );
    this.store.dispatch(actions.toggleViewerToReRender());
    this.store.dispatch(actions.saveToLocalStorage());
  }

  updateAnimation(): void {
    this.store.dispatch(
      actions.updateEditorAnimation({
        animationSelected: this.animationSelected,
      })
    );
    this.store.dispatch(actions.saveToLocalStorage());
  }

  updateShowPen(): void {
    this.store.dispatch(actions.updateEditorShowPen({ showPen: this.showPen }));
    this.store.dispatch(actions.toggleViewerToReRender());
    this.store.dispatch(actions.saveToLocalStorage());
  }

  updateShowDrawingArea(): void {
    this.store.dispatch(
      actions.updateEditorShowDrawingArea({
        showDrawingArea: this.showDrawingArea,
      })
    );
    this.store.dispatch(actions.toggleViewerToReRender());
    this.store.dispatch(actions.saveToLocalStorage());
  }

  updateShowSlides(): void {
    this.store.dispatch(
      actions.updateEditorShowSlides({ showSlides: this.showSlides })
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
  onPublish() {
    this.store.dispatch(actions.updateNameOnly({ name: this.presentationName}));
    const urlName = this.presentationName.replace(/\s+/g, '-').toLowerCase();
    this.store.dispatch(actions.updateURLNameOnly({ name: urlName }));
    // store
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


  onPresentationSelected() { 
    this.store.dispatch(actions.updateURLInfo({ loadType: Constant.UrlLoadType.Published, 
                                                mode: Constant.UrlMode.Edit, 
                                                id: String(this.selectedPresentation.id), 
                                                name: this.selectedPresentation.url_name }));
    this.store.dispatch(actions.loadEditorState({ loadType: Constant.UrlLoadType.Published, mode: Constant.UrlMode.Edit, id : String(this.selectedPresentation.id) }));
    this.store.dispatch(actions.toggleViewerToReRender());
    //const url = buildPublishedURL(String(this.selectedPresentation.id), this.selectedPresentation.url_name as string);
   // window.location.replace(url)
  }
  
  async onDeleteButtonClick() {
    if (this.selectedPresentation && typeof this.selectedPresentation.id) {
      // Call Deletemarkdown with the presentation's id
      (await
        // Call Deletemarkdown with the presentation's id
        this.auth.deleteMarkdown(this.selectedPresentation.id)).subscribe(() => {
        // Optionally, you can also update your userPresentations$ observable
        this.selectedPresentation;
        
      });
    }
  }
 
}
