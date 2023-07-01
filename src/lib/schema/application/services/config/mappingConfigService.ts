import { Enum, FormatMapping, EntityMapping, PropertyMapping, Mapping } from '../../../domain'
import { DomainConfigServiceBase } from './domainConfigServiceBase'

export class MappingConfigService extends DomainConfigServiceBase<EntityMapping, PropertyMapping> {
	private mapping: Mapping
	public enums: Enum[]
	constructor (mapping: Mapping, enums: Enum[] = []) {
		super()
		this.mapping = mapping
		this.enums = enums
	}

	public get name (): string {
		return this.mapping.name
	}

	public get format (): FormatMapping | undefined {
		return this.mapping.format
	}

	public get (): Mapping {
		return this.mapping
	}

	public set (value: Mapping) {
		this.mapping = value
	}

	public get entities (): EntityMapping[] {
		return this.mapping.entities
	}

	public entityMapping (entityName: string): string | undefined {
		const entity = this.getEntity(entityName)
		return entity ? entity.mapping : undefined
	}
}
