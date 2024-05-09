"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlLanguageAdapter = void 0;
const languageBase_1 = require("../../../../language/infrastructure/adapters/languageBase");
const SqlDmlBuilder_1 = require("./SqlDmlBuilder");
const config_json_1 = __importDefault(require("./config.json"));
const SqlDdlBuilder_1 = require("../../../../language/infrastructure/adapters/SqlDdlBuilder");
class SqlLanguageAdapter extends languageBase_1.LanguageBase {
    constructor(helper) {
        super('SQL', config_json_1.default.dialects);
        this.helper = helper;
        this.solveComposite = false;
    }
    ddlBuilder(source, mapping) {
        return new SqlDdlBuilder_1.SqlDdlBuilder(source, mapping, this.getDialect(source.dialect), this.helper);
    }
    dmlBuilder(source, mapping) {
        return new SqlDmlBuilder_1.SqlDmlBuilder(source, mapping, this.getDialect(source.dialect), this.helper);
    }
}
exports.SqlLanguageAdapter = SqlLanguageAdapter;
//# sourceMappingURL=language.js.map