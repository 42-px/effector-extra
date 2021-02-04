import { Effect } from "effector";
export declare function attachWrapper<AttachP, AttachD, AttachF, P, D, F>({ effect, mapParams, mapResult, mapError, }: {
    effect: Effect<P, D, F>;
    mapParams: (params: AttachP) => P;
    mapResult: ({ params, result }: {
        params: P;
        result: D;
    }) => AttachD;
    mapError: ({ params, error }: {
        params: P;
        error: F;
    }) => AttachF;
}): Effect<AttachP, AttachD, AttachF>;
export declare function attachWrapper<AttachP, AttachD, P, D, F>({ effect, mapParams, mapResult, }: {
    effect: Effect<P, D, F>;
    mapParams: (params: AttachP) => P;
    mapResult: ({ params, result }: {
        params: P;
        result: D;
    }) => AttachD;
}): Effect<AttachP, AttachD, F>;
export declare function attachWrapper<AttachP, AttachF, P, D, F>({ effect, mapParams, mapError, }: {
    effect: Effect<P, D, F>;
    mapParams: (params: AttachP) => P;
    mapError: ({ params, error }: {
        params: P;
        error: F;
    }) => AttachF;
}): Effect<AttachP, D, AttachF>;
