import { Application } from "@eswall/core"
import Konva from 'konva'
import { Group } from "konva/lib/Group"
import { KonvaEventObject } from "konva/lib/Node"
import { WallElementsManager } from "./WallElementsManager"

export class Wall extends Konva.Stage {
    layer : Konva.Layer
    elementsManager : WallElementsManager

    constructor(container: HTMLDivElement, private app: Application) {
        super({
            container,
            width: container.offsetWidth,
            height: container.offsetHeight
        })

        this.layer = new Konva.Layer()
        this.add(this.layer)
        this.elementsManager = new WallElementsManager(app, this)

        this.on('wheel', this.wheelHandler.bind(this))
    }

    public addToLayer (element: Group) {
        return this.layer.add(element)
    }

    private wheelHandler (event: KonvaEventObject<WheelEvent>) {
        event.evt.preventDefault()

        if (event.evt.ctrlKey) this.zoomUsingWheel(event)
        else this.moveUsingWheel(event)       
    }

    private moveUsingWheel(event: KonvaEventObject<WheelEvent>) {
        const newPos = {
            x: this.x() - event.evt.deltaX,
            y: this.y() - event.evt.deltaY
        }
        this.position(newPos)
    }

    private zoomUsingWheel (event: KonvaEventObject<WheelEvent>) {
        const scaleBy = 1.15
        const oldScale = this.scaleX()
        const pointer = this.getPointerPosition()

        if (!pointer) return

        const mousePointTo = {
            x: (pointer.x - this.x()) / oldScale,
            y: (pointer.y - this.y()) / oldScale
        }

        const direction = event.evt.deltaY > 0 ? -1 : 1

        const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy

        this.scale({ x: newScale, y: newScale })

        const newPos = {
            x: pointer.x - mousePointTo.x * newScale,
            y: pointer.y - mousePointTo.y * newScale
        }
        this.position(newPos)
    }
}
