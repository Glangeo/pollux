"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContext = void 0;
var Context_1 = require("../Context");
/**
 * Gets Context instance from response.
 * @warning If there is no context in response, getContext will create in automatically with extendableState as {}
 *
 * @param req express request
 * @param res express response
 * @returns Context
 */
function getContext(req, res) {
    var context = res.locals.context;
    if (!context) {
        var newContext = new Context_1.Context({
            route: req.path,
            params: req.params,
            query: req.query,
            body: req.body,
            extendableState: {},
        });
        res.locals.context = newContext;
        return newContext;
    }
    return context;
}
exports.getContext = getContext;
