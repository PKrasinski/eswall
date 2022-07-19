import { AddElementsCommand } from "../../src/commands"
import { Wall } from "../../src/core"
import { Note } from "../../src/elements"
import { WallElementId } from "../../src/value_objects"
import { NoteBuilder } from "../_utils/NoteBuilder"

describe('AddElementsCommand', () => {
    it('should be able to execute', () => {
        // given
        const wall = new Wall([])
        const id = new WallElementId('id')
        const note = new NoteBuilder().setId(id).build()
        const command = new AddElementsCommand([note])
        // when
        command.execute(wall)        
        // then 
        expect(wall.findElementById(id)).toBe(note)
    })
    it('should be able to undo', () => {
        // given
        const wall = new Wall([])
        const id = new WallElementId('id')
        const note = new NoteBuilder().setId(id).build()
        const command = new AddElementsCommand([note])
        // when
        command.execute(wall)  
        command.undo(wall)      
        // then 
        expect(wall.findElementById(id)).toBe(null)
    })
    it('after undo should remove correct object', () => {
        // given
        const wall = new Wall([])
        const note = new NoteBuilder().build()
        const note2 = new NoteBuilder().build()
        const command1 = new AddElementsCommand([note])
        const command2 = new AddElementsCommand([note2])
        // when
        command1.execute(wall)  
        command2.execute(wall)  
        command2.undo(wall)      
        // then 
        expect(wall.findElementById(note.id)).toBe(note)
        expect(wall.findElementById(note2.id)).toBe(null)
    })
})