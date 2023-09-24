import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  //encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  editorVisible: boolean = false;
  content: string = '';

  toggleEditor(): void {
    this.editorVisible = !this.editorVisible;
  }

  updateContent(value: string): void {
    this.content = value;
  }
}
