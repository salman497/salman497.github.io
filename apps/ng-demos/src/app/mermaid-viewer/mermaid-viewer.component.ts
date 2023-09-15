import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Reveal from 'reveal.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
declare var $: any;
@Component({
  selector: 'mono-repo-mermaid-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mermaid-viewer.component.html',
  styleUrls: ['./mermaid-viewer.component.css'],
})
export class MermaidViewerComponent implements OnInit, AfterViewInit {
  //constructor(private cd: ChangeDetectorRef) {}
  public mermaidCode = ` graph TD;
  A-->B;
  A-->C;
  B-->D;
  C-->D;`;
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

  ngAfterViewInit() {
    let deck = new Reveal($('#revealDiv'));
    deck.initialize({
        plugins: [Markdown],
        // hash: true,
        embedded: true,
        minScale: 1.0,
        controls: true,
        controlsTutorial: true,
        keyboardCondition: 'focused',
    });
    // deck.configure({
    //     keyboard: {
    //         27: () => {
    //             $('presentModal').hide();
    //         }, // do Nothing when ESC is pressed
    //     },
    // });
}
}
