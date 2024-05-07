import { Executor } from '../../../execution/domain'
import { QueryOptions } from 'lambdaorm-base'
import { IQueryBuilder } from '../../domain/services'
import { QueryTransaction } from './transaction'
import { Expressions } from '3xpr'
import { OrmH3lp } from '../../../shared/infrastructure'

export class ExpressionExecute {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly builder:IQueryBuilder,
		private readonly executor:Executor,
		private readonly query: Expressions,
		private readonly helper:OrmH3lp) {}

	// eslint-disable-next-line @typescript-eslint/ban-types
	public async execute (query: string, data: any, options: QueryOptions): Promise<any> {
		if (query === undefined || query === null || query.trim() === '') {
			await this.helper.logger.log('query is empty')
			return null
		}
		const _query = this.builder.build(query, options)
		return this.executor.execute(_query, data === null || data === undefined ? {} : data, options)
	}

	public async executeList (queries: string[], options: QueryOptions): Promise<any> {
		const _queries = queries.map(p => this.builder.build(p, options))
		return this.executor.executeList(_queries, options)
	}

	public async transaction (options: QueryOptions, callback: { (tr: QueryTransaction): Promise<void> }): Promise<void> {
		this.executor.transaction(options, async (transaction) => {
			const tr = new QueryTransaction(transaction, this.builder, this.query)
			await callback(tr)
		})
	}
}
