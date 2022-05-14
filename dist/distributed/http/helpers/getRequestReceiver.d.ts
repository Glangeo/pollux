import { RequestReceiver, ServiceConstructor } from '../types';
export declare function getRequestReceiver<T extends ServiceConstructor>(service: InstanceType<T>): RequestReceiver<InstanceType<T>>;
