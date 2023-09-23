import {
  Component,
  AfterViewInit,
  OnInit,
  ChangeDetectorRef,
  Input,
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
export class ViewerComponent implements OnInit, AfterViewInit {
  @Input() content: string = '';
  public mermaidCode = `graph TD
  A[Enter Chart Definition] --> B(Preview)
  B --> C{decide}
  C --> D[Keep]
  C --> E[Edit Definition]
  E --> B
  D --> F[Save Image and Code]
  F --> B`;
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
   
  }

  async ngAfterViewInit() {
    try {
      console.log('>>>>>', this.content);
      const config = await getRevealConfig();
      let deck = new Reveal($('#revealDiv'));
      deck.initialize(config);
      this.cd.detectChanges(); // Trigger change detection manually if needed
    } catch (error) {
      console.error('Error ngAfterViewInit data:', error);
    }
  }

  
}
