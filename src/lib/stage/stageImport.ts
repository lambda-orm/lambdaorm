
import { StageActionDML } from './stageActionDML'
import { Query, SchemaData, Entity, SchemaError, SchemaState, Relation } from '../model'
import { Transaction } from 'lib/manager'

export class StageImport extends StageActionDML {
	public async execute (data: SchemaData): Promise<void> {
		const state = await this.state.get(this.options.stage as string)
		const _queries = this.queries()
		const queries = this.sort(_queries)

		await this.executor.transaction(this.options, async (tr) => {
			for (const query of queries) {
				const entityData = data.entities.find(p => p.entity === query.entity)
				if (entityData) {
					const aux:any = {}
					this.loadExternalIds(entityData.entity, entityData.rows || [], aux)
					this.solveInternalsIds(entityData.entity, entityData.rows, state.mappingData, state.pendingData)
					await tr.execute(query, entityData.rows)
					this.completeMapping(entityData.entity, entityData.rows || [], aux, state.mappingData)
				}
			}
			for (const pending of state.pendingData) {
				const entity = this.model.getEntity(pending.entity)
				if (entity === undefined) {
					throw new SchemaError(`Entity ${pending.entity} not found`)
				}
				const relation = entity.relations.find(p => p.name === pending.relation)
				if (relation === undefined) {
					throw new SchemaError(`Relation ${pending.relation} not found`)
				}
				if (!entity.uniqueKey || entity.uniqueKey.length === 0) {
					// TODO: reemplazar por un archivo de salida de inconsistencias
					console.error(`${entity.name} had not unique Key`)
					continue
				}
				pending.rows = await this.executePendingRows(state, entity, relation, tr, pending.rows)
			}
		})
		await this.state.updateData(this.options.stage as string, state.mappingData, state.pendingData)
	}

	private async executePendingRows (state:SchemaState, entity:Entity, relation:Relation, tr:Transaction, rows:any[]):Promise<any[]> {
		const stillPending:any[] = []
		let filter = ''
		for (const p in entity.uniqueKey) {
			filter = filter + (filter === '' ? '' : ' && ') + `p.${entity.uniqueKey[p]}==${entity.uniqueKey[p]}`
		}
		const expression = `${entity.name}.update({${relation.from}:${relation.from}}).filter(p=> ${filter})`
		for (const row of rows) {
			if (state.mappingData[relation.entity] && state.mappingData[relation.entity][relation.to] && state.mappingData[relation.entity][relation.to][row.externalId]) {
				const values:any = {}
				const internalId = state.mappingData[relation.entity][relation.to][row.externalId]
				values[relation.from] = internalId
				for (const p in entity.uniqueKey) {
					values[entity.uniqueKey[p]] = row.keys[p]
				}
				await tr.expression(expression, values)
			} else {
				stillPending.push(row)
			}
		}
		return stillPending
	}

	protected solveInternalsIds (entityName:string, rows:any[], mappingData:any, pending:any[], parentEntity?:string):void {
		const entity = this.model.getEntity(entityName)
		if (entity === undefined) {
			throw new SchemaError(`Entity ${entityName} not found`)
		}
		for (const relation of entity.relations) {
			if ((relation.type === 'oneToOne' || relation.type === 'oneToMany') && (parentEntity === null || parentEntity !== relation.entity)) {
				this.solveInternalsIdsOne(mappingData, entity, relation, pending, rows)
			} else if (relation.type === 'manyToOne') {
				this.solveInternalsIdsMany(mappingData, entityName, relation, pending, rows)
			}
		}
	}

	private solveInternalsIdsMany (mappingData:any, entityName:string, relation:Relation, pending:any[], rows:any[]) {
		for (const row of rows) {
			const children = row[relation.name]
			if (children && children.length > 1) {
				this.solveInternalsIds(relation.entity, children, mappingData, pending, entityName)
			}
		}
	}

	private solveInternalsIdsOne (mappingData:any, entity:Entity, relation:Relation, pending:any[], rows:any[]) {
		const relationEntity = this.model.getEntity(relation.entity)
		if (relationEntity === undefined) {
			throw new SchemaError(`Relation Entity ${relation.entity} not found`)
		}
		const relationProperty = relationEntity.properties.find(q => q.name === relation.to)
		if (relationProperty !== undefined && relationProperty.autoIncrement) {
			const pendingRows:any[] = []
			for (const row of rows) {
				this.solveInternalsIdsRow(mappingData, entity, relation, pendingRows, row)
			}
			if (pendingRows.length > 0) {
				pending.push({ entity: entity.name, relation: relation.name, rows: pendingRows })
			}
		}
	}

	private solveInternalsIdsRow (mappingData:any, entity:Entity, relation:Relation, pendingRows:any[], row:any) {
		const externalId = row[relation.from]
		if (mappingData[relation.entity] && mappingData[relation.entity][relation.to] && mappingData[relation.entity][relation.to][externalId]) {
			row[relation.from] = mappingData[relation.entity][relation.to][externalId]
		} else if (entity.uniqueKey !== undefined) {
			const keys: any[] = []
			for (const ukProperty of entity.uniqueKey) {
				const value = row[ukProperty]
				if (value == null) {
					// TODO: reemplazar por un archivo de salida de inconsistencias
					console.error(`for entity ${entity.name} unique ${ukProperty} is null`)
				}
				keys.push(value)
			}
			if (keys.length === 0) {
				// TODO: reemplazar por un archivo de salida de inconsistencias
				console.error(`for entity ${entity.name} had not unique key`)
			}
			pendingRows.push({ keys: keys, externalId: externalId })
			row[relation.from] = null
		}
	}

	protected loadExternalIds (entityName:string, rows:any[], aux:any):void {
		if (aux[entityName] === undefined) {
			aux[entityName] = {}
		}
		const entity = this.model.getEntity(entityName)
		if (entity === undefined) {
			throw new SchemaError(`Entity ${entityName} not found`)
		}
		const autoIncrement = entity.properties.find(p => p.autoIncrement)
		if (autoIncrement) {
			if (aux[entityName][autoIncrement.name] === undefined) {
				aux[entityName][autoIncrement.name] = {}
			}
			for (let i = 0; i < rows.length; i++) {
				const row = rows[i]
				aux[entityName][autoIncrement.name][i] = row[autoIncrement.name]
			}
		}
		for (const relation of entity.relations) {
			if (relation.type === 'manyToOne') {
				for (const row of rows) {
					const children = row[relation.name]
					this.loadExternalIds(relation.entity, children || [], aux || {})
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
			throw new SchemaError(`Entity ${entityName} not found`)
		}
		const autoIncrement = entity.properties.find(p => p.autoIncrement)
		if (autoIncrement) {
			if (mappingData[entityName][autoIncrement.name] === undefined) {
				mappingData[entityName][autoIncrement.name] = {}
			}
			for (let i = 0; i < rows.length; i++) {
				const row = rows[i]
				const externalId = aux[entityName][autoIncrement.name][i]
				mappingData[entityName][autoIncrement.name][externalId] = row[autoIncrement.name]
			}
		}
		for (const relation of entity.relations) {
			if (relation.type !== 'manyToOne') {
				continue
			}
			for (const row of rows) {
				const children = row[relation.name]
				this.completeMapping(relation.entity, children || [], aux, mappingData)
			}
		}
	}

	protected sort (queries:Query[]):Query[] {
		const onlyUnique = function (value:any, index:number, self:any) {
			return self.indexOf(value) === index
		}
		const mainEntities = queries.map(p => p.entity).filter(onlyUnique)
		const allEntities = this.getAllEntities(queries).filter(onlyUnique)

		const entities = this.model.sortByRelations(mainEntities, allEntities)
		const result:Query[] = []
		for (const entity of entities) {
			const query = queries.find(p => p.entity === entity)
			if (query !== undefined) {
				result.push(query)
			}
		}
		return result
	}

	protected createQuery (entity:Entity):Query {
		const expression = `${entity.name}.bulkInsert()${this.createInclude(entity)}`
		return this.expressionManager.toQuery(expression, this.options)
	}
}
