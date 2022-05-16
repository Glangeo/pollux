import { IClientDAO } from '../interfaces';
import { Client, ClientPartials } from '../types';

export class ClientModel<
  T extends ClientPartials.Type = string,
  P extends ClientPartials.Permissions = null,
  M extends ClientPartials.Meta = null
> {
  public constructor(protected readonly dao: IClientDAO<T, P, M>) {}

  public async create(
    type: T,
    credentialsId: number,
    permissions: P,
    meta: M
  ): Promise<Client<T, P, M>> {
    const client = await this.dao.create(
      type,
      credentialsId,
      permissions,
      meta
    );

    return client;
  }

  public async getById(id: number): Promise<Client<T, P, M>> {
    return this.dao.getById(id);
  }

  public async updateCsrf(id: number, token: string): Promise<boolean> {
    return this.dao.updateCsrf(id, token, Date.now());
  }

  public async block(id: number): Promise<boolean> {
    return this.dao.block(id);
  }
}
