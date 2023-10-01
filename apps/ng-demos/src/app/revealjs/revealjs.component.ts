import { AfterViewInit, Component, ViewChild, ViewEncapsulation} from '@angular/core';
import { Store } from '@ngrx/store';

import { RevealJsState } from './state/state';
import * as AppActions from './state/actions';
import { selectEditor } from './state/selector';
import { take, tap } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../auth.service';
import { EditorComponent } from './editor/editor.component';


@Component({
  selector: 'mono-repo-revealjs',
  templateUrl: './revealjs.component.html',
  //encapsulation: ViewEncapsulation.None,
  styleUrls: ['./revealjs.component.css']
})
export class RevealjsComponent implements AfterViewInit {
  editorVisible: boolean = false;
  // first time only 
  isLoginModalVisible = false;
  editorInitState$ = this.store.select(selectEditor).pipe(take(1));
  editor$ = this.store.select(selectEditor);
  @ViewChild('editorSidenav') editorSidenav!: MatSidenav;

  constructor(private store: Store<RevealJsState>, private auth: AuthService, public editor: EditorComponent) { 

  }
  async ngAfterViewInit() {
    // do auth check
    await this.auth.init();
  }
  toggleEditor(): void {
    this.editorVisible = !this.editorVisible;
  }

 
  
  closeSidenav() {
    this.editorSidenav.close();
  }



  onOpenLogin() {
    this.editorVisible = false;
    this.isLoginModalVisible = true;
  }

  onCloseLogin() {
    this.editorVisible = false;
    this.isLoginModalVisible = false;
  }

  onLoging(): void {
    this.isLoginModalVisible = false;
    this.auth.signInWithGoogle();
  }

  onLoginm(): void {
    this.isLoginModalVisible = false;
    this.auth.signInWithMicrosoft();
  }

  onShowLogin() {
    this.editorVisible = false;
    this.isLoginModalVisible = true;
  }
}
