import { Sentence, Query, Source } from '../../../domain'
import { MappingConfigService, DialectService, LanguageDDLBuilder } from '../../'

export interface LanguagePort {
	dialects: DialectService[]
	name: string
	solveComposite?: boolean
	getDialect (name: string): DialectService
	ddlBuilder(source: Source, mapping: MappingConfigService): LanguageDDLBuilder
	dmlBuild(source: Source, mapping: MappingConfigService, sentence: Sentence): Query
}
