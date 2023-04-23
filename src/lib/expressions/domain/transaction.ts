/* eslint-disable @typescript-eslint/ban-types */
import { Transaction } from '../../core/domain'
import { SentenceService } from '../../sentence/application'
import { QueryService } from '../../expressions/application'
import { Query } from '../../query/domain'

export class ExpressionTransaction {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly transaction:Transaction,
		private readonly sentenceService:SentenceService,
		private readonly queryService:QueryService) {}

	public async execute(expression: Function, data?: any):Promise<any>;
	public async execute(expression: string, data?: any):Promise<any>;
	public async execute (expression: string|Function, data: any = {}): Promise<any> {
		if (typeof expression !== 'string') {
			expression = this.sentenceService.toExpression(expression)
		}
		const query = this.queryService.create(expression, this.transaction.options, true)
		return this.transaction.execute(query, data)
	}

	public async executeQuery (query: Query, data: any = {}): Promise<any> {
		return this.transaction.execute(query, data)
	}
}
