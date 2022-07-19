import { Application, ChangeElementsPropertiesCommand, Note, WallElementId, WallElementProperties } from "@eswall/core"
import Konva from "konva"
import { KonvaEventObject } from "konva/lib/Node"
import { Vector2d } from "konva/lib/types"
import { CanvasElement } from "./elements/CanvasElement"
import { getWrapperRect } from "./utils/getWrapperRect"
import { Wall } from "./Wall"

export class SelectedElementsWrapper extends Konva.Rect {
    elements: CanvasElement<any>[] = []
    lastPosition !: Vector2d

    constructor (private wall: Wall, private app: Application) {
        super({
            stroke: 'rgba(0,0,255,0.8)',
            strokeWidth: 1,
            visible: false,
        })

        this.draggable(true)

        this.on('dragstart', this.dragStartHandler.bind(this))
        this.on('dragmove', this.dragMoveHandler.bind(this))
        this.on('dragend', this.dragEndHandler.bind(this))
        this.on('click', this.clickHandler.bind(this))

        wall.addToLayer(this)
    }

    private dragStartHandler () {
        this.updateLastPosition()
    }

    private dragMoveHandler() {
        this.updateElementsPosition()        
        this.updateLastPosition()
    }

    private dragEndHandler() {
        this.updateLastPosition()
        this.updateElementsProperties()
    }

    private clickHandler (event: KonvaEventObject<any>) {
        this.clearSelect()
        const { layerX, layerY } = event.evt
        
        this.wall.elementsManager.clickElementOnPosition({
            x: layerX,
            y: layerY
        })
    }

    private updateElementsPosition() {
        const moveX = this.lastPosition.x - this.x()
        const moveY = this.lastPosition.y - this.y()

        this.elements.forEach(element => element.move({
            x: -moveX,
            y: -moveY
        }))
    }

    private updateLastPosition (x?: number, y?: number) {
        this.lastPosition = {
            x: x || this.x(),
            y: y || this.y()
        }
    }

    private updateElementsProperties() {
        const newElementsProperties = this.elements.map(node => {
            const properties = node.getProperties()
            properties.position.x = node.x()
            properties.position.y = node.y()
            return [node.getId(), properties] as [WallElementId, WallElementProperties]
        })

        const command = new ChangeElementsPropertiesCommand(newElementsProperties)

        this.app.executeCommand(command)
    }

    private clearSelect() {
        this.elements.forEach(node => {
            node.draggable(true)
        })
        this.elements = []

        this.visible(false)
    }

    select (elements: CanvasElement<any>[]) {
        this.clearSelect()

        elements.forEach(element => element.draggable(false))

        const rect = getWrapperRect(this.wall, elements, 2)

        this.setAttrs(rect)

        this.moveToTop()
        this.visible(true)

        this.elements = elements
    }
}