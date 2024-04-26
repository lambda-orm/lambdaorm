import { LanguageBase } from '../../../../language/infrastructure/adapters/languageBase'
import { DDLBuilder, DMLBuilder } from '../../../../language/application'
import { MappingConfigService, Source } from 'lambdaorm-base'
import { SqlDMLBuilder } from './SqlDMLBuilder'
import config from './config.json'
import { SqlDDLBuilder } from '../../../../language/infrastructure/adapters/SqlDDLBuilder'
import { OrmH3lp } from '../../../../shared/infrastructure'

export class SqlLanguageAdapter extends LanguageBase {
	constructor (private readonly helper:OrmH3lp) {
		super('SQL', config.dialects)
		this.solveComposite = false
	}

	public override ddlBuilder (source: Source, mapping: MappingConfigService): DDLBuilder {
		return new SqlDDLBuilder(source, mapping, this.getDialect(source.dialect), this.helper)
	}

	public override dmlBuilder (source: Source, mapping: MappingConfigService): DMLBuilder {
		return new SqlDMLBuilder(source, mapping, this.getDialect(source.dialect), this.helper)
	}
}
