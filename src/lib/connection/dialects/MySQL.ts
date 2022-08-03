
/* eslint-disable no-tabs */

import { Connection, ConnectionConfig, ConnectionPool } from '..'
import { Query, Data } from '../../model'
import { MappingConfig, Dialect } from '../../manager'

const DECIMAL = 0
const TINY = 1
const LONG = 3
const FLOAT = 4
const DOUBLE = 5
const TIMESTAMP = 7
const LONGLONG = 8
const INT24 = 9
const DATE = 10
const TIME = 11
const DATETIME = 12
const NEWDATE = 14
const BIT = 16
const NEWDECIMAL = 246

export class MySQLConnectionPool extends ConnectionPool {
	protected static lib: any
	protected pool: any
	constructor (config: ConnectionConfig) {
		super(config)
		if (!MySQLConnectionPool.lib) {
			MySQLConnectionPool.lib = require('mysql2/promise')
		}
	}

	public async init (): Promise<void> {
		// https://github.com/sidorares/node-mysql2/issues/795
		// https:// stackoverflow.com/questions/64774472/how-do-i-determine-the-column-type-name-from-the-columntype-integer-value-in-mys
		const casts = {
			typeCast: function (field: any, next: any) {
				if (field.type === 'DECIMAL') {
					const value = field.string()
					return (value === null) ? null : Number(value)
				}
				return next()
			}
		}
		this.pool = MySQLConnectionPool.lib.createPool({ ...this.config.connection, ...casts })
	}

	public async acquire (): Promise<Connection> {
		if (this.pool === undefined) {
			await this.init()
		}
		const cnx = await this.pool.getConnection()
		return new MySqlConnection(cnx, this)
	}

	public async release (connection: Connection): Promise<void> {
		await connection.cnx.release()
	}

	public async end (): Promise<void> {
		if (this.pool !== undefined) {
			this.pool.end()
		}
	}
}

export class MySqlConnection extends Connection {
	public async select (mapping: MappingConfig, dialect: Dialect, query: Query, data: Data): Promise<any> {
		return this._execute(mapping, dialect, query, data)
	}

	public async insert (mapping: MappingConfig, dialect: Dialect, query: Query, data: Data): Promise<any> {
		const result = await this._execute(mapping, dialect, query, data)
		return result.insertId
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async bulkInsert (mapping: MappingConfig, dialect: Dialect, query: Query, array: any[]): Promise<any[]> {
		try {
			if (!array || array.length === 0) {
				return []
			}
			// https://github.com/sidorares/node-mysql2/issues/830
			const rows: any[] = this.arrayToRows(mapping, dialect, query, array)
			const result = await this.cnx.query(query.sentence, [rows])

			// https://github.com/sidorares/node-mysql2/issues/435
			const start = result[0].insertId
			const end = result[0].insertId + (result[0].affectedRows - 1)
			const lastInsertedIds: number[] = []
			for (let i = start; i <= end; i++)lastInsertedIds.push(i)
			return lastInsertedIds
		} catch (error: any) {
			throw new Error(`sentence: ${query.sentence} error: ${error.message}`)
		}
	}

	public async update (mapping: MappingConfig, dialect: Dialect, query: Query, data: Data): Promise<number> {
		const result = await this._execute(mapping, dialect, query, data)
		return result.affectedRows
	}

	public async delete (mapping: MappingConfig, dialect: Dialect, query: Query, data: Data): Promise<number> {
		const result = await this._execute(mapping, dialect, query, data)
		return result.affectedRows
	}

	public async execute (query: Query): Promise<any> {
		return this.cnx.query(query.sentence)
	}

	public async executeDDL (query: Query): Promise<any> {
		return this.cnx.query(query.sentence)
	}

	public async executeSentence (sentence: any): Promise<any> {
		return this.cnx.query(sentence)
	}

	public async beginTransaction (): Promise<void> {
		await this.cnx.beginTransaction()
		this.inTransaction = true
	}

	public async commit (): Promise<void> {
		await this.cnx.commit()
		this.inTransaction = false
	}

	public async rollback (): Promise<void> {
		await this.cnx.rollback()
		this.inTransaction = false
	}

	protected async _execute (mapping: MappingConfig, dialect: Dialect, query: Query, data: Data) {
		// Solve array parameters , example IN(?) where ? is array[]
		// https://github.com/sidorares/node-mysql2/issues/476
		let useExecute = true
		const values: any[] = []
		// in the case of having an array with string elements, it is not possible to resolve the IN(,,,) with execute
		// for this reason query is being used in this case.
		// see how this case can be resolved to always use execute.
		const params = this.dataToParameters(mapping, dialect, query, data)
		for (const param of params) {
			if (param.type === 'array') {
				useExecute = false
				break
			}
		}
		for (const param of params) {
			values.push(param.value)
		}

		const result = (useExecute)
			?	await this.cnx.execute(query.sentence, values)
			: await this.cnx.query(query.sentence, values)

		if (!Array.isArray(result[0])) {
			return result[0]
		} else {
			return this.resultToRows(result)
		}
	}

	private resultToRows (result:any[]):any {
		const rows = result[0]
		const cols = result[1]
		for (const row of rows) {
			for (const col of cols) {
				const value = row[col.name]
				if (value !== null) {
					switch (col.columnType) {
					case TINY:
						// Boolean
						// https://www.javatpoint.com/mysql-boolean#:~:text=MySQL%20does%20not%20contain%20built,to%200%20and%201%20value.
						row[col.name] = value === 1
						break
					case DECIMAL:
					case LONG:
					case FLOAT:
					case DOUBLE:
					case LONGLONG:
					case INT24:
					case NEWDECIMAL:
						row[col.name] = Number(value)
						break
					case DATETIME:
					case DATE:
					case TIME:
					case NEWDATE:
					case TIMESTAMP:
						row[col.name] = new Date(value)
						break
					case BIT:
						row[col.name] = Boolean(value)
						break
					}
				}
			}
		}
		return rows
	}
}
