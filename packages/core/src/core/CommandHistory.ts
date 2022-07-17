import { Command } from "../commands";
import { Wall } from "./Wall";

export class CommandHistory {
    previewsCommands : Command[]  = []
    nextCommands : Command[] = []

    undo(wall: Wall) {
        const command = this.previewsCommands.pop()
        if (!command) return 

        const result = command.undo(wall)

        if (result.isError()) return
        this.nextCommands.push(command)
    }

    redo (wall: Wall) {
        const command = this.nextCommands.pop()
        if (!command) return 

        const result = command.execute(wall)
        
        if (result.isError()) return
        this.previewsCommands.push(command)
    }

    executeCommand(wall: Wall, command: Command) { 
        const result = command.execute(wall)
        if (result.isError()) return
        this.previewsCommands.push(command)
        this.nextCommands = []
    }
}
