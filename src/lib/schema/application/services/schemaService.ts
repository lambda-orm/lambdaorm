import { AppPathsConfig, AppSchema, DataSchema, ModelSchema, Schema } from '../../domain'

export class SchemaService {
	public newSchema ():Schema {
		return { app: this.newApp(), model: this.newModel(), data: this.newData() }
	}

	public newData (): DataSchema {
		return { mappings: [], sources: [], stages: [] }
	}

	public newModel (): ModelSchema {
		return { enums: [], entities: [], views: [] }
	}

	public newApp ():AppSchema {
		return { paths: this.newPathsApp(), start: [], end: [], listeners: [] }
	}

	public newPathsApp (): AppPathsConfig {
		return { src: 'src', data: 'data', model: 'model' }
	}
}
