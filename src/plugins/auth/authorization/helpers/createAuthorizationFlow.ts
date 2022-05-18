import { HTTPStatusCode } from 'src/api';
import { InternalException, ValidationException } from 'src/core';
import { ClientPartials } from '../../types';
import {
  AuthorizationFlow,
  AuthorizationFlowConfig,
  BaseAccessTokenPayload,
} from '../types';

export function createAuthorizationFlow<
  ClientType extends ClientPartials.Type,
  ClientPermissions extends ClientPartials.Permissions,
  ClientMeta extends ClientPartials.Meta,
  AccessTokenPayload extends BaseAccessTokenPayload
>(
  config: AuthorizationFlowConfig<
    ClientType,
    ClientPermissions,
    ClientMeta,
    AccessTokenPayload
  >
): AuthorizationFlow<
  ClientType,
  ClientPermissions,
  ClientMeta,
  AccessTokenPayload
> {
  return {
    authorize: async (token) => {
      const payload = config.verifyAccessToken(token);
      const client = await config.getClientById(payload.id);

      if (client.csrfToken !== payload.csrfToken) {
        throw new ValidationException({
          message: 'Access token is invalid.',
          meta: {
            errors: ['Reason: CSRF tokens do not match'],
          },
          httpStatusCode: HTTPStatusCode.Unauthorized,
          publicInfo: {
            message: 'Access token is invalid.',
          },
        });
      }

      return {
        client,
        payload,
      };
    },

    getAccessToken: async (client) => {
      const csrfToken = config.generateCsrfToken();

      const isSucceeded = await config.updateCsrfToken(client.id, csrfToken);

      if (!isSucceeded) {
        throw new InternalException({
          message: 'Could not update csrfToken in client.',
          meta: {
            description: [
              `Client.id: ${client.id}`,
              `Token to update: ${csrfToken}`,
            ],
          },
        });
      }

      const payload = config.createAccessTokenPayload(client, csrfToken);
      const token = config.signAccessToken(payload);

      return token;
    },
  };
}
