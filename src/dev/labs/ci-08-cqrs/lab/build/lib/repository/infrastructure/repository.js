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
exports.Repository = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO: solve
const __1 = require("../../");
const domain_1 = require("../domain");
const lambdaorm_base_1 = require("lambdaorm-base");
class Repository {
    // eslint-disable-next-line no-useless-constructor
    constructor(name, stage, orm = __1.orm) {
        this.name = name;
        this.stage = stage;
        this.orm = orm;
    }
    upsert(entity, include) {
        return this._execute(`${this.name}.upsert()`, undefined, include, entity);
    }
    bulkDelete(entities, include) {
        return this._execute(`${this.name}.bulkDelete()`, undefined, include, entities);
    }
    bulkMerge(entities, include) {
        return this._execute(`${this.name}.bulkMerge()`, undefined, include, entities);
    }
    _execute(head_1, filter_1, include_1) {
        return __awaiter(this, arguments, void 0, function* (head, filter, include, data = {}) {
            let query = `${head}`;
            if (filter !== undefined) {
                query = `${query}.filter(${filter.toString()})`;
            }
            if (include !== undefined) {
                query = `${query}.include(${include.toString()})`;
            }
            return this.orm.execute(query, data, { stage: this.stage });
        });
    }
    execute(query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.orm.execute(`${this.name}${query}`, data, { stage: this.stage });
        });
    }
    insert(entity, include) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._execute(`${this.name}.insert()`, undefined, include, entity);
        });
    }
    bulkInsert(entities, include) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._execute(`${this.name}.bulkInsert()`, undefined, include, entities);
        });
    }
    update(entity, include) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._execute(`${this.name}.update()`, undefined, include, entity);
        });
    }
    updateAll(data, map, filter, include) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._execute(`${this.name}.updateAll(${map.toString()})`, filter, include, data);
        });
    }
    merge(entity, include) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._execute(`${this.name}.merge()`, undefined, include, entity);
        });
    }
    delete(entity, include) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._execute(`${this.name}.delete()`, undefined, include, entity);
        });
    }
    deleteAll(data, filter, include) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._execute(`${this.name}.deleteAll()`, filter, include, data);
        });
    }
    list(data, filter, include) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._execute(`${this.name}`, filter, include, data);
        });
    }
    distinct(data, filter, include) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._execute(`${this.name}.distinct()`, filter, include, data);
        });
    }
    first(data, filter, include) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._execute(`${this.name}.first()`, filter, include, data);
            if (result.length >= 1) {
                return result[0];
            }
            else {
                return null;
            }
        });
    }
    last(data, filter, include) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._execute(`${this.name}.last()`, filter, include, data);
            if (result.length >= 1) {
                return result[0];
            }
            else {
                return null;
            }
        });
    }
    query() {
        return new lambdaorm_base_1.Queryable(new domain_1.QueryActionsImpl(this.name, this.orm, this.stage), '');
    }
}
exports.Repository = Repository;
//# sourceMappingURL=repository.js.map