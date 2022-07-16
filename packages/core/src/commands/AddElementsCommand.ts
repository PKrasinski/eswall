import { WallElement } from "../elements"
import { Result } from "../value_objects"
import { Wall } from "../core"
import { Command } from "./Command"

export class AddElementsCommand implements Command {
    constructor (private elements: WallElement[]) {}

    execute (wall: Wall) : Result {
        this.elements.forEach(element => wall.addElement(element))
        return Result.success()
    }
    undo (wall: Wall) : Result {
        this.elements.forEach(element => wall.removeElement(element.id))
        return Result.success()
    }
}
