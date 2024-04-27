import { DialectService } from '../services/dialectService'
import { MappingConfigService, Source } from 'lambdaorm-base'
import { DdlBuilder } from './DdlBuilder'
import { DmlBuilder } from './DmlBuilder'

export interface Language {
	dialects: DialectService[]
	name: string
	solveComposite?: boolean
	getDialect (name: string): DialectService
	ddlBuilder(source: Source, mapping: MappingConfigService): DdlBuilder
	dmlBuilder(source: Source, mapping: MappingConfigService): DmlBuilder
}
