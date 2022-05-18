"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disableCors = void 0;
function disableCors(express) {
    express.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        next();
    });
}
exports.disableCors = disableCors;
