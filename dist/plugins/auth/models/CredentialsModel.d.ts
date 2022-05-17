import { IAuthenticationStrategy } from '../interfaces/IAuthenticationStrategy';
import { ICredentialsDAO } from '../interfaces/ICredentialsDAO';
import { Credentials, CredentialsPartials } from '../types';
export declare class CredentialsModel<M extends CredentialsPartials.Meta = null> {
    protected readonly dao: ICredentialsDAO<M>;
    protected readonly strategy: IAuthenticationStrategy<M>;
    constructor(dao: ICredentialsDAO<M>, strategy: IAuthenticationStrategy<M>);
    create(login: string, password: string, meta: M): Promise<Credentials<M>>;
    getById(id: number): Promise<Credentials<M>>;
    getByLogin(login: string): Promise<Credentials<M>>;
    getRefreshToken(login: string, password: string): Promise<string>;
    getCredentialsByRefreshToken(token: string): Promise<Credentials<M>>;
    updateCsrf(id: number, csrfToken: string): Promise<boolean>;
}
