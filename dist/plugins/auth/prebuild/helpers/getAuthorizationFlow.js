"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthorizationFlow = void 0;
var authorization_1 = require("../../authorization");
function getAuthorizationFlow(clientModel, jwt, csrf) {
    return (0, authorization_1.createAuthorizationFlow)({
        getClientById: function (id) { return clientModel.getById(id); },
        generateCsrfToken: function () { return csrf.getToken(); },
        createAccessTokenPayload: function (client, csrfToken) { return ({
            csrfToken: csrfToken,
            id: client.id,
        }); },
        signAccessToken: function (payload) { return jwt.getToken(payload, { expiresIn: '1w' }); },
        verifyAccessToken: function (token) { return jwt.decodeToken(token); },
        updateCsrfToken: function (clientId, token) {
            return clientModel.updateCsrf(clientId, token);
        },
    });
}
exports.getAuthorizationFlow = getAuthorizationFlow;
