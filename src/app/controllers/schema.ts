import { Post,SuccessResponse,Body,Response,Route } from "tsoa";
import {Schema}  from './../../model/schema'
import orm  from './../../orm'
  
@Route("schema")
export default class SchemaController {
    @Post("/")
    @SuccessResponse("201", "Created")
    public async post(@Body() schema: Schema): Promise<void> {
        orm.addScheme(schema)
    }
}