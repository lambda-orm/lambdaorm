import { Post, Get, Delete, Path, SuccessResponse, Body, Route } from 'tsoa'
import { Schema } from './../../orm/model/schema'
import { orm } from './../../orm/orm'

@Route('schema')
export default class SchemaController {
	@Post('/')
	@SuccessResponse('201', 'Created')
	public async load (@Body() schema: Schema): Promise<void> {
		orm.schema.load(schema)
	}

	@Get('/')
	public async list (): Promise<Schema[]> {
		return orm.schema.list()
	}

	@Get('/{name}')
	public async get (@Path() name:string): Promise<Schema> {
		return orm.schema.get(name) as Schema
	}

	@Delete('/{name}')
	public async delete (@Path() name:string): Promise<void> {
		orm.schema.delete(name)
	}
}
