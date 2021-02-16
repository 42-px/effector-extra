import { Effect, Store } from 'effector';
interface EffectsMapper extends Map<any, any> {
    set<P, D, E>(effect: Effect<P, D, E>, handler: (params: P) => D | Promise<D>): this;
}
export declare const mockEffects: () => EffectsMapper;
interface StoreMapper extends Map<any, any> {
    set<V>(store: Store<V>, value: V): this;
}
export declare const mockStores: () => StoreMapper;
export {};
