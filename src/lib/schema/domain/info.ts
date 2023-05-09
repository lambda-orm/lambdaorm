import { ObservableAction } from '.'
export interface ClauseInfo {
	entity: string
	action: ObservableAction
}
export interface ContextInfo {
	entity: string
	action: ObservableAction,
	read: boolean,
	write: boolean
	dml: boolean
	ddl: boolean
}
