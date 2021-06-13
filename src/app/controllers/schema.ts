import { Post,Get,Delete,Path,SuccessResponse,Body,Response,Route } from "tsoa";
import {Schema}  from './../../model/schema'
import orm  from './../../orm'
  
@Route("schema")
export default class SchemaController {
    @Post("/")
    @SuccessResponse("201", "Created")
    public async apply(@Body() schema: Schema): Promise<void> {
        orm.applySchema(schema);
    }
    @Get("/")
    public async list(): Promise<Schema[]> {
        return orm.listSchema();
    }
    @Get("/{name}")
    public async get(@Path() name:string): Promise<Schema> {
        return orm.getSchema(name) as Schema;
    }
    @Delete("/{name}")
    public async delete(@Path() name:string): Promise<void> {
        orm.deleteSchema(name);
    }
}