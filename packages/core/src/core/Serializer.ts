import { Note, WallElement } from "../elements"
import { WallElementId } from "../value_objects"

enum Type {
    NOTE = 'n'
}

export class Serializer {
    serialize (elements: WallElement[]) : string {
        const serializedElementsObjects = elements.map(this.serializeElement.bind(this))

        const json = JSON.stringify(serializedElementsObjects)
        
        return json
    }

    deserialize (json: string) : WallElement[] {
        const serializedElementsObjects = JSON.parse(json)

        const elements = serializedElementsObjects.map(this.deserializeElement.bind(this))

        return elements
    }

    private serializeElement (element: WallElement) {
        if (element instanceof Note) return { 
            t: Type.NOTE, 
            id: element.id.toString(),
            p: element.getProperties() 
        }
    }

    private deserializeElement (data: any) : WallElement | undefined {
        if (data.t === Type.NOTE) return new Note(new WallElementId(data.id), data.p)
    }
}