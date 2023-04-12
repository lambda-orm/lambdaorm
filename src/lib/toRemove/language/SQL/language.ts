import { MappingConfig } from '../../../application'
import { LanguageDDLBuilder } from '../../toRemove/query'
import { source, Sentence, Query } from '../../../domain/model'
import { Language } from '../language'
import { SqlDMLBuilder } from './dmlBuilder'
import { SqlDDLBuilder } from './ddlBuilder'
import config from './config.json'
import { IExpressions } from '3xpr'

export class SqlLanguage extends Language {
	constructor (expressions: IExpressions) {
		super('SQL', config.dialects, expressions)
		this.solveComposite = false
	}

	public ddlBuilder (source: source, mapping: MappingConfig): LanguageDDLBuilder {
		return new SqlDDLBuilder(source, mapping, this.getDialect(source.dialect))
	}

	public dmlBuild (source: source, mapping: MappingConfig, sentence: Sentence): Query {
		return new SqlDMLBuilder(source, mapping, this.getDialect(source.dialect), this.expressions).build(sentence)
	}
}
