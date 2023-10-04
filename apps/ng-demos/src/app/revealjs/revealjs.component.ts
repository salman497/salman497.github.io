import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { Store } from '@ngrx/store';

import { RevealJsState } from './state/state';
import * as AppActions from './state/actions';
import { selectEditor } from './state/selector';
import { take, tap } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private store: Store<RevealJsState>, 
              private auth: AuthService, 
              private route: ActivatedRoute) { }
  ngOnInit(): void {
    const params = this.route.snapshot.paramMap;
    const userType = params.get(Constant.URLParam.Type) as string;
    const mode = params.get(Constant.URLParam.Mode) as string;
    const id = params.get(Constant.URLParam.Id) as string;
    this.store.dispatch(AppActions.loadEditorState({ userType, mode, id }));
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
}
