import { CoreTypes } from 'src/core/types';
import { getContext, setContext } from '../helpers';

/**
 * Default middleware for context usage
 *
 * @returns
 */
export const useContext = (): CoreTypes.Api.Middleware => (req, res, next) => {
  setContext(getContext(req, res), res);

  next();
};
