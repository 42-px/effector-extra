import {
    Effect, createEffect, Domain,
} from "effector"

export function attachWrapper<AttachP, AttachD, AttachF, P, D, F>({
    domain,
    effect,
    mapParams,
    mapResult,
    mapError,
}: {
  domain?: Domain
  effect: Effect<P, D, F>
  mapParams: (params: AttachP) => P
  mapResult: ({ params, result }: { params: AttachP; result: D }) => AttachD
  mapError: ({ params, error }: { params: AttachP; error: F }) => AttachF
}): Effect<AttachP, AttachD, AttachF>
export function attachWrapper<AttachP, AttachD, P, D, F>({
    domain,
    effect,
    mapParams,
    mapResult,
}: {
  domain?: Domain
  effect: Effect<P, D, F>
  mapParams: (params: AttachP) => P
  mapResult: ({ params, result }: { params: AttachP; result: D }) => AttachD
}): Effect<AttachP, AttachD, F>
export function attachWrapper<AttachP, AttachF, P, D, F>({
    domain,
    effect,
    mapParams,
    mapError,
}: {
  domain?: Domain
  effect: Effect<P, D, F>
  mapParams: (params: AttachP) => P
  mapError: ({ params, error }: { params: AttachP; error: F }) => AttachF
}): Effect<AttachP, D, AttachF>
export function attachWrapper(args: any): any {
    const handler = (params: any) => {
        let promise: any = args.effect(args.mapParams(params))
        if (args.mapResult) {
            promise = promise.then(
                (result: any) => args.mapResult({ params, result })
            )
        }
        if (args.mapError) {
            promise = promise.catch((error: any) => {
                throw args.mapError({ params, error })
            })
        }
        return promise
    }


    const effect =  args.domain
        ? args.domain.effect()
        : createEffect()
    effect.use(handler)
    return effect
}
