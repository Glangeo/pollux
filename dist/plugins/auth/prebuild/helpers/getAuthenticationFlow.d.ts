import { BaseRefreshTokenPayload } from '../../authentication';
import { ClientPartials, CredentialsPartials } from '../../types';
import { JWT } from '../../utils';
import { ClientModel, CredentialsModel } from '../models';
export declare function getAuthenticaionFlow<M extends CredentialsPartials.Meta = null, CT extends ClientPartials.Type = string, CP extends ClientPartials.Permissions = null, CM extends ClientPartials.Meta = null>(credentialsModel: CredentialsModel<M>, clientModel: ClientModel<CT, CP, CM>, jwt: JWT<BaseRefreshTokenPayload>): import("../../authentication").AuthenticationFlow<M, CT, CP, CM, [type: CT, permissions: CP, meta: CM], BaseRefreshTokenPayload>;
