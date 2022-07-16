import { WallElement } from "../elements"
import { Position, WallElementId } from "../value_objects"

export class Wall {
    constructor(
        private elements: WallElement[]
    ) { }

    addElement(element: WallElement) {
        this.elements.push(element)
    }

    removeElement(id: WallElementId) : WallElement {
        const index = this.elements.findIndex(element => !element.idEqual(id))
        const element = this.elements.splice(index, 1)[0]
        return element
    }

    findElementById(id: WallElementId): WallElement | null {
        return this.elements.find(element => element.idEqual(id)) || null
    }

    moveElement(id: WallElementId, newPosition: Position) : Position {
        const element = this.findElementById(id)
        if (!element) throw new Error('Element not founded')
        const oldPosition = element.move(newPosition)
        return oldPosition
    }
}
