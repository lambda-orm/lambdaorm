import { Schema } from '../../domain'
import { SchemaService } from '../services/schemaService'

export class CreateSchema {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly schemaService:SchemaService) {}

	public async create ():Promise<Schema> {
		return this.schemaService.newSchema()
	}
}
