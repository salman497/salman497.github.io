import { Constant } from './../utils/constants';
import {
  changeLoadingState,
  setURLSlideNumber,
  toggleViewerToReRender,
  updateEditorShowAutoSlides,
} from './../state/actions';
import {
  Component,
  AfterViewInit,
  OnInit,
  ChangeDetectorRef,
  Input,
  OnChanges,
  OnDestroy,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  EventEmitter,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import Reveal from 'reveal.js';
import { getRevealConfig } from '../utils/reveal-js-config';
import { Editor, RevealJsState } from '../state/state';
import { ActivatedRoute, Router } from '@angular/router';
import { toggleFullScreen, updateWindowHash } from '../utils/basic-utils';
import { Store } from '@ngrx/store';
declare var $: any;
declare global {
  interface Window {
    invokeFromOutsideOfAngular: any;
    RevealChalkboard: {
      toggleChalkboard: () => {};
      toggleNotesCanvas: () => {};
      setDrawingTool: (name: 'pen' | 'rectangle' | 'square') => {};
    };
  }
}
@Component({
  selector: 'mono-repo-viewer',
  templateUrl: './viewer.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./viewer.component.css'],
})
export class ViewerComponent
  implements OnInit, AfterViewInit, OnChanges, OnDestroy
{
  @Input() editor!: Editor;
  @Input() isEditMode!: boolean | null;
  @Input() isEditorVisible!: boolean;
  @Output() changeEditorView = new EventEmitter<boolean>();
  deck: Reveal.Api | undefined;

  constructor(
    private store: Store<RevealJsState>,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit() {
    window.invokeFromOutsideOfAngular = function (action: string) {
      const customEvent = new CustomEvent('customControlEvent', {
        detail: action,
      });
      document.querySelector('mono-repo-viewer')?.dispatchEvent(customEvent);
    };

    this.renderer.listen(
      this.el.nativeElement,
      'customControlEvent',
      (event) => {
        // Access component properties and invoke functions here
        this.handEventsFromOutsideOfAngular(event.detail);
      }
    );
  }
  ngOnDestroy() {
    if (this.deck) {
      // this.deck.removeEventListeners();
      this.deck.destroy();
      window.invokeFromOutsideOfAngular = undefined;
    }
    setTimeout(() => {
      const linkEl = document.getElementById(
        this.editor.themeSelected.toLowerCase()
      );
      if (linkEl) {
        linkEl?.parentNode?.removeChild(linkEl);
      }
    }, 2000);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['editor']) {
      const previous = changes['editor'].previousValue || {};
      if (previous.animationSelected !== this.editor.animationSelected) {
        this.deck?.configure({
          transition: this.editor.animationSelected.toLowerCase() as any,
        });
      }

      // if (previous.showAutoSlide !== this.editor.showAutoSlide) {
      //   this.deck?.configure({
      //     autoSlide: this.editor.showAutoSlide ? 2000 : 0,
      //   });
      // }
    }
  }
  async ngAfterViewInit() {
    try {
      this.changeTheme(this.editor.themeSelected.toLowerCase());
      const config = await getRevealConfig(
        this.editor,
        this.isEditMode === null ? false : this.isEditMode
      );
      if (!this.deck) {
        this.deck = new Reveal($('#revealDiv'));
        this.deck.initialize(config);
        this.deck.on('slidechanged', (event: any) => {
          updateWindowHash(event);
          this.store.dispatch(
            setURLSlideNumber({
              slideNumber: event.indexh,
              slideNumberVertical: event.indexv,
            })
          );
        });
        this.deck.on('ready', () => {
          // adjust layout for any dynamic change
          setTimeout(() => {
            this.deck?.layout();
            this.store.dispatch(changeLoadingState({ loading: false }));
          }, 100);
        });
        this.deck.addEventListener('openMenu', () => {
          this.changeEditorView.emit(true);
        });
        this.deck.addEventListener('stopAutoSlide', () => {
          setTimeout(() => {
            this.store.dispatch(
              updateEditorShowAutoSlides({ showAutoSlide: false })
            );
          }, 1000);
          this.deck?.toggleAutoSlide(false);
        });
        // define custom event

        // window.customControlEvent = (eventName: string) => {
        //   console.log('---------------customControlEvent------------------', eventName);
        // }
      }
    } catch (error) {
      console.error('Error ngAfterViewInit data:', error);
    }
  }

  handEventsFromOutsideOfAngular(action: string) {
    console.log('---->>>>>Action From Outside of angular', action);
    if (action === Constant.OutsideAngularEvents.Toggle) {
      this.deck?.toggleOverview();
    }

    if (action === Constant.OutsideAngularEvents.FullScreen) {
      toggleFullScreen();
    }


    if (action === Constant.OutsideAngularEvents.Menu) {
      this.changeEditorView.emit(!this.isEditorVisible);
    }

    if (action === Constant.OutsideAngularEvents.ChalkboardToggle) {
      if (this.isEditorVisible) {
        // hide editor for correct draw area
        this.changeEditorView.emit(false);
      }

      window.RevealChalkboard.toggleChalkboard();
    }

    if (action === Constant.OutsideAngularEvents.ChalkboardCanvas) {
      if (this.isEditorVisible) {
        // hide editor for correct draw area
        this.changeEditorView.emit(false);
      }
      window.RevealChalkboard.toggleNotesCanvas();
      window.RevealChalkboard.setDrawingTool('rectangle');

     // window.RevealChalkboard.toggleNotesCanvas();
    }

    if(action === Constant.OutsideAngularEvents.Refresh) {
      this.store.dispatch(toggleViewerToReRender());
    }
  }

  changeTheme(themeName: string): void {
    const linkEl = document.createElement('link');
    linkEl.id = themeName;
    linkEl.rel = 'stylesheet';
    linkEl.href = `/reveal-theme/${themeName}.css`;
    document.getElementsByTagName('head')[0].appendChild(linkEl);
  }
}
