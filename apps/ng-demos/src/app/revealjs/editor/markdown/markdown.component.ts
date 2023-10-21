import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  delay,
  distinctUntilChanged,
  filter,
  first,
  map,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { RevealJsState } from '../../state/state';
import * as actions from '../../state/actions';
import Editor from '@toast-ui/editor';
import { loadCss, scrollToHeading } from './tui-editor/tui-editor.utils';
import customAddCodePlugin from './tui-editor/tui-editor-first.plugin';
import { selectIsEditorVisible, selectSlideNumber } from '../../state/selector';
const styles = [
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/codemirror.min.css',
  'https://uicdn.toast.com/editor/latest/toastui-editor.min.css',
];

@Component({
  selector: 'mono-repo-markdown',
  templateUrl: './markdown.component.html',
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
      Promise.all(styles.map(loadCss)).then(() => {
        this.zone.runOutsideAngular(() => {
          const el = document.createElement('div');
          this.elm.appendChild(el);
          this.editor = new Editor({
            el,
            events: {
              load: () => {
                this.editorLoaded$.next(true);
              },
              change: () => {
                const markdownContent = this.editor.getMarkdown();
                this.content.next(markdownContent);
              },
            },
            // previewStyle: 'vertical',
            usageStatistics: false,
            initialEditType: 'wysiwyg', // Set to 'wysiwyg' for the WYSIWYG mode
            previewStyle: 'tab',
            initialValue: this.markdown,
            height: '600px',
            // plugins: [customAddCodePlugin],
            toolbarItems: [
              ['code', 'codeblock'],
              // [{
              //   el: this.createDropdown(), //
              //   command: 'bold',
              //   tooltip: 'Custom Bold',
              //   name: 'bold'
              // }
              // ],
              ['hr', 'quote'],
              ['heading', 'bold', 'italic', 'strike'],
              ['ul', 'ol', 'task', 'indent', 'outdent'],
              ['table', 'image', 'link'],
            ],
          });
          // addCustomCommand(this.editor);
        });
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
