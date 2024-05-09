"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrmH3lp = exports.CryptoHelper = void 0;
const lambdaorm_base_1 = require("lambdaorm-base");
const CryptoJS = require('crypto-js');
class CryptoHelper {
    encrypt(value, key) {
        return CryptoJS.AES.encrypt(value, key).toString();
    }
    decrypt(value, key) {
        return CryptoJS.AES.decrypt(value, key).toString(CryptoJS.enc.Utf8);
    }
    toBase64(value) {
        return CryptoJS.enc.Base64.parse(value);
    }
    getBase64(value) {
        return CryptoJS.enc.Base64.stringify(value);
    }
}
exports.CryptoHelper = CryptoHelper;
class OrmH3lp extends lambdaorm_base_1.OrmBaseH3lp {
    constructor(h3lp, logger) {
        super(h3lp, logger);
        this.crypto = new CryptoHelper();
    }
}
exports.OrmH3lp = OrmH3lp;
//# sourceMappingURL=helper.js.map