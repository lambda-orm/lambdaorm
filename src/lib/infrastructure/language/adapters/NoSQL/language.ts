import { LanguageDDLBuilder } from '../../../../application'
import { Source, Sentence, Query, IMappingConfigService } from '../../../../domain'
import { NoSqlDMLBuilderAdapter } from './dmlBuilder'
import { LanguageAdapter } from '../../language'
import { NoSqlDDLBuilder } from './ddlBuilder'
import config from './config.json'
import { IExpressions } from '3xpr'

export class NoSqlLanguageAdapter extends LanguageAdapter {
	constructor (expressions: IExpressions) {
		super('NoSQL', config.dialects, expressions)
		this.solveComposite = true
	}

	public ddlBuilder (source: Source, mapping: IMappingConfigService): LanguageDDLBuilder {
		return new NoSqlDDLBuilder(source, mapping, this.getDialect(source.dialect))
	}

	public dmlBuild (source: Source, mapping: IMappingConfigService, sentence: Sentence): Query {
		return new NoSqlDMLBuilderAdapter(source, mapping, this.getDialect(source.dialect), this.expressions).build(sentence)
	}
}
