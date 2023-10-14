import { changeLoadingState } from './../state/actions';
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
} from '@angular/core';
import { CommonModule } from '@angular/common';
import Reveal from 'reveal.js';
import { getRevealConfig } from '../utils/reveal-js-config';
import { Editor, RevealJsState } from '../state/state';
import { ActivatedRoute, Router } from '@angular/router';
import { updateWindowHash } from '../utils/basic-utils';
import { Store } from '@ngrx/store';
declare var $: any;
declare global {
  interface Window {
    invokeFromOutsideOfAngular: any;
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
  @Output() onMenuClick = new EventEmitter<void>();
  deck: Reveal.Api | undefined;

  constructor(private store: Store<RevealJsState>, 
              private renderer: Renderer2, 
              private el: ElementRef) {
                
              }

  ngOnInit() {
    window.invokeFromOutsideOfAngular = function(action: string) {
      const customEvent = new CustomEvent('customControlEvent', { detail: action });
      document.querySelector('mono-repo-viewer')?.dispatchEvent(customEvent);
    }
    

    this.renderer.listen(this.el.nativeElement, 'customControlEvent', (event) => {
      // Access component properties and invoke functions here
      this.handEventsFromOutsideOfAngular(event.detail);
    });
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
  ngOnChanges() {
    console.log('>>>>>', this.editor);
    this.deck?.configure({
      transition: this.editor.animationSelected.toLowerCase() as any,
    });
  }
  async ngAfterViewInit() {
    try {
      this.changeTheme(this.editor.themeSelected.toLowerCase());
      const config = await getRevealConfig(this.editor, this.isEditMode === null ? false: this.isEditMode);
      if (!this.deck) {
        this.deck = new Reveal($('#revealDiv'));
        this.deck.initialize(config);
        this.deck.on('slidechanged', (event: any) => {
           updateWindowHash(event);
        });
        this.deck.on('ready', () => {
          // hide loading when reveal js presentation is ready
          this.store.dispatch(changeLoadingState({ loading: false }));
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
    if(action === 'toggle') {
      this.deck?.toggleOverview();
    }

    if(action === 'menu') {
      this.onMenuClick.emit();
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
