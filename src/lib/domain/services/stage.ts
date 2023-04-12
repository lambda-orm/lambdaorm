import { QueryOptions, Query, ExecuteResult, SchemaConfig } from '../../domain'

export interface IStageActionDDL {
	sentence (): Promise<any[]>
	queries (): Promise<Query[]>
	execute (): Promise<ExecuteResult[]>
}

export interface IStageDelete {
	execute (): Promise<void>
}

export interface IStageExport {
	execute (): Promise<SchemaConfig>
	sentence (): Promise<any[]>
	queries (): Query[]
}

export interface IStageImport {
	execute (data: SchemaConfig): Promise<void>
	sentence (): Promise<any[]>
	queries (): Query[]
}

export interface IStageService {

	exists (name:string): Promise<boolean>
	sync (options?:QueryOptions):IStageActionDDL
	clean (options?:QueryOptions):IStageActionDDL
	truncate (options?:QueryOptions):IStageActionDDL
	delete (options?:QueryOptions):IStageDelete
	export (options?:QueryOptions):IStageExport
	import (options?:QueryOptions):IStageImport
}
