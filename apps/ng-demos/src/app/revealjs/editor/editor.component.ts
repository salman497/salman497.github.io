import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Editor, RevealJsState } from '../state/state';
import * as AppActions from './../state/actions';
import { AuthService } from '../../auth.service';
import { take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'mono-repo-editor',
  templateUrl: './editor.component.html',
  //capsulation: ViewEncapsulation.None,
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  @Input() editor!: Editor;
  currentContent!: string;
  themeSelected!: string;
  themes = ['Black', 'White', 'League', 'Sky', 'Beige', 'Simple', 'Serif', 'Blood', 'Night', 'Moon', 'Solarized'];
  animationSelected!: string;
  animations = ['None', 'Fade', 'Slide', 'Convex', 'Concave', 'Zoom'];
  showPen!: boolean;
  showDrawingArea!: boolean;
  showSlides!: boolean;
  /*** login */
  isLoggedIn$ = this.auth.isAuthenticated$(); // Set to true if the user is logged in
  userName$ = this.auth.getUserName$(); // Replace with actual user name
  userImage$ = this.auth.getUserImage$(); // Replace with actual image path
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onEditorClose = new EventEmitter<void>();

  constructor(private store: Store<RevealJsState>, 
              private route: ActivatedRoute, 
              private auth: AuthService) {
   }

  async ngOnInit() {
   this.currentContent = this.editor.content;
   this.themeSelected = this.editor.themeSelected;
   this.animationSelected = this.editor.animationSelected;
   this.showPen = this.editor.showPen;
   this.showDrawingArea = this.editor.showDrawingArea;
   this.showSlides = this.editor.showSlides;
  }

  updateContent(): void {
    this.store.dispatch(AppActions.updateEditorContent({ content: this.currentContent }));
    this.store.dispatch(AppActions.toggleViewerToReRender());
  }

  updateTheme(): void {
    this.store.dispatch(AppActions.updateEditorTheme({ themeSelected: this.themeSelected }));
    this.store.dispatch(AppActions.toggleViewerToReRender());
  }

  updateAnimation(): void {
    this.store.dispatch(AppActions.updateEditorAnimation({ animationSelected: this.animationSelected }));
  }

  updateShowPen(): void {
    this.store.dispatch(AppActions.updateEditorShowPen({ showPen: this.showPen }));
    this.store.dispatch(AppActions.toggleViewerToReRender());
  }

  updateShowDrawingArea(): void {
    this.store.dispatch(AppActions.updateEditorShowDrawingArea({ showDrawingArea: this.showDrawingArea }));
    this.store.dispatch(AppActions.toggleViewerToReRender());
  }

  updateShowSlides(): void {
    this.store.dispatch(AppActions.updateEditorShowSlides({ showSlides: this.showSlides }));
    this.store.dispatch(AppActions.toggleViewerToReRender());
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

  onSave(): void {
    let identifier = this.route.snapshot.paramMap.get('identifier') as string;
    this.store.dispatch(AppActions.saveEditorState({ identifier, isLoggedIn: this.auth.currentlyLoggedIn()}));
  }


}