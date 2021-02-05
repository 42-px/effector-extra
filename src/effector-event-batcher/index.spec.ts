import { createEvent } from "effector"
import { batchEvents } from "./index"

jest.useFakeTimers()
test("try immediate call if no any pending batch", () => {
    const event = createEvent<number>()
    const TIMEOUT = 200
    const callback = jest.fn()
    const batchedEvent = batchEvents(event, TIMEOUT)
    batchedEvent.watch(callback)
    event(1)
    jest.runAllTimers()
    expect(callback).toBeCalled()
})

test("try batch", () => {
    const event = createEvent<number>()
    const TIMEOUT = 200
    const callback = jest.fn()
    const batchedEvent = batchEvents(event, TIMEOUT)
    batchedEvent.watch(callback)
    event(1)
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenNthCalledWith(1, [1])
    event(2)
    event(3)
    event(4)
    event(5)
    event(6)
    jest.runAllTimers()
    expect(callback).toHaveBeenCalledTimes(2)
    expect(callback).toHaveBeenNthCalledWith(2, [2, 3, 4, 5, 6])
})
