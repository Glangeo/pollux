"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDAO = void 0;
var DAO_1 = require("../DAO");
function getDAO(db, collection) {
    var dao = new DAO_1.DAO(db, collection);
    return dao;
}
exports.getDAO = getDAO;
