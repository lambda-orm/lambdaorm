import { Query } from './../model'
import { QueryExecutor, ExpressionManager } from './'

export class Transaction {
	private expressionManager:ExpressionManager
	private queryExecutor:QueryExecutor
	constructor (expressionManager: ExpressionManager, queryExecutor: QueryExecutor) {
		this.expressionManager = expressionManager
		this.queryExecutor = queryExecutor
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	public async lambda (lambda: Function, dataContext: any): Promise<any> {
		const expression = this.expressionManager.toExpression(lambda)
		return await this.expression(expression, dataContext)
	}

	public async expression (expression:string, context:any):Promise<any> {
		const query = await this.expressionManager.toQuery(expression, this.queryExecutor.datastore.name)
		return await this.execute(query, context)
	}

	public async execute (query: Query, dataContext: any = {}): Promise<any> {
		return await this.queryExecutor.execute(query, dataContext)
	}
}
