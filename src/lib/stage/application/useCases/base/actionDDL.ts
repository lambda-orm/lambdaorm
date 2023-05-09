import { LanguagesService } from '../../../../language/application'
import { StageModelService } from '../../services/stateService'
import { Query, QueryOptions, ExecuteResult } from '../../../../query/domain'
import { SchemaService } from '../../../../schema/application'
import { RouteService } from '../../../../execution/application'
import { QueryService } from '../../../../expressions/application'

export abstract class StageActionDDL {
	// eslint-disable-next-line no-useless-constructor
	constructor (protected readonly queryService:ExecuteQuery,
		protected readonly stageModelService:StageModelService,
		protected readonly schemaService: SchemaService,
		protected readonly sentenceRoute: RouteService,
		protected readonly languages: LanguagesService,
		protected readonly options:QueryOptions) {}

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
