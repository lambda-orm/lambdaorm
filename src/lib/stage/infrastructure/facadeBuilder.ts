import { SchemaState } from 'lambdaorm-base'
import { LanguagesService } from '../../language/application'
import { ExpressionFacade } from '../../expressions/application'
import { StageFacade } from '../application'
import { Executor } from '../../execution/domain'
import { OrmH3lp } from '../../shared/infrastructure'

export class StageFacadeBuilder {
	// eslint-disable-next-line no-useless-constructor
	constructor (
		private readonly languages: LanguagesService,
		private readonly executor:Executor,
		private readonly helper:OrmH3lp
	) {}

	public build (schemaState: SchemaState, expressionFacade: ExpressionFacade):StageFacade {
		return new StageFacade(schemaState, expressionFacade, this.executor, this.languages, this.helper)
	}
}
