import { DDLBuilderPort } from '../../../application'
import { MappingConfigService } from '../../../../schema/application'
import { Source } from '../../../../schema/domain'
import { LanguageAdapter } from '../base/languageAdapter'
import { SqlDDLBuilderAdapter } from './ddlBuilder'
import config from './config.json'
import { IExpressions } from '3xpr'

export class SqlLanguageAdapter extends LanguageAdapter {
	constructor (expressions: IExpressions) {
		super('SQL', config.dialects, expressions)
		this.solveComposite = false
	}

	public override ddlBuilder (source: Source, mapping: MappingConfigService): DDLBuilderPort {
		return new SqlDDLBuilderAdapter(source, mapping, this.getDialect(source.dialect))
	}

// public override dmlBuilder (source: Source, mapping: MappingConfigService): ILanguageDMLBuilder {
// return new SqlDMLBuilderAdapter(source, mapping, this.getDialect(source.dialect), this.expressions)
// }
}
