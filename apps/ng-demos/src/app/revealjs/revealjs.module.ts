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
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EditorComponent, ViewerComponent, RevealjsComponent],
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
    MatTooltipModule,
    MatSnackBarModule,
    ClipboardModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    StoreModule.forRoot({
      revealJs: revealJsReducer
    }),
    EffectsModule.forRoot([RevealJsEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
  ],
  bootstrap: [RevealjsComponent],
})
export class RevealJsModule {}
