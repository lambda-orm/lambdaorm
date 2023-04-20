import { Query, QueryOptions, ExecuteResult } from '../../../../domain'
import { SentenceRoute, Executor, SchemaService } from '../../..'
import { LanguagesService } from '../../../language'
import { StageModelService } from '../../services/stateService'

export abstract class StageActionDDL {
	protected stateService: StageModelService
	protected schemaService: SchemaService
	protected sentenceRoute: SentenceRoute
	protected languages: LanguagesService
	protected executor: Executor
	protected options: QueryOptions
	constructor (stateService:StageModelService, schemaService: SchemaService, sentenceRoute: SentenceRoute, languages: LanguagesService, executor: Executor, options:QueryOptions) {
		this.stateService = stateService
		this.schemaService = schemaService
		this.sentenceRoute = sentenceRoute
		this.languages = languages
		this.executor = executor
		this.options = options
	}

	public abstract execute(): Promise<ExecuteResult[]>
	public abstract queries(): Promise<Query[]>
	public async sentence (): Promise<any[]> {
		const sentences: any[] = []
		const queries = await this.queries()
		for (const p in queries) {
			sentences.push(queries[p].sentence)
		}
		return sentences
	}
}
