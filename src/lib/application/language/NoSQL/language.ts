import { LanguageDDLBuilder } from '../../query'
import { source, Sentence, Query, IMappingConfigService } from '../../../domain'
import { LanguageService } from '../language'
import { NoSqlDMLBuilder } from './dmlBuilder'
import { NoSqlDDLBuilder } from './ddlBuilder'
import config from './config.json'
import { IExpressions } from '3xpr'

export class NoSqlLanguageService extends LanguageService {
	constructor (expressions: IExpressions) {
		super('NoSQL', config.dialects, expressions)
		this.solveComposite = true
	}

	public ddlBuilder (source: source, mapping: IMappingConfigService): LanguageDDLBuilder {
		return new NoSqlDDLBuilder(source, mapping, this.getDialect(source.dialect))
	}

	public dmlBuild (source: source, mapping: IMappingConfigService, sentence: Sentence): Query {
		return new NoSqlDMLBuilder(source, mapping, this.getDialect(source.dialect), this.expressions).build(sentence)
	}
}
