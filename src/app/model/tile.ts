import { Position } from './position';

export class Tile {
    value: number;
    position: Position;s

    constructor(value: number, pos: Position) {
        this.value = value;
        this.position = pos;
    }
}
