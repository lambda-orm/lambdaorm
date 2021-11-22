/* eslint-disable @typescript-eslint/no-this-alias */
import { Connection, ConnectionConfig, ConnectionPool } from './..'
import { Parameter, Query } from '../../model'
import { Helper } from './../../helper'
import { SchemaConfig } from './../../manager'

export class MssqlConnectionPool extends ConnectionPool {
	public static tedious: any
	constructor (config: ConnectionConfig) {
		super(config)
		if (!MssqlConnectionPool.tedious) {
			MssqlConnectionPool.tedious = require('tedious')
		}
	}

	public async init (): Promise<void> {
		console.log('init')
	}

	public async acquire (): Promise<Connection> {
		const cnx = await new Promise<Connection>((resolve, reject) => {
			const connection = new MssqlConnectionPool.tedious.Connection(this.config.connection)
			connection.connect()
			connection.on('connect', (err:any) => {
				if (err) {
					reject(err)
				}
				resolve(connection)
			})
		})
		return new MssqlConnection(cnx, this)
	}

	public async release (connection: Connection): Promise<void> {
		if (connection.cnx.closed) {
			return
		}
		connection.cnx.close()
	}

	public async end (): Promise<void> {
		console.log('end')
	}
}

export class MssqlConnection extends Connection {
	public async select (schema:SchemaConfig, query:Query, params:Parameter[]):Promise<any> {
		const result = await this._query(query.sentence, params)
		return result
	}

	public async insert (schema:SchemaConfig, query: Query, params: Parameter[]): Promise<number> {
		const autoincrement = schema.getAutoincrement(query.entity)
		const fieldId: string | undefined = autoincrement && autoincrement.mapping ? autoincrement.mapping : undefined
		const sentence = fieldId
			? query.sentence.replace('OUTPUT inserted.0', '')
			: query.sentence
		const result = await this._query(sentence, params)
		if (fieldId) {
			return result[fieldId]
		} else {
			return 0
		}
	}

	public async bulkInsert (schema:SchemaConfig, query:Query, array: any[], params: Parameter[]): Promise<any[]> {
		// https://www.sqlservertutorial.net/sql-server-basics/sql-server-insert-multiple-rows/
		const autoincrement = schema.getAutoincrement(query.entity)
		const fieldId: string | undefined = autoincrement && autoincrement.mapping ? autoincrement.mapping : undefined
		const sql = query.sentence
		let _query = ''
		try {
			const ids: any[] = []
			const size = 1000
			for (let i = 0; i * size < array.length; i++) {
				const start = i * size
				let end = start + size
				if (end > array.length) {
					end = array.length
				}
				const buffer = array.slice(start, end)

				const rows = this.toRows(buffer, params)
				_query = fieldId
					? `${sql} OUTPUT inserted.${fieldId} VALUES ${rows.join(',')};`
					: `${sql} VALUES ${rows.join(',')};`

				const result = await this._query(_query)

				if (fieldId) {
					for (const p in result) {
						const id = result[p][fieldId]
						ids.push(id)
					}
				}
			}
			return ids
		} catch (error) {
			throw new Error(`Error to execute bulkInsert \nerror: ${error} \nquery:\n${query}`)
		}
	}

	public async update (schema:SchemaConfig, query:Query, params:Parameter[]):Promise<number> {
		return await this._execute(query.sentence, params)
	}

	public async delete (schema:SchemaConfig, query:Query, params:Parameter[]):Promise<number> {
		return await this._execute(query.sentence, params)
	}

	public async execute (query:Query):Promise<any> {
		return await this.executeSentence(query.sentence)
	}

	public async executeSentence (sentence: any): Promise<any> {
		return await this._query(sentence)
	}

	public async beginTransaction (): Promise<void> {
		const me = this
		await new Promise<void>((resolve, reject) => {
			me.cnx.beginTransaction((error:any) => {
				if (error) {
					reject(new Error(`Mssql connection beginTransaction error: ${error}`))
				}
				me.inTransaction = true
				resolve()
			})
		})
	}

	public async commit (): Promise<void> {
		if (this.cnx.inTransaction) {
			const me = this
			await new Promise<void>((resolve, reject) => {
				me.cnx.commitTransaction((error: any) => {
					if (error) {
						reject(new Error(`Mssql connection commit error: ${error}`))
					}
					me.inTransaction = false
					resolve()
				})
			})
		}
	}

	public async rollback (): Promise<void> {
		if (this.cnx.inTransaction) {
			const me = this
			await new Promise<void>((resolve, reject) => {
				me.cnx.rollbackTransaction((error:any) => {
					if (error) {
						reject(new Error(`Mssql connection rollback error: ${error}`))
					}
					me.inTransaction = false
					resolve()
				})
			})
		}
	}

	private async _query (sentence:string, params:Parameter[] = []):Promise<any> {
		const me = this
		return await new Promise<any[]>((resolve, reject) => {
			try {
				const rows: any[] = []
				const request = new MssqlConnectionPool.tedious.Request(sentence, (error: any) => {
					if (error) {
						reject(new Error(`Mssql connection _query error: ${error}`))
					}
					resolve(rows)
				})
				request.on('row', (columns: any) => {
					const row: any = {}
					for (const p in columns) {
						const column = columns[p]
						row[column.metadata.colName] = column.value
					}
					rows.push(row)
				})
				if (params.length > 0) {
					me.addParameters(request, params)
				}
				me.cnx.execSql(request)
			} catch (error) {
				reject(new Error(`Mssql connection _query error: ${error}`))
			}
		})
	}

	private async _execute (sentence:string, params: Parameter[] = []) {
		const me = this
		return await new Promise<any>((resolve, reject) => {
			const request = new MssqlConnectionPool.tedious.Request(sentence, (err: any, rowCount: any) => {
				if (err) {
					reject(new Error(`Mssql connection _execute error: ${err}`))
				}
				resolve(rowCount)
			})
			if (params.length > 0) {
				me.addParameters(request, params)
			}
			me.cnx.execSql(request)
		})
	}

	private addParameters (request:any, params:Parameter[] = []) {
		for (let i = 0; i < params.length; i++) {
			const param = params[i]
			switch (param.type) {
			case 'array': request.addParameter(param.name, MssqlConnectionPool.tedious.TYPES.NVarChar, param.value.join(',')); break
			case 'string': request.addParameter(param.name, MssqlConnectionPool.tedious.TYPES.NVarChar, param.value); break
			case 'number': request.addParameter(param.name, MssqlConnectionPool.tedious.TYPES.Numeric, param.value); break
			case 'integer': request.addParameter(param.name, MssqlConnectionPool.tedious.TYPES.Int, param.value); break
			case 'decimal': request.addParameter(param.name, MssqlConnectionPool.tedious.TYPES.Decimal, param.value); break
			case 'boolean': request.addParameter(param.name, MssqlConnectionPool.tedious.TYPES.Bit, param.value); break
			case 'datetime': request.addParameter(param.name, MssqlConnectionPool.tedious.TYPES.DateTime, param.value); break
			}
		}
	}

	private toRows (array: any[], params: Parameter[]):string[] {
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
		return rows
	}
}
