import { DatastoreActionDML } from './datastoreActionDML'
import { SchemaConfig } from '../manager'
import { Query, SchemaData } from '../model'

export class DatastoreExport extends DatastoreActionDML {
	public async execute (): Promise<SchemaData> {
		const schema = await this.getSchema()
		const queries = await this.build(schema)
		const data = {}
		const schemaExport: SchemaData = { entities: [] }
		const context = {}
		await this.executor.transaction(this.datastore, context, async (tr) => {
			for (let i = 0; i < queries.length; i++) {
				const query = queries[i]
				const rows = await tr.execute(query, data)
				schemaExport.entities.push({ entity: query.entity, rows: rows })
			}
		})
		return schemaExport
	}

	protected async createQuery (schema:SchemaConfig, entity:any):Promise<Query> {
		let expression = `${entity.name}.map(p=>{`
		let first = true
		for (const propertyName in entity.property) {
			const property = entity.property[propertyName]
			expression = expression + (first ? '' : ',') + `${property.name}:p.${property.name}`
			first = false
		}
		expression = expression + '})' + this.createInclude(schema, entity)
		return await this.expressionManager.toQuery(expression, this.datastore.name)
	}
}
