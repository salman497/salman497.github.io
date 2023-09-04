import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mono-repo-mermaid-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mermaid-viewer.component.html',
  styleUrls: ['./mermaid-viewer.component.css'],
})
export class MermaidViewerComponent {}
