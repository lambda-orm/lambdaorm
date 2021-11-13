import { LanguageDMLBuilder } from '../manager/dmlBuilder'
import { LanguageDDLBuilder } from '../manager/ddlBuilder'
import { DialectMetadata } from './dialectMetadata'

export class Language {
	public name:string
	public libraries:any
	public dialects:any
	public hadQuery: boolean
	private ddlBuilder:LanguageDDLBuilder
	private dmlBuilder:LanguageDMLBuilder
	constructor (name:string, ddlBuilder:LanguageDDLBuilder, dmlBuilder:LanguageDMLBuilder) {
		this.name = name
		this.hadQuery = true
		this.libraries = {}
		this.dialects = {}
		this.ddlBuilder = ddlBuilder
		this.dmlBuilder = dmlBuilder
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

	public get ddl ():LanguageDDLBuilder {
		return this.ddlBuilder
	}

	public get dml ():LanguageDMLBuilder {
		return this.dmlBuilder
	}

	public metadata (dialect:string):DialectMetadata {
		return this.dialects[dialect] as DialectMetadata
	}
}
