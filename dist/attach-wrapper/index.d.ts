import { Effect, Domain } from "effector";
export declare function attachWrapper<AttachP, AttachD, AttachF, P, D, F>({ domain, effect, mapParams, mapResult, mapError, }: {
    domain?: Domain;
    effect: Effect<P, D, F>;
    mapParams: (params: AttachP) => P;
    mapResult: ({ params, result }: {
        params: AttachP;
        result: D;
    }) => AttachD;
    mapError: ({ params, error }: {
        params: AttachP;
        error: F;
    }) => AttachF;
}): Effect<AttachP, AttachD, AttachF>;
export declare function attachWrapper<AttachP, AttachD, P, D, F>({ domain, effect, mapParams, mapResult, }: {
    domain?: Domain;
    effect: Effect<P, D, F>;
    mapParams: (params: AttachP) => P;
    mapResult: ({ params, result }: {
        params: AttachP;
        result: D;
    }) => AttachD;
}): Effect<AttachP, AttachD, F>;
export declare function attachWrapper<AttachP, AttachF, P, D, F>({ domain, effect, mapParams, mapError, }: {
    domain?: Domain;
    effect: Effect<P, D, F>;
    mapParams: (params: AttachP) => P;
    mapError: ({ params, error }: {
        params: AttachP;
        error: F;
    }) => AttachF;
}): Effect<AttachP, D, AttachF>;
