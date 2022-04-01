/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable no-tabs */

import { Connection, ConnectionConfig, ConnectionPool } from '..'
import { Parameter, Query } from '../../model'
import { Helper } from '../../manager/helper'
import { MappingConfig } from '../../manager'

export class MongodbConnectionPool extends ConnectionPool {
	private static lib: any
	private client :any
	private database :any
	constructor (config:ConnectionConfig) {
		super(config)
		if (!MongodbConnectionPool.lib) {
			MongodbConnectionPool.lib = require('mongodb')
		}
	}

	public async init (): Promise<void> {
		this.client = new MongodbConnectionPool.lib.MongoClient(this.config.connection)
		this.database = MongodbConnectionPool.lib.MongoUrl.Create(this.config.connection).DatabaseName
	}

	public async acquire (): Promise<Connection> {
		if (this.database === undefined) {
			await this.init()
		}

		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const me = this
		const cnx = await new Promise<void>((resolve, reject) => {
			this.client.open(function (err:any, mongoclient:any) {
				if (err) {
					reject(reject)
				}
				const db = mongoclient.db(me.database)
				resolve(db)
			})
		})
		return new MongodbConnection(cnx, this)
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async release (connection: Connection): Promise<void> {
		connection.cnx.close()
	}

	public async end (): Promise<void> {
		if (this.database !== undefined) {
			// console.info('mongodb end pool not Implemented')
		}
	}
}

export class MongodbConnection extends Connection {
	public async select (mapping:MappingConfig, query:Query, params:Parameter[]):Promise<any> {
		throw new Error('not implemented')
	}

	public async insert (mapping:MappingConfig, query:Query, params:Parameter[]):Promise<number> {
		throw new Error('not implemented')
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async bulkInsert (mapping:MappingConfig, query:Query, array:any[], params:Parameter[]):Promise<number[]> {
		throw new Error('not implemented')
	}

	public async update (mapping:MappingConfig, query:Query, params:Parameter[]):Promise<number> {
		throw new Error('not implemented')
	}

	public async delete (mapping:MappingConfig, query:Query, params:Parameter[]):Promise<number> {
		throw new Error('not implemented')
	}

	public async execute (query:Query):Promise<any> {
		// return await this.cnx._query(query.sentence)
		throw new Error('not implemented')
	}

	public async executeSentence (sentence: any):Promise<any> {
		throw new Error('not implemented')
	}

	public async executeDDL (query:Query):Promise<any> {
		throw new Error('not implemented')
	}

	public async beginTransaction ():Promise<void> {
		// TODO:
		this.inTransaction = true
	}

	public async commit (): Promise<void> {
		// TODO:
		this.inTransaction = false
	}

	public async rollback ():Promise<void> {
		// TODO:
		this.inTransaction = false
	}
}
