
import { DatastoreActionDML } from './datastoreActionDML'
import { SchemaConfig } from '../manager'
import { Query, SchemaData, EntityMapping, Relation, Entity } from '../model'

export class DatastoreImport extends DatastoreActionDML {
	public async execute (data: SchemaData): Promise<void> {
		const state = await this.state.get(this.datastore.name)
		const schema = await this.getSchema()
		const _queries = await this.build(schema)
		const queries = this.sort(schema, _queries)
		const context = {}

		await this.executor.transaction(this.datastore, context, async (tr) => {
			for (let i = 0; i < queries.length; i++) {
				const query = queries[i]
				const entityData = data.entities.find(p => p.entity === query.entity)
				if (entityData) {
					const aux:any = {}
					this.loadExternalIds(schema, entityData.entity, entityData.rows, aux)
					this.solveInternalsIds(schema, entityData.entity, entityData.rows, state.mapping, state.pending)
					await tr.execute(query, entityData.rows)
					this.completeMapping(schema, entityData.entity, entityData.rows, aux, state.mapping)
				}
			}
			for (let i = 0; i < state.pending.length; i++) {
				const pending = state.pending[i]
				const entity = schema.getEntity(pending.entity) as EntityMapping
				const relation = entity.relations.find(p => p.name === pending.relation) as Relation

				if (!entity.uniqueKey || entity.uniqueKey.length === 0) {
					// TODO: reemplazar por un archivo de salida de inconsistencias
					console.error(`${entity.name} had not unique Key`)
					continue
				}
				let filter = ''
				for (const p in entity.uniqueKey) { filter = filter + (filter === '' ? '' : ' && ') + `p.${entity.uniqueKey[p]}==${entity.uniqueKey[p]}` }
				const expression = `${entity.name}.update({${relation.from}:${relation.from}}).filter(p=> ${filter})`

				const stillPending:any[] = []
				for (let j = 0; j < pending.rows.length; j++) {
					const row = pending.rows[j]
					if (state.mapping[relation.entity] && state.mapping[relation.entity][relation.to] && state.mapping[relation.entity][relation.to][row.externalId]) {
						const values:any = {}
						const internalId = state.mapping[relation.entity][relation.to][row.externalId]
						values[relation.from] = internalId
						for (const p in entity.uniqueKey) { values[entity.uniqueKey[p]] = row.keys[p] }
						await tr.expression(expression, values)
					} else {
						stillPending.push(row)
					}
				}
				pending.rows = stillPending
			}
		})
		await this.state.updateData(this.datastore.name, state.mapping, state.pending)
	}

	protected solveInternalsIds (schema:SchemaConfig, entityName:string, rows:any[], mapping:any, pendings:any[], parentEntity?:string):void {
		const entity = schema.getEntity(entityName) as EntityMapping
		for (const p in entity.relations) {
			const relation = entity.relations[p]
			if ((relation.type === 'oneToOne' || relation.type === 'oneToMany') && (parentEntity === null || parentEntity !== relation.entity)) {
				const relationEntity = schema.getEntity(relation.entity) as EntityMapping
				const reslationProperty = relationEntity.properties.find(p => p.name === relation.to)
				if (reslationProperty !== undefined && reslationProperty.autoincrement) {
					const pendingsRows:any[] = []
					for (let i = 0; i < rows.length; i++) {
						const row = rows[i]
						const externalId = row[relation.from]
						if (mapping[relation.entity] && mapping[relation.entity][relation.to] && mapping[relation.entity][relation.to][externalId]) {
							row[relation.from] = mapping[relation.entity][relation.to][externalId]
						} else if (entity.uniqueKey !== undefined) {
							const keys: any[] = []
							for (let j = 0; j < entity.uniqueKey.length; j++) {
								const ukProperty = entity.uniqueKey[j]
								const value = row[ukProperty]
								if (value == null) {
									// TODO: reemplazar por un archivo de salida de inconsistencias
									console.error(`for entity ${entity.name} and row ${i.toString()} unique ${ukProperty} is null`)
								}
								keys.push(value)
							}
							if (keys.length === 0) {
								// TODO: reemplazar por un archivo de salida de inconsistencias
								console.error(`for entity ${entity.name} and row ${i.toString()} had not unique key`)
							}
							pendingsRows.push({ keys: keys, externalId: externalId })
							row[relation.from] = null
						}
					}
					if (pendingsRows.length > 0) {
						pendings.push({ entity: entityName, relation: relation.name, rows: pendingsRows })
					}
				}
			} else if (relation.type === 'manyToOne') {
				for (let i = 0; i < rows.length; i++) {
					const row = rows[i]
					const childs = row[relation.name]
					if (childs && childs.length > 1) {
						this.solveInternalsIds(schema, relation.entity, childs, mapping, pendings, entityName)
					}
				}
			}
		}
	}

	protected loadExternalIds (schema:SchemaConfig, entityName:string, rows:any[], aux:any):void {
		if (!aux)aux = {}
		if (aux[entityName] === undefined) {
			aux[entityName] = {}
		}
		const entity = schema.getEntity(entityName) as EntityMapping
		for (const p in entity.properties) {
			const property = entity.properties[p]
			if (property.autoincrement) {
				if (aux[entityName][property.name] === undefined) {
					aux[entityName][property.name] = {}
				}
				if (rows !== undefined) {
					for (let i = 0; i < rows.length; i++) {
						const row = rows[i]
						aux[entityName][property.name][i] = row[property.name]
					}
				}
			}
		}
		for (const p in entity.relations) {
			const relation = entity.relations[p]
			if (relation.type === 'manyToOne' && rows !== undefined) {
				for (let i = 0; i < rows.length; i++) {
					const row = rows[i]
					const childs = row[relation.name]
					this.loadExternalIds(schema, relation.entity, childs, aux)
				}
			}
		}
	}

	protected completeMapping (schema:SchemaConfig, entityName:string, rows:any[], aux:any, mapping:any):void {
		if (mapping[entityName] === undefined) {
			mapping[entityName] = {}
		}
		const entity = schema.getEntity(entityName) as EntityMapping
		for (const p in entity.properties) {
			const property = entity.properties[p]
			if (property.autoincrement) {
				if (mapping[entityName][property.name] === undefined) {
					mapping[entityName][property.name] = {}
				}
				if (rows !== undefined) {
					for (let i = 0; i < rows.length; i++) {
						const row = rows[i]
						const externalId = aux[entityName][property.name][i]
						mapping[entityName][property.name][externalId] = row[property.name]
					}
				}
			}
		}
		for (const p in entity.relations) {
			const relation = entity.relations[p]
			if (relation.type === 'manyToOne' && rows !== undefined) {
				for (let i = 0; i < rows.length; i++) {
					const row = rows[i]
					const childs = row[relation.name]
					this.completeMapping(schema, relation.entity, childs, aux, mapping)
				}
			}
		}
	}

	protected sort (schema:SchemaConfig, queries:Query[]):Query[] {
		let entities = queries.map(p => p.entity)
		entities = schema.sortEntities(entities)
		const result:Query[] = []
		for (let i = 0; i < entities.length; i++) {
			const query = queries.find(p => p.entity === entities[i])
			if (query !== undefined) {
				result.push(query)
			}
		}
		return result
	}

	protected async createQuery (schema:SchemaConfig, entity:Entity):Promise<Query> {
		const expression = `${entity.name}.bulkInsert()${this.createInclude(schema, entity)}`
		return await this.expressionManager.toQuery(expression, this.datastore.name)
	}
}
