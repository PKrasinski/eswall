import { Application, NewElementEvent, Note, RemoveElementEvent } from "@eswall/core";
import Konva from 'konva';
import { WallElementsManager } from "./WallElementsManager";

export class Wall {
    stage : Konva.Stage
    layer : Konva.Layer
    elementsManager : WallElementsManager

    constructor(container: HTMLDivElement, private app: Application) {
        const { stage, layer } = this.createStageAndLayer(container)
        this.stage = stage
        this.layer = layer

        this.elementsManager = new WallElementsManager(app, stage, layer)
    }

    createStageAndLayer(container: HTMLDivElement) {
        const stage = new Konva.Stage({
            container,
            width: container.offsetWidth,
            height: container.offsetHeight
        })

        const layer = new Konva.Layer()
        stage.add(layer)

        return { stage, layer }
    }
}
