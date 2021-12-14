import { Datastore, Query, Entity } from '../model'
import { ExpressionManager, Executor, ModelConfig } from '../manager'
import { DatastoreState } from './datastoreState'

export abstract class DatastoreActionDML {
	protected state: DatastoreState
	protected model: ModelConfig
	protected expressionManager: ExpressionManager
	protected executor: Executor
	protected datastore: Datastore
	protected arrowVariables = ['p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'o']
	constructor (state:DatastoreState, model: ModelConfig, expressionManager: ExpressionManager, executor: Executor, datastore:Datastore) {
		this.state = state
		this.model = model
		this.expressionManager = expressionManager
		this.executor = executor
		this.datastore = datastore
	}

	public async sentence ():Promise<any> {
		const sentences:any[] = []
		const queries = await this.build()
		for (let i = 0; i < queries.length; i++) {
			const query = queries[i]
			sentences.push(query.sentence)
		}
		return sentences
	}

	protected async build (): Promise<Query[]> {
		const queries:Query[] = []
		for (const i in this.model.entities) {
			const entity = this.model.entities[i]
			if (!this.model.isChild(entity.name)) {
				const query = await this.createQuery(entity)
				queries.push(query)
			}
		}
		return queries
	}

	protected abstract createQuery(entity:Entity):Promise<Query>

	protected createInclude (entity:Entity, level = 0):string {
		const arrowVariable = this.arrowVariables[level]
		const includes:string[] = []
		for (const i in entity.relations) {
			const relation = entity.relations[i]
			if (relation.composite) {
				const childEntity = this.model.getEntity(relation.entity)
				if (childEntity !== undefined) {
					const childInclude = this.createInclude(childEntity, level + 1)
					includes.push(`${arrowVariable}.${relation.name}${childInclude}`)
				}
			}
		}
		return includes.length === 0
			? ''
			: `.include(${arrowVariable}=>[${includes.join(',')}])`
	}
}
