import { ClientPartials } from '../../types';
import { AuthorizationFlow, AuthorizationFlowConfig, BaseAccessTokenPayload } from '../types';
export declare function createAuthorizationFlow<ClientType extends ClientPartials.Type, ClientPermissions extends ClientPartials.Permissions, ClientMeta extends ClientPartials.Meta, AccessTokenPayload extends BaseAccessTokenPayload>(config: AuthorizationFlowConfig<ClientType, ClientPermissions, ClientMeta, AccessTokenPayload>): AuthorizationFlow<ClientType, ClientPermissions, ClientMeta>;
