import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Grid } from '../model/grid'; 
import { Tile } from '../model/tile';
import { timer } from 'rxjs';
import { Subscription } from 'rxjs';
import { Platform } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

const MAX_TILE_SIZE = 100;

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.scss'],
})
export class PuzzleComponent implements OnInit, OnDestroy {

  @Input()
  x: number;

  @Input()
  y: number;

  grid: Grid;
  time: number;
  solved: boolean;
  timeSubscription: Subscription;
  tileSize: number;

  constructor(private platform: Platform, private nativeStorage: NativeStorage) { }

  ngOnInit() {
    this.tileSize = this.calculateTileSize();
    this.startGame();
  }

  startGame() {
    if (this.timeSubscription) {
      this.timeSubscription.unsubscribe();
    }
    this.grid = new Grid(this.x, this.y);
    this.solved = false;
    let timerObservable  = timer(0, 1000);
    this.timeSubscription = timerObservable.subscribe(t => { this.time = t; console.log(this.time)});
  }

  ngOnDestroy() {
    this.timeSubscription.unsubscribe();
  }

  move(tile: Tile) {
    if (this.solved) {
      return; // do nothing if already solved
    }
    this.grid.move(tile);
    if (this.grid.isSolved()) {
      this.solved = true;
      this.timeSubscription.unsubscribe();
      this.setRecord(this.time);
    }
  }

  getGridStyle() {
    let style: any = {};
    style.width = (this.tileSize * this.x + 4) + 'px';
    style.height = (this.tileSize * this.y + 4) + 'px';  
    return style;
  }

  getTileStyle(tile: Tile) {
    let style: any = {};
    style.transform = 'translate(' + (tile.position.x * this.tileSize) + 'px, ' 
      + (tile.position.y * this.tileSize) + 'px)';
    style.height = (this.tileSize) + 'px';
    style.width = (this.tileSize) + 'px';
    style.padding = Math.floor((this.tileSize - 20)/ 2) + 'px 0';
    
    return style;
  }

  private calculateTileSize(): number {
    let width: number = this.platform.width();
    width = Math.floor(width * 0.9 / this.x);
    if (width > MAX_TILE_SIZE) {
      return MAX_TILE_SIZE;
    } else {
      return width;
    }
  }

  private setRecord(time: number) {
    const name = this.getPuzzleName(this.x, this.y);
    this.nativeStorage.getItem(name).then(
      data => {
        console.log('existing record: ' + data);
        if (this.isNewRecord(time, data)) {
          this.nativeStorage.setItem(name, time).then(
            error => console.error('Error storing new record')
          );
        }
      }
    );
  }

  private getPuzzleName(x: number, y: number): string {
    return x + 'x' + y;
  } 

  private isNewRecord(newTime: number, oldRecord: number) {
    return (newTime < oldRecord); 
  }
}
