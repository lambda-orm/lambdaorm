import { DialectService } from '../services/dialectService'
import { MappingConfigService, Source } from 'lambdaorm-base'
import { DDLBuilderPort } from './ddlBuilderPort'
import { DMLBuilderPort } from './dmlBuilderPort'

export interface LanguagePort {
	dialects: DialectService[]
	name: string
	solveComposite?: boolean
	getDialect (name: string): DialectService
	ddlBuilder(source: Source, mapping: MappingConfigService): DDLBuilderPort
	dmlBuilder(source: Source, mapping: MappingConfigService): DMLBuilderPort
}
