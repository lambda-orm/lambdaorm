import { LanguagesService } from '../../../../language/application'
import { StageModelService } from '../../services/stateService'
import { Query, ExecuteResult } from '../../../../query/domain'
import { SchemaState, QueryOptions } from 'lambdaorm-base'
import { Executor } from '../../../../execution/domain'
import { OrmH3lp } from '../../../../shared/infrastructure'

export abstract class StageActionDDL {
	// eslint-disable-next-line no-useless-constructor
	constructor (protected readonly executor: Executor,
		protected readonly stageModelService:StageModelService,
		protected readonly schemaState: SchemaState,
		protected readonly languages: LanguagesService,
		protected readonly options:QueryOptions,
		protected readonly helper:OrmH3lp) {}

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
