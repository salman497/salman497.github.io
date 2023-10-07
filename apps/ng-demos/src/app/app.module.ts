import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RevealJsModule } from './revealjs/revealjs.module';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { PresentationGeneratorComponent } from './presentation-generator/presentation-generator.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PresentationGeneratorComponent  // Declare the root AppComponent
  ],
  imports: [
    RevealJsModule,
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],  // List of services (none in this basic example)
  bootstrap: [AppComponent]  // Indicates the component that should be bootstrapped at application startup
})
export class AppModule { }
