import { DDLBuilderPort } from '../../../application'
import { MappingConfigService } from '../../../../schema/application'
import { Source } from '../../../../schema/domain'
import { LanguageAdapter } from '../base/languageAdapter'
import { NoSqlDDLBuilderAdapter } from './ddlBuilder'
import config from './config.json'
import { IExpressions } from '3xpr'

export class NoSqlLanguageAdapter extends LanguageAdapter {
	constructor (expressions: IExpressions) {
		super('NoSQL', config.dialects, expressions)
		this.solveComposite = true
	}

	public ddlBuilder (source: Source, mapping: MappingConfigService): DDLBuilderPort {
		return new NoSqlDDLBuilderAdapter(source, mapping, this.getDialect(source.dialect))
	}

	// public dmlBuild (source: Source, mapping: MappingConfigService, sentence: Sentence): Query {
	// return new NoSqlDMLBuilderAdapter(source, mapping, this.getDialect(source.dialect), this.expressions).build(sentence)
	// }
}
