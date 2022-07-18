import { ChangeElementsPropertiesCommand, Note } from "@eswall/core";
import Konva from "konva";
import { CanvasElement } from "./CanvasElement";
import { ContentEditableArea } from "./ContentEditableArea";
import { ContentEditableAreaBuilder } from "./ContentEditableAreaBuilder";

export class CanvasNote extends CanvasElement<Note> {
    private group !: Konva.Group
    private rect !: Konva.Rect
    private textNode !: Konva.Text
    private contentEditableArea ?: ContentEditableArea

    createKonvaElement(): void {
        this.group = new Konva.Group({
            draggable: true,
        })

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
        
        this.group.add(this.rect)
        this.group.add(this.textNode);
        this.layer.add(this.group)

        this.group.on('dblclick dbltap', this.doubleClickHandler.bind(this))
        this.group.on('dragend', this.dragEndHandler.bind(this))
    }

    propertiesChangedHandler() {
        this.setProperties()
    }

    remove () {
        this.group.remove()
    }

    private setProperties() {
        const properties = this.element.getProperties()
        this.textNode.text(properties.content)
        this.rect.fill(properties.background)
        this.group.x(properties.position.x)
        this.group.y(properties.position.y)
    }

    private dragEndHandler () {
        const newProperties = this.element.getProperties()
        newProperties.position.x = this.group.x()
        newProperties.position.y = this.group.y()

        this.app.executeCommand(new ChangeElementsPropertiesCommand([
            [this.element.id, newProperties]
        ]))
    }

    private doubleClickHandler () {
        setTimeout(() => {
            this.addContentEditableArea();
        })
    }

    private addContentEditableArea() {
        this.textNode.hide();

        const textPosition = this.textNode.absolutePosition();

        this.contentEditableArea = new ContentEditableAreaBuilder()
            .innerText(this.textNode.text())
            .top(this.stage.container().offsetTop + textPosition.y)
            .left(this.stage.container().offsetLeft + textPosition.x)
            .fontSize(this.textNode.fontSize())
            .lineHeight(this.textNode.lineHeight())
            .fontFamily(this.textNode.fontFamily())
            .textAlign(this.textNode.align())
            .color(this.textNode.fill())
            .scale(this.stage.scale().x)
            .build();

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

