import { LanguageDMLBuilder, LanguageDDLBuilder, MappingConfig, ViewConfig } from '.'
import { Dialect } from './dialect'
import { Expressions } from 'js-expressions'
import { NotImplemented, DataSource } from '../model'

export abstract class Language {
	public dialects: Dialect[]
	public name:string

	constructor (name: string, dialects: any) {
		this.name = name
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

	public abstract dmlBuilder (dataSource: DataSource, mapping: MappingConfig, view: ViewConfig, expressions:Expressions): LanguageDMLBuilder
}
