import { Mapping, SchemaError } from '../../../domain'
import { MappingConfigService } from './mappingConfigService'

export class MappingsConfigService {
	public mappings: Mapping[]

	constructor () {
		this.mappings = []
	}

	public load (value: Mapping): void {
		if (value && value.name) {
			const index = this.mappings.findIndex(p => p.name === value.name)
			if (index === -1) {
				this.mappings.push(value)
			} else {
				this.mappings[index] = value
			}
		}
	}

	public delete (name: string): void {
		const index = this.mappings.findIndex(p => p.name === name)
		if (index !== -1) {
			this.mappings.splice(index, 1)
		}
	}

	public get (name: string): Mapping {
		const mapping = this.mappings.find(p => p.name === name)
		if (!mapping) {
			throw new SchemaError(`mapping ${name} not found`)
		}
		return mapping
	}

	public getInstance (name: string): MappingConfigService {
		const mapping = this.get(name)
		if (!mapping) {
			throw new SchemaError(`mapping ${name} not found`)
		}
		return new MappingConfigService(mapping)
	}
}
