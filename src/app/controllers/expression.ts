import { Post, SuccessResponse, Body, Route } from 'tsoa'
import { orm } from './../../orm/orm'
import CompileRequest from '../model/compileRequest'
import RunRequest from '../model/runRequest'

@Route('expression')
export default class ExpressionController {
	@Post('/compile')
	@SuccessResponse('200', 'Ok')
	public async compile (@Body() body: CompileRequest): Promise<any> {
		return await orm.expression(body.expression).serialize(body.schema)
	}

	@Post('/sentence')
	@SuccessResponse('200', 'Ok')
	public async sentence (@Body() body: CompileRequest): Promise<any> {
		return await orm.expression(body.expression).sentence(body.dialect, body.schema)
	}

	@Post('/model')
	@SuccessResponse('200', 'Ok')
	public async model (@Body() body: CompileRequest): Promise<any> {
		return await orm.expression(body.expression).model(body.schema)
	}

	@Post('/run')
	@SuccessResponse('200', 'Ok')
	public async run (@Body() body: RunRequest): Promise<any> {
		return await orm.expression(body.expression).execute(body.context, body.connection)
	}
}
