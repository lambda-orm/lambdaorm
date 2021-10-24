import { SchemaActionDDL } from './schemaActionDDL'
import { Query } from './../model'

export class SchemaDrop extends SchemaActionDDL {
	public queries (dialect:string):Query[] {
		return this.orm.language.drop(dialect, this.schema)
	}
}
