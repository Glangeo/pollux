import { Exception } from '../Exception';

export class NotFoundException extends Exception {
  public readonly type = 'validation';
}
