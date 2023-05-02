import { DDLBuilderPort, DMLBuilderPort } from '../../../../language/application'
import { MappingConfigService } from '../../../../schema/application'
import { Source } from '../../../../schema/domain'
import { LanguageAdapter, SqlDDLBuilderAdapter } from '../../../../language/infrastructure'
import { SqlDMLBuilderAdapter } from './SqlDmlBuilder'
import config from './config.json'

export class SqlLanguageAdapter extends LanguageAdapter {
	constructor () {
		super('SQL', config.dialects)
		this.solveComposite = false
	}

	public override ddlBuilder (source: Source, mapping: MappingConfigService): DDLBuilderPort {
		return new SqlDDLBuilderAdapter(source, mapping, this.getDialect(source.dialect))
	}

	public override dmlBuilder (source: Source, mapping: MappingConfigService): DMLBuilderPort {
		return new SqlDMLBuilderAdapter(source, mapping, this.getDialect(source.dialect))
	}
}
