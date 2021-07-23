import * as Yup from 'yup';

export interface IFieldError {
  fieldName: string;
  message: string;
}

export interface IValidatationResult<T extends Record<string, unknown>> {
  errors?: IFieldError[];
  data?: T;
}

export class Validator {
  public constructor(
    private data: unknown,
    private schema: Yup.ObjectSchema<any>
  ) {}

  public async validate<T extends Record<string, unknown>>(): Promise<
    IValidatationResult<T>
  > {
    try {
      const data = (await this.schema.validate(this.data, {
        stripUnknown: true,
      })) as T;

      return { data };
    } catch (exception) {
      if (exception.name === 'ValidationError') {
        const error = exception as Yup.ValidationError;
        const { path, message } = error;
        const errors: IFieldError[] = [];

        errors.push({ fieldName: path || '__PATH_NOT_STATED', message });

        return { errors };
      }
      throw exception;
    }
  }
}
