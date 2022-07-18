import { RemoveElementsCommand } from "../../src/commands"
import { Wall } from "../../src/core"
import { Note } from "../../src/elements"
import { WallElementId } from "../../src/value_objects"
import { NoteBuilder } from "../_utils/NoteBuilder"

describe('RemoveElementsCommand', () => {
    it('should be able to execute', () => {
        // given
        const id = new WallElementId('id')
        const note = new NoteBuilder().setId(id).build()
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
        const note = new NoteBuilder().setId(id).build()
        const wall = new Wall([note])
        const command = new RemoveElementsCommand([id])
        // when
        command.execute(wall)  
        command.undo(wall)      
        // then 
        expect(wall.findElementById(id)).toBe(note)
    })
})