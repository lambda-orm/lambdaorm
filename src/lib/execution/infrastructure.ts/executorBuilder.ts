import { ConnectionFacade } from '../../connection/application'
import { LanguagesService } from '../../language/application'
import { Expressions } from '3xpr'
import { SchemaFacade } from 'lambdaorm-base'
import { ExecutorImpl } from '../application'
import { Helper } from '../../shared/application'
import { ObservableExecutorDecorator } from '../domain'

export class ExecutorBuilder {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly connection: ConnectionFacade,
	private readonly languages: LanguagesService,
	private readonly expressions: Expressions,
	private readonly helper: Helper) {}

	public build (schema: SchemaFacade):ObservableExecutorDecorator {
		return new ExecutorImpl(this.connection, this.languages, schema, this.expressions, this.helper)
	}
}
