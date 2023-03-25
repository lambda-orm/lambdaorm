/* eslint-disable @typescript-eslint/ban-types */
import { Query } from '../contract'
import { SentenceManager } from '../sentence'
import { QueryManager, QueryExecutor } from '../query'

export class Transaction {
	private sentenceManager:SentenceManager
	private queryManager:QueryManager
	private queryExecutor: QueryExecutor
	constructor (sentenceManager:SentenceManager, queryManager: QueryManager, queryExecutor: QueryExecutor) {
		this.sentenceManager = sentenceManager
		this.queryManager = queryManager
		this.queryExecutor = queryExecutor
	}

	public async execute(expression: Function, data?: any):Promise<any>;
	public async execute(expression: string, data?: any):Promise<any>;
	public async execute (expression: string|Function, data: any = {}): Promise<any> {
		if (typeof expression !== 'string') {
			expression = this.sentenceManager.toExpression(expression)
		}
		const query = this.queryManager.create(expression, this.queryExecutor.options, true)
		return this.queryExecutor.execute(query, data)
	}

	public async executeQuery (query: Query, data: any = {}): Promise<any> {
		return this.queryExecutor.execute(query, data)
	}
}
