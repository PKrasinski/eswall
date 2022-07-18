export class ContentEditableArea extends HTMLDivElement {
    outsideClickHandlerFn : (event: any) => void

    constructor() {
        super()

        this.setAttribute('contenteditable', 'true')

        this.outsideClickHandlerFn = this.outsideClickHandler.bind(this)
    }

    connectedCallback() {
        this.addEventListener('keydown', this.keydownHandler.bind(this))
        window.addEventListener('click', this.outsideClickHandlerFn)
        this.setCaretOnTheEndOfDiv()
    }

    remove() {
        this.dispatchEvent(new CustomEvent('beforeRemove'))
        window.removeEventListener('click', this.outsideClickHandlerFn)

        super.remove()
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
}

