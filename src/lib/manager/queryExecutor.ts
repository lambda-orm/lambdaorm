
import { Data, ExecutionError, Parameter, Query, ValidationError } from '../model'
import { Connection, ConnectionManager } from '../connection'
import { DialectMetadata } from '../language/dialectMetadata'
import { LanguageManager } from '../language'
import { MappingConfig } from './schema'
import { SchemaManager, Helper } from '.'
import { Expressions } from 'js-expressions'

export class QueryExecutor {
	public stage: string
	private languageManager: LanguageManager
	private connectionManager: ConnectionManager
	private connections: any
	private transactionable: boolean
	private schemaManager: SchemaManager
	private expressions: Expressions

	constructor (connectionManager: ConnectionManager, languageManager: LanguageManager, schemaManager:SchemaManager, expressions: Expressions, stage: string, transactionable = false) {
		this.connectionManager = connectionManager
		this.languageManager = languageManager
		this.stage = stage
		this.schemaManager = schemaManager
		this.transactionable = transactionable
		this.expressions = expressions
		this.connections = {}
	}

	private async getConnection (dataSource: string): Promise<Connection> {
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
		return await this._execute(query, _data)
	}

	private async _execute (query:Query, data:Data):Promise<any> {
		let result: any
		const dataSource = this.schemaManager.dataSource.get(query.dataSource)
		const mapping = this.schemaManager.mapping.getInstance(dataSource.mapping)
		const connection = await this.getConnection(dataSource.name)
		const metadata = this.languageManager.dialectMetadata(query.dialect)
		switch (query.name) {
		case 'select': result = await this.select(query, data, mapping, metadata, connection); break
		case 'insert': result = await this.insert(query, data, mapping, metadata, connection); break
		case 'update': result = await this.update(query, data, mapping, metadata, connection); break
		case 'delete': result = await this.delete(query, data, mapping, metadata, connection); break
		case 'bulkInsert': result = await this.bulkInsert(query, data, mapping, metadata, connection); break
		case 'truncateTable': result = await connection.execute(query); break
		case 'createTable': result = await connection.execute(query); break
		case 'createFk': result = await connection.execute(query); break
		case 'createIndex': result = await connection.execute(query); break
		case 'alterColumn': result = await connection.execute(query); break
		case 'addColumn': result = await connection.execute(query); break
		case 'addPk': result = await connection.execute(query); break
		case 'addUk': result = await connection.execute(query); break
		case 'addFk': result = await connection.execute(query); break
		case 'dropTable': result = await connection.execute(query); break
		case 'dropColumn': result = await connection.execute(query); break
		case 'dropPk': result = await connection.execute(query); break
		case 'dropUk': result = await connection.execute(query); break
		case 'dropFK': result = await connection.execute(query); break
		case 'dropIndex': result = await connection.execute(query); break
		default:
			throw new ExecutionError(query.dataSource, query.entity, query.sentence, `query ${query.name} undefined`)
		}
		return result
	}

	private async select (query: Query, data: Data, mapping: MappingConfig, metadata: DialectMetadata, connection: Connection): Promise<any> {
		const mainResult = await connection.select(mapping, query, this.params(query.parameters, metadata, data))

		if (mainResult.length > 0) {
			// get rows for include relations
			for (let i = 0; i < mainResult.length; i++) {
				const row = mainResult[i]
				this.solveReadValues(query, row)
			}
			for (const p in query.children) {
				const include = query.children[p]
				const ids:any[] = []
				for (let i = 0; i < mainResult.length; i++) {
					const id = mainResult[i]['__' + include.relation.from]
					if (!ids.includes(id)) { ids.push(id) }
				}
				data.set('__parentId', ids)
				const includeResult = await this._execute(include.children[0], data)
				for (let i = 0; i < mainResult.length; i++) {
					const element = mainResult[i]
					const relationId = element['__' + include.relation.from]
					element[include.name] = (include.relation.type === 'manyToOne')
						? includeResult.filter((p:any) => p.__parentId === relationId)
						: includeResult.find((p: any) => p.__parentId === relationId)
				}
			}
			// clear temporal fields used for include relations
			for (const p in query.children) {
				const include = query.children[p]
				for (let i = 0; i < mainResult.length; i++) {
					const element = mainResult[i]
					delete element['__' + include.relation.from]
					if (include.relation.type === 'manyToOne') {
						for (let j = 0; j < element[include.name].length; j++) {
							const child = element[include.name][j]
							if (child.__parentId) {
								delete child.__parentId
							}
						}
					} else if (element[include.name] && element[include.name].__parentId) {
						delete element[include.name].__parentId
					}
				}
			}
		}
		return mainResult
	}

	private async insert (query:Query, data:Data, mapping:MappingConfig, metadata:DialectMetadata, connection:Connection):Promise<number> {
	// before insert the relationships of the type oneToOne and oneToMany
		const autoincrement = mapping.getAutoincrement(query.entity)
		for (const p in query.children) {
			const include = query.children[p]
			const relation = data.get(include.relation.name)
			if (relation) {
				if (include.relation.type === 'oneToOne' || include.relation.type === 'oneToMany') {
					const relationData = new Data(relation, data)
					const relationId = await this._execute(include.children[0], relationData)
					data.set(include.relation.from, relationId)
				}
			}
		}
		// solve default properties
		this.solveDefaults(query, data.data)
		// evaluate constraints
		this.constraints(query, data.data)
		// solve default properties
		this.solveWriteValues(query, data.data)
		// insert main entity
		const insertId = await connection.insert(mapping, query, this.params(query.parameters, metadata, data))
		if (autoincrement) {
			data.set(autoincrement.name, insertId)
		}
		// after insert the relationships of the type oneToOne and manyToOne
		for (const p in query.children) {
			const include = query.children[p]
			const relation = data.get(include.relation.name)
			if (relation) {
				if (include.relation.type === 'manyToOne') {
					const parentId = data.get(include.relation.from)
					const childPropertyName = include.relation.to
					for (let i = 0; i < relation.length; i++) {
						const child = relation[i]
						child[childPropertyName] = parentId
						const childData = new Data(child, data)
						await this._execute(include.children[0], childData)
					}
				}
			}
		}
		return insertId
	}

	private async bulkInsert (query:Query, data:Data, mapping:MappingConfig, metadata:DialectMetadata, connection:Connection):Promise<number[]> {
	// before insert the relationships of the type oneToOne and oneToMany
		const autoincrement = mapping.getAutoincrement(query.entity)
		for (const p in query.children) {
			const include = query.children[p]
			if (include.relation.type === 'oneToOne' || include.relation.type === 'oneToMany') {
				const allChilds:any[] = []
				for (let i = 0; i < data.data.length; i++) {
					const item = data.data[i]
					const child = item[include.relation.name]
					if (child) { allChilds.push(child) }
				}
				const childData = new Data(allChilds, data)
				const allChildsId = await this._execute(include.children[0], childData)
				for (let i = 0; i < data.data.length; i++) {
					const item = data.data[i]
					if (item[include.relation.name]) { item[include.relation.from] = allChildsId[i] }
				}
			}
		}
		// solve default value and transform
		const array:any[] = data.data
		for (let i = 0; i < array.length; i++) {
			const item = array[i]
			// solve default properties
			this.solveDefaults(query, item)
			// evaluate constraints
			this.constraints(query, item)
			// solve write properties
			this.solveWriteValues(query, item)
		}
		// get rows
		const rows = this.rows(query, metadata, array)
		const ids = await connection.bulkInsert(mapping, query, rows, query.parameters)
		if (autoincrement) {
			for (let i = 0; i < data.data.length; i++) {
				data.data[i][autoincrement.name] = ids[i]
			}
		}
		// after insert the relationships of the type oneToOne and manyToOne
		for (const p in query.children) {
			const include = query.children[p]
			if (include.relation.type === 'manyToOne') {
				const allChilds:any[] = []
				for (let i = 0; i < data.data.length; i++) {
					const item = data.data[i]
					const parentId = item[include.relation.from]
					const childPropertyName = include.relation.to
					const childs = item[include.relation.name]
					if (childs) {
						for (let j = 0; j < childs.length; j++) {
							const child = childs[j]
							child[childPropertyName] = parentId
							allChilds.push(child)
						}
					}
				}
				const childData = new Data(allChilds, data)
				await this._execute(include.children[0], childData)
			}
		}
		return ids
	}

	private async update (query:Query, data:Data, mapping:MappingConfig, metadata:DialectMetadata, connection:Connection):Promise<any> {
		// evaluate constraints
		this.constraints(query, data.data)
		// solve default properties
		this.solveWriteValues(query, data.data)
		// update
		const changeCount = await connection.update(mapping, query, this.params(query.parameters, metadata, data))
		for (const p in query.children) {
			const include = query.children[p]
			const relation = data.get(include.relation.name)
			if (relation) {
				if (include.relation.type === 'manyToOne') {
					for (let i = 0; i < relation.length; i++) {
						const child = relation[i]
						const childData = new Data(child, data)
						await this._execute(include.children[0], childData)
					}
				} else {
					const childData = new Data(relation, data)
					await this._execute(include.children[0], childData)
				}
			}
		}
		return changeCount
	}

	private async delete (query:Query, data:Data, mapping:MappingConfig, metadata:DialectMetadata, connection:Connection):Promise<any> {
	// before remove relations entities
		for (const p in query.children) {
			const include = query.children[p]
			const relation = data.get(include.relation.name)
			if (relation) {
				if (include.relation.type === 'manyToOne') {
					for (let i = 0; i < relation.length; i++) {
						const child = relation[i]
						const childData = new Data(child, data)
						await this._execute(include.children[0], childData)
					}
				} else {
					const childData = new Data(relation, data)
					await this._execute(include.children[0], childData)
				}
			}
		}
		// remove main entity
		const changeCount = await connection.delete(mapping, query, this.params(query.parameters, metadata, data))
		return changeCount
	}

	private params (parameters:Parameter[], metadata:DialectMetadata, data:Data):Parameter[] {
		for (const p in parameters) {
			const parameter = parameters[p]
			let value = data.get(parameter.name)
			if (value !== null) {
				switch (parameter.type) {
				case 'datetime':
					value = metadata.solveDateTime(value)
					break
				case 'date':
					value = metadata.solveDate(value)
					break
				case 'time':
					value = metadata.solveTime(value)
					break
				}
				// if (parameter.type === 'datetime') { value = metadata.solveDateTime(value) } else if (parameter.type === 'date') { value = metadata.solveDate(value) } else if (parameter.type == 'time') { value = metadata.solveTime(value) }
			}
			parameter.value = value === undefined ? null : value
		}
		return parameters
	}

	private rows (query:Query, metadata:DialectMetadata, array:any[]) {
		const rows:any[] = []
		for (let i = 0; i < array.length; i++) {
			const item = array[i]
			const row:any[] = []
			for (let j = 0; j < query.parameters.length; j++) {
				const parameter = query.parameters[j]
				let value = item[parameter.name]
				if (value !== null) {
					switch (parameter.type) {
					case 'datetime':
						value = metadata.solveDateTime(value)
						break
					case 'date':
						value = metadata.solveDate(value)
						break
					case 'time':
						value = metadata.solveTime(value)
						break
					}
				}
				row.push(value === undefined ? null : value)
			}
			rows.push(row)
		}
		return rows
	}

	/**
	 * solve default properties
	 * @param mapping
	 * @param entityName
	 * @param data
	 */
	private solveDefaults (query:Query, data:any):void {
		for (const i in query.defaults) {
			const defaultBehavior = query.defaults[i]
			const value = data[defaultBehavior.property]
			if (value === undefined) {
				data[defaultBehavior.property] = this.expressions.eval(defaultBehavior.expression, data)
			}
		}
	}

	private solveWriteValues (query: Query, data: any): void {
		for (const i in query.values) {
			const valueBehavior = query.values[i]
			data[valueBehavior.property] = this.expressions.eval(valueBehavior.expression, data)
		}
	}

	private solveReadValues (query: Query, data: any): void {
		for (const i in query.values) {
			const valueBehavior = query.values[i]
			if (valueBehavior.alias === valueBehavior.property) {
				// Example Users.map(p=> [p.email]) or Users.map(p=> {email:p.email})
				data[valueBehavior.alias] = this.expressions.eval(valueBehavior.expression, data)
			} else if (valueBehavior.alias) {
				// Example Users.map(p=> {mail:p.email})
				// since the expression contains the name of the property and not the alias
				// the property must be added with the alias value.
				const context = Helper.clone(data)
				context[valueBehavior.property] = data[valueBehavior.alias]
				data[valueBehavior.alias] = this.expressions.eval(valueBehavior.expression, context)
			}
		}
	}

	private constraints (query: Query, data: any): void {
		for (const i in query.constraints) {
			const constraint = query.constraints[i]
			if (!this.expressions.eval(constraint.condition, data)) {
				throw new ValidationError(query.dataSource, query.entity, query.sentence, constraint.message, data)
			}
		}
	}
}
