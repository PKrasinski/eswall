import { ChangeElementsPropertiesCommand } from "../../src/commands"
import { Wall } from "../../src/core"
import { Note, NoteProperties } from "../../src/elements"
import { WallElementId } from "../../src/value_objects"

describe('ChangeElementsPropertiesCommand', () => {
    it('should be able to execute', () => {
        // given
        const id = new WallElementId('id')
        const properties = { content: '', position: { x: 0, y: 0 } }
        const note = new Note(id, properties)
        const wall = new Wall([note])
        const command = new ChangeElementsPropertiesCommand<NoteProperties>([
            [id, { content: '', position: { x: 10, y: 15 } }]
        ])
        // when
        command.execute(wall)        
        // then 
        const noteOnWall = wall.findElementById(id)
        expect(noteOnWall).toBeInstanceOf(Note)
        expect((noteOnWall as Note).getPosX()).toBe(10)
        expect((noteOnWall as Note).getPosY()).toBe(15)
    })
    it('should be able to undo', () => {
        // given
        const id = new WallElementId('id')
        const properties = { content: '', position: { x: 0, y: 0 } }
        const note = new Note(id, properties)
        const wall = new Wall([note])
        const command = new ChangeElementsPropertiesCommand<NoteProperties>([
            [id, { content: '', position: { x: 10, y: 15 } }]
        ])
        // when
        command.execute(wall)        
        command.undo(wall)        
        // then 
        const noteOnWall = wall.findElementById(id)
        expect(noteOnWall).toBeInstanceOf(Note)
        expect((noteOnWall as Note).getPosX()).toBe(0)
        expect((noteOnWall as Note).getPosY()).toBe(0)
    })
})