import { ObservableAction } from './index'
export interface ContextInfo {
	entity: string
	action: ObservableAction,
	read: boolean,
	write: boolean
	dml: boolean
	ddl: boolean
}
