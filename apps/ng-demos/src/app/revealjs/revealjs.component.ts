import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { Store } from '@ngrx/store';

import { RevealJsState } from './state/state';
import * as AppActions from './state/actions';
import { selectEditor, selectIsEditMode, selectIsLoading, selectName, selectUrlEdit, selectUrlView } from './state/selector';
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
  isLoading$ = this.store.select(selectIsLoading);
  editor$ = this.store.select(selectEditor).pipe(tap(() => console.log('------------>> editor Changed')));
  isEditMode$ = this.store.select(selectIsEditMode);
  name$ = this.store.select(selectName);
  viewUrl$ = this.store.select(selectUrlView);
  editUrl$ = this.store.select(selectUrlEdit);
  @ViewChild('editorSidenav') editorSidenav!: MatSidenav;

  constructor(private store: Store<RevealJsState>, 
              private auth: AuthService, 
              private route: ActivatedRoute) { }
  ngOnInit(): void {
    const params = this.route.snapshot.paramMap;
    const loadType = params.get(Constant.UrlPart.Type) as string;
    const mode = params.get(Constant.UrlPart.Mode) as string;
    const id = params.get(Constant.UrlPart.Id) as string;
    const name = params.get(Constant.UrlPart.Name) as string;
    this.store.dispatch(AppActions.updateURLInfo({ loadType, mode, id, name }));
    this.store.dispatch(AppActions.loadEditorState({ loadType, mode, id }));
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
