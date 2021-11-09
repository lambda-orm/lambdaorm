import { Schema } from './schema'

export interface ExternalDb {
	entities: string[]
	name: string
}

export interface Database
{
	name: string
	dialect: string
	connection: any
	schema: string
}
export interface App
{
	src: string
	data: string
	models:string
	defaultDatabase?: string
}
export interface Config
{
	app: App
	databases: Database[]
	schemas:Schema[]
}
