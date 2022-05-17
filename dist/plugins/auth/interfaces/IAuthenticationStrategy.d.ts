import { CredentialsModel } from '../models/CredentialsModel';
import { Credentials, CredentialsPartials } from '../types';
export interface IAuthenticationStrategy<M extends CredentialsPartials.Meta = null> {
    getPasswordSalt(): string;
    getPasswordHash(password: string, salt: string): string;
    getRefreshToken(model: CredentialsModel<M>, credentials: Credentials<M>): Promise<string>;
    getCredentialsByRefreshToken(model: CredentialsModel<M>, token: string): Promise<Credentials<M>>;
}
