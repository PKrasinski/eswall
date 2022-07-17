import { Command } from "../commands";
import { CommandHistory } from "./CommandHistory";
import { Wall } from "./Wall";

export class Application {
    constructor(
        public wall: Wall = new Wall([]),
        private commandHistory: CommandHistory = new CommandHistory()
    ) {}

    executeCommand(command: Command) {
        this.commandHistory.executeCommand(this.wall, command)
    }

    undo() {
        this.commandHistory.undo(this.wall);
    }

    redo() {
        this.commandHistory.redo(this.wall);
    }
}
