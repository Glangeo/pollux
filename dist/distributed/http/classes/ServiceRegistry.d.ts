import { IDistributedService } from '../interfaces/IDistributedService';
export declare abstract class ServiceRegistry {
    protected static currentServiceName: string | undefined;
    protected static readonly registry: {
        [key: string]: IDistributedService | undefined;
    };
    static setCurrentServiceName(name: string): void;
    static setService<T extends new (args: any[]) => IDistributedService>(service: T, instance: InstanceType<T>): void;
    static getService<T extends new (args: any[]) => IDistributedService>(service: T): InstanceType<T>;
}
