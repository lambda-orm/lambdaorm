import { LanguagesService } from '../../../../language/application'
import { StageModelService } from '../../services/stateService'
import { Query, QueryOptions, ExecuteResult } from '../../../../query/domain'
import { SchemaFacade } from '../../../../schema/application'
import { Executor } from '../../../../execution/domain'
import { Helper } from '../../../../shared/application'

export abstract class StageActionDDL {
	// eslint-disable-next-line no-useless-constructor
	constructor (protected readonly executor: Executor,
		protected readonly stageModelService:StageModelService,
		protected readonly schemaFacade: SchemaFacade,
		protected readonly languages: LanguagesService,
		protected readonly options:QueryOptions,
		protected readonly helper:Helper) {}

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
