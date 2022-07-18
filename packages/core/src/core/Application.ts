import { Command } from "../commands";
import { PublisherEvent, PublisherEventCallback } from "../shared/ObserverPattern";
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
        this.commandHistory.undo(this.wall)
    }

    redo() {
        this.commandHistory.redo(this.wall)
    }

    subscribe <T extends PublisherEvent> (Event : PublisherEvent, callback : PublisherEventCallback<T>) {
        this.wall.subscribe(Event, callback)
    }
}
