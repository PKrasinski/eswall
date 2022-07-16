import { WallElement } from "../elements"
import { WallElementId } from "../value_objects"

export class Wall {
    constructor(
        private elements: WallElement[]
    ) { }

    addElement(element: WallElement) {
        this.elements.push(element)
    }

    removeElement(id: WallElementId) {
        this.elements = this.elements.filter(element => !element.idEqual(id))
    }

    findElementById(id: WallElementId): WallElement | null {
        return this.elements.find(element => element.idEqual(id)) || null
    }
}
