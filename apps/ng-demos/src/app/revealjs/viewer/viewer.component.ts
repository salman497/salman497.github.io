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
declare var $: any;
@Component({
  selector: 'mono-repo-viewer',
  templateUrl: './viewer.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./viewer.component.css'],
})
export class ViewerComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() content: string | null = '';
  deck: Reveal.Api | undefined;
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
   
  }
  ngOnDestroy() {
    if(this.deck) {
      this.deck.destroy();
    }
  }
   ngOnChanges() {
    console.log('>>>>>', this.content);
    // if(this.deck) {
    //   this.deck.sync();
    //   this.deck.initialize();
    //   this.cd.detectChanges(); 
    // }
  }
  async ngAfterViewInit() {
    try {
      
      const config = await getRevealConfig();
      if(!this.deck) {
        this.deck = new Reveal($('#revealDiv'));
        this.deck.initialize(config);
      }

    } catch (error) {
      console.error('Error ngAfterViewInit data:', error);
    }
  }

  
}
