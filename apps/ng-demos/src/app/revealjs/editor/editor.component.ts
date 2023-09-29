import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { selectEditor } from '../state/selector';
import { Editor, RevealJsState } from '../state/state';
import * as AppActions from './../state/actions';
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
  isLoggedIn: boolean = false; // Set to true if the user is logged in
  userName: string = 'Salman Aziz'; // Replace with actual user name
  userImage: string = 'https://avatars.githubusercontent.com/u/15084194?v=4'; // Replace with actual image path
  @Output() onEditorClose = new EventEmitter<void>();

  constructor(private store: Store<RevealJsState>) { }

  ngOnInit() {
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

  }

  onClose(): void {
    this.onEditorClose.emit();
  }
}
