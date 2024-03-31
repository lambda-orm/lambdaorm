import { SchemaState } from 'lambdaorm-base'
import { LanguagesService } from '../../language/application'
import { ExpressionFacade } from '../../expressions/application'
import { StageFacade } from '../application'
import { Executor } from '../../execution/domain'
import { Helper } from '../../shared/application'

export class StageFacadeBuilder {
	// eslint-disable-next-line no-useless-constructor
	constructor (
		private readonly languages: LanguagesService,
		private readonly executor:Executor,
		private readonly helper:Helper
	) {}

	public build (workspace:string, schemaState: SchemaState, expressionFacade: ExpressionFacade):StageFacade {
		return new StageFacade(workspace, schemaState, expressionFacade, this.executor, this.languages, this.helper)
	}
}
