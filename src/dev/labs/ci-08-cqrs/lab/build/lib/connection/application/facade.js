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
exports.ConnectionFacade = void 0;
class ConnectionFacade {
    // eslint-disable-next-line no-useless-constructor
    constructor(dialectService, poolService, acquireConnection, releaseConnection) {
        this.dialectService = dialectService;
        this.poolService = poolService;
        this.acquireConnection = acquireConnection;
        this.releaseConnection = releaseConnection;
    }
    addDialect(dialect, classConnectionPool) {
        this.dialectService.add(dialect, classConnectionPool);
        return this;
    }
    load(config) {
        this.poolService.load(config);
    }
    getConfig(name) {
        return this.poolService.get(name).config;
    }
    end() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.poolService.endAll();
        });
    }
    acquire(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.acquireConnection.acquire(name);
        });
    }
    release(connection) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.releaseConnection.release(connection);
        });
    }
}
exports.ConnectionFacade = ConnectionFacade;
//# sourceMappingURL=facade.js.map