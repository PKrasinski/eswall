import { Application, PropertiesChangedEvent, WallElement, WallElementId } from "@eswall/core"
import Konva from "konva"
import { Wall } from "../Wall"

export abstract class CanvasElement <T extends WallElement> extends Konva.Group {
    constructor (
        protected app: Application,
        protected wall: Wall,
        protected element: T,
        config ?: any
    ) {
        super(config)
        this.createKonvaElement()
        this.element.subscribe(PropertiesChangedEvent, this.propertiesChangedHandler.bind(this))
    }

    abstract createKonvaElement () : void
    abstract propertiesChangedHandler () : void

    equal (id: WallElementId) {
        return this.element.idEqual(id)
    }
}