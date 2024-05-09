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
exports.QueryActionsImpl = void 0;
class QueryActionsImpl {
    constructor(name, orm, stage) {
        this.name = name;
        this.stage = stage;
        this.orm = orm;
    }
    execute(query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.orm.execute(`${this.name}${query}`, data, { stage: this.stage });
        });
    }
    normalize(query) {
        return this.orm.normalize(`${this.name}${query}`);
    }
    model(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.orm.model(`${this.name}${query}`);
        });
    }
    parameters(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.orm.parameters(`${this.name}${query}`);
        });
    }
    constraints(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.orm.constraints(`${this.name}${query}`);
        });
    }
    metadata(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.orm.metadata(`${this.name}${query}`);
        });
    }
    plan(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.orm.plan(`${this.name}${query}`, { stage: this.stage });
        });
    }
}
exports.QueryActionsImpl = QueryActionsImpl;
//# sourceMappingURL=actions.js.map