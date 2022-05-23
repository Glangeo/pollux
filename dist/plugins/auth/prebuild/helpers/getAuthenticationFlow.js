"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthenticaionFlow = void 0;
var authentication_1 = require("../../authentication");
function getAuthenticaionFlow(credentialsModel, clientModel, jwt) {
    return (0, authentication_1.createAuthenticationFlow)({
        authenticate: function (login, password) {
            return credentialsModel.authenticate(login, password);
        },
        createClient: function (credentials, type, permissions, meta) { return clientModel.create(type, credentials.id, permissions, meta); },
        getClientById: function (id) { return clientModel.getById(id); },
        createRefreshTokenPayload: function (client) {
            return ({ id: client.id });
        },
        signRefreshToken: function (payload) {
            return jwt.getToken(payload, { expiresIn: '1y' });
        },
        verifyRefreshToken: function (token) { return jwt.decodeToken(token); },
    });
}
exports.getAuthenticaionFlow = getAuthenticaionFlow;
