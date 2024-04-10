import { QueryOptions, RelationType, SentenceAction, SchemaState, Data } from 'lambdaorm-base'
import { Query } from '../../../../query/domain'
import { OrmH3lp } from '../../../../shared/application'
import { ExecutionError } from '../../../../connection/domain'
import { ConnectionFacade, Connection } from '../../../../connection/application'
import { LanguagesService } from '../../../../language/application'
import { Expressions } from '3xpr'
import { QueryInternalExecutor } from './queryInternalExecutor'
import { QueryBulkInsertExecutor } from './queryBulkInsertExecutor'
import { QueryDeleteExecutor } from './queryDeleteExecutor'
import { QueryInsertExecutor } from './queryInsertExecutor'
import { QuerySelectExecutor } from './querySelectExecutor'
import { QueryUpdateExecutor } from './queryUpdateExecutor'
import { QueryExecutor } from '../../../domain'

export class QueryExecutorImpl implements QueryExecutor, QueryInternalExecutor {
	private connections: any
	private selectExecutor: QuerySelectExecutor
	private insertExecutor: QueryInsertExecutor
	private bulkInsertExecutor: QueryBulkInsertExecutor
	private updateExecutor: QueryUpdateExecutor
	private deleteExecutor: QueryDeleteExecutor

	constructor (
		private readonly connectionFacade: ConnectionFacade,
		private readonly languages: LanguagesService,
		private readonly schemaState: SchemaState,
		private readonly expressions: Expressions,
		private readonly _options: QueryOptions,
		private readonly helper: OrmH3lp,
		private transactional = false
	) {
		this.connections = {}
		this.selectExecutor = new QuerySelectExecutor(this, this.expressions, this.options, this.helper)
		this.insertExecutor = new QueryInsertExecutor(this, this.expressions, this.options)
		this.bulkInsertExecutor = new QueryBulkInsertExecutor(this, this.expressions, this.options)
		this.updateExecutor = new QueryUpdateExecutor(this, this.expressions, this.options)
		this.deleteExecutor = new QueryDeleteExecutor(this, this.options)
	}

	public get options (): QueryOptions {
		return this._options
	}

	private async getConnection (source: string): Promise<Connection> {
		let connection = this.connections[source]
		if (connection === undefined) {
			connection = await this.connectionFacade.acquire(source)
			if (this.transactional) {
				await connection.beginTransaction()
			}
			this.connections[source] = connection
		}
		return connection
	}

	public async commit (): Promise<void> {
		for (const p in this.connections) {
			const connection = this.connections[p]
			await connection.commit()
		}
	}

	public async rollback (): Promise<void> {
		for (const p in this.connections) {
			const connection = this.connections[p]
			await connection.rollback()
		}
	}

	public async release (): Promise<void> {
		for (const p in this.connections) {
			const connection = this.connections[p]
			await this.connectionFacade.release(connection)
		}
		this.connections = {}
	}

	public async execute (query: Query, data: any): Promise<any> {
		const _data = new Data(data)
		if ([SentenceAction.insert, SentenceAction.update, SentenceAction.bulkInsert].includes(query.action)) {
			await this._execute(query, _data)
			return _data
		} else {
			const result = await this._execute(query, _data)
			this.clearTemporalFields(query, result)
			return result
		}
	}

	private clearTemporalFields (query: Query, result: any):void {
		for (const include of query.includes) {
			const keyId = '__' + include.relation.from
			for (const element of result) {
				const item = element[include.name]
				delete element[keyId]
				if (include.relation.type === RelationType.manyToOne) {
					for (const child of item) {
						delete child.LambdaOrmParentId
					}
					this.clearTemporalFields(include.query, item)
				} else if (item) {
					delete item.LambdaOrmParentId
					this.clearTemporalFields(include.query, [item])
				}
			}
		}
	}

	public async _execute (query: Query, data: Data): Promise<any> {
		let result: any
		const source = this.schemaState.source.get(query.source)
		const mapping = this.schemaState.mapping.getInstance(source.mapping)
		const connection = await this.getConnection(source.name)
		const dialect = this.languages.getDialect(query.dialect)
		try {
			switch (query.action) {
			case SentenceAction.select: result = await this.selectExecutor.select(query, data, mapping, dialect, connection); break
			case SentenceAction.insert: result = await this.insertExecutor.insert(query, data, mapping, dialect, connection); break
			case SentenceAction.bulkInsert: result = await this.bulkInsertExecutor.bulkInsert(query, data, mapping, dialect, connection); break
			case SentenceAction.update: result = await this.updateExecutor.update(query, data, mapping, dialect, connection); break
			case SentenceAction.delete: result = await this.deleteExecutor.delete(query, data, mapping, dialect, connection); break
			case SentenceAction.truncateEntity: result = await connection.truncateEntity(mapping, query); break
			case SentenceAction.createEntity: result = await connection.createEntity(mapping, query); break
			case SentenceAction.createSequence: result = await connection.createSequence(mapping, query); break
			case SentenceAction.createFk: result = await connection.createFk(mapping, query); break
			case SentenceAction.createIndex: result = await connection.createIndex(mapping, query); break
			case SentenceAction.alterProperty: result = await connection.alterProperty(mapping, query); break
			case SentenceAction.addProperty: result = await connection.addProperty(mapping, query); break
			case SentenceAction.addPk: result = await connection.addPk(mapping, query); break
			case SentenceAction.addUk: result = await connection.addUk(mapping, query); break
			case SentenceAction.addFk: result = await connection.addFk(mapping, query); break
			case SentenceAction.dropSequence: result = await connection.dropSequence(mapping, query); break
			case SentenceAction.dropEntity: result = await connection.dropEntity(mapping, query); break
			case SentenceAction.dropProperty: result = await connection.dropProperty(mapping, query); break
			case SentenceAction.dropPk: result = await connection.dropPk(mapping, query); break
			case SentenceAction.dropUk: result = await connection.dropUk(mapping, query); break
			case SentenceAction.dropFk: result = await connection.dropFk(mapping, query); break
			case SentenceAction.dropIndex: result = await connection.dropIndex(mapping, query); break
			case SentenceAction.objects:
			case SentenceAction.tables:
			case SentenceAction.views:
			case SentenceAction.foreignKeys:
			case SentenceAction.primaryKeys:
			case SentenceAction.uniqueKeys:
			case SentenceAction.indexes:
			case SentenceAction.partitions:
			case SentenceAction.sequences:
				result = await this.selectExecutor.select(query, data, mapping, dialect, connection); break
			default:
				throw new Error(`query action ${query.action} undefined`)
			}
			return result
		} catch (error:any) {
			throw new ExecutionError(query.source, query.entity, JSON.stringify(query.sentence), error.message, data)
		}
	}
}
