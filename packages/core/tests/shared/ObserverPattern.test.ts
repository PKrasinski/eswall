import { Publisher, PublisherEvent } from "../../src/shared/ObserverPattern"

describe('ObserverPattern', () => {
    class Foo1Event extends PublisherEvent {}
    class Foo2Event extends PublisherEvent {}

    class FooPublisher extends Publisher {
        notify1 () {
            this.notify(new Foo1Event())
        }
        notify2 () {
            this.notify(new Foo2Event())
        }
    }

    it('should be able to subscribe and notify', () => {
        // given
        const cb1 = jest.fn()
        const cb2 = jest.fn()
        const cb3 = jest.fn()
        const publisher = new FooPublisher()

        // when 
        publisher.subscribe(Foo1Event, cb1)
        publisher.subscribe(Foo1Event, cb2)
        publisher.subscribe(Foo2Event, cb3)

        publisher.notify1()
        publisher.notify2()

        // then
        expect(cb1).toBeCalledWith(expect.any(Foo1Event))
        expect(cb2).toBeCalledWith(expect.any(Foo1Event))
        expect(cb3).toBeCalledWith(expect.any(Foo2Event))
    })
})