import { MermaidViewerComponent } from './mermaid-viewer/mermaid-viewer.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    { path: '', component: NavMenuComponent },
    { path: 'mermaid', component: MermaidViewerComponent }
];
