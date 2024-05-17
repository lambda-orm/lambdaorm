import { Query, Include } from '../../../../query/domain'
import { ExecutionError, Connection } from '../../../../connection/domain'
import { DialectService } from '../../../../language/application'
import { QueryOptions, MappingConfigService, RelationType, EntityMapping, Data } from 'lambdaorm-base'
import { Expressions } from '3xpr'
import { QueryInternalExecutor } from './queryInternalExecutor'
import { QueryEvalConstraints } from './queryEvalConstraints'
import { QuerySolveDefaults } from './querySolveDefaults'
import { QuerySolveWriteValues } from './querySolveWriteValues'

export class QueryBulkInsertExecutor {
	public options: QueryOptions
	protected solveDefaults:QuerySolveDefaults
	protected solveWriteValues: QuerySolveWriteValues
	protected constraints: QueryEvalConstraints
	protected executor: QueryInternalExecutor
	constructor (executor: QueryInternalExecutor, expressions: Expressions, options: QueryOptions) {
		this.options = options
		this.executor = executor
		this.solveWriteValues = new QuerySolveWriteValues(expressions)
		this.solveDefaults = new QuerySolveDefaults(expressions)
		this.solveWriteValues = new QuerySolveWriteValues(expressions)
		this.constraints = new QueryEvalConstraints(expressions)
	}

	public async bulkInsert (query: Query, data: Data, mapping: MappingConfigService, dialect: DialectService, connection: Connection): Promise<any[]> {
		const entity = mapping.getEntity(query.entity) as EntityMapping

		// before insert the relationships of the type oneToMany and oneToOne with relation required
		await this.bulkIncludesBefore(query, data, entity, dialect)

		// insert data
		const chunkSize = this.options.chunkSize ? Math.min(connection.maxChunkSizeOnBulkInsert, this.options.chunkSize) : connection.maxChunkSizeOnBulkInsert
		let ids: any[] = []
		for (let i = 0; i < data.data.length; i += chunkSize) {
			const chunk = data.data.slice(i, i + chunkSize)
			const result = await this._chunk(query, entity, chunk, mapping, dialect, connection)
			ids = ids.concat(result)
		}
		const autoIncrement = mapping.getAutoIncrement(query.entity)
		if (autoIncrement) {
			for (let i = 0; i < data.data.length; i++) {
				data.data[i][autoIncrement.name] = ids[i]
			}
		}

		// after insert the relationships of the type manyToOne and oneToOne with relation not required
		await this.bulkIncludesAfter(query, data, mapping, dialect)
		return ids
	}

	protected async bulkIncludesBefore (query: Query, data: Data, entity: EntityMapping, dialect: DialectService): Promise<void> {
		for (const include of query.includes) {
			if (!include.relation.composite || !dialect.solveComposite) {
				const relationProperty = entity.properties?.find(q => q.name === include.relation.from)
				if (include.relation.type === RelationType.oneToMany) {
					await this.bulkIncludeBeforeOneToMany(include, data)
				} else if (include.relation.type === RelationType.oneToOne && relationProperty && relationProperty.required) {
					await this.bulkIncludeBeforeOneToOne(include, data)
				}
			}
		}
	}

	protected async bulkIncludeBeforeOneToMany (include: Include, data: Data): Promise<void> {
		const allChildren: any[] = []
		const items: any[] = []
		for (const item of data.data) {
			const child = item[include.relation.name]
			if (child) {
				allChildren.push(child)
				items.push(item)
			}
		}
		const childData = new Data(allChildren, data)
		const allChildrenId = await this.executor._execute(include.query, childData)
		for (let i = 0; i < items.length; i++) {
			const item = items[i]
			if (item[include.relation.name]) {
				item[include.relation.from] = allChildrenId[i]
			}
		}
	}

	protected async bulkIncludeBeforeOneToOne (include: Include, data: Data): Promise<void> {
		const allChildren: any[] = []
		const items: any[] = []
		for (const item of data.data) {
			const child = item[include.relation.name]
			if (child) {
				allChildren.push(child)
				items.push(item)
			}
		}
		if (allChildren.length > 0) {
			const childData = new Data(allChildren, data)
			const allChildrenId = await this.executor._execute(include.query, childData)
			for (let i = 0; i < items.length; i++) {
				const item = items[i]
				if (item[include.relation.name]) {
					item[include.relation.from] = allChildrenId[i]
				}
			}
		}
	}

	protected async bulkIncludesAfter (query: Query, data: Data, mapping: MappingConfigService, dialect: DialectService): Promise<void> {
		for (const p in query.includes) {
			const include = query.includes[p]
			if (!include.relation.composite || !dialect.solveComposite) {
				const relationProperty = mapping.getProperty(query.entity, include.relation.from)
				if (include.relation.type === RelationType.manyToOne) {
					await this.bulkIncludeAfterManyToOne(include, data)
				} else if (include.relation.type === RelationType.oneToOne && !relationProperty.required) {
					await this.bulkIncludeAfterOneToOne(query, include, data)
				}
			}
		}
	}

	protected async bulkIncludeAfterManyToOne (include: Include, data: Data): Promise<void> {
		const allChildren: any[] = []
		for (const item of data.data) {
			const parentId = item[include.relation.from]
			const children = item[include.relation.name]
			if (children) {
				for (const child of children) {
					child[include.relation.to] = parentId
					allChildren.push(child)
				}
			}
		}
		const childData = new Data(allChildren, data)
		await this.executor._execute(include.query, childData)
	}

	protected async bulkIncludeAfterOneToOne (query: Query, include: Include, data: Data): Promise<void> {
		const allChildren: any[] = []
		const items: any[] = []
		for (const item of data.data) {
			const parentId = item[include.relation.from]
			const child = item[include.relation.name]
			if (!parentId) {
				throw new ExecutionError(query.source, query.entity, JSON.stringify(query.sentence), `parentId not found in ${include.relation.from}`, item)
			}
			if (child) {
				child[include.relation.to] = parentId
				allChildren.push(child)
				items.push(item)
			}
		}
		if (allChildren.length > 0) {
			const childData = new Data(allChildren, data)
			const allChildrenId = await this.executor._execute(include.query, childData)
			for (let i = 0; i < items.length; i++) {
				const item = items[i]
				if (item[include.relation.name]) {
					item[include.relation.from] = allChildrenId[i]
				}
			}
		}
	}

	protected async _chunk (query: Query, entity: EntityMapping, chunk: any[], mapping: MappingConfigService, dialect: DialectService, connection: Connection): Promise<any[]> {
		// solve default properties
		if (entity.hadDefaults) {
			this.solveDefaults.solve(query, chunk)
		}
		// solve write properties
		if (entity.hadWriteValues) {
			this.solveWriteValues.solve(query, chunk)
		}
		// evaluate constraints
		this.constraints.eval(query, chunk)
		return connection.bulkInsert(mapping, dialect, query, chunk)
	}
}
