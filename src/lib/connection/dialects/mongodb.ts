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
	public async select (mapping: MappingConfig, query: Query, data:Data): Promise<any> {
		const collection = mapping.entityMapping(query.entity)
		const sentence = query.sentence as NoSqlSentence

		const filter = sentence.filter || {}
		const projection = sentence.map || {}
		const pagination = sentence.page || {}
		let _query = this.cnx.db.collection(collection).find(filter, projection, pagination)
		if (sentence.sort) {
			_query = _query.sort(sentence.sort)
		}
		const result = await _query.toArray()
		return result
	}

	public async insertOne (mapping: MappingConfig, query: Query, data:Data): Promise<any> {
		const collection = mapping.entityMapping(query.entity)
		const obj = this.dataToObject(query, mapping, data)
		const result = await this.cnx.db.collection(collection).insertOne(obj)
		return result.insertedId
	}

	public async insertMany (mapping: MappingConfig, query: Query, array: any[]): Promise<any[]> {
		const collection = mapping.entityMapping(query.entity)

		const rows = this.arrayToRows(query, mapping, array)
		const result = await this.cnx.db.collection(collection).insertMany(rows)
		return result.insertedIds as string[]
	}

	public async update (mapping: MappingConfig, query: Query, data:Data): Promise<number> {
		return await this.updateOne(mapping, query, data)
	}

	public async updateOne (mapping: MappingConfig, query: Query, data:Data): Promise<number> {
		const collection = mapping.entityMapping(query.entity)
		const sentence = query.sentence as NoSqlSentence
		const filter = sentence.filter || {}
		const obj = this.dataToObject(query, mapping, data)
		const result = await this.cnx.db.collection(collection).updateOne(filter, obj, { upsert: true })
		return result.modifiedCount as number
	}

	public async updateMany (mapping: MappingConfig, query: Query, array: any[]): Promise<number> {
		const collection = mapping.entityMapping(query.entity)
		const sentence = query.sentence as NoSqlSentence
		const filter = sentence.filter || {}
		const result = await this.cnx.db.collection(collection).updateMany(filter, array)
		return result.modifiedCount as number
	}

	public async delete (mapping: MappingConfig, query: Query, data:Data): Promise<number> {
		throw new MethodNotImplemented('MongodbConnection', 'delete')
	}

	public async deleteOne (mapping: MappingConfig, query: Query, data:Data): Promise<number> {
		throw new MethodNotImplemented('MongodbConnection', 'deleteOne')
	}

	public async deleteMany (mapping: MappingConfig, query: Query, array: any[]): Promise<number> {
		throw new MethodNotImplemented('MongodbConnection', 'deleteMany')
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
		// TODO:
		this.inTransaction = true
	}

	public async commit (): Promise<void> {
		// TODO:
		this.inTransaction = false
	}

	public async rollback (): Promise<void> {
		// TODO:
		this.inTransaction = false
	}

	protected override arrayToRows (query:Query, mapping:MappingConfig, array:any[]):any[] {
		throw new MethodNotImplemented('MongodbConnection', 'updateMany')
	}

	protected dataToObject (query:Query, mapping:MappingConfig, data:Data):any {
		throw new MethodNotImplemented('MongodbConnection', 'dataToObject')
	}

	private replace (template:string, params: Parameter[]) {
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
