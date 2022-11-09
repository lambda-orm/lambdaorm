/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-this-alias */
import { Connection, ConnectionConfig, ConnectionPool } from '..'
import { Parameter, Query, Data } from '../../model'
import { MappingConfig, Dialect, helper } from '../../manager'

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

	public async select (mapping: MappingConfig, dialect: Dialect, query: Query, data: Data): Promise<any> {
		return this._query(mapping, dialect, query, query.sentence, data)
	}

	public async insert (mapping: MappingConfig, dialect: Dialect, query: Query, data: Data): Promise<any> {
		const autoIncrement = mapping.getAutoIncrement(query.entity)
		const fieldId: string | undefined = autoIncrement && autoIncrement.mapping ? autoIncrement.mapping : undefined
		const sentence = fieldId
			? query.sentence
			: query.sentence.replace('OUTPUT INSERTED.0', '')
		const result = await this._query(mapping, dialect, query, sentence, data)
		if (fieldId && result.length === 1) {
			return result[0][fieldId]
		} else {
			return 0
		}
	}

	public async bulkInsert (mapping: MappingConfig, dialect: Dialect, query: Query, array: any[]): Promise<any[]> {
		// https://www.sqlservertutorial.net/sql-server-basics/sql-server-insert-multiple-rows/
		try {
			const autoIncrement = mapping.getAutoIncrement(query.entity)
			const fieldId: string | undefined = autoIncrement && autoIncrement.mapping ? autoIncrement.mapping : undefined
			const sql = query.sentence
			const rows = this.arrayToRows(mapping, dialect, query, array)
			if (fieldId) {
				const sentence = `${sql} OUTPUT inserted.${fieldId} VALUES ${rows.join(',')};`
				const result = await this._query(mapping, dialect, query, sentence, undefined)
				const ids: any[] = []
				for (const p in result) {
					const id = result[p][fieldId]
					ids.push(id)
				}
				return ids
			} else {
				const sentence = `${sql} VALUES ${rows.join(',')};`
				await this._executeSentence(sentence)
				return []
			}
		} catch (error) {
			throw new Error(`Error to execute bulkInsert \nerror: ${error} \nquery:\n${query}`)
		}
	}

	public async update (mapping: MappingConfig, dialect: Dialect, query: Query, data: Data): Promise<number> {
		return this._execute(mapping, dialect, query, data)
	}

	public async delete (mapping: MappingConfig, dialect: Dialect, query: Query, data: Data): Promise<number> {
		return this._execute(mapping, dialect, query, data)
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
					reject(new Error(`SqlServer connection beginTransaction error: ${error}`))
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
						reject(new Error(`SqlServer connection commit error: ${error}`))
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
						reject(new Error(`SqlServer connection rollback error: ${error}`))
					}
					me.inTransaction = false
					resolve()
				})
			})
		}
	}

	private async _query (mapping: MappingConfig, dialect: Dialect, query: Query, sentence: string, data: Data|undefined): Promise<any> {
		const me = this
		return new Promise<any[]>((resolve, reject) => {
			try {
				const rows: any[] = []
				// https://github.com/tediousjs/tedious/issues/130
				const _sentence = data ? this.solveArrayParameters(query, data, sentence) : sentence
				const request = new SqlServerConnectionPool.lib.Request(_sentence, (error: any) => {
					if (error) {
						reject(new Error(`SqlServer connection _query error: ${error}`))
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
				if (data) {
					const params = this.dataToParameters(mapping, dialect, query, data)
					if (params.length > 0) {
						me.addParameters(request, params)
					}
				}
				return me.cnx.execSql(request)
			} catch (error) {
				reject(new Error(`SqlServer connection _query error: ${error}`))
			}
		})
	}

	private async _execute (mapping: MappingConfig, dialect:Dialect, query: Query, data: Data) {
		const me = this
		return new Promise<any>((resolve, reject) => {
			const request = this.createNonQueryRequest(query.sentence, reject, resolve)
			const params = this.dataToParameters(mapping, dialect, query, data)
			if (params.length > 0) {
				me.addParameters(request, params)
			}
			return me.cnx.execSql(request)
		})
	}

	private async _executeSentence (sentence: string) {
		const me = this
		return new Promise<any>((resolve, reject) => {
			const sqlRequest = this.createNonQueryRequest(sentence, reject, resolve)
			return me.cnx.execSql(sqlRequest)
		})
	}

	private createNonQueryRequest (sentence: string, reject:any, resolve: any):any {
		return new SqlServerConnectionPool.lib.Request(sentence, (err: any, rowCount: any) => {
			if (err) {
				reject(new Error(`SqlServer sentence: ${sentence} error: ${err}`))
			}
			resolve(rowCount)
		})
	}

	protected solveArrayParameters (query: Query, data: Data, sentence: string): string {
		let _sentence = sentence
		for (const parameter of query.parameters) {
			const value = data.get(parameter.name)
			if (parameter.type === 'array' || (parameter.type === 'any' && Array.isArray(value))) {
				let list:any
				if (value.length > 0) {
					const type = typeof value[0]
					if (type === 'string') {
						const values: string[] = []
						for (const item of value) {
							let _item = item
							_item = helper.escape(_item)
							_item = helper.string.replace(_item, '\\\'', '\\\'\'')
							values.push(_item)
						}
						list = values.join(',')
					} else {
						list = value.join(',')
					}
				} else {
					list = ''
				}
				_sentence = helper.string.replace(_sentence, '@' + parameter.name, list)
			}
		}
		return _sentence
	}

	private addParameters (request: any, params: Parameter[] = []) {
		for (const param of params) {
			if (request.parameters.find(p => p.name === param.name) !== undefined) {
				continue
			}
			switch (param.type) {
			case 'string': request.addParameter(param.name, SqlServerConnectionPool.lib.TYPES.NVarChar, param.value); break
			case 'number': request.addParameter(param.name, SqlServerConnectionPool.lib.TYPES.Numeric, param.value); break
			case 'integer': request.addParameter(param.name, SqlServerConnectionPool.lib.TYPES.Int, param.value); break
			case 'decimal': request.addParameter(param.name, SqlServerConnectionPool.lib.TYPES.Decimal, param.value); break
			case 'boolean': request.addParameter(param.name, SqlServerConnectionPool.lib.TYPES.Bit, param.value); break
			case 'datetime': request.addParameter(param.name, SqlServerConnectionPool.lib.TYPES.DateTime, param.value); break
			case 'date': request.addParameter(param.name, SqlServerConnectionPool.lib.TYPES.Date, param.value); break
			case 'time': request.addParameter(param.name, SqlServerConnectionPool.lib.TYPES.Time, param.value); break
			}
		}
	}

	protected override arrayToRows (mapping: MappingConfig, dialect: Dialect, query: Query, array: any[]): any[] {
		const rows: any[] = []
		for (const item of array) {
			const row: any[] = []
			for (const parameter of query.parameters) {
				const value = this.getItemValue(mapping, dialect, item, parameter)
				row.push(value)
			}
			rows.push(`(${row.join(',')})`)
		}
		return rows
	}

	private getItemValue (mapping: MappingConfig, dialect: Dialect, item:any, parameter:Parameter):any {
		let value = item[parameter.name]
		if (value == null || value === undefined) {
			value = 'null'
		} else {
			switch (parameter.type) {
			case 'boolean':
				value = value ? 1 : 0; break
			case 'string':
				if (value.includes('\'')) {
					value = `'${helper.string.replace(value, '\'', '\'\'')}'`
				} else {
					value = `'${value}'`
				}
				// value = helper.escape(value)
				// value = helper.string.replace(value, '\\\'', '\\\'\'')
				break
			case 'datetime':
				value = helper.escape(this.writeDateTime(value, mapping, dialect))
				break
			case 'date':
				value = helper.escape(this.writeDate(value, mapping, dialect))
				break
			case 'time':
				value = helper.escape(this.writeTime(value, mapping, dialect))
				break
			}
		}
		return value
	}
}
