import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

import { EditorComponent } from './editor/editor.component';
import { RevealjsComponent } from './revealjs.component';
import { revealJsReducer } from './state/reducer';
import { ViewerComponent } from './viewer/viewer.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EffectsModule } from '@ngrx/effects';
import { RevealJsEffects } from './state/effects';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Import the MatProgressSpinnerModule
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [EditorComponent, ViewerComponent, RevealjsComponent, LoadingComponent],
  imports: [
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatIconModule,
    FormsModule,
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      revealJs: revealJsReducer
    }),
    MatProgressSpinnerModule,
    EffectsModule.forRoot([RevealJsEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
    HttpClientModule
  ],
  bootstrap: [RevealjsComponent],
  providers: [LoadingComponent]
})
export class RevealJsModule {}
