import { MappingConfig } from '../../../application'
import { LanguageDDLBuilder } from '../../toRemove/query'
import { source, Sentence, Query } from '../../../domain/model'
import { Language } from '../language'
import { NoSqlDMLBuilder } from './dmlBuilder'
import { NoSqlDDLBuilder } from './ddlBuilder'
import config from './config.json'
import { IExpressions } from '3xpr'

export class NoSqlLanguage extends Language {
	constructor (expressions: IExpressions) {
		super('NoSQL', config.dialects, expressions)
		this.solveComposite = true
	}

	public ddlBuilder (source: source, mapping: MappingConfig): LanguageDDLBuilder {
		return new NoSqlDDLBuilder(source, mapping, this.getDialect(source.dialect))
	}

	public dmlBuild (source: source, mapping: MappingConfig, sentence: Sentence): Query {
		return new NoSqlDMLBuilder(source, mapping, this.getDialect(source.dialect), this.expressions).build(sentence)
	}
}
