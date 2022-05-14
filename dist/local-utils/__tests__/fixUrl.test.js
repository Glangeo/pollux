"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fixUrl_1 = require("../fixUrl");
describe('fixes relative url correclty', function () {
    it('do not change correct route', function () {
        var route = (0, fixUrl_1.fixUrl)('/route/sample');
        expect(route).toBe('/route/sample');
    });
    it('adds leading slash', function () {
        var route = (0, fixUrl_1.fixUrl)('route/sample');
        expect(route).toBe('/route/sample');
    });
    it('fixes url with two slashes', function () {
        var route = (0, fixUrl_1.fixUrl)('/route//sample');
        expect(route).toBe('/route/sample');
    });
    it('fixes url with many slashes', function () {
        var route = (0, fixUrl_1.fixUrl)('///route//sample//');
        expect(route).toBe('/route/sample');
    });
});
describe('fixes absolute routes correctly', function () {
    it('do not change correct route', function () {
        var route = (0, fixUrl_1.fixUrl)('https://route.com/sample');
        expect(route).toBe('https://route.com/sample');
    });
    it('removes extra slashes in url', function () {
        var route = (0, fixUrl_1.fixUrl)('https://route.com/sample//get');
        expect(route).toBe('https://route.com/sample/get');
    });
});
