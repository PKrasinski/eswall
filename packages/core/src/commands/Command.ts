import { Result } from "../value_objects";
import { Wall } from "../core";

export interface Command {
    execute(wall: Wall): Result;
    undo(wall: Wall): Result;
}
