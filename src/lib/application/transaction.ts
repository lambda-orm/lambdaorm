/* eslint-disable @typescript-eslint/ban-types */
import { Query } from '../domain/model'
import { SentenceService } from './sentence'
import { QueryManager, QueryExecutor } from './query'

export class Transaction {
	private sentenceService:SentenceService
	private queryManager:QueryManager
	private queryExecutor: QueryExecutor
	constructor (sentenceService:SentenceService, queryManager: QueryManager, queryExecutor: QueryExecutor) {
		this.sentenceService = sentenceService
		this.queryManager = queryManager
		this.queryExecutor = queryExecutor
	}

	public async execute(expression: Function, data?: any):Promise<any>;
	public async execute(expression: string, data?: any):Promise<any>;
	public async execute (expression: string|Function, data: any = {}): Promise<any> {
		if (typeof expression !== 'string') {
			expression = this.sentenceService.toExpression(expression)
		}
		const query = this.queryManager.create(expression, this.queryExecutor.options, true)
		return this.queryExecutor.execute(query, data)
	}

	public async executeQuery (query: Query, data: any = {}): Promise<any> {
		return this.queryExecutor.execute(query, data)
	}
}
