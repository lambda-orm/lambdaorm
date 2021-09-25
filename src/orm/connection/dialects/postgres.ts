/* eslint-disable linebreak-style */
import { Connection, ConnectionConfig, ConnectionPool } from './..'
import { Parameter } from '../../model'
import { Helper } from './../../helper'

// https://node-postgres.com/features/connecting

export class PostgresConnectionPool extends ConnectionPool {
	private static pg:any
	constructor (config:ConnectionConfig) {
		super(config)
		if (!PostgresConnectionPool.pg) {
			const pg = require('pg')
			// Solve error number as string in queries
			// https://stackoverflow.com/questions/39168501/pg-promise-returns-integers-as-strings
			// https://www.npmjs.com/package/pg-types
			pg.types.setTypeParser(pg.types.builtins.INT2, (value: string) => {
				return parseInt(value)
			})
			pg.types.setTypeParser(pg.types.builtins.INT4, (value: string) => {
				return parseInt(value)
			})
			pg.types.setTypeParser(pg.types.builtins.INT8, (value: string) => {
				return parseInt(value)
			})
			pg.types.setTypeParser(pg.types.builtins.FLOAT4, (value: string) => {
				return parseFloat(value)
			})
			pg.types.setTypeParser(pg.types.builtins.FLOAT8, (value: string) => {
				return parseFloat(value)
			})
			pg.types.setTypeParser(pg.types.builtins.NUMERIC, (value: string) => {
				return parseFloat(value)
			})
			pg.types.setTypeParser(pg.types.builtins.MONEY, (value: string) => {
				return parseFloat(value)
			})
			PostgresConnectionPool.pg = pg
		}
	}

	public async acquire ():Promise<Connection> {
		const cnx = new PostgresConnectionPool.pg.Client(this.config.connection)
		cnx.connect()
		return new PostgresConnection(cnx, this)
	}

	public async release (connection:Connection):Promise<void> {
		await connection.cnx.end()
	}

	public async end (): Promise<void> {
		console.log('postgres end pool not Implemented')
	}
}
export class PostgresConnection extends Connection {
	public async select (sql:string, params:Parameter[]):Promise<any> {
		const result = await this._execute(sql, params)
		return result.rows
	}

	public async insert (sql:string, params:Parameter[]):Promise<number> {
		// Example
		// create table my_table(my_id serial,name text);
		// insert into my_table(name) values('pepe') returning my_id as id
		try {
			const result = await this._execute(sql, params)
			return result.rows.length > 0 ? result.rows[0].id : null
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	public async bulkInsert (sql:string, array:any[], parameters:Parameter[], fieldId?:string):Promise<number[]> {
		try {
			const rows:string[] = []
			for (const p in array) {
				const values = array[p]
				const row:any[] = []
				for (let i = 0; i < parameters.length; i++) {
					const parameter = parameters[i]
					let value = values[i]
					if (value == null || value === undefined) {
						value = 'null'
					} else {
						switch (parameter.type) {
						case 'boolean':
							value = value ? 'true' : 'false'; break
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
			const returning = fieldId ? 'RETURNING ' + fieldId + ' AS "' + fieldId + '"' : ''
			const query = `${sql} ${rows.join(',')} ${returning};`
			const result = await this.cnx.query(query)
			const ids:number[] = []
			if (fieldId) {
				// let fieldIdlower = fieldId.toLowerCase();
				for (const p in result.rows) {
					const id = result.rows[p][fieldId] as number
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
		return result.rowCount
	}

	public async delete (sql:string, params:Parameter[]):Promise<number> {
		const result = await this._execute(sql, params)
		return result.rowCount
	}

	public async execute (sql:string):Promise<any> {
		return await this._execute(sql)
	}

	public async beginTransaction ():Promise<void> {
		await this.cnx.query('BEGIN')
		this.inTransaction = true
	}

	public async commit ():Promise<void> {
		await this.cnx.query('COMMIT')
		this.inTransaction = false
	}

	public async rollback ():Promise<void> {
		await this.cnx.query('ROLLBACK')
		this.inTransaction = false
	}

	protected async _execute (sql:string, params:Parameter[] = []):Promise<any> {
		const values:any[] = []
		for (let i = 0; i < params.length; i++) {
			const param = params[i]
			if (param.type === 'array') {
				// https://stackoverflow.com/questions/10720420/node-postgres-how-to-execute-where-col-in-dynamic-value-list-query
				// https://www.it-swarm-es.com/es/node.js/node-postgres-como-ejecutar-la-consulta-where-col-lista-de-valores-dinamicos/1066948040/
				// https://www.postgresql.org/docs/9.2/functions-array.html
				// https://newbedev.com/node-postgres-how-to-execute-where-col-in-dynamic-value-list-query
				if (param.value.length > 0) {
					const type = typeof param.value[0]
					switch (type) {
					case 'string':
						values.push(param.value.join(','))
						break
					case 'bigint':
					case 'number':
						if (param.value.length === 1) {
							values.push(param.value[0])
						} else {
							sql = Helper.replace(sql, '($' + (i + 1) + ')', '(SELECT(UNNEST($' + (i + 1) + '::INTEGER[])))')
							values.push(param.value)
						}
						break
					default:
						values.push(param.value)
					}
				} else {
					values.push([])
				}
			} else {
				values.push(param.value)
			}
		}
		try {
			return await this.cnx.query(sql, values)
		} catch (error) {
			console.error(error)
			throw error
		}
	}
}
