import { Application } from "@eswall/core"
import Konva from 'konva'
import { SelectionRectangle } from "./SelectionReactangle"
import { SelectedElementsWrapper } from "./SelectedElementsWrapper"
import { WallElementsManager } from "./WallElementsManager"
import { getWrapperRect } from "./utils/getWrapperRect"
import { addMetadataFromBase64DataURI } from 'meta-png'

export class Wall extends Konva.Stage {
    layer : Konva.Layer
    elementsManager !: WallElementsManager
    selectedElementsWrapper !: SelectedElementsWrapper
    selectionArea !: SelectionRectangle

    constructor (app: Application, container: HTMLDivElement) {
        super({
            container,
            width: container.offsetWidth,
            height: container.offsetHeight
        })

        this.layer = new Konva.Layer()
        this.add(this.layer)

        this.selectedElementsWrapper = new SelectedElementsWrapper(this, app)
        this.elementsManager = new WallElementsManager(app, this)
        this.selectionArea = new SelectionRectangle(this, this.selectedElementsWrapper)

        this.container().addEventListener('wheel', this.wheelHandler.bind(this))
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

    private wheelHandler (event: WheelEvent) {
        event.preventDefault()

        if (event.ctrlKey) this.zoomUsingWheel(event)
        else this.moveUsingWheel(event)       
    }

    private moveUsingWheel(event: WheelEvent) {
        const newPos = {
            x: this.x() - event.deltaX,
            y: this.y() - event.deltaY
        }
        this.position(newPos)
        this.fire('move')
    }

    private zoomUsingWheel (event: WheelEvent) {
        const scaleBy = 1.15
        const oldScale = this.scaleX()
        const pointer = this.getPointerPosition()

        if (!pointer) return

        const mousePointTo = {
            x: (pointer.x - this.x()) / oldScale,
            y: (pointer.y - this.y()) / oldScale
        }

        const direction = event.deltaY > 0 ? -1 : 1

        const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy

        this.scale({ x: newScale, y: newScale })

        const newPos = {
            x: pointer.x - mousePointTo.x * newScale,
            y: pointer.y - mousePointTo.y * newScale
        }
        this.position(newPos)
        this.fire('zoom')
    }

    toPNGDataURL () : string {
        const oldScale = this.scaleX()
        this.scale({ x: 1, y: 1 })

        const rect = getWrapperRect(this, this.elementsManager.elements, 20)

        const dataURL = this.toDataURL({ 
            pixelRatio: 2,
            x: rect.x + this.position().x,
            y: rect.y + this.position().y,
            width: rect.width,
            height: rect.height
        })

        this.scale({ x: oldScale, y: oldScale })

        return dataURL
    }
}
