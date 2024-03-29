import { DDLBuilderPort, DMLBuilderPort } from '../../../../language/application'
import { MappingConfigService, Source } from 'lambdaorm-base'
import { LanguageAdapter, NoSqlDDLBuilderAdapter } from '../../../../language/infrastructure'
import config from './config.json'
import { NoSqlDMLBuilderAdapter } from './NoSqlDmlBuilder'
import { Helper } from '../../../../shared/application'

export class NoSqlLanguageAdapter extends LanguageAdapter {
	constructor (private readonly helper:Helper) {
		super('NoSQL', config.dialects)
		this.solveComposite = true
	}

	public ddlBuilder (source: Source, mapping: MappingConfigService): DDLBuilderPort {
		return new NoSqlDDLBuilderAdapter(source, mapping, this.getDialect(source.dialect), this.helper)
	}

	public override dmlBuilder (source: Source, mapping: MappingConfigService): DMLBuilderPort {
		return new NoSqlDMLBuilderAdapter(source, mapping, this.getDialect(source.dialect), this.helper)
	}
}
