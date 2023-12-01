import { Query, QueryOptions } from '../../../../query/domain'
import { Expressions } from '3xpr'
import { ActionObserver, QueryExecutor } from '../../../domain'

export class ObservableQueryExecutor implements QueryExecutor {
	// eslint-disable-next-line no-useless-constructor
	constructor (
		private readonly expressions:Expressions,
		private readonly queryExecutor:QueryExecutor,
		private readonly observers:ActionObserver[]
	) {}

	public get options (): QueryOptions {
		return this.queryExecutor.options
	}

	public async commit (): Promise<void> {
		return this.queryExecutor.commit()
	}

	public async rollback (): Promise<void> {
		return this.queryExecutor.rollback()
	}

	public async release (): Promise<void> {
		return this.queryExecutor.release()
	}

	public async execute (query: Query, data: any): Promise<any> {
		try {
			await this.beforeExecutionNotify(query, data, this.options)
			const result = await this.queryExecutor.execute(query, data)
			await this.afterExecutionNotify(query, data, this.options, result)
			return result
		} catch (error) {
			await this.errorExecutionNotify(query, data, this.options, error)
			throw error
		}
	}

	private async beforeExecutionNotify (query: Query, data: any, options: QueryOptions):Promise<void> {
		const args = { expression: query.expression, query, data, options }
		this.observers.filter(p => p.actions.includes(query.action)).forEach(async (observer:ActionObserver) => {
			if (observer.condition === undefined) {
				observer.before(args)
			} else {
				const context = { query, options }
				if (this.expressions.eval(observer.condition, context)) {
					await observer.before(args)
				}
			}
		})
	}

	private async afterExecutionNotify (query: Query, data: any, options: QueryOptions, result:any):Promise<void> {
		const args = { expression: query.expression, query, data, options, result }
		this.observers.filter(p => p.actions.includes(query.action)).forEach(async (observer:ActionObserver) => {
			if (observer.condition === undefined) {
				observer.after(args)
			} else {
				const context = { query, options }
				if (this.expressions.eval(observer.condition, context)) {
					await observer.after(args)
				}
			}
		})
	}

	private async errorExecutionNotify (query: Query, data: any, options: QueryOptions, error:any):Promise<void> {
		const args = { expression: query.expression, query, data, options, error }
		this.observers.filter(p => p.actions.includes(query.action)).forEach(async (observer:ActionObserver) => {
			if (observer.condition === undefined) {
				observer.error(args)
			} else {
				const context = { query, options }
				if (this.expressions.eval(observer.condition, context)) {
					await observer.error(args)
				}
			}
		})
	}
}
