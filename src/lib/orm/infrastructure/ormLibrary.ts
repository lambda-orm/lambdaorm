import { IOrm } from '../application'

export class OrmLibrary {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly orm:IOrm) {}
	load () {
		this.orm.exp.addFunction('orm.execute(query:string,data:any,options:any):any', async (query:string, data:any, options:any) => {
			if (query !== undefined && query !== null && query.trim() !== '') {
				return await this.orm.execute(query, data, options)
			}
			return null
		}, { async: true, description: 'Execute query' })
		this.orm.exp.addFunction('orm.plan(query:string,options:any):any', (query:string, options:any) => {
			if (query !== undefined && query !== null && query.trim() !== '') {
				return this.orm.plan(query, options)
			}
			return null
		}, { description: 'Plan of query' })
		this.orm.exp.addFunction('orm.metadata(query:string):any', (query:string) => {
			if (query !== undefined && query !== null && query.trim() !== '') {
				return this.orm.metadata(query)
			}
			return null
		}, { description: 'Get metadata from query' })
		this.orm.exp.addFunction('orm.model(query:string):any', (query:string) => {
			if (query !== undefined && query !== null && query.trim() !== '') {
				return this.orm.model(query)
			}
			return null
		}, { description: 'Get model from query' })
		this.orm.exp.addFunction('orm.parameters(query:string):any', (query:string) => {
			if (query !== undefined && query !== null && query.trim() !== '') {
				return this.orm.parameters(query)
			}
			return null
		}, { description: 'Get parameters from query' })
		this.orm.exp.addFunction('orm.constraints(query:string):any', (query:string) => {
			if (query !== undefined && query !== null && query.trim() !== '') {
				return this.orm.constraints(query)
			}
			return null
		}, { description: 'Get constraints from query' })
	}
}
