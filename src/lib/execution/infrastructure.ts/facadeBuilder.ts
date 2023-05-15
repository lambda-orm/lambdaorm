import { ConnectionFacade } from '../../connection/application'
import { ExecutionFacade } from '../application'
import { LanguagesService } from '../../language/application'
import { Expressions } from '3xpr'
import { SchemaFacade } from '../../schema/application'

export class ExecutionFacadeBuilder {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly connection: ConnectionFacade,
	private readonly languages: LanguagesService,
	private readonly expressions: Expressions) {}

	public build (schema: SchemaFacade):ExecutionFacade {
		return new ExecutionFacade(this.connection, this.languages, schema, this.expressions)
	}
}
