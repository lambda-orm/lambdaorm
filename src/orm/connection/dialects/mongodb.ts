/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable no-tabs */

import { Connection, ConnectionConfig, ConnectionPool } from '..'
import { Parameter, Query } from '../../model'
import { Helper } from '../../helper'

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
		// console.info('mongodb end pool not Implemented')
	}
}

export class MongodbConnection extends Connection {
	public async select (query:Query, params:Parameter[]):Promise<any> {
		throw new Error('not implemented')
	}

	public async insert (query:Query, params:Parameter[]):Promise<number> {
		throw new Error('not implemented')
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async bulkInsert (query:Query, array:any[], params:Parameter[]):Promise<number[]> {
		throw new Error('not implemented')
	}

	public async update (query:Query, params:Parameter[]):Promise<number> {
		throw new Error('not implemented')
	}

	public async delete (query:Query, params:Parameter[]):Promise<number> {
		throw new Error('not implemented')
	}

	public async execute (query:Query):Promise<any> {
		return await this.cnx._query(query.sentence)
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
