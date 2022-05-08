"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setContext = void 0;
/**
 * Stores Context in response.locals field
 *
 * @param context Context
 * @param res express response
 */
function setContext(context, res) {
    res.locals.context = context;
}
exports.setContext = setContext;
