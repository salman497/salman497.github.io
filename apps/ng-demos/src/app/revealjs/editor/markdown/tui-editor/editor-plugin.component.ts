// dropdown.component.ts
import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'editor-plugin',
  standalone: true,
  templateUrl: './editor-plugin.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./editor-plugin.component.css']
})
export class EditorPluginComponent {
  @Output() markdownSelected = new EventEmitter<string>();

  onChange(target: any) {
    this.markdownSelected.emit(target.value);
  }
}
