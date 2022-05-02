/* eslint-disable @typescript-eslint/no-this-alias */
import { Connection, ConnectionConfig, ConnectionPool } from '..'
import { Parameter, Query, Data, MethodNotImplemented } from '../../model'
import { MappingConfig, Dialect, Helper } from '../../manager'

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
		try {
			const cnx = await new Promise<Connection>((resolve, reject) => {
				const connection = new MssqlConnectionPool.tedious.Connection(this.config.connection)
				connection.connect()
				connection.on('connect', (err: any) => {
					if (err) {
						reject(err)
					}
					resolve(connection)
				})
			})
			return new MssqlConnection(cnx, this)
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	public async release (connection: Connection): Promise<void> {
		if (connection.cnx.closed) {
			return
		}
		connection.cnx.close()
	}

	public async end (): Promise<void> {
		// console.log('end')
	}
}

export class MssqlConnection extends Connection {
	public async select (mapping: MappingConfig, dialect: Dialect, query: Query, data: Data): Promise<any> {
		const result = await this._query(mapping, query, query.sentence as string, data)
		return result
	}

	public async insert (mapping: MappingConfig, dialect: Dialect, query: Query, data: Data): Promise<any> {
		const autoIncrement = mapping.getAutoIncrement(query.entity)
		const fieldId: string | undefined = autoIncrement && autoIncrement.mapping ? autoIncrement.mapping : undefined
		const sentence = fieldId
			? (query.sentence as string).replace('OUTPUT inserted.0', '')
			: query.sentence as string
		const result = await this._query(mapping, query, sentence, data)
		if (fieldId) {
			return result[fieldId]
		} else {
			return 0
		}
	}

	public async bulkInsert (mapping: MappingConfig, dialect: Dialect, query: Query, array: any[]): Promise<any[]> {
		// https://www.sqlservertutorial.net/sql-server-basics/sql-server-insert-multiple-rows/
		const autoIncrement = mapping.getAutoIncrement(query.entity)
		const fieldId: string | undefined = autoIncrement && autoIncrement.mapping ? autoIncrement.mapping : undefined
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

				const rows = this.arrayToRows(query, mapping, buffer)
				_query = fieldId
					? `${sql} OUTPUT inserted.${fieldId} VALUES ${rows.join(',')};`
					: `${sql} VALUES ${rows.join(',')};`

				const result = await this._executeSentence(_query)

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

	public async update (mapping: MappingConfig, dialect: Dialect, query: Query, data: Data): Promise<number> {
		return await this._execute(mapping, query, data)
	}

	public async bulkUpdate (mapping: MappingConfig, dialect: Dialect, query: Query, array: any[]): Promise<number> {
		throw new MethodNotImplemented('MssqlConnection', 'updateMany')
	}

	public async delete (mapping: MappingConfig, dialect: Dialect, query: Query, data: Data): Promise<number> {
		return await this._execute(mapping, query, data)
	}

	public async bulkDelete (mapping: MappingConfig, dialect: Dialect, query: Query, array: any[]): Promise<number> {
		throw new MethodNotImplemented('MssqlConnection', 'deleteMany')
	}

	public async execute (query: Query): Promise<any> {
		return await this._executeSentence(query.sentence as string)
	}

	public async executeDDL (query: Query): Promise<any> {
		return await this._executeSentence(query.sentence as string)
	}

	public async executeSentence (sentence: any): Promise<any> {
		return await this._executeSentence(sentence)
	}

	public async beginTransaction (): Promise<void> {
		const me = this
		await new Promise<void>((resolve, reject) => {
			me.cnx.beginTransaction((error: any) => {
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
				me.cnx.rollbackTransaction((error: any) => {
					if (error) {
						reject(new Error(`Mssql connection rollback error: ${error}`))
					}
					me.inTransaction = false
					resolve()
				})
			})
		}
	}

	private async _query (mapping: MappingConfig, query: Query, sentence: string, data: Data): Promise<any> {
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
				const params = this.dataToParameters(query, mapping, data)
				if (params.length > 0) {
					me.addParameters(request, params)
				}
				return me.cnx.execSql(request)
			} catch (error) {
				reject(new Error(`Mssql connection _query error: ${error}`))
			}
		})
	}

	private async _execute (mapping: MappingConfig, query: Query, data: Data) {
		const me = this
		return await new Promise<any>((resolve, reject) => {
			const request = new MssqlConnectionPool.tedious.Request(query.sentence, (err: any, rowCount: any) => {
				if (err) {
					reject(new Error(`Mssql connection _execute error: ${err}`))
				}
				resolve(rowCount)
			})
			const params = this.dataToParameters(query, mapping, data)
			if (params.length > 0) {
				me.addParameters(request, params)
			}
			return me.cnx.execSql(request)
		})
	}

	private async _executeSentence (sentence: string) {
		const me = this
		return await new Promise<any>((resolve, reject) => {
			const request = new MssqlConnectionPool.tedious.Request(sentence, (err: any, rowCount: any) => {
				if (err) {
					reject(new Error(`Mssql connection _execute error: ${err}`))
				}
				resolve(rowCount)
			})
			return me.cnx.execSql(request)
		})
	}

	private addParameters (request: any, params: Parameter[] = []) {
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

	protected override arrayToRows (query: Query, mapping: MappingConfig, array: any[]): any[] {
		const rows: any[] = []
		for (let i = 0; i < array.length; i++) {
			const item = array[i]
			const row: any[] = []
			for (let j = 0; j < query.parameters.length; j++) {
				const parameter = query.parameters[j]
				let value = item[parameter.name]
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
						value = Helper.escape(this.writeDateTime(value, mapping))
						break
					case 'date':
						value = Helper.escape(this.writeDate(value, mapping))
						break
					case 'time':
						value = Helper.escape(this.writeTime(value, mapping))
						break
					}
				}
				row.push(value)
			}
			rows.push(`(${row.join(',')})`)
		}
		return rows
	}

	// private toRows (array: any[], params: Parameter[]):string[] {
	// const rows:string[] = []
	// for (const p in array) {
	// const values = array[p]
	// const row:any[] = []
	// for (let i = 0; i < params.length; i++) {
	// const parameter = params[i]
	// let value = values[i]
	// if (value == null || value === undefined) {
	// value = 'null'
	// } else {
	// switch (parameter.type) {
	// case 'boolean':
	// value = value ? 1 : 0; break
	// case 'string':
	// value = Helper.escape(value)
	// value = Helper.replace(value, '\\\'', '\\\'\'')
	// break
	// case 'datetime':
	// case 'date':
	// case 'time':
	// value = Helper.escape(value); break
	// }
	// }
	// row.push(value)
	// }
	// rows.push(`(${row.join(',')})`)
	// }
	// return rows
	// }
}
