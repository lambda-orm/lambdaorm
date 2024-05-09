"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageBase = void 0;
const lambdaorm_base_1 = require("lambdaorm-base");
const application_1 = require("../../application");
class LanguageBase {
    constructor(name, dialects) {
        this.name = name;
        this.dialects = [];
        for (const p in dialects) {
            const data = dialects[p];
            const dialect = new application_1.DialectService(p, data);
            this.dialects.push(dialect);
        }
    }
    getDialect(name) {
        const dialect = this.dialects.find(p => p.name === name);
        if (!dialect) {
            throw new lambdaorm_base_1.NotImplemented(`Dialect ${name} not implemented`);
        }
        return dialect;
    }
}
exports.LanguageBase = LanguageBase;
//# sourceMappingURL=languageBase.js.map