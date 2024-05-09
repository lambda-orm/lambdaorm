"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialectPoolService = void 0;
const domain_1 = require("../../domain");
class DialectPoolService {
    constructor(helper) {
        this.helper = helper;
        this.dialectsPool = {};
    }
    add(dialect, classConnectionPool) {
        this.dialectsPool[dialect] = classConnectionPool;
    }
    create(config) {
        const DialectPool = this.dialectsPool[config.dialect];
        if (DialectPool === undefined) {
            throw new domain_1.ConnectionError(`Connection to ${config.name} whit dialect ${config.dialect} not supported`);
        }
        return new DialectPool(config, this.helper);
    }
}
exports.DialectPoolService = DialectPoolService;
//# sourceMappingURL=dialectPoolService.js.map