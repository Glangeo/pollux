"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultRoutes = void 0;
var createCreationRoute_1 = require("./common/createCreationRoute");
var createDeletionRoute_1 = require("./common/createDeletionRoute");
var createEditionRoute_1 = require("./common/createEditionRoute");
var createGetRoute_1 = require("./common/createGetRoute");
function getDefaultRoutes(collection, exclude, schemas, middleware) {
    if (exclude === void 0) { exclude = {
        create: false,
        get: false,
        edit: false,
        delete: false,
    }; }
    if (schemas === void 0) { schemas = {}; }
    if (middleware === void 0) { middleware = []; }
    var routes = [];
    if (!exclude.create && schemas.create) {
        routes.push(createCreationRoute_1.createCreationRoute(collection, schemas.create, middleware));
    }
    if (!exclude.get) {
        routes.push(createGetRoute_1.createGetRoute(collection, middleware));
    }
    if (!exclude.edit && schemas.edit) {
        routes.push(createEditionRoute_1.createEditionRoute(collection, schemas.edit));
    }
    if (!exclude.delete) {
        routes.push(createDeletionRoute_1.createDeletionRoute(collection));
    }
    return routes;
}
exports.getDefaultRoutes = getDefaultRoutes;
