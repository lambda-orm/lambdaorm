"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
class ValidationError extends Error {
    constructor(source, entity, expression, sentence, message, data = {}) {
        super(`ERROR: ${message} SOURCE: ${source} ENTITY: ${entity} EXP: ${expression} QUERY: ${sentence} DATA:${JSON.stringify(data)}`);
        this.name = 'ValidationError';
    }
}
exports.ValidationError = ValidationError;
//# sourceMappingURL=errors.js.map