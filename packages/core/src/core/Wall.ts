import { WallElement, WallElementProperties } from "../elements"
import { WallElementId } from "../value_objects"

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

    changeElementProperties (id: WallElementId, properties: WallElementProperties) {
        const element = this.findElementById(id)
        if (!element) throw new Error('Element not founded')
        const oldProperties = element.changeProperties(properties)
        return oldProperties
    }
}
