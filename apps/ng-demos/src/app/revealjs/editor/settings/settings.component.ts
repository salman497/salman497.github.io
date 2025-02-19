import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { RevealJsState } from '../../state/state';
import * as actions from '../../state/actions';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
@Component({
  selector: 'mono-repo-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  themes = [
    'Black',
    'White',
    'League',
    'Sky',
    'Beige',
    'Simple',
    'Serif',
    'Blood',
    'Night',
    'Moon',
    'Solarized',
  ];
  animations = ['None', 'Fade', 'Slide', 'Convex', 'Concave', 'Zoom'];
  
  mermaidStyles = ['', 'dark', 'neutral', 'default', 'base'];

  @Input() theme!: string;
  @Input() animation!: string;
  @Input() mermaidStyle!: string;
  @Input() showPen!: boolean | null;
  @Input() showDrawingArea!: boolean | null;
  @Input() showSlides!: boolean | null;
  @Input() showAutoSlide!: boolean | null;
  
  constructor(
    private store: Store<RevealJsState>,
  ) {}
  
  updateMermaidStyle(mermaidStyleSelected: string): void {
    this.store.dispatch(actions.updateEditorMermaidStyle({ mermaidStyleSelected }));
    this.store.dispatch(actions.toggleViewerToReRender());
    this.store.dispatch(actions.saveToLocalStorage());
  }

  updateTheme(themeSelected: string): void {
    this.store.dispatch(actions.updateEditorTheme({ themeSelected }));
    this.store.dispatch(actions.toggleViewerToReRender());
    this.store.dispatch(actions.saveToLocalStorage());
  }

  updateAnimation(animationSelected: string): void {
    this.store.dispatch(
      actions.updateEditorAnimation({
        animationSelected,
      })
    );
    this.store.dispatch(actions.saveToLocalStorage());
  }

  updateShowPen(event: MatSlideToggleChange): void {
    this.store.dispatch(
      actions.updateEditorShowPen({ showPen: event.checked })
    );
    this.store.dispatch(actions.toggleViewerToReRender());
    this.store.dispatch(actions.saveToLocalStorage());
  }

  updateShowDrawingArea(event: MatSlideToggleChange): void {
    this.store.dispatch(
      actions.updateEditorShowDrawingArea({
        showDrawingArea: event.checked,
      })
    );
    this.store.dispatch(actions.toggleViewerToReRender());
    this.store.dispatch(actions.saveToLocalStorage());
  }

  updateShowSlides(event: MatSlideToggleChange): void {
    this.store.dispatch(
      actions.updateEditorShowSlides({ showSlides: event.checked })
    );
    this.store.dispatch(actions.toggleViewerToReRender());
    this.store.dispatch(actions.saveToLocalStorage());
  }

  updateShowAutoSlides(event: MatSlideToggleChange): void {
    this.store.dispatch(
      actions.updateEditorShowAutoSlides({ showAutoSlide: event.checked })
    );
    this.store.dispatch(actions.toggleViewerToReRender());
    this.store.dispatch(actions.saveToLocalStorage());
  }
}
