import { DialectService } from '../services/dialectService'
import { MappingConfigService, Source } from 'lambdaorm-base'
import { DDLBuilder } from './DDLBuilder'
import { DMLBuilder } from './DMLBuilder'

export interface Language {
	dialects: DialectService[]
	name: string
	solveComposite?: boolean
	getDialect (name: string): DialectService
	ddlBuilder(source: Source, mapping: MappingConfigService): DDLBuilder
	dmlBuilder(source: Source, mapping: MappingConfigService): DMLBuilder
}
