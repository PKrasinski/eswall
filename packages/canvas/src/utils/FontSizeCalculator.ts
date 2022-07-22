import Konva from "konva";

export class FontSizeCalculator {
    private node: Konva.Text
    private maxHeight : number
    
    constructor(node: Konva.Text) {
        this.node = node.clone()
        this.maxHeight = this.node.height()
        this.node.height(null as any)
    }

    getMaxFontSize (text?: string, maxFontSize: number = 26) : number {
        if (text !== undefined) this.node.text(text)
        this.node.fontSize(maxFontSize)
        return this.calcMaxFontSize()
    }

    private calcMaxFontSize () : number {
        if (this.node.height() > this.maxHeight) {
            this.node.fontSize(this.node.fontSize() - 1)
            return this.calcMaxFontSize()
        }
        return this.node.fontSize()
    }
}