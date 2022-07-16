import { WallElement, WallElementProperties } from "./WallElement";

export type NoteProperties = WallElementProperties & {
    content: string
}

export class Note extends WallElement<NoteProperties> {}
