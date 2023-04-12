/* eslint-disable @typescript-eslint/no-unused-vars */

import { Query, Data, MethodNotImplemented, ConnectionConfig, ConnectionPort, IMappingConfigService, IDialectService } from '../../domain'
import { Parameter } from '3xpr'
import { Kind } from 'json-light'
import { helper } from '../../helper'

export abstract class ConnectionAdapter implements ConnectionPort {
	public cnx: any
	public pool: any
	public inTransaction: boolean

	public maxChunkSizeOnSelect: number
	public maxChunkSizeIdsOnSelect: number
	public maxChunkSizeOnBulkInsert: number

	constructor (cnx: any, pool: any) {
		this.cnx = cnx
		this.pool = pool
		this.inTransaction = false
		this.maxChunkSizeOnSelect = 10000
		this.maxChunkSizeIdsOnSelect = 7000
		this.maxChunkSizeOnBulkInsert = 100000
	}

	public get config (): ConnectionConfig {
		return this.pool.config
	}

	protected arrayToRows (mapping: IMappingConfigService, dialect: IDialectService, query: Query, array: any[]): any[] {
		const rows: any[] = []
		for (const item of array) {
			const row: any[] = []
			for (const parameter of query.parameters) {
				let value = item[parameter.name]
				if (value) {
					switch (parameter.type) {
					case Kind.dateTime:
						value = this.writeDateTime(value, mapping, dialect)
						break
					case Kind.date:
						value = this.writeDate(value, mapping, dialect)
						break
					case Kind.time:
						value = this.writeTime(value, mapping, dialect)
						break
					case Kind.any:
						if (helper.val.isDateTime(value) || helper.val.isDateTimeFormat(value)) {
							value = this.writeDateTime(value, mapping, dialect)
							break
						} else if (helper.val.isDate(value) || helper.val.isDateFormat(value)) {
							value = this.writeDate(value, mapping, dialect)
							break
						} else if (helper.val.isTime(value) || helper.val.isTimeFormat(value)) {
							value = this.writeTime(value, mapping, dialect)
							break
						}
					}
				}
				row.push(value === undefined ? null : value)
			}
			rows.push(row)
		}
		return rows
	}

	protected dataToParameters (mapping: IMappingConfigService, dialect: IDialectService, query: Query, data: Data): Parameter[] {
		const parameters: Parameter[] = []
		for (const parameter of query.parameters) {
			let value = data.get(parameter.name)
			if (value) {
				switch (parameter.type) {
				case Kind.dateTime:
					value = this.writeDateTime(value, mapping, dialect)
					break
				case Kind.date:
					value = this.writeDate(value, mapping, dialect)
					break
				case Kind.time:
					value = this.writeTime(value, mapping, dialect)
					break
				case Kind.any:
					if (helper.val.isDateTime(value) || helper.val.isDateTimeFormat(value)) {
						value = this.writeDateTime(value, mapping, dialect)
						break
					} else if (helper.val.isDate(value) || helper.val.isDateFormat(value)) {
						value = this.writeDate(value, mapping, dialect)
						break
					} else if (helper.val.isTime(value) || helper.val.isTimeFormat(value)) {
						value = this.writeTime(value, mapping, dialect)
						break
					}
				}
			} else {
				value = null
			}
			parameters.push({ name: helper.query.transformParameter(parameter.name), type: parameter.type, value })
		}
		return parameters
	}

	protected writeDateTime (value: any, mapping: IMappingConfigService, dialect: IDialectService): any {
		const format = mapping.format?.dateTime || dialect.format.dateTime
		return format ? helper.query.dateFormat(value, format) : value
	}

	public writeDate (value: any, mapping: IMappingConfigService, dialect: IDialectService): any {
		const format = mapping.format?.date || dialect.format.date
		return format ? helper.query.dateFormat(value, format) : value
	}

	public writeTime (value: any, mapping: IMappingConfigService, dialect: IDialectService): any {
		const format = mapping.format?.time || dialect.format.time
		return format ? helper.query.dateFormat(value, format) : value
	}

	public abstract select(mapping: IMappingConfigService, dialect: IDialectService, query: Query, data: Data): Promise<any>
	public abstract insert(mapping: IMappingConfigService, dialect: IDialectService, query: Query, data: Data): Promise<any>
	public abstract bulkInsert(mapping: IMappingConfigService, dialect: IDialectService, query: Query, array: any[]): Promise<any[]>
	public abstract update(mapping: IMappingConfigService, dialect: IDialectService, query: Query, data: Data): Promise<number>
	public abstract delete(mapping: IMappingConfigService, dialect: IDialectService, query: Query, data: Data): Promise<number>
	public abstract execute(query: Query): Promise<any>
	public abstract executeDDL(query: Query): Promise<any>
	public abstract executeSentence(sentence: any): Promise<any>
	public abstract beginTransaction(): Promise<void>
	public abstract commit(): Promise<void>
	public abstract rollback(): Promise<void>

	public async bulkDelete (_mapping: IMappingConfigService, _dialect: IDialectService, _query: Query, _array: any[]): Promise<number> {
		throw new MethodNotImplemented('Connection', 'deleteMany')
	}

	public async bulkUpdate (_mapping: IMappingConfigService, _dialect: IDialectService, _query: Query, _array: any[]): Promise<number> {
		throw new MethodNotImplemented('Connection', 'updateMany')
	}

	public async truncateEntity (_mapping: IMappingConfigService, query: Query): Promise<any> {
		return this.executeDDL(query)
	}

	public async createEntity (_mapping: IMappingConfigService, query: Query): Promise<any> {
		return this.executeDDL(query)
	}

	public async createSequence (_mapping: IMappingConfigService, query: Query): Promise<any> {
		return this.executeDDL(query)
	}

	public async createFk (_mapping: IMappingConfigService, query: Query): Promise<any> {
		return this.executeDDL(query)
	}

	public async createIndex (_mapping: IMappingConfigService, query: Query): Promise<any> {
		return this.executeDDL(query)
	}

	public async alterProperty (_mapping: IMappingConfigService, query: Query): Promise<any> {
		return this.executeDDL(query)
	}

	public async addProperty (_mapping: IMappingConfigService, query: Query): Promise<any> {
		return this.executeDDL(query)
	}

	public async addPk (_mapping: IMappingConfigService, query: Query): Promise<any> {
		return this.executeDDL(query)
	}

	public async addUk (_mapping: IMappingConfigService, query: Query): Promise<any> {
		return this.executeDDL(query)
	}

	public async addFk (_mapping: IMappingConfigService, query: Query): Promise<any> {
		return this.executeDDL(query)
	}

	public async dropSequence (_mapping: IMappingConfigService, query: Query): Promise<any> {
		return this.executeDDL(query)
	}

	public async dropEntity (_mapping: IMappingConfigService, query: Query): Promise<any> {
		return this.executeDDL(query)
	}

	public async dropProperty (_mapping: IMappingConfigService, query: Query): Promise<any> {
		return this.executeDDL(query)
	}

	public async dropPk (_mapping: IMappingConfigService, query: Query): Promise<any> {
		return this.executeDDL(query)
	}

	public async dropUk (_mapping: IMappingConfigService, query: Query): Promise<any> {
		return this.executeDDL(query)
	}

	public async dropFk (_mapping: IMappingConfigService, query: Query): Promise<any> {
		return this.executeDDL(query)
	}

	public async dropIndex (_mapping: IMappingConfigService, query: Query): Promise<any> {
		return this.executeDDL(query)
	}
}
