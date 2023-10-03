import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { Store } from '@ngrx/store';

import { RevealJsState } from './state/state';
import * as AppActions from './state/actions';
import { selectEditor } from './state/selector';
import { take, tap } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../auth.service';
import { Constant } from './utils/constants';
@Component({
  selector: 'mono-repo-revealjs',
  templateUrl: './revealjs.component.html',
  //encapsulation: ViewEncapsulation.None,
  styleUrls: ['./revealjs.component.css']
})
export class RevealjsComponent implements OnInit, AfterViewInit {
  editorVisible: boolean = false;
  // first time only 
  editorInitState$ = this.store.select(selectEditor).pipe(take(1));
  editor$ = this.store.select(selectEditor);
  @ViewChild('editorSidenav') editorSidenav!: MatSidenav;

  constructor(private store: Store<RevealJsState>, private auth: AuthService) { }
  ngOnInit(): void {
      this.loadState(Constant.StartupTemplateIdentifier, false);
  }
  async ngAfterViewInit() {
    // do auth check
    await this.auth.init();
  }
  toggleEditor(): void {
    this.editorVisible = !this.editorVisible;
  }

 
 loadState(identifier: string, isLoggedIn: boolean): void {
      this.store.dispatch(AppActions.loadEditorState({ identifier, isLoggedIn }));
  }


  closeSidenav() {
    this.editorSidenav.close();
  }

  
}
