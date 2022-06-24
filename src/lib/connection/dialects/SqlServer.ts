/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-this-alias */
import { Connection, ConnectionConfig, ConnectionPool } from '..'
import { Parameter, Query, Data } from '../../model'
import { MappingConfig, Dialect, Helper } from '../../manager'

export class SqlServerConnectionPool extends ConnectionPool {
	public static lib: any
	constructor (config: ConnectionConfig) {
		super(config)
		if (!SqlServerConnectionPool.lib) {
			SqlServerConnectionPool.lib = require('tedious')
		}
	}

	public async init (): Promise<void> {
		console.log('init')
	}

	public async acquire (): Promise<Connection> {
		try {
			const cnx = await new Promise<Connection>((resolve, reject) => {
				const connection = new SqlServerConnectionPool.lib.Connection(this.config.connection)
				connection.connect()
				connection.on('connect', (err: any) => {
					if (err) {
						reject(err)
					}
					resolve(connection)
				})
			})
			return new SqlServerConnection(cnx, this)
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

export class SqlServerConnection extends Connection {
	constructor (cnx: any, pool: any) {
		super(cnx, pool)
		this.maxChunkSizeOnBulkInsert = 1000
	}

	public async select (mapping: MappingConfig, _dialect: Dialect, query: Query, data: Data): Promise<any> {
		return this._query(mapping, query, query.sentence, data)
	}

	public async insert (mapping: MappingConfig, _dialect: Dialect, query: Query, data: Data): Promise<any> {
		const autoIncrement = mapping.getAutoIncrement(query.entity)
		const fieldId: string | undefined = autoIncrement && autoIncrement.mapping ? autoIncrement.mapping : undefined
		const sentence = fieldId
			? query.sentence.replace('OUTPUT inserted.0', '')
			: query.sentence
		const result = await this._query(mapping, query, sentence, data)
		if (fieldId) {
			return result[fieldId]
		} else {
			return 0
		}
	}

	public async bulkInsert (mapping: MappingConfig, _dialect: Dialect, query: Query, array: any[]): Promise<any[]> {
		// https://www.sqlservertutorial.net/sql-server-basics/sql-server-insert-multiple-rows/
		try {
			const autoIncrement = mapping.getAutoIncrement(query.entity)
			const fieldId: string | undefined = autoIncrement && autoIncrement.mapping ? autoIncrement.mapping : undefined
			const sql = query.sentence
			const rows = this.arrayToRows(query, mapping, array)
			const _query = fieldId
				? `${sql} OUTPUT inserted.${fieldId} VALUES ${rows.join(',')};`
				: `${sql} VALUES ${rows.join(',')};`

			const result = await this._executeSentence(_query)
			const ids: any[] = []
			if (fieldId) {
				for (const p in result) {
					const id = result[p][fieldId]
					ids.push(id)
				}
			}
			return ids
		} catch (error) {
			throw new Error(`Error to execute bulkInsert \nerror: ${error} \nquery:\n${query}`)
		}
	}

	public async update (mapping: MappingConfig, _dialect: Dialect, query: Query, data: Data): Promise<number> {
		return this._execute(mapping, query, data)
	}

	public async delete (mapping: MappingConfig, _dialect: Dialect, query: Query, data: Data): Promise<number> {
		return this._execute(mapping, query, data)
	}

	public async execute (query: Query): Promise<any> {
		return this._executeSentence(query.sentence)
	}

	public async executeDDL (query: Query): Promise<any> {
		return this._executeSentence(query.sentence)
	}

	public async executeSentence (sentence: any): Promise<any> {
		return this._executeSentence(sentence)
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
		return new Promise<any[]>((resolve, reject) => {
			try {
				const rows: any[] = []
				const request = new SqlServerConnectionPool.lib.Request(sentence, (error: any) => {
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
		return new Promise<any>((resolve, reject) => {
			const request = this.createRequest(query.sentence, reject, resolve)
			const params = this.dataToParameters(query, mapping, data)
			if (params.length > 0) {
				me.addParameters(request, params)
			}
			return me.cnx.execSql(request)
		})
	}

	private async _executeSentence (sentence: string) {
		const me = this
		return new Promise<any>((resolve, reject) => {
			const sqlRequest = this.createRequest(sentence, reject, resolve)
			return me.cnx.execSql(sqlRequest)
		})
	}

	private createRequest (sentence: string, reject:any, resolve: any):any {
		return new SqlServerConnectionPool.lib.Request(sentence, (err: any, rowCount: any) => {
			if (err) {
				reject(new Error(`Mssql connection _execute error: ${err}`))
			}
			resolve(rowCount)
		})
	}

	private addParameters (request: any, params: Parameter[] = []) {
		for (const param of params) {
			switch (param.type) {
			case 'array': request.addParameter(param.name, SqlServerConnectionPool.lib.TYPES.NVarChar, param.value.join(',')); break
			case 'string': request.addParameter(param.name, SqlServerConnectionPool.lib.TYPES.NVarChar, param.value); break
			case 'number': request.addParameter(param.name, SqlServerConnectionPool.lib.TYPES.Numeric, param.value); break
			case 'integer': request.addParameter(param.name, SqlServerConnectionPool.lib.TYPES.Int, param.value); break
			case 'decimal': request.addParameter(param.name, SqlServerConnectionPool.lib.TYPES.Decimal, param.value); break
			case 'boolean': request.addParameter(param.name, SqlServerConnectionPool.lib.TYPES.Bit, param.value); break
			case 'datetime': request.addParameter(param.name, SqlServerConnectionPool.lib.TYPES.DateTime, param.value); break
			}
		}
	}

	protected override arrayToRows (query: Query, mapping: MappingConfig, array: any[]): any[] {
		const rows: any[] = []
		for (const item of array) {
			const row: any[] = []
			for (const parameter of query.parameters) {
				const value = this.getItemValue(item, parameter, mapping)
				row.push(value)
			}
			rows.push(`(${row.join(',')})`)
		}
		return rows
	}

	private getItemValue (item:any, parameter:Parameter, mapping: MappingConfig):any {
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
		return value
	}
}
