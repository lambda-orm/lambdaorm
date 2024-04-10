import { Executor } from '../../../execution/domain'
import { QueryOptions } from 'lambdaorm-base'
import { IQueryBuilder } from '../../domain/services'
import { ExpressionTransaction } from './transaction'
import { Expressions } from '3xpr'
import { OrmH3lp } from '../../../shared/application'

export class ExpressionExecute {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly builder:IQueryBuilder,
		private readonly executor:Executor,
		private readonly expressions: Expressions,
		private readonly helper:OrmH3lp) {}

	// eslint-disable-next-line @typescript-eslint/ban-types
	public async execute (expression: string, data: any, options: QueryOptions): Promise<any> {
		if (expression === undefined || expression === null || expression.trim() === '') {
			await this.helper.logger.log('expression is empty')
			return null
		}
		const query = this.builder.build(expression, options)
		return this.executor.execute(query, data === null || data === undefined ? {} : data, options)
	}

	public async executeList (expressions: string[], options: QueryOptions): Promise<any> {
		const queries = expressions.map(p => this.builder.build(p, options))
		return this.executor.executeList(queries, options)
	}

	public async transaction (options: QueryOptions, callback: { (tr: ExpressionTransaction): Promise<void> }): Promise<void> {
		this.executor.transaction(options, async (transaction) => {
			const tr = new ExpressionTransaction(transaction, this.builder, this.expressions)
			await callback(tr)
		})
	}
}
