
import { Data, OrmOptions, ExecutionError, Query, Include, RelationType, ValidationError, EntityMapping, Constraint, Behavior } from '../model'
import { Connection, ConnectionManager } from '../connection'
import { MappingConfig } from './schema'
import { SchemaManager, Helper, Languages, Dialect } from '.'
import { Expressions } from 'js-expressions'

export class QueryExecutor {
	public options: OrmOptions
	private languages: Languages
	private connectionManager: ConnectionManager
	private connections: any
	private transactional: boolean
	private schemaManager: SchemaManager
	private expressions: Expressions

	constructor (connectionManager: ConnectionManager, languages: Languages, schemaManager: SchemaManager, expressions: Expressions, options: OrmOptions, transactional = false) {
		this.connectionManager = connectionManager
		this.languages = languages
		this.options = options
		this.schemaManager = schemaManager
		this.transactional = transactional
		this.expressions = expressions
		this.connections = {}
	}

	private async getConnection (dataSource: string): Promise<Connection> {
		let connection = this.connections[dataSource]
		if (connection === undefined) {
			connection = await this.connectionManager.acquire(dataSource)
			if (this.transactional) {
				await connection.beginTransaction()
			}
			this.connections[dataSource] = connection
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
		if (['insert', 'update', 'bulkInsert'].includes(query.name)) {
			await this._execute(query, _data)
			return _data
		} else {
			return this._execute(query, _data)
		}
	}

	private async _execute (query: Query, data: Data): Promise<any> {
		let result: any
		const dataSource = this.schemaManager.dataSource.get(query.dataSource)
		const mapping = this.schemaManager.mapping.getInstance(dataSource.mapping)
		const connection = await this.getConnection(dataSource.name)
		const dialect = this.languages.getDialect(query.dialect)
		switch (query.name) {
		case 'select': result = await this.select(query, data, mapping, dialect, connection); break
		case 'insert': result = await this.insert(query, data, mapping, dialect, connection); break
		case 'bulkInsert': result = await this.bulkInsert(query, data, mapping, dialect, connection); break
		case 'update': result = await this.update(query, data, mapping, dialect, connection); break
		case 'delete': result = await this.delete(query, data, mapping, dialect, connection); break
		case 'truncateEntity': result = await connection.truncateEntity(mapping, query); break
		case 'createEntity': result = await connection.createEntity(mapping, query); break
		case 'createSequence': result = await connection.createSequence(mapping, query); break
		case 'createFk': result = await connection.createFk(mapping, query); break
		case 'createIndex': result = await connection.createIndex(mapping, query); break
		case 'alterProperty': result = await connection.alterProperty(mapping, query); break
		case 'addProperty': result = await connection.addProperty(mapping, query); break
		case 'addPk': result = await connection.addPk(mapping, query); break
		case 'addUk': result = await connection.addUk(mapping, query); break
		case 'addFk': result = await connection.addFk(mapping, query); break
		case 'dropSequence': result = await connection.dropSequence(mapping, query); break
		case 'dropEntity': result = await connection.dropEntity(mapping, query); break
		case 'dropProperty': result = await connection.dropProperty(mapping, query); break
		case 'dropPk': result = await connection.dropPk(mapping, query); break
		case 'dropUk': result = await connection.dropUk(mapping, query); break
		case 'dropFK': result = await connection.dropFK(mapping, query); break
		case 'dropIndex': result = await connection.dropIndex(mapping, query); break
		default:
			throw new ExecutionError(query.dataSource, query.entity, JSON.stringify(query.sentence), `query ${query.name} undefined`)
		}
		return result
	}

	private async select (query: Query, data: Data, mapping: MappingConfig, dialect: Dialect, connection: Connection): Promise<any> {
		const mainResult = await connection.select(mapping, dialect, query, data)
		const entity = mapping.getEntity(query.entity) as EntityMapping

		if (mainResult.length > 0) {
			// get rows for include relations
			if (entity.hadReadValues) {
				this.solveReadValues(query, mainResult)
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
		return { ids: ids, result: result }
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
		const includeResult = await this._execute(include.query, data)
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

	private async insert (query: Query, data: Data, mapping: MappingConfig, dialect: Dialect, connection: Connection): Promise<any> {
		// before insert the relationships of the type oneToOne and oneToMany
		const autoIncrement = mapping.getAutoIncrement(query.entity)
		const entity = mapping.getEntity(query.entity) as EntityMapping

		await this.insertIncludeBefore(query, data, dialect)
		// solve default properties
		if (entity.hadDefaults) {
			this.solveDefaults(query, data.data)
		}
		// solve default properties
		if (entity.hadWriteValues) {
			this.solveWriteValues(query, data.data)
		}
		// evaluate constraints
		this.constraints(query, data.data)
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
					const relationId = await this._execute(include.query, relationData)
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
						await this._execute(include.query, childData)
					}
				}
			}
		}
	}

	private async bulkInsert (query: Query, data: Data, mapping: MappingConfig, dialect: Dialect, connection: Connection): Promise<any[]> {
		const entity = mapping.getEntity(query.entity) as EntityMapping

		// before insert the relationships of the type oneToMany and oneToOne with relation not nullable\
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

		// after insert the relationships of the type manyToOne and oneToOne with relation nullable
		await this.bulkInsertIncludesAfter(query, data, mapping, dialect)

		return ids
	}

	private async bulkInsertIncludesBefore (query: Query, data: Data, entity: EntityMapping, dialect: Dialect): Promise<void> {
		for (const include of query.includes) {
			if (!include.relation.composite || !dialect.solveComposite) {
				const relationProperty = entity.properties.find(q => q.name === include.relation.from)

				if (include.relation.type === RelationType.oneToMany) {
					await this.bulkInsertIncludeBeforeOneToMany(include, data)
				} else if (include.relation.type === RelationType.oneToOne && relationProperty && !relationProperty.nullable) {
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
		const allChildrenId = await this._execute(include.query, childData)
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
			const allChildrenId = await this._execute(include.query, childData)
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
				} else if (include.relation.type === RelationType.oneToOne && !!relationProperty.nullable) {
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
		await this._execute(include.query, childData)
	}

	private async bulkInsertIncludeAfterOneToOne (query: Query, include: Include, data: Data): Promise<void> {
		const allChildren: any[] = []
		const items: any[] = []
		for (const item of data.data) {
			const parentId = item[include.relation.from]
			const child = item[include.relation.name]
			if (!parentId) {
				throw new ExecutionError(query.dataSource, query.entity, JSON.stringify(query.sentence), `parentId not found in ${include.relation.from}`, item)
			}
			if (child) {
				child[include.relation.to] = parentId
				allChildren.push(child)
				items.push(item)
			}
		}
		if (allChildren.length > 0) {
			const childData = new Data(allChildren, data)
			const allChildrenId = await this._execute(include.query, childData)
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
			this.solveDefaults(query, chunk)
		}
		// solve write properties
		if (entity.hadWriteValues) {
			this.solveWriteValues(query, chunk)
		}
		// evaluate constraints
		this.constraints(query, chunk)
		return connection.bulkInsert(mapping, dialect, query, chunk)
	}

	private async update (query: Query, data: Data, mapping: MappingConfig, dialect: Dialect, connection: Connection): Promise<number> {
		const entity = mapping.getEntity(query.entity)
		// solve default properties
		if (entity && entity.hadWriteValues) {
			this.solveWriteValues(query, data.data)
		}
		// evaluate constraints
		this.constraints(query, data.data)
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
					await this._execute(include.query, childData)
				}
			} else {
				const childData = new Data(children, data)
				await this._execute(include.query, childData)
			}
		}
	}

	private async delete (query: Query, data: Data, mapping: MappingConfig, dialect: Dialect, connection: Connection): Promise<number> {
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
					await this._execute(include.query, childData)
				}
			} else {
				const childData = new Data(relation, data)
				await this._execute(include.query, childData)
			}
		}
	}

	/**
	 * solve default properties
	 * @param query
	 * @param data
	 */
	private solveDefaults(query: Query, data: any[]): void
	private solveDefaults(query: Query, data: any): void
	private solveDefaults (query: Query, data: any | any[]): void {
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

	private solveWriteValues(query: Query, data: any[]): void
	private solveWriteValues(query: Query, data: any): void
	private solveWriteValues (query: Query, data: any | any[]): void {
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

	private constraints(query: Query, data: any[]): void
	private constraints(query: Query, data: any): void
	private constraints (query: Query, data: any | any[]): void {
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
			throw new ValidationError(query.dataSource, query.entity, JSON.stringify(query.sentence), constraint.message, data)
		}
	}

	private solveReadValues (query: Query, data: any[]): void {
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
					const context = Helper.clone(item)
					context[valueBehavior.property] = item[valueBehavior.alias]
					item[valueBehavior.alias] = this.expressions.eval(valueBehavior.expression, context)
				}
			}
		}
	}
}
