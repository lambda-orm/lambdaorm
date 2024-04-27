import { LanguageBase } from '../../../../language/infrastructure/adapters/languageBase'
import { DdlBuilder, DmlBuilder } from '../../../../language/application'
import { MappingConfigService, Source } from 'lambdaorm-base'
import { SqlDmlBuilder } from './SqlDmlBuilder'
import config from './config.json'
import { SqlDdlBuilder } from '../../../../language/infrastructure/adapters/SqlDdlBuilder'
import { OrmH3lp } from '../../../../shared/infrastructure'

export class SqlLanguageAdapter extends LanguageBase {
	constructor (private readonly helper:OrmH3lp) {
		super('SQL', config.dialects)
		this.solveComposite = false
	}

	public override ddlBuilder (source: Source, mapping: MappingConfigService): DdlBuilder {
		return new SqlDdlBuilder(source, mapping, this.getDialect(source.dialect), this.helper)
	}

	public override dmlBuilder (source: Source, mapping: MappingConfigService): DmlBuilder {
		return new SqlDmlBuilder(source, mapping, this.getDialect(source.dialect), this.helper)
	}
}
