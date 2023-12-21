import { Query, ExecuteResult, QueryOptions } from '../../../query/domain'
import { SchemaFacade } from 'lambdaorm-base'
import { LanguagesService } from '../../../language/application'
import { QueryExecutorImpl } from './queryExecutor/queryExecutor'
import { Transaction, Executor, QueryExecutor, ActionObserver, ObservableExecutor } from '../../domain'
import { ConnectionFacade } from '../../../connection/application'
import { Expressions } from '3xpr'
import { Helper } from '../../../shared/application/helper'
import { QueryExecutorObservableDecorator } from './queryExecutor/queryExecutorObservableDecorator'
export class ExecutorImpl implements Executor, ObservableExecutor {
	private observers:ActionObserver[]
	constructor (private readonly connectionFacade: ConnectionFacade,
		private readonly languages: LanguagesService,
		private readonly schemaFacade: SchemaFacade,
		private readonly expressions: Expressions,
		private readonly helper: Helper
	) {
		this.observers = []
	}

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

	public async execute (query: Query, data: any, options: QueryOptions): Promise<any> {
		let error: any
		let result: any
		if (query.includes && query.includes.length > 0) {
			await this.transaction(options, async function (tr: Transaction) {
				result = await tr.execute(query, data)
			})
		} else {
			const queryExecutor = this.createQueryExecutor(options, false)
			try {
				result = await queryExecutor.execute(query, data)
			} catch (_error) {
				error = _error
			} finally {
				await queryExecutor.release()
			}
			if (error) {
				throw error
			}
		}
		return result
	}

	public async executeList (queries: Query[], options: QueryOptions): Promise<ExecuteResult[]> {
		const results: ExecuteResult[] = []

		if (options.tryAllCan) {
			for (const query of queries) {
				const queryExecutor = this.createQueryExecutor(options, false)
				try {
					const result = await queryExecutor.execute(query, {})
					results.push(result)
				} catch (error: any) {
					results.push({ error })
				} finally {
					await queryExecutor.release()
				}
			}
		} else {
			await this.transaction(options, async function (tr: Transaction) {
				for (const query of queries) {
					const result = await tr.execute(query)
					results.push({ result })
				}
			})
		}
		return results
	}

	/**
 * Create a transaction
 * @param source Database name
 * @param callback Code to be executed in transaction
 */
	public async transaction (options: QueryOptions, callback: { (tr: Transaction): Promise<void> }): Promise<void> {
		const queryExecutor = this.createQueryExecutor(options, true)
		let error: any
		try {
			const transaction = new Transaction(queryExecutor)
			await callback(transaction)
			await queryExecutor.commit()
		} catch (_error) {
			error = _error
			await queryExecutor.rollback()
		} finally {
			await queryExecutor.release()
		}
		if (error) {
			throw error
		}
	}

	private createQueryExecutor (options: QueryOptions, transactional:boolean): QueryExecutor {
		const queryExecutor = new QueryExecutorImpl(this.connectionFacade, this.languages, this.schemaFacade, this.expressions, options, this.helper, transactional)
		return new QueryExecutorObservableDecorator(this.expressions, queryExecutor, this.observers)
	}
}
