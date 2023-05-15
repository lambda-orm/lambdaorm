import { LanguageAdapter } from 'lib/language/infrastructure/adapters/base/languageAdapter'
import { DDLBuilderPort, DMLBuilderPort } from '../../../../language/application'
import { MappingConfigService } from '../../../../schema/application'
import { Source } from '../../../../schema/domain'
import { SqlDMLBuilderAdapter } from './SqlDmlBuilder'
import config from './config.json'
import { SqlDDLBuilderAdapter } from 'lib/language/infrastructure/adapters/SQL/ddlBuilder'

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
