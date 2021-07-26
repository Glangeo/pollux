"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNotFoundException = void 0;
var NotFountException_1 = require("../exception/common/NotFountException");
function isNotFoundException(exception) {
    return exception instanceof NotFountException_1.NotFoundException;
}
exports.isNotFoundException = isNotFoundException;
