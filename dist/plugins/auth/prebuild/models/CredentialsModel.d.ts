import { Credentials, CredentialsPartials } from '../../types';
import { PBKDF2 } from '../../utils';
import { ICredentialsDAO } from '../interfaces';
export declare class CredentialsModel<M extends CredentialsPartials.Meta = null> {
    protected readonly dao: ICredentialsDAO<M>;
    protected readonly pbkdf2: PBKDF2;
    constructor(dao: ICredentialsDAO<M>, pbkdf2: PBKDF2);
    create(login: string, password: string, meta: M): Promise<Credentials<M>>;
    getById(id: number): Promise<Credentials<M>>;
    getByLogin(login: string): Promise<Credentials<M>>;
    authenticate(login: string, password: string): Promise<Credentials<M>>;
}
