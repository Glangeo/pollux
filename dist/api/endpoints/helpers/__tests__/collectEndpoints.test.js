"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var collectEndpoints_1 = require("../collectEndpoints");
test('Collects endpoints correctly', function () {
    var endpoints = (0, collectEndpoints_1.collectEndpoints)(path_1.default.join(__dirname, '..', '__mocks__'));
    var routes = endpoints.map(function (_a) {
        var route = _a.route;
        return route;
    });
    expect(routes).toContain('/users/:id');
    expect(routes).toContain('/users/create');
    expect(routes).toContain('/users');
    expect(routes).toContain('/users/profile');
    expect(routes).toContain('/users/:id/friends');
    expect(routes).toContain('/users/:id/:friendId');
});
