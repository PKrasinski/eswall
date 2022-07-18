import { Application } from "@eswall/core"
import Konva from 'konva'
import { KonvaEventObject } from "konva/lib/Node"
import { WallElementsManager } from "./WallElementsManager"

export class Wall {
    stage : Konva.Stage
    layer : Konva.Layer
    elementsManager : WallElementsManager

    constructor(container: HTMLDivElement, private app: Application) {
        const { stage, layer } = this.createStageAndLayer(container)
        this.stage = stage
        this.layer = layer

        this.elementsManager = new WallElementsManager(app, stage, layer)
    }

    createStageAndLayer(container: HTMLDivElement) {
        const stage = new Konva.Stage({
            container,
            width: container.offsetWidth,
            height: container.offsetHeight
        })

        const layer = new Konva.Layer()
        stage.add(layer)
        stage.on('wheel', this.stageWheelHandler.bind(this))

        return { stage, layer }
    }

    private stageWheelHandler (event: KonvaEventObject<WheelEvent>) {
        const scaleBy = 1.15
        
        event.evt.preventDefault()

        const oldScale = this.stage.scaleX()
        const pointer = this.stage.getPointerPosition()

        if (!pointer) return

        const mousePointTo = {
            x: (pointer.x - this.stage.x()) / oldScale,
            y: (pointer.y - this.stage.y()) / oldScale
        }

        let direction = event.evt.deltaY > 0 ? 1 : -1

        if (event.evt.ctrlKey) {
            direction = -direction
        }

        const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy

        this.stage.scale({ x: newScale, y: newScale })

        const newPos = {
            x: pointer.x - mousePointTo.x * newScale,
            y: pointer.y - mousePointTo.y * newScale
        }
        this.stage.position(newPos)
    }
}
