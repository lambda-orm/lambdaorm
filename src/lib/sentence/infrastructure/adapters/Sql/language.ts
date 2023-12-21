import { LanguageAdapter } from '../../../../language/infrastructure/adapters/base/languageAdapter'
import { DDLBuilderPort, DMLBuilderPort } from '../../../../language/application'
import { MappingConfigService, Source } from 'lambdaorm-base'
import { SqlDMLBuilderAdapter } from './SqlDmlBuilder'
import config from './config.json'
import { SqlDDLBuilderAdapter } from '../../../../language/infrastructure/adapters/SQL/ddlBuilder'
import { Helper } from '../../../../shared/application'

export class SqlLanguageAdapter extends LanguageAdapter {
	constructor (private readonly helper:Helper) {
		super('SQL', config.dialects)
		this.solveComposite = false
	}

	public override ddlBuilder (source: Source, mapping: MappingConfigService): DDLBuilderPort {
		return new SqlDDLBuilderAdapter(source, mapping, this.getDialect(source.dialect), this.helper)
	}

	public override dmlBuilder (source: Source, mapping: MappingConfigService): DMLBuilderPort {
		return new SqlDMLBuilderAdapter(source, mapping, this.getDialect(source.dialect), this.helper)
	}
}
