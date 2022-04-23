
import { Data, ExecutionError, Query, Include, RelationType, ValidationError, EntityMapping, PropertyMapping } from '../model'
import { Connection, ConnectionManager } from '../connection'
import { MappingConfig } from './schema'
import { SchemaManager, Helper, Languages, Dialect } from '.'
import { Expressions } from 'js-expressions'

export class QueryExecutor {
	public stage: string
	public view: string | undefined
	private languages: Languages
	private connectionManager: ConnectionManager
	private connections: any
	private transactionable: boolean
	private schemaManager: SchemaManager
	private expressions: Expressions

	constructor(connectionManager: ConnectionManager, languages: Languages, schemaManager: SchemaManager, expressions: Expressions, stage: string, view: string | undefined, transactionable = false) {
		this.connectionManager = connectionManager
		this.languages = languages
		this.stage = stage
		this.view = view
		this.schemaManager = schemaManager
		this.transactionable = transactionable
		this.expressions = expressions
		this.connections = {}
	}

	private async getConnection(dataSource: string): Promise<Connection> {
		let connection = this.connections[dataSource]
		if (connection === undefined) {
			connection = await this.connectionManager.acquire(dataSource)
			if (this.transactionable) {
				await connection.beginTransaction()
			}
			this.connections[dataSource] = connection
		}
		return connection
	}

	public async commit(): Promise<void> {
		for (const p in this.connections) {
			const connection = this.connections[p]
			await connection.commit()
		}
	}

	public async rollback(): Promise<void> {
		for (const p in this.connections) {
			const connection = this.connections[p]
			await connection.rollback()
		}
	}

	public async release(): Promise<void> {
		for (const p in this.connections) {
			const connection = this.connections[p]
			await this.connectionManager.release(connection)
		}
		this.connections = {}
	}

	public async execute(query: Query, data: any): Promise<any> {
		const _data = new Data(data)
		if (['insert', 'update', 'bulkInsert'].includes(query.name)) {
			await this._execute(query, _data)
			return _data
		} else {
			return await this._execute(query, _data)
		}
	}

	private async _execute(query: Query, data: Data): Promise<any> {
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

	private async select(query: Query, data: Data, mapping: MappingConfig, dialect: Dialect, connection: Connection): Promise<any> {
		const mainResult = await connection.select(mapping, dialect, query, data)
		const chunkSize = 999 // 7000
		const entity = mapping.getEntity(query.entity) as EntityMapping

		if (mainResult.length > 0) {
			// get rows for include relations
			if (entity.hadReadValues) {
				this.solveReadValues(query, mainResult)
			}
			const chunksByKey: any = {}
			let chunks: any[] = []
			for (const p in query.includes) {
				const include = query.includes[p]
				const keyId = '__' + include.relation.from

				if (!chunksByKey[keyId]) {
					if (mainResult.length > chunkSize) {
						const promises: any[] = []
						for (let i = 0; i < mainResult.length; i += chunkSize) {
							const chunk = mainResult.slice(i, i + chunkSize)
							promises.push(this.selectChunkResult(chunk, keyId))
						}
						chunks = await Promise.all(promises)
					} else {
						chunks = [this.selectChunkResult(mainResult, keyId)]
					}
				} else {
					chunks = chunksByKey[keyId]
				}

				if (chunks.length === 1) {
					if (chunks[0].ids !== undefined && chunks[0].ids.length > 0) {
						await this.selectChild(include, data, chunks[0].ids, chunks[0].result)
					}
				} else {
					const promises: any[] = []
					for (let i = 0; i < chunks.length; i++) {
						if (chunks[i].ids !== undefined && chunks[i].ids.length > 0) {
							promises.push(this.selectChild(include, data, chunks[i].ids, chunks[i].result))
						}
					}
					await Promise.all(promises)
				}
			}
			// clear temporal fields used for include relations
			for (const p in query.includes) {
				const include = query.includes[p]
				const keyId = '__' + include.relation.from
				for (let i = 0; i < mainResult.length; i++) {
					const element = mainResult[i]
					const item = element[include.name]
					delete element[keyId]
					if (include.relation.type === RelationType.manyToOne) {
						for (let j = 0; j < item.length; j++) {
							const child = item[j]
							if (child.LamdaOrmParentId) {
								delete child.LamdaOrmParentId
							}
						}
					} else if (item && item.LamdaOrmParentId) {
						delete item.LamdaOrmParentId
					}
				}
			}
		}
		return mainResult
	}

	private selectChunkResult(result: any[], keyId: string): any {
		const ids: any[] = []
		for (let i = 0; i < result.length; i++) {
			const id = result[i][keyId]
			// Replace for performance
			let exists = false
			for (let j = 0; j < ids.length; j++) {
				if (ids[j] === id) {
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

	private selectChunkIds(result: any[], keyId: string): any[] {
		const ids: any[] = []
		for (let i = 0; i < result.length; i++) {
			const id = result[i][keyId]
			// Replace for performance
			let exists = false
			for (let j = 0; j < ids.length; j++) {
				if (ids[j] === id) {
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

	private async selectChild(include: Include, _data: Data, ids: any[], mainResult: any): Promise<any> {
		const data = _data.clone()
		data.set('LamdaOrmParentId', ids)
		const keyId = '__' + include.relation.from
		const includeResult = await this._execute(include.query, data)
		if (include.relation.type === RelationType.manyToOne) {
			const chunkSize = 10000
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
			const chunkSize = 10000
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

	private selectChildSetManyToOne(mainResult: any[], includeResult: any[], propertyName: string, keyId: string) {
		for (let i = 0; i < mainResult.length; i++) {
			const element = mainResult[i]
			const relationId = element[keyId]
			if (element[propertyName] === undefined) {
				element[propertyName] = []
			}
			for (let j = 0; j < includeResult.length; j++) {
				if (includeResult[j].LamdaOrmParentId === relationId) {
					element[propertyName].push(includeResult[j])
				}
			}
		}
	}

	private selectChildSetOneToMany(mainResult: any[], includeResult: any[], propertyName: string, keyId: string) {
		for (let i = 0; i < mainResult.length; i++) {
			const element = mainResult[i]
			const relationId = element[keyId]
			if (element[propertyName] === undefined) {
				element[propertyName] = null
			}
			for (let j = 0; j < includeResult.length; j++) {
				if (includeResult[j].LamdaOrmParentId === relationId) {
					element[propertyName] = includeResult[j]
					break
				}
			}
		}
	}

	private async insert(query: Query, data: Data, mapping: MappingConfig, dialect: Dialect, connection: Connection): Promise<any> {
		// before insert the relationships of the type oneToOne and oneToMany
		const autoincrement = mapping.getAutoincrement(query.entity)
		const entity = mapping.getEntity(query.entity) as EntityMapping
		for (const p in query.includes) {
			const include = query.includes[p]
			const relation = data.get(include.relation.name)
			if (relation) {
				if (include.relation.type === 'oneToOne' || include.relation.type === 'oneToMany') {
					const relationData = new Data(relation, data)
					const relationId = await this._execute(include.query, relationData)
					data.set(include.relation.from, relationId)
				}
			}
		}
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
		if (autoincrement) {
			data.set(autoincrement.name, insertId)
		}
		// after insert the relationships of the type oneToOne and manyToOne
		for (const p in query.includes) {
			const include = query.includes[p]
			const relation = data.get(include.relation.name)
			if (relation) {
				if (include.relation.type === 'manyToOne') {
					const parentId = data.get(include.relation.from)
					const childPropertyName = include.relation.to
					for (let i = 0; i < relation.length; i++) {
						const child = relation[i]
						child[childPropertyName] = parentId
						const childData = new Data(child, data)
						await this._execute(include.query, childData)
					}
				}
			}
		}
		return insertId
	}

	private async bulkInsert(query: Query, data: Data, mapping: MappingConfig, dialect: Dialect, connection: Connection): Promise<any[]> {
		const entity = mapping.getEntity(query.entity) as EntityMapping

		// before insert the relationships of the type oneToMany and oneToOne with relation not nullable
		for (const p in query.includes) {
			const include = query.includes[p]
			const relationProperty = entity.properties.find(p => p.name === include.relation.from) as PropertyMapping

			if (include.relation.type === RelationType.oneToMany) {
				const allChilds: any[] = []
				const items: any[] = []
				for (let i = 0; i < data.data.length; i++) {
					const item = data.data[i]
					const child = item[include.relation.name]
					if (child) {
						allChilds.push(child)
						items.push(item)
					}
				}
				const childData = new Data(allChilds, data)
				const allChildsId = await this._execute(include.query, childData)
				for (let i = 0; i < items.length; i++) {
					const item = items[i]
					if (item[include.relation.name]) {
						item[include.relation.from] = allChildsId[i]
					}
				}
			} else if (include.relation.type === RelationType.oneToOne && !relationProperty.nullable) {
				const allChilds: any[] = []
				const items: any[] = []
				for (let i = 0; i < data.data.length; i++) {
					const item = data.data[i]
					const child = item[include.relation.name]
					if (child) {
						allChilds.push(child)
						items.push(item)
					}
				}
				if (allChilds.length > 0) {
					const childData = new Data(allChilds, data)
					const allChildsId = await this._execute(include.query, childData)
					for (let i = 0; i < items.length; i++) {
						const item = items[i]
						if (item[include.relation.name]) {
							item[include.relation.from] = allChildsId[i]
						}
					}
				}
			}
		}

		// insert data
		const chunkSize = 100000
		let ids: any[] = []
		for (let i = 0; i < data.data.length; i += chunkSize) {
			const chunk = data.data.slice(i, i + chunkSize)
			const result = await this._chunkInsert(query, entity, chunk, mapping, dialect, connection)
			ids = ids.concat(result)
		}
		const autoincrement = mapping.getAutoincrement(query.entity)
		if (autoincrement) {
			for (let i = 0; i < data.data.length; i++) {
				data.data[i][autoincrement.name] = ids[i]
			}
		}

		// after insert the relationships of the type manyToOne and oneToOne with relation nullable
		for (const p in query.includes) {
			const include = query.includes[p]
			const relationProperty = mapping.getProperty(query.entity, include.relation.from)
			if (include.relation.type === RelationType.manyToOne) {
				const allChilds: any[] = []
				for (let i = 0; i < data.data.length; i++) {
					const item = data.data[i]
					const parentId = item[include.relation.from]
					const childs = item[include.relation.name]
					if (childs) {
						for (let j = 0; j < childs.length; j++) {
							const child = childs[j]
							child[include.relation.to] = parentId
							allChilds.push(child)
						}
					}
				}
				const childData = new Data(allChilds, data)
				await this._execute(include.query, childData)
			} else if (include.relation.type === RelationType.oneToOne && !!relationProperty.nullable) {
				const allChilds: any[] = []
				const items: any[] = []
				for (let i = 0; i < data.data.length; i++) {
					const item = data.data[i]
					const parentId = item[include.relation.from]
					const child = item[include.relation.name]
					if (!parentId) {
						throw new ExecutionError(query.dataSource, query.entity, JSON.stringify(query.sentence), `parentId not found in ${include.relation.from}`, item)
					}
					if (child) {
						child[include.relation.to] = parentId
						allChilds.push(child)
						items.push(item)
					}
				}
				if (allChilds.length > 0) {
					const childData = new Data(allChilds, data)
					const allChildsId = await this._execute(include.query, childData)
					for (let i = 0; i < items.length; i++) {
						const item = items[i]
						if (item[include.relation.name]) {
							item[include.relation.from] = allChildsId[i]
						}
					}
				}
			}
		}
		return ids
	}

	private async _chunkInsert(query: Query, entity: EntityMapping, chunk: any[], mapping: MappingConfig, dialect: Dialect, connection: Connection): Promise<any[]> {
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
		return await connection.bulkInsert(mapping, dialect, query, chunk)
	}

	private async update(query: Query, data: Data, mapping: MappingConfig, dialect: Dialect, connection: Connection): Promise<number> {
		const entity = mapping.getEntity(query.entity) as EntityMapping
		// solve default properties
		if (entity.hadWriteValues) {
			this.solveWriteValues(query, data.data)
		}
		// evaluate constraints
		this.constraints(query, data.data)
		// update
		const changeCount = await connection.update(mapping, dialect, query, data)
		for (const p in query.includes) {
			const include = query.includes[p]
			const relation = data.get(include.relation.name)
			if (relation) {
				if (include.relation.type === RelationType.manyToOne) {
					for (let i = 0; i < relation.length; i++) {
						const child = relation[i]
						const childData = new Data(child, data)
						await this._execute(include.query, childData)
					}
				} else {
					const childData = new Data(relation, data)
					await this._execute(include.query, childData)
				}
			}
		}
		return changeCount
	}

	private async delete(query: Query, data: Data, mapping: MappingConfig, dialect: Dialect, connection: Connection): Promise<number> {
		// before remove relations entities
		for (const p in query.includes) {
			const include = query.includes[p]
			const relation = data.get(include.relation.name)
			if (relation) {
				if (include.relation.type === 'manyToOne') {
					for (let i = 0; i < relation.length; i++) {
						const child = relation[i]
						const childData = new Data(child, data)
						await this._execute(include.query, childData)
					}
				} else {
					const childData = new Data(relation, data)
					await this._execute(include.query, childData)
				}
			}
		}
		// remove main entity
		const changeCount = await connection.delete(mapping, dialect, query, data)
		return changeCount
	}

	/**
	 * solve default properties
	 * @param mapping
	 * @param entityName
	 * @param data
	 */
	private solveDefaults(query: Query, data: any[]): void
	private solveDefaults(query: Query, data: any): void
	private solveDefaults(query: Query, data: any | any[]): void {
		if (Array.isArray(data)) {
			for (const i in query.defaults) {
				const defaultBehavior = query.defaults[i]
				for (let i = 0; i < data.length; i++) {
					const value = data[i][defaultBehavior.property]
					if (value === undefined) {
						data[i][defaultBehavior.property] = this.expressions.eval(defaultBehavior.expression, data[i])
					}
				}
			}
		} else {
			for (const i in query.defaults) {
				const defaultBehavior = query.defaults[i]
				const value = data[defaultBehavior.property]
				if (value === undefined) {
					data[defaultBehavior.property] = this.expressions.eval(defaultBehavior.expression, data)
				}
			}
		}
	}

	private solveWriteValues(query: Query, data: any[]): void
	private solveWriteValues(query: Query, data: any): void
	private solveWriteValues(query: Query, data: any | any[]): void {
		if (Array.isArray(data)) {
			for (const i in query.values) {
				const valueBehavior = query.values[i]
				for (let i = 0; i < data.length; i++) {
					data[i][valueBehavior.property] = this.expressions.eval(valueBehavior.expression, data[i])
				}
			}
		} else {
			for (const i in query.values) {
				const valueBehavior = query.values[i]
				data[valueBehavior.property] = this.expressions.eval(valueBehavior.expression, data)
			}
		}
	}

	private constraints(query: Query, data: any[]): void
	private constraints(query: Query, data: any): void
	private constraints(query: Query, data: any | any[]): void {
		if (Array.isArray(data)) {
			for (const i in query.constraints) {
				const constraint = query.constraints[i]
				for (let i = 0; i < data.length; i++) {
					if (!this.expressions.eval(constraint.condition, data[i])) {
						throw new ValidationError(query.dataSource, query.entity, JSON.stringify(query.sentence), constraint.message, data[i])
					}
				}
			}
		} else {
			for (const i in query.constraints) {
				const constraint = query.constraints[i]
				if (!this.expressions.eval(constraint.condition, data)) {
					throw new ValidationError(query.dataSource, query.entity, JSON.stringify(query.sentence), constraint.message, data)
				}
			}
		}
	}

	private solveReadValues(query: Query, data: any[]): void {
		for (const i in query.values) {
			const valueBehavior = query.values[i]
			if (valueBehavior.alias === valueBehavior.property) {
				// Example Users.map(p=> [p.email]) or Users.map(p=> {email:p.email})
				for (let i = 0; i < data.length; i++) {
					data[i][valueBehavior.alias] = this.expressions.eval(valueBehavior.expression, data[i])
				}
			} else if (valueBehavior.alias) {
				// Example Users.map(p=> {mail:p.email})
				// since the expression contains the name of the property and not the alias
				// the property must be added with the alias value.
				for (let i = 0; i < data.length; i++) {
					const context = Helper.clone(data[i])
					context[valueBehavior.property] = data[i][valueBehavior.alias]
					data[i][valueBehavior.alias] = this.expressions.eval(valueBehavior.expression, context)
				}
			}
		}
	}
}
