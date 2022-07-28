"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCollectionAdapter = void 0;
var CollectionAdapter_1 = require("../CollectionAdapter");
function getCollectionAdapter(db, collection, options, session) {
    var adapter = new CollectionAdapter_1.CollectionAdapter(db, collection, options, session);
    return adapter;
}
exports.getCollectionAdapter = getCollectionAdapter;
