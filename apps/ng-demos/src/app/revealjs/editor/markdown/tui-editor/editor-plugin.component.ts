// dropdown.component.ts
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'editor-plugin',
  standalone: true,
  template: `
    <select (change)="onChange($event.target)">
      <option value="" disabled selected>Select markdown</option>
      <option value="**bold**">Bold</option>
      <option value="_italic_">Italic</option>
      <option value="## Heading 2">Heading 2</option>
    </select>
  `
})
export class EditorPluginComponent {
  @Output() markdownSelected = new EventEmitter<string>();

  onChange(target: any) {
    this.markdownSelected.emit(target.value);
  }
}
