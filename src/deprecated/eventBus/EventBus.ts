import { EventBusConsumer, IEvent } from './types';

export class EventBus<T extends IEvent<any, any>> {
  private consumerSet: Set<EventBusConsumer<T>>;

  public constructor() {
    this.consumerSet = new Set();
  }

  public register(consumer: EventBusConsumer<T>): void {
    this.consumerSet.add(consumer);
  }

  public unregister(consumer: EventBusConsumer<T>): void {
    this.consumerSet.delete(consumer);
  }

  public dispatch(event: T): void {
    for (const consumer of this.consumerSet.values()) {
      consumer(event);
    }
  }
}
