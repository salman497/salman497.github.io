import { MermaidViewerComponent } from './mermaid-viewer/mermaid-viewer.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { Route } from '@angular/router';
import { ViewerComponent } from './revealjs/viewer/viewer.component';

export const appRoutes: Route[] = [
    { path: '', component: NavMenuComponent },
    { path: 'mermaid', component: MermaidViewerComponent },
    { path: 'viewer', component: ViewerComponent }
];
