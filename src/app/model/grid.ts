import { Position } from './position';
import { Tile } from './tile';

export class Grid {
    xSize : number;
    ySize : number;
    tiles: Tile[];
    blank: Position;

    constructor(x: number, y: number) {
        this.xSize = x;
        this.ySize = y;
        this.tiles = [];
        this.blank = new Position(x - 1, y-1);  // iniital position, right bottom corner

        const values: number[] = this.shuffle(this.xSize * this.ySize -1);
        for (let index = 0; index < values.length; index++) {
            this.tiles.push(new Tile(
                values[index], 
                this.getPosition(index)
            ));
        }
        console.log(this.tiles);
    }

    isSolved(): boolean {
        for (let index = 0; index < this.tiles.length; index ++) {
            if (!this.isInRightPosition(this.tiles[index])) {
                return false;
            }
        }
        return true;
    }

    move(tile: Tile) {
        if (tile.position.adjacent(this.blank)) {
            const tmpPos = tile.position;
            tile.position = this.blank;
            this.blank = tmpPos;
        }
    }

    // determine the x, y position for the index-th tile
    private getPosition(index: number) : Position {
        return new Position(index % this.xSize, Math.floor(index / this.xSize));
    }

    // when a tile is in the right position, the index should match the value (index = value - 1)
    // then we just need to determine whether the position of where the index-th tile should be is 
    // actually the tile's position
    private isInRightPosition(tile: Tile): boolean {
        return tile.position.same(this.getPosition(tile.value - 1));
    }

    private shuffle(size: number): number[] {
        const values: number[] = [];
        let index1: number; // index for value 1
        let index2: number; // index for value 2

        // create initial array [1, 2, ... <size>]
        for (let index = 0; index < size; index++) {
            values.push(index + 1);
        }

        // random shuffle the array
        let currentIndex = size;
        while (currentIndex !== 0) {
            const randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex --;

            const tempValue = values[currentIndex];
            values[currentIndex] = values[randomIndex];
            values[randomIndex] = tempValue;

            if (values[currentIndex] === 1) {
                index1 = currentIndex;
            } else if (values[currentIndex] === 2) {
                index2 = currentIndex;
            }
        }

        // check inversion count, if odd, switch 1 and 2
        if ((this.getInversionCount(values) % 2) !== 0) {
            values[index1] = 2;
            values[index2] = 1;
        }

        return values;
    }

    private getInversionCount(values: number[]): number {
        let count = 0;
        
        for (let i = 0; i < values.length - 1; i++) {
            for (let j = i + 1; j < values.length; j++) {
                if (values[i] > values[j]) {
                    count ++;
                }
            }
        }
        return count;
    }
}
