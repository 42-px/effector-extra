import { Domain, Effect } from "effector";
declare type Params<P, D, F> = {
    domain: Domain;
    effect: Effect<P, D, F>;
};
export declare function createService<P, D, F>({ domain, effect }: Params<P, D, F>): {
    createMethod: {
        <AttachP, AttachD, AttachF>({ mapParams, mapResult, mapError, }: {
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
        <AttachP_1, AttachD_1>({ mapParams, mapResult, }: {
            mapParams: (params: AttachP_1) => P;
            mapResult: ({ params, result }: {
                params: AttachP_1;
                result: D;
            }) => AttachD_1;
        }): Effect<AttachP_1, AttachD_1, F>;
        <AttachP_2, AttachF_1>({ mapParams, mapError, }: {
            mapParams: (params: AttachP_2) => P;
            mapError: ({ params, error }: {
                params: AttachP_2;
                error: F;
            }) => AttachF_1;
        }): Effect<AttachP_2, D, AttachF_1>;
    };
};
export {};
