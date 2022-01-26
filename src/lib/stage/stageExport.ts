import { StageActionDML } from './stageActionDML'
import { Query, SchemaData, Entity } from '../model'

export class StageExport extends StageActionDML {
	public async execute (): Promise<SchemaData> {
		const queries = await this.build()
		const data = {}
		const schemaExport: SchemaData = { entities: [] }
		await this.executor.transaction(this.stage, async (tr) => {
			for (let i = 0; i < queries.length; i++) {
				const query = queries[i]
				const rows = await tr.execute(query, data)
				schemaExport.entities.push({ entity: query.entity, rows: rows })
			}
		})
		return schemaExport
	}

	protected async createQuery (entity:Entity):Promise<Query> {
		let expression = `${entity.name}.map(p=>{`
		let first = true
		for (const i in entity.properties) {
			const property = entity.properties[i]
			expression = expression + (first ? '' : ',') + `${property.name}:p.${property.name}`
			first = false
		}
		expression = expression + '})' + this.createInclude(entity)
		return await this.expressionManager.toQuery(expression, this.stage)
	}
}
