"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadAliases = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
var path_1 = __importDefault(require("path"));
var module_alias_1 = __importDefault(require("module-alias"));
function loadAliases() {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    var tsconfig = require(path_1.default.join(process.cwd(), 'tsconfig.json'));
    for (var alias in tsconfig.compilerOptions.paths) {
        var aliasName = alias.replace('/*', '');
        var _a = __read(tsconfig.compilerOptions.paths[alias], 1), aliasPath = _a[0];
        var rawAliasPath = aliasPath.replace('/*', '');
        module_alias_1.default.addAlias(aliasName, path_1.default.join(process.cwd(), rawAliasPath));
    }
}
exports.loadAliases = loadAliases;
