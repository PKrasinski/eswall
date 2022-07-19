import { Publisher, PublisherEvent } from "../shared/ObserverPattern";
import { WallElementId } from "../value_objects";

export type WallElementProperties = {
    position: {
        x: number,
        y: number,
    }
} 

export class PropertiesChangedEvent extends PublisherEvent {}

export class WallElement <Properties extends WallElementProperties = WallElementProperties> extends Publisher {
    constructor(
        public id: WallElementId,
        protected properties: Properties
    ) { super() }

    idEqual(id: WallElementId): boolean {
        return this.id.equal(id)
    }

    getProperties(): Properties {
        return JSON.parse(JSON.stringify(this.properties))
    }

    changeProperties(newProperties: Properties): Properties {
        const oldProperties = this.properties
        this.properties = newProperties
        this.notify(PropertiesChangedEvent)
        return oldProperties
    }
}
