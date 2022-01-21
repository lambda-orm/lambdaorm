import { Entity } from './schema'

export interface ModelState
{
	entities: Entity[]
	mappingData: any
	pendingData:any[]
}
