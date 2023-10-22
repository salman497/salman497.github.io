import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Subject,
  takeUntil,
} from 'rxjs';
import { RevealJsState } from '../../state/state';
import * as actions from '../../state/actions';
import Editor from '@toast-ui/editor';
import { initEditor, scrollToHeading } from './tui-editor/editor.utils';
import { selectIsEditorVisible, selectSlideNumber } from '../../state/selector';

@Component({
  selector: 'mono-repo-markdown',
  templateUrl: './markdown.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./markdown.component.css'],
})
export class MarkDownComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    private store: Store<RevealJsState>,
    private elmRef: ElementRef,
    private zone: NgZone
  ) {}

  _markdown!: string;
  _original!: string;
  private content = new Subject<string>();
  private elm = this.elmRef.nativeElement;
  private editor!: Editor;
  private unsubscribe$ = new Subject<void>();
  editorLoaded$ = new BehaviorSubject<boolean>(false);
  isEditorVisible$ = this.store.select(selectIsEditorVisible);
  slideNumber$ = this.store.select(selectSlideNumber);

  @Input() set markdown(x: string) {
    if (x) {
      if (!this._original) {
        this._original = x;
      }
      if (this.editor && !this._markdown) {
        /**
         * the if is needed because on creation editor doesn't exist yet
         * this way it sets it via _markdown on init, and otherwise with the setMarkdown.
         */
        this.editor.setMarkdown(x);
      }

      this._markdown = x.trimStart();
    }
  }

  ngOnInit(): void {
    this.loadEditor();
  }

  ngOnDestroy(): void {
    if (this.content) {
      this.content.unsubscribe();
    }
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadEditor() {
    if (this.elm) {
      // this.elm.innerHTML = 'hello'
      this.zone.runOutsideAngular(() => {
        this.editor = initEditor(
          this.markdown,
          this.elm,
          () => {
            // on load
            this.editorLoaded$.next(true);
          },
          () => {
            // on change
            const markdownContent = this.editor.getMarkdown();
            this.content.next(markdownContent);
          }
        );
      });
    }
  }
  ngAfterViewInit() {
    this.registerOnContentChange();
    this.registerOnSlideChangeSetScrollPosition();
  }

  onTextareaChange(event: any): void {
    this.content.next(event?.target?.value);
  }

  registerOnContentChange() {
    this.content
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter((content) => !!content && content.trim() !== ''),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((content) => {
        this.store.dispatch(actions.updateEditorContent({ content }));
        this.store.dispatch(actions.toggleViewerToReRender());
        this.store.dispatch(actions.saveToLocalStorage());
      });
  }

  registerOnSlideChangeSetScrollPosition() {
    combineLatest([
      this.slideNumber$,
      this.isEditorVisible$,
      this.editorLoaded$,
    ])
      .pipe(
        filter(
          ([_, isEditorVisible, isEditorLoaded]) =>
            isEditorVisible === true && isEditorLoaded
        ),
        map(([slideNumber]) => slideNumber),
        distinctUntilChanged(),
        debounceTime(100),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((slideNumber) => {
        scrollToHeading(
          this.editor,
          this.elmRef.nativeElement,
          Number(slideNumber)
        );
      });
  }
}
