export class Position {
    constructor(
        protected x: number,
        protected y: number
    ) { }

    yToNumber(): number {
        return this.y
    }
    xToNumber(): number {
        return this.x
    }
}
