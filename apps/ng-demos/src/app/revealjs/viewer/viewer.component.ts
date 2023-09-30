import {
  Component,
  AfterViewInit,
  OnInit,
  ChangeDetectorRef,
  Input,
  OnChanges,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import Reveal from 'reveal.js';
import { getRevealConfig } from '../utils/reveal-js-config';
import { Editor } from '../state/state';
declare var $: any;
declare global {
  interface Window { globalRevealJs: any; }
}
@Component({
  selector: 'mono-repo-viewer',
  templateUrl: './viewer.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./viewer.component.css'],
})
export class ViewerComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() editor!: Editor;
  deck: Reveal.Api | undefined;
  
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
   
  }
  ngOnDestroy() {
    if(this.deck) {
      this.deck.destroy();
      window.globalRevealJs = undefined;
    }
    setTimeout(() => {
      const linkEl = document.getElementById(this.editor.themeSelected.toLowerCase());
      if (linkEl) {
        linkEl?.parentNode?.removeChild(linkEl);
      }
    }, 2000);
   
  }
   ngOnChanges() {
    console.log('>>>>>', this.editor);
    this.deck?.configure({ transition: this.editor.animationSelected.toLowerCase() as any });
    // this.deck?.configure({ theme: this.editor.animationSelected.toLowerCase() as any });
    // if(this.deck) {
    //   this.deck.sync();
    //   this.deck.initialize();
    //   this.cd.detectChanges(); 
    // }
  }
  async ngAfterViewInit() {
    try {
      this.changeTheme(this.editor.themeSelected.toLowerCase());
      const config = await getRevealConfig(this.editor);
      if(!this.deck) {
        this.deck = new Reveal($('#revealDiv'));
        window.globalRevealJs = this.deck;
        this.deck.initialize(config);
        this.deck.on('slidechanged', event => {
          console.log('-------REVEALJS-SLIDECHANGE-------', event);
          // event.previousSlide, event.currentSlide, event.indexh, event.indexv
        } );
      }

    } catch (error) {
      console.error('Error ngAfterViewInit data:', error);
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
