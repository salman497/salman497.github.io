import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { RouterModule } from '@angular/router';
import { EditorPluginComponent } from './revealjs/editor/markdown/tui-editor/editor-plugin.component';


@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  //encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  editorVisible: boolean = false;
  content: string = '';
  constructor(injector: Injector) {
    const editorPluginElement = createCustomElement(EditorPluginComponent, { injector });
    customElements.define('editor-plugin', editorPluginElement);
  }

  toggleEditor(): void {
    this.editorVisible = !this.editorVisible;
  }

  updateContent(value: string): void {
    this.content = value;
  }
}
