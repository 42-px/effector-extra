# Effector extra

Helpful effector utils.

## attachWrapper

Often you need to create a derivative effect with wrapped params, result or error:

```ts
import { attachWrapper } from '@42px/effector-extra'
import { requestFx, Res } from '../request'

type LoginParams = {
  username: string
  password: string
}

type LoginResult = {
  token: string
}

const loginReqFx = attachWrapper({
    effect: requestFx,
    mapParams: (params: LoginParams) => ({
        method: "POST",
        body: params,
    }),
    mapResult: ({ result }): Res<LoginResult> => result.data,
    mapError: ({ error }) => {
        if (error.code === 404) {
          const err = new Error()
          err.name = "InvalidCredentials"
          return err
        }
        return error
    },
})
```