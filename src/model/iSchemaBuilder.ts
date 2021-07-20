import {SchemaHelper}  from '../manager/schemaHelper'
import {Delta } from './delta'

export interface ISchemaBuilder
{
    create(delta:Delta,dialect:string,schema:SchemaHelper):string;
}