import { Router } from '../../router/Router';
/**
 * High abstract group for set of endpoints. Module is commonly used for one service
 */
export declare type Module = {
    readonly name: string;
    readonly router?: Router;
    init?(): Promise<void>;
};
