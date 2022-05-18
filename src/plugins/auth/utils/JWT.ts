import { sign, verify, SignOptions, VerifyOptions } from 'jsonwebtoken';
import { HTTPStatusCode } from 'src/api';
import { CoreTypes, ValidationException } from 'src/core';

export type Payload = CoreTypes.PlainTypes.Object;

export class JWT<P extends Payload> {
  public constructor(protected readonly secret: string) {}

  public getToken(payload: P, options?: SignOptions): string {
    const token = sign(payload, this.secret, options);

    return token;
  }

  public decodeToken(token: string, options?: VerifyOptions): P {
    try {
      const payload = verify(token, this.secret, options) as P;

      return payload;
    } catch (error) {
      throw new ValidationException({
        message: 'Token is invalid.',
        meta: {
          errors: [`Error: ${String(error)}`],
        },
        httpStatusCode: HTTPStatusCode.Unauthorized,
        publicInfo: {
          message: 'Token is invalid.',
        },
      });
    }
  }
}
