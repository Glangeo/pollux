import { randomBytes, createHash, BinaryToTextEncoding } from 'crypto';

export class CSRF {
  public constructor(
    protected readonly saltSize = 1024,
    protected readonly algorithm: string = 'sha256',
    protected readonly encoding: BinaryToTextEncoding = 'hex'
  ) {}

  public getToken(): string {
    const salt = randomBytes(this.saltSize);
    const token = createHash(this.algorithm, salt)
      .update(salt)
      .digest(this.encoding);

    return token;
  }
}
