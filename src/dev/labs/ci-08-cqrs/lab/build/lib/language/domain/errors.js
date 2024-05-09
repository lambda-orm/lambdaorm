"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageError = void 0;
class LanguageError extends Error {
    constructor(message) {
        super(message);
        this.name = 'LanguageError';
    }
}
exports.LanguageError = LanguageError;
//# sourceMappingURL=errors.js.map