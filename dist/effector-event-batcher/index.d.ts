import { Event } from "effector";
export declare function batchEvents<T>(trigger: Event<T>, timeout: number): Event<T[]>;
