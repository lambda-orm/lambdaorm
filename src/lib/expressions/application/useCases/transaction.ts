/* eslint-disable @typescript-eslint/ban-types */
import { Expressions } from '3xpr'
import { Transaction } from '../../../execution/domain'
import { Query } from '../../../query/domain'
import { IQueryBuilder } from '../../domain'

export class QueryTransaction {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly transaction:Transaction,
		private readonly builder:IQueryBuilder,
		private readonly expressions: Expressions) {}

	public async execute(query: Function, data?: any):Promise<any>;
	public async execute(query: string, data?: any):Promise<any>;
	public async execute (query: string|Function, data: any = {}): Promise<any> {
		if (typeof query !== 'string') {
			query = this.expressions.convert(query, 'function')[0]
		}
		const _query = this.builder.build(query, this.transaction.options)
		return this.transaction.execute(_query, data)
	}

	public async executeQuery (query: Query, data: any = {}): Promise<any> {
		return this.transaction.execute(query, data)
	}
}
