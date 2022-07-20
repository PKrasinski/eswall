import Konva from "konva"
import { Wall } from "../Wall"

export class ContentEditableArea extends HTMLDivElement {
    static create (wall: Wall, node: Konva.Text) {
        const contentEditableArea = document.createElement('div', { is: 'content-editable-area' }) as ContentEditableArea
        
        contentEditableArea
            .setWall(wall)
            .setNode(node)
            .applyText()
            .applyStyles()

        wall.container().appendChild(contentEditableArea)

        return contentEditableArea
    }

    private wall !: Wall
    private node !: Konva.Text
    private outsideClickHandlerFn : (event: any) => void

    constructor(
    ) {
        super()

        this.setAttribute('contenteditable', 'true')

        this.outsideClickHandlerFn = this.outsideClickHandler.bind(this)
    }

    setWall (wall: Wall) {
        this.wall = wall
        this.wall.on('move zoom', this.wallChangeHandler.bind(this))
        return this
    }

    setNode (node: Konva.Text) {
        this.node = node
        return this
    }

    connectedCallback() {
        this.addEventListener('keydown', this.keydownHandler.bind(this))
        window.addEventListener('mousedown', this.outsideClickHandlerFn)
        this.setCaretOnTheEndOfDiv()
    }

    remove() {
        this.dispatchEvent(new CustomEvent('beforeRemove'))
        window.removeEventListener('mousedown', this.outsideClickHandlerFn)

        super.remove()
    }

    private wallChangeHandler () {
        this.applyStyles()
    }

    private outsideClickHandler (event: any) {
        if (event.target !== this) {
            this.dispatchContentChangedEvent()
            this.remove()
        }
    }

    private keydownHandler(e: KeyboardEvent) {
        if (e.key === 'Enter' && !e.shiftKey) {
            this.dispatchContentChangedEvent()
            this.remove()
        }
        else if (e.key === 'Escape') {
            this.remove()
        }
    }

    private dispatchContentChangedEvent() {
        const event = new CustomEvent('contentChanged', { 
            detail: { 
                content: this.innerText 
            } 
        })
        this.dispatchEvent(event)
    }

    private setCaretOnTheEndOfDiv() {
        this.focus()
        const range = document.createRange()
        range.selectNodeContents(this)
        range.collapse(false)
        const selection = window.getSelection()
        selection?.removeAllRanges()
        selection?.addRange(range)
    }
    
    applyText () {
        this.innerText = this.node.text()
        return this
    }

    applyStyles () {
        const textPosition = this.node.absolutePosition()
    
        this.style.position = 'absolute'
        this.style.top = (this.wall.container().offsetTop + textPosition.y) + 'px'
        this.style.left = (this.wall.container().offsetLeft + textPosition.x) + 'px'
        this.style.width = this.node.width() + 'px' || '150px'
        this.style.height = this.node.height() + 'px' || '150px'
        this.style.fontSize = this.node.fontSize() + 'px' || '16px'
        this.style.padding = this.node.padding() + 'px' || '0px'
        this.style.overflow = 'hidden'
        this.style.outline = 'none'
        this.style.display = 'flex'
        this.style.alignItems = this.node.align()
        this.style.justifyContent = 'center'
        this.style.wordBreak = 'break-word'
        this.style.lineHeight = this.node.lineHeight().toString() || '1.6'
        this.style.fontFamily = this.node.fontFamily() || ''
        this.style.transformOrigin = 'left top'
        this.style.textAlign = this.node.align()
        this.style.color = this.node.fill()
        this.style.transform = `scale(${this.wall.scale().x})`

        return this
    }
}

customElements.define('content-editable-area', ContentEditableArea, { extends: 'div' })
