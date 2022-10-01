
/* eslint-disable no-tabs */

import { Connection, ConnectionConfig, ConnectionPool } from '..'
import { Query, Data } from '../../model'
import { MappingConfig, Dialect, Helper } from '../../manager'

export class SQLjsConnectionPool extends ConnectionPool {
	private static lib: any
	private db: any
	constructor (config: ConnectionConfig) {
		super(config)
		if (!SQLjsConnectionPool.lib) { SQLjsConnectionPool.lib = require('sql.js') }
	}

	public async init (): Promise<void> {
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const me = this
		const fileBuffer = await Helper.fs.read(me.config.connection)
		this.db = await new Promise<void>((resolve, reject) => {
			SQLjsConnectionPool.lib.then(function (SQL: any) {
				// Load the db
				try {
					const db = new SQL.Database(fileBuffer)
					resolve(db)
				} catch (error) {
					reject(error)
				}
			})
		})
	}

	public async acquire (): Promise<Connection> {
		return new SQLjsConnection(this.db, this)
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async release (_connection: Connection): Promise<void> {
		console.info('SQLjs release pool not Implemented')
	}

	public async end (): Promise<void> {
		const data = this.db.export()
		await Helper.fs.write(this.config.connection, data)
	}
}

export class SQLjsConnection extends Connection {
	public async select (mapping: MappingConfig, dialect: Dialect, query: Query, data: Data): Promise<any> {
		return this._execute(mapping, dialect, query, data)
	}

	public async insert (mapping: MappingConfig, dialect: Dialect, query: Query, data: Data): Promise<number> {
		const result = await this._execute(mapping, dialect, query, data)
		return result as number
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async bulkInsert (mapping: MappingConfig, dialect: Dialect, query: Query, array: any[]): Promise<number[]> {
		const sql = query.sentence
		try {
			if (!array || array.length === 0) {
				return []
			}
			// https://github.com/sidorares/node-mysql2/issues/830
			const rows = this.arrayToRows(mapping, dialect, query, array)
			const result = await this.cnx.query(sql, [rows])

			// https://github.com/sidorares/node-mysql2/issues/435
			const start = result[0].insertId
			const end = result[0].insertId + (result[0].affectedRows - 1)
			const lastInsertedIds: number[] = []
			for (let i = start; i <= end; i++)lastInsertedIds.push(i)
			return lastInsertedIds
		} catch (error: any) {
			throw new Error(`sentence: ${sql} error: ${error.message}`)
		}
	}

	public async update (mapping: MappingConfig, dialect: Dialect, query: Query, data: Data): Promise<number> {
		return this._execute(mapping, dialect, query, data)
	}

	public async delete (mapping: MappingConfig, dialect: Dialect, query: Query, data: Data): Promise<number> {
		return this._execute(mapping, dialect, query, data)
	}

	public async execute (query: Query): Promise<any> {
		return this.cnx._query(query)
	}

	public async executeDDL (query: Query): Promise<any> {
		return this.cnx.db.run(query.sentence)
	}

	public async executeSentence (sentence: any): Promise<any> {
		return this.cnx.db.run(sentence)
	}

	public async beginTransaction (): Promise<void> {
		this.inTransaction = true
	}

	public async commit (): Promise<void> {
		this.inTransaction = false
	}

	public async rollback (): Promise<void> {
		this.inTransaction = false
	}

	protected async _execute (mapping: MappingConfig, dialect:Dialect, query: Query, data: Data): Promise<any> {
		const sql = query.sentence
		const params = this.dataToParameters(mapping, dialect, query, data)
		const values: any[] = []
		for (const param of params) {
			values.push(param.value)
		}
		return this.cnx.db.run(sql, values)
	}

	protected async _query (mapping: MappingConfig, dialect:Dialect, query: Query, data: Data): Promise<any[]> {
		const sql = query.sentence
		const params = this.dataToParameters(mapping, dialect, query, data)
		const values: any[] = []
		for (const param of params) {
			values.push(param.value)
		}
		const result = this.cnx.db.run(sql, values)

		const rows:any[] = []
		const cols = result.columns
		for (const value of result.values) {
			const row: any = {}
			for (let j = 0; j < cols.length; j++) {
				const col = cols[j] as string
				row[col] = value[j]
			}
			rows.push(row)
		}
		return rows
	}
}
