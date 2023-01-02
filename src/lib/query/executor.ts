
import { SentenceAction, Data, QueryOptions, ExecutionError, Query, Include, RelationType, ValidationError, EntityMapping, Constraint, Behavior } from '../contract'
import { Connection, ConnectionManager } from '../connection'
import { MappingConfig, SchemaManager, helper } from '../manager'
import { Languages, Dialect } from '../language'
import { IExpressions } from '3xpr'

class QuerySolveDefaults {
	private expressions: IExpressions
	constructor (expressions: IExpressions) {
		this.expressions = expressions
	}

	/**
	 * solve default properties
	 * @param query
	 * @param data
	 */
	public solve(query: Query, data: any[]): void
	public solve(query: Query, data: any): void
	public solve (query: Query, data: any | any[]): void {
		if (Array.isArray(data)) {
			for (const defaultBehavior of query.defaults) {
				for (const item of data) {
					this.solveDefault(defaultBehavior, item)
				}
			}
		} else {
			for (const defaultBehavior of query.defaults) {
				this.solveDefault(defaultBehavior, data)
			}
		}
	}

	private solveDefault (defaultBehavior:Behavior, data: any): void {
		const value = data[defaultBehavior.property]
		if (value === undefined) {
			data[defaultBehavior.property] = this.expressions.eval(defaultBehavior.expression, data)
		}
	}
}

class QuerySolveWriteValues {
	private expressions: IExpressions
	constructor (expressions: IExpressions) {
		this.expressions = expressions
	}

	public solve(query: Query, data: any[]): void
	public solve(query: Query, data: any): void
	public solve (query: Query, data: any | any[]): void {
		if (Array.isArray(data)) {
			for (const valueBehavior of query.values) {
				for (const item of data) {
					item[valueBehavior.property] = this.expressions.eval(valueBehavior.expression, item)
				}
			}
		} else {
			for (const valueBehavior of query.values) {
				data[valueBehavior.property] = this.expressions.eval(valueBehavior.expression, data)
			}
		}
	}
}

class QuerySolveReadValues {
	private expressions: IExpressions
	constructor (expressions: IExpressions) {
		this.expressions = expressions
	}

	public solve (query: Query, data: any[]): void {
		for (const valueBehavior of query.values) {
			if (valueBehavior.alias === valueBehavior.property) {
				// Example Users.map(p=> [p.email]) or Users.map(p=> {email:p.email})
				for (const item of data) {
					item[valueBehavior.alias] = this.expressions.eval(valueBehavior.expression, item)
				}
			} else if (valueBehavior.alias) {
				// Example Users.map(p=> {mail:p.email})
				// since the expression contains the name of the property and not the alias
				// the property must be added with the alias value.
				for (const item of data) {
					const context = helper.obj.clone(item)
					context[valueBehavior.property] = item[valueBehavior.alias]
					item[valueBehavior.alias] = this.expressions.eval(valueBehavior.expression, context)
				}
			}
		}
	}
}

class QueryEvalConstraints {
	private expressions: IExpressions
	constructor (expressions: IExpressions) {
		this.expressions = expressions
	}

	public eval(query: Query, data: any[]): void
	public eval(query: Query, data: any): void
	public eval (query: Query, data: any | any[]): void {
		if (Array.isArray(data)) {
			for (const constraint of query.constraints) {
				for (const item of data) {
					this.constraint(query, constraint, item)
				}
			}
		} else {
			for (const constraint of query.constraints) {
				this.constraint(query, constraint, data)
			}
		}
	}

	private constraint (query: Query, constraint:Constraint, data: any): void {
		if (!this.expressions.eval(constraint.condition, data)) {
			throw new ValidationError(query.source, query.entity, constraint.condition, JSON.stringify(query.sentence), constraint.message, data)
		}
	}
}

interface IQueryInternalExecutor {
	_execute (query: Query, data: Data): Promise<any>
}

class QuerySelectExecutor {
	public options: QueryOptions
	private solveReadValues: QuerySolveReadValues
	private executor: IQueryInternalExecutor
	constructor (executor: IQueryInternalExecutor, expressions: IExpressions, options: QueryOptions) {
		this.options = options
		this.executor = executor
		this.solveReadValues = new QuerySolveReadValues(expressions)
	}

	public async select (query: Query, data: Data, mapping: MappingConfig, dialect: Dialect, connection: Connection): Promise<any> {
		const mainResult = await connection.select(mapping, dialect, query, data)
		const entity = mapping.getEntity(query.entity) as EntityMapping

		if (mainResult.length > 0) {
			// get rows for include relations
			if (entity.hadReadValues) {
				this.solveReadValues.solve(query, mainResult)
			}
			await this.selectIncludes(query, data, mainResult, dialect, connection)
			// clear temporal fields used for include relations
			this.selectClearTemporalFields(query, mainResult)
		}

		return mainResult
	}

	private async selectIncludes (query: Query, data: Data, mainResult: any, dialect: Dialect, connection: Connection): Promise<any> {
		const idsChunkSize = this.options.chunkSize ? Math.min(connection.maxChunkSizeIdsOnSelect, this.options.chunkSize) : connection.maxChunkSizeIdsOnSelect
		const chunkSize = this.options.chunkSize ? Math.min(connection.maxChunkSizeOnSelect, this.options.chunkSize) : connection.maxChunkSizeOnSelect
		for (const include of query.includes) {
			if (!include.relation.composite || !dialect.solveComposite) {
				await this.selectInclude(include, data, mainResult, idsChunkSize, chunkSize)
			}
		}
	}

	private async selectInclude (include: Include, data: Data, mainResult: any, idsChunkSize: number, chunkSize:number): Promise<any> {
		let chunks: any[] = []
		const keyId = '__' + include.relation.from

		if (mainResult.length > idsChunkSize) {
			const promises: any[] = []
			for (let i = 0; i < mainResult.length; i += idsChunkSize) {
				const chunk = mainResult.slice(i, i + idsChunkSize)
				promises.push(this.selectChunkResult(chunk, keyId))
			}
			chunks = await Promise.all(promises)
		} else {
			chunks = [this.selectChunkResult(mainResult, keyId)]
		}

		const promises2: any[] = []
		for (const chunk of chunks) {
			if (chunk.ids !== undefined && chunk.ids.length > 0) {
				promises2.push(this.selectChild(include, data, chunk.ids, chunk.result, chunkSize))
			}
		}
		await Promise.all(promises2)
	}

	private selectClearTemporalFields (query: Query, mainResult: any):void {
		for (const p in query.includes) {
			const include = query.includes[p]
			const keyId = '__' + include.relation.from
			for (const element of mainResult) {
				const item = element[include.name]
				delete element[keyId]
				if (include.relation.type === RelationType.manyToOne) {
					for (const child of item) {
						delete child.LambdaOrmParentId
					}
				} else if (item) {
					delete item.LambdaOrmParentId
				}
			}
		}
	}

	private selectChunkResult (result: any[], keyId: string): any {
		const ids: any[] = []
		for (const item of result) {
			const id = item[keyId]
			// Replace for performance
			let exists = false
			for (const _id of ids) {
				if (_id === id) {
					exists = true
					break
				}
			}
			if (!exists && id !== undefined && id !== null) {
				ids.push(id)
			}
		}
		return { ids, result }
	}

	private selectChunkIds (result: any[], keyId: string): any[] {
		const ids: any[] = []
		for (const item of result) {
			const id = item[keyId]
			// Replace for performance
			let exists = false
			for (const _id of ids) {
				if (_id === id) {
					exists = true
					break
				}
			}
			if (!exists) {
				ids.push(id)
			}
		}
		return ids
	}

	private async selectChild (include: Include, _data: Data, ids: any[], mainResult: any, chunkSize:number): Promise<any> {
		const data = _data.clone()
		data.set('LambdaOrmParentId', ids)
		const keyId = '__' + include.relation.from
		const includeResult = await this.executor._execute(include.query, data)
		if (include.relation.type === RelationType.manyToOne) {
			if (includeResult.length > chunkSize) {
				const promises: any[] = []
				for (let i = 0; i < includeResult.length; i += chunkSize) {
					const chunk = includeResult.slice(i, i + chunkSize)
					promises.push(this.selectChildSetManyToOne(mainResult, chunk, include.name, keyId))
				}
				await Promise.all(promises)
			} else {
				this.selectChildSetManyToOne(mainResult, includeResult, include.name, keyId)
			}
		} else {
			if (includeResult.length > chunkSize) {
				const promises: any[] = []
				for (let i = 0; i < includeResult.length; i += chunkSize) {
					const chunk = includeResult.slice(i, i + chunkSize)
					promises.push(this.selectChildSetOneToMany(mainResult, chunk, include.name, keyId))
				}
				await Promise.all(promises)
			} else {
				this.selectChildSetOneToMany(mainResult, includeResult, include.name, keyId)
			}
		}
	}

	private selectChildSetManyToOne (mainResult: any[], includeResult: any[], propertyName: string, keyId: string) {
		for (const element of mainResult) {
			const relationId = element[keyId]
			if (element[propertyName] === undefined) {
				element[propertyName] = []
			}
			for (const item of includeResult) {
				if (item.LambdaOrmParentId === relationId) {
					element[propertyName].push(item)
				}
			}
		}
	}

	private selectChildSetOneToMany (mainResult: any[], includeResult: any[], propertyName: string, keyId: string) {
		for (const element of mainResult) {
			const relationId = element[keyId]
			if (element[propertyName] === undefined) {
				element[propertyName] = null
			}
			for (const item of includeResult) {
				if (item.LambdaOrmParentId === relationId) {
					element[propertyName] = item
					break
				}
			}
		}
	}
}

class QueryInsertExecutor {
	public options: QueryOptions
	private solveDefaults:QuerySolveDefaults
	private solveWriteValues: QuerySolveWriteValues
	private constraints: QueryEvalConstraints
	private executor: IQueryInternalExecutor
	constructor (executor: IQueryInternalExecutor, expressions: IExpressions, options: QueryOptions) {
		this.options = options
		this.executor = executor
		this.solveWriteValues = new QuerySolveWriteValues(expressions)
		this.solveDefaults = new QuerySolveDefaults(expressions)
		this.solveWriteValues = new QuerySolveWriteValues(expressions)
		this.constraints = new QueryEvalConstraints(expressions)
	}

	public async insert (query: Query, data: Data, mapping: MappingConfig, dialect: Dialect, connection: Connection): Promise<any> {
		// before insert the relationships of the type oneToOne and oneToMany
		const autoIncrement = mapping.getAutoIncrement(query.entity)
		const entity = mapping.getEntity(query.entity) as EntityMapping

		await this.insertIncludeBefore(query, data, dialect)
		// solve default properties
		if (entity.hadDefaults) {
			this.solveDefaults.solve(query, data.data)
		}
		// solve default properties
		if (entity.hadWriteValues) {
			this.solveWriteValues.solve(query, data.data)
		}
		// evaluate constraints
		this.constraints.eval(query, data.data)
		// insert main entity
		const insertId = await connection.insert(mapping, dialect, query, data)
		if (autoIncrement) {
			data.set(autoIncrement.name, insertId)
		}
		// after insert the relationships of the type oneToOne and manyToOne
		await this.insertIncludeAfter(query, data, dialect)
		return insertId
	}

	private async insertIncludeBefore (query: Query, data: Data, dialect: Dialect): Promise<any> {
		for (const include of query.includes) {
			if (!include.relation.composite || !dialect.solveComposite) {
				const relation = data.get(include.relation.name)
				if (relation && (include.relation.type === 'oneToOne' || include.relation.type === 'oneToMany')) {
					const relationData = new Data(relation, data)
					const relationId = await this.executor._execute(include.query, relationData)
					data.set(include.relation.from, relationId)
				}
			}
		}
	}

	private async insertIncludeAfter (query: Query, data: Data, dialect: Dialect): Promise<any> {
		for (const include of query.includes) {
			if (!include.relation.composite || !dialect.solveComposite) {
				const relation = data.get(include.relation.name)
				if (relation && include.relation.type === 'manyToOne') {
					const parentId = data.get(include.relation.from)
					const childPropertyName = include.relation.to
					for (const child of relation) {
						child[childPropertyName] = parentId
						const childData = new Data(child, data)
						await this.executor._execute(include.query, childData)
					}
				}
			}
		}
	}
}

class QueryBulkInsertExecutor {
	public options: QueryOptions
	private solveDefaults:QuerySolveDefaults
	private solveWriteValues: QuerySolveWriteValues
	private constraints: QueryEvalConstraints
	private executor: IQueryInternalExecutor
	constructor (executor: IQueryInternalExecutor, expressions: IExpressions, options: QueryOptions) {
		this.options = options
		this.executor = executor
		this.solveWriteValues = new QuerySolveWriteValues(expressions)
		this.solveDefaults = new QuerySolveDefaults(expressions)
		this.solveWriteValues = new QuerySolveWriteValues(expressions)
		this.constraints = new QueryEvalConstraints(expressions)
	}

	public async bulkInsert (query: Query, data: Data, mapping: MappingConfig, dialect: Dialect, connection: Connection): Promise<any[]> {
		const entity = mapping.getEntity(query.entity) as EntityMapping

		// before insert the relationships of the type oneToMany and oneToOne with relation required
		await this.bulkInsertIncludesBefore(query, data, entity, dialect)

		// insert data
		const chunkSize = this.options.chunkSize ? Math.min(connection.maxChunkSizeOnBulkInsert, this.options.chunkSize) : connection.maxChunkSizeOnBulkInsert
		let ids: any[] = []
		for (let i = 0; i < data.data.length; i += chunkSize) {
			const chunk = data.data.slice(i, i + chunkSize)
			const result = await this._chunkInsert(query, entity, chunk, mapping, dialect, connection)
			ids = ids.concat(result)
		}
		const autoIncrement = mapping.getAutoIncrement(query.entity)
		if (autoIncrement) {
			for (let i = 0; i < data.data.length; i++) {
				data.data[i][autoIncrement.name] = ids[i]
			}
		}

		// after insert the relationships of the type manyToOne and oneToOne with relation not required
		await this.bulkInsertIncludesAfter(query, data, mapping, dialect)

		return ids
	}

	private async bulkInsertIncludesBefore (query: Query, data: Data, entity: EntityMapping, dialect: Dialect): Promise<void> {
		for (const include of query.includes) {
			if (!include.relation.composite || !dialect.solveComposite) {
				const relationProperty = entity.properties.find(q => q.name === include.relation.from)
				if (include.relation.type === RelationType.oneToMany) {
					await this.bulkInsertIncludeBeforeOneToMany(include, data)
				} else if (include.relation.type === RelationType.oneToOne && relationProperty && relationProperty.required) {
					await this.bulkInsertIncludeBeforeOneToOne(include, data)
				}
			}
		}
	}

	private async bulkInsertIncludeBeforeOneToMany (include: Include, data: Data): Promise<void> {
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

	private async bulkInsertIncludeBeforeOneToOne (include: Include, data: Data): Promise<void> {
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

	private async bulkInsertIncludesAfter (query: Query, data: Data, mapping: MappingConfig, dialect: Dialect): Promise<void> {
		for (const p in query.includes) {
			const include = query.includes[p]
			if (!include.relation.composite || !dialect.solveComposite) {
				const relationProperty = mapping.getProperty(query.entity, include.relation.from)
				if (include.relation.type === RelationType.manyToOne) {
					await this.bulkInsertIncludeAfterManyToOne(include, data)
				} else if (include.relation.type === RelationType.oneToOne && !relationProperty.required) {
					await this.bulkInsertIncludeAfterOneToOne(query, include, data)
				}
			}
		}
	}

	private async bulkInsertIncludeAfterManyToOne (include: Include, data: Data): Promise<void> {
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

	private async bulkInsertIncludeAfterOneToOne (query: Query, include: Include, data: Data): Promise<void> {
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

	private async _chunkInsert (query: Query, entity: EntityMapping, chunk: any[], mapping: MappingConfig, dialect: Dialect, connection: Connection): Promise<any[]> {
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

class QueryUpdateExecutor {
	public options: QueryOptions
	private solveWriteValues: QuerySolveWriteValues
	private constraints: QueryEvalConstraints
	private executor: IQueryInternalExecutor
	constructor (executor: IQueryInternalExecutor, expressions: IExpressions, options: QueryOptions) {
		this.options = options
		this.executor = executor
		this.solveWriteValues = new QuerySolveWriteValues(expressions)
		this.solveWriteValues = new QuerySolveWriteValues(expressions)
		this.constraints = new QueryEvalConstraints(expressions)
	}

	public async update (query: Query, data: Data, mapping: MappingConfig, dialect: Dialect, connection: Connection): Promise<number> {
		const entity = mapping.getEntity(query.entity)
		// solve default properties
		if (entity && entity.hadWriteValues) {
			this.solveWriteValues.solve(query, data.data)
		}
		// evaluate constraints
		this.constraints.eval(query, data.data)
		// update
		const changeCount = await connection.update(mapping, dialect, query, data)
		for (const include of query.includes) {
			if (!include.relation.composite || !dialect.solveComposite) {
				await this.updateInclude(include, data)
			}
		}
		return changeCount
	}

	private async updateInclude (include: Include, data: Data): Promise<void> {
		const children = data.get(include.relation.name)
		if (children) {
			if (include.relation.type === RelationType.manyToOne) {
				for (const child of children) {
					const childData = new Data(child, data)
					await this.executor._execute(include.query, childData)
				}
			} else {
				const childData = new Data(children, data)
				await this.executor._execute(include.query, childData)
			}
		}
	}
}

class QueryDeleteExecutor {
	public options: QueryOptions
	private executor: IQueryInternalExecutor
	constructor (executor: IQueryInternalExecutor, options: QueryOptions) {
		this.options = options
		this.executor = executor
	}

	public async delete (query: Query, data: Data, mapping: MappingConfig, dialect: Dialect, connection: Connection): Promise<number> {
		// before remove relations entities
		for (const include of query.includes) {
			if (!include.relation.composite || !dialect.solveComposite) {
				await this.deleteInclude(include, data)
			}
		}
		// remove main entity
		return connection.delete(mapping, dialect, query, data)
	}

	private async deleteInclude (include: Include, data: Data):Promise<void> {
		const relation = data.get(include.relation.name)
		if (relation) {
			if (include.relation.type === 'manyToOne') {
				for (const child of relation) {
					const childData = new Data(child, data)
					await this.executor._execute(include.query, childData)
				}
			} else {
				const childData = new Data(relation, data)
				await this.executor._execute(include.query, childData)
			}
		}
	}
}

export class QueryExecutor implements IQueryInternalExecutor {
	public options: QueryOptions
	private languages: Languages
	private connectionManager: ConnectionManager
	private connections: any
	private transactional: boolean
	private schemaManager: SchemaManager
	private selectExecutor: QuerySelectExecutor
	private insertExecutor: QueryInsertExecutor
	private bulkInsertExecutor: QueryBulkInsertExecutor
	private updateExecutor: QueryUpdateExecutor
	private deleteExecutor: QueryDeleteExecutor

	constructor (connectionManager: ConnectionManager, languages: Languages, schemaManager: SchemaManager, expressions: IExpressions, options: QueryOptions, transactional = false) {
		this.connectionManager = connectionManager
		this.languages = languages
		this.options = options
		this.schemaManager = schemaManager
		this.transactional = transactional
		this.connections = {}
		this.selectExecutor = new QuerySelectExecutor(this, expressions, options)
		this.insertExecutor = new QueryInsertExecutor(this, expressions, options)
		this.bulkInsertExecutor = new QueryBulkInsertExecutor(this, expressions, options)
		this.updateExecutor = new QueryUpdateExecutor(this, expressions, options)
		this.deleteExecutor = new QueryDeleteExecutor(this, options)
	}

	private async getConnection (source: string): Promise<Connection> {
		let connection = this.connections[source]
		if (connection === undefined) {
			connection = await this.connectionManager.acquire(source)
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
			await this.connectionManager.release(connection)
		}
		this.connections = {}
	}

	public async execute (query: Query, data: any): Promise<any> {
		const _data = new Data(data)
		if ([SentenceAction.insert, SentenceAction.update, SentenceAction.bulkInsert].includes(query.action)) {
			await this._execute(query, _data)
			return _data
		} else {
			return this._execute(query, _data)
		}
	}

	public async _execute (query: Query, data: Data): Promise<any> {
		let result: any
		const source = this.schemaManager.source.get(query.source)
		const mapping = this.schemaManager.mapping.getInstance(source.mapping)
		const connection = await this.getConnection(source.name)
		const dialect = this.languages.getDialect(query.dialect)
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
		default:
			throw new ExecutionError(query.source, query.entity, JSON.stringify(query.sentence), `query action ${query.action} undefined`)
		}
		return result
	}
}
