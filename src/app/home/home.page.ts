import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PuzzleComponent } from '../puzzle/puzzle.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public modalController: ModalController) {}

}
