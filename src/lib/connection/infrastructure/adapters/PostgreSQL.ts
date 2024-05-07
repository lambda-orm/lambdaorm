import { ConnectionPoolAdapter } from './base/connectionPool'
import { ConnectionAdapter } from './base/connection'
import { ConnectionConfig } from '../../domain'
import { OrmH3lp } from '../../../shared/infrastructure'
import { Parameter } from '3xpr'
import { Type, Primitive } from 'typ3s'
import { Connection } from '../../application'
import { MappingConfigService, Data, LogLevel } from 'lambdaorm-base'
import { DialectService } from '../../../language/application'
import { Query } from '../../../query/domain'

// https://node-postgres.com/features/connecting

export class PostgreSQLConnectionPoolAdapter extends ConnectionPoolAdapter {
	private static lib: any
	constructor (config: ConnectionConfig, helper:OrmH3lp) {
		super(config, helper)
		if (!PostgreSQLConnectionPoolAdapter.lib) {
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
			PostgreSQLConnectionPoolAdapter.lib = pg
		}
	}

	public async init (): Promise<void> {
		await this.helper.logger.log('PostgreSQL init pool not Implemented')
	}

	protected async create (id:string): Promise<Connection> {
		const cnx = new PostgreSQLConnectionPoolAdapter.lib.Client(this.config.connection)
		cnx.connect()
		return new PostgreSQLConnectionAdapter(id, cnx, this, this.helper)
	}
}
export class PostgreSQLConnectionAdapter extends ConnectionAdapter {
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

	public async select (mapping: MappingConfigService, dialect: DialectService, query: Query, data: Data): Promise<any> {
		const result = await this._execute(mapping, dialect, query, data)
		return result.rows
	}

	public async insert (mapping: MappingConfigService, dialect: DialectService, query: Query, data: Data): Promise<any> {
		try {
			const result = await this._execute(mapping, dialect, query, data)
			return result.rows.length > 0 ? result.rows[0].id : null
		} catch (error) {
			await this.helper.logger.log(error, LogLevel.ERROR)
			throw error
		}
	}

	public async bulkInsert (mapping: MappingConfigService, dialect: DialectService, query: Query, array: any[]): Promise<any[]> {
		const fieldIds = mapping.getFieldIds(query.entity)
		const fieldId = fieldIds && fieldIds.length === 1 ? fieldIds[0] : null
		const sql = query.sentence
		let _query = ''
		try {
			const rows = this.arrayToRows(mapping, dialect, query, array)
			const returning = fieldId ? 'RETURNING ' + fieldId.mapping + ' AS "' + fieldId.name + '"' : ''
			_query = `${sql} ${rows.join(',')} ${returning};`
			const result = await this.cnx.query(_query)
			const ids: any[] = []
			if (fieldId) {
				for (const p in result.rows) {
					const id = result.rows[p][fieldId.name]
					ids.push(id)
				}
			}
			return ids
		} catch (error) {
			await this.helper.logger.log(_query, LogLevel.ERROR)
			throw error
		}
	}

	protected override arrayToRows (mapping: MappingConfigService, dialect: DialectService, query: Query, array: any[]): any[] {
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

	private getItemValue (mapping: MappingConfigService, dialect: DialectService, item:any, parameter:Parameter):any {
		let value = item[parameter.name]
		if (value == null || value === undefined) {
			value = 'null'
		} else {
			switch (parameter.type) {
			case Primitive.boolean:
				value = value ? 'true' : 'false'; break
			case Primitive.string:
				if (value.includes('\'')) {
					// value = helper.escape(value)
					value = `'${this.helper.str.replace(value, '\'', '\'\'')}'`
				} else {
				// value = helper.escape(value)
					value = `'${value}'`
				}
				break
			case Primitive.dateTime:
				value = this.helper.query.escape(this.writeDateTime(value, mapping, dialect))
				break
			case Primitive.date:
				value = this.helper.query.escape(this.writeDate(value, mapping, dialect))
				break
			case Primitive.time:
				value = this.helper.query.escape(this.writeTime(value, mapping, dialect))
				break
			}
		}
		return value
	}

	public async update (mapping: MappingConfigService, dialect: DialectService, query: Query, data: Data): Promise<number> {
		const result = await this._execute(mapping, dialect, query, data)
		return result.rowCount
	}

	public async delete (mapping: MappingConfigService, dialect: DialectService, query: Query, data: Data): Promise<number> {
		const result = await this._execute(mapping, dialect, query, data)
		return result.rowCount
	}

	public async execute (query: Query): Promise<any> {
		return this.cnx.query(query.sentence)
	}

	public async executeDDL (query: Query): Promise<any> {
		return this.cnx.query(query.sentence)
	}

	public async executeSentence (sentence: any): Promise<any> {
		return this.cnx.query(sentence)
	}

	public async beginTransaction (): Promise<void> {
		await this.cnx.query('BEGIN')
		this.inTransaction = true
	}

	public async commit (): Promise<void> {
		await this.cnx.query('COMMIT')
		this.inTransaction = false
	}

	public async rollback (): Promise<void> {
		await this.cnx.query('ROLLBACK')
		this.inTransaction = false
	}

	protected async _execute (mapping: MappingConfigService, dialect:DialectService, query: Query, data: Data): Promise<any> {
		const values: any[] = []
		let sql = query.sentence
		const params = this.dataToParameters(mapping, dialect, query, data)

		for (let i = 0; i < params.length; i++) {
			const param = params[i]
			if (Type.isList(param.type as string) || (param.type === Primitive.any && Array.isArray(param.value))) {
				// https://stackoverflow.com/questions/10720420/node-postgres-how-to-execute-where-col-in-dynamic-value-list-query
				// https://www.it-swarm-es.com/es/node.js/node-postgres-como-ejecutar-la-consulta-where-col-lista-de-valores-dinamicos/1066948040/
				// https://www.postgresql.org/docs/9.2/functions-array.html
				// https://newbedev.com/node-postgres-how-to-execute-where-col-in-dynamic-value-list-query
				if (param.value.length === 0) {
					values.push([])
					continue
				}
				if (param.value.length === 1) {
					values.push(param.value[0])
					continue
				}
				const type = typeof param.value[0]
				switch (type) {
				case Primitive.string:
					sql = this.helper.str.replace(sql, '($' + (i + 1) + ')', '(SELECT(UNNEST($' + (i + 1) + '::VARCHAR[])))')
					values.push(param.value)
					break
				case 'bigint':
				case Primitive.number:
					sql = this.helper.str.replace(sql, '($' + (i + 1) + ')', '(SELECT(UNNEST($' + (i + 1) + '::INTEGER[])))')
					values.push(param.value)
					break
				default:
					values.push(param.value)
				}
			} else {
				values.push(param.value)
			}
		}
		try {
			let result = null
			if (values && values.length > 0) {
				result = await this.cnx.query(sql, values)
			} else {
				result = await this.cnx.query(sql)
			}
			return result
		} catch (error) {
			await this.helper.logger.log(error, LogLevel.ERROR)
			throw error
		}
	}
}
