import { Database, Query } from '../model'
import { ConfigManager, ExpressionManager, Executor } from './../manager'
import { DatabaseState } from './databaseState'
import { SchemaHelper } from '../manager/schemaHelper'

export abstract class DatabaseActionDML {
	protected state: DatabaseState
	protected configManager: ConfigManager
	protected expressionManager: ExpressionManager
	protected executor: Executor
	protected database: Database
	protected arrowVariables = ['p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'o']
	constructor (state:DatabaseState, configManager: ConfigManager, expressionManager: ExpressionManager, executor: Executor, database:Database) {
		this.state = state
		this.configManager = configManager
		this.expressionManager = expressionManager
		this.executor = executor
		this.database = database
	}

	public async getSchema ():Promise<SchemaHelper> {
		const state = await this.state.get(this.database.name)
		let schema
		if (state.schema === undefined || state.schema === {}) {
			schema = this.configManager.schema.get(this.database.schema)
		} else {
			schema = state.schema
		}
		const _schema = this.configManager.schema.transform(schema)
		return new SchemaHelper(_schema)
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

	protected async build (schema:SchemaHelper): Promise<Query[]> {
		const queries:Query[] = []
		for (const entityName in schema.entity) {
			if (!schema.isChild(entityName)) {
				const entity = schema.entity[entityName]
				const query = await this.createQuery(schema, entity)
				queries.push(query)
			}
		}
		return queries
	}

	protected abstract createQuery(schema:SchemaHelper, entity:any):Promise<Query>

	protected createInclude (schema:SchemaHelper, entity:any, level = 0):string {
		const arrowVariable = this.arrowVariables[level]
		const includes:string[] = []
		for (const relationName in entity.relation) {
			const relation = entity.relation[relationName]
			if (relation.composite) {
				const childEntity = schema.getEntity(relation.entity)
				const childInclude = this.createInclude(schema, childEntity, level + 1)
				includes.push(`${arrowVariable}.${relation.name}${childInclude}`)
			}
		}
		return includes.length === 0
			? ''
			: `.include(${arrowVariable}=>[${includes.join(',')}])`
	}
}
