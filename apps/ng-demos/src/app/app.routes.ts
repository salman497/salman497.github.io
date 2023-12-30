import { RevealjsComponent } from './revealjs/revealjs.component';
import { MermaidViewerComponent } from './mermaid-viewer/mermaid-viewer.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { Route } from '@angular/router';
import { ViewerComponent } from './revealjs/viewer/viewer.component';
import { EditorComponent } from './revealjs/editor/editor.component';
import { Constant } from './revealjs/utils/constants';
import { ContactusComponent } from './contactus/contactus.component';

export const appRoutes: Route[] = [
    { path: '', component: RevealjsComponent },
    { path: 'mermaid', component: MermaidViewerComponent },
    { path: 'viewer', component: ViewerComponent },
    { path: 'editor', component: EditorComponent },
    { path: 'nav', component: NavMenuComponent },
    {
        path: 'contactus', 
          loadComponent: () => import('./contactus/contactus.component').then(c => c.ContactusComponent)
        },
    { path: Constant.UrlRoute.Startup, component: RevealjsComponent },
    { path: Constant.UrlRoute.Local, component: RevealjsComponent },
    { path: Constant.UrlRoute.Published, component: RevealjsComponent },
   
    // { path: ':slideNumber', component: RevealjsComponent },
    // { path: ':slideNumber/:subSlideNumber', component: RevealjsComponent },
    // { path: ':identifier/:slideNumber/:subSlideNumber', component: RevealjsComponent },
];
