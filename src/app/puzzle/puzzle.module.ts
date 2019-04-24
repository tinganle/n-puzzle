import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuzzleComponent } from './puzzle.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ PuzzleComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [ PuzzleComponent]
})
export class PuzzleModule { }
