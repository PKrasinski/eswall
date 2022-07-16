import { RemoveElementsCommand } from "../../src/commands"
import { Wall } from "../../src/core"
import { Note } from "../../src/elements"
import { Position, WallElementId } from "../../src/value_objects"

describe('RemoveElementsCommand', () => {
    it('should be able to execute', () => {
        // given
        const id = new WallElementId('id')
        const note = new Note(id, new Position(0, 0))
        const wall = new Wall([note])
        const command = new RemoveElementsCommand([id])
        // when
        command.execute(wall)        
        // then 
        expect(wall.findElementById(id)).toBe(null)
    })
    it('should be able to undo', () => {
        // given
        const id = new WallElementId('id')
        const note = new Note(id, new Position(0, 0))
        const wall = new Wall([note])
        const command = new RemoveElementsCommand([id])
        // when
        command.execute(wall)  
        command.undo(wall)      
        // then 
        expect(wall.findElementById(id)).toBe(note)
    })
})