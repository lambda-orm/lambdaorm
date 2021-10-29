import { DatabaseActionDML } from './databaseActionDML'
import { SchemaEntityExpression, SchemaData } from './schemaData'
import { SchemaHelper } from './schemaHelper'

export class DatabaseExport extends DatabaseActionDML {
	public async execute (): Promise<SchemaData> {
		const schema = await this.getSchema()
		const schemaExpression = this.build(schema)
		const context = {}
		const schemaExport:SchemaData = { entities: [] }
		await this.executor.transaction(this.database, async (tr) => {
			for (let i = 0; i < schemaExpression.entities.length; i++) {
				const entityExpression = schemaExpression.entities[i]
				const rows = await tr.expression(entityExpression.expression, context)
				schemaExport.entities.push({ entity: entityExpression.entity, rows: rows })
			}
		})
		return schemaExport
	}

	protected createEntityExpression (schema:SchemaHelper, entity:any):SchemaEntityExpression {
		let expression = `${entity.name}.map(p=>{`
		let first = true
		for (const propertyName in entity.property) {
			const property = entity.property[propertyName]
			expression = expression + (first ? '' : ',') + `${property.name}:p.${property.name}`
			first = false
		}
		expression = expression + '})' + this.createInclude(schema, entity)
		return { entity: entity.name, expression: expression }
	}
}
