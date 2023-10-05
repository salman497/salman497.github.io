import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RevealJsModule } from './revealjs/revealjs.module';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,  // Import the BrowserModule to enable Angular's features for web applications
    RevealJsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatProgressSpinnerModule
  ],
  providers: [],  // List of services (none in this basic example)
  bootstrap: [AppComponent]  // Indicates the component that should be bootstrapped at application startup
})
export class AppModule { }
