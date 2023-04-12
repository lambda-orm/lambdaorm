import { MappingConfig } from '../../application'
import { LanguageDDLBuilder } from '../toRemove/query'
import { Dialect } from './dialect'
import { IExpressions } from '3xpr'
import { NotImplemented, source, Query, Sentence } from '../../domain/model'

export abstract class Language {
	public dialects: Dialect[]
	public name: string
	public solveComposite?: boolean
	protected expressions: IExpressions

	constructor (name: string, dialects: any, expressions: IExpressions) {
		this.name = name
		this.expressions = expressions

		this.dialects = []
		for (const p in dialects) {
			const data = dialects[p]
			const dialect = new Dialect(p, data)
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

	public abstract ddlBuilder(source: source, mapping: MappingConfig): LanguageDDLBuilder

	public abstract dmlBuild(source: source, mapping: MappingConfig, sentence: Sentence): Query
}
