import { CSRF, PBKDF2 } from '../../helpers';
import { JWT } from '../../helpers/JWT';
import { IAuthenticationStrategy } from '../../interfaces/IAuthenticationStrategy';
import { CredentialsModel } from '../../models/CredentialsModel';
import { Credentials, CredentialsPartials } from '../../types';
export declare type RefreshTokenPayload = {
    readonly id: number;
    readonly csrfToken: string;
};
export declare class DefaultAuthenticationStrategy<M extends CredentialsPartials.Meta = null> implements IAuthenticationStrategy<M> {
    protected readonly pbkdf2: PBKDF2;
    protected readonly jwt: JWT<RefreshTokenPayload>;
    protected readonly csrf: CSRF;
    constructor(pbkdf2: PBKDF2, jwt: JWT<RefreshTokenPayload>, csrf: CSRF);
    getPasswordSalt(): string;
    getPasswordHash(password: string, salt: string): string;
    getRefreshToken(model: CredentialsModel<M>, credentials: Credentials<M>): Promise<string>;
    getCredentialsByRefreshToken(model: CredentialsModel<M>, token: string): Promise<Credentials<M>>;
}
