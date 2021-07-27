import { Domain, Effect } from "effector"
import { attachWrapper } from "../attach-wrapper"

type Params<P, D, F> = {
  domain: Domain
  effect: Effect<P, D, F>
}

export function createService<P, D, F>({ domain, effect }: Params<P, D, F>) {
    function createMethod<AttachP, AttachD, AttachF>({
        mapParams,
        mapResult,
        mapError,
    }: {
      mapParams: (params: AttachP) => P
      mapResult: ({ params, result }: { params: AttachP; result: D }) => AttachD
      mapError: ({ params, error }: { params: AttachP; error: F }) => AttachF
    }): Effect<AttachP, AttachD, AttachF>
    function createMethod<AttachP, AttachD>({
        mapParams,
        mapResult,
    }: {
      mapParams: (params: AttachP) => P
      mapResult: ({ params, result }: { params: AttachP; result: D }) => AttachD
    }): Effect<AttachP, AttachD, F>
    function createMethod<AttachP, AttachF>({
        mapParams,
        mapError,
    }: {
      mapParams: (params: AttachP) => P
      mapError: ({ params, error }: { params: AttachP; error: F }) => AttachF
    }): Effect<AttachP, D, AttachF>
    function createMethod(args: any): any {
        return attachWrapper({ domain, effect, ...args })
    }

    return { createMethod }
}
