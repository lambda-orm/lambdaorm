export interface Database
{
	name: string
	dialect: string
	connection:any
	schema:string
}
export interface Config
{
	paths: any
	databases?:Database[]
}
