import { Delta, Query } from './../model'
import { SchemaHelper } from '../schema/schemaHelper'
import { DialectMetadata } from './dialectMetadata'

export interface ISchemaBuilder
{
	sync(delta:Delta, metadata:DialectMetadata, schema:SchemaHelper):Query[]
	drop(metadata:DialectMetadata, schema:SchemaHelper):Query[]
	truncate(metadata:DialectMetadata, schema:SchemaHelper):Query[]
}
