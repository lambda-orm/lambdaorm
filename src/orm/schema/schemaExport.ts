import { SchemaData, SchemaEntityExpression } from './schemaData'
import { SchemaActionDML } from './schemaActionDML'

export class SchemaExport extends SchemaActionDML {
	public async execute (database:string):Promise<SchemaData> {
		const schemaExpression = this.build(this.schema)
		const context = {}
		const schemaExport:SchemaData = { entities: [] }
		await this.orm.transaction(database, async (transaction) => {
			for (let i = 0; i < schemaExpression.entities.length; i++) {
				const entityExpression = schemaExpression.entities[i]
				const rows = await transaction.execute(entityExpression.expression, context)
				schemaExport.entities.push({ entity: entityExpression.entity, rows: rows })
			}
		})
		return schemaExport
	}

	protected createEntityExpression (entity:any):SchemaEntityExpression {
		let expression = `${entity.name}.map(p=>{`
		let first = true
		for (const propertyName in entity.property) {
			const property = entity.property[propertyName]
			expression = expression + (first ? '' : ',') + `${property.name}:p.${property.name}`
			first = false
		}
		expression = expression + '})' + this.createInclude(entity)
		return { entity: entity.name, expression: expression }
	}
}
