import { NotFoundException, ValidationException } from 'src/core';
import { throwsException } from 'src/utils';
import { IAuthenticationStrategy } from '../interfaces/IAuthenticationStrategy';
import { ICredentialsDAO } from '../interfaces/ICredentialsDAO';
import { Credentials, CredentialsPartials } from '../types';

export class CredentialsModel<M extends CredentialsPartials.Meta = null> {
  public constructor(
    protected readonly dao: ICredentialsDAO<M>,
    protected readonly strategy: IAuthenticationStrategy<M>
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

    const salt = this.strategy.getPasswordSalt();
    const hashedPassword = this.strategy.getPasswordHash(password, salt);

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

  public async getRefreshToken(
    login: string,
    password: string
  ): Promise<string> {
    const credentials = await this.dao.getByLogin(login);
    const hashedPassword = this.strategy.getPasswordHash(
      password,
      credentials.salt
    );

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

    const refreshToken = this.strategy.getRefreshToken(this, credentials);

    return refreshToken;
  }

  public async getCredentialsByRefreshToken(
    token: string
  ): Promise<Credentials<M>> {
    return this.strategy.getCredentialsByRefreshToken(this, token);
  }

  public async updateCsrf(id: number, csrfToken: string): Promise<boolean> {
    return this.dao.updateCsrf(id, csrfToken);
  }
}
