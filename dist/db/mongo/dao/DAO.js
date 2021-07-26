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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DAO = void 0;
var NotFountException_1 = require("../../../exception/common/NotFountException");
var DBException_1 = require("../../../exception/common/DBException");
var DAO = /** @class */ (function () {
    function DAO(db, collection, options) {
        if (options === void 0) { options = {}; }
        this.db = db;
        this.collection = collection;
        this.options = options;
    }
    DAO.prototype.create = function (form) {
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
                        if (operation.result.ok) {
                            return [2 /*return*/, this.createEntityFromDBRecord(operation.ops[0])];
                        }
                        throw new DBException_1.DBException('DAO -> create(...)', [
                            "Collection name: " + this.collection.name,
                            "Data: " + JSON.stringify(data),
                        ]);
                }
            });
        });
    };
    DAO.prototype.getOne = function (query) {
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
                        throw new NotFountException_1.NotFoundException('DAO -> getOne(...)', [
                            "NOT_FOUND",
                            "Collection name: " + this.collection.name,
                            "Query: " + JSON.stringify(query),
                        ], {
                            key: 'E_NOT_FOUND',
                            details: [],
                        });
                }
            });
        });
    };
    DAO.prototype.getMany = function (query, options) {
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
    DAO.prototype.getAll = function () {
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
    DAO.prototype.updateOne = function (query, updates, options) {
        return __awaiter(this, void 0, void 0, function () {
            var dbCollection, operation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dbCollection = this.getDBCollection();
                        return [4 /*yield*/, dbCollection.updateOne(query, updates, options)];
                    case 1:
                        operation = _a.sent();
                        return [2 /*return*/, operation.result.ok === 1];
                }
            });
        });
    };
    DAO.prototype.getDBRecordField = function (query, fieldName) {
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
                        throw new NotFountException_1.NotFoundException('DAO -> getDBRecordField(...)', [
                            "Collection name: " + this.collection.name,
                            "Query: " + JSON.stringify(query),
                            "Field name: " + fieldName,
                        ]);
                }
            });
        });
    };
    DAO.prototype.getRecordsCount = function (query) {
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
    DAO.prototype.deleteOne = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var dbCollection, operation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dbCollection = this.getDBCollection();
                        return [4 /*yield*/, dbCollection.deleteOne(query)];
                    case 1:
                        operation = _a.sent();
                        return [2 /*return*/, operation.result.ok === 1];
                }
            });
        });
    };
    DAO.prototype.deleteMany = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var dbCollection, operation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dbCollection = this.getDBCollection();
                        return [4 /*yield*/, dbCollection.deleteMany(query)];
                    case 1:
                        operation = _a.sent();
                        return [2 /*return*/, operation.result.ok === 1];
                }
            });
        });
    };
    DAO.prototype.aggregate = function (pipeline, options) {
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
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    DAO.prototype.createIndex = function (fieldOrSpec, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDBCollection().createIndex(fieldOrSpec, options)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DAO.prototype.getDBCollection = function () {
        return this.db.collection(this.collection.name);
    };
    DAO.prototype.createEntityFromDBRecord = function (record) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        var _id = record._id, rest = __rest(record, ["_id"]);
        if (this.options.modelFactoryFunction) {
            return this.options.modelFactoryFunction(rest);
        }
        return this.collection.createEntityFromDBRecord(rest);
    };
    return DAO;
}());
exports.DAO = DAO;
