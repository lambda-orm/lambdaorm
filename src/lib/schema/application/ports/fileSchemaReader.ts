import { Schema } from '../../domain'

export interface IFileSchemaReader {
	read (source: string): Promise<Schema|null>
}
