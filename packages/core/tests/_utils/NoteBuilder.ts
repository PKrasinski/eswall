import { Note, NoteProperties, WallElementId } from "../../src";

// https://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge
function mergeDeep(...objects: any[]) {
    const isObject = (obj: any) => obj && typeof obj === 'object';
    
    return objects.reduce((prev, obj) => {
      Object.keys(obj).forEach(key => {
        const pVal = prev[key];
        const oVal = obj[key];
        
        if (Array.isArray(pVal) && Array.isArray(oVal)) {
          prev[key] = pVal.concat(...oVal);
        }
        else if (isObject(pVal) && isObject(oVal)) {
          prev[key] = mergeDeep(pVal, oVal);
        }
        else {
          prev[key] = oVal;
        }
      });
      
      return prev;
    }, {});
}
  
export class NoteBuilder {
    private id : WallElementId = WallElementId.generate()
    private properties : NoteProperties = {
        position: {
            x: 0,
            y: 0
        },
        content: '',
        background: 'red'
    }

    build () : Note {
        return new Note(this.id, this.properties)
    }

    setId (id: WallElementId) {
        this.id = id
        return this
    }

    mergeProperties (properties: object) {
        this.properties = mergeDeep(this.properties, properties)
        return this
    }
}