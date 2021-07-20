import {Delta } from './delta'
import {SchemaHelper}  from '../schema/schemaHelper'

export interface ISchemaBuilder
{
    create(delta:Delta,dialect:string,schema:SchemaHelper):string;
}