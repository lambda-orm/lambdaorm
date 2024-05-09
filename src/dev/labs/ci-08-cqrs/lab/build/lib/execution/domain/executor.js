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
exports.ActionObserver = void 0;
class ActionObserver {
    constructor(on, condition, transactional) {
        this.on = on;
        this.condition = condition;
        this.transactional = transactional;
    }
    before(args) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    after(args) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    error(args) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.ActionObserver = ActionObserver;
//# sourceMappingURL=executor.js.map