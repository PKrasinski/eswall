export type PublisherEventCallback <T extends PublisherEvent> = (event: T) => void

export abstract class Publisher {
    private readonly callbacks : { [key: string] : Array<PublisherEventCallback<any>> } = {} 

    subscribe <T extends PublisherEvent> (Event : PublisherEvent, callback : PublisherEventCallback<T>) {
        if (!this.callbacks[Event.type]) this.callbacks[Event.type] = []

        this.callbacks[Event.type].push(callback)
    }

    notify (event : PublisherEvent) {
        const callbacksArr = this.callbacks[event.type]

        if (!callbacksArr) return 

        callbacksArr.forEach(callback => callback(event))
    }
}

export abstract class PublisherEvent {
    static get type () {
        return this.name
    }
    get type () {
        return (this.constructor as typeof PublisherEvent).type
    }
}