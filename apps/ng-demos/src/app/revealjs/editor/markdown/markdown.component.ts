import { switchMap, take } from 'rxjs/operators';
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
import { selectIsEditorVisible, selectMarkdown, selectSlideNumber } from '../../state/selector';

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

  currentMarkDown = '';
  private content = new Subject<string>();
  private elm = this.elmRef.nativeElement;
  private editor!: Editor;
  private unsubscribe$ = new Subject<void>();
  editorLoaded$ = new BehaviorSubject<boolean>(false);
  isEditorVisible$ = this.store.select(selectIsEditorVisible);
  slideNumber$ = this.store.select(selectSlideNumber);
  markdown$ = this.store.select(selectMarkdown);
  
  

  ngOnInit(): void {
   this.markdown$.pipe(take(1)).subscribe(markdown => {
    if(markdown !== null) {
      this.currentMarkDown = markdown;
      this.initEditor(markdown);
    }
  
   })
  }

  ngOnDestroy(): void {
    if (this.content) {
      this.content.unsubscribe();
    }
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initEditor(markdown: string) {
    if (!this.editor) {
      // this.elm.innerHTML = 'hello'
      this.zone.runOutsideAngular(() => {
        this.editor = initEditor(
          markdown,
          this.elm,
          () => {
            this.editorLoaded$.next(true); // on load
          },
          () => {
            const markdownContent = this.editor.getMarkdown(); // on change
            this.content.next(markdownContent);
          }
        );
      });
    }
  }
  ngAfterViewInit() {
    this.registerOutsideMarkdownChange();
    this.registerOnContentChange();
    this.registerOnSlideChangeSetScrollPosition();
  }

  onTextareaChange(event: any): void {
    this.content.next(event?.target?.value);
  }
  registerOutsideMarkdownChange() {
    this.editorLoaded$.pipe(
      filter(loaded => loaded),
      switchMap(() => this.markdown$),
      filter(markdown => this.currentMarkDown !== markdown),
      distinctUntilChanged(),
      takeUntil(this.unsubscribe$) 
    ).subscribe((markdown) => { 
      if(markdown != null) {
        this.currentMarkDown = markdown;
        this.editor.setMarkdown(markdown);
      }
    })
  }
  registerOnContentChange() {
    this.content
      .pipe(
        filter(markdown => this.currentMarkDown !== markdown),
        debounceTime(500),
        distinctUntilChanged(),
        // filter((content) => !!content && content.trim() !== ''),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((content) => {
        this.currentMarkDown = content;
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
