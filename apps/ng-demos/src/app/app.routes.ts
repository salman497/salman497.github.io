import { RevealjsComponent } from './revealjs/revealjs.component';
import { MermaidViewerComponent } from './mermaid-viewer/mermaid-viewer.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { Route } from '@angular/router';
import { ViewerComponent } from './revealjs/viewer/viewer.component';
import { EditorComponent } from './revealjs/editor/editor.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

export const appRoutes: Route[] = [
    { path: '', component: RevealjsComponent },
    { path: 'mermaid', component: MermaidViewerComponent },
    { path: 'viewer', component: ViewerComponent },
    { path: 'editor', component: EditorComponent },
    { path: 'nav', component: NavMenuComponent },
    { path: 'login', component: LoginComponent }
];
