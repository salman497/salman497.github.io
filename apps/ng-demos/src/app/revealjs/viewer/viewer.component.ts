import {
  Component,
  AfterViewInit,
  OnInit,
  ChangeDetectorRef,
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
  constructor(private cd: ChangeDetectorRef) {}
  public mermaidCode = `graph TD
  A[Enter Chart Definition] --> B(Preview)
  B --> C{decide}
  C --> D[Keep]
  C --> E[Edit Definition]
  E --> B
  D --> F[Save Image and Code]
  F --> B`;
  ngOnInit() {
    //   let deck = new Reveal({
    //     plugins: [ Markdown ]
    //  })
    //  deck.initialize();
    // Reveal.initialize().then(() => {
    //   mermaid.initialize({startOnLoad: true});
    //   this.cd.detectChanges();
    // });
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
