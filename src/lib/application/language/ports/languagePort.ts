import { Sentence, Query, Source, ILanguageDDLBuilder } from '../../../domain'
import { MappingConfigService, DialectService } from '../../'

export interface LanguagePort {
	dialects: DialectService[]
	name: string
	solveComposite?: boolean
	getDialect (name: string): DialectService
	ddlBuilder(source: Source, mapping: MappingConfigService): ILanguageDDLBuilder
	dmlBuild(source: Source, mapping: MappingConfigService, sentence: Sentence): Query
}
