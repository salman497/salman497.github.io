import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EditorComponent } from './editor/editor.component';
import { RevealjsComponent } from './revealjs.component';
import { revealJsReducer } from './state/reducer';
import { ViewerComponent } from './viewer/viewer.component';

@NgModule({
  declarations: [
    EditorComponent,
    ViewerComponent,
    RevealjsComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    StoreModule.forRoot({ revealJs: revealJsReducer })
  ],
  bootstrap: [RevealjsComponent]
})
export class RevealJsModule { }