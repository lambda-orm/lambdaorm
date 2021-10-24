/* eslint-disable @typescript-eslint/no-unused-vars */
import { Delta, Query } from './../../model'
import { ISchemaBuilder } from '../'
import { SchemaHelper } from '../../schema/schemaHelper'
import { DialectMetadata } from './../dialectMetadata'

export class NoSqlSchemaBuilder implements ISchemaBuilder {
	public sync (delta:Delta, metadata:DialectMetadata, schema:SchemaHelper):Query[] {
		throw new Error('Not Implemented')
	}

	public drop (metadata:DialectMetadata, schema:SchemaHelper):Query[] {
		throw new Error('Not Implemented')
	}

	public truncate (metadata:DialectMetadata, schema:SchemaHelper):Query[] {
		throw new Error('Not Implemented')
	}
}
