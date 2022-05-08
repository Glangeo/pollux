"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPStatusCode = void 0;
var HTTPStatusCode;
(function (HTTPStatusCode) {
    // 1xx
    HTTPStatusCode[HTTPStatusCode["Continue"] = 100] = "Continue";
    HTTPStatusCode[HTTPStatusCode["SwitchingProtocols"] = 101] = "SwitchingProtocols";
    HTTPStatusCode[HTTPStatusCode["EarlyHints"] = 103] = "EarlyHints";
    // 2xx
    HTTPStatusCode[HTTPStatusCode["Ok"] = 200] = "Ok";
    HTTPStatusCode[HTTPStatusCode["Created"] = 201] = "Created";
    HTTPStatusCode[HTTPStatusCode["Accepted"] = 202] = "Accepted";
    HTTPStatusCode[HTTPStatusCode["NonAuthoritativeInformation"] = 203] = "NonAuthoritativeInformation";
    HTTPStatusCode[HTTPStatusCode["NoContent"] = 204] = "NoContent";
    HTTPStatusCode[HTTPStatusCode["ResetContent"] = 205] = "ResetContent";
    HTTPStatusCode[HTTPStatusCode["PartialContent"] = 206] = "PartialContent";
    // 3xx
    HTTPStatusCode[HTTPStatusCode["MultipleChoise"] = 300] = "MultipleChoise";
    HTTPStatusCode[HTTPStatusCode["MovedPermanently"] = 301] = "MovedPermanently";
    HTTPStatusCode[HTTPStatusCode["Found"] = 302] = "Found";
    HTTPStatusCode[HTTPStatusCode["SeeOther"] = 303] = "SeeOther";
    HTTPStatusCode[HTTPStatusCode["NotModified"] = 304] = "NotModified";
    HTTPStatusCode[HTTPStatusCode["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    HTTPStatusCode[HTTPStatusCode["PermanentRedirect"] = 308] = "PermanentRedirect";
    // 4xx
    HTTPStatusCode[HTTPStatusCode["BadRequest"] = 400] = "BadRequest";
    HTTPStatusCode[HTTPStatusCode["Unauthorized"] = 401] = "Unauthorized";
    HTTPStatusCode[HTTPStatusCode["PaymentRequired"] = 402] = "PaymentRequired";
    HTTPStatusCode[HTTPStatusCode["Forbidden"] = 403] = "Forbidden";
    HTTPStatusCode[HTTPStatusCode["NotFound"] = 404] = "NotFound";
    HTTPStatusCode[HTTPStatusCode["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HTTPStatusCode[HTTPStatusCode["NotAcceptable"] = 406] = "NotAcceptable";
    HTTPStatusCode[HTTPStatusCode["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    HTTPStatusCode[HTTPStatusCode["RequestTimeount"] = 408] = "RequestTimeount";
    HTTPStatusCode[HTTPStatusCode["Conflict"] = 409] = "Conflict";
    HTTPStatusCode[HTTPStatusCode["Gone"] = 410] = "Gone";
    HTTPStatusCode[HTTPStatusCode["LengthRequired"] = 411] = "LengthRequired";
    HTTPStatusCode[HTTPStatusCode["PreconditionFailed"] = 412] = "PreconditionFailed";
    HTTPStatusCode[HTTPStatusCode["PayloadTooLarge"] = 413] = "PayloadTooLarge";
    HTTPStatusCode[HTTPStatusCode["URITooLong"] = 414] = "URITooLong";
    HTTPStatusCode[HTTPStatusCode["UnsupportedMediaType"] = 415] = "UnsupportedMediaType";
    HTTPStatusCode[HTTPStatusCode["RangeNotSatisfiable"] = 416] = "RangeNotSatisfiable";
    HTTPStatusCode[HTTPStatusCode["ExpectationFailed"] = 417] = "ExpectationFailed";
    HTTPStatusCode[HTTPStatusCode["IAmTeapot"] = 418] = "IAmTeapot";
    HTTPStatusCode[HTTPStatusCode["TooEarly"] = 425] = "TooEarly";
    HTTPStatusCode[HTTPStatusCode["UpgradeRequired"] = 426] = "UpgradeRequired";
    HTTPStatusCode[HTTPStatusCode["PreconditionRequired"] = 428] = "PreconditionRequired";
    HTTPStatusCode[HTTPStatusCode["TooManyRequests"] = 429] = "TooManyRequests";
    HTTPStatusCode[HTTPStatusCode["RequestHeaderFieldsTooLarge"] = 431] = "RequestHeaderFieldsTooLarge";
    HTTPStatusCode[HTTPStatusCode["UnavailableForLegalReasons"] = 451] = "UnavailableForLegalReasons";
    // 5xx
    HTTPStatusCode[HTTPStatusCode["InternalServerError"] = 500] = "InternalServerError";
    HTTPStatusCode[HTTPStatusCode["NotImplemented"] = 501] = "NotImplemented";
    HTTPStatusCode[HTTPStatusCode["BadGateway"] = 502] = "BadGateway";
    HTTPStatusCode[HTTPStatusCode["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HTTPStatusCode[HTTPStatusCode["GatewayTimeout"] = 504] = "GatewayTimeout";
    HTTPStatusCode[HTTPStatusCode["HTTPVersionNotSupported"] = 505] = "HTTPVersionNotSupported";
    HTTPStatusCode[HTTPStatusCode["VariantAlsoNegotiates"] = 506] = "VariantAlsoNegotiates";
    HTTPStatusCode[HTTPStatusCode["NotExtended"] = 510] = "NotExtended";
    HTTPStatusCode[HTTPStatusCode["NetworkAuthenticationRequired"] = 511] = "NetworkAuthenticationRequired";
})(HTTPStatusCode = exports.HTTPStatusCode || (exports.HTTPStatusCode = {}));
