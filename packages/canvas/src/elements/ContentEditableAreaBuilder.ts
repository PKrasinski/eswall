import { ContentEditableArea } from "./ContentEditableArea"

customElements.define('content-editable-area', ContentEditableArea, { extends: 'div' })

export class ContentEditableAreaBuilder {
    private styles = {
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '150px',
        height: '150px',
        fontSize: '16px',
        border: 'none',
        padding: '0px',
        margin: '0px',
        overflow: 'hidden',
        background: 'none',
        outline: 'none',
        resize: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        wordBreak: 'break-word',
        lineHeight: 1.6,
        fontFamily: '',
        transformOrigin: 'left top',
        textAlign: 'center',
        color: 'black',
    }
    private params = {
        innerText: ''
    }
    private transform = {
        scale: 1
    }

    build () : ContentEditableArea {
        const contentEditableArea = document.createElement('div', { is: 'content-editable-area' }) as ContentEditableArea

        this.applyStyles(contentEditableArea)
        this.applyParams(contentEditableArea)
        this.applyTransform(contentEditableArea)

        document.body.appendChild(contentEditableArea) 
        
        return contentEditableArea
    }

    private applyTransform(contentEditableArea: ContentEditableArea) {
        contentEditableArea.style.transform = `scale(${this.transform.scale})`
    }

    private applyParams(contentEditableArea: ContentEditableArea) {
        contentEditableArea.innerText = this.params.innerText
    }

    private applyStyles(contentEditableArea: ContentEditableArea) {
        Object.entries(this.styles).forEach(([style, value]) => {
            (contentEditableArea.style as unknown as { [key: string]: string | number} )[style] = value
        })
    }

    innerText (innerText: string) : ContentEditableAreaBuilder {
        this.params.innerText = innerText
        return this
    } 
    
    scale(scale: number) {
        this.transform.scale = scale
        return this
    }

    top (px: number) : ContentEditableAreaBuilder {
        this.styles.top = px + 'px'
        return this
    } 

    left (px: number) : ContentEditableAreaBuilder {
        this.styles.left = px + 'px'
        return this
    } 

    lineHeight (lineHeight: number) : ContentEditableAreaBuilder {
        this.styles.lineHeight = lineHeight
        return this
    } 

    fontSize (fontSize: number) : ContentEditableAreaBuilder {
        this.styles.fontSize = fontSize + 'px'
        return this
    } 

    fontFamily (fontFamily: string) : ContentEditableAreaBuilder {
        this.styles.fontFamily = fontFamily
        return this
    } 

    textAlign (textAlign: string) : ContentEditableAreaBuilder {
        this.styles.textAlign = textAlign
        return this
    } 

    color (color: string) : ContentEditableAreaBuilder {
        this.styles.color = color
        return this
    }
}