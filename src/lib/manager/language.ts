import { LanguageDMLBuilder, LanguageDDLBuilder, MappingConfig, ViewConfig } from '.'
import { Dialect } from './dialect'
import { NotImplemented, DataSource, Sentence, Query } from '../model'

export abstract class Language {
	public dialects: Dialect[]
	public name: string
	protected dmlBuilder:LanguageDMLBuilder

	constructor (name: string, dialects: any, dmlBuilder:LanguageDMLBuilder) {
		this.name = name
		this.dmlBuilder = dmlBuilder

		this.dialects = []
		for (const name in dialects) {
			const data = dialects[name]
			const dialect = new Dialect(name)
			dialect.add(data)
			this.dialects.push(dialect)
		}
	}

	public getDialect (name: string): Dialect {
		const dialect = this.dialects.find(p => p.name === name)
		if (!dialect) {
			throw new NotImplemented(`Dialect ${name} not implemented`)
		}
		return dialect
	}

	public abstract ddlBuilder (dataSource: DataSource, mapping: MappingConfig): LanguageDDLBuilder

	public dmlBuild (dataSource: DataSource, mapping: MappingConfig, view: ViewConfig, sentence:Sentence):Query {
		return this.dmlBuilder.build(dataSource, mapping, view, this.getDialect(dataSource.dialect), sentence)
	}
}
