
import { Connection, ConnectionPool } from '..'
import { NotImplemented, Parameter, Query } from '../../model'
import { Helper } from '../../manager/helper'
import { MappingConfig } from '../../manager'

// https://oracle.github.io/node-oracledb/doc/api.html#getstarted
// https://github.com/oracle/node-oracledb/tree/main/examples

export class OracleConnectionPool extends ConnectionPool {
	private static oracledb: any
	private pool:any= undefined

	public async init (): Promise<void> {
		if (!OracleConnectionPool.oracledb) {
			OracleConnectionPool.oracledb = require('oracledb')
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
				OracleConnectionPool.oracledb.initOracleClient({ libDir: libPath })
			}
		}
	}

	private async createPool ():Promise<any> {
		if (!OracleConnectionPool.oracledb) {
			await this.init()
		}
		return await OracleConnectionPool.oracledb.createPool(this.config.connection)
	}

	public async acquire (): Promise<Connection> {
		if (!this.pool) {
			this.pool = await this.createPool()
		}
		const cnx = await this.pool.getConnection()
		return new OracleConnection(cnx, this)
	}

	public async release (connection:Connection):Promise<void> {
		await connection.cnx.close()
	}

	public async end (): Promise<void> {
		// console.info('postgres end pool not Implemented')
	}
}
export class OracleConnection extends Connection {
	public async select (mapping:MappingConfig, query:Query, params:Parameter[]):Promise<any> {
		const result = await this._execute(query, params)

		const list: any[] = []
		for (const i in result.rows) {
			const row = result.rows[i]
			const item:any = {}
			for (const j in result.metaData) {
				const col = result.metaData[j]
				item[col.name] = row[j]
			}
			list.push(item)
		}
		return list
	}

	public async insert (mapping:MappingConfig, query:Query, params:Parameter[]):Promise<any> {
		try {
			const result = await this._execute(query, params)
			return result.rows.length > 0 ? result.rows[0].id : null
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	public async bulkInsert (mapping: MappingConfig, query: Query, array: any[], params: Parameter[]): Promise<any[]> {
		// const autoincrement = mapping.getAutoincrement(query.entity)

		// https://stackoverflow.com/questions/46964852/node-oracledb-bulk-insert-using-associative-array
		// https://blogs.oracle.com/opal/post/node-oracledb-22-with-batch-statement-execution-and-more-is-out-on-npm
		throw new Error('Not Implemented')

		// Postgres example
		// const fieldIds = mapping.getFieldIds(query.entity)
		// const fieldId = fieldIds && fieldIds.length === 1 ? fieldIds[0] : null
		// // const fieldId: string | undefined = autoincrement && autoincrement.mapping ? autoincrement.mapping : undefined
		// const sql = query.sentence
		// let _query = ''
		// try {
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
		// value = value ? 'true' : 'false'; break
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
		// const returning = fieldId ? 'RETURNING ' + fieldId.mapping + ' AS "' + fieldId.name + '"' : ''
		// _query = `${sql} ${rows.join(',')} ${returning};`
		// const result = await this.cnx.query(_query)
		// const ids:any[] = []
		// if (fieldId) {
		// for (const p in result.rows) {
		// const id = result.rows[p][fieldId.name]
		// ids.push(id)
		// }
		// }
		// return ids
		// } catch (error) {
		// console.log(_query)
		// console.error(error)
		// throw error
		// }
	}

	public async update (mapping:MappingConfig, query:Query, params:Parameter[]):Promise<number> {
		const result = await this._execute(query, params)
		return result.rowCount
	}

	public async delete (mapping:MappingConfig, query:Query, params:Parameter[]):Promise<number> {
		const result = await this._execute(query, params)
		return result.rowCount
	}

	public async execute (query:Query):Promise<any> {
		return await this._execute(query)
	}

	public async executeDDL (query:Query):Promise<any> {
		return await this.cnx.execute(query.sentence)
	}

	public async executeSentence (sentence: any):Promise<any> {
		return await this.cnx.execute(sentence)
	}

	public async beginTransaction ():Promise<void> {
		this.inTransaction = true
	}

	public async commit ():Promise<void> {
		await this.cnx.commit()
		this.inTransaction = false
	}

	public async rollback ():Promise<void> {
		await this.cnx.rollback()
		this.inTransaction = false
	}

	protected async _execute (query:Query, params:Parameter[] = []):Promise<any> {
		const values: any = {}
		let sql = query.sentence
		if (params) {
			for (let i = 0; i < params.length; i++) {
				const param = params[i]
				if (param.type === 'array') {
					if (param.value.length > 0) {
						const type = typeof param.value[0]
						switch (type) {
						case 'string':
							// eslint-disable-next-line no-case-declarations
							const values:string[] = []
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
		try {
			const options = this.inTransaction ? { autoCommit: false } : { autoCommit: true }
			return await this.cnx.execute(sql, values, options)
		} catch (error) {
			console.error(error)
			throw error
		}
	}
}
