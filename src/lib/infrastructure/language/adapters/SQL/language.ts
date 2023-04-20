import { Source, Sentence, Query } from '../../../../domain'
import { LanguageDDLBuilder, MappingConfigService } from '../../../../application'
import { SqlDMLBuilderAdapter } from './dmlBuilder'
import { LanguageAdapter } from '../base/language'
import { SqlDDLBuilder } from './ddlBuilder'
import config from './config.json'
import { IExpressions } from '3xpr'

export class SqlLanguageAdapter extends LanguageAdapter {
	constructor (expressions: IExpressions) {
		super('SQL', config.dialects, expressions)
		this.solveComposite = false
	}

	public ddlBuilder (source: Source, mapping: MappingConfigService): LanguageDDLBuilder {
		return new SqlDDLBuilder(source, mapping, this.getDialect(source.dialect))
	}

	public dmlBuild (source: Source, mapping: MappingConfigService, sentence: Sentence): Query {
		return new SqlDMLBuilderAdapter(source, mapping, this.getDialect(source.dialect), this.expressions).build(sentence)
	}
}
