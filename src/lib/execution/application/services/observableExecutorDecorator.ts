import { Expressions } from '3xpr'
import { Helper } from '../../../shared/application'
import { ActionObserver, Executor, ObservableExecutor, Transaction } from '../../domain'
import { ExecuteResult, Query, QueryOptions } from '../../../query/domain'

export class ObservableExecutorDecorator implements Executor, ObservableExecutor {
	private observers:ActionObserver[]
	constructor (
		private readonly expressions:Expressions,
		private readonly executor:Executor,
		private readonly helper:Helper
	) {
		this.observers = []
	}

	public async execute (query: Query, data: any, options: QueryOptions): Promise<any> {
		try {
			let result = null
			await this.beforeExecutionNotify(query, data, options)
			if (this.observers.find(p => p.transactional === true) !== undefined) {
				// execute before and after listeners transactional
				this.executor.transaction(options, async (tr:Transaction) => {
					await this.beforeExecutionNotify(query, data, options, true)
					result = await tr.execute(query, data)
					await this.afterExecutionNotify(query, data, options, result, true)
				})
			} else {
				result = await this.executor.execute(query, data, options)
			}
			await this.afterExecutionNotify(query, data, options, result)
			return result
		} catch (error) {
			await this.errorExecutionNotify(query, data, options, error)
			throw error
		}
	}

	public async executeList (queries: Query[], options: QueryOptions): Promise<ExecuteResult[]> {
		return this.executor.executeList(queries, options)
	}

	public async transaction (options: QueryOptions, callback: { (tr: Transaction): Promise<void> }): Promise<void> {
		return this.executor.transaction(options, callback)
	}
	// Listeners and subscribers

	public subscribe (observer:ActionObserver):void {
		this.observers.push(observer)
	}

	public unsubscribe (observer:ActionObserver): void {
		const index = this.observers.indexOf(observer)
		if (index === -1) {
			throw new Error('Subject: Nonexistent observer.')
		}
		this.observers.splice(index, 1)
	}

	private async beforeExecutionNotify (query: Query, data: any, options: QueryOptions, transactional = false):Promise<void> {
		const args = { query, data, options }
		this.observers.filter(p => p.actions.includes(query.action) && this.helper.utils.nvl(p.transactional, false) === transactional).forEach(async (observer:ActionObserver) => {
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

	private async afterExecutionNotify (query: Query, data: any, options: QueryOptions, result:any, transactional = false):Promise<void> {
		const args = { query, data, options, result }
		this.observers.filter(p => p.actions.includes(query.action) && this.helper.utils.nvl(p.transactional, false) === transactional).forEach(async (observer:ActionObserver) => {
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
		const args = { query, data, options, error }
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
