import { createEffect, createStore } from "effector"
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
