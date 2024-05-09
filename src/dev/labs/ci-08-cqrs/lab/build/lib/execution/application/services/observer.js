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
exports.ExecutionActionObserver = void 0;
const domain_1 = require("../../domain");
class ExecutionActionObserver extends domain_1.ActionObserver {
    constructor(config, expressions) {
        super(config.on, config.condition);
        this.config = config;
        this.expressions = expressions;
    }
    before(args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.config.before !== undefined) {
                yield this.expressions.evalAsync(this.config.before, args);
            }
        });
    }
    after(args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.config.after !== undefined) {
                yield this.expressions.evalAsync(this.config.after, args);
            }
        });
    }
    error(args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.config.error !== undefined) {
                yield this.expressions.evalAsync(this.config.error, args);
            }
        });
    }
}
exports.ExecutionActionObserver = ExecutionActionObserver;
//# sourceMappingURL=observer.js.map