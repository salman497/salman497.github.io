import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartingTemplate } from '../utils/constant';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'mono-repo-editor',
  templateUrl: './editor.component.html',
  //encapsulation: ViewEncapsulation.None,
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {
  currentContent = StartingTemplate;
  
  @Output() contentChange: EventEmitter<string> = new EventEmitter();

  updateContent(): void {
    this.contentChange.emit(this.currentContent);
  }
}
