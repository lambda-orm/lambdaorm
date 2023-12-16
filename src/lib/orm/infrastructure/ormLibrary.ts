import { IOrm } from '../application'

export class OrmLibrary {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly orm:IOrm) {}
	load () {
		this.orm.expressions.addFunction('orm.execute(expression:string,data:any,options:any):any', async (expression:string, data:any, options:any) => {
			if (expression !== undefined && expression !== null && expression.trim() !== '') {
				return await this.orm.execute(expression, data, options)
			}
			return null
		}, { async: true })
		this.orm.expressions.addFunction('orm.plan(expression:string,options:any):any', (expression:string, options:any) => {
			if (expression !== undefined && expression !== null && expression.trim() !== '') {
				return this.orm.plan(expression, options)
			}
			return null
		})
		this.orm.expressions.addFunction('orm.metadata(expression:string):any', (expression:string) => {
			if (expression !== undefined && expression !== null && expression.trim() !== '') {
				return this.orm.metadata(expression)
			}
			return null
		})
		this.orm.expressions.addFunction('orm.model(expression:string):any', (expression:string) => {
			if (expression !== undefined && expression !== null && expression.trim() !== '') {
				return this.orm.model(expression)
			}
			return null
		})
		this.orm.expressions.addFunction('orm.parameters(expression:string):any', (expression:string) => {
			if (expression !== undefined && expression !== null && expression.trim() !== '') {
				return this.orm.parameters(expression)
			}
			return null
		})
		this.orm.expressions.addFunction('orm.constraints(expression:string):any', (expression:string) => {
			if (expression !== undefined && expression !== null && expression.trim() !== '') {
				return this.orm.constraints(expression)
			}
			return null
		})
	}
}
