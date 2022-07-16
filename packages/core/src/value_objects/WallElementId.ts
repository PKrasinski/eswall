export class WallElementId {
    constructor (protected id: string) {}

    equal(wallElementId: WallElementId): boolean {
        return this.id === wallElementId.id
    }
}
