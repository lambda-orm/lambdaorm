import { Schema } from './schema'
export interface Database
{
	name: string
	dialect: string
	connection:any
	schema:string
}
export interface Paths
{
	src: string
	data: string
	workspace: string,
	configFile?: string
}
export interface Config
{
	paths: Paths
	databases: Database[]
	schemas:Schema[]
}
// export interface ConfigInfo
// {
// workspace: string
// configFile?: string
// config:Config
// }
