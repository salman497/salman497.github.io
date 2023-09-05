import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

declare var Reveal: any;
declare var mermaid: any;
@Component({
  selector: 'mono-repo-mermaid-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mermaid-viewer.component.html',
  styleUrls: ['./mermaid-viewer.component.css'],
})
export class MermaidViewerComponent implements OnInit {
  
  public mermaidCode = ` graph TD;
  A-->B;
  A-->C;
  B-->D;
  C-->D;`;
  ngOnInit() {
    Reveal.initialize();
    mermaid.initialize({startOnLoad: true});
  }
}
