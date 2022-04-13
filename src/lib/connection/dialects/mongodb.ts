/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable no-tabs */

import { Connection, ConnectionConfig, ConnectionPool } from '..'
import { Parameter, Query } from '../../model'
import { Helper } from '../../manager/helper'
import { MappingConfig } from '../../manager'

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
	public async select (mapping: MappingConfig, query: Query, params: Parameter[]): Promise<any> {
		throw new Error('not implemented')
	}

	public async insert (mapping: MappingConfig, query: Query, params: Parameter[]): Promise<any> {
		const row: any = {}
		for (let i = 0; i < params.length; i++) {
			const param = params[i]
			switch (param.type) {
			case 'boolean':
				row[param.name] = param.value ? 'Y' : 'N'; break
			case 'string':
				row[param.name] = typeof param.value === 'string' || param.value === null ? param.value : param.value.toString(); break
			case 'datetime':
			case 'date':
			case 'time':
				row[param.name] = param.value ? new Date(param.value) : null; break
			default:
				row[param.name] = param.value
			}
		}

		const collection = mapping.entityMapping(query.entity)
		const result = await this.cnx.db.collection(collection).insertOne(row)
		return result.insertedId
	}

	public async bulkInsert (mapping: MappingConfig, query: Query, array: any[], params: Parameter[]): Promise<any[]> {
		const collection = mapping.entityMapping(query.entity)
		const result = await this.cnx.db.collection(collection).insertMany(array)
		return result.insertedIds as string[]
	}

	public async update (mapping: MappingConfig, query: Query, params: Parameter[]): Promise<number> {
		throw new Error('not implemented')
	}

	public async delete (mapping: MappingConfig, query: Query, params: Parameter[]): Promise<number> {
		throw new Error('not implemented')
	}

	public async execute (query: Query): Promise<any> {
		// return await this.cnx._query(query.sentence)
		throw new Error('not implemented')
	}

	public async executeSentence (sentence: any): Promise<any> {
		throw new Error('not implemented')
	}

	public async executeDDL (query: Query): Promise<any> {
		throw new Error('not implemented')
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
}
