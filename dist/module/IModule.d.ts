import { Router } from '../router';
export interface IModule {
    readonly name: string;
    readonly router: Router;
    init?(): Promise<void>;
}
