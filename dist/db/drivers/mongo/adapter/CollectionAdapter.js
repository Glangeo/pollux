"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionAdapter = void 0;
var prebuild_1 = require("../../../../core/exception/prebuild");
var local_utils_1 = require("../../../../local-utils");
var CollectionAdapter = /** @class */ (function () {
    function CollectionAdapter(db, collection, options) {
        if (options === void 0) { options = {}; }
        this.db = db;
        this.collection = collection;
        this.options = options;
    }
    CollectionAdapter.prototype.create = function (form) {
        return __awaiter(this, void 0, void 0, function () {
            var dbCollection, defaultValues, data, operation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dbCollection = this.getDBCollection();
                        return [4 /*yield*/, this.collection.getRecordDefaultFields()];
                    case 1:
                        defaultValues = _a.sent();
                        data = __assign(__assign({}, defaultValues), form);
                        return [4 /*yield*/, dbCollection.insertOne(
                            // TODO: fix this type somehow
                            data)];
                    case 2:
                        operation = _a.sent();
                        if (operation.acknowledged) {
                            return [2 /*return*/, this.getOne({ _id: operation.insertedId })];
                        }
                        throw new prebuild_1.InternalException({
                            message: 'Could not create entity.',
                            meta: {
                                description: [
                                    "Collection name: ".concat(this.collection.name),
                                    "Data: ".concat((0, local_utils_1.stringifyObject)(data)),
                                ],
                            },
                        });
                }
            });
        });
    };
    CollectionAdapter.prototype.createMany = function (form) {
        return __awaiter(this, void 0, void 0, function () {
            var dbCollection, processedData, form_1, form_1_1, inputData, defaultValues, e_1_1, operation, ids;
            var e_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        dbCollection = this.getDBCollection();
                        processedData = [];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, 7, 8]);
                        form_1 = __values(form), form_1_1 = form_1.next();
                        _b.label = 2;
                    case 2:
                        if (!!form_1_1.done) return [3 /*break*/, 5];
                        inputData = form_1_1.value;
                        return [4 /*yield*/, this.collection.getRecordDefaultFields()];
                    case 3:
                        defaultValues = _b.sent();
                        processedData.push(__assign(__assign({}, defaultValues), inputData));
                        _b.label = 4;
                    case 4:
                        form_1_1 = form_1.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (form_1_1 && !form_1_1.done && (_a = form_1.return)) _a.call(form_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 8: return [4 /*yield*/, dbCollection.insertMany(processedData)];
                    case 9:
                        operation = _b.sent();
                        if (operation.acknowledged) {
                            ids = Object.keys(operation.insertedIds).reduce(function (ids, index) { return __spreadArray(__spreadArray([], __read(ids), false), [operation.insertedIds[Number(index)]], false); }, []);
                            return [2 /*return*/, this.getMany({ _id: { $in: ids } })];
                        }
                        throw new prebuild_1.InternalException({
                            message: 'Could not create entity.',
                            meta: {
                                description: [
                                    "Collection name: ".concat(this.collection.name),
                                    "Data: ".concat((0, local_utils_1.stringifyObject)(processedData)),
                                ],
                            },
                        });
                }
            });
        });
    };
    CollectionAdapter.prototype.getOne = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var dbCollection, document;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dbCollection = this.getDBCollection();
                        return [4 /*yield*/, dbCollection.findOne(query)];
                    case 1:
                        document = _a.sent();
                        if (document) {
                            return [2 /*return*/, this.createEntityFromDBRecord(document)];
                        }
                        throw new prebuild_1.NotFoundException({
                            message: 'Entity is not found.',
                            meta: {
                                collection: this.collection.name,
                                query: (0, local_utils_1.stringifyObject)(query),
                            },
                        });
                }
            });
        });
    };
    CollectionAdapter.prototype.getMany = function (query, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var dbCollection, dbQuery, documents;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dbCollection = this.getDBCollection();
                        dbQuery = dbCollection.find(query, options);
                        return [4 /*yield*/, dbQuery.toArray()];
                    case 1:
                        documents = _a.sent();
                        if (documents.length > 0) {
                            return [2 /*return*/, documents.map(function (document) {
                                    return _this.createEntityFromDBRecord(document);
                                })];
                        }
                        return [2 /*return*/, []];
                }
            });
        });
    };
    CollectionAdapter.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dbCollection, dbQuery, documents;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dbCollection = this.getDBCollection();
                        dbQuery = dbCollection.find();
                        return [4 /*yield*/, dbQuery.toArray()];
                    case 1:
                        documents = _a.sent();
                        if (documents.length > 0) {
                            return [2 /*return*/, documents.map(function (document) {
                                    return _this.createEntityFromDBRecord(document);
                                })];
                        }
                        return [2 /*return*/, []];
                }
            });
        });
    };
    CollectionAdapter.prototype.getDBRecordField = function (query, fieldName) {
        return __awaiter(this, void 0, void 0, function () {
            var dbCollection, document;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dbCollection = this.getDBCollection();
                        return [4 /*yield*/, dbCollection.findOne(query)];
                    case 1:
                        document = _a.sent();
                        if (document) {
                            return [2 /*return*/, document[fieldName]];
                        }
                        throw new prebuild_1.NotFoundException({
                            message: 'Entity is not found.',
                            meta: {
                                collection: this.collection.name,
                                query: (0, local_utils_1.stringifyObject)(query),
                            },
                        });
                }
            });
        });
    };
    CollectionAdapter.prototype.getRecordsCount = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var dbCollection, count;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dbCollection = this.getDBCollection();
                        return [4 /*yield*/, dbCollection.countDocuments(query)];
                    case 1:
                        count = _a.sent();
                        return [2 /*return*/, count];
                }
            });
        });
    };
    CollectionAdapter.prototype.updateOne = function (query, updates, options) {
        return __awaiter(this, void 0, void 0, function () {
            var dbCollection, operation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dbCollection = this.getDBCollection();
                        return [4 /*yield*/, dbCollection.updateOne(query, updates, options || {})];
                    case 1:
                        operation = _a.sent();
                        return [2 /*return*/, Boolean(operation.acknowledged && operation.matchedCount)];
                }
            });
        });
    };
    CollectionAdapter.prototype.updateMany = function (query, updates, options) {
        return __awaiter(this, void 0, void 0, function () {
            var dbCollection, operation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dbCollection = this.getDBCollection();
                        return [4 /*yield*/, dbCollection.updateMany(query, updates, options || {})];
                    case 1:
                        operation = _a.sent();
                        return [2 /*return*/, Boolean(operation.acknowledged && operation.matchedCount)];
                }
            });
        });
    };
    CollectionAdapter.prototype.deleteOne = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var dbCollection, operation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dbCollection = this.getDBCollection();
                        return [4 /*yield*/, dbCollection.deleteOne(query)];
                    case 1:
                        operation = _a.sent();
                        return [2 /*return*/, Boolean(operation.acknowledged && operation.deletedCount)];
                }
            });
        });
    };
    CollectionAdapter.prototype.deleteMany = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var dbCollection, operation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dbCollection = this.getDBCollection();
                        return [4 /*yield*/, dbCollection.deleteMany(query)];
                    case 1:
                        operation = _a.sent();
                        return [2 /*return*/, Boolean(operation.acknowledged && operation.deletedCount)];
                }
            });
        });
    };
    CollectionAdapter.prototype.aggregate = function (pipeline, options) {
        return __awaiter(this, void 0, void 0, function () {
            var dbCollection, documents;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dbCollection = this.getDBCollection();
                        return [4 /*yield*/, dbCollection.aggregate(pipeline, options).toArray()];
                    case 1:
                        documents = _a.sent();
                        if (documents.length > 0) {
                            return [2 /*return*/, documents.map(function (document) {
                                    return _this.createEntityFromDBRecord(document);
                                })];
                        }
                        return [2 /*return*/, []];
                }
            });
        });
    };
    CollectionAdapter.prototype.createIndex = function (fieldOrSpec, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDBCollection().createIndex(fieldOrSpec, options || {})];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CollectionAdapter.prototype.getDBCollection = function () {
        return this.db.collection(this.collection.name);
    };
    CollectionAdapter.prototype.createEntityFromDBRecord = function (record) {
        if (this.options.entityFactoryFunction) {
            return this.options.entityFactoryFunction(record);
        }
        return this.collection.createEntityFromDBRecord(record);
    };
    return CollectionAdapter;
}());
exports.CollectionAdapter = CollectionAdapter;
