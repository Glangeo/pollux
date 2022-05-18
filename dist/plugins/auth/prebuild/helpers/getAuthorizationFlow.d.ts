import { AuthorizationFlow, BaseAccessTokenPayload } from '../../authorization';
import { ClientPartials } from '../../types';
import { CSRF, JWT } from '../../utils';
import { ClientModel } from '../models';
export declare function getAuthorizationFlow<CT extends ClientPartials.Type = string, CP extends ClientPartials.Permissions = null, CM extends ClientPartials.Meta = null>(clientModel: ClientModel<CT, CP, CM>, jwt: JWT<BaseAccessTokenPayload>, csrf: CSRF): AuthorizationFlow<CT, CP, CM, BaseAccessTokenPayload>;
