import { Position, Result, WallElementId } from "../value_objects"
import { Wall } from "../core"
import { Command } from "./Command"

export class MoveElementsCommand implements Command {
    private oldElementsPositions : Array<[WallElementId, Position]> = [] 

    constructor (
        private newElementsPositions: Array<[WallElementId, Position]>
    ) {}

    execute (wall: Wall) : Result {
        this.newElementsPositions.forEach(([id, newPosition]) => {
            const oldPositions = wall.moveElement(id, newPosition)
            this.oldElementsPositions.push([id, oldPositions])
        })
        return Result.success()
    }
    undo (wall: Wall) : Result {
        this.oldElementsPositions.forEach(([id, oldPosition]) => {
            wall.moveElement(id, oldPosition)
        })
        this.oldElementsPositions = []
        return Result.success()
    }
}
