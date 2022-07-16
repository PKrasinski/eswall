import { Result, WallElementId } from "../value_objects"
import { Wall } from "../core"
import { Command } from "./Command"
import { WallElementProperties } from "../elements"

export class ChangeElementsPropertiesCommand <Properties extends WallElementProperties> implements Command {
    private oldElementsProperties : Array<[WallElementId, Properties]> = [] 

    constructor (
        private newElementsProperties: Array<[WallElementId, Properties]>
    ) {}

    execute (wall: Wall) : Result {
        this.newElementsProperties.forEach(([id, properties]) => {
            const oldProperties = wall.changeElementProperties(id, properties)
            this.oldElementsProperties.push([id, oldProperties as Properties])
        })
        return Result.success()
    }
    undo (wall: Wall) : Result {
        this.oldElementsProperties.forEach(([id, oldProperties]) => {
            wall.changeElementProperties(id, oldProperties)
        })
        this.oldElementsProperties = []
        return Result.success()
    }
}
