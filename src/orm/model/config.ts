import { Schema } from './schema'
export interface Database
{
	name: string
	dialect: string
	connection:any
	schema:string
}
export interface Config
{
	src: string
	data: string
	databases?: Database[]
	schemas?:Schema[]
}
