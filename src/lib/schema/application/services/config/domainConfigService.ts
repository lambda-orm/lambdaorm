import { Enum, Entity, Property } from '../../../domain'
import { DomainConfigServiceBase } from './domainConfigServiceBase'

export class DomainConfigService extends DomainConfigServiceBase<Entity, Property> {
	public entities: Entity[]
	public enums: Enum[]

	constructor (entities: Entity[] = [], enums: Enum[] = []) {
		super()
		this.entities = entities
		this.enums = enums
	}
}
