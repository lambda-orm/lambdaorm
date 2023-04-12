import { LanguageDDLBuilder } from '../../query'
import { source, Sentence, Query, IMappingConfigService } from '../../../domain'
import { LanguageService } from '../language'
import { SqlDMLBuilder } from './dmlBuilder'
import { SqlDDLBuilder } from './ddlBuilder'
import config from './config.json'
import { IExpressions } from '3xpr'

export class SqlLanguageService extends LanguageService {
	constructor (expressions: IExpressions) {
		super('SQL', config.dialects, expressions)
		this.solveComposite = false
	}

	public ddlBuilder (source: source, mapping: IMappingConfigService): LanguageDDLBuilder {
		return new SqlDDLBuilder(source, mapping, this.getDialect(source.dialect))
	}

	public dmlBuild (source: source, mapping: IMappingConfigService, sentence: Sentence): Query {
		return new SqlDMLBuilder(source, mapping, this.getDialect(source.dialect), this.expressions).build(sentence)
	}
}
