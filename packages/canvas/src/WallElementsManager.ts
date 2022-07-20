import { Application, NewElementEvent, RemoveElementEvent, WallElementId } from "@eswall/core";
import Konva from "konva";
import { IRect, Vector2d } from "konva/lib/types";
import { CanvasElement } from "./elements/CanvasElement";
import { CanvasElementFactory } from "./elements/ElementFactory";
import { Wall } from "./Wall";

export class WallElementsManager {
    elements : Array<CanvasElement<any>> = []
    factory : CanvasElementFactory

    constructor(
        app: Application,
        private wall: Wall
    ) {
        this.factory = new CanvasElementFactory(app, wall)
        app.subscribe(NewElementEvent, this.newElementEventHandler.bind(this))
        app.subscribe(RemoveElementEvent, this.removeElementEventHandler.bind(this))
    }

    newElementEventHandler (event: NewElementEvent) {
        const element = this.factory.build(event.element)
        this.elements.push(element)
    }

    removeElementEventHandler (event: RemoveElementEvent) {
        const index = this.elements.findIndex(element => element.equal(event.element.id))
        if (index === -1) return
        const element = this.elements.splice(index, 1)[0]
        element.remove()
    }

    findElementById (id: WallElementId) {
        return this.elements.find(element => element.equal(id))
    }

    findElementsWithIntersection(rect: IRect) : Array<CanvasElement<any>> {
        return this.elements.filter((canvasElement) =>
            Konva.Util.haveIntersection(rect, canvasElement.getClientRect())
        )
    }

    clickElementOnPosition (position: Vector2d) {
        const element = this.elements.find(element => {
            const { x, y, width, height } = element.getClientRect()

            if (x > position.x) return false
            if (y > position.y) return false
            if ((x + width) < position.x) return false
            if ((y + height) < position.y) return false
            return true
        })
        element?.click()
    }
}