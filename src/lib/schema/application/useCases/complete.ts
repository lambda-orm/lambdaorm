import { Schema } from '../../domain'
import { SchemaService } from '../services/schemaService'

export class CompleteSchema {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly schemaService: SchemaService) {}

	public complete (schema: Schema) {
		if (schema.model === undefined) {
			schema.model = this.schemaService.newModel()
		} else {
			if (schema.model.enums === undefined) {
				schema.model.enums = []
			}
			if (schema.model.entities === undefined) {
				schema.model.entities = []
			}
			if (schema.model.views === undefined) {
				schema.model.views = []
			}
		}
		if (schema.data === undefined) {
			schema.data = this.schemaService.newData()
		} else {
			if (schema.data.mappings === undefined) {
				schema.data.mappings = []
			}
			if (schema.data.sources === undefined) {
				schema.data.sources = []
			}
			if (schema.data.stages === undefined) {
				schema.data.stages = []
			}
		}
		if (schema.app === undefined) {
			schema.app = this.schemaService.newApp()
		} else {
			if (schema.app.start === undefined) {
				schema.app.start = []
			}
			if (schema.app.end === undefined) {
				schema.app.end = []
			}
			if (schema.app.listeners === undefined) {
				schema.app.listeners = []
			}
			if (schema.app.paths === undefined) {
				schema.app.paths = this.schemaService.newPathsApp()
			}
			if (schema.app.paths.src === undefined) {
				schema.app.paths.src = 'src'
			}
			if (schema.app.paths.data === undefined) {
				schema.app.paths.data = 'data'
			}
			if (schema.app.paths.model === undefined) {
				schema.app.paths.model = 'model'
			}
		}
	}
}
