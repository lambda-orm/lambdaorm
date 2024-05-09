"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialectService = void 0;
const domain_1 = require("../../domain");
class DialectService {
    constructor(name, data) {
        this._operators = {};
        this._functions = {};
        this._others = {};
        this._support = {};
        this._dml = {};
        this._ddl = {};
        this._dbTypes = {};
        this._types = {};
        this._reservedWords = [];
        this.name = name;
        this.format = data.format;
        this._operators = {};
        this._functions = {};
        this.addOperators(data);
        this.addFunctions(data);
        for (const name in data.support) {
            const value = data.support[name];
            this._support[name] = value;
        }
        for (const name in data.others) {
            const template = data.others[name];
            this._others[name] = template;
        }
        for (const name in data.dml) {
            const template = data.dml[name];
            this._dml[name] = template;
        }
        for (const name in data.ddl) {
            const template = data.ddl[name];
            this._ddl[name] = template;
        }
        for (const name in data.dbTypes) {
            const type = data.dbTypes[name];
            this._dbTypes[name] = type;
        }
        for (const name in data.types) {
            const type = data.types[name];
            this._types[name.toLowerCase()] = type;
        }
        for (const reservedWord of data.reservedWords) {
            this._reservedWords.push(reservedWord.toLowerCase());
        }
    }
    addOperators(dialect) {
        for (const type in dialect.operators) {
            let operands;
            if (type === 'ternary') {
                operands = 3;
            }
            else {
                operands = type === 'binary' ? 2 : 1;
            }
            for (const name in dialect.operators[type]) {
                const template = dialect.operators[type][name];
                if (!this._operators[name])
                    this._operators[name] = {};
                this._operators[name][operands] = template;
            }
        }
    }
    addFunctions(dialect) {
        for (const type in dialect.functions) {
            const list = dialect.functions[type];
            for (const name in list) {
                this._functions[name] = { type, template: list[name] };
            }
        }
    }
    get solveComposite() {
        return this._support.composite || false;
    }
    isReservedWord(name) {
        return this._reservedWords.includes(name.toLowerCase());
    }
    operator(name, operands) {
        return this._operators[name][operands];
    }
    function(name) {
        return this._functions[name];
    }
    support(name) {
        return this._support[name];
    }
    dml(name) {
        return this._dml[name];
    }
    other(name) {
        return this._others[name];
    }
    ddl(name) {
        return this._ddl[name];
    }
    dbType(name) {
        return this._dbTypes[name];
    }
    type(name) {
        const type = this._types[name.toLowerCase()];
        if (type === undefined) {
            throw new domain_1.LanguageError('error with type: ' + name);
        }
        return type;
    }
    delimiter(name, force = false, excludeUnderscore = false) {
        if (!force &&
            (!name.startsWith('_') || excludeUnderscore) &&
            name.indexOf(' ') === -1 &&
            name.indexOf('.') === -1 &&
            !this.isReservedWord(name)) {
            return name;
        }
        const template = this._others.delimiter;
        return template.replace('{name}', name);
    }
    string(name) {
        const template = this._others.string;
        return template.replace('{name}', name);
    }
    getOperatorMetadata(name, operands) {
        try {
            if (this._operators[name]) {
                const operator = this._operators[name];
                if (operator[operands]) {
                    return operator[operands];
                }
            }
            return null;
        }
        catch (error) {
            throw new domain_1.LanguageError('error with operator: ' + name);
        }
    }
    getFunctionMetadata(name) {
        try {
            if (this._functions[name]) {
                return this._functions[name];
            }
            return null;
        }
        catch (error) {
            throw new domain_1.LanguageError('error with function: ' + name);
        }
    }
}
exports.DialectService = DialectService;
//# sourceMappingURL=dialectService.js.map