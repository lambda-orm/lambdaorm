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
const lib_1 = require("../../../../../lib");
const h3lp_1 = require("h3lp");
const showResults = (results) => __awaiter(void 0, void 0, void 0, function* () {
    yield lib_1.orm.logger.log(results.map(p => p.description).join('\n'), lib_1.LogLevel.INFO);
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workspace = __dirname.replace('/build/', '/src/');
        yield lib_1.orm.init(workspace + '/../lambdaORM.yaml');
        const content = (yield h3lp_1.h3lp.fs.read(workspace + '/../data.json')) || '';
        const data = JSON.parse(content);
        yield showResults(yield lib_1.orm.stage.drop({ stage: "default", tryAllCan: true }).execute());
        yield showResults(yield lib_1.orm.stage.drop({ stage: "insights", tryAllCan: true }).execute());
        yield showResults(yield lib_1.orm.stage.push({ stage: "default" }).execute());
        yield showResults(yield lib_1.orm.stage.push({ stage: "insights" }).execute());
        yield lib_1.orm.stage.import({ stage: "default" }).execute(data);
        const query = `Orders.filter(p => p.customerId == customerId)
		.include(p => [p.details.include(p=> p.product.map(p=>p.name))
			              .map(p=> {subTotal: p.quantity * p.unitPrice}) ,
						      p.customer.map(p => p.name)
									])
		.order(p=> p.orderDate)							
		.page(1,1)
	`;
        let plan, result;
        plan = lib_1.orm.plan(query, { stage: "default" });
        console.log(JSON.stringify(plan, null, 2));
        plan = lib_1.orm.plan(query, { stage: "insights" });
        console.log(JSON.stringify(plan, null, 2));
        result = yield lib_1.orm.execute(query, { customerId: 'HANAR' }, { stage: "default" });
        console.log(JSON.stringify(result, null, 2));
        // It waits one second since the expression executed by the listener in cqrs is asynchronous
        yield (new Promise(resolve => setTimeout(resolve, 1000)));
        result = yield lib_1.orm.execute(query, { customerId: 'HANAR' }, { stage: "insights" });
        console.log(JSON.stringify(result, null, 2));
    }
    catch (error) {
        console.error(error);
    }
    finally {
        yield lib_1.orm.end();
    }
}))();
//# sourceMappingURL=index.js.map