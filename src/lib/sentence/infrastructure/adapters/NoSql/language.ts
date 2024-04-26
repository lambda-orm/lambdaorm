import { DDLBuilder, DMLBuilder } from '../../../../language/application'
import { MappingConfigService, Source } from 'lambdaorm-base'
import { LanguageBase, NoSqlDDLBuilder } from '../../../../language/infrastructure'
import config from './config.json'
import { NoSqlDMLBuilder } from './NoSqlDMLBuilder'
import { OrmH3lp } from '../../../../shared/infrastructure'

export class NoSqlLanguageAdapter extends LanguageBase {
	constructor (private readonly helper:OrmH3lp) {
		super('NoSQL', config.dialects)
		this.solveComposite = true
	}

	public ddlBuilder (source: Source, mapping: MappingConfigService): DDLBuilder {
		return new NoSqlDDLBuilder(source, mapping, this.getDialect(source.dialect), this.helper)
	}

	public override dmlBuilder (source: Source, mapping: MappingConfigService): DMLBuilder {
		return new NoSqlDMLBuilder(source, mapping, this.getDialect(source.dialect), this.helper)
	}
}
