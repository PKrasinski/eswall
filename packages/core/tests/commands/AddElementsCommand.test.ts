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
})