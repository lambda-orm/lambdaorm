import { Enum, Entity, Property } from '../../../domain'
import { ModelConfigServiceBase } from './modelConfigServiceBase'

export class ModelConfigService extends ModelConfigServiceBase<Entity, Property> {
	public entities: Entity[]
	public enums: Enum[]

	constructor (entities: Entity[] = [], enums: Enum[] = []) {
		super()
		this.entities = entities
		this.enums = enums
	}
}
