import { Application, Command, CommandHistory, Result, Wall } from "../../src"

describe('Application', () => {
    it('should be able to execute commands', () => {
        // given
        const app = new Application()
        class FooCommand implements Command {
            execute = jest.fn(() => Result.success())
            undo = jest.fn(() => Result.success())
        }
        const foo1 = new FooCommand()
        const foo2 = new FooCommand()
        // when
        app.executeCommand(foo1)
        // then
        expect(foo1.execute).toBeCalledWith(expect.any(Wall))
        expect(foo1.undo).toBeCalledTimes(0)
        expect(foo2.execute).toBeCalledTimes(0)
        expect(foo2.undo).toBeCalledTimes(0)
    })
    it('should be able to undo last command', () => {
        // given
        const app = new Application()
        class FooCommand implements Command {
            execute = jest.fn(() => Result.success())
            undo = jest.fn(() => Result.success())
        }
        const foo1 = new FooCommand()
        const foo2 = new FooCommand()
        // when
        app.executeCommand(foo1)
        app.executeCommand(foo2)
        app.undo()
        // then
        expect(foo1.execute).toBeCalledWith(expect.any(Wall))
        expect(foo1.execute).toBeCalledTimes(1)
        expect(foo1.undo).toBeCalledTimes(0)
        expect(foo2.execute).toBeCalledWith(expect.any(Wall))
        expect(foo2.execute).toBeCalledTimes(1)
        expect(foo2.undo).toBeCalledWith(expect.any(Wall))
        expect(foo2.undo).toBeCalledTimes(1)
    })
    it('should be able to redo last undo command', () => {
        // given
        const app = new Application()
        class FooCommand implements Command {
            execute = jest.fn(() => Result.success())
            undo = jest.fn(() => Result.success())
        }
        const foo1 = new FooCommand()
        const foo2 = new FooCommand()
        // when
        app.executeCommand(foo1)
        app.executeCommand(foo2)
        app.undo()
        app.undo()
        app.redo()
        // then
        expect(foo1.execute).toBeCalledWith(expect.any(Wall))
        expect(foo1.execute).toBeCalledTimes(2)
        expect(foo1.undo).toBeCalledTimes(1)
        expect(foo2.execute).toBeCalledWith(expect.any(Wall))
        expect(foo2.execute).toBeCalledTimes(1)
        expect(foo2.undo).toBeCalledWith(expect.any(Wall))
        expect(foo2.undo).toBeCalledTimes(1)
    })
})