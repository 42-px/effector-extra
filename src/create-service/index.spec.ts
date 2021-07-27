import { allSettled, createDomain, fork } from "effector"
import { createService } from "./index"

test("create service", async () => {
    const domain = createDomain()
    const myEffectFx = domain.effect<string, string, Error>((params) => {
        return "value"
    })

    const service = createService({
        domain,
        effect: myEffectFx,
    })

    const myMethodFx = service.createMethod({
        mapParams: (params: number) => `${params}`,
        mapResult: ({ params }) => "result",
    })

    const result = await myMethodFx(4)

    expect(result).toBe("result")    
})

test("mock some service method", async () => {
    const domain = createDomain()
    const myEffectFx = domain.effect<string, string, Error>((params) => {
        return "real value"
    })

    const service = createService({
        domain,
        effect: myEffectFx,
    })

    const myMethodFx = service.createMethod({
        mapParams: (params: number) => `${params}`,
        mapResult: ({ result }) => result,
    })

    const result = await myMethodFx(4)

    expect(result).toBe("real value")
    
    const watchResult = jest.fn()
    myMethodFx.doneData.watch(watchResult)

    const scope = fork(domain, {
        handlers: new Map().set(myMethodFx, (params: number) => "mock")
    })

    await allSettled(myMethodFx, {
        scope,
        params: 4,
    })

    expect(watchResult.mock.calls.length).toBe(1)
    expect(watchResult.mock.calls[0][0]).toBe("mock")
})
