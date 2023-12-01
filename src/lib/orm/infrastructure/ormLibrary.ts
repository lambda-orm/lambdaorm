import { IOrm } from '../application'
// const { deasync } = require('@kaciras/deasync')

export class OrmLibrary {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly orm:IOrm) {}
	load () {
		this.orm.expressions.addFunction('execute(expression:string,data:any,options:any):any', async (expression:string, data:any, options:any) => {
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
	}
}
