import { LanguageDDLBuilder, MappingConfig } from '../../manager'
import { source, Sentence, Query } from '../../contract'
import { Language } from '../../manager/language'
import { SqlDMLBuilder } from './dmlBuilder'
import { SqlDDLBuilder } from './ddlBuilder'
import config from './config.json'
import { Expressions } from 'js-expressions'

export class SqlLanguage extends Language {
	constructor (expressions: Expressions) {
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
