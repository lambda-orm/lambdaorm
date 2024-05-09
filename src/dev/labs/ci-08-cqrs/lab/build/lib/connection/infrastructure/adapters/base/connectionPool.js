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
exports.ConnectionPoolAdapter = void 0;
class ConnectionPoolAdapter {
    constructor(config, helper) {
        this.helper = helper;
        this.connections = [];
        this.config = config;
    }
    acquire() {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.helper.uuid.v4();
            const connection = yield this.create(id);
            this.connections.push(connection);
            return connection;
        });
    }
    release(connection) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connection.end();
            const index = this.connections.findIndex(p => p.id === connection.id);
            if (index > -1) {
                this.connections.splice(index, 1);
            }
        });
    }
    end() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const connection of this.connections) {
                yield this.release(connection);
            }
        });
    }
}
exports.ConnectionPoolAdapter = ConnectionPoolAdapter;
//# sourceMappingURL=connectionPool.js.map