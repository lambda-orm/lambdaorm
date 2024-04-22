/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConnectionPoolAdapter } from './base/connectionPool'
import { ConnectionAdapter } from './base/connection'
import { Query } from '../../../query/domain'
import { OrmH3lp } from '../../../shared/infrastructure'
import { SchemaError, PropertyMapping, Data, MappingConfigService, EntityMapping } from 'lambdaorm-base'
import { Type, Primitive } from 'typ3s'
import { Connection } from '../../application'
import { DialectService } from '../../../language/application'
import { ExecutionError } from '../../domain'

// https://oracle.github.io/node-oracledb/doc/api.html#getstarted
// https://github.com/oracle/node-oracledb/tree/main/examples

interface OracleQueryPlan{
	sql:string
	values:any
}
interface OracleAutoIncrementInfo{
	key:string
	returning:string
	bindDef:any
}

export class OracleConnectionPoolAdapter extends ConnectionPoolAdapter {
	private static lib: any
	private pool: any = undefined

	public async init (): Promise<void> {
		if (!OracleConnectionPoolAdapter.lib) {
			OracleConnectionPoolAdapter.lib = require('oracledb')
			// https://github.com/oracle/node-oracledb/blob/main/examples/connectionpool.js
			let libPath = process.env.ORACLE_LIB_PATH
			if (!libPath) {
				if (process.platform === 'win32') { // Windows
					libPath = 'C:\\oracle\\instantclient_21_3'
				} else if (process.platform === 'darwin') { // macOS
					libPath = process.env.HOME + '/Downloads/instantclient_21_3'
				}
				if (libPath && await this.helper.fs.exists(libPath)) {
					await OracleConnectionPoolAdapter.lib.initOracleClient({ libDir: libPath })
				}
			}
		}
	}

	protected async create (id:string): Promise<Connection> {
		if (!this.pool) {
			if (!OracleConnectionPoolAdapter.lib) {
				await this.init()
			}
			this.pool = await OracleConnectionPoolAdapter.lib.createPool(this.config.connection)
		}
		const cnx = await this.pool.getConnection()
		return new OracleConnectionAdapter(OracleConnectionPoolAdapter.lib, id, cnx, this, this.helper)
	}
}
export class OracleConnectionAdapter extends ConnectionAdapter {
	public async end (): Promise<void> {
		await this.cnx.close()
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public insertConditional (mapping: MappingConfigService, dialect: DialectService, query: Query, data: Data): Promise<any> {
		throw new Error('Method not implemented.')
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public upsert (mapping: MappingConfigService, dialect: DialectService, query: Query, data: Data): Promise<any> {
		throw new Error('Method not implemented.')
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public merge (mapping: MappingConfigService, dialect: DialectService, query: Query, data: Data): Promise<any> {
		throw new Error('Method not implemented.')
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public bulkMerge (mapping: MappingConfigService, dialect: DialectService, query: Query, array: any[]): Promise<any[]> {
		throw new Error('Method not implemented.')
	}

	constructor (private readonly lib:any, id:string, cnx: any, pool: any, helper:OrmH3lp) {
		super(id, cnx, pool, helper)
		this.maxChunkSizeIdsOnSelect = 999
	}

	public async select (mapping: MappingConfigService, dialect: DialectService, query: Query, data: Data): Promise<any> {
		const qryInfo = this.getQueryPlan(mapping, dialect, query, data)
		const result = await this.cnx.execute(qryInfo.sql, qryInfo.values, { autoCommit: !this.inTransaction })
		const list: any[] = []
		for (const i in result.rows) {
			const row = result.rows[i]
			const item: any = {}
			for (const j in result.metaData) {
				const col = result.metaData[j]
				const colInfo = query.columns.find(p => p.name === col.name)
				if (colInfo && colInfo.type === Primitive.boolean) {
					item[col.name] = row[j] === 'Y'
				} else {
					item[col.name] = row[j]
				}
			}
			list.push(item)
		}
		return list
	}

	public async insert (mapping: MappingConfigService, dialect: DialectService, query: Query, data: Data): Promise<any> {
		let sql:string
		const qryInfo = this.getQueryPlan(mapping, dialect, query, data)
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

	public async bulkInsert (mapping: MappingConfigService, dialect: DialectService, query: Query, array: any[]): Promise<any[]> {
		let sql = ''
		const autoIncrementInfo = this.getAutoIncrementInfo(mapping, query)
		const bindDefs: any = {}
		for (const param of query.parameters) {
			const property = mapping.getProperty(query.entity, param.name)
			bindDefs[param.name] = this.getOracleType(param.type ? Primitive[param.type] : Primitive.any, property)
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

	public async update (mapping: MappingConfigService, dialect: DialectService, query: Query, data: Data): Promise<number> {
		const qryInfo = this.getQueryPlan(mapping, dialect, query, data)
		const result = await this.cnx.execute(qryInfo.sql, qryInfo.values, { autoCommit: !this.inTransaction })
		return result.rowsAffected
	}

	public async delete (mapping: MappingConfigService, dialect: DialectService, query: Query, data: Data): Promise<number> {
		const qryInfo = this.getQueryPlan(mapping, dialect, query, data)
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

	protected override arrayToRows (_mapping: MappingConfigService, _dialect: DialectService, query: Query, array: any[]): any[] {
		const rows: any[] = []
		for (const item of array) {
			const row: any = {}
			for (const parameter of query.parameters) {
				const value = item[parameter.name]
				row[parameter.name] = this.getItemValue(parameter.type ? Primitive[parameter.type] : Primitive.any, value)
			}
			rows.push(row)
		}
		return rows
	}

	private getQueryPlan (mapping: MappingConfigService, dialect: DialectService, query: Query, data: Data): OracleQueryPlan {
		const values: any = {}
		let sql = query.sentence
		const params = this.dataToParameters(mapping, dialect, query, data)
		for (const param of params) {
			if (!Type.isList(param.type as string) && !(param.type === Primitive.any && Array.isArray(param.value))) {
				if (param.type === Primitive.dateTime || param.type === Primitive.date || param.type === Primitive.time) {
					values[param.name] = new Date(param.value)
				} else {
					values[param.name] = param.value
				}
				continue
			}
			// if array
			if (param.value.length > 0) {
				const type = typeof param.value[0]
				if (type === Primitive.string) {
					const list:string[] = []
					for (const _item of param.value) {
						let item = _item
						item = this.helper.sql.escape(item)
						item = this.helper.str.replace(item, '\\\'', '\\\'\'')
						list.push(item)
					}
					sql = this.helper.str.replace(sql, `:${param.name}`, list.join(','))
				} else {
					sql = this.helper.str.replace(sql, `:${param.name}`, param.value.join(','))
				}
			} else {
				// if empty array
				sql = this.helper.str.replace(sql, `:${param.name}`, '')
			}
		}
		return { sql, values }
	}

	private getAutoIncrementInfo (mapping: MappingConfigService, query: Query): OracleAutoIncrementInfo|undefined {
		const fieldIds = mapping.getFieldIds(query.entity)
		const fieldId = fieldIds && fieldIds.length === 1 ? fieldIds[0] : null
		if (!fieldId) {
			return undefined
		}
		const key = 'lbdOrm_' + fieldId.name
		// oracledb.BIND_OUT 3003
		let bindDef:any
		const oracleType = this.oracleType(Primitive[fieldId.type || 'string'])
		if (fieldId.type === Primitive.string) {
			const property = mapping.getProperty(query.entity, fieldId.name)
			bindDef = { dir: 3003, type: oracleType, maxSize: property.length }
		} else {
			bindDef = { dir: 3003, type: oracleType }
		}
		const returning = `RETURNING ${fieldId.mapping} INTO :${key} `
		return { key, bindDef, returning }
	}

	private oracleType (type: Primitive): any {
		switch (type) {
		case Primitive.boolean:
			return this.lib.DB_TYPE_CHAR
		case Primitive.string:
			return this.lib.STRING
		case Primitive.integer:
		case Primitive.decimal:
			return this.lib.NUMBER
		case Primitive.dateTime:
		case Primitive.date:
		case Primitive.time:
			return this.lib.DATE
		default:
			throw new SchemaError(`type ${type} not implemented`)
		}
	}

	private getOracleType (type:Primitive, property:PropertyMapping):any {
		const oracleType = this.oracleType(type)
		switch (type) {
		case Primitive.boolean:
			return { type: oracleType, maxSize: 1 }
		case Primitive.string:
			return { type: oracleType, maxSize: property.length }
		case Primitive.number:
		case Primitive.integer:
		case Primitive.decimal:
			return { type: oracleType }
		case Primitive.dateTime:
		case Primitive.date:
		case Primitive.time:
			return { type: oracleType }
		}
	}

	private getItemValue (type:Primitive, value:any):any {
		switch (type) {
		case Primitive.boolean:
			return value ? 'Y' : 'N'
		case Primitive.string:
			return typeof value === 'string' || value === null || value === undefined ? value : value.toString()
		case Primitive.dateTime:
		case Primitive.date:
		case Primitive.time:
			return value ? new Date(value) : null
		default:
			return value
		}
	}
}
