# Effector extra

Helpful effector utils.

## Installation

```sh
npm install @42px/effector-extra
```

## Utils
### attachWrapper

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
### Event batcher
This util is useful when you have a non-consistent flow of many events. It batches events payload in array if the sequence of events are fired faster then defined delay. Otherwise event fired immediatly 

```ts
import { batchEvents } from '@42px/effector-extra'
import { matrixDomain } from './domain'

export const roomMessage = matrixDomain.event<MessageEvent>()
export const roomMessageBatch = batchEvents(roomMessage, 500)
```
