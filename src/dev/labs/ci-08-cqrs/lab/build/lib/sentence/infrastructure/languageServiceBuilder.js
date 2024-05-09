"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentenceLanguageServiceBuilder = void 0;
const application_1 = require("../../language/application");
const language_1 = require("./adapters/NoSql/language");
const language_2 = require("./adapters/Sql/language");
class SentenceLanguageServiceBuilder {
    // eslint-disable-next-line no-useless-constructor
    constructor(helper) {
        this.helper = helper;
    }
    build() {
        return new application_1.LanguagesService()
            .add(new language_2.SqlLanguageAdapter(this.helper))
            .add(new language_1.NoSqlLanguageAdapter(this.helper));
    }
}
exports.SentenceLanguageServiceBuilder = SentenceLanguageServiceBuilder;
//# sourceMappingURL=languageServiceBuilder.js.map