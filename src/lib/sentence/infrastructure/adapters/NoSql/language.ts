import { DDLBuilderPort, DMLBuilderPort } from '../../../../language/application'
import { MappingConfigService } from '../../../../schema/application'
import { Source } from '../../../../schema/domain'
import { LanguageAdapter, NoSqlDDLBuilderAdapter } from '../../../../language/infrastructure'
import config from './config.json'
import { NoSqlDMLBuilderAdapter } from './NoSqlDmlBuilder'

export class NoSqlLanguageAdapter extends LanguageAdapter {
	constructor () {
		super('NoSQL', config.dialects)
		this.solveComposite = true
	}

	public ddlBuilder (source: Source, mapping: MappingConfigService): DDLBuilderPort {
		return new NoSqlDDLBuilderAdapter(source, mapping, this.getDialect(source.dialect))
	}

	public override dmlBuilder (source: Source, mapping: MappingConfigService): DMLBuilderPort {
		return new NoSqlDMLBuilderAdapter(source, mapping, this.getDialect(source.dialect))
	}
}
