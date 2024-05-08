import { Query } from '../../../../query/domain'
import { Expressions } from '3xpr'
import { ActionObserver, ActionObserverArgs, QueryExecutor } from '../../../domain'
import { QueryOptions, SentenceType } from 'lambdaorm-base'

export class QueryExecutorObservableDecorator implements QueryExecutor {
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
		if ([SentenceType.dql, SentenceType.dml].includes(query.type)) {
			try {
				await this.beforeExecutionNotify(query, data, this.options)
				const result = await this.queryExecutor.execute(query, data)
				await this.afterExecutionNotify(query, data, this.options, result)
				return result
			} catch (error) {
				await this.errorExecutionNotify(query, data, this.options, error)
				throw error
			}
		} else {
			return this.queryExecutor.execute(query, data)
		}
	}

	private async beforeExecutionNotify (query: Query, data: any, options: QueryOptions):Promise<void> {
		const args = this.createActionObserverArgs(query, data, options)
		if (!this.observers) return
		this.observers.filter(p => p.on && p.on.includes(query.category)).forEach(async (observer:ActionObserver) => {
			if (observer.condition === undefined) {
				observer.before(args)
			} else {
				if (this.expressions.eval(observer.condition, args)) {
					await observer.before(args)
				}
			}
		})
	}

	private async afterExecutionNotify (query: Query, data: any, options: QueryOptions, result:any):Promise<void> {
		const args = this.createActionObserverArgs(query, data, options, result)
		if (!this.observers) return
		this.observers.filter(p => p.on && p.on.includes(query.category)).forEach(async (observer:ActionObserver) => {
			if (observer.condition === undefined) {
				observer.after(args)
			} else {
				if (this.expressions.eval(observer.condition, args)) {
					await observer.after(args)
				}
			}
		})
	}

	private async errorExecutionNotify (query: Query, data: any, options: QueryOptions, error:any):Promise<void> {
		const args = this.createActionObserverArgs(query, data, options, null, error)
		if (!this.observers) return
		this.observers.filter(p => p.on && p.on.includes(query.category)).forEach(async (observer:ActionObserver) => {
			if (observer.condition === undefined) {
				observer.error(args)
			} else {
				if (this.expressions.eval(observer.condition, args)) {
					await observer.error(args)
				}
			}
		})
	}

	private createActionObserverArgs (query: Query, data: any, options: QueryOptions, result?:any, error?:any):ActionObserverArgs {
		return {
			data,
			options,
			error,
			result,
			action: query.action,
			type: query.type,
			category: query.category,
			dialect: query.dialect,
			entity: query.entity,
			query: query.query,
			source: query.source,
			sentence: query.sentence
		}
	}
}
