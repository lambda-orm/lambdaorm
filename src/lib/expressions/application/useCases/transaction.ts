/* eslint-disable @typescript-eslint/ban-types */
import { Expressions } from '3xpr'
import { Transaction } from '../../../execution/domain'
import { Query } from '../../../query/domain'
import { IQueryBuilder } from '../../domain'

export class ExpressionTransaction {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly transaction:Transaction,
		private readonly builder:IQueryBuilder,
		private readonly expressions: Expressions) {}

	public async execute(expression: Function, data?: any):Promise<any>;
	public async execute(expression: string, data?: any):Promise<any>;
	public async execute (expression: string|Function, data: any = {}): Promise<any> {
		if (typeof expression !== 'string') {
			expression = this.expressions.convert(expression, 'function')[0]
		}
		const query = this.builder.build(expression, this.transaction.options)
		return this.transaction.execute(query, data)
	}

	public async executeQuery (query: Query, data: any = {}): Promise<any> {
		return this.transaction.execute(query, data)
	}
}
