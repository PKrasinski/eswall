import { MoveElementsCommand } from "../../src/commands"
import { Wall } from "../../src/core"
import { Note } from "../../src/elements"
import { Position, WallElementId } from "../../src/value_objects"

describe('MoveElementsCommand', () => {
    it('should be able to execute', () => {
        // given
        const id = new WallElementId('id')
        const note = new Note(id, new Position(0, 0))
        const wall = new Wall([note])
        const command = new MoveElementsCommand([
            [id, new Position(10, 15)]
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
        const note = new Note(id, new Position(0, 0))
        const wall = new Wall([note])
        const command = new MoveElementsCommand([
            [id, new Position(10, 15)]
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