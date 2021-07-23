export interface IEvent<T, P> {
  type: T;
  payload: P;
}

export type EventBusConsumer<T extends IEvent<any, any>> = (event: T) => void;
