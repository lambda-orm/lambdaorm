"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguagesService = void 0;
const lambdaorm_base_1 = require("lambdaorm-base");
class LanguagesService {
    constructor() {
        this.languages = [];
        this.dialects = {};
    }
    add(language) {
        const index = this.languages.findIndex(p => p.name === language.name);
        if (index !== -1) {
            this.languages[index] = language;
        }
        else {
            this.languages.push(language);
        }
        return this;
    }
    get(name) {
        const language = this.languages.find(p => p.name === name);
        if (!language) {
            throw new lambdaorm_base_1.NotImplemented(`language ${name} not implemented`);
        }
        return language;
    }
    getByDialect(dialect) {
        for (const i in this.languages) {
            for (const j in this.languages[i].dialects) {
                if (this.languages[i].dialects[j].name === dialect) {
                    return this.languages[i];
                }
            }
        }
        throw new lambdaorm_base_1.NotImplemented(`language with dialect ${dialect} not implemented`);
    }
    getDialect(name) {
        for (const i in this.languages) {
            for (const j in this.languages[i].dialects) {
                if (this.languages[i].dialects[j].name === name) {
                    return this.languages[i].dialects[j];
                }
            }
        }
        throw new lambdaorm_base_1.NotImplemented(`Dialect ${name} not implemented`);
    }
}
exports.LanguagesService = LanguagesService;
//# sourceMappingURL=languagesService.js.map