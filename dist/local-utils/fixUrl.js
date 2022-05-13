"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixUrl = void 0;
var DELIMITER = '://';
/**
 * Removes extra slashes from url, adds leading slash for relative urls, removes last slash
 *
 * @param url
 */
function fixUrl(url) {
    var protocolIndex = url.indexOf(DELIMITER);
    var hasProtocol = protocolIndex !== -1;
    var protocol = undefined;
    var urlToFix = url;
    if (protocolIndex !== -1) {
        var splitted = url.split(DELIMITER);
        protocol = splitted[0];
        urlToFix = splitted[1];
    }
    var fixedUrl = urlToFix.replace(/\/\/+/g, '/').replace(/\/$/, '');
    if (!hasProtocol) {
        return fixedUrl.replace(/^\/*/, '/');
    }
    return "".concat(protocol).concat(DELIMITER).concat(fixedUrl);
}
exports.fixUrl = fixUrl;
