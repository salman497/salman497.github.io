import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, filter, Subject } from 'rxjs';
import { RevealJsState } from '../../state/state';
import * as actions from '../../state/actions';

@Component({
  selector: 'mono-repo-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.css']
})
export class MarkDownComponent implements OnDestroy, AfterViewInit {
  constructor(
    private store: Store<RevealJsState>,
  ) {}

  @Input() markdown!: string;
  private contentChangeSubject = new Subject<string>();

  ngOnDestroy(): void {
    if (this.contentChangeSubject) {
      this.contentChangeSubject.unsubscribe();
    }
  }
  ngAfterViewInit() { 
    this.contentChangeSubject
    .pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter((content) => !!content && content.trim() !== '')
    )
    .subscribe((content) => {
      this.store.dispatch(actions.updateEditorContent({ content }));
      this.store.dispatch(actions.toggleViewerToReRender());
      this.store.dispatch(actions.saveToLocalStorage());
    });
  }

  onTextareaChange(event: any): void {
    this.contentChangeSubject.next(event?.target?.value);
  }
}
