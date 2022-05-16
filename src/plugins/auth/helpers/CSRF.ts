import { randomBytes, createHash, BinaryToTextEncoding } from 'crypto';

export class CSRF {
  public constructor(
    protected readonly saltSize = 1024,
    protected readonly algorithm: string,
    protected readonly encoding: BinaryToTextEncoding
  ) {}

  public getToken(): string {
    const salt = randomBytes(this.saltSize);
    const token = createHash(this.algorithm, salt)
      .update(salt)
      .digest(this.encoding);

    return token;
  }
}
