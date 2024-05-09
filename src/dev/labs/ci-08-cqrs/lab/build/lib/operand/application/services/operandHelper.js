"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrmOperandHelper = void 0;
const _3xpr_1 = require("3xpr");
const typ3s_1 = require("typ3s");
class OrmOperandHelper {
    // eslint-disable-next-line no-useless-constructor
    constructor(operandHelper) {
        this.operandHelper = operandHelper;
    }
    toExpression(operand) {
        const clauses = this.getClauses(operand);
        const list = [];
        if (clauses.map) {
            const body = this.operandHelper.toExpression(clauses.map.children[2]);
            list.push(`map(${clauses.map.children[1].name}=>${body})`);
        }
        else if (clauses.insert) {
            const body = this.operandHelper.toExpression(clauses.insert.children[1]);
            list.push(`insert(${body})`);
        }
        else if (clauses.bulkInsert) {
            const body = this.operandHelper.toExpression(clauses.bulkInsert.children[1]);
            list.push(`bulkInsert(${body})`);
        }
        else if (clauses.update) {
            const body = this.operandHelper.toExpression(clauses.update.children[2]);
            list.push(`update(${clauses.update.children[1].name}=>${body})`);
        }
        else if (clauses.delete) {
            list.push('delete()');
        }
        if (clauses.filter) {
            const body = this.operandHelper.toExpression(clauses.filter.children[2]);
            list.push(`filter(${clauses.filter.children[1].name}=>${body})`);
        }
        if (clauses.include) {
            const body = clauses.include.children[2];
            if (typ3s_1.Type.isList(body.type)) {
                const includes = [];
                for (const child of body.children) {
                    const include = this.toExpression(child);
                    includes.push(include);
                }
                list.push(`include(${clauses.include.children[1].name}=>[${includes.join(',')}])`);
            }
            else {
                const include = this.toExpression(body);
                list.push(`include(${clauses.include.children[1].name}=>${include})`);
            }
        }
        if (clauses.groupBy) {
            const body = this.operandHelper.toExpression(clauses.groupBy.children[2]);
            list.push(`groupBy(${clauses.groupBy.children[1].name}=>${body})`);
        }
        if (clauses.having) {
            const body = this.operandHelper.toExpression(clauses.having.children[2]);
            list.push(`having(${clauses.having.children[1].name}=>${body})`);
        }
        if (clauses.sort) {
            const body = this.operandHelper.toExpression(clauses.sort.children[2]);
            list.push(`sort(${clauses.sort.children[1].name}=>${body})`);
        }
        if (clauses.page) {
            const offset = this.operandHelper.toExpression(clauses.page.children[1]);
            const limit = this.operandHelper.toExpression(clauses.page.children[2]);
            list.push(`page(${offset},${limit})`);
        }
        // TODO: solve includes
        return `${clauses.from.name}.${list.join('.')}`;
    }
    getClauses(operand) {
        const clauses = {};
        let current = operand;
        while (current) {
            const name = current.type === _3xpr_1.OperandType.Var ? 'from' : current.name;
            clauses[name] = current;
            if (current.children.length > 0) {
                current = current.children[0];
            }
            else {
                break;
            }
        }
        return clauses;
    }
}
exports.OrmOperandHelper = OrmOperandHelper;
//# sourceMappingURL=operandHelper.js.map