import { EventBusConsumer, IEvent } from './types';
export declare class EventBus<T extends IEvent<any, any>> {
    private consumerSet;
    constructor();
    register(consumer: EventBusConsumer<T>): void;
    unregister(consumer: EventBusConsumer<T>): void;
    dispatch(event: T): void;
}
