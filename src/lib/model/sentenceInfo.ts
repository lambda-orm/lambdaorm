export interface SentenceInfo {
	entity: string
	name: string // [select|insert|update|delete|ddl]
	read?: boolean // select
	write?: boolean // != select
}
