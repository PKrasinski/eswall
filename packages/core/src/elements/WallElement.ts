import { WallElementId } from "../value_objects";

export type WallElementProperties = {
    position: {
        x: number,
        y: number,
    }
} 

export class WallElement <Properties extends WallElementProperties = WallElementProperties> {
    constructor(
        public id: WallElementId,
        protected properties: Properties
    ) { }

    idEqual(id: WallElementId): boolean {
        return this.id.equal(id)
    }

    getProperties(): Properties {
        return JSON.parse(JSON.stringify(this.properties))
    }

    getPosX(): number {
        return this.properties.position.x
    }


    getPosY(): number {
        return this.properties.position.y
    }

    changeProperties(newProperties: Properties): Properties {
        const oldProperties = this.properties
        this.properties = newProperties
        return oldProperties
    }
}
