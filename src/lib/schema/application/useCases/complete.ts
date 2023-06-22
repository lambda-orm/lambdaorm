import { Schema } from '../../domain'
import { SchemaService } from '../services/schemaService'

export class CompleteSchema {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly schemaService: SchemaService) {}

	public complete (schema: Schema) {
		if (schema.domain === undefined) {
			schema.domain = this.schemaService.newDomain()
		} else {
			if (schema.domain.enums === undefined) {
				schema.domain.enums = []
			}
			if (schema.domain.entities === undefined) {
				schema.domain.entities = []
			}
			if (schema.domain.views === undefined) {
				schema.domain.views = []
			}
		}
		if (schema.infrastructure === undefined) {
			schema.infrastructure = this.schemaService.newInfrastructure()
		} else {
			if (schema.infrastructure.mappings === undefined) {
				schema.infrastructure.mappings = []
			}
			if (schema.infrastructure.sources === undefined) {
				schema.infrastructure.sources = []
			}
			if (schema.infrastructure.stages === undefined) {
				schema.infrastructure.stages = []
			}
			if (schema.infrastructure.paths === undefined) {
				schema.infrastructure.paths = this.schemaService.newPathsApp()
			}
			if (schema.infrastructure.paths.src === undefined) {
				schema.infrastructure.paths.src = 'src'
			}
			if (schema.infrastructure.paths.data === undefined) {
				schema.infrastructure.paths.data = 'data'
			}
			if (schema.infrastructure.paths.model === undefined) {
				schema.infrastructure.paths.model = 'model'
			}
		}
		if (schema.application === undefined) {
			schema.application = this.schemaService.newApplication()
		} else {
			if (schema.application.start === undefined) {
				schema.application.start = []
			}
			if (schema.application.end === undefined) {
				schema.application.end = []
			}
			if (schema.application.listeners === undefined) {
				schema.application.listeners = []
			}
		}
	}
}
