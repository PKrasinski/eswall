import { Application, NewElementEvent, RemoveElementEvent } from "@eswall/core";
import Konva from "konva";
import { CanvasElement } from "./elements/CanvasElement";
import { CanvasElementFactory } from "./elements/ElementFactory";

export class WallElementsManager {
    elements : Array<CanvasElement<any>> = []
    factory : CanvasElementFactory

    constructor(
        app: Application,
        stage: Konva.Stage,
        layer: Konva.Layer
    ) {
        this.factory = new CanvasElementFactory(app, stage, layer)
        app.subscribe(NewElementEvent, this.newElementEventHandler.bind(this))
        app.subscribe(RemoveElementEvent, this.removeElementEventHandler.bind(this))
    }

    newElementEventHandler (event: NewElementEvent) {
        const element = this.factory.build(event.element)
        this.elements.push(element)
    }

    removeElementEventHandler (event: NewElementEvent) {
        const index = this.elements.findIndex(element => element.equal(event.element.id))
        if (index === -1) return
        const element = this.elements.splice(index, 1)[0]
        element.remove()
    }
}