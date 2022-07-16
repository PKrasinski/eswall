import { Position } from "../value_objects";
import { WallElementId } from "../value_objects";

export class WallElement {
    constructor(
        public id: WallElementId,
        private position: Position
    ) { }

    idEqual(id: WallElementId): boolean {
        return this.id.equal(id)
    }
}
