import {
    allSettled,
    createDomain,
    createEffect,
    createStore,
    fork
} from "effector"
import { attachWrapper } from "./index"

test("attach-wrapper map result", async () => {
  type Req = {
    method: string
    body?: any
    query?: any
    params?: any
  }

  type Res<R = any> = {
    data: R
  }

  type LoginParams = {
    username: string
    password: string
  }

  type LoginResult = {
    token: string
  }

  const requestFx = createEffect<Req, Res, Error>({
      handler: ({ body }) => {
          return body.password === "123"
              ? Promise.resolve({
                  data: {
                      token: "123",
                  },
              })
              : Promise.reject(new Error("invalid password"))
      }
  })

  const $requestParams = createStore<Req | null>(null)
  $requestParams.on(requestFx, (_, params) => params)

  const loginReqFx = attachWrapper({
      effect: requestFx,
      mapParams: (params: LoginParams) => ({
          method: "POST",
          body: params,
      }),
      mapResult: ({ result }): Res<LoginResult> => result.data,
      mapError: ({ error }) => {
          error.name = "InvalidCredentials"
          return error
      },
  })

  const result = await loginReqFx({ username: "42px", password: "123" })

  expect($requestParams.getState()).toEqual({
      method: "POST",
      body: {
          username: "42px",
          password: "123",
      },
  })
  expect(result).toEqual({
      token: "123",
  })

  try {
      await loginReqFx({ username: "42px", password: "invalid password" })
      fail("it should not reach here")
  } catch (err) {
      expect(err.name).toBe("InvalidCredentials")
  }
})


test("mock attached effect", async () => {
    const domain = createDomain()
    const originalEffectFx = domain.effect((data: string) => {
        return "real data" as string
    })

    const attachedEffectFx = attachWrapper({
        domain,
        effect: originalEffectFx,
        mapParams: (data: number) => `${data}`,
        mapResult: (result) => result, 
    })

    const resultWatcher = jest.fn()
    attachedEffectFx.doneData.watch(resultWatcher)

    
    const scope = fork(domain, {
        handlers: new Map()
            .set(attachedEffectFx, (data: number) => "mock"),
    })

    await allSettled(attachedEffectFx, {
        scope,
        params: 4,
    })

    expect(resultWatcher.mock.calls.length).toBe(1)
    expect(resultWatcher.mock.calls[0][0]).toBe("mock")
})
