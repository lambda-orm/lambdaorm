import { LanguageDMLBuilder, LanguageDDLBuilder, MappingConfig } from '../manager'
import { DialectMetadata } from './dialectMetadata'
import { Expressions } from 'js-expressions'

export abstract class Language {
	public dialects:any
	constructor (dialects: any) {
		this.dialects = {}
		for (const name in dialects) {
			const data = dialects[name]
			const dialect = new DialectMetadata(name)
			dialect.add(data)
			this.dialects[name] = dialect
		}
	}

	public dialectMetadata (dialect: string): DialectMetadata {
		return this.dialects[dialect] as DialectMetadata
	}

	public abstract ddlBuilder (dataSource: string, dialect: string, mapping: MappingConfig): LanguageDDLBuilder

	public abstract dmlBuilder (dataSource: string, dialect: string, mapping: MappingConfig, expressions:Expressions): LanguageDMLBuilder
}
