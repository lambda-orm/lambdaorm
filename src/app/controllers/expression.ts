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
    @Post("/sql")
    @SuccessResponse("200", "Ok")
    public async sql(@Body() body: CompileRequest): Promise<any> {
        return  (await orm.expression(body.expression).compile(body.dialect,body.schema)).sql()
    }
    @Post("/model")
    @SuccessResponse("200", "Ok")
    public async model(@Body() body: CompileRequest): Promise<any> {
        return  (await orm.expression(body.expression).compile(body.dialect,body.schema)).model()
    }
    @Post("/run") 
    @SuccessResponse("200", "Ok")
    public async run(@Body() body: RunRequest): Promise<any> {
        return await orm.expression(body.expression).execute(body.context,body.connection)
    }
} 