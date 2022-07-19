import Konva from "konva"
import { KonvaEventObject } from "konva/lib/Node"
import { Vector2d } from "konva/lib/types"
import { SelectedElementsWrapper } from "./SelectedElementsWrapper"
import { Wall } from "./Wall"

export class SelectionRectangle extends Konva.Rect {
    private positionStart ?: Vector2d
    private positionEnd ?: Vector2d

    constructor (
        private wall : Wall,
        private selectedElementsWrapper : SelectedElementsWrapper
    ) {
        super({
            fill: 'rgba(0,0,255,0.3)',
            stroke: 'rgba(0,0,255,0.8)',
            strokeWidth: 1,
            visible: false,
        })

        wall.addToLayer(this)

        wall.on('mousedown', this.mouseDownHandler.bind(this))
        wall.on('mousemove', this.mouseMoveHandler.bind(this))
        wall.on('mouseup', this.mouseUpHandler.bind(this))

    }

    private mouseDownHandler (event: KonvaEventObject<any>) {
        if (event.target !== this.wall) return

        event.evt.preventDefault()

        this.positionStart = this.wall.getPointerAbsolutePosition()
        this.positionEnd = this.wall.getPointerAbsolutePosition()

        this.visible(true)
        this.width(0)
        this.height(0)
    }

    private mouseMoveHandler (event: KonvaEventObject<any>) {
        if (!this.visible())  return
        
        event.evt.preventDefault()

        this.positionEnd = this.wall.getPointerAbsolutePosition()

        if (!this.positionStart || !this.positionEnd) return

        this.setAttrs({
            x: Math.min(this.positionStart.x, this.positionEnd.x),
            y: Math.min(this.positionStart.y, this.positionEnd.y),
            width: Math.abs(this.positionEnd.x - this.positionStart.x),
            height: Math.abs(this.positionEnd.y - this.positionStart.y)
        })
    }

    private mouseUpHandler (event: KonvaEventObject<any>) {
        if (!this.visible()) return

        event.evt.preventDefault()
        event.evt.stopPropagation()
        
        this.visible(false)

        var rect = this.getClientRect()
        var elementsWithIntersection = this.wall.elementsManager.findElementsWithIntersection(rect)

        this.selectedElementsWrapper.select(elementsWithIntersection)
    }
}