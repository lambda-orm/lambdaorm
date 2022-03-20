import { LanguageDDLBuilder, MappingConfig } from '../../manager'
import { DataSource, Sentence, Query } from '../../model'
import { Language } from '../../manager/language'
import { SqlDMLBuilder } from './dmlBuilder'
import { SqlDDLBuilder } from './ddlBuilder'
import sqlConfig from './config.json'
import { Expressions } from 'js-expressions'

export class SqlLanguage extends Language {
	constructor (expressions:Expressions) {
		super('sql', sqlConfig.dialects, expressions)
	}

	public ddlBuilder (dataSource: DataSource, mapping: MappingConfig): LanguageDDLBuilder {
		return new SqlDDLBuilder(dataSource, mapping, this.getDialect(dataSource.dialect))
	}

	public dmlBuild (dataSource: DataSource, mapping: MappingConfig, sentence:Sentence): Query {
		return new SqlDMLBuilder(dataSource, mapping, this.getDialect(dataSource.dialect), this.expressions).build(sentence)
	}
}
