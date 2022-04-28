/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-tabs */

import { Connection, ConnectionConfig, ConnectionPool } from '..'
import { Parameter, Query, Data, MethodNotImplemented, SchemaError, RelationType } from '../../model'
import { MappingConfig, Dialect, Helper } from '../../manager'

export class MongodbConnectionPool extends ConnectionPool {
	private static lib: any
	constructor(config: ConnectionConfig) {
		super(config)
		if (!MongodbConnectionPool.lib) {
			MongodbConnectionPool.lib = require('mongodb')
		}
	}

	public async init(): Promise<void> {
		console.log(`connection mongodb: ${this.config.name} initialized`)
	}

	public async acquire(): Promise<Connection> {
		const client = await MongodbConnectionPool.lib.MongoClient.connect(this.config.connection.url)
		const db = client.db(this.config.connection.database)
		const cnx = { client: client, db: db }
		return new MongodbConnection(cnx, this)
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async release(connection: Connection): Promise<void> {
		connection.cnx.client.close()
	}

	public async end(): Promise<void> {
		console.log(`connection mongodb: ${this.config.name} finalized`)
	}
}

export class MongodbConnection extends Connection {
	private session?: any

	public async select(mapping: MappingConfig, dialect: Dialect, query: Query, data: Data): Promise<any> {
		// https://medium.com/@tomas.knezek/handle-pagination-with-nodejs-and-mongodb-2910ff5e272b
		// https://www.mongodb.com/docs/manual/reference/operator/aggregation-pipeline/

		const collection = mapping.entityMapping(query.entity)
		const params = this.dataToParameters(query, mapping, data)
		const aggregate = this.parseTemplate(query.sentence, params, mapping)

		// const result = this.session
		// 	? await this.cnx.db.collection(collection).find(filter, this.session).aggregate(aggregate).toArray()
		// 	: await this.cnx.db.collection(collection).find(filter).aggregate(aggregate).toArray()
		const result = this.session
			? await this.cnx.db.collection(collection).aggregate(aggregate || []).toArray()
			: await this.cnx.db.collection(collection).aggregate(aggregate || []).toArray()
		return result
	}

	public async insert(mapping: MappingConfig, dialect: Dialect, query: Query, data: Data): Promise<any> {
		const entity = mapping.getEntity(query.entity)
		if (entity === undefined) {
			throw new SchemaError(`EntityMapping not found for entity ${query.entity}`)
		}
		const list = this.getInsertList(mapping, dialect, query, [data.data])
		const obj = list[0]
		if (entity.sequence && entity.primaryKey && entity.primaryKey.length === 1) {
			const propertyPk = entity.primaryKey[0]
			const mappingPk = entity.properties.find(p => p.name === propertyPk)
			if (mappingPk) {
				obj[mappingPk.mapping] = await this.getNextSequenceValue(entity.sequence)
			}
		}

		const result = this.session
			? await this.cnx.db.collection(entity.mapping).insertOne(obj, this.session)
			: await this.cnx.db.collection(entity.mapping).insertOne(obj)

		return typeof result.insertedId === 'object' ? result.insertedId.toString() : result.insertedId
	}

	public async bulkInsert(mapping: MappingConfig, dialect: Dialect, query: Query, array: any[]): Promise<any[]> {
		const entity = mapping.getEntity(query.entity)
		if (entity === undefined) {
			throw new SchemaError(`EntityMapping ${query.entity} not found`)
		}
		const list = this.getInsertList(mapping, dialect, query, array)
		if (entity.sequence && entity.primaryKey && entity.primaryKey.length === 1) {
			const propertyPk = entity.primaryKey[0]
			const mappingPk = entity.properties.find(p => p.name === propertyPk)
			if (mappingPk) {
				const first = await this.getNextSequenceValue(entity.sequence, list.length)
				for (let i = 0; i < list.length; i++) {
					list[i][mappingPk.mapping] = first + i
				}
			}
		}
		const result = this.session
			? await this.cnx.db.collection(entity.mapping).insertMany(list, this.session)
			: await this.cnx.db.collection(entity.mapping).insertMany(list)

		const ids: any[] = []
		for (const p in result.insertedIds) {
			const id = result.insertedIds[p]
			ids.push(typeof id === 'object' ? id.toString() : id)
		}
		return ids
	}

	private getInsertList(mapping: MappingConfig, dialect: Dialect, query: Query, array: any[]): any[] {
		const list = this.arrayToList(query, query.sentence, mapping, array)
		for (const p in query.includes) {
			const include = query.includes[p]
			if (include.relation.composite) {
				const relationEntity = mapping.getEntity(include.relation.entity)
				if (relationEntity === undefined) {
					throw new SchemaError(`EntityMapping ${include.relation.entity} not found`)
				}
				const relationProperty = dialect.delimiter(relationEntity.mapping)
				for (let i = 0; i < array.length; i++) {
					const source = array[i]
					const target = list[i]
					const children = source[include.relation.name]
					if (include.relation.type === RelationType.manyToOne) {
						target[relationProperty] = this.getInsertList(mapping, dialect, include.query, children)
					} else {
						const result = this.getInsertList(mapping, dialect, include.query, [children])
						if (result && result.length > 0) {
							target[relationProperty] = result[0]
						}
					}
				}
			}
		}
		return list
	}

	public async update(mapping: MappingConfig, dialect: Dialect, query: Query, data: Data): Promise<number> {
		const collection = mapping.entityMapping(query.entity)
		const sentence = JSON.parse(query.sentence)
		const params = this.dataToParameters(query, mapping, data)
		const obj = this.getObject(mapping, dialect, query, data)
		const filter = this.parseTemplate(sentence.filter, params, mapping)
		const result = this.session
			? await this.cnx.db.collection(collection).updateMany(filter, obj, this.session)
			: await this.cnx.db.collection(collection).updateMany(filter, obj)
		return result.modifiedCount as number
	}

	public async bulkUpdate(mapping: MappingConfig, dialect: Dialect, query: Query, array: any[]): Promise<number> {
		throw new MethodNotImplemented('MongodbConnection', 'bulkUpdate')
	}

	private getObject(mapping: MappingConfig, dialect: Dialect, query: Query, data: Data): any {
		const sentence = JSON.parse(query.sentence)
		const params = this.dataToParameters(query, mapping, data)
		let obj = this.parseTemplate(sentence.set, params, mapping)
		for (const p in query.includes) {
			const include = query.includes[p]
			if (include.relation.composite) {
				const relationEntity = mapping.getEntity(include.relation.entity)
				const children = data.get(include.relation.name)
				if (children) {
					if (relationEntity === undefined) {
						throw new SchemaError(`EntityMapping ${include.relation.entity} not found`)
					}
					const relationProperty = dialect.delimiter(relationEntity.mapping)
					if (include.relation.type === RelationType.manyToOne) {
						const childList: any[] = []
						for (let i = 0; i < children.length; i++) {
							const child = children[i]
							const childData = new Data(child, data)
							const childObj = this.getObject(mapping, dialect, include.query, childData)
							childList.push(childObj)
						}
						obj[relationProperty] = childList
					} else {
						const childData = new Data(children, data)
						const childObj = this.getObject(mapping, dialect, include.query, childData)
						obj[relationProperty] = childObj
					}
				}
			}
		}
		return obj
	}

	public async delete(mapping: MappingConfig, dialect: Dialect, query: Query, data: Data): Promise<number> {
		const collection = mapping.entityMapping(query.entity)
		const sentence = JSON.parse(query.sentence)
		const params = this.dataToParameters(query, mapping, data)
		const filter = this.parseTemplate(sentence.filter, params, mapping)
		const result = this.session
			? await this.cnx.db.collection(collection).deleteMany(filter, this.session)
			: await this.cnx.db.collection(collection).deleteMany(filter)
		return result.modifiedCount as number
	}

	public async bulkDelete(mapping: MappingConfig, dialect: Dialect, query: Query, array: any[]): Promise<number> {
		throw new MethodNotImplemented('MongodbConnection', 'bulkDelete')
	}

	public async execute(query: Query): Promise<any> {
		throw new MethodNotImplemented('MongodbConnection', 'execute')
	}

	public async executeSentence(sentence: any): Promise<any> {
		throw new MethodNotImplemented('MongodbConnection', 'executeSentence')
	}

	public async executeDDL(query: Query): Promise<any> {
		throw new MethodNotImplemented('MongodbConnection', 'executeDDL')
	}

	public async beginTransaction(): Promise<void> {
		// https://www.mongodb.com/docs/drivers/node/current/fundamentals/transactions/
		// https://hevodata.com/learn/mongodb-transactions-on-nodejs/
		this.session = this.cnx.client.startSession()
		const transactionOptions = {
			readPreference: 'primary',
			readConcern: { level: 'local' },
			writeConcern: { w: 'majority' }
		}
		await this.session.startTransaction(transactionOptions)
		this.inTransaction = true
	}

	public async commit(): Promise<void> {
		await this.session.endSession()
		this.inTransaction = false
		this.session = null
	}

	public async rollback(): Promise<void> {
		await this.session.abortTransaction()
		this.inTransaction = false
		this.session = null
	}

	private arrayToList(query: Query, template: string, mapping: MappingConfig, array: any[]): any[] {
		const list: any[] = []
		for (let i = 0; i < array.length; i++) {
			const item = array[i]
			let strObj: string | undefined
			if (query.parameters && query.parameters.length > 0) {
				for (let j = 0; j < query.parameters.length; j++) {
					const param = query.parameters[j]
					let value = this.getValue(item[param.name], param.type, mapping)
					strObj = Helper.replace(strObj || template, `{{${param.name}}}`, value)
				}
			} else {
				strObj = template
			}
			const obj = strObj ? JSON.parse(strObj) : {}
			list.push(obj)
		}
		return list
	}

	// private objectToParameters(query: Query, mapping: MappingConfig, obj: any): Parameter[] {
	// const parameters: Parameter[] = []
	// for (const p in query.parameters) {
	// const parameter = query.parameters[p]
	// let value = obj[parameter.name]
	// if (value) {
	// switch (parameter.type) {
	// case 'datetime':
	// value = this.writeDateTime(value, mapping)
	// break
	// case 'date':
	// value = this.writeDate(value, mapping)
	// break
	// case 'time':
	// value = this.writeTime(value, mapping)
	// break
	// }
	// // if (parameter.type === 'datetime') { value = dialect.solveDateTime(value) } else if (parameter.type === 'date') { value = dialect.solveDate(value) } else if (parameter.type == 'time') { value = dialect.solveTime(value) }
	// } else {
	// value = null
	// }
	// parameters.push({ name: parameter.name, type: parameter.type, value: value })
	// }
	// return parameters
	// }

	private parseTemplate(template: string, params: Parameter[], mapping: MappingConfig): any | undefined {
		let result: string | undefined
		const row: any = {}
		if (params.length && params.length > 0) {
			for (let i = 0; i < params.length; i++) {
				const param = params[i]
				let value = this.getValue(param.value, param.type, mapping)
				result = Helper.replace(result || template, `{{${param.name}}}`, value)
			}
		} else {
			result = template
		}
		return result ? JSON.parse(result) : undefined
	}

	private getValue(source: any, type: string, mapping: MappingConfig) {
		let value: any
		if (source) {
			switch (type) {
				case 'boolean':
					value = source ? 'true' : 'false'; break
				case 'string':
					value = typeof source === 'string' ? source : source.toString()
					value = Helper.replace(value, '\n', '\\n')
					value = Helper.replace(value, '"', '\\"')
					value = `"${value}"`
					break
				case 'datetime':
					value = `"${this.writeDateTime(source, mapping)}"`
					break
				case 'date':
					value = `"${this.writeDate(source, mapping)}"`
					break
				case 'time':
					value = `"${this.writeTime(source, mapping)}"`
					break
				default:
					if (typeof source === 'string') {
						value = Helper.replace(source, '\n', '\\n')
						value = Helper.replace(value, '"', '\\"')
						value = `"${value}"`
					} else {
						value = source
					}
			}
		} else {
			value = 'null'
		}
		return value
	}

	private async getNextSequenceValue(sequence: string, count: number = 1) {
		// https://www.mongodb.com/docs/manual/reference/method/db.collection.findOneAndUpdate/#mongodb-method-db.collection.findOneAndUpdate
		var sequenceDocument = await this.cnx.db.collection('__sequences').findOneAndUpdate(
			{ _id: sequence },
			{ $inc: { sequence_value: count } },
			{ returnNewDocument: true }
		);
		return sequenceDocument.value.sequence_value;
	}

	public async truncateEntity(mapping: MappingConfig, query: Query): Promise<any> {
		const collection = mapping.entityMapping(query.entity)
		await this.cnx.db.collection(collection).delete_many({})
	}

	public async createEntity(mapping: MappingConfig, query: Query): Promise<any> {
		const collection = mapping.entityMapping(query.entity)
		await this.cnx.db.createCollection(collection)
	}

	public async createSequence(mapping: MappingConfig, query: Query): Promise<any> {
		await this.cnx.db.collection('__sequences').insertOne(JSON.parse(query.sentence))
	}

	public async createIndex(mapping: MappingConfig, query: Query): Promise<any> {
		const collection = mapping.entityMapping(query.entity)
		const data = JSON.parse(query.sentence)
		await this.cnx.db.collection(collection).createIndex(data.properties, data.options)
	}

	public async addPk(mapping: MappingConfig, query: Query): Promise<any> {
		const collection = mapping.entityMapping(query.entity)
		const data = JSON.parse(query.sentence)
		await this.cnx.db.collection(collection).createIndex(data.properties, data.options)
	}

	public async addUk(mapping: MappingConfig, query: Query): Promise<any> {
		const collection = mapping.entityMapping(query.entity)
		const data = JSON.parse(query.sentence)
		await this.cnx.db.collection(collection).createIndex(data.properties, data.options)
	}

	public async dropSequence(mapping: MappingConfig, query: Query): Promise<any> {
		const filter = JSON.parse(query.sentence)
		await this.cnx.db.collection('__sequences').deleteOne(filter)
	}

	public async dropEntity(mapping: MappingConfig, query: Query): Promise<any> {
		// https://www.w3schools.com/nodejs/nodejs_mongodb_drop.asp
		const collection = mapping.entityMapping(query.entity)
		await this.cnx.db.collection(collection).drop()
	}

	public async dropPk(mapping: MappingConfig, query: Query): Promise<any> {
		const collection = mapping.entityMapping(query.entity)
		await this.cnx.db.collection(collection).dropIndex(query.sentence)
	}

	public async dropUk(mapping: MappingConfig, query: Query): Promise<any> {
		const collection = mapping.entityMapping(query.entity)
		await this.cnx.db.collection(collection).dropIndex(query.sentence)
	}

	public async dropIndex(mapping: MappingConfig, query: Query): Promise<any> {
		const collection = mapping.entityMapping(query.entity)
		await this.cnx.db.collection(collection).dropIndex(query.sentence)
	}
}
