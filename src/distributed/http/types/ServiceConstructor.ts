import { IDistributedService } from '../interfaces/IDistributedService';

export type ServiceConstructor = new () => IDistributedService;
