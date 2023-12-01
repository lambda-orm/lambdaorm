import { Schema } from '../../domain'
import { SchemaService } from '../services/schemaService'

export class CompleteSchema {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly schemaService: SchemaService) {}

	public complete (schema: Schema) {
		if (!schema.domain) {
			schema.domain = this.schemaService.newDomain()
		} else {
			if (!schema.domain.enums) {
				schema.domain.enums = []
			}
			if (!schema.domain.entities) {
				schema.domain.entities = []
			}
		}
		if (!schema.infrastructure) {
			schema.infrastructure = this.schemaService.newInfrastructure()
		} else {
			if (!schema.infrastructure.mappings) {
				schema.infrastructure.mappings = []
			}
			if (!schema.infrastructure.sources) {
				schema.infrastructure.sources = []
			}
			if (!schema.infrastructure.stages) {
				schema.infrastructure.stages = []
			}
			if (!schema.infrastructure.paths) {
				schema.infrastructure.paths = this.schemaService.newPathsApp()
			}
			if (!schema.infrastructure.paths.src) {
				schema.infrastructure.paths.src = 'src'
			}
			if (!schema.infrastructure.paths.data) {
				schema.infrastructure.paths.data = 'data'
			}
			if (!schema.infrastructure.paths.domain) {
				schema.infrastructure.paths.domain = 'domain'
			}
			if (!schema.infrastructure.views) {
				schema.infrastructure.views = []
			}
		}
		if (!schema.application) {
			schema.application = this.schemaService.newApplication()
		} else {
			if (!schema.application.start) {
				schema.application.start = []
			}
			if (!schema.application.end) {
				schema.application.end = []
			}
			if (!schema.application.listeners) {
				schema.application.listeners = []
			}
		}
	}
}
