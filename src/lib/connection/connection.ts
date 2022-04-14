
import { Parameter, Query, Data } from '../model'
import { ConnectionConfig } from './connectionConfig'
import { MappingConfig, Helper } from '../manager'

export abstract class Connection {
	public cnx:any
	public pool:any
	public inTransaction:boolean

	protected formatDateTime?:string
	protected formatDate?:string
	protected formatTime?:string

	constructor (cnx:any, pool:any) {
		this.cnx = cnx
		this.pool = pool
		this.inTransaction = false
		this.formatDateTime = 'yyyy-LL-dd HH:mm:ss'
		this.formatDate = 'yyyy-LL-dd'
		this.formatTime = 'HH:mm:ss'
	}

	public get config ():ConnectionConfig {
		return this.pool.config
	}

	protected arrayToRows (query:Query, mapping:MappingConfig, array:any[]):any[] {
		const rows:any[] = []
		for (let i = 0; i < array.length; i++) {
			const item = array[i]
			const row:any[] = []
			for (let j = 0; j < query.parameters.length; j++) {
				const parameter = query.parameters[j]
				let value = item[parameter.name]
				if (value) {
					switch (parameter.type) {
					case 'datetime':
						value = this.writeDateTime(value, mapping)
						break
					case 'date':
						value = this.writeDate(value, mapping)
						break
					case 'time':
						value = this.writeTime(value, mapping)
						break
					}
				}
				row.push(value === undefined ? null : value)
			}
			rows.push(row)
		}
		return rows
	}

	protected dataToParameters (query:Query, mapping:MappingConfig, data:Data):Parameter[] {
		const parameters:Parameter[] = []
		for (const p in query.parameters) {
			const parameter = query.parameters[p]
			let value = data.get(parameter.name)
			if (value) {
				switch (parameter.type) {
				case 'datetime':
					value = this.writeDateTime(value, mapping)
					break
				case 'date':
					value = this.writeDate(value, mapping)
					break
				case 'time':
					value = this.writeTime(value, mapping)
					break
				}
				// if (parameter.type === 'datetime') { value = dialect.solveDateTime(value) } else if (parameter.type === 'date') { value = dialect.solveDate(value) } else if (parameter.type == 'time') { value = dialect.solveTime(value) }
			} else {
				value = null
			}
			parameters.push({ name: parameter.name, type: parameter.type, value: value })
		}
		return parameters
	}

	protected writeDateTime (value:any, mapping:MappingConfig):any {
		const format = mapping.format?.datetime || this.formatDateTime
		return format ? Helper.dateFormat(value, format) : value
	}

	public writeDate (value:any, mapping:MappingConfig):any {
		const format = mapping.format?.datetime || this.formatDate
		return format ? Helper.dateFormat(value, format) : value
	}

	public writeTime (value:any, mapping:MappingConfig):any {
		const format = mapping.format?.datetime || this.formatTime
		return format ? Helper.dateFormat(value, format) : value
	}

	public abstract select(mapping:MappingConfig, query:Query, data:Data):Promise<any>
	public abstract insertOne(mapping:MappingConfig, query:Query, data:Data):Promise<any>
	public abstract insertMany(mapping:MappingConfig, query: Query, array: any[]): Promise<any[]>
	public abstract update(mapping:MappingConfig, query:Query, data:Data):Promise<number>
	public abstract updateOne(mapping:MappingConfig, query:Query, data:Data):Promise<number>
	public abstract updateMany(mapping:MappingConfig, query:Query, array: any[]):Promise<number>
	public abstract delete(mapping:MappingConfig, query: Query, data:Data): Promise<number>
	public abstract deleteOne(mapping:MappingConfig, query: Query, data:Data): Promise<number>
	public abstract deleteMany(mapping:MappingConfig, query: Query, array: any[]): Promise<number>
	public abstract execute(query: Query): Promise<any>
	public abstract executeDDL(query:Query):Promise<any>
	public abstract executeSentence(sentence:any):Promise<any>
	public abstract beginTransaction():Promise<void>
	public abstract commit():Promise<void>
	public abstract rollback():Promise<void>
}
