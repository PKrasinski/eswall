import { Application, Note, WallElement } from "@eswall/core";
import Konva from "konva";
import { CanvasElement } from "./CanvasElement";
import { CanvasNote } from "./CanvasNote";

export class CanvasElementFactory {
    constructor (
        private app : Application,
        private stage : Konva.Stage,
        private layer : Konva.Layer
    ) { }

    build (element: WallElement) : CanvasElement<any> {
        if (element instanceof Note) return this.buildNote(element)
        throw new Error('Builder can not build CanvasElement')
    }

    private buildNote(note: Note) {
        return new CanvasNote(this.app, this.stage, this.layer, note)
    }
}