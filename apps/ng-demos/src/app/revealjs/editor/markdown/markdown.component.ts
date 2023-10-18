import { AfterViewInit, Component, ElementRef, Input, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, filter, Subject } from 'rxjs';
import { RevealJsState } from '../../state/state';
import * as actions from '../../state/actions';
import Editor from '@toast-ui/editor';
const styles = [
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/codemirror.min.css',
  'https://uicdn.toast.com/editor/latest/toastui-editor.min.css',
];

@Component({
  selector: 'mono-repo-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.css']
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

  @Input() set markdown(x: string) {
    if (x) {
      if(!this._original) {
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
              change: () => { 
                const markdownContent = this.editor.getMarkdown();
                this.content.next(markdownContent)
              },
            },
            // previewStyle: 'vertical',
            usageStatistics: false,
            initialEditType: 'wysiwyg', // Set to 'wysiwyg' for the WYSIWYG mode
            previewStyle: 'tab',
            initialValue: this.markdown,
            height: '600px'
          });
        });
      });
    }
  }
  ngAfterViewInit() { 
    this.content
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
    this.content.next(event?.target?.value);
  }
}
function loadCss(href: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
    if (links.find((e: any) => e.href === href) === undefined) {
      const lnk = document.createElement('link');
      const loaded = () => {
        lnk.removeEventListener('load', loaded);
        resolve();
      };
      lnk.addEventListener('load', loaded);
      lnk.rel = 'stylesheet';
      lnk.href = href;
      document.head.appendChild(lnk);
    } else {
      resolve();
    }
  });
}