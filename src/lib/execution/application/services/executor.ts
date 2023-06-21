
import { Query, ExecuteResult, QueryOptions } from '../../../query/domain'
import { SchemaFacade } from '../../../schema/application'
import { LanguagesService } from '../../../language/application'
import { QueryExecutor } from './queryExecutor/queryExecutor'
import { Transaction, Executor } from '../../domain'
import { ConnectionFacade } from '../../../connection/application'
import { Expressions } from '3xpr'
import { Helper } from '../../../shared/application/helper'

export class ExecutorImpl implements Executor {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly connectionFacade: ConnectionFacade,
		private readonly languages: LanguagesService,
		private readonly schemaFacade: SchemaFacade,
		private readonly expressions: Expressions,
		private readonly helper: Helper
	) {}

	public async execute (query: Query, data: any, options: QueryOptions): Promise<any> {
		let error: any
		let result: any
		if (query.includes && query.includes.length > 0) {
			await this.transaction(options, async function (tr: Transaction) {
				result = await tr.execute(query, data)
			})
		} else {
			const queryExecutor = new QueryExecutor(this.connectionFacade, this.languages, this.schemaFacade, this.expressions, options, this.helper, false)
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
				const queryExecutor = new QueryExecutor(this.connectionFacade, this.languages, this.schemaFacade, this.expressions, options, this.helper, false)
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
		const queryExecutor = new QueryExecutor(this.connectionFacade, this.languages, this.schemaFacade, this.expressions, options, this.helper, true)
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
}
