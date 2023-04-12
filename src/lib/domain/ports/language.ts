import { Sentence, Query, IDialectService, Source, IMappingConfigService, ILanguageDDLBuilder } from '../../domain'

export interface DmlBuilderPort {
	build (sentence: Sentence): Query
}

export interface LanguagePort {
	dialects: IDialectService[]
	name: string
	solveComposite?: boolean
	getDialect (name: string): IDialectService
	ddlBuilder(source: Source, mapping: IMappingConfigService): ILanguageDDLBuilder
	dmlBuild(source: Source, mapping: IMappingConfigService, sentence: Sentence): Query
}
