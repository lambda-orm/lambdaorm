"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutionError = exports.ConnectionError = void 0;
class ConnectionError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ConnectionError';
    }
}
exports.ConnectionError = ConnectionError;
class ExecutionError extends Error {
    constructor(source, entity, sentence, message, data = {}) {
        super(`ERROR: ${message} SOURCE: ${source} ENTITY: ${entity} QUERY: ${sentence}  DATA:${JSON.stringify(data)}`);
        this.name = 'ExecutionError';
    }
}
exports.ExecutionError = ExecutionError;
//# sourceMappingURL=errors.js.map