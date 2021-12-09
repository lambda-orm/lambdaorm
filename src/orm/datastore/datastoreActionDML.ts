import { Datastore, Query, Entity } from '../model'
import { ConfigManager, SchemaConfig, ExpressionManager, Executor } from '../manager'
import { DatastoreState } from './datastoreState'

export abstract class DatastoreActionDML {
	protected state: DatastoreState
	protected configManager: ConfigManager
	protected expressionManager: ExpressionManager
	protected executor: Executor
	protected datastore: Datastore
	protected arrowVariables = ['p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'o']
	constructor (state:DatastoreState, configManager: ConfigManager, expressionManager: ExpressionManager, executor: Executor, datastore:Datastore) {
		this.state = state
		this.configManager = configManager
		this.expressionManager = expressionManager
		this.executor = executor
		this.datastore = datastore
	}

	public async getSchema ():Promise<SchemaConfig> {
		const state = await this.state.get(this.datastore.name)
		let schema
		if (state.schema === undefined) {
			schema = this.configManager.schema.get(this.datastore.schema)
		} else {
			schema = state.schema
		}
		return new SchemaConfig(schema)
	}

	public async sentence ():Promise<any> {
		const sentences:any[] = []
		const schema = await this.getSchema()
		const queries = await this.build(schema)
		for (let i = 0; i < queries.length; i++) {
			const query = queries[i]
			sentences.push(query.sentence)
		}
		return sentences
	}

	protected async build (schema:SchemaConfig): Promise<Query[]> {
		const queries:Query[] = []
		for (const i in schema.entities) {
			const entity = schema.entities[i]
			if (!schema.isChild(entity.name)) {
				const query = await this.createQuery(schema, entity)
				queries.push(query)
			}
		}
		return queries
	}

	protected abstract createQuery(schema:SchemaConfig, entity:Entity):Promise<Query>

	protected createInclude (schema:SchemaConfig, entity:Entity, level = 0):string {
		const arrowVariable = this.arrowVariables[level]
		const includes:string[] = []
		for (const i in entity.relations) {
			const relation = entity.relations[i]
			if (relation.composite) {
				const childEntity = schema.getEntity(relation.entity)
				if (childEntity !== undefined) {
					const childInclude = this.createInclude(schema, childEntity, level + 1)
					includes.push(`${arrowVariable}.${relation.name}${childInclude}`)
				}
			}
		}
		return includes.length === 0
			? ''
			: `.include(${arrowVariable}=>[${includes.join(',')}])`
	}
}
