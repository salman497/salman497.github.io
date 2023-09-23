import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewerComponent } from './viewer/viewer.component';
import { EditorComponent } from './editor/editor.component';

@Component({
  selector: 'mono-repo-revealjs',
  standalone: true,
  imports: [CommonModule, ViewerComponent, EditorComponent],
  templateUrl: './revealjs.component.html',
  styleUrls: ['./revealjs.component.css']
})
export class RevealjsComponent {
  editorVisible: boolean = false;
  content = `graph TD
  A[Enter Chart Definition] --> B(Preview)
  B --> C{decide}
  C --> D[Keep]
  C --> E[Edit Definition]
  E --> B
  D --> F[Save Image and Code]
  F --> B`;

  constructor() {}

  toggleEditor(): void {
    this.editorVisible = !this.editorVisible;
  }

  updateContent(value: string): void {
    if(value) {
      this.content = value;
    }
    
  }
}
