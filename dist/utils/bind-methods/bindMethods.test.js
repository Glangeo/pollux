"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
describe('binds methods in class', function () {
    var Sample = /** @class */ (function () {
        function Sample(name) {
            var _this = this;
            this.name = name;
            this.getNameComputed = function () { return _this.name; };
        }
        Sample.GET_GREETING = function () {
            return 'Hello, ';
        };
        Sample.prototype.getName = function () {
            return this.name;
        };
        Sample.prototype.setName = function (value) {
            this.name = value;
        };
        Object.defineProperty(Sample.prototype, "Name", {
            get: function () {
                return this.name;
            },
            enumerable: false,
            configurable: true
        });
        Sample = __decorate([
            _1.bindMethods
        ], Sample);
        return Sample;
    }());
    var NAME = 'Jhon';
    var sample = new Sample(NAME);
    it('binds methods correcly', function () {
        var method = sample.getName;
        var name = method();
        expect(name).toBe(NAME);
    });
    it('does not modify direct method call', function () {
        expect(sample.getName()).toBe(NAME);
    });
    it('saves all static methods and properties', function () {
        expect(Sample.GET_GREETING()).toBe('Hello, ');
    });
    it('do not change computed function properties', function () {
        var method = sample.getNameComputed;
        expect(method()).toBe(NAME);
    });
    it('does not change behaviour of getters and setters', function () {
        expect(sample.Name).toBe(NAME);
        sample.setName('Jeff');
        expect(sample.Name).toBe('Jeff');
    });
    it('saves constructor.name', function () {
        expect(sample.constructor.name).toBe('Sample');
    });
});
