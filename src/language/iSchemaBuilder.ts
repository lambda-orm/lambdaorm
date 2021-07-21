import {Delta } from './../model'
import {SchemaHelper}  from '../schema/schemaHelper'

export interface ISchemaBuilder
{
    create(delta:Delta,dialect:string,schema:SchemaHelper):string;
}