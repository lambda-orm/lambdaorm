import {Delta } from './../model'
import {SchemaHelper}  from '../schema/schemaHelper'

export interface ISchemaBuilder
{
    // create(dialect:string,schema:SchemaHelper):string;
    sync(delta:Delta,dialect:string,schema:SchemaHelper):string;
    drop(dialect:string,schema:SchemaHelper):string;
    truncate(dialect:string,schema:SchemaHelper):string;
} 