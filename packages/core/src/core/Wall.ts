import { WallElement, WallElementProperties } from "../elements"
import { Publisher, PublisherEvent } from "../shared/ObserverPattern"
import { WallElementId } from "../value_objects"
import { Serializer } from "./Serializer"

export class ElementEvent extends PublisherEvent {
    constructor (
        public element: WallElement
    ) { super() }
}

export class NewElementEvent extends ElementEvent {}
export class RemoveElementEvent extends ElementEvent {}
export class ChangeElementPropertiesEvent extends ElementEvent {}

export class Wall extends Publisher {
    serializer: Serializer
    constructor(
        private elements: WallElement[]
    ) { 
        super() 
        this.serializer = new Serializer()
    }

    addElement(element: WallElement) {
        this.elements.push(element)
        this.notify(new NewElementEvent(element))
    }

    removeElement(id: WallElementId) : WallElement {
        const index = this.elements.findIndex(element => element.idEqual(id))
        const element = this.elements.splice(index, 1)[0]
        this.notify(new RemoveElementEvent(element))
        return element
    }

    findElementById(id: WallElementId): WallElement | null {
        return this.elements.find(element => element.idEqual(id)) || null
    }

    changeElementProperties (id: WallElementId, properties: WallElementProperties) {
        const element = this.findElementById(id)
        if (!element) throw new Error('Element not founded')
        const oldProperties = element.changeProperties(properties)
        this.notify(new ChangeElementPropertiesEvent(element))
        return oldProperties
    }

    exportElementsToString() : string {
        return this.serializer.serialize(this.elements)
    }

    importElementsFromString(data: string) {
        const elements = this.serializer.deserialize(data)
        elements.map(this.addElement.bind(this))
    }
}
