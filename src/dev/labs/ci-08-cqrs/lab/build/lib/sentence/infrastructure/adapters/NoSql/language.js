"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoSqlLanguageAdapter = void 0;
const infrastructure_1 = require("../../../../language/infrastructure");
const config_json_1 = __importDefault(require("./config.json"));
const NoSqlDmlBuilder_1 = require("./NoSqlDmlBuilder");
class NoSqlLanguageAdapter extends infrastructure_1.LanguageBase {
    constructor(helper) {
        super('NoSQL', config_json_1.default.dialects);
        this.helper = helper;
        this.solveComposite = true;
    }
    ddlBuilder(source, mapping) {
        return new infrastructure_1.NoSqlDDLBuilder(source, mapping, this.getDialect(source.dialect), this.helper);
    }
    dmlBuilder(source, mapping) {
        return new NoSqlDmlBuilder_1.NoSqlDmlBuilder(source, mapping, this.getDialect(source.dialect), this.helper);
    }
}
exports.NoSqlLanguageAdapter = NoSqlLanguageAdapter;
//# sourceMappingURL=language.js.map