import { LanguageQueryBuilder } from './../manager/queryBuilder'
import { LanguageSchemaBuilder } from './../manager/schemaBuilder'
import { DialectMetadata } from './dialectMetadata'
// export interface ILanguage
// {
// name:string
// dialects: any
// get schema():ISchemaBuilder
// get query():IQueryBuilder
// get executor(): QueryExecutor
// metadata (dialect:string):DialectMetadata
// }

export class Language {
	public name:string
	public libraries:any
	public dialects:any
	public hadQuery: boolean
	private schemaBuilder:LanguageSchemaBuilder
	private queryBuilder:LanguageQueryBuilder
	constructor (name:string, queryBuilder:LanguageQueryBuilder, schemaBuilder:LanguageSchemaBuilder) {
		this.name = name
		this.hadQuery = true
		this.libraries = {}
		this.dialects = {}
		this.queryBuilder = queryBuilder
		this.schemaBuilder = schemaBuilder
	}

	public addLibrary (library:any):void {
		this.libraries[library.name] = library
		for (const name in library.dialects) {
			const data = library.dialects[name]
			const dialect = new DialectMetadata(name)
			dialect.add(data)
			this.dialects[name] = dialect
		}
	}

	public get schema ():LanguageSchemaBuilder {
		return this.schemaBuilder
	}

	public get query ():LanguageQueryBuilder {
		return this.queryBuilder
	}

	public metadata (dialect:string):DialectMetadata {
		return this.dialects[dialect] as DialectMetadata
	}
}
