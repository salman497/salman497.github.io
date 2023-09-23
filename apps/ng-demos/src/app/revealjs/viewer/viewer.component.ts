import {
  Component,
  AfterViewInit,
  OnInit,
  ChangeDetectorRef,
  Input,
  OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import Reveal from 'reveal.js';
import { getRevealConfig } from '../utils/reveal-js-config';
declare var $: any;
@Component({
  selector: 'mono-repo-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css'],
})
export class ViewerComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() content: string = '';

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
   
  }

  async ngOnChanges() {
    console.log('>>>>>', this.content);
  }
  async ngAfterViewInit() {
    try {
      
      const config = await getRevealConfig();
      let deck = new Reveal($('#revealDiv'));
      deck.initialize(config);
      this.cd.detectChanges(); // Trigger change detection manually if needed
    } catch (error) {
      console.error('Error ngAfterViewInit data:', error);
    }
  }

  
}
