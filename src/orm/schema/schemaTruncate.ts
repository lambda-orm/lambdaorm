import { SchemaActionDDL } from './schemaActionDDL'

export class SchemaTruncate extends SchemaActionDDL {
	public sentence (dialect:string):string[] {
		return this.orm.language.truncate(dialect, this.schema)
	}
}
