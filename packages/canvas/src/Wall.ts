import { Application } from "@eswall/core"
import Konva from 'konva'
import { KonvaEventObject, Node } from "konva/lib/Node"
import { SelectionRectangle } from "./SelectionReactangle"
import { SelectedElementsWrapper } from "./SelectedElementsWrapper"
import { WallElementsManager } from "./WallElementsManager"

export class Wall extends Konva.Stage {
    layer : Konva.Layer
    elementsManager : WallElementsManager
    selectedElementsWrapper : SelectedElementsWrapper
    selectionArea : SelectionRectangle

    constructor(container: HTMLDivElement, private app: Application) {
        super({
            container,
            width: container.offsetWidth,
            height: container.offsetHeight
        })

        this.layer = new Konva.Layer()
        this.add(this.layer)

        this.selectedElementsWrapper = new SelectedElementsWrapper(this, app)
        this.selectionArea = new SelectionRectangle(this, this.selectedElementsWrapper)

        this.elementsManager = new WallElementsManager(app, this)

        this.on('wheel', this.wheelHandler.bind(this))
    }

    public addToLayer (element: Konva.Node) {
        return this.layer.add(element as any)
    }


    public getPointerAbsolutePosition() : { x: number, y: number } {
        const position = { x: 0, y: 0 }
        const pointerPosition = this.getPointerPosition()
        
        if (pointerPosition?.x) position.x = (pointerPosition.x - this.x()) / this.scaleX()
        if (pointerPosition?.y) position.y = (pointerPosition.y - this.y()) / this.scaleX()

        return position
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
