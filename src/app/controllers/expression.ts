import { Post,Get,Delete,Path,SuccessResponse,Body,Response,Route } from "tsoa";
import orm  from './../../orm'
import CompileRequest from  '../model/compileRequest'
import RunRequest from  '../model/runRequest'
  
@Route("expression")
export default class ExpressionController {
    @Post("/compile")
    @SuccessResponse("200", "Ok")
    public async compile(@Body() body: CompileRequest): Promise<any> {
        return  (await orm.expression(body.expression).compile(body.dialect,body.schema)).serialize()
    }
    @Post("/query")
    @SuccessResponse("200", "Ok")
    public async query(@Body() body: CompileRequest): Promise<any> {
        return  (await orm.expression(body.expression).compile(body.dialect,body.schema)).query()
    }
    @Post("/schema")
    @SuccessResponse("200", "Ok")
    public async schema(@Body() body: CompileRequest): Promise<any> {
        return  (await orm.expression(body.expression).compile(body.dialect,body.schema)).schema()
    }
    @Post("/run") 
    @SuccessResponse("200", "Ok")
    public async run(@Body() body: RunRequest): Promise<any> {
        return await orm.expression(body.expression).run(body.context,body.connection)
    }
} 