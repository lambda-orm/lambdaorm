import { DdlBuilder, DmlBuilder } from '../../../../language/application'
import { MappingConfigService, Source } from 'lambdaorm-base'
import { LanguageBase, NoSqlDDLBuilder } from '../../../../language/infrastructure'
import config from './config.json'
import { NoSqlDmlBuilder } from './NoSqlDmlBuilder'
import { OrmH3lp } from '../../../../shared/infrastructure'

export class NoSqlLanguageAdapter extends LanguageBase {
	constructor (private readonly helper:OrmH3lp) {
		super('NoSQL', config.dialects)
		this.solveComposite = true
	}

	public ddlBuilder (source: Source, mapping: MappingConfigService): DdlBuilder {
		return new NoSqlDDLBuilder(source, mapping, this.getDialect(source.dialect), this.helper)
	}

	public override dmlBuilder (source: Source, mapping: MappingConfigService): DmlBuilder {
		return new NoSqlDmlBuilder(source, mapping, this.getDialect(source.dialect), this.helper)
	}
}
