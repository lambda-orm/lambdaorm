import { IOrmExpressions } from '../../../shared/domain'
import { Query, QueryOptions } from '../../../query/domain'
import { IQueryBuilder } from '../../domain/services'
import { Autowired } from 'h3lp'
import { Executor } from '../../../execution/application'
import { QueryHelper } from '../services/queryHelper'
import { ExpressionTransaction } from './transaction'

export class ExecuteQuery {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly builder:IQueryBuilder,
		private readonly queryHelper:QueryHelper,
		private readonly executor:Executor) {}

	@Autowired('orm.expressions')
	private expressions!: IOrmExpressions

	// eslint-disable-next-line @typescript-eslint/ban-types
	public async execute (expression: string|Function, data: any = {}, options: QueryOptions|undefined = undefined): Promise<any> {
		const _expression = typeof expression !== 'string' ? this.expressions.toExpression(expression) : expression
		const _options = this.queryHelper.solveOptions(options)
		const query = this.builder.build(_expression, _options)
		return this.executor.execute(query, data, _options)
	}

	public async executeQuery (query: Query, data: any, options: QueryOptions): Promise<any> {
		this.executor.execute(query, data, options)
	}

	public async transaction (options: QueryOptions, callback: { (tr: ExpressionTransaction): Promise<void> }): Promise<void> {
		this.executor.transaction(options, async (transaction) => {
			const tr = new ExpressionTransaction(transaction, this.builder)
			await callback(tr)
		})
	}
}
