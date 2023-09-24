import { Component, ViewChild, ViewEncapsulation} from '@angular/core';
import { Store } from '@ngrx/store';

import { RevealJsState } from './state/state';
import * as AppActions from './state/actions';
import { selectEditorContent } from './state/selector';
import { tap } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
@Component({
  selector: 'mono-repo-revealjs',
  templateUrl: './revealjs.component.html',
  //encapsulation: ViewEncapsulation.None,
  styleUrls: ['./revealjs.component.css']
})
export class RevealjsComponent {
  editorVisible: boolean = false;
  toggleViewer: boolean = false;
  content$ = this.store.select(selectEditorContent);
  @ViewChild('editorSidenav') editorSidenav!: MatSidenav;

  constructor(private store: Store<RevealJsState>) { }

  toggleEditor(): void {
    this.editorVisible = !this.editorVisible;
  }
  updateContent(value: string): void {
    this.store.dispatch(AppActions.updateEditorContent({ content: value }));
    this.toggleViewer = !this.toggleViewer;
  }
  closeSidenav() {
    this.editorSidenav.close();
  }
}
