import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RevealJsModule } from './revealjs/revealjs.module';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';
import { environment } from './environment/environment';

@NgModule({
  declarations: [
    AppComponent,  
  ],
  imports: [
    BrowserModule,  // Import the BrowserModule to enable Angular's features for web applications
    RevealJsModule,
    NgxGoogleAnalyticsModule.forRoot(environment.googleAnalyticId),
    NgxGoogleAnalyticsRouterModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],  // List of services (none in this basic example)
  bootstrap: [AppComponent]  // Indicates the component that should be bootstrapped at application startup
})
export class AppModule { }
