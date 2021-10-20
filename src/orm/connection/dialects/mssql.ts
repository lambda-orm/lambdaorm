/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Connection, ConnectionConfig, ConnectionPool } from './..'
import { Parameter } from '../../model'
import { Helper } from './../../helper'

export class MssqlConnectionPool extends ConnectionPool {
	public static tedious: any
	public static MssqlConnectionPool:any
	protected pool:any
	constructor (config: ConnectionConfig) {
		super(config)
		if (!MssqlConnectionPool.tedious) {
			MssqlConnectionPool.tedious = require('tedious')
			MssqlConnectionPool.MssqlConnectionPool = require('tedious-connection-pool')
		}
		const poolConfig = { min: 2, max: 4, log: true }
		const connectionConfig = {
			userName: 'sa',
			password: 'Lambda1234!',
			server: 'localhost'
		}
		// const _config = { ...config.connection, ...{ waitForConnections: true, connectionLimit: 10, queueLimit: 0 } }
		this.pool = new MssqlConnectionPool.MssqlConnectionPool(poolConfig, connectionConfig)// MssqlConnectionPool.tedious.createPool(_config)
	}

	public async acquire (): Promise<Connection> {
		const me = this
		return new Promise<Connection>((resolve, reject) => {
			this.pool.acquire(function (err: any, cnx: any) {
				if (err) {
					console.error(err)
					reject(err)
				}
				resolve(new MssqlConnection(cnx, me))
			})
		})

		// const cnx = await MssqlConnectionPool.tedious.Connection(this.config.connection)
		// if (cnx.state === cnx.STATE.INITIALIZED) {
		// cnx.connect()
		// }
		// return new MssqlConnection(cnx, this)
	}

	public async release (connection: Connection): Promise<void> {
		if (connection.cnx.closed) {
			return
		}
		connection.cnx.release()
		// connection.cnx.queue.close()
		// return new Promise(resolve => {
		// connection.cnx.on('end', resolve)
		// connection.cnx.close()
		// debug('connection closed')
		// })
	}

	public async end (): Promise<void> {
		await this.pool.drain()
		// console.log('mssql end pool not Implemented')
	}
}

export class MssqlConnection extends Connection {
	public async select (sql:string, params:Parameter[]):Promise<any> {
		const result = await this._execute(sql, params)
		return result.recordset
	}

	public async insert (sql:string, params:Parameter[]):Promise<number> {
		const result = await this._execute(sql, params)
		return result.insertId
	}

	public async bulkInsert (sql: string, array: any[], params: Parameter[], fieldId?: string): Promise<number[]> {
		// https://www.sqlservertutorial.net/sql-server-basics/sql-server-insert-multiple-rows/
		try {
			const rows:string[] = []
			for (const p in array) {
				const values = array[p]
				const row:any[] = []
				for (let i = 0; i < params.length; i++) {
					const parameter = params[i]
					let value = values[i]
					if (value == null || value === undefined) {
						value = 'null'
					} else {
						switch (parameter.type) {
						case 'boolean':
							value = value ? 1 : 0; break
						case 'string':
							value = Helper.escape(value)
							value = Helper.replace(value, '\\\'', '\\\'\'')
							break
						case 'datetime':
						case 'date':
						case 'time':
							value = Helper.escape(value); break
						}
					}
					row.push(value)
				}
				rows.push(`(${row.join(',')})`)
			}

			const query = fieldId
				? `${sql} OUTPUT inserted.${fieldId} VALUES ${rows.join(',')};`
				: `${sql} VALUES ${rows.join(',')};`

			const result:any = await new Promise<any[]>((resolve, reject) => {
				const rows:any[] = []
				const request = new MssqlConnectionPool.tedious.Request(query, (err: any, raw: any) => {
					if (err) {
						reject(err)
					}
					resolve(rows)
				})
				request.on('row', (columns:any) => {
					rows.push(columns)
				})
				this.cnx.execSql(request)
			})

			const ids: number[] = []
			if (fieldId) {
				for (const p in result) {
					const id = result[p][0].value as number
					ids.push(id)
				}
			}
			return ids
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	public async update (sql:string, params:Parameter[]):Promise<number> {
		const result = await this._execute(sql, params)
		return result.rowsAffected[0]
	}

	public async delete (sql:string, params:Parameter[]):Promise<number> {
		const result = await this._execute(sql, params)
		return result.rowsAffected[0]
	}

	public async execute (sql:string):Promise<any> {
		return await this._execute(sql)
	}

	public async beginTransaction (): Promise<void> {
		const me = this
		return new Promise<void>((resolve, reject) => {
			this.cnx.beginTransaction((err:any) => {
				if (err) {
					reject(err)
				}
				me.inTransaction = true
				resolve()
			})
		})

		// await this.cnx.beginTransaction()
		// this.inTransaction = true
	}

	public async commit (): Promise<void> {
		const me = this
		return new Promise<void>((resolve, reject) => {
			this.cnx.commitTransaction((err:any) => {
				if (err) {
					reject(err)
				}
				me.inTransaction = true
				resolve()
			})
		})
		// await this.cnx.commitTransaction()
		// this.inTransaction = false
	}

	public async rollback (): Promise<void> {
		const me = this
		return new Promise<void>((resolve, reject) => {
			this.cnx.rollbackTransaction((err:any) => {
				if (err) {
					reject(err)
				}
				me.inTransaction = true
				resolve()
			})
		})
		// await this.cnx.rollbackTransaction()
		// this.inTransaction = false
	}

	private async _execute (sql:string, params:Parameter[] = []) {
		// const request = new MssqlConnectionPool.tedious.Request(sql)
		// for (let i = 0; i < params.length; i++) {
		// const param = params[i]
		// switch (param.value) {
		// case 'array': request.addParameter(param.name, MssqlConnectionPool.tedious.TYPES.NVarChar, param.value.join(',')); break
		// case 'string': request.addParameter(param.name, MssqlConnectionPool.tedious.TYPES.NVarChar, param.value); break
		// case 'number': request.addParameter(param.name, MssqlConnectionPool.tedious.TYPES.Numeric, param.value); break
		// case 'integer': request.addParameter(param.name, MssqlConnectionPool.tedious.TYPES.Int, param.value.join(',')); break
		// case 'decimal': request.addParameter(param.name, MssqlConnectionPool.tedious.TYPES.Decimal, param.value.join(',')); break
		// case 'boolean': request.addParameter(param.name, MssqlConnectionPool.tedious.TYPES.Bit, param.value.join(',')); break
		// case 'datetime': request.addParameter(param.name, MssqlConnectionPool.tedious.TYPES.DateTime, param.value.join(',')); break
		// }
		// }
		// const result = await this.cnx.execSql(request)
		// return result[0]

		const raw:any = await new Promise<any>((resolve, reject) => {
			const request = new MssqlConnectionPool.tedious.Request(sql, (err: any, raw: any) => {
				if (err) {
					reject(err)
				}
				resolve(raw)
			})
			for (let i = 0; i < params.length; i++) {
				const param = params[i]
				switch (param.value) {
				case 'array': request.addParameter(param.name, MssqlConnectionPool.tedious.TYPES.NVarChar, param.value.join(',')); break
				case 'string': request.addParameter(param.name, MssqlConnectionPool.tedious.TYPES.NVarChar, param.value); break
				case 'number': request.addParameter(param.name, MssqlConnectionPool.tedious.TYPES.Numeric, param.value); break
				case 'integer': request.addParameter(param.name, MssqlConnectionPool.tedious.TYPES.Int, param.value.join(',')); break
				case 'decimal': request.addParameter(param.name, MssqlConnectionPool.tedious.TYPES.Decimal, param.value.join(',')); break
				case 'boolean': request.addParameter(param.name, MssqlConnectionPool.tedious.TYPES.Bit, param.value.join(',')); break
				case 'datetime': request.addParameter(param.name, MssqlConnectionPool.tedious.TYPES.DateTime, param.value.join(',')); break
				}
			}
			this.cnx.execSql(request)
		})
		return raw
		// if (raw.hasOwnProperty('recordset')) {
		// return raw.recordset
		// }
		// if (raw.hasOwnProperty('rowsAffected')) {
		// return raw.rowsAffected[0]
		// }
	}
}
