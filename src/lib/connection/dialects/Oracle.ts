/* eslint-disable @typescript-eslint/no-unused-vars */

import { Connection, ConnectionPool } from '..'
import { SchemaError, Query, Data, ExecutionError, PropertyMapping } from '../../model'
import { MappingConfig, Dialect, Helper } from '../../manager'

// https://oracle.github.io/node-oracledb/doc/api.html#getstarted
// https://github.com/oracle/node-oracledb/tree/main/examples

export class OracleConnectionPool extends ConnectionPool {
	private static lib: any
	private pool: any = undefined

	public async init (): Promise<void> {
		if (!OracleConnectionPool.lib) {
			OracleConnectionPool.lib = require('oracledb')
			// https://github.com/oracle/node-oracledb/blob/main/examples/connectionpool.js
			let libPath = process.env.ORACLE_LIB_PATH
			if (!libPath) {
				if (process.platform === 'win32') { // Windows
					libPath = 'C:\\oracle\\instantclient_21_3'
				} else if (process.platform === 'darwin') { // macOS
					libPath = process.env.HOME + '/Downloads/instantclient_21_3'
				}
			}
			if (libPath && await Helper.existsPath(libPath)) {
				OracleConnectionPool.lib.initOracleClient({ libDir: libPath })
			}
		}
	}

	private async createPool (): Promise<any> {
		if (!OracleConnectionPool.lib) {
			await this.init()
		}
		return OracleConnectionPool.lib.createPool(this.config.connection)
	}

	public async acquire (): Promise<Connection> {
		if (!this.pool) {
			this.pool = await this.createPool()
		}
		const cnx = await this.pool.getConnection()
		return new OracleConnection(cnx, this)
	}

	public async release (connection: Connection): Promise<void> {
		await connection.cnx.close()
	}

	public async end (): Promise<void> {
		// console.info('Oracle end pool not Implemented')
	}
}
export class OracleConnection extends Connection {
	constructor (cnx: any, pool: any) {
		super(cnx, pool)
		this.maxChunkSizeIdsOnSelect = 999
	}

	public async select (mapping: MappingConfig, _dialect: Dialect, query: Query, data: Data): Promise<any> {
		try {
			const result = await this._execute(mapping, query, data)
			const list: any[] = []
			for (const i in result.rows) {
				const row = result.rows[i]
				const item: any = {}
				for (const j in result.metaData) {
					const col = result.metaData[j]
					item[col.name] = row[j]
				}
				list.push(item)
			}
			return list
		} catch (e) {
			console.log(e)
		}
	}

	public async insert (mapping: MappingConfig, _dialect: Dialect, query: Query, data: Data): Promise<any> {
		try {
			const result = await this._execute(mapping, query, data)
			return result.rows.length > 0 ? result.rows[0].id : null
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	public async bulkInsert (mapping: MappingConfig, _dialect: Dialect, query: Query, array: any[]): Promise<any[]> {
		const fieldIds = mapping.getFieldIds(query.entity)
		const fieldId = fieldIds && fieldIds.length === 1 ? fieldIds[0] : null
		const fieldIdKey = fieldId ? 'lbdOrm_' + fieldId.name : null
		let options = {}
		let sql = ''
		const bindDefs: any = {}
		if (fieldId && fieldIdKey) {
			// oracledb.BIND_OUT 3003
			const oracleType = this.oracleType(fieldId.type)
			if (fieldId.type === 'string') {
				const property = mapping.getProperty(query.entity, fieldId.name)
				bindDefs[fieldIdKey] = { dir: 3003, type: oracleType, maxSize: property.length }
			} else {
				bindDefs[fieldIdKey] = { dir: 3003, type: oracleType }
			}
		}
		for (const param of query.parameters) {
			const property = mapping.getProperty(query.entity, param.name)
			bindDefs[param.name] = this.getOracleType(param.type, property)
		}
		options = {
			autoCommit: !this.inTransaction,
			batchErrors: true,
			bindDefs: bindDefs
		}
		const binds: any[] = this.arrayToRows(query, mapping, array)
		const returning = fieldId && fieldIdKey ? `RETURNING ${fieldId.mapping} INTO :${fieldIdKey} ` : ''
		sql = `${query.sentence} ${returning}`
		const result = await this.cnx.executeMany(sql, binds, options)

		if (result.rowsAffected !== binds.length) {
			throw new ExecutionError(query.dataSource, query.entity, query.sentence, `${binds.length - result.rowsAffected} records not imported!`, binds)
		}

		if (!fieldId || !fieldIdKey) {
			return []
		}

		const ids: any[] = []
		for (const i in result.outBinds) {
			ids.push(result.outBinds[i][fieldIdKey][0])
		}
		return ids

		// Info
		// https://stackoverflow.com/questions/46964852/node-oracledb-bulk-insert-using-associative-array
		// https://blogs.oracle.com/opal/post/node-oracledb-22-with-batch-statement-execution-and-more-is-out-on-npm
		// [binDef by name](https://stackoverflow.com/questions/61009450/node-js-oracledb-4-2-executemany-error-njs-011-encountered-bind-value-an)
		// [binDef by name](https://github.com/oracle/node-oracledb/issues/1232)
		// [use sequence](https://stackoverflow.com/questions/57201595/how-to-use-column-nextval-with-oracledb)
		// [returning](https://cx-oracle.readthedocs.io/en/latest/user_guide/batch_statement.html)
	}

	private oracleType (type: string): number {
		switch (type) {
		case 'boolean':
			return 2003
			// oracledb.DB_TYPE_CHAR 2003
		case 'string':
			// eslint-disable-next-line no-case-declarations
			return 2001
			// oracledb.STRING 2001
		case 'integer':
		case 'decimal':
			return 2010
			// oracledb.NUMBER 2010
		case 'datetime':
		case 'date':
		case 'time':
			return 2014
			// oracledb.DATE 2014
		default:
			throw new SchemaError(`type ${type} not implemented`)
		}
	}

	private getOracleType (type:string, property:PropertyMapping):any {
		const oracleType = this.oracleType(type)
		switch (type) {
		case 'boolean':
			return { type: oracleType, maxSize: 1 }
		case 'string':
			return { type: oracleType, maxSize: property.length }
		case 'integer':
		case 'decimal':
			return { type: oracleType }
		case 'datetime':
		case 'date':
		case 'time':
			return { type: oracleType }
		}
	}

	protected override arrayToRows (query: Query, _mapping: MappingConfig, array: any[]): any[] {
		const rows: any[] = []
		for (const item of array) {
			const row: any = {}
			for (const parameter of query.parameters) {
				const value = item[parameter.name]
				row[parameter.name] = this.getItemValue(parameter.type, value)
			}
			rows.push(row)
		}
		return rows
	}

	private getItemValue (type:string, value:any):any {
		switch (type) {
		case 'boolean':
			return value ? 'Y' : 'N'
		case 'string':
			return typeof value === 'string' || value === null ? value : value.toString()
		case 'datetime':
		case 'date':
		case 'time':
			return value ? new Date(value) : null
		default:
			return value
		}
	}

	public async update (mapping: MappingConfig, _dialect: Dialect, query: Query, data: Data): Promise<number> {
		const result = await this._execute(mapping, query, data)
		return result.rowsAffected
	}

	public async delete (mapping: MappingConfig, _dialect: Dialect, query: Query, data: Data): Promise<number> {
		const result = await this._execute(mapping, query, data)
		return result.rowsAffected
	}

	public async execute (query: Query): Promise<any> {
		const sql = query.sentence
		const options = this.inTransaction ? { autoCommit: false } : { autoCommit: true }
		return this.cnx.execute(sql, {}, options)
	}

	public async executeDDL (query: Query): Promise<any> {
		return this.cnx.execute(query.sentence)
	}

	public async executeSentence (sentence: any): Promise<any> {
		return this.cnx.execute(sentence)
	}

	public async beginTransaction (): Promise<void> {
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

	protected async _execute (mapping: MappingConfig, query: Query, data: Data): Promise<any> {
		const values: any = {}
		let sql = query.sentence
		const params = this.dataToParameters(query, mapping, data)
		for (const param of params) {
			if (param.type !== 'array') {
				values[param.name] = param.value
				continue
			}
			if (param.value.length > 0) {
				const type = typeof param.value[0]
				if (type === 'string') {
					for (const _value of param.value) {
						let value = _value
						value = Helper.escape(value)
						value = Helper.replace(value, '\\\'', '\\\'\'')
						values.push(`'${value}'`)
					}
					Helper.replace(sql, `:${param.name}`, param.value.join(','))
				} else {
					sql = Helper.replace(sql, `:${param.name}`, param.value.join(','))
				}
			} else {
				sql = Helper.replace(sql, `:${param.name}`, '')
			}
		}
		const options = { autoCommit: !this.inTransaction }
		return this.cnx.execute(sql, values, options)
	}
}
