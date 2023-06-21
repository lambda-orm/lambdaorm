import { Schema } from '../../domain'
import { IFileSchemaReader } from '../ports/fileSchemaReader'

export class GetSchema {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly fileReader:IFileSchemaReader) {}

	public async get (source?: string | Schema):Promise<Schema|null> {
		if (source && typeof source === 'string') {
			return await this.fileReader.read(source)
		} else if (source) {
			return source as Schema
		}
		return null
	}
}
