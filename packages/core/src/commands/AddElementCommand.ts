import { WallElement } from "../elements"
import { Result } from "../value_objects"
import { Wall } from "../core"
import { Command } from "./Command"

export class AddElementCommand implements Command {
    constructor (private element: WallElement) {}

    execute (wall: Wall) : Result {
        wall.addElement(this.element)
        return Result.success()
    }
    undo (wall: Wall) : Result {
        wall.removeElement(this.element.id)
        return Result.success()
    }
}
