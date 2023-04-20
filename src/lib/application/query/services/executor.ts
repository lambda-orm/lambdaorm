
import { Query, ExecuteResult, QueryOptions } from '../../../domain'
import { ConnectionService } from '../../connection/connectionService'
import { Transaction, SchemaService } from '../..'
import { SentenceService } from '../../sentence'
import { LanguagesService } from '../../language'
import { QueryService, QueryExecutor } from '..'
import { IExpressions } from '3xpr'

export class Executor {
	private languages: LanguagesService
	private connectionService: ConnectionService
	private schemaService: SchemaService
	private queryService: QueryService
	private expressions: IExpressions
	private sentenceService:SentenceService

	constructor (connectionService: ConnectionService, languages: LanguagesService, schemaService: SchemaService, sentenceService:SentenceService, queryService: QueryService, expressions: IExpressions) {
		this.connectionService = connectionService
		this.languages = languages
		this.schemaService = schemaService
		this.sentenceService = sentenceService
		this.queryService = queryService
		this.expressions = expressions
	}

	public async execute (query: Query, data: any, options: QueryOptions): Promise<any> {
		let error: any
		let result: any
		if (query.includes && query.includes.length > 0) {
			await this.transaction(options, async function (tr: Transaction) {
				result = await tr.executeQuery(query, data)
			})
		} else {
			const queryExecutor = new QueryExecutor(this.connectionService, this.languages, this.schemaService, this.expressions, options, false)
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
				const queryExecutor = new QueryExecutor(this.connectionService, this.languages, this.schemaService, this.expressions, options, false)
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
					const result = await tr.executeQuery(query)
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
		const queryExecutor = new QueryExecutor(this.connectionService, this.languages, this.schemaService, this.expressions, options, true)
		let error: any
		try {
			const transaction = new Transaction(this.sentenceService, this.queryService, queryExecutor)
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
