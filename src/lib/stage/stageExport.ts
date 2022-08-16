import { StageActionDML } from './stageActionDML'
import { Query, SchemaData, Entity } from '../model'

export class StageExport extends StageActionDML {
	public async execute (): Promise<SchemaData> {
		const queries = this.queries()
		const data = {}
		const schemaExport: SchemaData = { entities: [] }
		await this.executor.transaction(this.options, async (tr) => {
			for (const query of queries) {
				const rows = await tr.executeQuery(query, data)
				schemaExport.entities.push({ entity: query.entity, rows: rows })
			}
		})
		return schemaExport
	}

	protected createQuery (entity:Entity):Query {
		let expression = `${entity.name}.map(p=>{`
		let first = true
		for (const i in entity.properties) {
			const property = entity.properties[i]
			expression = expression + (first ? '' : ',') + `${property.name}:p.${property.name}`
			first = false
		}
		expression = expression + '})' + this.createInclude(entity)
		return this.expressionManager.toQuery(expression, this.options)
	}
}
