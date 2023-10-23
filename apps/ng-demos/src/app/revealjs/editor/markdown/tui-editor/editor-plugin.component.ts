// dropdown.component.ts
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'editor-plugin',
  imports: [MatMenuModule],
  standalone: true,
  templateUrl: './editor-plugin.component.html',
  styleUrls: ['./editor-plugin.component.css']
})
export class EditorPluginComponent implements OnInit {
  @Output() markdownSelected = new EventEmitter<string>();
    
  ngOnInit(): void {
   
  }
  onChange(target: any) {
    this.markdownSelected.emit(target.value);
  }
}
