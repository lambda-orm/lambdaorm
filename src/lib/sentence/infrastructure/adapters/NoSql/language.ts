import { DDLBuilderPort, DMLBuilderPort } from '../../../../language/application'
import { MappingConfigService } from '../../../../schema/application'
import { Source } from '../../../../schema/domain'
import { LanguageAdapter, NoSqlDDLBuilderAdapter } from '../../../../language/infrastructure'
import config from './config.json'
import { IExpressions } from '3xpr'
import { NoSqlDMLBuilderAdapter } from './NoSqlDmlBuilder'

export class NoSqlLanguageAdapter extends LanguageAdapter {
	constructor (expressions: IExpressions) {
		super('NoSQL', config.dialects, expressions)
		this.solveComposite = true
	}

	public ddlBuilder (source: Source, mapping: MappingConfigService): DDLBuilderPort {
		return new NoSqlDDLBuilderAdapter(source, mapping, this.getDialect(source.dialect))
	}

	public override dmlBuilder (source: Source, mapping: MappingConfigService): DMLBuilderPort {
		return new NoSqlDMLBuilderAdapter(source, mapping, this.getDialect(source.dialect), this.expressions)
	}
}
