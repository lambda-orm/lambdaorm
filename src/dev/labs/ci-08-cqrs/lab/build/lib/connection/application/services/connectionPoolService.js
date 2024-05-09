"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionPoolService = void 0;
const domain_1 = require("../../domain");
class ConnectionPoolService {
    // eslint-disable-next-line no-useless-constructor
    constructor(dialectPoolService) {
        this.dialectPoolService = dialectPoolService;
        this.pools = {};
    }
    load(config) {
        this.pools[config.name] = this.dialectPoolService.create(config);
    }
    get(name) {
        const pool = this.pools[name];
        if (!pool) {
            throw new domain_1.ConnectionError(`connection ${name} not found`);
        }
        return pool;
    }
    end(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = this.pools[name];
            if (pool) {
                yield pool.end();
            }
        });
    }
    endAll() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const k in this.pools) {
                const pool = this.pools[k];
                yield pool.end();
            }
        });
    }
}
exports.ConnectionPoolService = ConnectionPoolService;
//# sourceMappingURL=connectionPoolService.js.map