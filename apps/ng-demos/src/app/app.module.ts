import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RevealJsModule } from './revealjs/revealjs.module';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent  // Declare the root AppComponent
  ],
  imports: [
    BrowserModule,  // Import the BrowserModule to enable Angular's features for web applications
    RevealJsModule,
    RouterModule.forRoot(appRoutes, { useHash: true})
  ],
  providers: [],  // List of services (none in this basic example)
  bootstrap: [AppComponent]  // Indicates the component that should be bootstrapped at application startup
})
export class AppModule { }
