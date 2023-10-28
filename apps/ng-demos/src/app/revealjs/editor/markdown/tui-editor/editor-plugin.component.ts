// dropdown.component.ts
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { exampleData } from './examples/example';

@Component({
  selector: 'editor-plugin',
  imports: [MatMenuModule],
  standalone: true,
  templateUrl: './editor-plugin.component.html',
  styleUrls: ['./editor-plugin.component.css']
})
export class EditorPluginComponent implements OnInit {
  @Output() markdownSelected = new EventEmitter<{markdown: string, html: string}>();
    
  ngOnInit(): void {
   
  }
  onChange(target: any) {
    this.markdownSelected.emit(target.value);
  }


  onClick(key: string) {
    if(exampleData[key]) {
      this.markdownSelected.emit(exampleData[key]);
    }
  }

  openInNewTab(url: string) {
    window.open(url, '_blank');
  }
}
