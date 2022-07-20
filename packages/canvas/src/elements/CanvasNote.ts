import { ChangeElementsPropertiesCommand, Note } from "@eswall/core";
import Konva from "konva";
import { CanvasElement } from "./CanvasElement";
import { ContentEditableArea } from "./ContentEditableArea";

export class CanvasNote extends CanvasElement<Note> {
    private rect !: Konva.Rect
    private textNode !: Konva.Text
    private contentEditableArea ?: ContentEditableArea

    createKonvaElement(): void {
        this.draggable(true)

        this.rect = new Konva.Rect({
            x: 0,
            y: 0,
            width: 160,
            height: 160
        })
        
        this.textNode = new Konva.Text({
            x: 5,
            y: 5,
            align: 'center',
            verticalAlign: 'middle',
            fontSize: 20,
            width: 150,
            height: 150
        })

        this.setProperties()
        
        this.add(this.rect)
        this.add(this.textNode);
        this.wall.addToLayer(this)

        this.on('click', this.clickHandler.bind(this))
        this.on('dragend', this.dragEndHandler.bind(this))
    }

    propertiesChangedHandler() {
        this.setProperties()
    }
    
    click () {
        this.clickHandler()
    }

    private clickHandler () {
        this.wall.selectedElementsWrapper.select([this])
        setTimeout(() => {
            this.addContentEditableArea();
        })
    }

    private setProperties() {
        const properties = this.element.getProperties()
        this.textNode.text(properties.content)
        this.rect.fill(properties.background)
        this.x(properties.position.x)
        this.y(properties.position.y)
    }

    private dragEndHandler () {
        const newProperties = this.element.getProperties()
        newProperties.position.x = this.x()
        newProperties.position.y = this.y()

        this.app.executeCommand(new ChangeElementsPropertiesCommand([
            [this.element.id, newProperties]
        ]))
    }

    private addContentEditableArea() {
        this.textNode.hide();

        this.contentEditableArea = ContentEditableArea.create(this.wall, this.textNode)

        this.contentEditableArea.addEventListener('beforeRemove', this.contentEditableAreaRemovedHandler.bind(this))
        this.contentEditableArea.addEventListener('contentChanged', this.contentEditableAreaContentChangedHandler.bind(this))
    }

    private contentEditableAreaContentChangedHandler(event: any) {
        if (event.detail.content === this.textNode.text()) return

        const newProperties = this.element.getProperties()
        newProperties.content = event.detail.content

        this.app.executeCommand(new ChangeElementsPropertiesCommand([
            [this.element.id, newProperties]
        ]))
    }

    private contentEditableAreaRemovedHandler() {
        this.textNode.show()
    }
}

