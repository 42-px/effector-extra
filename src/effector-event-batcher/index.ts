import {
    createEvent,
    createStore,
    Event,
    EventCallable,
    sample,
} from "effector"

export function batchEvents<T>(
    trigger: Event<T>,
    timeout: number
): EventCallable<T[]> {
    const event = createEvent<T[]>()
    const pushStore = createEvent<T>()
    const resetStore = createEvent()
    const timeoutEnd = createEvent()
    const $storedEvents = createStore<T[]>([])
    $storedEvents
        .on(pushStore, (prevValue, value) => [...prevValue, value])
        .reset(resetStore)

    let timeoutId: any
    trigger.watch((payload) => {
        if (timeoutId !== undefined) {
            clearTimeout(timeoutId)
            pushStore(payload)
        } else {
            event([payload])
        }
        timeoutId = setTimeout(() => {
            timeoutId = undefined
            timeoutEnd()
        }, timeout)
    })
    sample({
        source: sample({
            source: $storedEvents,
            clock: timeoutEnd,
            fn: (store) => store,
        }),
        filter: $storedEvents.map((store) => Boolean(store.length)),
    }).watch((payload) => {
        event(payload)
        resetStore()
    })
    return event
}
