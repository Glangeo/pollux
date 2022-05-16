import { ClientModel } from '../models/ClientModel';
import { Client, ClientPartials } from '../types';

export interface IAuthorizationStrategy<
  T extends ClientPartials.Type = string,
  P extends ClientPartials.Permissions = null,
  M extends ClientPartials.Meta = null
> {
  getAccessToken(
    model: ClientModel<T, P, M>,
    client: Client<T, P, M>
  ): Promise<string>;

  getClientByAccessToken(
    model: ClientModel<T, P, M>,
    token: string
  ): Promise<Client<T, P, M>>;
}
