import { Query, Data, ConnectionConfig } from '../../../domain'
import { MappingConfigService, DialectService } from '../../'
export interface ConnectionPort {
	cnx: any
	pool: any
	inTransaction: boolean
	maxChunkSizeOnSelect: number
	maxChunkSizeIdsOnSelect: number
	maxChunkSizeOnBulkInsert: number
	get config (): ConnectionConfig
	writeDate (value: any, mapping: MappingConfigService, dialect: DialectService): any
	writeTime (value: any, mapping: MappingConfigService, dialect: DialectService): any

	select(mapping: MappingConfigService, dialect: DialectService, query: Query, data: Data): Promise<any>
	insert(mapping: MappingConfigService, dialect: DialectService, query: Query, data: Data): Promise<any>
	bulkInsert(mapping: MappingConfigService, dialect: DialectService, query: Query, array: any[]): Promise<any[]>
	update(mapping: MappingConfigService, dialect: DialectService, query: Query, data: Data): Promise<number>
	delete(mapping: MappingConfigService, dialect: DialectService, query: Query, data: Data): Promise<number>
	execute(query: Query): Promise<any>
	executeDDL(query: Query): Promise<any>
	executeSentence(sentence: any): Promise<any>
	beginTransaction(): Promise<void>
	commit(): Promise<void>
	rollback(): Promise<void>

	bulkDelete (_mapping: MappingConfigService, _dialect: DialectService, _query: Query, _array: any[]): Promise<number>
	bulkUpdate (_mapping: MappingConfigService, _dialect: DialectService, _query: Query, _array: any[]): Promise<number>
	truncateEntity (_mapping: MappingConfigService, query: Query): Promise<any>
	createEntity (_mapping: MappingConfigService, query: Query): Promise<any>
	createSequence (_mapping: MappingConfigService, query: Query): Promise<any>
	createFk (_mapping: MappingConfigService, query: Query): Promise<any>
	createIndex (_mapping: MappingConfigService, query: Query): Promise<any>
	alterProperty (_mapping: MappingConfigService, query: Query): Promise<any>
	addProperty (_mapping: MappingConfigService, query: Query): Promise<any>
	addPk (_mapping: MappingConfigService, query: Query): Promise<any>
	addUk (_mapping: MappingConfigService, query: Query): Promise<any>
	addFk (_mapping: MappingConfigService, query: Query): Promise<any>
	dropSequence (_mapping: MappingConfigService, query: Query): Promise<any>
	dropEntity (_mapping: MappingConfigService, query: Query): Promise<any>
	dropProperty (_mapping: MappingConfigService, query: Query): Promise<any>
	dropPk (_mapping: MappingConfigService, query: Query): Promise<any>
	dropUk (_mapping: MappingConfigService, query: Query): Promise<any>
	dropFk (_mapping: MappingConfigService, query: Query): Promise<any>
	dropIndex (_mapping: MappingConfigService, query: Query): Promise<any>
}
