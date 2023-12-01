import { IOrm } from '../application'

export class OrmLibrary {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly orm:IOrm) {}
	load () {
		this.orm.expressions.addFunction('orm.execute(expression:string,data:any,options:any):any', async (expression:string, data:any, options:any) => {
			if (expression !== undefined && expression !== null && expression.trim() !== '') {
				return await this.orm.execute(expression, data, options)
				// TODO: solve async execute
				// https://www.npmjs.com/package/glome-deasync
				// const execute = deasync((expression:string, data:any, options:any, done:any) => {
				// this.orm.execute(expression, data, options)
				// .then((result:any) => done(null, result))
				// .catch((error:any) => done(error))
				// })
				// const result = execute(expression, data, options)
				// return result
			}
		})
		this.orm.expressions.addFunction('orm.plan(expression:string,options:any):any', (expression:string, options:any) => {
			if (expression !== undefined && expression !== null && expression.trim() !== '') {
				return this.orm.plan(expression, options)
			}
		})
		this.orm.expressions.addFunction('orm.metadata(expression:string):any', (expression:string) => {
			if (expression !== undefined && expression !== null && expression.trim() !== '') {
				return this.orm.metadata(expression)
			}
		})
		this.orm.expressions.addFunction('orm.model(expression:string):any', (expression:string) => {
			if (expression !== undefined && expression !== null && expression.trim() !== '') {
				return this.orm.model(expression)
			}
		})
		this.orm.expressions.addFunction('orm.parameters(expression:string):any', (expression:string) => {
			if (expression !== undefined && expression !== null && expression.trim() !== '') {
				return this.orm.parameters(expression)
			}
		})
		this.orm.expressions.addFunction('orm.constraints(expression:string):any', (expression:string) => {
			if (expression !== undefined && expression !== null && expression.trim() !== '') {
				return this.orm.constraints(expression)
			}
		})
	}
}
