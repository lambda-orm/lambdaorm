/* eslint-disable @typescript-eslint/ban-types */
import { Query } from '../model'
import { QueryExecutor, ExpressionManager } from '.'

export class Transaction {
	private expressionManager:ExpressionManager
	private queryExecutor: QueryExecutor
	constructor (expressionManager: ExpressionManager, queryExecutor: QueryExecutor) {
		this.expressionManager = expressionManager
		this.queryExecutor = queryExecutor
	}

	public async execute(expression: Function, data?: any):Promise<any>;
	public async execute(expression: string, data?: any):Promise<any>;
	public async execute (expression: string|Function, data: any = {}): Promise<any> {
		if (typeof expression !== 'string') {
			expression = this.expressionManager.toExpression(expression)
		}
		const query = this.expressionManager.toQuery(expression, this.queryExecutor.options)
		return this.queryExecutor.execute(query, data)
	}

	public async executeQuery (query: Query, data: any = {}): Promise<any> {
		return this.queryExecutor.execute(query, data)
	}
}
