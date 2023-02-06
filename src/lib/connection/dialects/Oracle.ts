/* eslint-disable @typescript-eslint/no-unused-vars */

import { Connection, ConnectionPool } from '..'
import { SchemaError, Query, Data, ExecutionError, PropertyMapping } from '../../contract'
import { MappingConfig, helper } from '../../manager'
import { Dialect } from '../../language'
import { Type, Kind } from '3xpr'

// https://oracle.github.io/node-oracledb/doc/api.html#getstarted
// https://github.com/oracle/node-oracledb/tree/main/examples

interface OracleQueryInfo{
	sql:string
	values:any
}
interface OracleAutoIncrementInfo{
	key:string
	returning:string
	bindDef:any
}

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
				if (libPath && await helper.fs.exists(libPath)) {
					await OracleConnectionPool.lib.initOracleClient({ libDir: libPath })
				}
			}
		}
	}

	public async acquire (): Promise<Connection> {
		if (!this.pool) {
			if (!OracleConnectionPool.lib) {
				await this.init()
			}
			this.pool = await OracleConnectionPool.lib.createPool(this.config.connection)
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

	public async select (mapping: MappingConfig, dialect: Dialect, query: Query, data: Data): Promise<any> {
		const qryInfo = this.getQueryInfo(mapping, dialect, query, data)
		const result = await this.cnx.execute(qryInfo.sql, qryInfo.values, { autoCommit: !this.inTransaction })
		const list: any[] = []
		for (const i in result.rows) {
			const row = result.rows[i]
			const item: any = {}
			for (const j in result.metaData) {
				const col = result.metaData[j]
				const colInfo = query.columns.find(p => p.name === col.name)
				if (colInfo && colInfo.type === Kind.boolean) {
					item[col.name] = row[j] === 'Y'
				} else {
					item[col.name] = row[j]
				}
			}
			list.push(item)
		}
		return list
	}

	public async insert (mapping: MappingConfig, dialect: Dialect, query: Query, data: Data): Promise<any> {
		let sql:string
		const qryInfo = this.getQueryInfo(mapping, dialect, query, data)
		const autoIncrementInfo = this.getAutoIncrementInfo(mapping, query)
		if (autoIncrementInfo) {
			qryInfo.values[autoIncrementInfo.key] = autoIncrementInfo.bindDef
			sql = `${query.sentence} ${autoIncrementInfo.returning}`
		} else {
			sql = query.sentence
		}
		const result = await this.cnx.execute(sql, qryInfo.values, { autoCommit: !this.inTransaction })
		if (autoIncrementInfo) {
			return result.outBinds[autoIncrementInfo.key][0]
		}
		return null
		// https://oracle.github.io/node-oracledb/doc/api.html#dmlreturn
	}

	public async bulkInsert (mapping: MappingConfig, dialect: Dialect, query: Query, array: any[]): Promise<any[]> {
		let sql = ''
		const autoIncrementInfo = this.getAutoIncrementInfo(mapping, query)
		const bindDefs: any = {}
		for (const param of query.parameters) {
			const property = mapping.getProperty(query.entity, param.name)
			bindDefs[param.name] = this.getOracleType(param.type ? Kind[param.type] : Kind.any, property)
		}
		if (autoIncrementInfo) {
			bindDefs[autoIncrementInfo.key] = autoIncrementInfo.bindDef
		}
		const options = {
			autoCommit: !this.inTransaction,
			batchErrors: true,
			bindDefs
		}
		const binds: any[] = this.arrayToRows(mapping, dialect, query, array)
		sql = autoIncrementInfo ? `${query.sentence} ${autoIncrementInfo.returning}` : query.sentence
		const result = await this.cnx.executeMany(sql, binds, options)

		if (result.rowsAffected !== binds.length) {
			throw new ExecutionError(query.source, query.entity, query.sentence, `${binds.length - result.rowsAffected} records not imported!`, binds)
		}
		if (autoIncrementInfo) {
			const ids: any[] = []
			for (const i in result.outBinds) {
				ids.push(result.outBinds[i][autoIncrementInfo.key][0])
			}
			return ids
		} else {
			return []
		}

		// Info
		// https://stackoverflow.com/questions/46964852/node-oracledb-bulk-insert-using-associative-array
		// https://blogs.oracle.com/opal/post/node-oracledb-22-with-batch-statement-execution-and-more-is-out-on-npm
		// [binDef by name](https://stackoverflow.com/questions/61009450/node-js-oracledb-4-2-executemany-error-njs-011-encountered-bind-value-an)
		// [binDef by name](https://github.com/oracle/node-oracledb/issues/1232)
		// [use sequence](https://stackoverflow.com/questions/57201595/how-to-use-column-nextval-with-oracledb)
		// [returning](https://cx-oracle.readthedocs.io/en/latest/user_guide/batch_statement.html)
	}

	public async update (mapping: MappingConfig, dialect: Dialect, query: Query, data: Data): Promise<number> {
		const qryInfo = this.getQueryInfo(mapping, dialect, query, data)
		const result = await this.cnx.execute(qryInfo.sql, qryInfo.values, { autoCommit: !this.inTransaction })
		return result.rowsAffected
	}

	public async delete (mapping: MappingConfig, dialect: Dialect, query: Query, data: Data): Promise<number> {
		const qryInfo = this.getQueryInfo(mapping, dialect, query, data)
		const result = await this.cnx.execute(qryInfo.sql, qryInfo.values, { autoCommit: !this.inTransaction })
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

	protected override arrayToRows (_mapping: MappingConfig, _dialect: Dialect, query: Query, array: any[]): any[] {
		const rows: any[] = []
		for (const item of array) {
			const row: any = {}
			for (const parameter of query.parameters) {
				const value = item[parameter.name]
				row[parameter.name] = this.getItemValue(parameter.type ? Kind[parameter.type] : Kind.any, value)
			}
			rows.push(row)
		}
		return rows
	}

	private getQueryInfo (mapping: MappingConfig, dialect: Dialect, query: Query, data: Data): OracleQueryInfo {
		const values: any = {}
		let sql = query.sentence
		const params = this.dataToParameters(mapping, dialect, query, data)
		for (const param of params) {
			if (!Type.isList(param.type as string) && !(param.type === Kind.any && Array.isArray(param.value))) {
				if (param.type === Kind.dateTime || param.type === Kind.date || param.type === Kind.time) {
					values[param.name] = new Date(param.value)
				} else {
					values[param.name] = param.value
				}
				continue
			}
			// if array
			if (param.value.length > 0) {
				const type = typeof param.value[0]
				if (type === Kind.string) {
					const list:string[] = []
					for (const _item of param.value) {
						let item = _item
						item = helper.query.escape(item)
						item = helper.str.replace(item, '\\\'', '\\\'\'')
						list.push(item)
					}
					sql = helper.str.replace(sql, `:${param.name}`, list.join(','))
				} else {
					sql = helper.str.replace(sql, `:${param.name}`, param.value.join(','))
				}
			} else {
				// if empty array
				sql = helper.str.replace(sql, `:${param.name}`, '')
			}
		}
		return { sql, values }
	}

	private getAutoIncrementInfo (mapping: MappingConfig, query: Query): OracleAutoIncrementInfo|undefined {
		const fieldIds = mapping.getFieldIds(query.entity)
		const fieldId = fieldIds && fieldIds.length === 1 ? fieldIds[0] : null
		if (!fieldId) {
			return undefined
		}
		const key = 'lbdOrm_' + fieldId.name
		// oracledb.BIND_OUT 3003
		let bindDef:any
		const oracleType = this.oracleType(Kind[fieldId.type])
		if (fieldId.type === Kind.string) {
			const property = mapping.getProperty(query.entity, fieldId.name)
			bindDef = { dir: 3003, type: oracleType, maxSize: property.length }
		} else {
			bindDef = { dir: 3003, type: oracleType }
		}
		const returning = `RETURNING ${fieldId.mapping} INTO :${key} `
		return { key, bindDef, returning }
	}

	private oracleType (type: Kind): number {
		switch (type) {
		case Kind.boolean:
			return 2003
			// oracledb.DB_TYPE_CHAR 2003
		case Kind.string:
			// eslint-disable-next-line no-case-declarations
			return 2001
			// oracledb.STRING 2001
		case Kind.integer:
		case Kind.decimal:
			return 2010
			// oracledb.NUMBER 2010
		case Kind.dateTime:
		case Kind.date:
		case Kind.time:
			return 2014
			// oracledb.DATE 2014
		default:
			throw new SchemaError(`type ${type} not implemented`)
		}
	}

	private getOracleType (type:Kind, property:PropertyMapping):any {
		const oracleType = this.oracleType(type)
		switch (type) {
		case Kind.boolean:
			return { type: oracleType, maxSize: 1 }
		case Kind.string:
			return { type: oracleType, maxSize: property.length }
		case Kind.number:
		case Kind.integer:
		case Kind.decimal:
			return { type: oracleType }
		case Kind.dateTime:
		case Kind.date:
		case Kind.time:
			return { type: oracleType }
		}
	}

	private getItemValue (type:Kind, value:any):any {
		switch (type) {
		case Kind.boolean:
			return value ? 'Y' : 'N'
		case Kind.string:
			return typeof value === Kind.string || value === null ? value : value.toString()
		case Kind.dateTime:
		case Kind.date:
		case Kind.time:
			return value ? new Date(value) : null
		default:
			return value
		}
	}
}
