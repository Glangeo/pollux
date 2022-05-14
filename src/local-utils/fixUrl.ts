const DELIMITER = '://';

/**
 * Removes extra slashes from url, adds leading slash for relative urls, removes last slash
 *
 * @param url
 */
export function fixUrl(url: string): string {
  const protocolIndex = url.indexOf(DELIMITER);
  const hasProtocol = protocolIndex !== -1;
  let protocol: string | undefined = undefined;
  let urlToFix = url;

  if (protocolIndex !== -1) {
    const splitted = url.split(DELIMITER);

    protocol = splitted[0];
    urlToFix = splitted[1];
  }

  const fixedUrl = urlToFix.replace(/\/\/+/g, '/').replace(/\/$/, '');

  if (!hasProtocol) {
    return fixedUrl.replace(/^\/*/, '/');
  }

  return `${protocol}${DELIMITER}${fixedUrl}`;
}
