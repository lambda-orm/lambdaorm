import { LanguageDMLBuilder, LanguageDDLBuilder, MappingConfig } from '../../manager'
import { Language } from './../language'
import { SqlDMLBuilder } from './dmlBuilder'
import { SqlDDLBuilder } from './ddlBuilder'
import sqlConfig from './config.json'

export class SqlLanguage extends Language {
	constructor () {
		super(sqlConfig.dialects)
	}

	public ddlBuilder (datastore: string, dialect: string, mapping: MappingConfig): LanguageDDLBuilder {
		return new SqlDDLBuilder(datastore, mapping, this.dialectMetadata(dialect))
	}

	public dmlBuilder (datastore: string, dialect: string, mapping: MappingConfig): LanguageDMLBuilder {
		return new SqlDMLBuilder(datastore, mapping, this.dialectMetadata(dialect))
	}
}
