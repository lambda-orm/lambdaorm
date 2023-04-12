import { Query, Data, ConnectionConfig } from '../model'
import { IMappingConfigService, IDialectService } from '../services'
export interface ConnectionPort {
	cnx: any
	pool: any
	inTransaction: boolean
	maxChunkSizeOnSelect: number
	maxChunkSizeIdsOnSelect: number
	maxChunkSizeOnBulkInsert: number
	get config (): ConnectionConfig
	writeDate (value: any, mapping: IMappingConfigService, dialect: IDialectService): any
	writeTime (value: any, mapping: IMappingConfigService, dialect: IDialectService): any

	select(mapping: IMappingConfigService, dialect: IDialectService, query: Query, data: Data): Promise<any>
	insert(mapping: IMappingConfigService, dialect: IDialectService, query: Query, data: Data): Promise<any>
	bulkInsert(mapping: IMappingConfigService, dialect: IDialectService, query: Query, array: any[]): Promise<any[]>
	update(mapping: IMappingConfigService, dialect: IDialectService, query: Query, data: Data): Promise<number>
	delete(mapping: IMappingConfigService, dialect: IDialectService, query: Query, data: Data): Promise<number>
	execute(query: Query): Promise<any>
	executeDDL(query: Query): Promise<any>
	executeSentence(sentence: any): Promise<any>
	beginTransaction(): Promise<void>
	commit(): Promise<void>
	rollback(): Promise<void>

	bulkDelete (_mapping: IMappingConfigService, _dialect: IDialectService, _query: Query, _array: any[]): Promise<number>
	bulkUpdate (_mapping: IMappingConfigService, _dialect: IDialectService, _query: Query, _array: any[]): Promise<number>
	truncateEntity (_mapping: IMappingConfigService, query: Query): Promise<any>
	createEntity (_mapping: IMappingConfigService, query: Query): Promise<any>
	createSequence (_mapping: IMappingConfigService, query: Query): Promise<any>
	createFk (_mapping: IMappingConfigService, query: Query): Promise<any>
	createIndex (_mapping: IMappingConfigService, query: Query): Promise<any>
	alterProperty (_mapping: IMappingConfigService, query: Query): Promise<any>
	addProperty (_mapping: IMappingConfigService, query: Query): Promise<any>
	addPk (_mapping: IMappingConfigService, query: Query): Promise<any>
	addUk (_mapping: IMappingConfigService, query: Query): Promise<any>
	addFk (_mapping: IMappingConfigService, query: Query): Promise<any>
	dropSequence (_mapping: IMappingConfigService, query: Query): Promise<any>
	dropEntity (_mapping: IMappingConfigService, query: Query): Promise<any>
	dropProperty (_mapping: IMappingConfigService, query: Query): Promise<any>
	dropPk (_mapping: IMappingConfigService, query: Query): Promise<any>
	dropUk (_mapping: IMappingConfigService, query: Query): Promise<any>
	dropFk (_mapping: IMappingConfigService, query: Query): Promise<any>
	dropIndex (_mapping: IMappingConfigService, query: Query): Promise<any>
}

export interface ConnectionPoolPort {
	config:ConnectionConfig
	init():Promise<void>
	acquire():Promise<ConnectionPort>
	release(connection: ConnectionPort): Promise<void>
	end():Promise<void>
}
