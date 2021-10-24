import { SchemaActionDDL } from './schemaActionDDL'
import { Query } from './../model'

export class SchemaTruncate extends SchemaActionDDL {
	public queries (dialect:string):Query[] {
		return this.orm.language.truncate(dialect, this.schema)
	}
}
