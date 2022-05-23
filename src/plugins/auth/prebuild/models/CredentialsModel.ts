import { NotFoundException, ValidationException } from 'src/core';
import { throwsException } from 'src/utils';
import { Credentials, CredentialsPartials } from '../../types';
import { PBKDF2 } from '../../utils';
import { ICredentialsDAO } from '../interfaces';

export class CredentialsModel<M extends CredentialsPartials.Meta = null> {
  public constructor(
    protected readonly dao: ICredentialsDAO<M>,
    protected readonly pbkdf2: PBKDF2
  ) {}

  public async create(
    login: string,
    password: string,
    meta: M
  ): Promise<Credentials<M>> {
    const isLoginUnique = await throwsException(
      () => this.dao.getByLogin(login),
      NotFoundException
    );

    if (!isLoginUnique) {
      throw new ValidationException({
        message:
          'Given login is already exist. Credentials.login must be unique.',
        meta: {
          errors: [],
        },
        publicInfo: {
          message: 'Login is already exist. Try another one',
        },
      });
    }

    const salt = this.pbkdf2.generateSalt();
    const hashedPassword = this.pbkdf2.getHash(password, salt);

    const credentials = await this.dao.create(
      login,
      hashedPassword,
      salt,
      meta
    );

    return credentials;
  }

  public async getById(id: number): Promise<Credentials<M>> {
    return this.dao.getById(id);
  }

  public async getByLogin(login: string): Promise<Credentials<M>> {
    return this.dao.getByLogin(login);
  }

  public async authenticate(
    login: string,
    password: string
  ): Promise<Credentials<M>> {
    const credentials = await this.dao.getByLogin(login);
    const hashedPassword = this.pbkdf2.getHash(password, credentials.salt);

    if (hashedPassword !== credentials.hashedPassword) {
      throw new ValidationException({
        message: 'Password is invalid.',
        meta: {
          errors: ['Password hashes are not match.'],
        },
        publicInfo: {
          message: 'Password is invalid.',
        },
      });
    }

    return credentials;
  }
}
