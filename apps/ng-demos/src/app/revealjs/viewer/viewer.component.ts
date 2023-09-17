
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Reveal from 'reveal.js';
// @ts-ignore 
import Markdown from "reveal.js/plugin/markdown/markdown.esm.js";
// @ts-ignore 
import RevealMermaidPlugin from "reveal.js-mermaid-plugin";
// @ts-ignore 
import RevealHighlight from "reveal.js/plugin/highlight/highlight.esm.js";
// @ts-ignore 
import RevealNotes from "reveal.js/plugin/notes/notes.esm.js";
// @ts-ignore 
import RevealSvgTimelineFragment from "reveal.js-svg-timeline-fragment";
// @ts-ignore 
import RevealAnimateFragments from "reveal.js-animate-fragments";
// @ts-ignore 
import RevealScriptFragment from "reveal.js-script-fragment";



export const plugins = [
  Markdown,
  RevealMermaidPlugin,
  RevealSvgTimelineFragment,
  RevealNotes,
  RevealScriptFragment,
  RevealAnimateFragments,
  RevealHighlight,
];
declare var $: any;
@Component({
  selector: 'mono-repo-viewer', 
  standalone: true,
  imports: [CommonModule],
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})

export class ViewerComponent  implements OnInit, AfterViewInit {
  
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
        plugins,
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
