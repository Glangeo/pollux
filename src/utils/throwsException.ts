import { Exception } from '../exception';

export async function throwsException<
  T extends new (...params: any) => Exception
>(func: () => Promise<any>, constructor: T) {
  try {
    await func();
  } catch (exception) {
    if (exception instanceof constructor) {
      return true;
    }
  }

  return false;
}
