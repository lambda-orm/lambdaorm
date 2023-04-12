import { LanguageDDLBuilder } from '../query'
import { DialectService } from './dialect'
import { IExpressions } from '3xpr'
import { NotImplemented, source, Query, Sentence, IDialectService, IMappingConfigService } from '../../domain'

export abstract class LanguageService {
	public dialects: IDialectService[]
	public name: string
	public solveComposite?: boolean
	protected expressions: IExpressions

	constructor (name: string, dialects: any, expressions: IExpressions) {
		this.name = name
		this.expressions = expressions

		this.dialects = []
		for (const p in dialects) {
			const data = dialects[p]
			const dialect = new DialectService(p, data)
			this.dialects.push(dialect)
		}
	}

	public getDialect (name: string): IDialectService {
		const dialect = this.dialects.find(p => p.name === name)
		if (!dialect) {
			throw new NotImplemented(`Dialect ${name} not implemented`)
		}
		return dialect
	}

	public abstract ddlBuilder(source: source, mapping: IMappingConfigService): LanguageDDLBuilder

	public abstract dmlBuild(source: source, mapping: IMappingConfigService, sentence: Sentence): Query
}
