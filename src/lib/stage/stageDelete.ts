import { Query, Entity, Relation, SchemaError } from '../model'
import { StageActionDML } from './stageActionDML'

export class StageDelete extends StageActionDML {
	public async execute (): Promise<void> {
		const queries = this.build()
		await this.executor.executeList(this.stage, this.view, queries)
	}

	protected sort (entities: Entity[]): Entity[] {
		const onlyUnique = function (value:any, index:number, self:any) {
			return self.indexOf(value) === index
		}
		const _entities = entities.map(p => p.name).filter(onlyUnique)
		const sortedEntities = this.model.sortByRelations(_entities, _entities).reverse()
		const result:Entity[] = []
		for (let i = 0; i < sortedEntities.length; i++) {
			const entity = entities.find(p => p.name === sortedEntities[i])
			if (entity !== undefined) {
				result.push(entity)
			}
		}
		return result
	}

	protected build (): Query[] {
		const entities = this.sort(this.model.entities)
		const queries = this.createUpateQueries(entities)
		for (const i in entities) {
			const query = this.createQuery(entities[i])
			queries.push(query)
		}
		return queries
	}

	protected createUpateQueries (entities: Entity[]): Query[] {
		const queries:Query[] = []
		for (const i in entities) {
			const entity = entities[i]
			if (entity.relations && !entity.view) {
				for (const q in entity.relations) {
					const relation = entity.relations[q] as Relation
					const fromProperty = entity.properties.find(p => p.name === relation.from)
					if (fromProperty === undefined) {
						throw new SchemaError(`property ${relation.from} not found in ${entity.name} `)
					}
					const isNullable = fromProperty.nullable !== undefined ? fromProperty.nullable : true
					if (isNullable) {
						const query = this.expressionManager.toQuery(`${entity.name}.updateAll({${relation.from}:null})`, this.stage, this.view)
						queries.push(query)
					}
				}
			}
		}
		return queries
	}

	protected createQuery (entity:Entity):Query {
		return this.expressionManager.toQuery(`${entity.name}.deleteAll()`, this.stage, this.view)
	}
}
