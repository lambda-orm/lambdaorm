export interface Database
{
	name: string
	dialect: string
	disable?:boolean
	connectionSource?:'env'|'direct'
	connection:any
	schema:string
}
export interface Config
{
	paths: any
	databases?:Database[]
}
