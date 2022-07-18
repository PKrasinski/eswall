import { WallElement, WallElementProperties } from "./WallElement";

export type NoteProperties = WallElementProperties & {
    content: string,
    background: string
}

export class Note extends WallElement<NoteProperties> {}
