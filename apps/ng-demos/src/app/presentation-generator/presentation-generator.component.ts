import { Component } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'mono-repo-presentation-generator',
  templateUrl: './presentation-generator.component.html',
  styleUrls: ['./presentation-generator.component.css'],
})
export class PresentationGeneratorComponent {
  html: string | undefined;

  constructor(private appservice: AppService) {}

  generatePresentation(prompt: string): void {
    this.appservice.generatePresentation(prompt).subscribe(
      (html) => {
        this.html = html;
      },
      (error) => console.error(error)
    );
  }
}
