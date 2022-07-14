// Generated by dts-bundle-generator v6.12.0

import { Domain, Effect, Event, Store } from 'effector';

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
export declare function batchEvents<T>(trigger: Event<T>, timeout: number): Event<T[]>;
export interface EffectsMapper extends Map<any, any> {
	set<P, D, E>(effect: Effect<P, D, E>, handler: (params: P) => D | Promise<D>): this;
}
export declare const mockEffects: () => EffectsMapper;
export interface StoreMapper extends Map<any, any> {
	set<V>(store: Store<V>, value: V): this;
}
export declare const mockStores: () => StoreMapper;
export declare type Params<P, D, F> = {
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
