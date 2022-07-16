import { AddElementCommand } from "../../src/commands"
import { Wall } from "../../src/core"
import { Note } from "../../src/elements"
import { Position, WallElementId } from "../../src/value_objects"

describe('AddElementCommand', () => {
    it('should be able to execute', () => {
        // given
        const wall = new Wall([])
        const id = new WallElementId('id')
        const note = new Note(id, new Position(0, 0))
        const command = new AddElementCommand(note)
        // when
        command.execute(wall)        
        // then 
        expect(wall.findElementById(id)).toBe(note)
    })
    it('should be able to undo', () => {
        // given
        const wall = new Wall([])
        const id = new WallElementId('id')
        const note = new Note(id, new Position(0, 0))
        const command = new AddElementCommand(note)
        // when
        command.execute(wall)  
        command.undo(wall)      
        // then 
        expect(wall.findElementById(id)).toBe(null)
    })
})