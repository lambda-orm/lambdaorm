import { SchemaFacade } from '../../schema/application'
import { LanguagesService } from '../../language/application'
import { QueryFacade } from '../../expressions/application'
import { StageFacade } from '../application'

export class StageFacadeBuilder {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly languages: LanguagesService) {}

	public build (schemaFacade: SchemaFacade, queryFacade: QueryFacade):StageFacade {
		return new StageFacade(schemaFacade, queryFacade, this.languages)
	}
}
