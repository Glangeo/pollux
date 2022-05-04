export type Primitive = number | string | boolean | symbol | null | undefined;

export type PlainObject = {
  [K in string | number]: Primitive | Primitive[] | PlainObject | PlainObject[];
};
