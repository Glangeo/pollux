/**
 * Removes extra slashes from route path
 *
 * @param path - raw route path
 * @returns - route path without extra slashes
 */
export function fixRoutePath(path: string): string {
  const result = path
    .replace(/\/\/+/g, '/')
    .replace(/\/$/, '')
    .replace(/^\/*/, '/');

  return result;
}
