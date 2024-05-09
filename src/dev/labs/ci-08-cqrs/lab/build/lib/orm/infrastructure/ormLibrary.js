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
exports.OrmLibrary = void 0;
class OrmLibrary {
    // eslint-disable-next-line no-useless-constructor
    constructor(orm) {
        this.orm = orm;
    }
    load() {
        this.orm.exp.addFunction('orm.execute(query:string,data:any,options:any):any', (query, data, options) => __awaiter(this, void 0, void 0, function* () {
            if (query !== undefined && query !== null && query.trim() !== '') {
                return yield this.orm.execute(query, data, options);
            }
            return null;
        }), { async: true, description: 'Execute query' });
        this.orm.exp.addFunction('orm.plan(query:string,options:any):any', (query, options) => {
            if (query !== undefined && query !== null && query.trim() !== '') {
                return this.orm.plan(query, options);
            }
            return null;
        }, { description: 'Plan of query' });
        this.orm.exp.addFunction('orm.metadata(query:string):any', (query) => {
            if (query !== undefined && query !== null && query.trim() !== '') {
                return this.orm.metadata(query);
            }
            return null;
        }, { description: 'Get metadata from query' });
        this.orm.exp.addFunction('orm.model(query:string):any', (query) => {
            if (query !== undefined && query !== null && query.trim() !== '') {
                return this.orm.model(query);
            }
            return null;
        }, { description: 'Get model from query' });
        this.orm.exp.addFunction('orm.parameters(query:string):any', (query) => {
            if (query !== undefined && query !== null && query.trim() !== '') {
                return this.orm.parameters(query);
            }
            return null;
        }, { description: 'Get parameters from query' });
        this.orm.exp.addFunction('orm.constraints(query:string):any', (query) => {
            if (query !== undefined && query !== null && query.trim() !== '') {
                return this.orm.constraints(query);
            }
            return null;
        }, { description: 'Get constraints from query' });
    }
}
exports.OrmLibrary = OrmLibrary;
//# sourceMappingURL=ormLibrary.js.map