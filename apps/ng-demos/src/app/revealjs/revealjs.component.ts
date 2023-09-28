import { Component, ViewChild, ViewEncapsulation} from '@angular/core';
import { Store } from '@ngrx/store';

import { RevealJsState } from './state/state';
import * as AppActions from './state/actions';
import { selectEditor } from './state/selector';
import { take, tap } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
@Component({
  selector: 'mono-repo-revealjs',
  templateUrl: './revealjs.component.html',
  //encapsulation: ViewEncapsulation.None,
  styleUrls: ['./revealjs.component.css']
})
export class RevealjsComponent {
  editorVisible: boolean = false;
  // first time only 
  editorInitState$ = this.store.select(selectEditor).pipe(take(1));
  editor$ = this.store.select(selectEditor);
  @ViewChild('editorSidenav') editorSidenav!: MatSidenav;

  constructor(private store: Store<RevealJsState>) { }

  toggleEditor(): void {
    this.editorVisible = !this.editorVisible;
  }
  
  closeSidenav() {
    this.editorSidenav.close();
  }

  
}
