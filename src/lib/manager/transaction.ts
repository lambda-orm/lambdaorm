/* eslint-disable @typescript-eslint/ban-types */
import { Query } from '../contract'
import { QueryExecutor, QueryManager } from '.'

export class Transaction {
	private queryManager:QueryManager
	private queryExecutor: QueryExecutor
	constructor (queryManager: QueryManager, queryExecutor: QueryExecutor) {
		this.queryManager = queryManager
		this.queryExecutor = queryExecutor
	}

	public async execute(expression: Function, data?: any):Promise<any>;
	public async execute(expression: string, data?: any):Promise<any>;
	public async execute (expression: string|Function, data: any = {}): Promise<any> {
		if (typeof expression !== 'string') {
			expression = this.queryManager.toExpression(expression)
		}
		const query = this.queryManager.create(expression, this.queryExecutor.options)
		return this.queryExecutor.execute(query, data)
	}

	public async executeQuery (query: Query, data: any = {}): Promise<any> {
		return this.queryExecutor.execute(query, data)
	}
}
