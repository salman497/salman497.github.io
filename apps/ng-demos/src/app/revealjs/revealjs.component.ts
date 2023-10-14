import { Component, OnInit, ViewChild} from '@angular/core';
import { Store } from '@ngrx/store';

import { RevealJsState } from './state/state';
import * as actions from './state/actions';
import { selectEditor, selectIsEditMode, selectIsLoading, selectName, selectUrlEdit, selectUrlView } from './state/selector';
import { tap } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { Constant } from './utils/constants';
@Component({
  selector: 'mono-repo-revealjs',
  templateUrl: './revealjs.component.html',
  styleUrls: ['./revealjs.component.css']
})
export class RevealjsComponent implements OnInit {
  editorVisible = false as boolean;
  editor$ = this.store.select(selectEditor);
  isLoading$ = this.store.select(selectIsLoading);
  isEditMode$ = this.store.select(selectIsEditMode);
  @ViewChild('editorSidenav') editorSidenav!: MatSidenav;

  constructor(private store: Store<RevealJsState>,
              private route: ActivatedRoute) { }
  ngOnInit(): void {
    console.log('----------ngOnInit.RevealjsComponent-------------');
    const params = this.route.snapshot.paramMap;
    const loadType = params.get(Constant.UrlPart.Type) as string;
    const mode = params.get(Constant.UrlPart.Mode) as string;
    const id = params.get(Constant.UrlPart.Id) as string;
    const name = params.get(Constant.UrlPart.Name) as string;
    this.store.dispatch(actions.setURLInfo({ loadType, mode, id, name }));
    this.store.dispatch(actions.loadLoginUserInfo());
  }

  toggleEditor(): void {
    this.editorVisible = !this.editorVisible;
  }

  closeSidenav() {
    this.editorSidenav.close();
  }
}
