import { WallElement } from "../elements"
import { Result, WallElementId } from "../value_objects"
import { Wall } from "../core"
import { Command } from "./Command"

export class RemoveElementsCommand implements Command {
    private removedElements : WallElement[] = [] 

    constructor (private ids: WallElementId[]) {}

    execute (wall: Wall) : Result {
        this.ids.forEach(id => {
            const element = wall.removeElement(id)
            this.removedElements.push(element)
        })
        return Result.success()
    }
    undo (wall: Wall) : Result {
        this.removedElements.forEach(element => wall.addElement(element))
        this.removedElements = []
        return Result.success()
    }
}
