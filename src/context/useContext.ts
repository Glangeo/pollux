import { Middleware } from '../types/Middleware';
import { Context } from './Context';
import { setContext } from './setContext';

export const useContext = (): Middleware => (req, res, next) => {
  const context = new Context({
    route: req.path,
    params: req.params,
    queryParams: req.query,
    extendableState: {},
  });

  setContext(context, res);

  next();
};
