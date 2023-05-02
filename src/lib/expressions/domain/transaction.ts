/* eslint-disable @typescript-eslint/ban-types */
import { Transaction } from '../../execution/domain'
import { QueryService } from '../../expressions/application'
import { Query } from '../../query/domain'
import { Autowired } from 'h3lp'
import { IOrmExpressions } from '../../shared/domain'

export class ExpressionTransaction {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly transaction:Transaction, private readonly queryService:QueryService) {}

	@Autowired('orm.expressions')
	private expressions!: IOrmExpressions

	public async execute(expression: Function, data?: any):Promise<any>;
	public async execute(expression: string, data?: any):Promise<any>;
	public async execute (expression: string|Function, data: any = {}): Promise<any> {
		if (typeof expression !== 'string') {
			expression = this.expressions.toExpression(expression)
		}
		const query = this.queryService.create(expression, this.transaction.options, true)
		return this.transaction.execute(query, data)
	}

	public async executeQuery (query: Query, data: any = {}): Promise<any> {
		return this.transaction.execute(query, data)
	}
}
