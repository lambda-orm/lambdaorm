import { IOrm } from '../model'
import { SchemaHelper } from './schemaHelper'
import { SchemaExpression, SchemaSentence, SchemaEntityExpression } from './schemaData'

export abstract class SchemaActionDML {
	protected orm:IOrm
	protected schema:SchemaHelper
	protected arrowVariables:string[]
	constructor (orm:IOrm, schema:SchemaHelper) {
		this.orm = orm
		this.schema = schema
		this.arrowVariables = ['p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'o']
	}

	public async sentence (dialect:string):Promise<SchemaSentence> {
		const schemaSentence:SchemaSentence = { entities: [] }
		const schemaExportExpression = this.build(this.schema)
		for (let i = 0; i < schemaExportExpression.entities.length; i++) {
			const exportEntityExpression = schemaExportExpression.entities[i]
			const sentence = await this.orm.expression(exportEntityExpression.expression).sentence(dialect, this.schema.name)
			schemaSentence.entities.push({ entity: exportEntityExpression.entity, sentence: sentence })
		}
		return schemaSentence
	}

	protected build (schema:SchemaHelper):SchemaExpression {
		const schemaExpression:SchemaExpression = { entities: [] }
		for (const entityName in schema.entity) {
			if (!schema.isChild(entityName)) {
				const entity = schema.entity[entityName]
				const expression = this.createEntityExpression(entity)
				schemaExpression.entities.push(expression)
			}
		}
		return schemaExpression
	}

	protected abstract createEntityExpression(entity:any):SchemaEntityExpression

	protected createInclude (entity:any, level = 0):string {
		const arrowVariable = this.arrowVariables[level]
		const includes:string[] = []
		for (const relationName in entity.relation) {
			const relation = entity.relation[relationName]
			if (relation.composite) {
				const childEntity = this.schema.getEntity(relation.entity)
				const childInclude = this.createInclude(childEntity, level + 1)
				includes.push(`${arrowVariable}.${relation.name}${childInclude}`)
			}
		}
		return includes.length === 0
			? ''
			: `.include(${arrowVariable}=>[${includes.join(',')}])`
	}
}
