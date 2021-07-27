import { fork, allSettled, Scope, createDomain, forward } from "effector"
import { mockEffects, mockStores } from "./index"


it("mock effects", async () => {
    const d = createDomain()

    const effectFx = d.effect<void, string, Error>("r")
    const event = d.event<void>("d")
  
    const $store = d.store<string | null>(null)
  
    $store.on(effectFx.doneData, (_, v) => v)
  
    forward({
        from: event,
        to: effectFx,
    })
  
    effectFx.use(() => Promise.resolve("real value"))

    const scope = fork(d, {
        handlers: mockEffects().set(effectFx, () => Promise.resolve("mock"))
    })

    await allSettled(event, { scope })
    expect(scope.getState($store)).toBe("mock")
})

it("mock stores", () => {
    const d = createDomain()

    const $storeA = d.store<string | null>(null)
    const $storeB = d.store<string | null>(null)

    const scope = fork(d, {
        values: mockStores()
            .set($storeA, "A")
            .set($storeB, "B")
    })

    expect(scope.getState($storeA)).toBe("A")
    expect(scope.getState($storeB)).toBe("B")
})
