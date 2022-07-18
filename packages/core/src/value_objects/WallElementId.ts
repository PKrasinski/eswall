import { v4 } from "uuid"

export class WallElementId {
    static generate() : WallElementId {
        const id = v4()
        return new WallElementId(id)
    }
    constructor (protected id: string) {}

    equal(wallElementId: WallElementId): boolean {
        return this.id === wallElementId.id
    }
}
