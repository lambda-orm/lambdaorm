/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable no-tabs */

import { Connection, ConnectionConfig, ConnectionPool } from '..'
import { Parameter, Query, Data, MethodNotImplemented, NoSqlSentence } from '../../model'
import { MappingConfig, Helper } from '../../manager'

export class MongodbConnectionPool extends ConnectionPool {
	private static lib: any
	constructor (config: ConnectionConfig) {
		super(config)
		if (!MongodbConnectionPool.lib) {
			MongodbConnectionPool.lib = require('mongodb')
		}
	}

	public async init (): Promise<void> {
		console.log(`connection mongodb: ${this.config.name} initialized`)
	}

	public async acquire (): Promise<Connection> {
		const client = await MongodbConnectionPool.lib.MongoClient.connect(this.config.connection.url)
		const db = client.db(this.config.connection.database)
		const cnx = { client: client, db: db }
		return new MongodbConnection(cnx, this)
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async release (connection: Connection): Promise<void> {
		connection.cnx.client.close()
	}

	public async end (): Promise<void> {
		console.log(`connection mongodb: ${this.config.name} finalized`)
	}
}

export class MongodbConnection extends Connection {
	private session?:any

	public async select (mapping: MappingConfig, query: Query, data:Data): Promise<any> {
		// https://medium.com/@tomas.knezek/handle-pagination-with-nodejs-and-mongodb-2910ff5e272b
		// https://www.mongodb.com/docs/manual/reference/operator/aggregation-pipeline/

		const collection = mapping.entityMapping(query.entity)
		const sentence = query.sentence as NoSqlSentence
		const params = this.dataToParameters(query, mapping, data)
		const aggregate:any[] = []

		const filter = sentence.filter ? this.templateToObject(sentence.filter, params) : {}
		if (sentence.map) {
			aggregate.push(this.templateToObject(sentence.map, params))
		}
		if (sentence.sort) {
			aggregate.push(JSON.parse(sentence.sort))
		}
		if (sentence.page) {
			aggregate.push(JSON.parse(sentence.page))
		}

		const result = this.session
			? await this.cnx.db.collection(collection).find(filter, this.session).aggregate(aggregate).toArray()
			: await this.cnx.db.collection(collection).find(filter).aggregate(aggregate).toArray()
		return result
	}

	public async insert (mapping: MappingConfig, query: Query, data:Data): Promise<any> {
		const collection = mapping.entityMapping(query.entity)
		const sentence = query.sentence as NoSqlSentence
		const params = this.dataToParameters(query, mapping, data)
		const obj = this.templateToObject(sentence.insert as string, params)

		const result = this.session
			? await this.cnx.db.collection(collection).insertOne(obj, this.session)
			: await this.cnx.db.collection(collection).insertOne(obj)

		return result.insertedId
	}

	public async bulkInsert (mapping: MappingConfig, query: Query, array: any[]): Promise<any[]> {
		const collection = mapping.entityMapping(query.entity)
		const sentence = query.sentence as NoSqlSentence
		const list = this.arrayToList(query, sentence.insert as string, mapping, array)
		const result = this.session
			? await this.cnx.db.collection(collection).insertMany(list, this.session)
			: await this.cnx.db.collection(collection).insertMany(list)
		return result.insertedIds as string[]
	}

	public async update (mapping: MappingConfig, query: Query, data:Data): Promise<number> {
		const collection = mapping.entityMapping(query.entity)
		const sentence = query.sentence as NoSqlSentence
		const params = this.dataToParameters(query, mapping, data)
		const filter = sentence.filter ? this.templateToObject(sentence.filter, params) : {}
		const obj = this.templateToObject(sentence.update as string, params)
		const result = this.session
			? await this.cnx.db.collection(collection).updateMany(filter, obj, this.session)
			: await this.cnx.db.collection(collection).updateMany(filter, obj)
		return result.modifiedCount as number
	}

	public async bulkUpdate (mapping: MappingConfig, query: Query, array: any[]): Promise<number> {
		throw new MethodNotImplemented('MongodbConnection', 'bulkUpdate')
	}

	public async delete (mapping: MappingConfig, query: Query, data:Data): Promise<number> {
		const collection = mapping.entityMapping(query.entity)
		const sentence = query.sentence as NoSqlSentence
		const params = this.dataToParameters(query, mapping, data)
		const filter = sentence.filter ? this.templateToObject(sentence.filter, params) : {}
		const result = this.session
			? await this.cnx.db.collection(collection).deleteMany(filter, this.session)
			: await this.cnx.db.collection(collection).deleteMany(filter)
		return result.modifiedCount as number
	}

	public async bulkDelete (mapping: MappingConfig, query: Query, array: any[]): Promise<number> {
		throw new MethodNotImplemented('MongodbConnection', 'bulkDelete')
	}

	public async execute (query: Query): Promise<any> {
		throw new MethodNotImplemented('MongodbConnection', 'execute')
	}

	public async executeSentence (sentence: any): Promise<any> {
		throw new MethodNotImplemented('MongodbConnection', 'executeSentence')
	}

	public async executeDDL (query: Query): Promise<any> {
		throw new MethodNotImplemented('MongodbConnection', 'executeDDL')
	}

	public async beginTransaction (): Promise<void> {
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

	public async commit (): Promise<void> {
		await this.session.endSession()
		this.inTransaction = false
		this.session = null
	}

	public async rollback (): Promise<void> {
		await this.session.abortTransaction()
		this.inTransaction = false
		this.session = null
	}

	protected arrayToList (query:Query, template:string, mapping:MappingConfig, array:any[]):any[] {
		const list:any[] = []
		for (let i = 0; i < array.length; i++) {
			const item = array[i]
			let strObj:string|undefined
			for (let j = 0; j < query.parameters.length; j++) {
				const param = query.parameters[j]
				let value = item[param.name]
				if (value) {
					switch (param.type) {
					case 'boolean':
						value = param.value ? 'true' : 'false'; break
					case 'string':
						value = typeof param.value === 'string' || param.value === null ? param.value : param.value.toString(); break
					case 'datetime':
						value = this.writeDateTime(value, mapping)
						break
					case 'date':
						value = this.writeDate(value, mapping)
						break
					case 'time':
						value = this.writeTime(value, mapping)
						break
					}
				}
				strObj = Helper.replace(strObj || template, `{{${param.name}}}`, value)
			}
			list.push(strObj ? JSON.parse(strObj) : {})
		}
		return list
	}

	private templateToObject (template:string, params: Parameter[]): any {
		let result:string|undefined
		const row: any = {}
		for (let i = 0; i < params.length; i++) {
			const param = params[i]
			let value = ''
			if (param.value) {
				switch (param.type) {
				case 'boolean':
					value = param.value ? 'true' : 'false'; break
				case 'string':
					value = typeof param.value === 'string' || param.value === null ? param.value : param.value.toString(); break
				case 'datetime':
				case 'date':
				case 'time':
					// TODO: agregar formato de fecha a nivel de mapping para convertir en ese formato
					value = new Date(param.value).toISOString(); break
				default:
					value = param.value
				}
			}
			result = Helper.replace(result || template, `{{${param.name}}}`, value)
		}
		return result ? JSON.parse(result) : {}
	}
}
