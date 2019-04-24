export class Position {
    x: number;
    y: number;
    
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    same(pos: Position) : boolean {
        if (!pos) {
            return false;
        }
        if ((pos.x === this.x) && (this.y === pos.y)) {
            return true;
        }
        return false;
    }

    adjacent(pos:Position): boolean {
        if (!pos) {
            return false;
        }
        if ((pos.x === this.x) && (Math.abs(pos.y - this.y) === 1)) {
            return true;
        } else if ((pos.y === this.y) && (Math.abs(pos.x - this.x) === 1)) {
            return true;
        }
        return false;
    }
}
