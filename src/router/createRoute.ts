import * as Yup from 'yup';
import { useContext } from '../context/useContext';
import { IRoute } from './IRoute';

export function createRoute<
  T extends Yup.ObjectSchema<any>,
  U extends any,
  K extends any
>(route: IRoute<T, U, K>): IRoute<T, U, K> {
  const middleware = [useContext(), ...(route.middleware || [])];

  return {
    ...route,
    middleware,
  };
}
