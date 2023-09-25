import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { StartingTemplate } from '../utils/constant';

@Component({
  selector: 'mono-repo-editor',
  templateUrl: './editor.component.html',
  //encapsulation: ViewEncapsulation.None,
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {
  currentContent = StartingTemplate;
  isLinear = false;
  themeSelected = 'Black';
  themes = ['Black', 'White', 'League', 'Sky', 'Beige', 'Simple', 'Serif', 'Blood', 'Night', 'Moon', 'Solarized'];
  animationSelected= 'Slide';
  animations = ['None', 'Fade', 'Slide', 'Convex', 'Concave', 'Zoom'];
  showPen = true;
  showDrawingArea = true;
  showSlides = true;
  
  @Output() contentChange: EventEmitter<string> = new EventEmitter();

  updateContent(): void {
    this.contentChange.emit(this.currentContent);
  }
}
