import { LanguageDDLBuilder, MappingConfig } from '../../manager'
import { DataSource, Sentence, Query } from '../../model'
import { Language } from '../../manager/language'
import { NoSqlDMLBuilder } from './dmlBuilder'
import { NoSqlDDLBuilder } from './ddlBuilder'
import config from './config.json'
import { Expressions } from 'js-expressions'

export class NoSqlLanguage extends Language {
	constructor (expressions: Expressions) {
		super('NoSQL', config.dialects, expressions)
		this.solveComposite = true
	}

	public ddlBuilder (dataSource: DataSource, mapping: MappingConfig): LanguageDDLBuilder {
		return new NoSqlDDLBuilder(dataSource, mapping, this.getDialect(dataSource.dialect))
	}

	public dmlBuild (dataSource: DataSource, mapping: MappingConfig, sentence: Sentence): Query {
		return new NoSqlDMLBuilder(dataSource, mapping, this.getDialect(dataSource.dialect), this.expressions).build(sentence)
	}
}
