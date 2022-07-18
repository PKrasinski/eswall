import { ChangeElementsPropertiesCommand } from "../../src/commands"
import { Wall } from "../../src/core"
import { Note, NoteProperties } from "../../src/elements"
import { WallElementId } from "../../src/value_objects"
import { NoteBuilder } from "../_utils/NoteBuilder"

describe('ChangeElementsPropertiesCommand', () => {
    const newProperties = { 
        content: '', 
        background: 'red',
        position: { x: 10, y: 15 } 
    }
    it('should be able to execute', () => {
        // given
        const id = new WallElementId('id')
        const properties = { position: { x: 0, y: 0 } }
        const note = new NoteBuilder().setId(id).mergeProperties(properties).build()
        const wall = new Wall([note])
        const command = new ChangeElementsPropertiesCommand<NoteProperties>([
            [id, newProperties]
        ])
        // when
        command.execute(wall)        
        // then 
        const noteOnWall = wall.findElementById(id)
        expect(noteOnWall).toBeInstanceOf(Note)
        expect(noteOnWall?.getProperties()).toEqual({ 
            content: '', 
            background: 'red',
            position: { x: 10, y: 15 } 
        })
    })
    it('should be able to undo', () => {
        // given
        const id = new WallElementId('id')
        const properties = { content: '', background: '', position: { x: 0, y: 0 } }
        const note = new NoteBuilder().setId(id).mergeProperties(properties).build()
        const wall = new Wall([note])
        const command = new ChangeElementsPropertiesCommand<NoteProperties>([
            [id, newProperties]
        ])
        // when
        command.execute(wall)        
        command.undo(wall)        
        // then 
        const noteOnWall = wall.findElementById(id)
        expect(noteOnWall).toBeInstanceOf(Note)
        expect(noteOnWall?.getProperties()).toEqual({ 
            content: '', 
            background: '',
            position: { x: 0, y: 0 } 
        })
    })
})