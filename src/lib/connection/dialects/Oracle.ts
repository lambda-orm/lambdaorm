
import { Connection, ConnectionPool } from '..'
import { SchemaError, Query, Data, ExecutionError, MethodNotImplemented } from '../../model'
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
		return await OracleConnectionPool.lib.createPool(this.config.connection)
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
		// console.info('postgres end pool not Implemented')
	}
}
export class OracleConnection extends Connection {
	public async select (mapping: MappingConfig, dialect: Dialect, query: Query, data: Data): Promise<any> {
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
	}

	public async insert (mapping: MappingConfig, dialect: Dialect, query: Query, data: Data): Promise<any> {
		try {
			const result = await this._execute(mapping, query, data)
			return result.rows.length > 0 ? result.rows[0].id : null
		} catch (error) {
			console.error(error)
			throw error
		}
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

	public async bulkInsert (mapping: MappingConfig, dialect: Dialect, query: Query, array: any[]): Promise<any[]> {
		const fieldIds = mapping.getFieldIds(query.entity)
		const fieldId = fieldIds && fieldIds.length === 1 ? fieldIds[0] : null
		const fieldIdKey = fieldId ? 'lbdOrm_' + fieldId.name : null
		let options = {}
		let sql = ''
		try {
			const bindDefs: any = {}
			if (fieldId && fieldIdKey) {
				bindDefs[fieldIdKey] = { dir: 3003, type: this.oracleType(fieldId.type) }
				// oracledb.BIND_OUT 3003
			}
			for (let i = 0; i < query.parameters.length; i++) {
				const param = query.parameters[i]
				const oracleType = this.oracleType(param.type)
				switch (param.type) {
				case 'boolean':
					bindDefs[param.name] = { type: oracleType, maxSize: 1 }; break
				case 'string':
					// eslint-disable-next-line no-case-declarations
					const property = mapping.getProperty(query.entity, param.name)
					bindDefs[param.name] = { type: oracleType, maxSize: property.length }; break
				case 'integer':
				case 'decimal':
					bindDefs[param.name] = { type: oracleType }; break
				case 'datetime':
				case 'date':
				case 'time':
					bindDefs[param.name] = { type: oracleType }; break
				}
			}
			options = {
				autoCommit: !this.inTransaction,
				batchErrors: true,
				bindDefs: bindDefs
			}

			// for (const p in array) {
			// const values = array[p]
			// const row: any = {}
			// for (let i = 0; i < params.length; i++) {
			// const param = params[i]
			// switch (param.type) {
			// case 'boolean':
			// row[param.name] = values[i] ? 'Y' : 'N'; break
			// case 'string':
			// row[param.name] = typeof values[i] === 'string' || values[i] === null ? values[i] : values[i].toString(); break
			// case 'datetime':
			// case 'date':
			// case 'time':
			// row[param.name] = values[i] ? new Date(values[i]) : null; break
			// default:
			// row[param.name] = values[i]
			// }
			// }
			// binds.push(row)
			// }
			const binds: any[] = this.arrayToRows(query, mapping, array)
			const returning = fieldId && fieldIdKey ? `RETURNING ${fieldId.mapping} INTO :${fieldIdKey} ` : ''
			sql = `${query.sentence} ${returning}`
			const result = await this.cnx.executeMany(sql, binds, options)

			if (result.rowsAffected !== binds.length) {
				throw new ExecutionError(query.dataSource, query.entity, query.sentence as string, `${binds.length - result.rowsAffected} records not imported!`, binds)
			}

			if (fieldId && fieldIdKey) {
				const ids: any[] = []
				for (const i in result.outBinds) {
					ids.push(result.outBinds[i][fieldIdKey][0])
				}
				return ids
			} else {
				return []
			}
		} catch (error) {
			console.log(error)
			throw error
		}

		// Info
		// https://stackoverflow.com/questions/46964852/node-oracledb-bulk-insert-using-associative-array
		// https://blogs.oracle.com/opal/post/node-oracledb-22-with-batch-statement-execution-and-more-is-out-on-npm
		// [binDef by name](https://stackoverflow.com/questions/61009450/node-js-oracledb-4-2-executemany-error-njs-011-encountered-bind-value-an)
		// [binDef by name](https://github.com/oracle/node-oracledb/issues/1232)
		// [use sequence](https://stackoverflow.com/questions/57201595/how-to-use-column-nextval-with-oracledb)
		// [returning](https://cx-oracle.readthedocs.io/en/latest/user_guide/batch_statement.html)
	}

	protected override arrayToRows (query: Query, mapping: MappingConfig, array: any[]): any[] {
		const rows: any[] = []
		for (let i = 0; i < array.length; i++) {
			const item = array[i]
			const row: any = {}
			for (let j = 0; j < query.parameters.length; j++) {
				const parameter = query.parameters[j]
				const value = item[parameter.name]
				switch (parameter.type) {
				case 'boolean':
					row[parameter.name] = value ? 'Y' : 'N'; break
				case 'string':
					row[parameter.name] = typeof value === 'string' || value === null ? value : value.toString(); break
				case 'datetime':
				case 'date':
				case 'time':
					row[parameter.name] = value ? new Date(value) : null; break
				default:
					row[parameter.name] = value
				}
				row.push(value)
			}
			rows.push(row)
		}
		return rows
	}

	public async update (mapping: MappingConfig, dialect: Dialect, query: Query, data: Data): Promise<number> {
		const result = await this._execute(mapping, query, data)
		return result.rowsAffected
	}

	public async bulkUpdate (mapping: MappingConfig, dialect: Dialect, query: Query, array: any[]): Promise<number> {
		throw new MethodNotImplemented('OracleConnection', 'updateMany')
	}

	public async delete (mapping: MappingConfig, dialect: Dialect, query: Query, data: Data): Promise<number> {
		const result = await this._execute(mapping, query, data)
		return result.rowsAffected
	}

	public async bulkDelete (mapping: MappingConfig, dialect: Dialect, query: Query, array: any[]): Promise<number> {
		throw new MethodNotImplemented('OracleConnection', 'deleteMany')
	}

	public async execute (query: Query): Promise<any> {
		const sql = query.sentence
		const options = this.inTransaction ? { autoCommit: false } : { autoCommit: true }
		return await this.cnx.execute(sql, {}, options)
	}

	public async executeDDL (query: Query): Promise<any> {
		return await this.cnx.execute(query.sentence)
	}

	public async executeSentence (sentence: any): Promise<any> {
		return await this.cnx.execute(sentence)
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
		let sql = query.sentence as string
		const params = this.dataToParameters(query, mapping, data)
		if (params) {
			for (let i = 0; i < params.length; i++) {
				const param = params[i]
				if (param.type === 'array') {
					if (param.value.length > 0) {
						const type = typeof param.value[0]
						switch (type) {
						case 'string':
							// eslint-disable-next-line no-case-declarations
							const values: string[] = []
							for (const j in param.value) {
								let value = param.value[j]
								value = Helper.escape(value)
								value = Helper.replace(value, '\\\'', '\\\'\'')
								values.push(`'${value}'`)
							}
							Helper.replace(sql, `:${param.name}`, param.value.join(','))
							break
						default:
							sql = Helper.replace(sql, `:${param.name}`, param.value.join(','))
						}
					} else {
						sql = Helper.replace(sql, `:${param.name}`, '')
					}
				} else {
					values[param.name] = param.value
				}
			}
		}
		const options = this.inTransaction ? { autoCommit: false } : { autoCommit: true }
		return await this.cnx.execute(sql, values, options)
	}
}
