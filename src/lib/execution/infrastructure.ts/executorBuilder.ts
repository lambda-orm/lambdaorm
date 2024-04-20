import { ConnectionFacade } from '../../connection/application'
import { LanguagesService } from '../../language/application'
import { Expressions } from '3xpr'
import { SchemaState } from 'lambdaorm-base'
import { ExecutorImpl } from '../application'
import { OrmH3lp } from '../../shared/infrastructure'
import { ObservableExecutorDecorator } from '../domain'

export class ExecutorBuilder {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly connection: ConnectionFacade,
	private readonly languages: LanguagesService,
	private readonly expressions: Expressions,
	private readonly helper: OrmH3lp) {}

	public build (schemaState: SchemaState):ObservableExecutorDecorator {
		return new ExecutorImpl(this.connection, this.languages, schemaState, this.expressions, this.helper)
	}
}
