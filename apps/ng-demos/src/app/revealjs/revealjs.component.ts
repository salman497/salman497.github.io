import { Component} from '@angular/core';
import { Store } from '@ngrx/store';

import { RevealJsState } from './state/state';
import * as AppActions from './state/actions';
import { selectEditorContent } from './state/selector';
@Component({
  selector: 'mono-repo-revealjs',
  templateUrl: './revealjs.component.html',
  styleUrls: ['./revealjs.component.css']
})
export class RevealjsComponent {
  editorVisible: boolean = false;
  content$ = this.store.select(selectEditorContent);

  constructor(private store: Store<RevealJsState>) { }

  toggleEditor(): void {
    this.editorVisible = !this.editorVisible;
  }
  updateContent(value: string): void {
    this.store.dispatch(AppActions.updateEditorContent({ content: value }));
  }
}
