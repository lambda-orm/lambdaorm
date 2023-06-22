import { AppPathsConfig, ApplicationSchema, InfrastructureSchema, DomainSchema, Schema } from '../../domain'

export class SchemaService {
	public newSchema ():Schema {
		return { application: this.newApplication(), domain: this.newDomain(), infrastructure: this.newInfrastructure() }
	}

	public newInfrastructure (): InfrastructureSchema {
		return { paths: this.newPathsApp(), mappings: [], sources: [], stages: [] }
	}

	public newDomain (): DomainSchema {
		return { enums: [], entities: [], views: [] }
	}

	public newApplication ():ApplicationSchema {
		return { start: [], end: [], listeners: [] }
	}

	public newPathsApp (): AppPathsConfig {
		return { src: 'src', data: 'data', model: 'model' }
	}
}
