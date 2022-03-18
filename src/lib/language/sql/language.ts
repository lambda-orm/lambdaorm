import { LanguageDMLBuilder, LanguageDDLBuilder, MappingConfig, ViewConfig } from '../../manager'
import { DataSource } from '../../model'
import { Language } from '../../manager/language'
import { SqlDMLBuilder } from './dmlBuilder'
import { SqlDDLBuilder } from './ddlBuilder'
import sqlConfig from './config.json'
import { Expressions } from 'js-expressions'

export class SqlLanguage extends Language {
	constructor () {
		super('sql', sqlConfig.dialects)
	}

	public ddlBuilder (dataSource: DataSource, mapping: MappingConfig): LanguageDDLBuilder {
		return new SqlDDLBuilder(dataSource, mapping, this.getDialect(dataSource.dialect))
	}

	public dmlBuilder (dataSource: DataSource, mapping: MappingConfig, view: ViewConfig, expressions:Expressions): LanguageDMLBuilder {
		return new SqlDMLBuilder(dataSource, mapping, view, this.getDialect(dataSource.dialect), expressions)
	}
}
