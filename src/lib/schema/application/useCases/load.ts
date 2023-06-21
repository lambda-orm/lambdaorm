import { Helper } from '../../../shared/application'
import { Schema, SchemaError } from '../../domain'
import { Primitive } from 'typ3s'
import { DataSourceConfigService } from '../services/config/dataSourceConfigService'
import { ModelConfigService } from '../services/config/modelConfigService'
import { MappingsConfigService } from '../services/config/mappingsConfigService'
import { StageConfigService } from '../services/config/stageConfigService'
import { ViewsConfigService } from '../services/config/viewsConfigService'
import { SchemaExtender } from '../services/schemaExtender'

export class LoadSchema {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly source: DataSourceConfigService,
		private readonly model:ModelConfigService,
		private readonly mapping:MappingsConfigService,
		private readonly stage:StageConfigService,
		private readonly view:ViewsConfigService,
		private readonly extender:SchemaExtender,
		private readonly helper:Helper) {}

	public load (_schema: Schema): Schema {
		let schema = this.helper.utils.solveEnvironmentVars(_schema) as Schema
		schema = this.extender.extend(schema)
		this.model.entities = schema.model.entities || []
		this.model.enums = schema.model.enums || []
		if (!schema.model.views) {
			schema.model.views = [{ name: 'default', entities: [] }]
		}
		for (const view of schema.model.views) {
			this.view.load(view)
		}
		if (schema.data.mappings) {
			for (const mapping of schema.data.mappings) {
				this.mapping.load(mapping)
			}
		}
		if (schema.data.sources) {
			for (const source of schema.data.sources) {
				if (this.helper.val.isEmpty(source.connection)) {
					console.log(`WARNING|source:"${source.name}"|connection is empty`)
					continue
				}
				if (typeof source.connection === Primitive.string) {
					if (source.connection.includes('${')) {
						console.log(`WARNING|source:"${source.name}"|had environment variables unsolved`)
						continue
					}
					const connection = this.helper.utils.tryParse(source.connection)
					if (connection) {
						source.connection = connection
					} else {
						throw new SchemaError(`Connection "${source.connection}" not serializable`)
					}
				} else if (typeof source.connection !== 'object') {
					throw new SchemaError(`The source "${source.name}" connection to is not defined as an object`)
				}
				this.source.load(source)
			}
		}
		if (schema.data.stages) {
			for (const stage of schema.data.stages) {
				this.stage.load(stage)
			}
		}
		return schema
	}
}
