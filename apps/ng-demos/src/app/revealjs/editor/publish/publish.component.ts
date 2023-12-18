import { MarkdownDB } from './../../models/db.model';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { RevealJsState } from '../../state/state';
import * as actions from './../../state/actions';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Constant } from '../../utils/constants';
import { AuthService } from '../../../auth.service';
import { buildURL } from '../../utils/basic-utils';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
  selector: 'mono-repo-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent {
  @Input() name!: string;
  @Input() viewUrl!: string;
  @Input() editUrl!: string;
  @Input() allowEdit!: boolean;
  @Input() isUserLogin!: boolean;
  @Input() loginText!: string;
  @Input() presentations!: MarkdownDB[];
  @Input() selectedPresentationId!: number | null; 

  constructor(
    private store: Store<RevealJsState>,
    private clipboard: Clipboard,
    private snackBar: MatSnackBar,
    private auth: AuthService,
    private gaService: GoogleAnalyticsService
  ) {}

  onPresentationNameChange(event: any) {
    const name = event.target.value;
    this.store.dispatch(actions.updateNameOnly({ name }));
  }

  onPublish() {
    const urlName = this.name.replace(/\s+/g, '-').toLowerCase();
    this.store.dispatch(actions.updateURLNameOnly({ name: urlName }));
    this.store.dispatch(actions.saveToStorage());
    this.gaService.event('publish_presentation', 'edit');

  }

  copyToClipboard(url: string) {
    this.clipboard.copy(url);
    this.snackBar.open('URL copied to clipboard!', 'Close', {
      duration: 2000,
    });
  }

  openInNewTab(url: string) {
    window.open(url, '_blank');
  }

  onAllowEditChange(event: MatSlideToggleChange) {
    this.store.dispatch(actions.setAllowEdit({ allowEdit: event.checked }));
  }

  onPresentationSelected(id: number) {
    window.location.href = buildURL({
      loadType: Constant.UrlLoadType.Published,
      mode: Constant.UrlMode.Edit,
      id: String(id),
      name: this.presentations.find(p => p.id === id)?.url_name,
    });
    // this.store.dispatch(
    //   actions.setURLInfo({
    //     loadType: Constant.UrlLoadType.Published,
    //     mode: Constant.UrlMode.Edit,
    //     id: String(id),
    //     name: this.presentations.find(p => p.id === id)?.url_name,
    //   })
    // );
   
    // this.store.dispatch(actions.loadLoginUserEditor());
  }

  async onDeleteButtonClick() {
    if (this.selectedPresentationId) {
      await this.auth.deleteMarkdown(this.selectedPresentationId);
      window.location.href = window.location.origin;
    }
  }

}
