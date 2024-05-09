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
exports.StageModelService = exports.StageMappingService = void 0;
const lambdaorm_base_1 = require("lambdaorm-base");
class StageStateService {
    // eslint-disable-next-line no-useless-constructor
    constructor(schemaState, helper) {
        this.schemaState = schemaState;
        this.helper = helper;
    }
    get schemaDirPath() {
        return this.schemaState.schemaPath ? this.helper.fs.dirname(this.schemaState.schemaPath) : process.cwd();
    }
    get(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = this.getFile(name);
            const exists = yield this.helper.fs.exists(file);
            if (exists) {
                const content = yield this.helper.fs.read(file);
                if (content) {
                    return JSON.parse(content);
                }
            }
            return this.empty();
        });
    }
    update(name, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = this.getFile(name);
            yield this.helper.fs.write(file, JSON.stringify(data));
        });
    }
    remove(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = this.getFile(name);
            yield this.helper.fs.remove(file);
        });
    }
}
class StageMappingService extends StageStateService {
    empty() {
        return { mapping: [], pending: [], inconsistency: [] };
    }
    getFile(name) {
        var _a, _b;
        return this.helper.fs.join(this.schemaDirPath, ((_b = (_a = this.schemaState.schema.infrastructure) === null || _a === void 0 ? void 0 : _a.paths) === null || _b === void 0 ? void 0 : _b.data) || 'data', `${name}-data.json`);
    }
}
exports.StageMappingService = StageMappingService;
class StageModelService extends StageStateService {
    empty() {
        return { mappings: [] };
    }
    getFile(name) {
        var _a, _b;
        return this.helper.fs.join(this.schemaDirPath, ((_b = (_a = this.schemaState.schema.infrastructure) === null || _a === void 0 ? void 0 : _a.paths) === null || _b === void 0 ? void 0 : _b.data) || 'data', `${name}-model.json`);
    }
    ddl(stage, action, queries) {
        return __awaiter(this, void 0, void 0, function* () {
            const sources = [];
            for (const i in queries) {
                const query = queries[i];
                const source = sources.find(p => p.name === query.source);
                if (source === undefined) {
                    sources.push({ name: query.source, dialect: query.dialect, queries: [query] });
                }
                else {
                    source.queries.push(query);
                }
            }
            for (const i in sources) {
                const source = sources[i];
                const logFile = this.ddlFile(stage, action, source);
                const data = source.queries.map((p) => p.sentence).join(';\n') + ';';
                yield this.helper.fs.write(logFile, data);
            }
        });
    }
    ddlFile(stage, action, source) {
        var _a, _b;
        let date = new Date().toISOString();
        const extension = [lambdaorm_base_1.Dialect.MongoDB].includes(source.dialect) ? 'json' : 'sql';
        date = this.helper.str.replace(date, ':', '');
        date = this.helper.str.replace(date, '.', '');
        date = this.helper.str.replace(date, '-', '');
        return this.helper.fs.join(this.schemaDirPath, ((_b = (_a = this.schemaState.schema.infrastructure) === null || _a === void 0 ? void 0 : _a.paths) === null || _b === void 0 ? void 0 : _b.data) || 'data', `${stage}-ddl-${date}-${action}-${source.name}.${extension}`);
    }
}
exports.StageModelService = StageModelService;
//# sourceMappingURL=stateService.js.map