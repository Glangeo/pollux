import { randomBytes, pbkdf2Sync } from 'crypto';

export type SaltOptions = {
  size?: number;
  encoding?: BufferEncoding;
};

export type HashOptions = {
  iterations?: number;
  keylen?: number;
  digest?: string;
  encoding?: BufferEncoding;
};

export class PBKDF2 {
  public constructor(
    protected readonly options: { salt?: SaltOptions; hash?: HashOptions } = {}
  ) {}

  public generateSalt(): string {
    const { salt: saltOptions = {} } = this.options;
    const { size = 1024, encoding = 'hex' } = saltOptions;

    const salt = randomBytes(size).toString(encoding);

    return salt;
  }

  public getHash(password: string, salt: string): string {
    const { hash: hashOptions = {} } = this.options;
    const {
      iterations = 2000,
      keylen = 64,
      digest = 'sha512',
      encoding = 'hex',
    } = hashOptions;

    const hash = pbkdf2Sync(
      password,
      salt,
      iterations,
      keylen,
      digest
    ).toString(encoding);

    return hash;
  }
}
