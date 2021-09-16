import { Property } from '../model/index'

export class SchemaHelper {
	private _schema:any
	constructor (schema:any) {
		this._schema = schema
	}

	public get name () {
		return this._schema.name
	}

	public get mapping () {
		return this._schema.mapping
	}

	public get entity () {
		return this._schema.entity
	}

	public isChild (entityName:string):boolean {
		for (const _entityName in this._schema.entity) {
			const entity = this._schema.entity[_entityName]
			for (const relationName in entity.relation) {
				const relation = entity.relation[relationName]
				if (relation.type === 'manyToOne' && relation.entity === entityName) return true
			}
		}
		return false
	}

	public existsProperty (entityName:string, name:string):boolean {
		const entity = this.getEntity(entityName)
		if (!entity) { throw new Error('Not exists entity:' + entityName) }
		const property = entity.property[name]
		return property !== undefined
	}

	public getProperty (entityName:string, name:string):Property {
		const entity = this.getEntity(entityName)
		if (!entity) { throw new Error('Not exists entity:' + entityName) }
		const property = entity.property[name]
		if (!property) { throw new Error('Not exists property: ' + name + ' in entity: ' + entityName) }
		return property
	}

	public entityMapping (entityName:string):string {
		const entity = this.getEntity(entityName)
		return entity ? entity.mapping : null
	}

	public getEntity (name:string):any {
		return this._schema.entity[name]
	}

	public getAutoincrement (entityName:string):Property | undefined {
		const entity = this.getEntity(entityName)
		if (!entity) { throw new Error('Not exists entity:' + entityName) }
		for (const name in entity.property) {
			const property = entity.property[name] as Property
			if (property.autoincrement) { return property }
		}
		return undefined
	}

	public getRelation (entity:string, relation:string):any {
		let previousEntity, previousSchema, relationData, relationEntity, relationSchema
		const parts = relation.split('.')
		for (let i = 0; i < parts.length; i++) {
			const part = parts[i]
			if (i === 0) {
				previousEntity = entity
				previousSchema = this.getEntity(previousEntity)
			} else {
				previousEntity = relationEntity
				previousSchema = relationSchema
			}
			relationData = previousSchema.relation[part]
			if (!relationData) { throw new Error('relation ' + part + ' not found in ' + previousSchema.name) }
			relationEntity = relationData.entity
			relationSchema = this.getEntity(relationEntity)
		}
		return {
			previousRelation: parts.length > 1 ? parts.slice(0, parts.length - 1).join('.') : '',
			previousSchema: previousSchema,
			relationSchema: relationSchema,
			relationData: relationData
		}
	}

	public sortEntities (entities?:string[]):string[] {
		if (!entities) {
			entities = []
			for (const name in this._schema.entity)entities.push(name)
		}
		const sorted:string[] = []
		while (sorted.length < entities.length) {
			for (let i = 0; i < entities.length; i++) {
				const entityName = entities[i]
				if (sorted.includes(entityName)) { continue }
				if (this.solveSortEntity(entityName, sorted)) {
					sorted.push(entityName)
					break
				}
			}
		}
		return sorted
	}

	protected solveSortEntity (entityName:string, sorted:string[], parent?:string):boolean {
		const entity = this.getEntity(entityName)
		if (!entity.relation) {
			sorted.push(entity.name)
			return true
		} else {
			let unsolved = false
			for (const p in entity.relation) {
				const relation = entity.relation[p]
				if (relation.entity !== entityName) {
					if (relation.type === 'oneToOne' || relation.type === 'oneToMany') {
						if (!sorted.includes(relation.entity) && (parent === null || parent !== relation.entity)) {
							unsolved = true
							break
						}
					} else if (relation.type === 'manyToOne') {
						if (!this.solveSortEntity(relation.entity, sorted, entityName)) {
							unsolved = true
							break
						}
					}
				}
			}
			return !unsolved
		}
	}
}
