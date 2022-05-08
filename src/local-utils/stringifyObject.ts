export function stringifyObject(obj: any): string {
  return JSON.stringify(obj, null, 2);
}
