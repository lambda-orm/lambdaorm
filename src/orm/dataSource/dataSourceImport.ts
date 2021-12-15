
import { DataSourceActionDML } from './dataSourceActionDML'
import { Query, SchemaData, Entity } from '../model'

export class DataSourceImport extends DataSourceActionDML {
	public async execute (data: SchemaData): Promise<void> {
		const state = await this.state.get(this.dataSource.name)
		const _queries = await this.build()
		const queries = this.sort(_queries)
		const context = {}

		await this.executor.transaction(this.dataSource, context, async (tr) => {
			for (let i = 0; i < queries.length; i++) {
				const query = queries[i]
				const entityData = data.entities.find(p => p.entity === query.entity)
				if (entityData) {
					const aux:any = {}
					this.loadExternalIds(entityData.entity, entityData.rows, aux)
					this.solveInternalsIds(entityData.entity, entityData.rows, state.mappingData, state.pendingData)
					await tr.execute(query, entityData.rows)
					this.completeMapping(entityData.entity, entityData.rows, aux, state.mappingData)
				}
			}
			for (let i = 0; i < state.pendingData.length; i++) {
				const pending = state.pendingData[i]
				const entity = this.model.getEntity(pending.entity)
				if (entity === undefined) {
					throw new Error(`Entity ${pending.entity} not found`)
				}
				const relation = entity.relations.find(p => p.name === pending.relation)
				if (relation === undefined) {
					throw new Error(`Relation ${pending.relation} not found`)
				}
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
					if (state.mappingData[relation.entity] && state.mappingData[relation.entity][relation.to] && state.mappingData[relation.entity][relation.to][row.externalId]) {
						const values:any = {}
						const internalId = state.mappingData[relation.entity][relation.to][row.externalId]
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
		await this.state.updateData(this.dataSource.name, state.mappingData, state.pendingData)
	}

	protected solveInternalsIds (entityName:string, rows:any[], mappingData:any, pendings:any[], parentEntity?:string):void {
		const entity = this.model.getEntity(entityName)
		if (entity === undefined) {
			throw new Error(`Entity ${entityName} not found`)
		}
		for (const p in entity.relations) {
			const relation = entity.relations[p]
			if ((relation.type === 'oneToOne' || relation.type === 'oneToMany') && (parentEntity === null || parentEntity !== relation.entity)) {
				const relationEntity = this.model.getEntity(relation.entity)
				if (relationEntity === undefined) {
					throw new Error(`Relation Entity ${relation.entity} not found`)
				}
				const reslationProperty = relationEntity.properties.find(p => p.name === relation.to)
				if (reslationProperty !== undefined && reslationProperty.autoincrement) {
					const pendingsRows:any[] = []
					for (let i = 0; i < rows.length; i++) {
						const row = rows[i]
						const externalId = row[relation.from]
						if (mappingData[relation.entity] && mappingData[relation.entity][relation.to] && mappingData[relation.entity][relation.to][externalId]) {
							row[relation.from] = mappingData[relation.entity][relation.to][externalId]
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
						this.solveInternalsIds(relation.entity, childs, mappingData, pendings, entityName)
					}
				}
			}
		}
	}

	protected loadExternalIds (entityName:string, rows:any[], aux:any):void {
		if (!aux)aux = {}
		if (aux[entityName] === undefined) {
			aux[entityName] = {}
		}
		const entity = this.model.getEntity(entityName)
		if (entity === undefined) {
			throw new Error(`Entity ${entityName} not found`)
		}
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
					this.loadExternalIds(relation.entity, childs, aux)
				}
			}
		}
	}

	protected completeMapping (entityName:string, rows:any[], aux:any, mappingData:any):void {
		if (mappingData[entityName] === undefined) {
			mappingData[entityName] = {}
		}
		const entity = this.model.getEntity(entityName)
		if (entity === undefined) {
			throw new Error(`Entity ${entityName} not found`)
		}
		for (const p in entity.properties) {
			const property = entity.properties[p]
			if (property.autoincrement) {
				if (mappingData[entityName][property.name] === undefined) {
					mappingData[entityName][property.name] = {}
				}
				if (rows !== undefined) {
					for (let i = 0; i < rows.length; i++) {
						const row = rows[i]
						const externalId = aux[entityName][property.name][i]
						mappingData[entityName][property.name][externalId] = row[property.name]
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
					this.completeMapping(relation.entity, childs, aux, mappingData)
				}
			}
		}
	}

	protected sort (queries:Query[]):Query[] {
		let entities = queries.map(p => p.entity)
		entities = this.model.sortEntities(entities)
		const result:Query[] = []
		for (let i = 0; i < entities.length; i++) {
			const query = queries.find(p => p.entity === entities[i])
			if (query !== undefined) {
				result.push(query)
			}
		}
		return result
	}

	protected async createQuery (entity:Entity):Promise<Query> {
		const expression = `${entity.name}.bulkInsert()${this.createInclude(entity)}`
		return await this.expressionManager.toQuery(expression, this.dataSource.name)
	}
}
