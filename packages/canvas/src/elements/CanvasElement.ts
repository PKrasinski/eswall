import { Application, PropertiesChangedEvent, WallElement, WallElementId } from "@eswall/core"
import Konva from "konva"

export abstract class CanvasElement <T extends WallElement> {
    constructor (
        protected app: Application,
        protected stage: Konva.Stage,
        protected layer: Konva.Layer,
        protected element: T
    ) {
        this.createKonvaElement()
        this.element.subscribe(PropertiesChangedEvent, this.propertiesChangedHandler.bind(this))
    }

    abstract createKonvaElement () : void
    abstract remove () : void
    abstract propertiesChangedHandler () : void

    equal (id: WallElementId) {
        return this.element.idEqual(id)
    }
}