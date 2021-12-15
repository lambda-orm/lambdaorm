
import { Data, Parameter, Query, DataSource, IEvaluator } from './../model'
import { Connection, ConnectionManager } from './../connection'
import { DialectMetadata } from './../language/dialectMetadata'
import { LanguageManager } from './../language'
import { MappingConfig } from './config'

export class QueryExecutor {
	public dataSource: DataSource
	private languageManager: LanguageManager
	private connectionManager: ConnectionManager
	private connections: any
	private transactionable: boolean
	private mapping: MappingConfig
	private evaluator:IEvaluator
	constructor (connectionManager: ConnectionManager, languageManager: LanguageManager, evaluator:IEvaluator, dataSource: DataSource, mapping:MappingConfig, transactionable = false) {
		this.connectionManager = connectionManager
		this.languageManager = languageManager
		this.dataSource = dataSource
		this.mapping = mapping
		this.transactionable = transactionable
		this.evaluator = evaluator
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

	private async getDatastore (query: Query, context: any): Promise<string> {
		const actionType = query.sentence === 'select' ? 'read' : 'command'
		const queryInfo = { entity: query.entity, action: query.name, actionType: actionType, sentence: query.sentence }
		const _context = { query: queryInfo, context: context }
		for (const i in this.dataSource.rules) {
			const rule = this.dataSource.rules[i]
			if (await this.evaluator.eval(rule.rule, _context) === true) {
				return rule.dataSource
			}
		}
		return this.dataSource.name
	}

	public async execute (query: Query, data: any, context: any): Promise<any> {
		const _data = new Data(data)
		return await this._execute(query, _data, context)
	}

	protected async _execute (query:Query, data:Data, context: any):Promise<any> {
		let result: any
		try {
			const dataSource = await this.getDatastore(query, context)
			const connection = await this.getConnection(dataSource)
			const metadata = this.languageManager.dialectMetadata(query.dialect)
			switch (query.name) {
			case 'select': result = await this.select(query, data, metadata, connection, context); break
			case 'insert': result = await this.insert(query, data, metadata, connection, context); break
			case 'update': result = await this.update(query, data, metadata, connection, context); break
			case 'delete': result = await this.delete(query, data, metadata, connection, context); break
			case 'bulkInsert': result = await this.bulkInsert(query, data, metadata, connection, context); break
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
				throw new Error(`query ${query.name} undefined`)
			}
		} catch (error: any) {
			console.log(error)
		}
		return result
	}

	protected async select (query:Query, data:Data, metadata:DialectMetadata, connection:Connection, context: any):Promise<any> {
		const mainResult = await connection.select(this.mapping, query, this.params(query.parameters, metadata, data))
		if (mainResult.length > 0) {
			for (const p in query.children) {
				const include = query.children[p]
				const ids:any[] = []
				for (let i = 0; i < mainResult.length; i++) {
					const id = mainResult[i]['__' + include.relation.from]
					if (!ids.includes(id)) { ids.push(id) }
				}
				data.set('__parentId', ids)
				const includeResult = await this._execute(include.children[0], data, context)
				for (let i = 0; i < mainResult.length; i++) {
					const element = mainResult[i]
					const relationId = element['__' + include.relation.from]
					element[include.name] = (include.relation.type === 'manyToOne')
						? includeResult.filter((p:any) => p.__parentId === relationId)
						: includeResult.find((p: any) => p.__parentId === relationId)
				}
				// clear temporal fields used for include relations
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

	protected async insert (query:Query, data:Data, metadata:DialectMetadata, connection:Connection, context: any):Promise<number> {
	// before insert the relationships of the type oneToOne and oneToMany
		const autoincrement = this.mapping.getAutoincrement(query.entity)
		for (const p in query.children) {
			const include = query.children[p]
			const relation = data.get(include.relation.name)
			if (relation) {
				if (include.relation.type === 'oneToOne' || include.relation.type === 'oneToMany') {
					const relationData = new Data(relation, data)
					const relationId = await this._execute(include.children[0], relationData, context)
					data.set(include.relation.from, relationId)
				}
			}
		}
		// insert main entity
		const insertId = await connection.insert(this.mapping, query, this.params(query.parameters, metadata, data))
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
						await this._execute(include.children[0], childData, context)
					}
				}
			}
		}
		return insertId
	}

	protected async bulkInsert (query:Query, data:Data, metadata:DialectMetadata, connection:Connection, context: any):Promise<number[]> {
	// before insert the relationships of the type oneToOne and oneToMany
		const autoincrement = this.mapping.getAutoincrement(query.entity)
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
				const allChildsId = await this._execute(include.children[0], childData, context)
				for (let i = 0; i < data.data.length; i++) {
					const item = data.data[i]
					if (item[include.relation.name]) { item[include.relation.from] = allChildsId[i] }
				}
			}
		}
		// insert main entity
		const ids = await connection.bulkInsert(this.mapping, query, this.rows(query, metadata, data.data), query.parameters)
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
				await this._execute(include.children[0], childData, context)
			}
		}
		return ids
	}

	protected async update (query:Query, data:Data, metadata:DialectMetadata, connection:Connection, context: any):Promise<any> {
		const changeCount = await connection.update(this.mapping, query, this.params(query.parameters, metadata, data))
		for (const p in query.children) {
			const include = query.children[p]
			const relation = data.get(include.relation.name)
			if (relation) {
				if (include.relation.type === 'manyToOne') {
					for (let i = 0; i < relation.length; i++) {
						const child = relation[i]
						const childData = new Data(child, data)
						await this._execute(include.children[0], childData, context)
					}
				} else {
					const childData = new Data(relation, data)
					await this._execute(include.children[0], childData, context)
				}
			}
		}
		return changeCount
	}

	protected async delete (query:Query, data:Data, metadata:DialectMetadata, connection:Connection, context: any):Promise<any> {
	// before remove relations entities
		for (const p in query.children) {
			const include = query.children[p]
			const relation = data.get(include.relation.name)
			if (relation) {
				if (include.relation.type === 'manyToOne') {
					for (let i = 0; i < relation.length; i++) {
						const child = relation[i]
						const childData = new Data(child, data)
						await this._execute(include.children[0], childData, context)
					}
				} else {
					const childData = new Data(relation, data)
					await this._execute(include.children[0], childData, context)
				}
			}
		}
		// remove main entity
		const changeCount = await connection.delete(this.mapping, query, this.params(query.parameters, metadata, data))
		return changeCount
	}

	protected params (parameters:Parameter[], metadata:DialectMetadata, data:Data):Parameter[] {
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

	protected rows (query:Query, metadata:DialectMetadata, array:any[]) {
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
}
